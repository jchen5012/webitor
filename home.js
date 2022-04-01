window.addEventListener('load', ()=>{
    document.addEventListener('mousedown', start);
    document.addEventListener('mouseup', stop);
    document.addEventListener('mousemove', sketch);
});

var originalImageHeight;
var originalImageWidth; 
var dlButton = document.getElementById('dlButton');
var paintBrush= document.getElementById('paintBrushButton');
var cropper = document.getElementById('cropperButton');
var sewer = document.getElementById('sewButton');
var compressor = document.getElementById('compressButton');
var filterer = document.getElementById('filterButton');
var oppCompress  = document.getElementById('oppCompressButton');
var myCanvas = document.getElementById("canvas");
var clear = document.getElementById("clearButton");
var upload = document.getElementById("output"); 
const context = myCanvas.getContext("2d");
var data;
var cBlock = document.getElementById('color-block');
var cStrip = document.getElementById('color-strip');
var tempEraser = document.getElementById('erase');
var actEraser = document.getElementById('eraser');
var slider = document.getElementById('compressId');
var endSlide = document.getElementById('resizeId');
var img;
var scaledImg;
var win;
var win2;
let paint = false;
let erase = false; 
let paintButtonClick = false; 
let paintStart = false; 
let coord = {x:0 , y:0};        
let pathsry = [];
let points = [];
let brushHighlight = false;
let eraseHighlight = false;
let crop = false; 
let imageClear = true;
var coordX = coord.x;
var coordX = coord.y;
var width1;
var height1;
var width2;
var height2;
var modWidth;
var modHeight;
let cropBool = false; 
let fBool = false;
var canvImage;
var canvImgW = 500; 
var canvImgH = 500;
var filename = "";
var w;
var h;
var croppingImage;
var croppingImageF;
let croppy;
//let cropper;
//var prev = {x : 0, y : 0};
//var current = {x : 0, y :0};


function getPosition(event){
    coord.x = event.clientX - canvas.getBoundingClientRect().left;
    coord.y = event.clientY - canvas.getBoundingClientRect().top;;
}

/* function retPosition(event){
    return { 
        x: Math.round(event.clientX - canvas.getBoundingClientRect().left);
        y: Math.round(event.clientY - canvas.getBoundingClientRect().top);
    };
} */

window.onload = function () {
    w = window.innerWidth;
    h = window.innerHeight;
    console.log('hello world');
    console.log(w); 
    console.log(h);
    document.getElementById('download').height = h * 0.103;
    document.getElementById('download').width = w * 0.05;
    console.log(dlButton.width);
    console.log(dlButton.height);
    document.getElementById('brush').height = h * 0.103;
    document.getElementById('brush').width = w * 0.05;
    console.log(paintBrush.width);
    console.log(paintBrush.height);
    document.getElementById('crop').height = h * 0.103;
    document.getElementById('crop').width = w * 0.05;
    document.getElementById('sew').height = h * 0.103;
    document.getElementById('sew').width = w * 0.05;
    document.getElementById('compress').height = h * 0.103;
    document.getElementById('compress').width = w * 0.05;
    document.getElementById('filter').height = h * 0.103;
    document.getElementById('filter').width = w * 0.05;
    document.getElementById('lc').height = h * 0.103;
    document.getElementById('lc').width = w * 0.05;
    document.getElementById('clearIt').height = h * 0.1;
    document.getElementById('clearIt').width = w * 0.05;
    document.getElementById('output').height = h * 0.2;
    document.getElementById('output').width = w * 0.15;
    document.getElementById('erase').height = h * 0.045;
    document.getElementById('erase').width = w * 0.03;
    document.getElementById('undoP').height = h * 0.045;
    document.getElementById('undoP').width = w * 0.03;
    document.getElementById('redoP').height = h * 0.045;
    document.getElementById('redoP').width = w * 0.03;
    slider.style.height = h * 0.001;
    slider.style.width = w * 0.3;
    endSlide.style.height = h * 0.001;
    endSlide.style.width = w * 0.3;
    console.log(slider.width);
    console.log(slider.height)
    myCanvas.height = h * 0.81;
    myCanvas.width = w * 0.65;
    cBlock.height = h * 0.3;
    cBlock.width = w * 0.1;
    console.log(cBlock.width);
    console.log(cBlock.height);
    cStrip.height = h * 0.3;
    cStrip.width = w * 0.05;
    console.log(cStrip.width);
    console.log(cStrip.height);
    width1 = cBlock.width;
    height1 = cBlock.height;
    width2 = cStrip.width;
    height2 = cStrip.height;
    firstContext.rect(0, 0, width1, height1);
    fillGradient();
    secondContext.rect(0, 0, width2, height2);
    var grd1 = secondContext.createLinearGradient(0, 0, 0, height1);
    grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
    grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
    secondContext.fillStyle = grd1;
    secondContext.fill();
}


/*window.addEventListener("resize", function () {
    var w = window.innerWidth;
    var h = window.innerHeight;
    console.log('hello world');
    console.log(w); 
    console.log(h);
    document.getElementById('download').height = h * 0.1;
    document.getElementById('download').width = w * 0.05;
    console.log(dlButton.width);
    console.log(dlButton.height);
    document.getElementById('brush').height = h * 0.1;
    document.getElementById('brush').width = w * 0.05;
    console.log(paintBrush.width);
    console.log(paintBrush.height);
    document.getElementById('crop').height = h * 0.1;
    document.getElementById('crop').width = w * 0.05;
    document.getElementById('sew').height = h * 0.1;
    document.getElementById('sew').width = w * 0.05;
    document.getElementById('compress').height = h * 0.1;
    document.getElementById('compress').width = w * 0.05;
    document.getElementById('filter').height = h * 0.1;
    document.getElementById('filter').width = w * 0.05;
    document.getElementById('lc').height = h * 0.1;
    document.getElementById('lc').width = w * 0.05;
    document.getElementById('clearIt').height = h * 0.1;
    document.getElementById('clearIt').width = w * 0.05;
    document.getElementById('output').height = h * 0.1;
    document.getElementById('output').width = w * 0.08;
    myCanvas.height = h * 0.8;
    myCanvas.width = w * 0.7;
    console.log(canvas.width);	
});*/


function start(event){
    paint = true;
    getPosition(event);
    /*if (crop == true) {
        event.preventDefault();
        event.stopPropagation();
        saveEventState(event); 

    }*/
}
function stop(){
    paint = false;
}

function sketch(event){
    if (!paint || !paintStart) return;
    context.beginPath();
    context.lineWidth = slider.value;
    context.lineCap = 'round';
    context.moveTo(coord.x, coord.y);
    getPosition(event);
    context.lineTo(coord.x , coord.y);
    context.stroke();
}

var revealFile = function(event) {
    //var untouchedImg = new Image();
    //untouchedImg.src = window.URL.createObjectURL(event.target.files[0]);
    var width;
    var height;
    var w;
    var h;
    var ratio;
    var ratio2;
    img = new Image(); 
    img.src = window.URL.createObjectURL(event.target.files[0]);
    filename = event.target.files[0].name;
    console.log(filename);
   
    img.onload = function () {
        var canvHeight = myCanvas.height;
        var canvWidth = myCanvas.width;
        height = img.height;
        width = img.width; 
        ratio = height/width;
        ratio2 = width/height;
        console.log('The value of THE width  is ' + width + 
        'the height is' + height + 'ratio is' + ratio
        );
        /*if (width > canvWidth) {
            height = canvWidth * ratio; 
            width = canvWidth;
        }
        else if (height > canvHeight) {
            width = canvWidth * ratio2;
            height = canvHeight; 
        } */

       originalImageHeight = height;
       originalImageWidth = width; 
       var scale = Math.min(myCanvas.width / img.width, myCanvas.height / img.height);
       var xVal = (myCanvas.width / 2) - (img.width / 2) * scale;
       var yVal = (myCanvas.height / 2) - (img.height / 2) * scale;
       //var xVal = myCanvas.width / 2 - img.width / 2;
       //var yVal = myCanvas.height / 2 - img.height / 2;
       modWidth = (img.width) * scale;
       modHeight = (img.height) * scale;
       console.log('hello1 i am ' + modWidth + 'and this is my friend' + modHeight);
       context.drawImage(img, xVal, yVal, modWidth, modHeight);
       if (imageClear == true) {
        img.style.height = modWidth;
        img.style.width = modHeight;
        console.log('The value of THE width1  is ' + img.height + 
        'the height1 is' + img.width );
        dlButton.href = img.src; 
        imageClear = !imageClear;
        }
    }
    //changeDimen();    
    
    
};
function changeDimen() {
    img.height = modHeight;
    img.width = modWidth;
}
function clearItem() {
    dlButton.removeAttribute("href");
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (imageClear == false) {
        imageClear = !imageClear;
    }
   // document.getElementById("dlbutton").removeAttribute("href");
}

function startPaint() {
    paintStart =!paintStart; 
    if (paintStart == true || erase == true)
        document.body.style.cursor = 'crosshair';
    else document.body.style.cursor = 'pointer';
    
    if (brushHighlight == false) {
        brushHighlight = true; 
        paintBrush.style.backgroundColor  = 'yellow';
    }
    else {
        brushHighlight = false;
        paintBrush.style.backgroundColor = 'white';
    }
    
    if (eraseHighlight == true) {
        paintStart = true;
        eraseHighlight = false; 
        actEraser.style.backgroundColor  = 'white';
        erase = false;
        context.globalCompositeOperation = "source-over";
        var imageData = firstContext.getImageData(x, y, 1, 1).data;
        rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
        context.strokeStyle = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)'
    }
}

function startErase() {
        console.log('bruh');
        if (erase == false) {
            //element.style.cursor = 'crosshair';
            paintStart = true;
            erase = true;
            context.globalCompositeOperation = "destination-out";  
            context.strokeStyle = "rgba(255,255,255,1)";
        }
        else {
            paintStart = false;   
            erase = false;
            context.globalCompositeOperation = "source-over";
            var imageData = firstContext.getImageData(x, y, 1, 1).data;
            rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
            context.strokeStyle = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
        }
    
    if (eraseHighlight == false) {
        eraseHighlight = true; 
        actEraser.style.backgroundColor  = 'yellow';
    }
    else {
        eraseHighlight = false;
        actEraser.style.backgroundColor = 'white';
    }
    
    if (brushHighlight == true) {
        brushHighlight = false; 
        //paintStart = false; 
        paintBrush.style.backgroundColor = 'white';
    }
}

// canvas used to choose color 
var firstContext = cBlock.getContext('2d');
var secondContext = cStrip.getContext('2d');
var colorLabel = document.getElementById('color-label');
var x = 0;
var y = 0;
var drag = false;
var rgbaColor = 'rgba(255,0,0,1)';
cStrip.addEventListener("click", click, false);
cBlock.addEventListener("mousedown", mousedown, false);
cBlock.addEventListener("mouseup", mouseup, false);
cBlock.addEventListener("mousemove", mousemove, false);

function click(e) {
    x = e.offsetX;
    y = e.offsetY;
    var imageData = secondContext.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    fillGradient();
}

function fillGradient() {
    firstContext.fillStyle = rgbaColor;
    firstContext.fillRect(0, 0, width1, height1);

    var grdWhite = secondContext.createLinearGradient(0, 0, width1, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    firstContext.fillStyle = grdWhite;
    firstContext.fillRect(0, 0, width1, height1);

    var grdBlack = secondContext.createLinearGradient(0, 0, 0, height1);
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    firstContext.fillStyle = grdBlack;
    firstContext.fillRect(0, 0, width1, height1);
}

function mousedown(e) {
    drag = true;
    changeColor(e);
}

function mousemove(e) {
    if (drag) {
        changeColor(e);
    }
}

function mouseup(e) {
    drag = false;
}

function changeColor(e) {
    x = e.offsetX;
    y = e.offsetY;
    var imageData = firstContext.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    colorLabel.style.backgroundColor = rgbaColor;
    context.strokeStyle = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
}

function turnLeft(){ 
    drawRotated(90);
}

function turnRight(){ 
    drawRotated(-90);
}

function openCrop() {
    /*if (cropBool == false) {
        cropBool = true;
        img.style.height = modHeight;
        img.style.width = modWidth;
        console.log("this is the images dimensions" + img.height + "," + img.width);
    }*/
    //var temporary = new Image(); 
    //temporary.height = modHeight;
    //temporary.width = modWidth;
    //temporary.src = img.src; 
    console.log("width is " + modWidth + " and height is" + modHeight);
    var x = prompt("Enter a between 1-100 for the first part of the width");
    var finalX = prompt("Enter a between 1-100 for second part of the width");
    var y = prompt("Enter a between 1-100 for the first part of the height");
    var finalY = prompt("Enter a between 1-100 for second part of the height");
    var w = (x)/100 * img.width;
    var h = (y)/100 * img.height; 
    //var w1 = (finalX)/100 * img.width;
    //var h2 = (finalY)/100 * img.height; 
    varOne = (finalX - x)/100 * img.width;
    varTwo = (finalY - y)/100 * img.height; 
    console.log("starting coordinate is " + w + "," + h);
    console.log("width is " + varOne + " and height is" + varTwo);
    context.clearRect(0,0, canvas.width, canvas.height);
    const xCon = (finalX - x)/100 * modWidth;
    const yCon = (finalY - y)/100 * modHeight;
    console.log("MODDED width is " + xCon + " and height is" + yCon);
    //context.drawImage(img, 0,0, varOne, varTwo);
    //context.fillRect(0,0,varOne, varTwo);
    //context.drawImage(temporary, 0,0);
    //var xVal = (myCanvas.width / 2) - (img.width / 2) * scale;
    //var yVal = (myCanvas.height / 2) - (img.height / 2) * scale;
    context.drawImage(img, w, h, varOne, varTwo, 0,0, xCon, yCon); 
    //context.drawImage(img, w, h, xCon, yCon, w, h, xCon, yCon); 
    //context.clearRect(0,0, originalImageWidth, originalImageHeight)
}
function grayFilter() {
    var windowWidth = window.innerWidth * 0.1;
    var windowHeight = window.innerHeight;
    data = myCanvas.toDataURL();
    win = window.open('','', 'width=' + windowWidth + ',' + 'height =' + windowHeight + ',' + 'resizable=no');
   // win.innerWidth = windowWidth;
   // win.innerHeight = windowHeight;
    console.log(win.innerHeight);
    win.document.write('<button id= "reset" onClick=opener.resetImg()> <img id= "grayscale" img src=""https://image.flaticon.com/icons/png/512/105/105741.png"" alt="reset image" style= "float:left" title="reset all filters"> </button>');
    win.document.write('<button id= "grayscale" onClick=opener.greyS()> <img id= "grayscale" img src=""https://image.flaticon.com/icons/png/512/105/105741.png"" alt="grayscale" style= "float:left" title="grayscale the image"> </button>');
    win.document.write('<p>Blur: </p>')
    win.document.write('<input type="range" onchange="opener.blurry()" id = "resizer" name = "slider3" value= "0" min ="0" max = "10" title= "blur the image">');
    win.document.write('<p>Contrast: </p>')
    win.document.write('<input type="range" onchange="opener.contrast()" id = "ctrast" name = "slider4" value = "1" min ="1" max = "100" title= "change the contrast">');
    win.document.write('<p>Brightness: </p>')
    win.document.write('<input type="range" onchange="opener.bright()" id = "bRight" name = "slider5" value= "1" min ="1" max = "100" title= "brighten the image">');
    //win.document.write('<input type="checkbox" id="color-input2" checked></input>'+ '<label for="color-input2" id="color-label2" style="background-color: red"></label>');
    win.document.write('<p>Color Filter: </p>')
    win.document.write('<canvas id="color-block2" title="change color filter"></canvas>');
    win.document.write('<canvas id="color-strip2"></canvas>');
    /*win.onload = function() {
        console.log('hey the window has loaded');
        begin();
    }*/
    begin();
    /*win.onload = function() {
        var tempBlock2 = win.document.getElementById(color-block2);
        var tempStrip2 = win.document.getElementById(color-strip2);
        Nwidth1 = tempBlock2.width;
        Nheight1 = tempBlock2.height;
        console.log('the blogs width is' + Nwidth1);
        Nwidth2 = tempStrip2.width;
        Nheight2 = tempStrip2.height;
    }*/
    

   // var firstSlider =  win.document.getElementById('resizer');
   // var secondSlider =  win.document.getElementById('ctrast');
   // var thirdSlider =  win.document.getElementById('bRight');
   // firstSlider.width = win.innerWidth * 0.5;
   // console.log('first sliders width is' + firstSlider.width);
   // secondSlider.width = win.innerWidth;
   // console.log('second sliders width is' + secondSlider.width);
   // thirdSlider.width = win.innerWidth;
    //win.onload = function() {
        //var tempSlide11 = win.document.getElementById('resizer');
        //console.log(tempSlide11.value + 'is the sliderval rn');
    //}
    //win.document.write('<button id= "blur" onClick=opener.blurry()> <img id= "grayscale" img src=""https://image.flaticon.com/icons/png/512/105/105741.png"" alt="blur image" style= "float:left" title="blur the image"> </button>');
    win.focus();
    win.document.addEventListener("visibilitychange", winGone);
}

function winGone() {
    if (win.document.hasFocus() == false) {
        win.close(); // closes when window is out of focus - essentially i don't want 100 tabs just sitting around
    }
    context.filter = 'grayscale(0)'; // make into reset method when needed
    context.filter = 'blur(0px)';
    context.filter = 'contrast(1)';
    context.globalCompositeOperation = "source-over";
}

   // canvas used to choose color FOR COLOR FILTER
var cBlock2;
var cStrip2;
var Nwidth1;
var Nheight1;
var Nwidth2;
var Nheight2;
var firstContext2;
var secondContext2;
var colorLabel2;
var x2 = 0;
var y2 = 0;
var drag2 = false;
var rgbaColor2 = 'rgba(255,0,0,1)';

function begin() { 
    cBlock2 = win.document.getElementById('color-block2');
    cStrip2 = win.document.getElementById('color-strip2');
    cBlock2.height = h * 0.3;
    cBlock2.width = w * 0.06;
    console.log(cBlock2.width);
    console.log(cBlock2.height);
    cStrip2.height = h * 0.3;
    cStrip2.width = w * 0.025;
    Nwidth1 = cBlock2.width;
    Nheight1 = cBlock2.height;
    console.log('the blogs width is' + Nwidth1);
    console.log('the blogs height is' + Nheight1); 
    Nwidth2 = cStrip2.width;
    Nheight2 = cStrip2.height;
    firstContext2 = cBlock2.getContext('2d');
    secondContext2 = cStrip2.getContext('2d');
    //colorLabel2 = win.document.getElementById('color-label2');
    cStrip2.addEventListener("click", click2, false);
    cBlock2.addEventListener("mousedown", mousedown2, false);
    cBlock2.addEventListener("mouseup", mouseup2, false);
    cBlock2.addEventListener("mousemove", mousemove2, false);
    firstContext2.rect(0, 0, width1, height1);
    secondContext2.rect(0, 0, width2, height2);
    var Mgrd1 = secondContext2.createLinearGradient(0, 0, 0, height1);
    Mgrd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
    Mgrd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    Mgrd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    Mgrd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    Mgrd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    Mgrd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    Mgrd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
    secondContext2.fillStyle = Mgrd1;
    secondContext2.fill();
    fillGradient2();
}


function click2(e) {
    console.log("HELLO HELLO HELLO");
    x2 = e.offsetX;
    y2 = e.offsetY;
    var imageData2 = secondContext2.getImageData(x2, y2, 1, 1).data;
    rgbaColor2 = 'rgba(' + imageData2[0] + ',' + imageData2[1] + ',' + imageData2[2] + ',1)';
    fillGradient2();
}

function fillGradient2() {
    firstContext2.fillStyle = rgbaColor2;
    firstContext2.fillRect(0, 0, Nwidth1, Nheight1);

    var grdWhite2 = secondContext2.createLinearGradient(0, 0, Nwidth1, 0);
    grdWhite2.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite2.addColorStop(1, 'rgba(255,255,255,0)');
    firstContext2.fillStyle = grdWhite2;
    firstContext2.fillRect(0, 0, Nwidth1, Nheight1);

    var grdBlack2 = secondContext2.createLinearGradient(0, 0, 0, Nheight1);
    grdBlack2.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack2.addColorStop(1, 'rgba(0,0,0,1)');
    firstContext2.fillStyle = grdBlack2;
    firstContext2.fillRect(0, 0, Nwidth1, Nheight1);
}

function mousedown2(e) {
    drag2 = true;
    changeColor2(e);
}

function mousemove2(e) {
    if (drag2) {
        changeColor2(e);
    }
}

function mouseup2(e) {
    drag2 = false;
}

function changeColor2(e) {
    context.filter = 'grayscale(0)'; // make into reset method when needed
    context.filter = 'blur(0px)';
    context.filter = 'contrast(1)';
    x2 = e.offsetX;
    y2 = e.offsetY;
    var imageData2 = firstContext2.getImageData(x2, y2, 1, 1).data;
    rgbaColor2 = 'rgba(' + imageData2[0] + ',' + imageData2[1] + ',' + imageData2[2] + ',1)';
    //colorLabel2.style.backgroundColor = rgbaColor2;
    console.log(rgbaColor2);
    var convertedColor = conv(rgbaColor2);
    console.log(convertedColor);
    //context.filter= 'grayscale(100%)' + 'sepia(100%)';
    scaledImg = new Image();
    console.log('hello');
    scaledImg.src = data;
    scaledImg.onload = function() {
        context.clearRect(0, 0, myCanvas.width, myCanvas.height);
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        context.globalCompositeOperation = "hue";
        context.fillStyle = convertedColor;
        context.fillRect(0, 0, myCanvas.width, myCanvas.height);
        context.globalCompositeOperation = "source-over";
    }
    //context.strokeStyle = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
}          

function conv(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
     ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
     ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function resetImg() { 
    context.filter = 'grayscale(0)'; // make into reset method when needed
    context.filter = 'blur(0px)';
    context.filter = 'contrast(1)';
    context.globalCompositeOperation = "source-over";
    fBool = false; 
    console.log("resetting!");
    context.clearRect(0, 0, myCanvas.width, myCanvas.height);
    scaledImg = new Image();
    console.log('hello');
    scaledImg.src = data;
    scaledImg.onload = function() {
        //var scale = Math.min(myCanvas.width / img.width, myCanvas.height / img.height);
        var xVal = (myCanvas.width / 2) - (scaledImg.width / 2);
        var yVal = (myCanvas.height / 2) - (scaledImg.height / 2);
        //var xVal = myCanvas.width / 2 - img.width / 2;
        //var yVal = myCanvas.height / 2 - img.height / 2;
        modWidth = (scaledImg.width);
        modHeight = (scaledImg.height);
        console.log('hello1 i am ' + modWidth + 'and this is my friend' + modHeight);
        context.drawImage(scaledImg, xVal, yVal, modWidth, modHeight);
        var xVal4 = myCanvas.width / 2 - img.width / 2;
        var yVal4 = myCanvas.height / 2 - img.height / 2;
        //console.log("im actually drawing something" + "the height and width are " + canvImage + " " + canvImage);
        //console.log("the canvas dimens are" + myCanvas.width + "," + myCanvas.height);
        //console.log("the i dimens are" + canvImage.width + "," + canvImage.height);
    }
}
function greyS() {
    var tempImg;
    /*if (fBool == false) {             // creates a copy of the original image - essentially 
            tempImg = new Image();          
            tempImg.onload = function() {
                canvImage.src = tempImg;
                console.log("the i loaded dimens are" + canvImage.width + "," + canvImage.height); 
                canvImgW = canvImage.width;
                canvImgH = canvImage.height;
                console.log("try2: the i loaded dimens are" +  canvImgW + "," + canvImgH);
            }
            canvImage.onerror = function() {
                console.log("failure");
            }
    };*/
    //context.filter = 'blur(0px)';
    scaledImg = new Image();
    console.log('hello');
    scaledImg.src = data;
    scaledImg.onload = function() {
        resetImg();
        if (fBool == false ) {
            context.filter = 'grayscale(1)';
           // context.filter = 'blur(10px)';
            fBool = true;  
            console.log("NOT resetting!");
              //img.src = scaledImg;
            var xVal3 = myCanvas.width / 2 - scaledImg.width / 2;
            var yVal3 = myCanvas.height / 2 - scaledImg.height / 2;
            console.log("im actually drawing something" + "the height and width are " + xVal3 + " " + yVal3);
            console.log("the canvas dimens are" + myCanvas.width + "," + myCanvas.height);
            console.log("the i dimens are" + scaledImg.width + "," + scaledImg.height);
            context.clearRect(0, 0, myCanvas.width, myCanvas.height);
            context.drawImage(scaledImg, xVal3, yVal3);
        }
    }
    //context.putImageData(scaledImg, 0, 0);
    //context.drawImage(scaledImg, xVal3, yVal3);
    console.log("yo.. it worked?");

}

function blurry() {
    //context.filter = 'grayscale(0)';
    var tempSlide = win.document.getElementById('resizer');
    //console.log('TESTING: first sliders width is' + tempSlide.width);
    //console.log(tempSlide.value + 'is the sliderval rn');
    var tNum = tempSlide.value;
    scaledImg = new Image();
    console.log('hello');
    scaledImg.src = data;
    scaledImg.onload = function() {
        resetImg();
        if (fBool == false ) {
            context.filter = 'blur(' + tNum + 'px)';
            //context.contrast(1.3);
            fBool = true;  
            console.log("NOT resetting!");
              //img.src = scaledImg;
            var xVal3 = myCanvas.width / 2 - scaledImg.width / 2;
            var yVal3 = myCanvas.height / 2 - scaledImg.height / 2;
            console.log("blur this!");
            context.clearRect(0, 0, myCanvas.width, myCanvas.height);
            context.drawImage(scaledImg, xVal3, yVal3);
        }
    }
    //context.putImageData(scaledImg, 0, 0);
    //context.drawImage(scaledImg, xVal3, yVal3);
    console.log("yo.. it worked?");
}

function bright() {
    //context.filter = 'grayscale(0)';
    var tempSlide3 = win.document.getElementById('bRight');
   // console.log(tempSlide.value + 'is the sliderval rn');
    var tNum3 = tempSlide3.value;
    scaledImg = new Image();
    console.log('hello');
    scaledImg.src = data;
    scaledImg.onload = function() {
        resetImg();
        if (fBool == false ) {
            context.filter = 'brightness(' + tNum3 + ')';
            //context.contrast(1.3);
            fBool = true;  
            console.log("NOT resetting!");
              //img.src = scaledImg;
            var xVal3 = myCanvas.width / 2 - scaledImg.width / 2;
            var yVal3 = myCanvas.height / 2 - scaledImg.height / 2;
            console.log("blur this!");
            context.clearRect(0, 0, myCanvas.width, myCanvas.height);
            context.drawImage(scaledImg, xVal3, yVal3);
        }
    }
    //context.putImageData(scaledImg, 0, 0);
    //context.drawImage(scaledImg, xVal3, yVal3);
    console.log("yo.. it worked?");
}

function contrast() {
    //context.filter = 'grayscale(0)';
    var tempSlide2 = win.document.getElementById('ctrast');
   // console.log(tempSlide.value + 'is the sliderval rn');
    var tNum2 = tempSlide2.value;
    scaledImg = new Image();
    console.log('hello');
    scaledImg.src = data;
    scaledImg.onload = function() {
        resetImg();
        if (fBool == false ) {
            context.filter = 'contrast(' + tNum2 + ')';
            //context.contrast(1.3);
            fBool = true;  
            console.log("NOT resetting!");
              //img.src = scaledImg;
            var xVal3 = myCanvas.width / 2 - scaledImg.width / 2;
            var yVal3 = myCanvas.height / 2 - scaledImg.height / 2;
            console.log("blur this!");
            context.clearRect(0, 0, myCanvas.width, myCanvas.height);
            context.drawImage(scaledImg, xVal3, yVal3);
        }
    }
    //context.putImageData(scaledImg, 0, 0);
    //context.drawImage(scaledImg, xVal3, yVal3);
    console.log("yo.. it worked?");
}

function drawRotated(degrees){
    var img2 = new Image();
    var width2;
    var height2;
    var ratio3;
    var ratio4;
    img2.src = img.src;
    height2 = img2.height;
    width2 = img2.width; 
    ratio3 = height2/width2;
    ratio4 = width2/height2;
    context.clearRect(0, 0, canvas.width, canvas.height);
    img2.setAttribute('style','transform:rotate(180deg)'); 
    //img2.style.transform = 'rotate(' + degrees + 'deg)';
    if (width2 > 1000) {
        height2 = 1000 * ratio3; 
        width2 = 1000;
    }
    if (height2 > 1000) {
        width2 = 1000 * ratio4;
        height2 = 1000; 
    } 
    img2.height = height2;
    img2.width = width2;
    originalImageHeight = height2;
    originalImageWidth = width2; 
    console.log('the image2 width is'+ img2.width);
    console.log('the image2 height is'+ img2.height);
    var xVal2 = myCanvas.width / 2 - img2.width / 2;
    var yVal2 = myCanvas.height / 2 - img2.height / 2;
    context.drawImage(img2, xVal2, yVal2);
    dlButton.href = img2.src;   
    img.src = img2.src;

}

/*slider.oninput = function() {
     var num = slider.value;
     context.beginPath();
     context.lineWidth = num;
     context.lineCap = 'round';
}*/
var inform = false;
var info;
endSlide.oninput = function() {
    if (inform == false) {
        info = canvas.toDataURL(); 
        inform = true;
    }
    /*if (cropBool == false) {
        cropBool = true;
        img.height = modHeight;
        img.width = modWidth;
        console.log("this is the images dimensions" + img.height + "," + img.width);
    }*/
    /*var xVal = (myCanvas.width / 2) - (img.width / 2);
    var yVal = (myCanvas.height / 2) - (img.height / 2);                              
    var scale = Math.min(myCanvas.width / img.width, myCanvas.height / img.height);
    var w = (img.width) * scale;
    var h = (img.height) * scale;
    console.log('hello i am ' + w + 'and this is my friend' + h);*/
    var tempImg = new Image(); 
    tempImg.src = info;
    tempImg.onload = function() {
        console.log('hello');
        if (imageClear == false) {
            context.clearRect(0, 0, myCanvas.width, myCanvas.height);
            var num = endSlide.value;   
            //console.log("width is" + tempImg.width)
            //var scale = Math.min(myCanvas.width / tempImg.width, myCanvas.height / tempImg.height);
            //context.clearRect(xVal, yVal, (img.width) * scale, (img.height) * scale);
            //img.height = num/100 * originalImageHeight;
            console.log('height is' + num/100 * tempImg.height);
            //img.width = num/100 * originalImageWidth;
            var tempw = tempImg.width * num/100;
            var temph = tempImg.height * num/100;
            var xVal = myCanvas.width / 2 - tempw / 2;
            var yVal = myCanvas.height / 2 - temph / 2;
        //  context.drawImage(img, xVal, yVal);
            console.log('IM DRAWNG');
            //var scale = Math.min(myCanvas.width / img.width, myCanvas.height / img.height);
            context.drawImage(tempImg, xVal, yVal, tempw, temph);
        }
        else {
            alert("No image has been put in!");
        }
    }

}

const backgroundRemoval = async () => {
    const canvas1 = document.querySelector('canvas');
  
    const net = await bodyPix.load({
      architecture: 'ResNet50',
      outputStride: 32,
      quantBytes: 4
    })
    const segmentation = await net.segmentPerson(canvas1, {
      internalResolution: 'medium',
      segmentationThreshold: 0.7,
      scoreTreshold: 0.7
    })
  
    const ctxT = canvas1.getContext('2d');
    const { data: imgData } = ctxT.getImageData(0, 0, canvas.width, canvas.height);
  
    const newImg = ctxT.createImageData(canvas.width, canvas.height);
    const newImgData = newImg.data;
  
    segmentation.data.forEach((segment, i) => {
      if (segment == 1) {
        newImgData[i * 4] = imgData[i * 4]
        newImgData[i * 4 + 1] = imgData[i * 4 + 1]
        newImgData[i * 4 + 2] = imgData[i * 4 + 2]
        newImgData[i * 4 + 3] = imgData[i * 4 + 3]
      }
    })
  
    ctxT.putImageData(newImg, 0, 0);
  }
  




  var bs_modal = $('#modal');
  var imageO = document.getElementById('cImg');
  var cropMac,reader,file;
  function click1() {
    croppingImage = myCanvas.toDataURL();
    //console.log("woah, it's even getting here? 3");
    imageO.src = croppingImage;
    imageO.onload = function() {
        //console.log("yep");
        bs_modal.modal('show');
        //console.log("nice!!!");
    
    }
   

    // capture the image then crop image then redraw ez
   /* croppingImage = myCanvas.toDataURL();
    croppingImageF = new Image();
    croppingImageF.src = croppingImage;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    win2 = window.open('','', 'width=' + windowWidth + ',' + 'height =' + windowHeight + ',' + 'resizable=no');
    //win2.document.write('<img id= "temp" img src= "https://www.svgrepo.com/show/61952/filter-filled-tool-symbol.svg"></img>');
    data = myCanvas.toDataURL();
    //croppingImageF = document.getElementById('temp');
    croppingImageF = new Image();
    croppingImageF.src = data;
    croppingImageF.onload = function() {
        //document.getElementById('temp').src = croppingImageF;
        win2.document.body.appendChild(croppingImageF);
        croppy = new Cropper(croppingImageF, {
                aspectRatio: 1,
                viewMode: 3,
                preview:'.preview'
        });
        /*const cropper = new Cropper(croppingImageF, {
            aspectRatio: 1 / 1,
            guides: false,
            viewMode: 1,
            dragMode: 'crop',
            responsive: true,
            cropBoxResizable: false,
            toggleDragModeOnDblclick: false,
            rounded: true,
            //preview:".preview",
            maxContainerWidth: myCanvas.width,
            maxContainerHeight: myCanvas.height,
        });*/
    //} 
   // context.clearRect(0, 0, canvas.width, canvas.height);
}

bs_modal.on('shown.bs.modal', function() {
    //console.log("woah, it's even getting here? 2");
    cropMac = new Cropper(imageO, {
        //aspectRatio: 1,
        viewMode: 3,
        preview: '.preview',
        autoCrop: true
    });
}).on('hidden.bs.modal', function() {
    cropMac.destroy();
    cropMac = null;
});

var dataM;
//const cCanvas;
var imgP;

$("#cropL").click(function() {
    console.log("hey al1!!!");
    let cCanvas = cropMac.getCroppedCanvas().toDataURL();
    //console.log("the width of the croppy canv is" + cCanvas.width);
    //console.log("the height of the croppy canv is" + cCanvas.height);
    //dataM = cCanvas.toDataURL("image/png"); 
    imgP = new Image(); 
    imgP.src = cCanvas;
    imgP.onload = function() {
        console.log("we worked!!!");
        context.clearRect(0,0, canvas.width, canvas.height);
        var rating = imgP.width/imgP.height;
        //var rat1 = canvas.width/img.width;
        //var rat2 = canvas.height/img.height;
        var wO = 0;
        var hO= 0;
        if (rating > 1) {
            wO = canvas.width;
            hO = canvas.width * 1/rating;
        }
        else {
            wO = canvas.height * rating;
            hO = canvas.height;
        }
        /*if (rat1 > rat2) {
            h = canvas.height;
            w = 
        }*/
        context.drawImage(imgP, 0, 0, wO, hO); // will fix this later
        
    }
    //console.log("the width of the imgP is" + imgP.width);
    //console.log("the height of the imgP is" + imgP.height);
    bs_modal.modal('hide');

    /*cCanvas.toBlob(function(blob) {
        url = URL.createObjectURL(blob);
        console.log("woah, it's even getting here?");
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
            var base64data = reader.result;

           /* $.ajax({
                type: "POST",
                dataType: "json",
                url: "upload.php",
                data: {image: base64data},
                success: function(data) { 
                    bs_modal.modal('hide');
                    alert("success upload image");
                }
            }); 
        };
    });*/
});

/*function cropTime() {
    cCanvas = cropMac.getCroppedCanvas({
        width: 160,
        height: 160,
    });
    var imgP;
    imgP = new Image(); 
    imgP.onload = function() {
        imgP.src = cCanvas.toDataURL();
    }
    
    context.drawImage(imgP, 0, 0, canvas.width, canvas.height);
    bs_modal.modal('hide');
} */

var modalRevealImage;
var uploadImg;
var canvEE;
var drawingCanvas = document.getElementById("imageDraw");
var form; 
const ct2 = drawingCanvas.getContext("2d");
var bs_modal2 = $('#modal2');
 // var imageO = document.getElementById('cImg');
  function clickStitch() {
    //croppingImage = myCanvas.toDataURL();
    //console.log("woah, it's even getting here? 3");
    //imageO.src = croppingImage;
    //imageO.onload = function() {
        //console.log("yep");
        //bs_modal.modal('show');
        //console.log("nice!!!");
    canvEE = myCanvas.toDataURL();
    modalRevealImage = new Image();
    modalRevealImage.src =canvEE;
    modalRevealImage.onload = function() {
        bs_modal2.modal('show');
        console.log("we worked!!!");
        ct2.drawImage(modalRevealImage, 0, 0, drawingCanvas.width, drawingCanvas.height);
    }

    

    //}
  }

  var showOFile = function(event) {
        uploadImage = new Image();
        uploadImage.src = URL.createObjectURL(event.target.files[0]);
        modalRevealImage.onload = function() {
            ct2.globalAlpha = 0.4
            ct2.drawImage(modalRevealImage, 0, 0, drawingCanvas.width, drawingCanvas.height);
            console.log("this is doing its job, right");
        }
  }

