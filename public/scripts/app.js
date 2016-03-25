"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var algsList = ["Bubble", "Selection", "Insertion", "Quick", "Merge", "Heap"];
var size = [5, 10, 20, 30, 50, 70, 100];
var speed = ['5x', '4x', '3x', '2x', '1x'];

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);

        this.size = 20;
        this.speed = '2x';

        this.createElements();
        this.setEvents();
    }

    _createClass(Controller, [{
        key: "createElements",
        value: function createElements() {
            //MENU BUTTONSET
            algsList.forEach(function (el, i) {
                d3.select("#algs").append("li").append("a").attr('data-pos', i).attr('class', 'option').text(el);
            });

            size.forEach(function (el) {
                d3.select("#size").append("li").append("a").attr('class', 'option').text(el);
            });

            speed.forEach(function (el, i) {
                d3.select("#speed").append("li").append("a").attr('data-speed', i).attr('class', 'option').text(el);
            });

            $("a:contains(" + this.size + ")").addClass('selected');
            $("a:contains(" + this.speed + ")").addClass('selected');
            $("#algs").find('a').first().addClass('selected');
            $("#code").find('pre').first().addClass('active');
            $('div.line-highlight').removeClass('active');
        }
    }, {
        key: "setEvents",
        value: function setEvents() {
            var _this = this;

            $('#size a').click(function (evt) {
                _this.size = $(evt.target).text();
                $('#size a').removeClass('selected');
                $(evt.target).addClass('selected');
            });

            $('#speed a').click(function (evt) {
                _this.size = $(evt.target).text();
                $('#speed a').removeClass('selected');
                $(evt.target).addClass('selected');
            });
        }
    }, {
        key: "getSize",
        value: function getSize() {
            return $('#size').find(".selected").text();
        }
    }]);

    return Controller;
}();

var Bars = function () {
    function Bars(size, root) {
        _classCallCheck(this, Bars);

        // console.log('wtf');
        this.size = size;
        this.root = root;
        this.bars = shuffle(generateArray(this.size));
        this.colors = [];
        //initial state
        this.selector = d3.select(root).append("svg");
        // this.selector.append("svg").attr('width', '100%');
        this.renderData(this.bars);
    }

    _createClass(Bars, [{
        key: "getMax",
        value: function getMax() {
            var _Math;

            return (_Math = Math).max.apply(_Math, _toConsumableArray(this.bars));
        }
    }, {
        key: "renderData",
        value: function renderData(data, time) {
            var _Math2;

            console.log('rendering. . .');
            // console.log(data);
            this.bars = data;
            var size = this.size;
            // var data = this.bars;

            // var svg = this.selector.append("svg").attr('width', '100%');
            // var svg = d3.select('#bars').append("svg").attr('width', '100%');
            var svg = this.selector;
            svg.selectAll("*").remove();

            var width, height, rectHeight, rectMargin, max;
            var color = d3.rgb("blue");
            // width = d3.select(iElement[0])[0][0].offsetWidth - 5;
            width = 450;
            height = 450;
            // rectHeight = 13;
            rectMargin = 1;
            // height = size * (rectHeight + rectMargin);
            rectHeight = height / size - rectMargin;

            max = (_Math2 = Math).max.apply(_Math2, _toConsumableArray(data));

            svg.attr('height', height);

            //create the rectangles for the bar chart
            var rects = svg.selectAll("rect").data(data);

            // svg.selectAll("rect")
            //     .data(data)
            rects.enter().append("rect").attr("class", 'bar').attr("width", 0) // initial width of 0 for transition
            .attr("height", rectHeight).attr("data-val", function (d) {
                return d;
            }).attr("fill", function (d, i) {
                // if(!time) {
                //     var color = '#' + Math.floor(Math.random()*16777215).toString(16);
                //     this.colors[this.colors.length] = color;
                //     return color;
                // }
                // return this.colors[i];
                return '#20ADEE';
            }).attr("y", function (d, i) {
                return i * (rectHeight + rectMargin);
            })
            // .transition()
            // .duration(500)
            .attr("width", function (d) {
                return d / (max / width); // width based on scale
            });

            rects.exit().remove();
            // this.selector.selectAll().exit().remove();
        }
    }, {
        key: "update",
        value: function update(size, data) {
            this.size = size;
            this.bars = data;
        }
    }, {
        key: "highlight",
        value: function highlight(elements) {
            // console.log(elements.length);
            // var rects = $('#bars').find('rect');

            var c = '#B1D5E5';
            $('rect').css('fill', '#20ADEE');
            // $('rect').each(function(rect) {
            //    rect.css('fill', '#20ADEE');
            // });
            for (var i = 0; i < elements.length; i++) {
                $("rect[data-val=" + elements[i] + "]").css('fill', c);
            }
        }
    }, {
        key: "destroy",
        value: function destroy() {}
    }]);

    return Bars;
}();

var GraphicalSort = function () {
    function GraphicalSort() {
        _classCallCheck(this, GraphicalSort);

        //Controller
        this.controller = new Controller();

        //Bars
        this.bars = new Bars(this.controller.size, '#bars');

        //Tasks
        this.tasks = new Task(this.bars);
        // this.size = controls.size;

        // Set default algorithms
        this.sortMenu = [bubbleSort, selectionSort, insertionSort, quickSort, mergeSort, heapSort];
        this.pos = 0;

        this.setEvents();
    }

    _createClass(GraphicalSort, [{
        key: "setEvents",
        value: function setEvents() {
            var _this2 = this;

            $('.controls__group').click(function () {
                _this2.reload();
            });

            $('#reload').click(function () {
                _this2.reload();
            });

            $('#process').click(function () {
                // this.start();   
                _this2.runStep();
            });

            $('#start').click(function () {
                _this2.start();
                // this.runStep();
            });

            $('#algs a').click(function (evt) {
                _this2.algs = $(evt.target).data('pos');
                // console.log(this.algs);
                $('#algs a').removeClass('selected');
                $(evt.target).addClass('selected');

                $('#code pre').removeClass('active');
                $('pre').eq(_this2.algs).addClass('active');
                _this2.reload();
            });
        }
    }, {
        key: "getPos",
        value: function getPos() {
            return $('#algs').find(".selected").data('pos');
        }
    }, {
        key: "reload",
        value: function reload() {
            console.log('reloading');
            $('div.line-highlight').removeClass('active');

            this.tasks.clean();
            this.tasks.cancel();

            var newSize = this.controller.getSize();
            var newData = generateData(newSize);
            console.log(newData);
            // console.log(newSize);
            this.bars.update(newSize, newData);
            this.bars.renderData(newData);
        }
    }, {
        key: "start",
        value: function start() {
            console.log('starting');

            // console.log(this.getPos());
            // bubbleSort(this.bars, this.tasks);
            this.sortMenu[this.getPos()](this.bars, this.tasks);
            this.tasks.processItems();
        }
    }, {
        key: "runStep",
        value: function runStep() {
            var queue = this.tasks;
            if (queue.tasks.length == 0) {
                // this.start();
                this.sortMenu[this.getPos()](this.bars, this.tasks);
                // console.log(queue.tasks);
            }

            queue.popItem();
        }
    }]);

    return GraphicalSort;
}();

var Task = function () {
    function Task(bars) {
        _classCallCheck(this, Task);

        this.bars = bars;
        this.tasks = [];
        this.delay = 40;

        this.timeoutID = undefined;
    }

    _createClass(Task, [{
        key: "processItems",
        value: function processItems() {
            // var delay = this.delay;
            var bars = this.bars;
            var queue = this.tasks;
            var self = this;

            function processNextBatch() {
                var nextItem;
                nextItem = queue.shift();
                if (!nextItem) return;
                // console.log(nextItem);
                // console.log(bars.bars.length);
                if (Array.isArray(nextItem)) {
                    if (nextItem.length >= bars.bars.length) {
                        bars.renderData(nextItem, true);
                    } else {
                        bars.highlight(nextItem);
                    }
                } else {}
                // activeCode(nextItem);


                // processItem(nextItem);
                // console.log(self.getDelay());

                self.timeoutID = setTimeout(processNextBatch, self.getDelay());
                // self._setTimeout(processNextBatch);
                // setTimeout(processNextBatch, self.getDelay());
                // setTimeout(processNextBatch, delay);
            }
            processNextBatch();
        }
    }, {
        key: "popItem",
        value: function popItem() {
            var nextItem = this.tasks.shift();
            // console.log(this.tasks);
            // console.log(nextItem.length);
            // console.log(this.bars.bars.length);

            if (Array.isArray(nextItem)) {
                if (nextItem.length >= this.bars.bars.length) {
                    this.bars.renderData(nextItem, true);
                } else {
                    this.bars.highlight(nextItem);
                }
            } else {
                activeCode(nextItem);
            }

            // this.bars.renderData(nextItem);
        }

        // _setTimeout(func) {
        //     setTimeout(func, this.getDelay());
        // }

    }, {
        key: "cancel",
        value: function cancel(func) {
            clearTimeout(this.timeoutID);
        }
    }, {
        key: "pushNumber",
        value: function pushNumber(number) {
            this.tasks.push(number);
            return true;
        }
    }, {
        key: "pushValues",
        value: function pushValues(values) {
            var tempVar = values.slice(0); //creating not copying, !IMPORTANT !FUCKING ERROR
            this.tasks.push(tempVar);
            return true;
            // console.log(this.tasks);
        }
    }, {
        key: "getDelay",
        value: function getDelay() {
            var speed = $('#speed').find(".selected").data('speed');
            return speed * 30;
        }
    }, {
        key: "clean",
        value: function clean() {
            this.tasks = [];
        }
    }]);

    return Task;
}();

//Sorting Functions

function bubbleSort(barObj, taskObj) {
    var values = barObj.bars;

    //main
    var done = false;
    while (!done) {
        done = true;

        for (var i = 1; i < values.length; i++) {
            // taskObj.pushValues(values);
            taskObj.pushNumber(6);
            taskObj.pushValues([values[i - 1], values[i]]);
            if (values[i - 1] > values[i]) {

                taskObj.pushNumber(7);

                // taskObj.pushValues([values[i - 1], values[i]]);
                var _ref = [values[i], values[i - 1]];
                values[i - 1] = _ref[0];
                values[i] = _ref[1];
                taskObj.pushValues(values);

                done = false;
            }
        }
    }
    //end main

    // console.log('wtf');

    taskObj.pushValues(values);
    console.log(taskObj.tasks.length);
    // taskObj.processItems();
    console.log(values);
}

function selectionSort(barObj, taskObj) {
    console.log('selection sort starting');
    var values = barObj.bars;

    //main
    var minIndex, tmp;
    for (var i = 0; i < values.length - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < values.length; j++) {
            taskObj.pushNumber(6);

            taskObj.pushValues([values[j], values[minIndex]]);
            if (values[j] < values[minIndex]) {
                taskObj.pushNumber(7);
                minIndex = j;
            }
        }
        // taskObj.pushValues([values[i], values[minIndex]]);
        taskObj.pushNumber(10);
        if (minIndex != i) {
            // tmp = values[i];
            // values[i] = values[minIndex];
            // values[minIndex] = tmp;
            var _ref2 = [values[minIndex], values[i]];
            values[i] = _ref2[0];
            values[minIndex] = _ref2[1];
            taskObj.pushValues([values[i], values[minIndex]]);
            taskObj.pushValues(values);
        }
    }
    //end main

    taskObj.pushValues(values);
    console.log(taskObj.tasks.length);
    // taskObj.processItems();
    console.log(values);
}

function insertionSort(barObj, taskObj) {
    console.log('insertion sort starting');
    var values = barObj.bars;

    //main
    for (var i = 0; i < values.length; i++) {
        var k = values[i];
        for (var j = i; taskObj.pushNumber(4) && j > 0 && taskObj.pushValues([k, values[j - 1]]) && k < values[j - 1]; j--) {
            taskObj.pushNumber(5);
            // taskObj.pushValues([k, values[j - 1]]);
            values[j] = values[j - 1];
            taskObj.pushValues(values);
        }

        taskObj.pushNumber(7);
        values[j] = k;
        taskObj.pushValues(values);
    }
    //end main

    taskObj.pushValues(values);
    console.log(taskObj.tasks.length);
    // taskObj.processItems();
    console.log(values);
}

function quickSort(barObj, taskObj) {
    console.log('quick sort starting');
    var values = barObj.bars;

    //main
    function _quickSort(left, right) {
        // taskObj.pushValues(values);

        if (left < right) {
            var pivot = values[left + ~ ~((right - right) / 2)],
                left_new = left,
                right_new = right;

            do {
                // taskObj.pushValues(values)
                while (values[left_new] < pivot) {
                    // taskObj.pushValues([values[left_new], pivot]);
                    // taskObj.pushValues(values);
                    left_new += 1;
                }
                while (pivot < values[right_new]) {
                    // taskObj.pushValues([pivot, values[right_new]]);
                    // taskObj.pushValues(values);
                    right_new -= 1;
                }
                if (left_new <= right_new) {
                    var _ref3 = [values[right_new], values[left_new]];
                    // taskObj.pushValues([left_new, right_new]);

                    values[left_new] = _ref3[0];
                    values[right_new] = _ref3[1];

                    taskObj.pushValues(values);
                    left_new += 1;
                    right_new -= 1;
                }
            } while (left_new <= right_new);

            _quickSort(left, right_new);
            _quickSort(left_new, right);
        }
    }

    _quickSort(0, values.length - 1);

    //end main

    // console.log(count);
    taskObj.pushValues(values);
    console.log(taskObj.tasks.length);
    // taskObj.processItems();
    console.log(values);
}

function mergeSort(barObj, taskObj) {
    console.log('merge sort starting');
    var values = barObj.bars;

    //main
    /*
    function _mergeSort(alist) {
        // console.log("Splitting ", alist);
        // console.log(alist);
        // taskObj.pushValues(alist);
          if (alist.length > 1) {
            var mid = Math.floor(alist.length / 2);
            var lefthalf = alist.slice(0, mid),
                righthalf = alist.slice(mid);
              _mergeSort(lefthalf);
            _mergeSort(righthalf);
              var i = 0,
                j = 0,
                k = 0;
            while (i < lefthalf.length && j < righthalf.length) {
                // taskObj.pushValues(alist);
                if (lefthalf[i] < righthalf[j]) {
                    alist[k] = lefthalf[i];
                    taskObj.pushValues(alist);
                    i = i + 1;
                } else {
                    alist[k] = righthalf[j];
                    taskObj.pushValues(alist);
                    j = j + 1;
                }
                  k = k + 1;
            }
                while (i < lefthalf.length) {
                  alist[k] = lefthalf[i];
                taskObj.pushValues(alist);
                i = i + 1;
                k = k + 1;
            }
                while (j < righthalf.length) {
                  alist[k] = righthalf[j];
                taskObj.pushValues(alist);
                j = j + 1;
                k = k + 1;
            }
        }
        // console.log("Merging ", alist);
    }
    
    //end main
    */

    //test

    function _mergeSort(array, first, last) {
        // var array = values;
        // console.log(array);
        // taskObj.pushValues(values);

        first = first === undefined ? 0 : first;
        last = last === undefined ? array.length - 1 : last;
        if (last - first < 1) {
            return;
        }
        var middle = ~ ~((first + last) / 2);
        _mergeSort(array, first, middle);
        _mergeSort(array, middle + 1, last);

        var f = first;
        var m = middle;

        while (f <= m && m + 1 <= last) {
            // taskObj.pushValues([f, m]);
            // taskObj.pushValues([m + 1, last]);

            // taskObj.pushValues(values);
            if (array[f] >= array[m + 1]) {
                taskObj.pushValues([array[f], array[m + 1]]);
                // array.insertBefore(m + 1, f);

                var from = m + 1,
                    to = f;
                // array.insert(array[from], to);

                var temp = array[from];

                for (var i = array.length - 1; to <= i; i--) {
                    // taskObj.pushValues(values);
                    array[i + 1] = array[i];
                    // console.log(array.length);
                    // taskObj.pushValues(array);
                }
                array[to] = temp;

                if (to < from) {

                    array.splice(from + 1, 1);
                    // console.log(array.leghth);
                    taskObj.pushValues(array);
                }

                m++;
            }
            f++;
        }
    }

    _mergeSort(values);
    //end test

    // console.log(count);
    taskObj.pushValues(values);
    console.log(taskObj.tasks.length);
    // taskObj.processItems();
    console.log(values);
}

function heapSort(barObj, taskObj) {
    console.log('heap sort starting');
    var values = barObj.bars;

    //main

    function _heapSort(arr) {
        putArrayInHeapOrder(arr);
        var end = arr.length - 1;
        while (end > 0) {
            var _ref4 = [arr[end], arr[0]];
            arr[0] = _ref4[0];
            arr[end] = _ref4[1];

            taskObj.pushValues(values);
            siftElementDownHeap(arr, 0, end);
            end -= 1;
        }
    }

    function putArrayInHeapOrder(arr) {
        var i;
        i = arr.length / 2 - 1;
        i = Math.floor(i);
        while (i >= 0) {
            // taskObj.pushValues(values);
            siftElementDownHeap(arr, i, arr.length);
            i -= 1;
        }
    }

    function siftElementDownHeap(heap, i, max) {
        var i_big, c1, c2;
        while (i < max) {
            // taskObj.pushValues(values);
            i_big = i;
            c1 = 2 * i + 1;
            c2 = c1 + 1;
            if (c1 < max && heap[c1] > heap[i_big]) {
                // taskObj.pushValues([heap[c1], heap[i_big]]);
                i_big = c1;
            }

            if (c2 < max && heap[c2] > heap[i_big]) {
                // taskObj.pushValues([heap[c2], heap[i_big]]);
                i_big = c2;
            }
            if (i_big == i) return;
            var _ref5 = [heap[i_big], heap[i]];
            heap[i] = _ref5[0];
            heap[i_big] = _ref5[1];

            taskObj.pushValues(values);
            i = i_big;
        }
    }

    _heapSort(values);
    //end main

    taskObj.pushValues(values);
    console.log(taskObj.tasks.length);
    // taskObj.processItems();
    console.log(values);
}

var gs = new GraphicalSort();

// var Bs = new Bars(C.size);
// var Bs = new Bars(20, '#bars');
// var Bs2 = new Bars(20, '#bars2');
//sample data-binding
// setInterval(() => {
//     console.log('update');
//     var newData = shuffle(generateArray(20));
//     // console.log(newData);
//     Bs.renderData(newData);
// }, 1000)
// // // Bs.createBars();