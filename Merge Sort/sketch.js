
const w = 60;
const n = 8;
var arr = [];
var slider;
var start = false;
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function setup() {
    createCanvas(1000, 1000).parent("canvas");
    var tempDiv = createDiv("Speed");
    var startButton = createButton("Start");
    startButton.parent("buttonsBeforeCanvas");
    startButton.class("btn btn-success");
    startButton.mousePressed(() => start = true);
    tempDiv.style("margin-left", "10px");
    tempDiv.parent("buttonsBeforeCanvas");
    tempDiv.class("btn btn-outline-primary");

    slider = createSlider(1, 56, 10, 5);
    slider.parent(tempDiv);
    slider.style("margin-left", "10px");

    for (var i = 0; i < n; i++) {
        var x = floor(random(20));
        for (var j = 0; j < i; j++) {
            if (arr[j].v == x) {
                x = -1;
                break;
            }
        }
        if (x == -1) {
            i--;
            continue;
        }
        arr.push(new Num(x, i, 0));
    }

    background(0);
}

function draw() {
    var totalSize = arr.length * (w + 1);
    var left = floor((width - 0 - totalSize) / 2);
    for (var i = 0; i < arr.length; i++) {
        arr[i].x = start + left + i * (w + 1);
    }
    arr.forEach((e) => e.show());
    if(!start) return;
    push();
    mergeSort2(0, width, arr).then((e) => {
        pop();
        stroke(126);
        line(0,580,height,580);
        mergeSort(0, width, arr).then((e) => {
            e.forEach((x) => x.show());
        })
    });
    noLoop();

}
async function mergeSort2(start, end, array) {
    var t;
    var totalSize = array.length * (w + 1);
    var left = floor((end - start - totalSize) / 2);
    for (var i = 0; i < array.length; i++) {
        array[i].x = start + left + i * (w + 1);
    }
    array.forEach((e) => e.show());
    await sleep(10);

    if (array.length == 1) {
        return new Promise((e, b) => { e(array); });
    }

    var arr1 = [];

    var mid = (start + end) / 2;



    for (i = 0; 2 * i < array.length; i++) {
        arr1.push(new Num(array[i].v, array[i].x, array[i].y));
        arr1[i].y = array[i].y + 100
    }

    t = 10000 / slider.value();

    await sleep(t);

    arr1 = await mergeSort2(start, mid, arr1);

    var arr2 = [];
    for (i = arr1.length; i < array.length; i++) {
        arr2.push(new Num(array[i].v, array[i].x, array[i].y));
        arr2[i - arr1.length].y = array[i].y + 100;
    }

    t = 10000 / slider.value();

    await sleep(t);

    arr2 = await mergeSort2(mid, end, arr2);


    return new Promise((e, b) => { e(array); });
}
async function mergeSort(start, end, array) {
    var totalSize = array.length * (w + 1);
    var left = floor((end - start - totalSize) / 2);
    for (var i = 0; i < array.length; i++) {
        array[i].x = start + left + i * (w + 1);
    }
    array.forEach((e) => e.show());
    if (array.length == 1) return new Promise((e, b) => { e(array); });

    var arr1 = [];

    var mid = (start + end) / 2;



    for (i = 0; 2 * i < array.length; i++) {
        arr1.push(new Num(array[i].v, array[i].x, array[i].y));
        arr1[i].y = array[i].y + 100
    }

    arr1 = await mergeSort(start, mid, arr1);

    var arr2 = [];
    for (i = arr1.length; i < array.length; i++) {
        arr2.push(new Num(array[i].v, array[i].x, array[i].y));
        arr2[i - arr1.length].y = array[i].y + 100;
    }


    arr2 = await mergeSort(mid, end, arr2);

    array = await merge(start, end, arr1, arr2);

    return new Promise((e, b) => { e(array); });
}

async function merge(start, end, arr1, arr2) {
    var t;
    var i = 0, j = 0;
    var n1 = arr1.length;
    var n2 = arr2.length;
    var totalSize = (n1 + n2) * (w + 1);
    var left = floor((end - start - totalSize) / 2);
    var ind = 0;
    var resArr = [];

    while (i < n1 && j < n2) {
        arr1[i].current = true;
        arr2[j].current = true;
        arr1[i].show();
        arr2[j].show();

        t = 10000 / slider.value();
        await sleep(t);


        if (arr1[i].v < arr2[j].v) {
            arr1[i].current = false;
            arr1[i].selected = true;
            arr1[i].show();
         
            await sleep(t);
            arr1[i].selected = false;
            arr1[i].show();
            resArr.push(arr1[i]);
            resArr[ind].y += 100;
            resArr[ind].x = start + left + ind * (w + 1);
            resArr[ind].show();
            ind++;
            i++;
        }
        else {
            arr2[j].current = false;
            arr2[j].selected = true;
            arr2[j].show();
          
            await sleep(t);
            arr2[j].selected = false;
            arr2[j].show();
            resArr.push(arr2[j]);
            resArr[ind].y += 100;
            resArr[ind].x = start + left + ind * (w + 1);
            resArr[ind].show();
            ind++;
            j++;
        }
    }

    while (i < n1) {
        arr1[i].current = true;
        arr1[i].show();
        t = 10000 / slider.value();
        await sleep(t);
        arr1[i].current = false;
        arr1[i].selected = true;

        arr1[i].show();
       
        await sleep(t);
        arr1[i].selected = false;
        arr1[i].show();
        resArr.push(arr1[i]);
        resArr[ind].y += 100;
        resArr[ind].x = start + left + ind * (w + 1);
        resArr[ind].show();
        ind++;
        i++;
    }
    

    while (j < n2) {
        arr2[j].current = true;
        arr2[j].show();
        t = 10000 / slider.value();
        await sleep(t);
        arr2[j].current = false;
        arr2[j].selected = true;
        arr2[j].show();
        await sleep(t);
        arr2[j].selected = false;
        arr2[j].show();
        resArr.push(arr2[j]);
        resArr[ind].y += 100;
        resArr[ind].x = start + left + ind * (w + 1);
        resArr[ind].show();
        j++;
        ind++;
    }
    for (i = 0; i < resArr.length; i++) {
        resArr[i].selected = false;
        resArr[i].current = false;
    }

    return new Promise((e, b) => { e(resArr); });


}  