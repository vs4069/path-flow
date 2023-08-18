class PriorityQueue{
    constructor ()
    {
        this.queue=[];
    }
    enqueue (item,priority) {
        this.queue.push({item,priority});
        this.queue.sort((a,b)=>a.priority-b.priority);
    }
    dequeue (){
        return this.queue.shift().item;
    }
    isEmpty()
    {
        return this.queue.length===0;
    }
}