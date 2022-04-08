const grid = document.querySelector('.grid')
const scoreDisplay = document.querySelector('#score')

const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20

let xDirection = -2
let yDirection = 2

let timerId
let score = 0

const gamerStart = [230,10]
let currentPos = gamerStart

const ballStart = [270,40]
let ballCurrentPos = ballStart

//Create Block
class Block{
  constructor(xPos,yPos){
    this.bottomLeft = [xPos,yPos]
    this.bottomRight = [xPos+blockWidth,yPos]
    this.topLeft = [xPos,yPos+blockHeight]
    this.topRight = [xPos+blockWidth,yPos+blockHeight]
  }
}

//All Blocks
const blocks = [
  new Block(10,270),
  new Block(120,270),
  new Block(230,270),
  new Block(340,270),
  new Block(450,270),  
  
  new Block(10,240),
  new Block(120,240),
  new Block(230,240),
  new Block(340,240),
  new Block(450,240),    
]


//Drawing Block
addBlocks = ()=>{
  for(let i =0;i<blocks.length;i++){
    const block = document.createElement('div')
    block.classList.add('block')
    block.style.left = blocks[i].bottomLeft[0] + 'px'
    block.style.bottom = blocks[i].bottomLeft[1] + 'px'
    grid.appendChild(block)      
  }
}

addBlocks()


//Add Gamer's Block
const gamer = document.createElement('div')
gamer.classList.add('gamer')

//Draw the Gamer
drawGamer =()=>{
  gamer.style.left = currentPos[0]+'px'
  gamer.style.bottom = currentPos[1]+'px'
}

drawGamer()
grid.appendChild(gamer)


//Draw the Ball
drawBall=()=>{
  ball.style.left = ballCurrentPos[0]+'px'
  ball.style.bottom = ballCurrentPos[1]+'px'
}

//Move the Gamer
moveGamer = (e)=>{
  switch(e.key) {
    case 'ArrowLeft':
      if(currentPos[0]>0){
        currentPos[0] -= 10;
        drawGamer() 
      }
      break;
    case 'ArrowRight':
      if(currentPos[0]<boardWidth-blockWidth){
        currentPos[0] += 10;
        drawGamer()        
      }
      break;
  }
}

document.addEventListener('keydown',moveGamer)

//Adding Ball
const ball = document.createElement('div')
ball.classList.add('ball')
drawBall()
grid.appendChild(ball)


//Movement of Ball
moveBall = ()=>{
  ballCurrentPos[0] += xDirection
  ballCurrentPos[1] += yDirection
  drawBall()
  checkForCollision()
}

timerId = setInterval(moveBall,20)


//Checking for collision
checkForCollision = ()=>{

  for (let i = 0; i < blocks.length; i++){
    if
    (
      (ballCurrentPos[0] > blocks[i].bottomLeft[0] && ballCurrentPos[0] < blocks[i].bottomRight[0]) &&
      ((ballCurrentPos[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPos[1] < blocks[i].topLeft[1]) 
    )
      {
      const allBlocks = Array.from(document.querySelectorAll('.block'))
      allBlocks[i].classList.remove('block')
      blocks.splice(i,1)
      changeDirection()   
      score++
      scoreDisplay.innerHTML = score
      if (blocks.length == 0) {
        scoreDisplay.innerHTML = 'You Win!'
        clearInterval(timerId)
        document.removeEventListener('keydown', moveGamer)
      }
    }
  }


  //Wall Collisions
  if(
    ballCurrentPos[0]>=(boardWidth-ballDiameter) ||
    ballCurrentPos[1]>=(boardHeight-ballDiameter) ||
    ballCurrentPos[0]<=0
    ){
    changeDirection()
  }

  //check for Gamer collision
  if
  (
    (ballCurrentPos[0] > currentPos[0] && ballCurrentPos[0] < currentPos[0] + blockWidth) &&
    (ballCurrentPos[1] > currentPos[1] && ballCurrentPos[1] < currentPos[1] + blockHeight ) 
  )
  {
    changeDirection()
  }

  //Collision for Game-Over
  if(ballCurrentPos[1]<=0){
    clearInterval(timerId)
    scoreDisplay.innerHTML = 'You Lost'
    document.removeEventListener('keydown',moveGamer)
  }
}



//Changing the direction
changeDirection = ()=> {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2
    return
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2
    return
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2
    return
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2
    return
  }
}


