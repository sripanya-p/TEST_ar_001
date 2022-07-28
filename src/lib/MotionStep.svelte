<script>
    import {onMount} from "svelte";
    import ColorScale from "color-scales";
    import {v4 as uuidv4} from "uuid";

    import _ from "lodash";
    import {motionStepArray} from "./MotionStepArray.js";
    import {
        addNewGroup,
        createFristNewGridLastGroup,
        pushNewArray,
        randomDeleteArea,
        selectLastGroup,
        setDeleteAreaFromArray,
        updateGroup,
        addNewGridCurrentGroup,
        stepDeleteGrid,
        addNewGroupSetTwo,
        createFristNewGridLastGroupSet2,
        addNewGridCurrentGroupSet2, createFristNewGridLastGroupSet3,
        addNewGridCurrentGroupSet3
    } from "./projectFunction.js";
    import {
        calculateAreaKeynoteSize,
        calculateImageRatioFitScreen,
        selectGradientDirection
    } from "./canvasFunction.js";
    import MotionStepSVG1080 from "./MotionStepSVG1080.svelte";


    let selectArea = motionStepArray;

    let mainCol = 10;
    let mainRow = 18;

    let minRandomNumberOfGrid = 3;
    let maxRandomNumberOfGrid = 30;
    let setNumberOfRandom = 50;

    let mainRandomSpeedMin = 0.001;
    let mainRandomSpeedMax = 0.01;

    const imgWidth = 1080;
    const imgHeight = 1920;


    // let calculateScreenRatio = calculateImageRatioFitScreen(imgWidth, imgHeight, fixWidth, fixHeight);
    let calculateScreenRatio = calculateImageRatioFitScreen(imgWidth, imgHeight, window.innerWidth, window.innerHeight);

    let calculateHeight = calculateAreaKeynoteSize(calculateScreenRatio.height, 0.0221088, 0.9778912);
    // console.log(calculateHeight)
    // let boxWidth = calculateHeight.bottom / mainRow;
    let boxWidth = calculateScreenRatio.width / mainCol;

    let mainGroups = [];
    let mainGrids = [];


    let automationInterval;
    let automationIntervalSet2;

    addEventListener('resize', (event) => {
        console.log('resize')


        calculateScreenRatio = calculateImageRatioFitScreen(imgWidth, imgHeight, window.innerWidth, window.innerHeight);

        calculateHeight = calculateAreaKeynoteSize(calculateScreenRatio.height, 0.0221088, 0.9778912);
        // console.log(calculateHeight)
        // let boxWidth = calculateHeight.bottom / mainRow;
        boxWidth = calculateScreenRatio.width / mainCol;

        }
    );

    function runSequence() {

        // clearInterval(automationIntervalSet2);

        mainGrids = [];
        mainGroups = [];

        mainGrids = pushNewArray(mainRow, mainCol);

        mainGrids = setDeleteAreaFromArray(mainGrids, selectArea);
        mainGrids = randomDeleteArea(mainGrids, 3, 8);


        let randArray = [];
        for (let i = 0; i < setNumberOfRandom; i++) {
            randArray.push(_.random(minRandomNumberOfGrid, maxRandomNumberOfGrid));
        }

        for (let i = 0; i < randArray.length; i++) {
            mainGroups = addNewGroup(mainGroups, mainRandomSpeedMin, mainRandomSpeedMax);
            mainGrids = createFristNewGridLastGroup(mainGrids, mainGroups, selectLastGroup(mainGroups));

            for (let j = 0; j < randArray[i]; j++) {
                mainGrids = addNewGridCurrentGroup(mainGrids, mainGroups);
            }

            mainGroups = updateGroup(mainGrids, mainGroups);
        }


        ///// SEQUENTIAL

        // Automation
        let automationOn = true;
        if (automationOn) {
            setTimeout(() => {
                automationInterval = setInterval(() => {
                    let stepDelete;
                    _.range(3).forEach(() => {
                            stepDelete = stepDeleteGrid(mainGrids, mainGroups);
                            mainGrids = stepDelete.mainGrids;
                            mainGroups = stepDelete.mainGroups;
                            // console.log('HH');
                        }
                    );
                }, 1000);
                // def = 1000
            }, 10000);
            //    def = 10000
        }


        // PHASE 2

        setTimeout(() => {

            clearInterval(automationInterval);
            mainGrids.forEach(grid => {
                    grid.group = undefined;
                }
            );


            _.range(mainRow).forEach((num) => {

                    mainGroups = addNewGroupSetTwo(mainGroups, mainRandomSpeedMin, mainRandomSpeedMax, 1);
                    let currentGroup = selectLastGroup(mainGroups).group;

                    mainGrids.forEach(grid => {
                            if (grid.active === 1 && grid.col === num) {
                                grid.group = currentGroup;
                            }
                        }
                    );
                }
            );
            mainGroups = updateGroup(mainGrids, mainGroups);
        }, 30000);
        // def 30000


        setTimeout(() => {
            _.range(mainRow).forEach((num) => {

                    mainGroups = addNewGroupSetTwo(mainGroups, mainRandomSpeedMin, mainRandomSpeedMax, 2);
                    let currentGroup = selectLastGroup(mainGroups).group;

                    mainGrids.forEach(grid => {
                            if (grid.active === 1 && grid.col === num && (grid.row === 7 || grid.row === 8 || grid.row === 9)) {
                                grid.group = currentGroup;
                            }
                        }
                    );
                }
            );

            mainGroups = updateGroup(mainGrids, mainGroups);
        }, 50000);
        // def 50000


        setTimeout(() => {
            automationIntervalSet2 = setInterval(() => {
                mainGroups = addNewGroup(mainGroups, mainRandomSpeedMin, mainRandomSpeedMax);
                mainGrids = createFristNewGridLastGroupSet2(mainGrids, mainGroups, selectLastGroup(mainGroups));
                const randNum = _.random(3, 30);
                _.range(randNum).forEach(() => {
                        mainGrids = addNewGridCurrentGroupSet2(mainGrids, mainGroups);
                    }
                );

                mainGroups = updateGroup(mainGrids, mainGroups);
            }, 500);


        }, 60000);

        setTimeout(() => {

            clearInterval(automationIntervalSet2);
            const filterAA = _.reject(mainGroups, function (o) {
                return !o.arrayGroup.length > 0;
            });
            const sortAA = _.sortBy(filterAA, 'arrayGroup'.length);
            // console.log(sortAA);
            // console.log(mainGroups)


            let currentGroup = selectLastGroup(mainGroups).group;

            mainGrids = _.map(mainGrids, function (o) {
                if (o.group !== undefined) {
                    o.group = currentGroup;
                }

                return o;
            });

            mainGroups = updateGroup(mainGrids, mainGroups);


        }, 90000);


        setTimeout(() => {

            mainGroups = addNewGroup(mainGroups, mainRandomSpeedMin, mainRandomSpeedMax);
            let currentGroupP3 = selectLastGroup(mainGroups).group;

            mainGrids = createFristNewGridLastGroupSet3(mainGrids, mainGroups, selectLastGroup(mainGroups));
            _.range(150).forEach(() => {
                    mainGrids = addNewGridCurrentGroupSet3(mainGrids, mainGroups);
                }
            );

            mainGroups = updateGroup(mainGrids, mainGroups);

        }, 100000);


        setTimeout(() => {
            mainGroups = addNewGroup(mainGroups, mainRandomSpeedMin, mainRandomSpeedMax);
            let currentGroupP3 = selectLastGroup(mainGroups).group;

            mainGrids = createFristNewGridLastGroupSet3(mainGrids, mainGroups, selectLastGroup(mainGroups));
            _.range(150).forEach(() => {
                    mainGrids = addNewGridCurrentGroupSet3(mainGrids, mainGroups);
                }
            );

            mainGroups = updateGroup(mainGrids, mainGroups);
        }, 105000);


    }

    runSequence();
    setInterval(() => {
        runSequence();
    }, 115000);
    // console.log(mainGrids);
    // console.log(mainGroups);


    //////

    let colorScale = new ColorScale(0, 100, ["#F6F6F6", "#2A3943"], 1);

    let canvas;

    onMount(() => {

        function init() {
            window.requestAnimationFrame(draw);
        }

        let countDraw = 0;


        function draw() {
            const ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            mainGroups.forEach(group => {
                if (group.arrayGroup.length > 0) {
                    group.startValue += group.randomMultiple;
                    const controlValue = (Math.sin(group.startValue) * 100) + 100;
                    if (controlValue > 100) {
                        let tempC = colorScale.getColor(controlValue - 100);
                        let tempCC = colorScale.getColor(100);
                        group.colorA = `rgb(${tempC.r}, ${tempC.g}, ${tempC.b})`;
                        group.colorB = `rgb(${tempCC.r}, ${tempCC.g}, ${tempCC.b})`;
                    }
                    if (controlValue < 100) {
                        let tempC = colorScale.getColor(controlValue);
                        let tempCC = colorScale.getColor(0);
                        group.colorB = `rgb(${tempC.r}, ${tempC.g}, ${tempC.b})`;
                        group.colorA = `rgb(${tempCC.r}, ${tempCC.g}, ${tempCC.b})`;
                    }

                    let gMinX = Math.round(group.minX * boxWidth);
                    let gMaxX = Math.round((group.maxX * boxWidth) + boxWidth);
                    let gMinY = Math.round((group.minY * boxWidth) + calculateHeight.upper);
                    let gMaxY = Math.round((group.maxY * boxWidth) + boxWidth + calculateHeight.upper);


                    let arrDirection = selectGradientDirection(gMinX, gMinY, gMaxX, gMaxY, group.direction);
                    let grd = ctx.createLinearGradient(...arrDirection);
                    grd.addColorStop(0, group.colorA);
                    grd.addColorStop(1, group.colorB);

                    group.arrayGroup.forEach(grid => {
                        if (grid.active === 1) {
                            let minX = Math.round(grid.col * boxWidth);
                            let maxX = Math.round((grid.col * boxWidth) + boxWidth);
                            let minY = Math.round((grid.row * boxWidth) + calculateHeight.upper);
                            let maxY = Math.round((grid.row * boxWidth) + boxWidth + calculateHeight.upper);


                            ctx.beginPath();
                            ctx.moveTo(minX, minY);
                            ctx.lineTo(maxX, minY);
                            ctx.lineTo(maxX, maxY);
                            ctx.lineTo(minX, maxY);
                            ctx.closePath();
                            // ctx.fillStyle = group.color;
                            ctx.fillStyle = grd;
                            ctx.fill();
                        }
                    });
                }


            });
            window.requestAnimationFrame(draw);
        }

        init();
    });

    // console.log(mainGroups);


</script>

<canvas
        class="this-canvas"
        bind:this={canvas}
        width={calculateScreenRatio.width }
        height={calculateScreenRatio.height }
></canvas>

<MotionStepSVG1080 sizeCanvas={{width: calculateScreenRatio.width, height: calculateScreenRatio.height}}/>

<style>

    .this-canvas {
        /*border: 1px solid;*/
        position: absolute;
        z-index: 1;

        top: 50%;
        left: 50%;
        /*transform: translate(-50%, -50%);*/
        transform: translate(-50%, -50%) scale(2);
    }
</style>

