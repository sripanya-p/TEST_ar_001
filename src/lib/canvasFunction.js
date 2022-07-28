export function calculateImageRatioFitScreen(width, height) {
    let multiple = 1; // original = 0.95
    let ratio = width / height;
    let screenWidth = window.innerWidth * multiple;
    let screenHeight = window.innerHeight * multiple;
    let newWidth = screenWidth;
    let newHeight = screenWidth / ratio;
    if (newHeight > screenHeight) {
        newHeight = screenHeight;
        newWidth = screenHeight * ratio;
    }
    return {
        width: newWidth,
        height: newHeight
    };
}


export function calculateAreaKeynoteSize(height, upperMultiple, bottomMultiple) {
    return {
        upper: height * upperMultiple,
        bottom: height * bottomMultiple
    };
}


export function selectGradientDirection(minX, minY, maxX, maxY, select) {
    // select = 1 - 8 == DIRECTION | L1 LU2 U3 UR4 R5 RD6 D7 DL8
    switch (select) {
        case 1:
            return [maxX, minY, minX, minY];
        case 2:
            return [maxX, maxY, minX, minY];
        case 3:
            return [minX, maxY, minX, minY];
        case 4:
            return [minX, maxY, maxX, minY];
        case 5:
            return [minX, minY, maxX, minY];
        case 6:
            return [minX, minY, maxX, maxY];
        case 7:
            return [minX, minY, minX, maxY];
        case 8:
            return [maxX, minY, minX, maxY];
        default:
            return 0;
    }
}



