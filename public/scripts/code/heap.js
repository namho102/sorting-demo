function heapSort(arr) {
    putArrayInHeapOrder(arr);
    end = arr.length - 1;
    while(end > 0) {
        swap(arr, 0, end);
        siftElementDownHeap(arr, 0, end);
        end -= 1
    }
}
 
function putArrayInHeapOrder(arr) {
    var i;
    i = arr.length / 2 - 1;
    i = Math.floor(i);
    while (i >= 0) {
        siftElementDownHeap(arr, i, arr.length);
        i -= 1;
    }
}
 
function siftElementDownHeap(heap, i, max) {
    var i_big, c1, c2;
    while(i < max) {
        i_big = i;
        c1 = 2*i + 1;
        c2 = c1 + 1;
        if (c1 < max && heap[c1] > heap[i_big])
            i_big = c1;
        if (c2 < max && heap[c2] > heap[i_big])
            i_big = c2;
        if (i_big == i) return;
        swap(heap,i, i_big);
        i = i_big;
    }
}