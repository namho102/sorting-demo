function selectionSort(a) {
    var minIndex;
    for (var i = 0; i < a.length - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < a.length; j++) {
            if (a[j] < a[minIndex]) 
                minIndex = j;
        }
        if (minIndex != i) 
            swap(a[i], a[minIndex]);
    }
}