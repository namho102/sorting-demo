'use strict';

//Helper

function generateArray(size) {
    var arr = [];
    for (var i = 0; i < size; i++) {
        // arr.push(i + 1);
        arr[arr.length] = i + 1;
    } //43% faster

    return arr;
}

function generateData(size) {
    return shuffle(generateArray(size));
}

function shuffle(arr) {
    var currentIndex = arr.length,
        temporaryValue,
        randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = arr[currentIndex];
        arr[currentIndex] = arr[randomIndex];
        arr[randomIndex] = temporaryValue;
    }

    return arr;
}

function sleepFor(sleepDuration) {
    var now = new Date().getTime();
    while (new Date().getTime() < now + sleepDuration) {/* do nothing */}
}

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function activeCode(numberLine) {
    $('.line-highlight').removeClass('active');
    $(".line-highlight[data-start=" + numberLine + "]").addClass('active');
}

Array.prototype.insert = function (value, index) {
    var array = this;
    for (var i = array.length - 1; index <= i; i--) {
        array[i + 1] = array[i];
    }
    array[index] = value;
};

Array.prototype.insertBefore = function (from, to) {
    this.insert(this[from], to);
    if (to < from) {
        from += 1;
    }
    this.splice(from, 1);
};
/*
    
    for(var i = array.length - 1; to <= i; i--) {
        array[i + 1] = array[i];
    }
      array[to] = array[from]
      if(to < from){
    from += 1
    }
  this.splice(from, 1)
*/