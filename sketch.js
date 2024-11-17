/*
The Final game project
Week 20
*/
var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos_y;
var sceneryScrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isPlummeting;
var isFalling;
var isOverCanyon;

var collectables;
var clouds;
var trees_x;
var flowers;
var canyons;
var mountains;

var showGameCharacter;
var isOverCanyon;
var flagpole;
var GameOver = false;
var lives = 1;
var score = 0;


function setup() {
    createCanvas(1024, 576);
    floorPos_y = height * 3 / 4;
    gameChar_x = width / 2;
    gameChar_y = floorPos_y;
    canyon = {
        x: 800,
        y: 432,
        width: 80,
        height: 145
    };
    collectable = {
        x: 600,
        y: 325,
        size: 20,
        isFound: false
    };
    clouds = [{
            x_pos: 100 - width,
            y_pos: 150,
            size: 80
        },
        {
            x_pos: 500 - width,
            y_pos: 80,
            size: 80
        },
        {
            x_pos: 850 - width,
            y_pos: 120,
            size: 80
        },
        {
            x_pos: 100,
            y_pos: 150,
            size: 80
        },
        {
            x_pos: 500,
            y_pos: 80,
            size: 80
        },
        {
            x_pos: 850,
            y_pos: 120,
            size: 80
        },
        {
            x_pos: 100 + width,
            y_pos: 150,
            size: 80
        },
        {
            x_pos: 500 + width,
            y_pos: 80,
            size: 80
        },
        {
            x_pos: 850 + width,
            y_pos: 120,
            size: 80
        },
        {
            x_pos: 200 + width * 2,
            y_pos: 80,
            size: 80
        },
        {
            x_pos: 550 + width * 2,
            y_pos: 120,
            size: 80
        },
        {
            x_pos: 900 + width * 2,
            y_pos: 150,
            size: 80
        },
        {
            x_pos: 200 + width * 3,
            y_pos: 80,
            size: 80
        },
        {
            x_pos: 500 + width * 3,
            y_pos: 120,
            size: 80
        },
        {
            x_pos: 750 + width * 3,
            y_pos: 150,
            size: 80
        },
    ];
    isPlummeting = false;
    showGameCharacter = true;
    cameraPosX = 0;
    mountains = [{
            x_pos: 800 - width,
            y_pos: floorPos_y - 182
        },
        {
            x_pos: 750,
            y_pos: floorPos_y - 182
        },
        {
            x_pos: 800 + width,
            y_pos: floorPos_y - 182
        },
        {
            x_pos: 500 + width * 2,
            y_pos: floorPos_y - 182
        }
    ];
    trees_x = [
        300 - width,
        450 - width,
        500 - width,
        900 - width,
        350,
        950,
        100 + width,
        450 + width,
        650 + width,
        960 + width,
        750 + width * 2,
        800 + width * 2,
        900 + width * 3,
        950 + width * 3,
    ];
    flowers = [{
            x_pos: 600 - width,
            y_pos: floorPos_y - 50
        },
        {
            x_pos: 600,
            y_pos: floorPos_y - 50
        },
        {
            x_pos: 600 + width,
            y_pos: floorPos_y - 50
        },
    ];
    canyons = [{
            x_pos: 160 - width,
            y_pos: floorPos_y,
            width: 100
        },
        {
            x_pos: 160,
            y_pos: floorPos_y,
            width: 100
        },
        {
            x_pos: 170 + width,
            y_pos: floorPos_y,
            width: 150
        },
        {
            x_pos: width * 4,
            y_pos: floorPos_y,
            width: width
        }
    ];
    collectables = [{
            x_pos: 50 - width,
            y_pos: floorPos_y - 100,
            size: 45,
            isFound: false
        },
        {
            x_pos: 400 - width,
            y_pos: floorPos_y - 180,
            size: 45,
            isFound: false
        },
        {
            x_pos: 800 - width,
            y_pos: floorPos_y - 100,
            size: 45,
            isFound: false
        },
        {
            x_pos: 450,
            y_pos: floorPos_y - 180,
            size: 45,
            isFound: false
        },
        {
            x_pos: 800,
            y_pos: floorPos_y - 100,
            size: 45,
            isFound: false
        },
        {
            x_pos: 550 + width,
            y_pos: floorPos_y - 180,
            size: 45,
            isFound: false
        },
        {
            x_pos: 720 + width,
            y_pos: floorPos_y - 100,
            size: 45,
            isFound: false
        },
        {
            x_pos: 800 + width,
            y_pos: floorPos_y - 180,
            size: 45,
            isFound: false
        },
        {
            x_pos: width * 2 + 360,
            y_pos: floorPos_y - 100,
            size: 45,
            isFound: false
        },
        {
            x_pos: width * 2 + 700,
            y_pos: floorPos_y - 180,
            size: 45,
            isFound: false
        },
    ];
    flagpole = {
        isReached: false,
        x_pos: 3500
    }
}

function draw() {

    cameraPosX = gameChar_x - 500;
    background(100, 155, 255);
    /////////////////////////////DRAWING CODE///////////////////////

    //Draw some green ground
    noStroke();
    fill(0, 155, 0);
    rect(0, floorPos_y, width, height / 4);

    //Draw some brown underground
    fill(139, 103, 66);
    rect(0, floorPos_y + 15, width, height / 4 - 15);

    //A push/pop for far background - clouds, mountains, trees, flowers, canyons, collectables
    push();
    translate(-cameraPosX, 0);

    //Draw the clouds
    for (var i = 0; i < clouds.length; i++) {
        drawCloud(clouds[i]);
        if (clouds[i].x_pos < (750 + width * 3)) {
            clouds[i].x_pos += 0.3;
        } else {
            clouds[i].x_pos = 100 - width;
        }
    }
    //Draw the mountains
    for (var i = 0; i < mountains.length; i++) {
        drawMountain(mountains[i]);
    }

    // Draw the trees
    for (var i = 0; i < trees_x.length; i++) {
        const tree = new Tree(trees_x[i], floorPos_y, {
            r: 120,
            g: 100,
            b: 40
        }, {
            r: 50,
            g: 120,
            b: 50
        });
        tree.draw();
    }

    // Draw flowers
    for (var i = 0; i < flowers.length; i++) {
        const flower = new Flower(flowers[i].x_pos, flowers[i].y_pos);
        flower.draw();
    }
    // Draw canyons
    for (var i = 0; i < canyons.length; i++) {
        const {
            x_pos,
            y_pos,
            width
        } = canyons[i];
        const canyon = new Canyon(x_pos, y_pos, width);
        canyon.draw();
        canyon.checkContact();
    }
    // Draw collectable items
    for (var i = 0; i < collectables.length; i++) {
        if (!collectables[i].isFound) {
            drawCollectable(collectables[i]);
        }
    }




    //the game character
    if (isLeft && isFalling) {
        stroke("brown");
        // add your jumping-left code
        fill(220, 170, 170);
        ellipse(gameChar_x - 1, gameChar_y - 51, 30, 30);

        fill(204, 102, 0);
        rect(gameChar_x - 10, gameChar_y - 39, 17, 22);

        fill(0);
        rect(gameChar_x - 5, gameChar_y - 38, 8, 15);

        fill(0, 0, 255);
        ellipse(gameChar_x - 2, gameChar_y - 63, 40, 12);
        triangle(gameChar_x + 12, gameChar_y + -64, gameChar_x - 14, gameChar_y - 64, gameChar_x, gameChar_y - 86);

        fill(0);
        rect(gameChar_x - 6, gameChar_y - 17, 9, 11);

        fill(0);
        rect(gameChar_x - 13, gameChar_y - 56, 5, 5);

        fill(0);
        rect(gameChar_x - 14, gameChar_y - 48, 7, 5, 30);

    } else if (isRight && isFalling) {
        stroke("brown");
        // add your jumping-right code
        fill(220, 170, 170);
        ellipse(gameChar_x - 2, gameChar_y - 51, 30, 30);

        fill(204, 102, 0);
        rect(gameChar_x - 10, gameChar_y - 38, 16, 22);

        fill(0);
        rect(gameChar_x - 5, gameChar_y - 36, 8, 15);

        fill(0, 0, 255);
        ellipse(gameChar_x - 2, gameChar_y - 61, 40, 12);
        triangle(gameChar_x + 11, gameChar_y - 65, gameChar_x - 13, gameChar_y - 66, gameChar_x, gameChar_y - 84);

        fill(0);
        rect(gameChar_x - 6, gameChar_y + -17, 9, 11);

        fill(0);
        rect(gameChar_x + 4, gameChar_y - 56, 5, 5);

        fill(0);
        rect(gameChar_x + 4, gameChar_y + -48, 7, 5, 30);


    } else if (isLeft) {
        stroke(255);
        // add your walking left code
        fill(220, 170, 170);
        ellipse(gameChar_x - 1, gameChar_y - 51, 30, 30);

        fill(204, 102, 0);
        rect(gameChar_x - 10, gameChar_y - 38, 17, 27);

        fill(0);
        rect(gameChar_x - 5, gameChar_y - 38, 8, 18);

        fill(0, 0, 255);
        ellipse(gameChar_x - 2, gameChar_y - 63, 40, 12);
        triangle(gameChar_x + 12, gameChar_y - 64, gameChar_x - 14, gameChar_y - 64, gameChar_x, gameChar_y - 84);

        fill(0);
        rect(gameChar_x - 6, gameChar_y - 11, 9, 13);

        fill(0);
        rect(gameChar_x - 13, gameChar_y + -56, 5, 5);
        fill(0);
        rect(gameChar_x - 14, gameChar_y - 48, 7, 5, 30);

    } else if (isRight) {
        stroke(255);
        // add your walking right code
        fill(220, 170, 170);
        ellipse(gameChar_x - 2, gameChar_y - 51, 30, 30);

        fill(204, 102, 0);
        rect(gameChar_x - 10, gameChar_y - 38, 17, 27);

        fill(0);
        rect(gameChar_x - 5, gameChar_y - 38, 8, 18);

        fill(0, 0, 255);
        ellipse(gameChar_x - 2, gameChar_y - 63, 40, 12);
        triangle(gameChar_x + 12, gameChar_y - 63, gameChar_x - 14, gameChar_y - 64, gameChar_x, gameChar_y - 84);

        fill(0);
        rect(gameChar_x - 6, gameChar_y - 11, 9, 13);

        fill(0);
        rect(gameChar_x + 4, gameChar_y - 56, 5, 5);
        fill(0);
        rect(gameChar_x + 4, gameChar_y - 48, 7, 5, 30);

    } else if (isFalling || isPlummeting) {
        stroke(255);
        // add your jumping facing forwards code
        fill(220, 170, 170);
        ellipse(gameChar_x, gameChar_y - 43, 35, 35);

        fill(204, 102, 0);
        rect(gameChar_x - 13, gameChar_y - 32, 26, 22);

        fill(0, 0, 255);
        ellipse(gameChar_x, gameChar_y - 55, 40, 12);
        triangle(gameChar_x + 13, gameChar_y - 53, gameChar_x - 13, gameChar_y - 53, gameChar_x + 1, gameChar_y - 76);

        fill(0);
        rect(gameChar_x - 13, gameChar_y - 10, 9, 11);
        rect(gameChar_x + 4, gameChar_y - 10, 9, 11);

        fill(0);
        rect(gameChar_x + 2, gameChar_y - 46, 5, 5);
        rect(gameChar_x - 6, gameChar_y - 46, 5, 5);

        fill(0);
        rect(gameChar_x - 5, gameChar_y - 38, 10, 5, 30);

        fill(0);
        rect(gameChar_x + 11, gameChar_y - 43, 8, 18);
        rect(gameChar_x - 20, gameChar_y - 43, 8, 18);

    } else {
        stroke("brown");
        // add your standing front facing code
        fill(0);
        rect(gameChar_x + 11, gameChar_y - 38, 8, 18);
        rect(gameChar_x - 20, gameChar_y - 38, 8, 18);

        fill(220, 170, 170);
        ellipse(gameChar_x, gameChar_y - 53, 35, 35);

        fill(204, 102, 0);
        rect(gameChar_x - 13, gameChar_y - 38, 26, 27);

        fill(0, 0, 255);
        ellipse(gameChar_x, gameChar_y - 65, 40, 12);
        triangle(gameChar_x + 13, gameChar_y - 66, gameChar_x - 13, gameChar_y - 66, gameChar_x + 1, gameChar_y - 86);

        fill(0);
        rect(gameChar_x - 13, gameChar_y - 11, 9, 13);
        rect(gameChar_x + 4, gameChar_y - 11, 9, 13);

        fill(0);
        rect(gameChar_x + 2, gameChar_y - 56, 5, 5);
        rect(gameChar_x - 6, gameChar_y - 56, 5, 5);

        fill(0);
        rect(gameChar_x - 5, gameChar_y - 48, 10, 5, 30);

    }


    // Determine if the game character is over a canyon or not. If yes, then the character's shadow should disappear.
    isOverCanyon = false;
    for (var i = 0; i < canyons.length; i++) {
        if (gameChar_x > canyons[i].x_pos && gameChar_x < (canyons[i].x_pos + canyons[i].width) && gameChar_y == canyons[i].y_pos) {
            isPlummeting = true;
            GameOver = true;
            lives--;
        }
    }
    if (isPlummeting == false) {
        (showGameCharacter)
        drawGameCharShadow();

    }
    for (var i = 0; i < collectables.length; i++) {

        if (dist(collectables[i].x_pos, collectables[i].y_pos, gameChar_x, gameChar_y) < 70) {
            collectables[i].isFound = true;
            score++;
        }
    }
    renderFlagpole();

    pop();

    if (flagpole.isReached == false) {
        checkFlagpole();
    }
    if (flagpole.isReached) {
        textSize(50);
        fill(0,0,255);
        textAlign(CENTER, CENTER);
        text("GAME COMPLETE!",width/2, height/2);
    }
    

    if (GameOver) {
        textSize(50);
        fill(255,0,0);
        textAlign(CENTER, CENTER);
        text("GAME OVER!", width / 2, height / 2);
    }
    displayLives();
    checkCollision();
    drawScore();

    ///////////INTERACTION CODE//////////
    //Put conditional statements to move the game character below here
    if (isPlummeting == false) {
        if (isLeft == true) {
            gameChar_x -= 3;
        } else if (isRight == true) {
            gameChar_x += 3;
        }

        if (gameChar_y < floorPos_y) {
            gameChar_y += 2;
            isFalling = true;
        } else {
            isFalling = false;
        }
    } else {
        gameChar_y += 2;
    }

}

function keyPressed() {
    // if statements to control the animation of the character when
    // keys are pressed.

    if (keyCode == 37) {
        isLeft = true;
    } else if (keyCode == 39) {
        isRight = true;
    } else if (keyCode == 32) {
        isFalling = true;

        if (gameChar_y == floorPos_y) {
            gameChar_y -= 170;
            isFalling = true;
        }
    }

}

function keyReleased() {
    // if statements to control the animation of the character when
    // keys are released.

    if (keyCode == 37) {
        isLeft = false;

    } else if (keyCode == 39) {
        isRight = false;

    } else if (keyCode == 32) {
        isJumping = false;
    }

}

//DRAW FUNCTIONS
function drawCloud({
    x_pos,
    y_pos,
    size
}) {
    fill(180);
    ellipse(x_pos - 5, y_pos + 8, size, size - 15)
    ellipse(x_pos - 45, y_pos + 18, size - 20, size - 40);
    ellipse(x_pos + 35, y_pos + 18, size - 20, size - 35);
    fill(255);
    ellipse(x_pos, y_pos, size, size - 15);
    ellipse(x_pos - 40, y_pos + 10, size - 20, size - 40);
    ellipse(x_pos + 40, y_pos + 10, size - 20, size - 35);
}

function drawMountain({
    x_pos,
    y_pos
}) {
    // background mountains
    fill(100);
    triangle(x_pos, y_pos, x_pos - 220, y_pos + 182, x_pos + 160, y_pos + 182);
    // background mountains snow cap
    fill(255);
    beginShape();
    vertex(x_pos, y_pos);
    vertex(x_pos - 45, y_pos + 35);
    vertex(x_pos - 35, y_pos + 50);
    vertex(x_pos - 15, y_pos + 40);
    vertex(x_pos, y_pos + 50);
    vertex(x_pos + 15, y_pos + 50);
    vertex(x_pos + 20, y_pos + 40);
    vertex(x_pos + 44, y_pos + 50);
    endShape();
    // background mountain shadow
    fill(0, 0, 0, 100);
    triangle(x_pos, y_pos, x_pos - 235, y_pos + 182, x_pos - 20, y_pos + 182);
    // foreground mountains
    fill(150);
    triangle(x_pos - 100, y_pos - 50, x_pos - 250, y_pos + 182, x_pos + 50, y_pos + 182);
    // foreground mountains snow cap
    fill(255);
    beginShape();
    vertex(x_pos - 100, y_pos - 50);
    vertex(x_pos - 139, y_pos + 10);
    vertex(x_pos - 110, y_pos);
    vertex(x_pos - 80, y_pos + 30);
    vertex(x_pos - 60, y_pos + 10);
    endShape();
    // foreground mountain shadow
    fill(0, 0, 0, 100);
    triangle(x_pos - 100, y_pos - 50, x_pos - 251, y_pos + 182, x_pos - 140, y_pos + 182);
}

function Tree(x, y, trunkColour, leavesColour) {
    this.x = x;
    this.y = y;
    this.trunk = function({
        r,
        g,
        b
    }) {
        fill(r, g, b);
        rect(this.x, this.y - 100, 20, 100);
        // shadow
        fill(70, 80, 70, 200);
        triangle(this.x + 10, this.y - 30, this.x, this.y - 30, this.x, this.y);
    }
    this.branches = function({
        r,
        g,
        b
    }) {
        fill(r, g, b);
        triangle(this.x - 30, this.y - 30, this.x + 10, this.y - 90, this.x + 50, this.y - 30); // First level branches
        triangle(this.x - 25, this.y - 60, this.x + 10, this.y - 120, this.x + 45, this.y - 60); // Second level branches
        fill(50, 100, 100);
        triangle(this.x - 30, this.y - 30, this.x + 5, this.y - 80, this.x - 5, this.y - 30);
        triangle(this.x - 25, this.y - 60, this.x + 10, this.y - 120, this.x - 5, this.y - 60);
    }
    this.draw = function() {
        this.trunk(trunkColour);
        this.branches(leavesColour);
    }
}

function Flower(x, y) {
    this.x = x;
    this.y = y;
    this.pollen = function() {
        strokeWeight(0);
        stroke(0);
        fill(180, 180, 0); // yellow
        ellipse(0, 0, 10);
    }
    this.petals = function(x_c, y_c, index) {
        strokeWeight(0);
        stroke(0);
        push();
        fill(240);
        for (let i = 0; i < 9; i++) {
            ellipse(10, 0, 20, 7.5);
            rotate(radians(40));
        }
        pop();
    }
    this.stem = function() {
        noFill();
        strokeWeight(4);
        stroke(10, 100, 10);
        beginShape();
        curveVertex(0, 0);
        curveVertex(0, 0);
        curveVertex(2.5, 25);
        curveVertex(-2.5, 35);
        curveVertex(0, 50);
        curveVertex(0, 50);
        endShape();
    }
    this.leaf = function() {
        for (let i = 1; i <= 2; i++) {
            if (i % 2) {
                translate(-25, 0);
                rotate(radians(-40));
            } else {
                translate(30, 65);
                rotate(radians(100));
            }
            fill(10, 100, 10); // green
            arc(-7.5, 30, 15, 15, 0, PI); // underside of leaf
            arc(0, 30, 30, 35, PI, 3 * PI / 2); // left side of leaf
            noFill();
            arc(4.5, 12.5, 10, 55, 57 * PI / 100, PI); // right side of leaf
            strokeWeight(1);
            stroke(10, 100, 10);
            arc(0, 30, 20, 40, PI / 1.5, PI); // leaf vein
            strokeWeight(0);
        }
    }
    this.draw = function() {
        push();
        translate(this.x, this.y);
        this.stem();
        this.petals();
        this.pollen();
        this.leaf();
        pop();

    }
}

function Canyon(x, y, width, aboveWaterGap) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.aboveWaterGap = aboveWaterGap || 32;
    this.waterDepth = height - (this.y + this.aboveWaterGap);
    this.zLength = 25;
    this.groundLipWidth = 6;
    this.groundLipHeight = 15;
    this.groundLipRoundedCornerRadius = 3;
    this.draw = function() {
        fill(213, 196, 161);
        rect(this.x, this.y + 32, this.width, 574);
        // The sky-blue part above the water that is background;
        fill(100, 155, 255);
        rect(this.x, this.y, this.width, 32);
        // The brown 3D part of the right-side of the cliff
        noStroke();
        fill(101, 67, 33); // brown
        rect(this.x + this.width, this.y, this.zLength, this.waterDepth + this.aboveWaterGap, this.groundLipRoundedCornerRadius);
        // blue water pit
        fill(64, 224, 208, 180); // turquoise
        rect(this.x, this.y + this.aboveWaterGap, this.width + this.zLength, this.waterDepth);
        // The right-side rounded edge of the 3D part
        fill(0, 120, 0);
        rect(this.x + this.width - 3, this.y, this.zLength + this.groundLipWidth, this.groundLipHeight, this.groundLipRoundedCornerRadius);
        // The left-side rounded edge of the 3D part
        fill(0, 150, 0);
        rect(this.x - 2, this.y, this.groundLipWidth, this.groundLipHeight, this.groundLipRoundedCornerRadius);
    }
    this.checkContact = function() {
        if ((gameChar_world_x + 10 <= (this.x + this.width)) && (gameChar_world_x - 10 >= this.x) && (gameChar_y === floorPos_y)) {
            isPlummeting = true;
            isLeft = false;
            isRight = false;
        }
    }
}

function drawGameCharShadow() {
    noStroke();
    fill(100, 100, 100, 150);
    if (!isOverCanyon) {
        ellipse(gameChar_x, floorPos_y + 7, 50, 15);
    }
}

function drawCollectable(t_collectable) {
    stroke(80);
    strokeWeight(0.4);
    fill(153, 101, 21);
    beginShape(); // chicken body
    curveVertex(t_collectable.x_pos, t_collectable.y_pos + 20);
    curveVertex(t_collectable.x_pos, t_collectable.y_pos + 20);
    curveVertex(t_collectable.x_pos - 18, t_collectable.y_pos + 20);
    curveVertex(t_collectable.x_pos - 23, t_collectable.y_pos);
    curveVertex(t_collectable.x_pos - 18, t_collectable.y_pos - 10);
    curveVertex(t_collectable.x_pos - 13, t_collectable.y_pos - 15);
    curveVertex(t_collectable.x_pos - 4, t_collectable.y_pos - 20);
    curveVertex(t_collectable.x_pos + 5, t_collectable.y_pos - 19);
    curveVertex(t_collectable.x_pos + 25, t_collectable.y_pos - 10);
    curveVertex(t_collectable.x_pos + 30, t_collectable.y_pos);
    curveVertex(t_collectable.x_pos + 25, t_collectable.y_pos + 20);
    curveVertex(t_collectable.x_pos, t_collectable.y_pos + 20);
    curveVertex(t_collectable.x_pos, t_collectable.y_pos + 20);
    endShape();
    fill(205, 133, 63);
    ellipse(t_collectable.x_pos + 15, t_collectable.y_pos, t_collectable.size * 5 / 9, t_collectable.size * 0.44); // chicken drumstick
    fill(255);
    noStroke();
    quad(t_collectable.x_pos + 25, t_collectable.y_pos - 5, t_collectable.x_pos + 35, t_collectable.y_pos - 15, t_collectable.x_pos + 40, t_collectable.y_pos - 10, t_collectable.x_pos + 25, t_collectable.y_pos + 5); // chicken drumstick bone 1
    ellipse(t_collectable.x_pos + 35, t_collectable.y_pos - 15, t_collectable.size * 0.25, t_collectable.size * 0.25); // chicken drumstick bone 2
    ellipse(t_collectable.x_pos + 40, t_collectable.y_pos - 10, t_collectable.size * 0.25, t_collectable.size * 0.25); // chicken drumstick bone 3
}

function renderFlagpole() {
    push();
    strokeWeight(5);
    stroke(0);
    line(flagpole.x_pos, floorPos_y, flagpole.x_pos, floorPos_y - 250);
    fill(255, 0, 0);
    noStroke();

    if (flagpole.isReached){
        rect(flagpole.x_pos, floorPos_y - 250, 50, 50);
    } else {
        rect(flagpole.x_pos, floorPos_y - 50, 50, 50);
    }
    pop();

}

function checkFlagpole() {
    var d = abs(gameChar_x - flagpole.x_pos);
    if (d < 15) {
        flagpole.isReached = true;
        /*textSize(50);
        fill(255,0,0);
        text("GAME COMPLETE!",width/2, height/2);*/
    }
    
}

function displayLives() {
    textSize(22);
    fill(255, 255, 255);
    text("Lives: " + lives, 30, 60);
}

function checkCollision() {
    for (var i = 0; i < canyons.length; i++) {
        if (gameChar_x > canyons[i].x_pos && gameChar_x < (canyons[i].x_pos + canyons[i].width) && gameChar_y == canyons[i].y_pos) {
            lives - 1;
        }
    }
}

function drawScore() {
    textSize(22);
    fill(255);
    text("Score: " + score, 30, 30);
}
