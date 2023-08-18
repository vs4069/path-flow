function biDirectionalSearch(grid,start,finish)
{
    const gridRows = grid.length;
    const gridCols = grid[0].length;
    const forwardVisited = new Array(gridRows).fill(null).map(()=>new Array(gridCols).fill(false));
    const backwardVisited = new Array(gridRows).fill(null).map(()=>new Array(gridCols).fill(false));
    const forwardQueue = new PriorityQueue;
    const backwardQueue = new PriorityQueue;
    const forwardDistance = new Array(gridRows).fill(null).map(()=>new Array(gridCols).fill(Infinity));
    const backwardDistance = new Array(gridRows).fill(null).map(()=>new Array(gridCols).fill(Infinity));
    forwardQueue.enqueue(start, 0);
    backwardQueue.enqueue(finish, 0);
    forwardDistance[start.x][start.y]=0;
    backwardDistance[finish.x][finish.y]=0;
    forwardVisited[start.x][start.y] = true;
    backwardVisited[finish.x][finish.y]=true;
    const commonNode={x:-1,y:-1};
    let timedelay=0;
    while(!forwardQueue.isEmpty()&&!backwardQueue.isEmpty())
    {
        const forwardNode = forwardQueue.dequeue();
        const backwardNode = backwardQueue.dequeue();
        const forwardNeighbors = getNeighbors(grid, forwardNode);
        const backwardNeighbors = getNeighbors(grid, backwardNode);
        forwardVisited[forwardNode.x][forwardNode.y] = true;
        backwardVisited[backwardNode.x][backwardNode.y] = true;
        for (const neighbor of forwardNeighbors) {
            const tentativeDistance = grid[neighbor.x][neighbor.y]+forwardDistance[forwardNode.x][forwardNode.y];
            if (tentativeDistance < forwardDistance[neighbor.x][neighbor.y]) {
                forwardDistance[neighbor.x][neighbor.y] = tentativeDistance;
                forwardQueue.enqueue(neighbor,tentativeDistance);
                addQueueNode(neighbor.x,neighbor.y,timedelay*5);
                totalvisited++;
                if (backwardVisited[neighbor.x][neighbor.y]) {
                        commonNode.x = neighbor.x;
                        commonNode.y = neighbor.y;
                        addPathNode(commonNode.x,commonNode.y,timedelay*5);
                        timedelay+=25;
                        trackPathUsingArray(grid,start,commonNode,forwardDistance,timedelay);
                        totalpath--;
                        return [true,trackPathUsingArray(grid,finish,commonNode,backwardDistance,timedelay)*5];
                }
            }
        }
        for (const neighbor of backwardNeighbors) {
            const tentativeDistance = grid[neighbor.x][neighbor.y]+backwardDistance[backwardNode.x][backwardNode.y];
            if (tentativeDistance < backwardDistance[neighbor.x][neighbor.y]) {
                backwardDistance[neighbor.x][neighbor.y] = tentativeDistance;
                backwardQueue.enqueue(neighbor,tentativeDistance);
                addQueueNode(neighbor.x,neighbor.y,timedelay*5);
                totalvisited++;
                if (forwardVisited[backwardNode.x][backwardNode.y]) {
                    commonNode.x = neighbor.x;
                    commonNode.y = neighbor.y;
                    addPathNode(commonNode.x,commonNode.y,timedelay*5);
                    timedelay+=25;
                    trackPathUsingArray(grid,start,commonNode,forwardDistance,timedelay);
                    totalpath--;
                    return [true,trackPathUsingArray(grid,finish,commonNode,backwardDistance,timedelay)*5];
                }
            }
        }
        addVisitedNode(forwardNode.x,forwardNode.y,timedelay*5);
        addVisitedNode(backwardNode.x,backwardNode.y,timedelay*5);
        timedelay++;
    }
    return [false,timedelay*5];
}