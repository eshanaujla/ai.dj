song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoded);
    poseNet.on('pose', gotPoses);
}
function modelLoded() {
    console.log("model is loded");
}
function draw() {
    image(video, 0, 0, 600, 500);
    stroke("red");
    fill("brown");
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "speed=0.5x";
            song.rate(0.5);
        }
        else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "speed=1x";
            song.rate(1);
        }
        else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "speed=1.5x";
            song.rate(1.5);
        }
        else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "speed=2x";
            song.rate(2);
        }
        else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "speed=2.5x";
            song.rate(2.5);
        }
    }
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        inNumberleftwristY = Number(leftWristY);
        remove_decimal = floor(inNumberleftwristY);
        volume = remove_decimal/500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }
}
function preload() {
    song = loadSound("music.mp3");
}
function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results) {
    if (results.length > 0) {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist);
        console.log(results);
        leftWristX = results[0].pose.leftWrist.X;
        leftWristY = results[0].pose.leftWrist.Y;
        rightWristX = results[0].pose.rightWrist.X;
        rightWristY = results[0].pose.rightWrist.Y;

    }
}