//Using phaser template for designing our game
//make a game object
//make a config object and pass it as a parameter to game object
//in the config object determine the type,height,width,scene
//scenes are basically depicting the different levels
//For animation in phaser use tweens

//javascript object which would be containing the result depending on angle
let prizes_config = {
    count:12,//count 12 since 360/30 = 12
    prize_names : ["DSA(LeetCode)","DSA(PreviousYear)","DSA(GFG)","WebDev(FCC)","WebDev(Project)","Intern",
    "AWS","ML(DC)","DSA(InterviewBit)","ML(Project)","FrontEnd(Udemy)","Apti+Subjective"]
}
let config = {
    type : Phaser.CANVAS,
    width : 800,
    height:600,
    backgroundColor : 0xffcc00,
    
    scene : {
        preload : preload,
        create : create,
        update : update,
    },
    audio: {
        disableWebAudio: true
    }
   
};

let game = new Phaser.Game(config);

function preload()
{
    console.log("preload");
    //to load audio
    this.load.audio('theme', [
        './sound.mp3',
    ]);
    //this object refers to the current scene object
    //to load an image and give it a name
    this.load.image('background','./back.jpg');
    console.log(this);
    this.load.image('stand','./stand.png');
    this.load.image('wheel','./wheel.png');
    this.load.image('pin','./pin.png');
    this.load.image('stand','./stand.png');
}

function create()
{
    console.log("create");
    //to display the image
    //Place the image at the center of the canvas
     let W = game.config.width;
     let H = game.config.height;
     let background = this.add.sprite(W/2,H/2,'background');
     background.setScale(1.24)
     let stand = this.add.sprite(W/2,H/3+250,'stand');
     stand.setScale(0.8)
     //make the wheel a property of scene so that it can
     //be accessed from somewhere else
     this.wheel = this.add.sprite(W/2,H/3,'wheel');
     this.wheel.setScale(0.2)
     let pin = this.add.sprite(W/2,H/3,'pin');
     pin.setScale(0.2)
     
     //to add event listener foir mouse click
     this.input.on("pointerdown",spinwheel,this);
     
     //text object
     font_style = {
         font:"bold 30px Arial",
         align:"center",
         color:"yellow",
     }
     this.game_text = this.add.text(10,10,"Welcome To Spin & Win",font_style);
}

function update()
{
    console.log("update");
    //to make the wheel move
    //this.wheel.angle += 1.5;
    //Apply animation to stop the wheel at certain angle after some duration

    //we need to make it stop at a random angle
    //alpha property for opacity
}

function spinwheel()
{
    var music = this.sound.add('theme');
    music.play();
    console.log("User clicked");
    console.log("Start Spinning");
    this.game_text.setText("Mouse Clicked");
    //randomly generate number of rounds for which wheel should rotate
    let rounds = Phaser.Math.Between(2,6);
    //random degrees
    //the degrees should be a multiple of 30 so that pointer stops in between
    let degrees = Phaser.Math.Between(0,11)*30;
    //total angle
    let total_angle = rounds*360+degrees;
    //to map the angle with the object
    let idx = prizes_config.count-1-Math.floor(degrees/(360/prizes_config.count));
     //to make the wheel move
    //this.wheel.angle += 1.5;
    //Apply animation to stop the wheel at certain angle after some duration
    //we need to make it stop at a random angle
    //alpha property for opacity
    tween = this.tweens.add({
        targets:this.wheel,
        angle:total_angle,
        //to make th wheel slow down before stopping
        ease:"Cubic.easeOut",
        duration:6000,
        //to pass this object to onComplete function which is a callback function
        callbackScope:this,
        onComplete : function(){
            this.game_text.setText("You won " + prizes_config.prize_names[idx]);
        }
    });
}