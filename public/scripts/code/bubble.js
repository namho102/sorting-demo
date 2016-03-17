function bubbleSort(array) {
    var done = false;
    while (!done) {
        done = true;
        for (var i = 1; i < array.length; i++) {
            if (array[i - 1] > array[i]) {
                swap(array[i - 1], array[i]);
                done = false;
            }
        }
    }
}