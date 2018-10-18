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
    let diffArray = [];

    while(array1.length !== 0){
        let currentVal = array1[0];
        array1.splice(0,1);

        if(!array2.includes(currentVal)){
            diffArray.push(currentVal);
        }
    }

    return diffArray;
}

function radians(degrees){
    return degrees * Math.PI / 180;
}

function getGeoLocationDistance(location1, location2){
    let earthrRad = 6371;
    let del1 = radians(parseFloat(location1.lat));
    let del2 = radians(parseFloat(location2.lat));

    let sumdel = radians(parseFloat(location2.lat - location1.lat));
    let sumlam = radians(parseFloat(location2.lon - location1.lon));

    let haversine = Math.sin(sumdel/2)*Math.sin(sumdel/2) + Math.cos(del1)*Math.cos(del2) * Math.sin(sumlam/2)*Math.sin(sumlam/2);
    let c = 2*Math.atan2(Math.sqrt(haversine), Math.sqrt(1-haversine));

    let distance = earthrRad*c;

    return (distance*0.6214).toFixed(2);
}

function getTimeDifference(time1, time2){
    let beginningTime = new Date(time1);
    let endTime = new Date(time2);

    let timeDifference = endTime.getHours() -  beginningTime.getHours();
    return timeDifference.toString() + " hours ago";
}

module.exports = {
    reverseArray: reverseArray,
    orderArray: orderArray,
    getDiffArray: getDiffArray,
    getGeoLocationDistance: getGeoLocationDistance,
    getTimeDifference: getTimeDifference
}