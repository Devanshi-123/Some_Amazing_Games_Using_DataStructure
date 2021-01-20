function init()
{
  canvas = document.getElementById("mycanvas");
  W = H = canvas.height = canvas.width = 500;
  pen = canvas.getContext('2d');
  game_over  = false;

  head = new Image();
  head.src = "./head.png";
   
  c1 = new Image();
  c1.src = './c1.png';

  c2 = new Image();
  c2.src = './c2.png';

  diamond = new Image();
  diamond.src = "./diamond.png";

  e1 = {
      img:c2,
      x:130,
      y:100,
      w:80,
      h:80,
     speed:25
  };
  e2 = {
    img:c1,
    x:200,
    y:80,
    w:80,
    h:80,
    speed:30
};
e3 = {
    img:c2,
    x:280,
    y:130,
    w:80,
    h:80,
    speed:30
};
enemy = [e1,e2,e3];
player = {
    x:20,
    y:220,
    w:90,
    h:90,
    speed:20,
    moving:"false",
    score : 100
};
gem = {
    x:420,
    y:220,
    w:60,
    h:60
};
    //add event listener
    document.addEventListener('mousedown',function(){
        player.moving = "true";
    });
    document.addEventListener('mouseup',function(){
        player.moving = "false";
    });
}
//logic to check two rectangle overlapp or not
function isOverlapp(rect1,rect2)
{//if one rectangle is on right of other
    if(rect1.x>(rect2.x+rect2.w)||rect2.x>(rect1.x+rect1.w))
        {
            console.log("false");
            return false;
        }
        //if one rectangle is above another
    if(rect1.y>(rect2.y+rect2.h)||rect2.y>(rect1.y+rect1.h))
    {
        console.log("false")
        return false;
    }
    console.log("true")
    return true;
}

function draw()
{
   pen.clearRect(0,0,W,H);

   pen.drawImage(head,player.x,player.y,player.w,player.h);
   for(i=0;i<enemy.length;i++)
   {
       pen.drawImage(enemy[i].img,enemy[i].x,enemy[i].y,enemy[i].w,enemy[i].h);
   }
   pen.drawImage(diamond,gem.x,gem.y,gem.w,gem.h);

   pen.font = "30px roboto";
   pen.fillStyle = "red";
   pen.fillText(player.score,48,35);
}

function update()
{
    //if playing is moving update the x coordinate
     if(player.moving == "true")
     {
         player.x += player.speed;
         player.score += 5;
     }
     //collision with enemies
     for(let i=0;i<enemy.length;i++)
     {
         if(isOverlapp(enemy[i],player)){
             player.score -= 20;
             if(player.score < 0)
             {
                 console.log(player.score);
                 game_over = true;
                 alert("Game Over", +player.score);
             }
         }
     }
     if(isOverlapp(gem,player)==true)
    {
        game_over="true";
        alert("You won");
        return;
    }
    for(let i=0;i<enemy.length;i++)
    {
      enemy[i].y += enemy[i].speed;
     if(enemy[i].y >= H-enemy[i].h || enemy[i].y<0)
     {
         enemy[i].speed *= -1;
     }
}
 //To check for collision
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