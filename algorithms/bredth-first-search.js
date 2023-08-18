function bredthFirstSearch(grid,start,finish)
{
    const gridRows = grid.length;
    const gridCols = grid[0].length;
    const visited= new Array(gridRows).fill(null).map(()=> new Array(gridCols).fill(false));
    let  timedelay = 0;
    const queue = [start];
    const parent = new Map();
    visited[start.x][start.y]=true;
    while(queue.length>0)
    {
        const current = queue.shift();
        let [row, col] = [current.x,current.y];
        if(row===finish.x && col===finish.y)
        {
            timedelay+=25;
            return trackPathUsingParentNode(parent, JSON.stringify(start), JSON.stringify(finish),timedelay);
        }
        timedelay+=2;
        addVisitedNode(row,col,timedelay*5);
        const neighbors = getNeighbors(grid,current);
        for (const neighbor of neighbors) {
            const [newRow,newCol] = [neighbor.x,neighbor.y];
            if (!visited[newRow][newCol]) {
                timedelay++;
                addQueueNode(newRow,newCol,timedelay*5);
                totalvisited++;
                queue.push(neighbor);
                visited[newRow][newCol]=true;
                parent.set(JSON.stringify(neighbor),JSON.stringify(current));
            }
        }
    }
    return [false,timedelay*5];
}