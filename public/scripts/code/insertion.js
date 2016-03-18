function insertionSort(a) {
    for (var i = 0; i < a.length; i++) {
        var k = a[i];
        for (var j = i; j > 0 && k < a[j - 1]; j--) {
            a[j] = a[j - 1];
        }
        a[j] = k;
    }
}