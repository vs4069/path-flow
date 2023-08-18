function greedyBestFirstSearch(grid,start,finish)
{
    const gridRows=grid.length;
    const gridCols=grid[0].length;
    const queue = new PriorityQueue;
    const visited = new Array(gridRows).fill(null).map(()=> new Array(gridCols).fill(false));
    const parent = new Map();
    visited[start.x][start.y] = true;
    queue.enqueue(start, heuristic(start,finish));
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
            if(newRow>=0 && newRow<gridRows && newCol>=0 && newCol<gridCols && grid[newRow][newCol]>=0 && !visited[newRow][newCol])
            {
                parent.set(JSON.stringify(neighbor),JSON.stringify(current));
                visited[newRow][newCol]=true;
                queue.enqueue(neighbor, heuristic(neighbor, finish));
                addQueueNode(newRow,newCol,timedelay*5);
                totalvisited++;
            }
        }
        addVisitedNode(row,col,timedelay*5);
        timedelay+=5;
    }
    return [false,timedelay*5];
}