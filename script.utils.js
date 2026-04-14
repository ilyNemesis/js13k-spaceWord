export { getRandomInt, rectIntersect, circleIntersect, timeToString, generateString };

const characters ='abcdefghijklmnopqrstuvwxyz';


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2) {
    if (x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        return false;
    }
    return true;
}

function circleIntersect(x1, y1, r1, x2, y2, r2) {
    let squareDistance = (x1-x2) * (x1-x2) + (y1-y2) * (y1-y2);
    return squareDistance <= ((r1 + r2) * (r1 + r2))
}

function timeToString(time) {
    //TODO - Entendi nada não mas tamo ai - https://tinloof.com/blog/how-to-build-a-stopwatch-with-html-css-js-react-part-2/
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    let formattedMM = mm.toString().padStart(2, "0");
    let formattedSS = ss.toString().padStart(2, "0");
    let formattedMS = ms.toString().padStart(2, "0");

    return `${formattedMM}:${formattedSS}:${formattedMS}`;
}

function generateString(length) {
    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}