var buttonColors=["purple", "blue", "green", "yellow"];
var gamePattern=[];
var audio;
var userClickedPattern=[];
var level=0;

$(document).keydown(function(){
  if(gamePattern==0){ newSequence();}
});

$(".btn").click(function(){
  var userChosenColor=$(this).attr("id");
userClickedPattern.push(userChosenColor);
playSound(userChosenColor);
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});

function newSequence(){

userClickedPattern=[];

level++;
$("h1").html("Level " + level);

var randomNumber=Math.floor(Math.random()*buttonColors.length);
var randomChosenColors=buttonColors[randomNumber];
gamePattern.push(randomChosenColors);

$("#" + randomChosenColors).fadeOut(100).fadeIn(100);
playSound(randomChosenColors);

}

function playSound(name){
  audio=new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor){
  var currentKey= document.querySelector("#" + currentColor);
  currentKey.classList.add("pressed");

 setTimeout(function(){
    currentKey.classList.remove("pressed")
  }, 100);

}

function startOver() {
  gamePattern=[];
  userClickedPattern=[];
  level=0;
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
{
  if(userClickedPattern.length===gamePattern.length){
    setTimeout(function () {
      newSequence();
    }, 1000);
  }
}
else{
  playSound("Game Over");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);

  $("h1").html("Game Over, Press Any Key to Restart");

  startOver();
}
}