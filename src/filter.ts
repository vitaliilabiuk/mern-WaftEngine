export function getTopN(arr, prop, n) {
    // clone before sorting, to preserve the original array
    var clone = arr.slice(0); 

    // sort descending
    clone.sort(function(x, y) {
        if (x[prop] == y[prop]) return 0;
        else if (parseInt(x[prop]) < parseInt(y[prop])) return 1;
        else return -1;
    });

    return clone.slice(0, n || 1);
}

export function getMax(array, propName) {
    var max = 0;
    var maxItem = null;
    for(var i=0; i<array.length; i++) {
        var item = array[i];
        if(item[propName] > max) {
            max = item[propName];
            maxItem = item;
        }
    }

    return maxItem;
}