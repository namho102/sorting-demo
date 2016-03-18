function mergeSort(a) {
    if (a.length > 1) {
        var mid = ~ ~(a.length / 2);
        var lefthalf = a.slice(0, mid),
            righthalf = a.slice(mid);

        mergeSort(lefthalf);
        mergeSort(righthalf);

        var i = 0,
            j = 0,
            k = 0;
        while (i < a.length && j < a.length) {
            if (a[i] < a[j]) {
                a[k] = a[i];
                i = i + 1;
            } else {
                a[k] = a[j];
                j = j + 1;
            }
            k = k + 1;
        }

        while (i < lefthalf.length) {
            a[k] = a[i];
            i = i + 1;
            k = k + 1;
        }

        while (j < righthalf.length) {
            a[k] = a[j];
            j = j + 1;
            k = k + 1;
        }
    }
}