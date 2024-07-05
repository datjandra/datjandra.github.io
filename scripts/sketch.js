let bodySegmentation;
let video;
let segmentation;
let options = {
  maskType: "parts",
};
let selectedExercise = 'squat';

function preload() {
  bodySegmentation = ml5.bodySegmentation("BodyPix", options);
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
  bodySegmentation.detectStart(video, gotResults);
}

function selectExercise() {
  selectedExercise = select('#exerciseDropdown').value();
}

function draw() {
  background(255);
  image(video, 0, 0);
  if (segmentation) {
    image(segmentation.mask, 0, 0, width, height);
  }
}

// callback function for body segmentation
function gotResults(result) {
  segmentation = result;
}
