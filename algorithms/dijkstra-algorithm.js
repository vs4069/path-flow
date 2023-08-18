function diskstra(grid,start,finish)
{
    const gridRows=grid.length;
    const gridCols=grid[0].length;
    const distance = new Array(gridRows).fill(null).map(()=> new Array(gridCols).fill(Infinity));
    const queue = new PriorityQueue;
    distance[start.x][start.y]=0;
    queue.enqueue(start,0);
    let timedelay=0;
    while(!queue.isEmpty())
    {
        const current = queue.dequeue();
        const row = current.x;
        const col = current.y;
        if(row === finish.x && col === finish.y){
            timedelay+=25;
            return[true,trackPathUsingArray(grid,start,finish,distance,timedelay)*5];
        }
        const neighbors = getNeighbors(grid,current);
        neighbors.forEach(neighbor=>{
            const [newRow,newCol] = [neighbor.x,neighbor.y];
            if(newRow>=0 && newRow<gridRows && newCol>=0 && newCol<gridCols && grid[newRow][newCol]>=0)
            {
                const newDistance = distance[row][col]+grid[newRow][newCol];
                if(newDistance<distance[newRow][newCol]){
                    distance[newRow][newCol] = newDistance;
                    queue.enqueue(neighbor,newDistance);
                    addQueueNode(newRow,newCol,timedelay*5);
                    totalvisited++;
                }
            }
        });
        addVisitedNode(row,col,timedelay*5);
        timedelay++;
    }
    return [false,timedelay*5];
}