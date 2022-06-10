alarm = "";
Status = "";
objects = [];

function preload() {
    alarm = loadSound("alarm.mp3"); 
}

function setup() {
    canvas = createCanvas(380 , 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("coocoSsd has initialized");
    Status = true;
}

function gotResult(error , results) {
    if(error) {
        console.log("An error has been Found");
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(video , 0 , 0 , 380 , 380);

    if(Status != ""){
        for(i = 0; i < objects.length; i++) {
            document.getElementById("btn_status").innerHTML = "Baby detected";
            alarm.stop();
        }
    }
    else {
        document.getElementById("btn_status").innerHTML = "Baby not detected";
        alarm.play();
    }

    if(objects.length < 0) {
        document.getElementById("btn_status").innerHTML = "Baby not detected";
        alarm.play();
    }
}