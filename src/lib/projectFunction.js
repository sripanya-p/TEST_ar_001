import _ from "lodash";
import {v4 as uuidv4} from "uuid";

const pushNewArray = (mRow, mCol) => {
    let tempGrid = [];
    let arrPosition = 0;
    _.range(mRow).forEach((row) => {
        _.range(mCol).forEach((col) => {
            let neighbor = [];
            // neighborLeft
            if (col > 0) {
                neighbor.push({row: row, col: col - 1});
            }
            // neighborRight
            if (col < mCol - 1) {
                neighbor.push({row: row, col: col + 1});
            }
            // neighborLeftUp
            if (row > 0) {
                neighbor.push({row: row - 1, col: col});
            }
            // neighborLeftDown
            if (row < mRow - 1) {
                neighbor.push({row: row + 1, col: col});
            }
            tempGrid.push({
                row,
                col,
                group: undefined,
                active: 0,
                neighbor,
                deleted: 0,
                arrayPosition: arrPosition,
                set2: undefined,
                set3: undefined,

            });
            arrPosition += 1;
        });
    });

    return tempGrid;
};


const setDeleteAreaFromArray = (mainG, selectA) => {
    let tempGrid = mainG;
    let tempSelArea = selectA;
    tempGrid.forEach(grid => {
        tempSelArea.forEach(step => {
            if (+grid.col === +step.col && +grid.row === +step.row) {
                grid.deleted = 1;
            }
        });
    });

    return tempGrid;
};


const randomDeleteArea = (mGrid, min, max) => {
    let tempGrid = mGrid;
    _.range(_.random(min, max)).forEach(() => {
        const randGrid = _.sample(_.filter(tempGrid, {'deleted': 0}));
        tempGrid.forEach(grid => {
            if (+grid.col === +randGrid.col && +grid.row === +randGrid.row) {
                grid.deleted = 1;
            }
        });
    });

    return tempGrid;
};


const addNewGroup = (mGroup, minRandSpeed, maxRandSpeed) => {
    let tempGroup = mGroup;
    const groupID = uuidv4();

    tempGroup.push({
            group: groupID,
            arrayGroup: [],
            startValue: _.random(0, 100),
            randomMultiple: _.random(minRandSpeed, maxRandSpeed),
            direction: _.random(1, 8),
            color: `rgb(${_.random(0, 255)},${_.random(0, 255)},${_.random(0, 255)})`,
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0,
        }
    );
    return tempGroup;
};


export function addNewGroupSetTwo(mGroup, minRandSpeed, maxRandSpeed, setDirection) {
    let tempGroup2 = mGroup;
    const groupID = uuidv4();
    let rand;
    if (setDirection === 1) {
        rand = 1;
    } else {
        rand = 5;
    }

    let randSpeed = (minRandSpeed + maxRandSpeed) / 2;

    tempGroup2.push({
            group: groupID,
            arrayGroup: [],
            // startValue: _.random(0, 100),
            startValue: 0,
            randomMultiple: randSpeed,
            // randomMultiple: _.random(minRandSpeed, maxRandSpeed),
            direction: rand,
            // direction: _.random(1, 8),
            color: `rgb(${_.random(0, 255)},${_.random(0, 255)},${_.random(0, 255)})`,
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 0,
        }
    );
    return tempGroup2;
};

const selectLastGroup = (mGroup) => {
    return mGroup[mGroup.length - 1];
};


const createFristNewGridLastGroup = (mGrid, mGroup, lastGroup) => {
    const filterActive = _.filter(mGrid, {active: 0});
    const findIndexFromRandomGrid = _.findIndex(mGrid, _.sample(filterActive));
    // console.log(findIndexFromRandomGrid);
    if (filterActive.length > 0) {
        mGrid[findIndexFromRandomGrid].active = 1;
        mGrid[findIndexFromRandomGrid].group = lastGroup.group;
        mGrid[findIndexFromRandomGrid].color = lastGroup.color;
    }

    return mGrid;
};


export function createFristNewGridLastGroupSet2(mGrid, mGroup, lastGroup){
    const filterActive = _.filter(mGrid, {active: 1, set2: undefined});
    const findIndexFromRandomGrid = _.findIndex(mGrid, _.sample(filterActive));

    // console.log(filterActive);
    if (filterActive.length > 0) {
        mGrid[findIndexFromRandomGrid].set2 = 1;
        mGrid[findIndexFromRandomGrid].group = lastGroup.group;
        mGrid[findIndexFromRandomGrid].color = lastGroup.color;
    }

    return mGrid;
}


export function createFristNewGridLastGroupSet3(mGrid, mGroup, lastGroup){
    const filterActive = _.filter(mGrid, {active: 1, set3: undefined});
    const findIndexFromRandomGrid = _.findIndex(mGrid, _.sample(filterActive));

    // console.log(filterActive);
    if (filterActive.length > 0) {
        mGrid[findIndexFromRandomGrid].set3 = 1;
        mGrid[findIndexFromRandomGrid].group = lastGroup.group;
        mGrid[findIndexFromRandomGrid].color = lastGroup.color;
    }

    return mGrid;
}


const updateGroup = (mGrid, mGroup) => {
    // Update Array Group And Min Max X Y
    let tempGroup = mGroup;
    tempGroup.forEach(group => {
        let gMinX = [];
        let gMaxX = [];
        let gMinY = [];
        let gMaxY = [];
        group.arrayGroup = _.filter(mGrid, {'group': group.group});
        group.arrayGroup.forEach(grid => {
            gMinX.push(grid.col);
            gMaxX.push(grid.col);
            gMinY.push(grid.row);
            gMaxY.push(grid.row);
        });
        group.minX = _.min(gMinX);
        group.maxX = _.max(gMaxX);
        group.minY = _.min(gMinY);
        group.maxY = _.max(gMaxY);

    });


    return tempGroup;
};


const addNewGridCurrentGroup = (mGrid, mGroup) => {
    let tempGrid = mGrid;
    let count = 10;
    while (true) {
        count += 1;

        const currentGroupID = selectLastGroup(mGroup).group;
        const selectNeighbor = _.sample(_.filter(tempGrid, {'group': currentGroupID}));

        if (selectNeighbor === undefined) {
            break;
        }
        const randomGridNeighbor = _.sample(selectNeighbor.neighbor);


        const findIndexNeighbor = _.findIndex(tempGrid, {"row": randomGridNeighbor.row, "col": randomGridNeighbor.col});


        const isActive = tempGrid[findIndexNeighbor].active;


        if (isActive === 0) {
            tempGrid[findIndexNeighbor].active = 1;
            tempGrid[findIndexNeighbor].group = currentGroupID;
            break;
        }
        if (count > 10) {
            break;
        }
    }


    return tempGrid;

};


const addNewGridCurrentGroupSet2 = (mGrid, mGroup) => {
    let tempGrid = mGrid;
    let count = 10;
    while (true) {
        count += 1;

        const currentGroupID = selectLastGroup(mGroup).group;
        const selectNeighbor = _.sample(_.filter(tempGrid, {'group': currentGroupID}));

        if (selectNeighbor === undefined) {
            break;
        }
        const randomGridNeighbor = _.sample(selectNeighbor.neighbor);


        const findIndexNeighbor = _.findIndex(tempGrid, {"row": randomGridNeighbor.row, "col": randomGridNeighbor.col});


        const isActive = tempGrid[findIndexNeighbor].set2;


        if (isActive === undefined) {
            tempGrid[findIndexNeighbor].set2 = 1;
            tempGrid[findIndexNeighbor].group = currentGroupID;
            break;
        }
        if (count > 10) {
            break;
        }
    }


    return tempGrid;

};


const addNewGridCurrentGroupSet3 = (mGrid, mGroup) => {
    let tempGrid = mGrid;
    let count = 10;
    while (true) {
        count += 1;

        const currentGroupID = selectLastGroup(mGroup).group;
        const selectNeighbor = _.sample(_.filter(tempGrid, {'group': currentGroupID}));

        if (selectNeighbor === undefined) {
            break;
        }
        const randomGridNeighbor = _.sample(selectNeighbor.neighbor);


        const findIndexNeighbor = _.findIndex(tempGrid, {"row": randomGridNeighbor.row, "col": randomGridNeighbor.col});


        const isActive = tempGrid[findIndexNeighbor].set3;


        if (isActive === undefined) {
            tempGrid[findIndexNeighbor].set3 = 1;
            tempGrid[findIndexNeighbor].group = currentGroupID;
            break;
        }
        if (count > 10) {
            break;
        }
    }


    return tempGrid;

};

const addNewGridCurrentGroupOld = (mGrid, mGroup) => {
    let tempGrid = mGrid;
    const randomTime = 5;
    for (let i = 0; i < randomTime; i++) {
        const currentGroupID = selectLastGroup(mGroup).group;
        const currentGroup = _.filter(tempGrid, {group: currentGroupID});
        const randGroup = _.sample(currentGroup);
        const randNeighbor = _.sample(randGroup.neighbor);
        const findIndexNeighbor = _.findIndex(tempGrid, {"row": randNeighbor.row, "col": randNeighbor.col});

        const isActive = tempGrid[findIndexNeighbor].active;

        if (isActive === 0) {
            tempGrid[findIndexNeighbor].active = 1;
            tempGrid[findIndexNeighbor].group = currentGroupID;

            break;
        }

    }

    return tempGrid;

};

export function stepDeleteGrid(mGrid, mGroup) {
    let tempMainGroup = mGroup;
    let tempMainGrid = mGrid;
    let tempMG = (_.filter(mGrid, {deleted: 1}));
    if (tempMG.length > 0) {
        // console.log("WORK");
        let randDelete = _.sample(tempMG).arrayPosition;

        tempMainGrid[randDelete].active = 0;
        tempMainGrid[randDelete].group = undefined;
        tempMainGrid[randDelete].deleted = 0;

        tempMainGroup = updateGroup(mGrid, mGroup);
    }

    return {
        mainGrids: tempMainGrid,
        mainGroups: tempMainGroup
    };

}


export {
    pushNewArray,
    setDeleteAreaFromArray,
    randomDeleteArea,
    addNewGroup,
    selectLastGroup,
    createFristNewGridLastGroup,
    updateGroup,
    addNewGridCurrentGroup,
    addNewGridCurrentGroupSet2,
    addNewGridCurrentGroupSet3
};
