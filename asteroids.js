"use strict";
function asteroids() {
    const svg = document.getElementById("canvas");
    let asteroid_array = new Array();
    var shooting = new Audio("fire.wav");
    var asteroid_explode = new Audio("bangMedium.wav");
    let scoreboard = document.getElementById("score");
    let score = 0;
    let g = new Elem(svg, 'g')
        .attr("transform", "translate(300 300)")
        .attr("posX", 300)
        .attr("posY", 300)
        .attr("XDegree", 0);
    Observable.interval(2000).subscribe(() => spawnAsteroids());
    function spawnAsteroids() {
        const random_spawn_x = Math.floor(Math.random() * svg.getBoundingClientRect().width);
        const random_spawn_y = Math.random() * svg.getBoundingClientRect().height;
        const random_size = Math.floor(Math.random() * 40) + 15;
        const random_movement = Math.floor(Math.random()) === 0 ? Math.floor(Math.random()) + 1 : -1;
        let asteriod_regular = new Elem(svg, 'circle')
            .attr('cx', random_spawn_x)
            .attr('cy', random_spawn_y)
            .attr('r', random_size)
            .attr('size-', "regular")
            .attr('fill', 'transparent')
            .attr('stroke', 'white');
        asteroid_array.push(asteriod_regular);
        Observable.interval(50).subscribe(() => asteriod_regular.attr('cx', random_movement + Number(asteriod_regular.attr('cx')))
            .attr('cx', Number(asteriod_regular.attr('cx')) > 600 ? 0 : Number(asteriod_regular.attr('cx'))));
        Observable.interval(50).subscribe(() => asteriod_regular.attr('cy', random_movement + Number(asteriod_regular.attr('cy')))
            .attr('cy', Number(asteriod_regular.attr('cy')) > 600 ? 0 : Number(asteriod_regular.attr('cy'))));
    }
    function dist_calculation_ship_asteroid(x1, y1, elem) {
        Math.sqrt(((Number(g.attr('posX')) - x1) ** 2) + ((Number(g.attr('posY')) - y1) ** 2))
            < Number(elem.attr('r')) ? GameOver() : undefined;
    }
    Observable.interval(1000).subscribe(() => collision_detection());
    function collision_detection() {
        asteroid_array.forEach((element) => dist_calculation_ship_asteroid(Number(element.attr('cx')), Number(element.attr('cy')), element));
    }
    function removeElementFromArray(elem) {
        const index = asteroid_array.indexOf(elem);
        delete asteroid_array[index];
    }
    function GameOver() {
        window.alert("Game Over. Your ship collied with an asteroid. Refresh the page or Ctrl+R and press OK to restart the game!!");
    }
    let ship = new Elem(svg, 'polygon', g.elem)
        .attr("points", "-15,20 15,20 0,-20")
        .attr("style", "fill:transparent;stroke:lime;stroke-width:1");
    const keydown_w = Observable.fromEvent(document, "keydown");
    keydown_w.filter(pressed => pressed.keyCode === 87)
        .subscribe(_ => g.attr("transform", "translate(" + Number(g.attr("posX")) + " " + Number(g.attr("posY")) + ")"
        + "rotate(" + Number(g.attr("XDegree")) + ")")
        .attr("posX", Number(g.attr('posX')) < 0 ? svg.getBoundingClientRect().width : Number(g.attr('posX')) > 600 ? 0 : Number(g.attr('posX')) + CalculateDirection_x())
        .attr("posY", Number(g.attr("posY")) < 0 ? svg.getBoundingClientRect().height : Number(g.attr("posY")) > 600 ? 0 : Number(g.attr('posY')) + CalculateDirection_y())
        .attr("XDegree", Number(g.attr('XDegree'))));
    const keydown_space = Observable.fromEvent(document, "keydown");
    keydown_space.filter(pressed => pressed.keyCode === 32)
        .subscribe(_ => laserObserve());
    const arrow_left = Observable.fromEvent(document, "keydown");
    arrow_left.filter(pressed => pressed.keyCode === 37)
        .subscribe(_ => g.attr("transform", "translate(" + Number(g.attr("posX")) + " " + Number(g.attr("posY")) + ")"
        + "rotate(" + Number(g.attr("XDegree")) + ")")
        .attr("posX", Number(g.attr("posX"))).attr("posY", Number(g.attr("posY"))).attr("XDegree", Number(g.attr("XDegree")) - 5));
    const arrow_right = Observable.fromEvent(document, "keydown");
    arrow_right.filter(pressed => pressed.keyCode === 39)
        .subscribe(_ => g.attr("transform", "translate(" + Number(g.attr("posX")) + " " + Number(g.attr("posY")) + ")"
        + "rotate(" + Number(g.attr("XDegree")) + ")")
        .attr("posX", Number(g.attr("posX"))).attr("posY", Number(g.attr("posY"))).attr("XDegree", Number(g.attr("XDegree")) + 5));
    function CalculateDirection_x() {
        const DegreeTorad = (Math.PI / 180) * (Number(g.attr("XDegree")) - 90);
        const new_ship_x = (Math.cos(DegreeTorad) * 10);
        return new_ship_x;
    }
    function CalculateDirection_y() {
        const DegreeTorad = (Math.PI / 180) * (Number(g.attr("XDegree")) - 90);
        const new_ship_y = (Math.sin(DegreeTorad) * 10);
        return new_ship_y;
    }
    function laserObserve() {
        const DegreeTorad = (Math.PI / 180) * (Number(g.attr("XDegree")) - 90);
        const new_x = (Math.cos(DegreeTorad) * 10);
        const new_y = (Math.sin(DegreeTorad) * 10);
        const laser = new Elem(svg, 'circle')
            .attr('cx', Number(g.attr('posX')))
            .attr('cy', Number(g.attr('posY')))
            .attr('r', 3)
            .attr('fill', 'red');
        shooting.play();
        Observable.interval(20).subscribe(() => laser.attr('cx', Number(laser.attr('cx')) + new_x));
        Observable.interval(20).subscribe(() => laser.attr('cy', Number(laser.attr('cy')) + new_y));
        function dist_calculation_bullet_asteroid(x1, y1, elem) {
            Math.sqrt(((Number(laser.attr('cx')) - x1) ** 2) + ((Number(laser.attr('cy')) - y1) ** 2))
                < Number(elem.attr('r')) ? asteroid_explode.play() && svg.removeChild(elem.elem) && score++ && svg.removeChild(laser.elem) && removeElementFromArray(elem)
                : undefined;
        }
        Observable.interval(10).subscribe(() => collision_detection_bullet_asteroid());
        function collision_detection_bullet_asteroid() {
            asteroid_array.forEach((element) => dist_calculation_bullet_asteroid(Number(element.attr('cx')), Number(element.attr('cy')), element));
        }
    }
    function ScoreBoard() {
        scoreboard.innerHTML = `${"Score:" + score}`;
    }
    Observable.interval(1).subscribe(() => ScoreBoard());
}
if (typeof window != 'undefined')
    window.onload = () => {
        asteroids();
    };
//# sourceMappingURL=asteroids.js.map