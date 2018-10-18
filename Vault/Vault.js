function reverseArray(array){
    let revArray = [];
    array = array.split('.').join('');
    array = array.split(/[ ]+/);

    for(let i = array.length -1; i >=0; i--){
        revArray.push(array[i]);
    }

    return revArray;
}

function orderArray(array){
    let sortedArray = [];

    if(array.length === 0){
        return [];
    }
    else{
        let decimal = '.';

        for(let i =0; i < array.length; i++){
            if(array[i].includes(decimal)){
                sortedArray.push(parseFloat(array[i]));
            }
            else{
                sortedArray.push(parseInt(array[i]));
            }
        }
    }
    return sortedArray.sort();
}

function getDiffArray(array1, array2){

}

function getGeoLocationDistance(location1, location2){

}

function getTimeDifference(timeStamp){

}

module.exports = {
    reverseArray: reverseArray,
    orderArray: orderArray,
    getDiffArray: getDiffArray,
    getGeoLocationDistance: getGeoLocationDistance,
    getTimeDifference: getTimeDifference
}