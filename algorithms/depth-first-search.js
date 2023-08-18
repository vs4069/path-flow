function depthFirstSearch(grid,start,finish)
{
    const gridRows = grid.length;
    const gridCols = grid[0].length;
    const visited= new Array(gridRows).fill(null).map(()=> new Array(gridCols).fill(false));
    let  timedelay = 0;
    const dfsData = solveDFS(grid,visited,start,finish,timedelay);
    return [dfsData[0],dfsData[1]*35];
}
function solveDFS(grid,visited,current,finish,timedelay)
{
    const [row,col]= [current.x,current.y];
    if(row===finish.x && col===finish.y)
    {
        timedelay+=4;
        addPathNode(row,col,timedelay*35);
        totalpath++;
        return [true,timedelay];
    }
    if(visited[row][col]===true)return [false,timedelay];
    visited[row][col]=true;
    addQueueNode(row,col,timedelay*35);
    totalvisited++;
    timedelay++;
    addVisitedNode(row,col,timedelay*35);
    const neighbors = getNeighbors(grid,current);
    for (const neighbor of neighbors) {
        const item = solveDFS(grid,visited,neighbor,finish,timedelay);
        timedelay=item[1];
        if(item[0]==true){
            addPathNode(row,col,timedelay*35);
            totalpath++;
            timedelay++;
            return [true,timedelay];
        }
    }
    return [false,timedelay];
}