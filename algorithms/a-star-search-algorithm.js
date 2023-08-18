function aStarSearch(grid,start,finish)
{
    const gridRows=grid.length;
    const gridCols=grid[0].length;
    const queue = new PriorityQueue;
    const gScore = new Array(gridRows).fill(null).map(()=> new Array(gridCols).fill(Infinity));
    const fScore = new Array(gridRows).fill(null).map(()=> new Array(gridCols).fill(Infinity));
    const parent = new Map();
    gScore[start.x][start.y] = 0;
    fScore[start.x][start.y]= heuristic(start, finish);
    queue.enqueue(start, fScore[start.x][start.y]);
    let timedelay = 0;
    while (!queue.isEmpty()) {
        const current = queue.dequeue();
        let [row, col] = [current.x,current.y];
        if(row===finish.x && col===finish.y)
        {
            timedelay+=25;
            return trackPathUsingParentNode(parent, JSON.stringify(start), JSON.stringify(finish),timedelay);
        }
        const neighbors = getNeighbors(grid,current);
        for (const neighbor of neighbors) {
            const [newRow,newCol] = [neighbor.x,neighbor.y];
            const tentativeGScore = gScore[row][col] + grid[newRow][newCol];
            if (tentativeGScore < gScore[newRow][newCol]){
                parent.set(JSON.stringify(neighbor),JSON.stringify(current));
                gScore[newRow][newCol] = tentativeGScore;
                fScore[newRow][newCol] = gScore[newRow][newCol] + heuristic(neighbor,finish);
                queue.enqueue(neighbor, fScore[newRow][newCol]);
                addQueueNode(newRow,newCol,timedelay*5);
                totalvisited++;
            }
        }
        addVisitedNode(row,col,timedelay*5);
        timedelay+=5;
    }
    return [false,timedelay*5];
}