var shape = 0;
var debug = false;

function main() {  

    var doDraw = false;

    drawCanvas();
    var canvas = document.getElementById('first');

    canvas.onmousedown = function(event) {
        doDraw = true;
        draw(event); // Draw immediately on mousedown
    };
    
    canvas.onmousemove = function(event) {
        if (doDraw) {
            draw(event); // Draw when mouse moves with button down
        }
    };
    
    canvas.onmouseup = function(event) {
        doDraw = false;
    };
    
    canvas.onmouseleave = function(event) {
        doDraw = false;
    };
    
    function draw(event) {
        var rect = canvas.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;
    
        // Now we just draw once for each mousemove event.
        if(debug) console.log('Mouse position:', mouseX, mouseY);
        drawShape(mouseX, mouseY);
    }
}

function doRepeatDraw(x,y) {
    if(doDraw){
        drawShape(x,y);
    }
}

function drawCanvas(){
    if(debug) console.log("Drawing Canvas");
    var canvas = document.getElementById('first');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Black
    ctx.fillRect(0, 0, 400, 400);
}

function drawEvent(event) {
    if (debug) console.log("Detected Click on Canvas");
    var canvas = document.getElementById('first');
    var ctx = canvas.getContext('2d');
    if(debug) console.log(event.x + "," + event.y);
    drawShape(event.x,event.y);
}

function drawMode(mode) {
    if(debug) console.log("Drawing Mode: " + mode);
    shape = mode;
}

function drawShape(x,y){
    if(debug) console.log("Drawing Shape");
    if(shape == 0){
        drawSquare(x,y);
    }else if(shape == 1){
        drawTriangle(x,y);
    }else if(shape == 2){
        drawCircle(x,y);
    }
}

function drawSquare(x, y) {
    if(debug) console.log("Drawing Square");
    var canvas = document.getElementById('first');
    var ctx = canvas.getContext('2d');
    var colors = getColor();
    var size = getSize();
    // Calculate the starting point to center the square
    var startX = (x - size/2);
    var startY = (y - size/2);
    ctx.fillStyle = 'rgba(' + colors[0] + ', ' + colors[1] + ', ' + colors[2] + ', 1.0)';
    ctx.fillRect(startX, startY, size, size);
}

function drawTriangle(x, y){
    var canvas = document.getElementById('first');
    var ctx = canvas.getContext('2d');
    var colors = getColor();
    var size = getSize();

    // Adjust the triangle drawing to center it on (x, y)
    ctx.fillStyle = 'rgba(' + colors[0] + ', ' + colors[1] + ', ' + colors[2] + ', 1.0)';
    ctx.beginPath();
    ctx.moveTo((x - size / 2), (y + Math.sqrt(3) / 6 * size));
    ctx.lineTo((x + size / 2), (y + Math.sqrt(3) / 6 * size));
    ctx.lineTo(x-7, (y - Math.sqrt(3) / 3 * size)-7);
    ctx.closePath();
    ctx.fill();
}

function drawCircle(x, y) {
    var canvas = document.getElementById('first');
    var ctx = canvas.getContext('2d');
    var colors = getColor();
    var size = getSize(); // This represents the diameter of the circle.
    var segments = getSegments(); // This should return the number of segments you want to divide your circle into.
    
    var radius = size / 2;
    var anglePerSegment = 2 * Math.PI / segments; // The angle that each segment will cover.

    ctx.fillStyle = 'rgba(' + colors[0] + ', ' + colors[1] + ', ' + colors[2] + ', 1.0)';
    ctx.beginPath();

    // Move to the starting point on the circle's circumference
    ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));

    // Draw each segment of the circle
    for (var i = 1; i <= segments; i++) {
        var angle = i * anglePerSegment;
        var nextX = x + radius * Math.cos(angle);
        var nextY = y + radius * Math.sin(angle);
        ctx.lineTo(nextX, nextY);
    }
    
    ctx.closePath(); // Connect the last point to the first
    ctx.fill();
}

function getColor(){
    if(debug) console.log("Getting Color");
    var array = new Float32Array(3);
    
    array[0] = parseFloat(document.getElementById('red').value);
    array[1] = parseFloat(document.getElementById('green').value);
    array[2] = parseFloat(document.getElementById('blue').value);

    return array;
}


function getSize(){
    if(debug) console.log("Getting Size");
    return document.getElementById('size').value;
}

function getSegments(){
    if(debug) console.log("Getting Segments");
    return document.getElementById('segments').value;
}


