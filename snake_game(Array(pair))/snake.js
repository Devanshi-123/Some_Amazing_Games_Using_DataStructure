function init()
{
  canvas = document.getElementById("mycanvas");
  W = H = canvas.height = canvas.width = 500;
  pen = canvas.getContext('2d');
  game_over  = false;
  cs = 25;
  score=5;


  mango = new Image();
  mango.src = "./small-mango.jpg";

  trophy = new Image();
  trophy.src = "./trophy.png";

  food  = getRandomFood();

  snake = {
     init_len : 5,
     color:"red",
     cells:[],
     direction:"right",

     createSnake : function()
     {
         for(var i = this.init_len;i>0;i--)
         {
             this.cells.push({x:i,y:0});
         }
     },

     drawSnake : function()
     {
         for(var i=0;i<this.cells.length;i++)
         {
             pen.fillStyle = this.color;
             pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
         }
     },

     updateSnake : function()
     {
          var headX = this.cells[0].x;
          var headY = this.cells[0].y;
          var nextX,nextY;
          //if snake eats the food new food will be drawn 
          if(headX == food.x && headY == food.y)
          {
              console.log("Snake ate the food");
               food = getRandomFood();
               score++;
               //the length of snake will also increase
          }
          else{
          this.cells.pop();
          }
          if(this.direction=="right")
          {
              nextX = headX+1;
              nextY = headY;
          }
          else if(this.direction=="left")
          {
              nextX = headX-1;
              nextY = headY;
          }
          else if(this.direction == "up")
          {
              nextX = headX;
              nextY = headY-1;
          }
          else{
              nextX = headX;
              nextY  = headY+1;
          }
          this.cells.unshift({x:nextX,y:nextY});
          var last_x = Math.round(W/cs);
            var last_y = Math.round(H/cs);
        if(this.cells[0].x<0 || this.cells[0].x>last_x || this.cells[0].y<0 || this.cells[0].y>last_y)
        {
            game_over = "true";
        }
     }
    };
    snake.createSnake();
    //add event listener
    function keyPressed(e)
    {
        if(e.key == "ArrowRight")
        {
            snake.direction = "right";
        }
        else if(e.key == "ArrowLeft")
        {
            snake.direction = "left";
        }
        else if(e.key == "ArrowUp")
        {
            snake.direction = "up";
        }
        else{
            snake.direction = "down";
        }
    }
    document.addEventListener('keydown',keyPressed);
}

function draw()
{
   pen.clearRect(0,0,W,H);
   snake.drawSnake();

   pen.drawImage(mango,food.x*cs,food.y*cs,cs,cs);

   pen.drawImage(trophy,10,10,40,40);

   pen.font = "30px roboto";
   pen.fillStyle = "blue";
   pen.fillText(score,48,35);
}

function update()
{
    snake.updateSnake();
}
function getRandomFood()
{
    var food_x = Math.round(Math.random()*(W-cs)/cs);
    var food_y = Math.round(Math.random()*(H-cs)/cs);

    var food = {
        x:food_x,
        y:food_y,
        color:"yellow"
    }
    return food;
}
function gameloop()
{
    if(game_over)
    {
        clearInterval(f);
        alert("Game Over");
    }
    draw();
    update();
}

init();
var f = setInterval(gameloop,100);