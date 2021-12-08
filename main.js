objects = [];
status = "";
function preload(){
    video = createVideo('video.mp4');
}

function setup(){
    canvas = createCanvas(550, 400);
    canvas.center();
    video.hide();
}

 function start_vid(){
    objectDetector = ml5.objectDetector('cocossd', modalLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
 }

function modalLoaded(){
    console.log("modal loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    } else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 550, 400);
    if(status != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0 ; i < objects.length ; i++){
            document.getElementById("status").innerHTML = "Status : objects detected";
            document.getElementById("num_of_objs") .innerHTML = "Objects Detected : " + objects.length;
            
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + "  " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}