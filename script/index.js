let istouchable=true;
let currentAlgorithm = 'dijkstra';
createGrid();
toolBar.innerHTML=toolBarHtml;

function pickAlgorithm(newAlgorithm)
{
    document.querySelector('.menu-button-selected').classList.toggle('menu-button-selected');
    document.querySelector(`.${newAlgorithm}`).classList.add('menu-button-selected');
    currentAlgorithm = newAlgorithm;
}

function runAlgorithm()
{
    if(currentAlgorithm === 'dijkstra')return diskstra(gridArray,start,finish);
    else if (currentAlgorithm === 'aSearch') return aStarSearch(gridArray,start,finish);
    else if (currentAlgorithm === 'bfs') return bredthFirstSearch(gridArray,start,finish);
    else if (currentAlgorithm === 'dfs') return depthFirstSearch(gridArray,start,finish);
    else if (currentAlgorithm === 'greedy') return greedyBestFirstSearch(gridArray,start,finish);
    else if (currentAlgorithm === 'biDirectional') return biDirectionalSearch(gridArray,start,finish);
}
function visualize()
{
    clearGrid();
    toolBar.innerHTML = `<div class="tool-bar"><p>we are trying to find the path...</p></div>`;
    const grid=document.querySelector('.path-grid');
    const visualizeButton=document.querySelector('.visualize-button');
    const logo=document.querySelector('.logo');
    visualizeButton.style.pointerEvents='none';
    logo.style.pointerEvents='none';
    grid.style.pointerEvents='none';
    const output= runAlgorithm();
    const [found,delay] = output;
    setTimeout(() => {
        grid.style.pointerEvents='auto';
        visualizeButton.style.pointerEvents='auto';
        logo.style.pointerEvents='auto';
        let newToolBar=undefined;
        if(found==false){
            newToolBar = `<div class="new-tool-bar tool-bar"><p>There is no path from your location to home.</p></div>`;
        }else
        {
            newToolBar = `<div class="tool-bar">
                <div class="tool-bar-ele" style="margin: auto 0px;background-color: #82e97be6;;"></div>
                <div class="tool-bar-ele" style="background-color: #ff7676e6;"></div>
                <p>visited nodes - ${totalvisited}</p>
                <div class="tool-bar-ele" style="margin-left:50px; background-color: #f8ed53;"></div>
                <p>path length - ${totalpath}</p>
            </div>`;
        }
        toolBar.innerHTML= newToolBar;
    },delay+400);
}

