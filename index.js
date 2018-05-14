function reverseString(string)
{

    //finds position of . and removes it
    let position = string.indexOf('.');
    string = string.slice(0,position);

    //splits string and reverses it
    string = string.split(' ').reverse();
    return string;
}

function sortAlphaInts(arr)
{
    //takes all strings and turns them into numbers
    arr.forEach((item, index) => {
        arr[index] = Number(item);
    });

    //sorts them based on which is smaller
    arr.sort((a,b) => {
        return (a) - (b);
    });

    return arr;
}

function arrDiff(arrOne, arrTwo)
{
    let tmp = [];
    arrOne = sortAlphaInts(arrOne);
    arrTwo = sortAlphaInts(arrTwo);
    arrOne.forEach(i => {
        if(arrTwo.indexOf(i) === -1)
        {
            tmp.push(i);
        }
    });

    return tmp;
}


/*
implements haversine formula
https://en.wikipedia.org/wiki/Haversine_formula
*/
function diffPoints(pointOne, pointTwo)
{
    const R = 6371; // Radius of the earth in km
    let dLat = degTorad(pointTwo.lat-pointOne.lat);
    let dLon = degTorad(pointTwo.lon - pointOne.lon);
    let a =
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(degTorad(pointOne.lat)) * Math.cos(degTorad(pointTwo.lat)) *
        Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c;
    return (d / 1.609).toFixed(2) // Convert to Miles;
}

function degTorad(deg)
{
    return deg * (Math.PI/180)
}

function timeDif(timeOne, timeTwo)
{
    const dateOne = new Date(timeOne);
    const dateTwo = new Date(timeTwo);

    const miliDif = dateOne - dateTwo;

    const hourDif = miliDif / (1000 * 60 * 60);
    if(hourDif < 0)
    {
        const hours = Math.abs(hourDif);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`
    }
    else
    {
        const hours = Math.abs(hourDif);
        return `${hours} hour${hours > 1 ? 's' : ''} in the future`
    }
    return hourDif;
}

export {reverseString, sortAlphaInts, arrDiff, diffPoints ,timeDif};
