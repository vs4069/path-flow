const GRIDROWS = Math.ceil((window.innerHeight-200)/26);
const GRIDCOLS = Math.ceil(window.innerWidth/26);
const gridArray = new Array(GRIDROWS).fill(null).map(()=>new Array(GRIDCOLS).fill(1));
let insertable=false;
const  insertList=["blockage","weightage"];
let insertvalue = 0;
let start ={x:Math.floor(GRIDROWS/2),y:3};
let finish ={x:Math.floor(GRIDROWS/2),y:GRIDCOLS-4};
let totalvisited = 0;
let totalpath=0;
const toolBar = document.querySelector('.tool-bar');
const toolBarHtml=`<div class="tool-bar">
            <p>double-tap to toggle. click & drag to draw.</p>
            <div class="tool-bar-ele" style="margin-left:20px; background-color: #6f75ed;"></div>
            <p>block</p>
            <div class="tool-bar-ele" style="background-color: orchid;"></div>
            <p>weight</p>
        </div>`;

function createGrid(gridRows=GRIDROWS,gridCols=GRIDCOLS){
    let gridHTML = "";
    for(let i = 0;i<gridRows;i++)
    {
        let gridRowHTML=
        `<div class="grid-row" draggable="false">`;
        for(let j = 0;j<gridCols;j++)
        {
            gridRowHTML+=
            `<div draggable="false" class="grid-ele ele-${i}-${j}" onmousedown="mouseDown(event)" onmouseover="mouseOver(event)" ondblclick="doubleClick()" ondragstart="dragStart(event)" ondragover="dragOver(event)" ondrop="dragDrop(event)"></div>`;
            gridArray[i][j] = 1;
        }
        gridRowHTML+=`</div>`;
        gridHTML+=gridRowHTML;
    }
    const grid=document.querySelector('.path-grid');
    grid.innerHTML=gridHTML;
    addStartFinishNode();
    toolBar.innerHTML = toolBarHtml;
}
function addStartFinishNode()
{
    let startNode= document.querySelector(`.ele-${start.x}-${start.y}`);
    startNode.classList.add("start-node");
    startNode.draggable=true;
    let finishNode= document.querySelector(`.ele-${finish.x}-${finish.y}`);
    finishNode.classList.add("finish-node");
    finishNode.draggable=true;
    gridArray[start.x][start.y]=0;
    gridArray[finish.x][finish.y]=0;
}
function dragStart(event)
{
    insertable=false;
    if(event.target.classList.contains('start-node'))
    {
        event.dataTransfer.setData('text/plain','start-node');
    }else if (event.target.classList.contains('finish-node'))
    {
        event.dataTransfer.setData('text/plain','finish-node');
    }
    else return;
    for (className of event.target.classList) {
        if(className.startsWith('ele-'))
        {
            const parts=className.split('-');
            gridArray[parts[1]][parts[2]] = false;;
            break;
        }
    };
}
function dragOver(event)
{
    event.preventDefault();
}
function dragDrop(event)
{
    event.preventDefault();
    const data = event.dataTransfer.getData('text/plain');
    if(data === 'start-node' && !event.target.classList.contains('finish-node'))
    {
        changeNode('start-node',event.target);
    }
    else if (data ==='finish-node' && !event.target.classList.contains('start-node'))
    {
        changeNode('finish-node',event.target);
    }
}
function changeNode(here,there)
{
    hereNode= document.querySelector(`.${here}`);
    hereNode.draggable=false;
    hereNode.classList.remove(`${here}`);
    there.classList.add(`${here}`);
    there.draggable=true;
    for (className of there.classList) {
        if(className.startsWith('ele-'))
        {
            const parts=className.split('-');
            const x = Number(parts[1]);
            const y = Number(parts[2]);
            if(here === 'start-node'){gridArray[start.x][start.y]=1;start.x = x;start.y=y;}
            if(here === 'finish-node'){gridArray[finish.x][finish.y]=1;finish.x = x;finish.y=y;}
            gridArray[x][y]= 0;
            there.classList.remove(insertList[0]);
            there.classList.remove(insertList[1]);
            break;
        }
    };
}
function mouseOver(event)
{
    if(insertable===false)return;
    const gridItem = event.target;
    if(!gridItem.classList.contains('start-node')&&!gridItem.classList.contains('finish-node'))
    {
        gridItem.classList.remove(insertList[1]);
        gridItem.classList.remove(insertList[0]);
        gridItem.classList.add(insertList[insertvalue]);
        for (className of gridItem.classList) {
            if(className.startsWith('ele-'))
            {
                const parts=className.split('-');
                const x = Number(parts[1]);
                const y = Number(parts[2]);
                if(insertvalue===0)gridArray[x][y]=-1;
                else gridArray[x][y]=25;
                break;
            }
        }
    }
}
function mouseDown(event)
{
    clearGrid();
    insertable = true;
    const gridItem = event.target;
    if(!gridItem.classList.contains('start-node')&&!gridItem.classList.contains('finish-node'))
    {
        gridItem.classList.toggle(insertList[insertvalue]);
        for (className of gridItem.classList) {
            if(className.startsWith('ele-'))
            {
                const parts=className.split('-');
                const x = Number(parts[1]),y=Number(parts[2]);
                if(gridArray[x][y] === 1)
                {
                    if(insertvalue===0){
                        gridArray[x][y]= -1;
                    }
                    else {
                        gridArray[x][y] = 25;
                    }
                    gridItem.classList.add(insertList[insertvalue]);
                }else
                {
                    gridArray[x][y] = 1;
                    gridItem.classList.remove(insertList[1]);
                    gridItem.classList.remove(insertList[0]);
                }
                break;
            }
        }
    }
}

function doubleClick()
{
    if(insertvalue === 0)insertvalue = 1;
    else insertvalue=0;
}


function clearGrid()
{
    toolBar.innerHTML = toolBarHtml;
    totalvisited=0;
    totalpath=0;
    const visitedNodes = document.querySelectorAll('.visited-node');
    const onQueueNodes = document.querySelectorAll('.onqueue-node');
    const pathNodes = document.querySelectorAll('.path-node');
    visitedNodes.forEach(visitedNode => {
        visitedNode.classList.remove('visited-node');
    });
    onQueueNodes.forEach(onQueueNode => {
        onQueueNode.classList.remove('onqueue-node');
    });
    pathNodes.forEach(pathNode => {
        pathNode.classList.remove('path-node');
    });
}