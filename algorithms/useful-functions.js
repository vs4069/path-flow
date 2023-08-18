function trackPathUsingArray(grid,start,finish,distance,timedelay)
{
    let row = finish.x;
    let col = finish.y;
    while(true)
    {
        addPathNode(row,col,timedelay*5);
        totalpath++;
        if(row===start.x && col===start.y)break;
        timedelay+=5;
        const reqDistance = distance[row][col]-grid[row][col];
        const neighbors = getNeighbors(grid,{x:row,y:col});
        for (const neighbor of neighbors){
            const newRow=neighbor.x;
            const newCol=neighbor.y;
            if(newRow>=0 && newRow<GRIDROWS && newCol>=0 && newCol<GRIDCOLS && distance[newRow][newCol]===reqDistance){
                row=newRow;col=newCol;
                break;
            }
        }
    }
    return timedelay;
}

function trackPathUsingParentNode(parent, start, finish,timedelay)
{
    let current = finish;
    while(true)
    {
        timedelay+=3;
        const currentObject = JSON.parse(current);
        addPathNode(currentObject.x,currentObject.y,timedelay*5);
        totalpath++;
        if(current === start){
            break;
        }
        current = parent.get(current);
    }
    return [true,timedelay*5];
}

function heuristic(current, finish) {
    return Math.abs(current.x - finish.x) + Math.abs(current.y - finish.y);
}

function getNeighbors(grid, node) {
    const neighbors = [];
    const rows = grid.length;
    const cols = grid[0].length;
    const offsets = [[1,0],[0,1],[-1,0],[0,-1]];

    for (const offset of offsets) {
        const newRow = node.x + offset[0];
        const newCol = node.y + offset[1];
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && grid[newRow][newCol]>=0) {
            neighbors.push({ x: newRow, y: newCol });
        }
    }
    return neighbors;
}