function addQueueNode(row,col,timedelay){
    setTimeout(() => {
        const targetElement = document.querySelector(`.ele-${row}-${col}`);
        if(!targetElement.classList.contains('weightage'))targetElement.classList.add('onqueue-node');
    }, timedelay);
}
function addVisitedNode(row,col,timedelay){
    setTimeout(() => {
        const targetElement = document.querySelector(`.ele-${row}-${col}`);
        if(!targetElement.classList.contains('weightage'))
        {
            targetElement.classList.remove('onqueue-node');
            targetElement.classList.add('visited-node');
        }
    }, timedelay);
}
function addPathNode(row,col,timedelay){
    setTimeout(() => {
        const targetElement = document.querySelector(`.ele-${row}-${col}`);
            targetElement.classList.remove('onqueue-node');
            targetElement.classList.remove('visited-node');
            targetElement.classList.add('path-node');
    }, timedelay);
}