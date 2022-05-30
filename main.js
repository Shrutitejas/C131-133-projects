var status= "";
var objects= [];
function preload(){
    img= loadImage("dog_cat.jpg");
}
function setup() {
    canvas= createCanvas(500, 400);
    canvas.center();
    obj_detection= ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML= "Status: Detecting Object";
}
function modelloaded() {
    console.log("modelloaded!");
    status= true;
    obj_detection.detect(img, gotResults);
}
function gotResults(error, results) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(results);
        objects= results;
    }
}
function draw(){
    image(img, 0, 0, 500, 400);
    if (status != "") {
        for (i= 0; i< objects.length; i++){
            document.getElementById("status").innerHTML= "Status: Object Detected";  
            fill("red");
            percent= floor(objects[i].confidence*100);
            text(objects[i].label+ " " + percent + "%" , objects[i].x+20, objects[i].y+20);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y,  objects[i].width, objects[i].height);
        }
    }
}