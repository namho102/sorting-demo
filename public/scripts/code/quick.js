function quickSort(left, right) {
  if (left < right) {
    var pivot = array[left + Math.floor((right - right) / 2)],
      left_new = left,
      right_new = right;
    do {
      while (array[left_new] < pivot) {
        left_new += 1;
      }
      while (pivot < array[right_new]) {
        right_new -= 1;
      }
      if (left_new <= right_new) {
        swap(left_new, right_new);
        left_new += 1;
        right_new -= 1;
      }
    }
    while (left_new <= right_new);

    quickSort(left, right_new);
    quickSort(left_new, right);

  }
}