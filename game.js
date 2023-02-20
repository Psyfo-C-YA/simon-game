var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () { 
    started = true;

    if (started === true) {
        nextSequence();
    }
    
});



$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() 
{

     userClickedPattern = [];

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    $("#"+ randomChosenColour).fadeOut(250).fadeIn(250);

    playSound(randomChosenColour);

    level++;

    $("#level-title").text("level: " + level);
    
}

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel) 
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        $("#level-prog").text("success");
        if (userClickedPattern.length === gamePattern.length){
          setTimeout(function () {
            nextSequence();
          }, 750);
  
        }
  
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-prog").text("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart")
        
        startOver();
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
}


//nextSequence();

