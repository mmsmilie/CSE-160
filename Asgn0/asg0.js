function main() {  
    drawCanvas();
}

function drawCanvas(){

    var canvas = document.getElementById('first');
    var ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to blue
    ctx.fillRect(0, 0, 400, 400);        // Fill a rectangle with the color
}

function drawVector(v, color) {
    var canvas = document.getElementById('first');
    var ctx = canvas.getContext('2d');

    // Center of the canvas is (200,200)
    var x_center = 200;
    var y_center = 200;

    var x = x_center + v.x * 20; // Assuming v.x is the horizontal component
    var y = y_center - v.y * 20; // Assuming v.y is the vertical component, and canvas y increases downwards

    ctx.beginPath(); // Start a new path
    ctx.moveTo(200, 200); // Move to the center of the canvas
    ctx.lineTo(x, y); // Draw line to (x, y)
    ctx.strokeStyle = color; // Set the color of the line
    ctx.stroke(); // Render the path
}


function handleDrawEvent(){

    drawCanvas();

    var x = parseFloat(document.getElementById("input1").value);
    var y = parseFloat(document.getElementById("input2").value);
    

    var v = new Vector3([x,y,0]);

    drawVector(v,'red');

    x = parseFloat(document.getElementById("input3").value);
    y = parseFloat(document.getElementById("input4").value);

    v = new Vector3([x,y,0]);

    drawVector(v,'blue');
}

function handleDrawOperationEvent(){

    drawCanvas();

    var x = parseFloat(document.getElementById("input1").value);
    var y = parseFloat(document.getElementById("input2").value);

    var v1 = new Vector3([x,y,0]);

    drawVector(v1,'red');

    x = parseFloat(document.getElementById("input3").value);
    y = parseFloat(document.getElementById("input4").value);

    var v2 = new Vector3([x,y,0]);

    drawVector(v2,'blue');

    var e = document.getElementById("operations");
    var value = e.value;
    var text = e.options[e.selectedIndex].text;
    var scalar = parseFloat(document.getElementById("scalar").value);
    var v3 = new Vector3();
    var v4 = new Vector3();

    
    if(text == 'Add'){
        v1.add(v2);
        drawVector(v1,'green');
    }else if(text == 'Subtract'){
        v1.sub(v2);
        drawVector(v1,'green');
    }else if(text == 'Multiply'){
        v1.mul(scalar);
        drawVector(v1,'green');

        v2.mul(scalar);
        drawVector(v2,'green');
    }else if(text == 'Divide'){
        v1.div(scalar);
        drawVector(v1,'green');

        v2.div(scalar);
        drawVector(v2,'green');
    }else if(text == 'Magnitude'){
        console.log("Magnitudes: " +v1.magnitude());
        console.log("Magnitudes: " +v2.magnitude());
    }else if(text == 'Normalize'){
        v1.normalize();
        drawVector(v1,'green');

        v2.normalize();
        drawVector(v2,'green');
    }else if(text == 'Angle between'){
        console.log("Angle between: " +angleBetween(v1,v2));
    }else if(text == 'Area of triangle'){
        console.log("Area of triangle: " +areaTriangle(v1,v2));
    }
}

function angleBetween(v1,v2){
    var d = Vector3.dot(v1,v2);
    var m = v1.magnitude() * v2.magnitude();
    var answer = Math.acos(d/m);
    return answer;
}

function areaTriangle(v1,v2){
    var v3 = Vector3.cross(v1,v2);
    return v3.magnitude()/2;
}