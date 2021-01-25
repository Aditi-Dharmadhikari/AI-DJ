music = "";

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function preload(){
    music = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600 , 500);
    
    video = createCapture();
    video.hide();

    posenet = ml5.poseNet(video , model_load);
    posenet.on('pose', gotPose);
}

function model_load(){
    console.log("PoseNet Loaded!!");
}

function gotPose(results){
    if(results.length > 0){
        console.log(results);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;

        console.log("right wrist x = " + rightWristX + " ;  right wrist y = " + rightWristY + " ;       left wrist x = " + leftWristX + " ;     left wrist y = " + leftWristY);
    }


}

function draw(){
    image(video , 0, 0, 600, 500);
    circle(leftWristY, rightWristY, 20);
    stroke("#43c4f7");
    Integer = Number(leftWristY);
    remove_decimals = floor(Integer);
    calculate = remove_decimals/500;

    document.getElementById("cal_volume").innerHTML = "Volume : " + calculate;
    music.setVolume(calculate);
}

function play(){
    music.play();
    music.setVolume(1);
    music.rate(2.5);
}