let video;
let bodyPose;
let poses = [];
let connections;
let selectedExercise = 'squat';

function preload() {
  bodyPose = ml5.bodyPose('BlazePose');
}

function setup() {
  createCanvas(640, 480);
  // Create the video
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  select('#startButton').mousePressed(startDetect);
  select('#exerciseDropdown').changed(selectExercise);
}

function startDetect() {  
  bodyPose.detectStart(video, gotPoses);
  connections = bodyPose.getSkeleton();
}

function selectExercise() {
  selectedExercise = select('#exerciseDropdown').value();
}

function draw() {
  image(video, 0, 0, width, height);

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      // Only draw a line if both points are confident enough
      if (pointA.score > 0.1 && pointB.score > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }

  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      // Only draw a circle if the keypoint's confidence is bigger than 0.1
      if (keypoint.score > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
}

function gotPoses(results) {
  poses = results;
  console.log('gotPoses');
}
