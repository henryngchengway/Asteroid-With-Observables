// FIT2102 2019 Assignment 1
// https://docs.google.com/document/d/1Gr-M6LTU-tfm4yabqZWJYg-zTjEVqHKKTCvePGCYsUA/edit?usp=sharing

function asteroids() {
  // Inside this function you will use the classes and functions 
  // defined in svgelement.ts and observable.ts
  // to add visuals to the svg element in asteroids.html, animate them, and make them interactive.
  // Study and complete the Observable tasks in the week 4 tutorial worksheet first to get ideas.

  // You will be marked on your functional programming style
  // as well as the functionality that you implement.
  // Document your code!  
  // Explain which ideas you have used ideas from the lectures to 
  // create reusable, generic functions.
  const svg = document.getElementById("canvas")!;
  let asteroid_array = new Array()
  var shooting = new Audio("fire.wav") // sound effect for shooting
  var asteroid_explode = new Audio("bangMedium.wav") // sound effect for asteroid explosion
  let scoreboard:HTMLElement = document.getElementById("score")!
  let score:number = 0
  // make a group for the spaceship and a transform to move it and rotate it
  // to animate the spaceship you will update the transform property
  let g = new Elem(svg,'g')
    .attr("transform","translate(300 300)") 
    .attr("posX",300) // the ship's x position, this attribute will keep updating when the ship moves through x-axis
    .attr("posY",300) // the ship's y position, this attribute will keep updating when the ship moves through y-axis
    .attr("XDegree", 0) // the ship's pointing rotated direction
    

  // Below observables allows us to animate the asteroids so that it can move within the canvas
  // Every 2 seconds, the game will spawn a new asteroid in the map within the canvas
  Observable.interval(2000).subscribe(() => spawnAsteroids());
  function spawnAsteroids() {
    const random_spawn_x = Math.floor(Math.random() * svg.getBoundingClientRect().width); // random integer from 0 to 600
    const random_spawn_y = Math.random() * svg.getBoundingClientRect().height // random integer from 0 to 600
    const random_size = Math.floor(Math.random() * 40) + 15 // random integer size from 15 to 55
    const random_movement = Math.floor(Math.random()) === 0 ? Math.floor(Math.random()) + 1 : -1 // animate the asteroid from -1 to 1
    // creating circle elements as asteroids that is randomly spawn inside the map and within the canvas
    let asteriod_regular = new Elem(svg, 'circle')
    .attr('cx',random_spawn_x)
    .attr('cy',random_spawn_y)
    .attr('r',random_size)
    .attr('size-', "regular")
    .attr('fill', 'transparent')
    .attr('stroke','white')
    asteroid_array.push(asteriod_regular)

    // #######################################################################################################
    // Below comment code is for the partial implementation of big asteroids breaking into small asteroids when being shooted

    // const random_spawn_x_big = Math.floor(Math.random() * svg.getBoundingClientRect().width); // random integer from 0 to 600
    // const random_spawn_y_big = Math.random() * svg.getBoundingClientRect().height // random integer from 0 to 600
    // //const random_movement = Math.floor(Math.random()) === 0 ? Math.floor(Math.random()) + 1 : -1 // animate the asteroid from -1 to 1
    // let asteroid_large = new Elem(svg, 'circle')
    // .attr('cx', random_spawn_x_big)
    // .attr('cy',random_spawn_y_big)
    // .attr('r',70)
    // .attr('size-', "big")
    // .attr('fill','transparent')
    // .attr('stroke','white')
    // asteroid_array.push(asteroid_large)

     // Observable.interval(50).subscribe(() => asteroid_large.attr('cx', random_movement+Number(asteroid_large.attr('cx')))
    // .attr('cx', Number(asteroid_large.attr('cx'))>600 ? 0 : Number(asteroid_large.attr('cx'))));
    // Observable.interval(50).subscribe(() => asteroid_large.attr('cy', random_movement+Number(asteroid_large.attr('cy')))
    // .attr('cy', Number(asteroid_large.attr('cy'))>600 ? 0 : Number(asteroid_large.attr('cy'))));

    // function dist_calculation_bullet_asteroid(x1:number, y1:number,elem:HTMLFormElement) {
    //   /**
    //    * @x1: Asteroid's x position axis coordinates
    //    * @y1: Asteroid's y position axis coordinates
    //    * @elem: All of the asteroids that is spawn in the map
    //    */
    //   Math.sqrt(((Number(laser.attr('cx'))-x1)**2) + ((Number(laser.attr('cy'))-y1)**2))
    //   < Number(elem.attr('r')) elem.attr("size-") == "regular ? asteroid_explode.play() && svg.removeChild(elem.elem) && score++ &&  svg.removeChild(laser.elem) && removeElementFromArray(elem)
    //   : asteroid_explode.play() && svg.removeChild(elem.elem) & score++ && spawnSmallAsteroids(elem) : undefined
    
    // }
  
    // For every milisecond, the observable will always observing whether there is a collision between the bullet and the asteroids
    // I preset it to the fastest interval because I want the game to have a fast respond when a collision occurs
  //   Observable.interval(10).subscribe(() => collision_detection_bullet_asteroid());
  //   function collision_detection_bullet_asteroid(){
  //     /**
  //      * This function will keep track of every asteroid spawn in the map to monitor if there is a collision occur between bullet and asteroid
  //     */
  //     asteroid_array.forEach((element:HTMLFormElement) => dist_calculation_bullet_asteroid(Number(element.attr('cx')),Number(element.attr('cy')),element))
  //   }
  
  // }
  
  // function spawnSmallAsteroids(elem){
  //   let asteriod_small = new Elem(svg, 'circle')
  //     .attr('cx',Number(elem.attr("cx"))+ (Math.cos(1.57) * 10))
  //     .attr('cy',Number(elem.attr("cy"))+ (Math.sin(1.57) * 10))
  //     .attr('r',10)
  //     .attr('size-', "small")
  //     .attr('fill', 'transparent')
  //     .attr('stroke','white')
  //     asteroid_array.push(asteriod_small)
      
  // }

// ##############################################################################################

  
  // Observable for asteroids that spawn in the canvas
  // Function of observable is to allow every asteroid in the canvas can move through the canvas
  // every asteroid spawn in the canvas will have different speed
  // the x and y-axis of the asteroid will keep changing so that it can keep moving around the canvas
  // Using a ternary conditional operator to check the x position and y position of the asteroid in the canvas
  // so that every asteroid spawn in the map can come back from the map if it is out of canvas boundary
    Observable.interval(50).subscribe(() => asteriod_regular.attr('cx', random_movement+Number(asteriod_regular.attr('cx')))
    .attr('cx', Number(asteriod_regular.attr('cx'))>600 ? 0 : Number(asteriod_regular.attr('cx'))));
    Observable.interval(50).subscribe(() => asteriod_regular.attr('cy', random_movement+Number(asteriod_regular.attr('cy')))
    .attr('cy', Number(asteriod_regular.attr('cy'))>600 ? 0 : Number(asteriod_regular.attr('cy'))));
}


function dist_calculation_ship_asteroid(x1:number, y1:number,elem:HTMLFormElement) {
  /**
   * This function calculates the distance between the asteroid and the ship
   * if the distance between both ship and asteroid is smaller than the radius of the asteroid
   * It will end the game given that the ship had collied with the asteroid
   * else it will just continue the game
   * This function is pure because it does not change the outer state of any variable
   * It only return a function call or void
   */
  Math.sqrt(((Number(g.attr('posX'))-x1)**2) + ((Number(g.attr('posY'))-y1)**2))
  < Number(elem.attr('r')) ? GameOver()  : undefined
  
}
Observable.interval(1000).subscribe(() => collision_detection());
function collision_detection(){
  /**
   * This function checks for collision detection every 1 second using observables
   * every 1 second the asteroids in the map are all being calculated and observed whether a collision occurs
   * This function is pure and does not have any side effects because it only calculates the distance between the ship with the asteroids
   * It does not mutate any external variable outside the scope
   * 
   */
  asteroid_array.forEach((element:HTMLFormElement) => dist_calculation_ship_asteroid(Number(element.attr('cx')),Number(element.attr('cy')),element))
}

function removeElementFromArray(elem:HTMLFormElement){
  /**
   * This function finds the index of the collied asteroid inside the asteroid_array and delete the collied_asteroid from the array
   * This function is impure because it had changes the outer state variable such as the asteroid_array
   * because it mutants the asteroid_array element
   */
  const index = asteroid_array.indexOf(elem)
  delete asteroid_array[index]
}

function GameOver(){
  /**
   * This function shows a window that pop outs when the ship is collied with one of the asteroids
   * It will notify that user that it is game over
   * It is pure and have no side effects 
   */
  window.alert("Game Over. Your ship collied with an asteroid. Refresh the page or Ctrl+R and press OK to restart the game!!")
}

  
  
  // create a polygon shape for the space ship as a child of the transform group
  let ship = new Elem(svg, 'polygon', g.elem) 
    .attr("points","-15,20 15,20 0,-20")
    .attr("style","fill:transparent;stroke:lime;stroke-width:1")


  // Below are the Observable keyboard events handling for each w & space key
  // each key is mapped to a unique function.
  // w allows user to accelerate the ship that follows the rotated direction
  // space key allows user to enable the ship to shoot bullets
  // arrow key left and right allows user to rotate ship's direction
  const keydown_w = Observable.fromEvent<KeyboardEvent>(document, "keydown");
  keydown_w.filter(pressed => pressed.keyCode === 87) 
  .subscribe(_ => g.attr("transform", "translate(" + Number(g.attr("posX")) + " " + Number(g.attr("posY")) + ")"
  + "rotate(" + Number(g.attr("XDegree")) + ")")
  .attr("posX",Number(g.attr('posX')) < 0 ? svg.getBoundingClientRect().width : Number(g.attr('posX')) > 600 ? 0 : Number(g.attr('posX'))+CalculateDirection_x())
  .attr("posY",Number(g.attr("posY")) < 0 ? svg.getBoundingClientRect().height : Number(g.attr("posY")) > 600 ? 0 : Number(g.attr('posY'))+CalculateDirection_y())
  .attr("XDegree", Number(g.attr('XDegree'))));


  const keydown_space = Observable.fromEvent<KeyboardEvent>(document, "keydown");
  keydown_space.filter(pressed => pressed.keyCode === 32)
  .subscribe(_ => laserObserve());

  const arrow_left = Observable.fromEvent<KeyboardEvent>(document, "keydown");
  arrow_left.filter(pressed => pressed.keyCode === 37)
  .subscribe(_ => g.attr("transform", "translate(" + Number(g.attr("posX")) + " " + Number(g.attr("posY")) + ")"
  + "rotate(" + Number(g.attr("XDegree")) + ")")
  .attr("posX",Number(g.attr("posX"))).attr("posY",Number(g.attr("posY"))).attr("XDegree", Number(g.attr("XDegree"))-5));

  const arrow_right = Observable.fromEvent<KeyboardEvent>(document, "keydown");
  arrow_right.filter(pressed => pressed.keyCode === 39)
  .subscribe(_ => g.attr("transform", "translate(" + Number(g.attr("posX")) + " " + Number(g.attr("posY")) + ")"
  + "rotate(" + Number(g.attr("XDegree")) + ")")
  .attr("posX",Number(g.attr("posX"))).attr("posY",Number(g.attr("posY"))).attr("XDegree", Number(g.attr("XDegree"))+5));
  

function CalculateDirection_x():number{
  /**
   * This function is to calculate the direction of x axis for the ship so that it can accelerate towards the pointed direction
   * - 90 is to adjust the axis which will correct the axis and follows the ship's pointing direction
   * Using cosine to calculate the distance that the ship need to increment when accelerate
   */
  const DegreeTorad = (Math.PI/180) * (Number(g.attr("XDegree")) -90)
  const new_ship_x = (Math.cos(DegreeTorad) * 10)
  return new_ship_x
}

function CalculateDirection_y():number
{
  /**
   * This function is to calculate the direction of y axis for the ship so that it can accelerate towards the pointer direction 
   * - 90 is to adjust the axis which will correct the axis and follows the ship's pointing direction
   * using sin to calculate the distance that the ship need to increment when accelerate
   */
  const DegreeTorad = (Math.PI/180) * (Number(g.attr("XDegree")) -90)
  const new_ship_y = (Math.sin(DegreeTorad) * 10)
  return new_ship_y 
}

function laserObserve() {
  /**
   * This function can be considered as an laser observable 
   * It calculates the position and direction upon the ship's rotation 
   * Using cos and sin to calculate the new coordinates that the currently coordinates needs to increment
   * The new coordinates frequently changes based on the rotation
   * Since this function binds the space key, everytime the space key is pressed, the bullet (circle element) will be fired
   * Bullet fires will have its own observable interval so that it can move through the canvas 
   */
  const DegreeTorad = (Math.PI/180) * (Number(g.attr("XDegree")) -90)
  const new_x = (Math.cos(DegreeTorad) * 10)
  const new_y = (Math.sin(DegreeTorad) * 10) 
  const laser = new Elem(svg,'circle')
  .attr('cx', Number(g.attr('posX')))
  .attr('cy', Number(g.attr('posY')))
  .attr('r', 3)
  .attr('fill','red')
  shooting.play();
  
 
  Observable.interval(20).subscribe(() => laser.attr('cx', Number(laser.attr('cx'))+new_x))
  Observable.interval(20).subscribe(() => laser.attr('cy', Number(laser.attr('cy'))+new_y))

  function dist_calculation_bullet_asteroid(x1:number, y1:number,elem:HTMLFormElement) {
    /**
     * @x1: Asteroid's x position axis coordinates
     * @y1: Asteroid's y position axis coordinates
     * @elem: All of the asteroids that is spawn in the map
     */
    Math.sqrt(((Number(laser.attr('cx'))-x1)**2) + ((Number(laser.attr('cy'))-y1)**2))
    < Number(elem.attr('r')) ? asteroid_explode.play() && svg.removeChild(elem.elem) && score++ &&  svg.removeChild(laser.elem) && removeElementFromArray(elem)
    : undefined
  
  }

  // For every milisecond, the observable will always observing whether there is a collision between the bullet and the asteroids
  // I preset it to the fastest interval because I want the game to have a fast respond when a collision occurs
  Observable.interval(10).subscribe(() => collision_detection_bullet_asteroid());
  function collision_detection_bullet_asteroid(){
    /**
     * This function will keep track of every asteroid spawn in the map to monitor if there is a collision occur between bullet and asteroid
    */
    asteroid_array.forEach((element:HTMLFormElement) => dist_calculation_bullet_asteroid(Number(element.attr('cx')),Number(element.attr('cy')),element))
  }

}


function ScoreBoard(){
  /**
   * This function is to display out the score played by the user from realtime
   */
  scoreboard.innerHTML = `${"Score:" + score}`
}

Observable.interval(1).subscribe(() => ScoreBoard());
  

}


// the following simply runs your asteroids function on window load.  Make sure to leave it in place.
if (typeof window != 'undefined')
  window.onload = ()=>{
    asteroids(); 
  }