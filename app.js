// Create a box
function createBoxes() {
    let boxes = "";
    let no = 100, inc = -1;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            y = i * 50;
            x = j * 50;
            const id = "b_" + no;
            const imageSrc = no === 100 ? "img/crown1.png" : " ";
            boxes += ` <div class="box" id="${id}" style="margin: ${y}px ${x}px;">
            <img src="${imageSrc}" alt="" style="width:50px; height: 50px; object-fit:contain;" />
            </div>`;
            no += inc;

        }
        if (i % 2 == 0) {
            no -= 9;
        } else {
            no -= 11;
        }
        inc = -inc;

    }
    document.querySelector(".board").innerHTML = boxes;
}

// Setting the box using the input ID and setting the background 
function setbox(id) {
    const boxElement = document.getElementById(id);
    const smileyElement = document.createElement("div");
    smileyElement.classList.add('smiley');
    smileyElement.style.backgroundImage = `url("img/chess1.png")`;
    boxElement.innerHTML = "";
    boxElement.appendChild(smileyElement);

};

// Clear the content inside the square
function removebox(id) {
    document.getElementById(id).innerHTML = ``;
};

createBoxes();

// Player position
let pos = 0;


// Player movement function

function playerMover(move) {

    if (move > 0) {
        setTimeout(() => {
            if (pos >= 1) {
                removebox("b_" + pos);
            }

            pos++;
            setbox("b_" + pos, "red");
            move--;

            if (pos === 100) {
                setTimeout(() => {
                    alert("Congratulations!!! you win");
                    pos = 0;
                    createBoxes();
                    document.querySelector("#rtbtn").style.display = "block";
                }, 10);

                    document.querySelector("#rtbtn").style.display = "none";
                return;
            }

            playerMover(move);
            if (move == 0) {
                check(ladders);
                check(snakes);
                document.querySelector("#rtbtn").style.display = "block";
            }

        }, 1000);
    }
};


// Snake and ladder position
let ladders = [
    [1, 38],
    [4, 14],
    [8, 30],
    [21, 42],
    [28, 76],
    [50, 67],
    [71, 92],
    [80, 99]
];
let snakes = [
    [32, 10],
    [36, 6],
    [48, 26],
    [62, 18],
    [88, 24],
    [95, 56],
    [97, 78]

];




// Dice roll function
function rotateDice() {
    document.querySelector("#rtbtn").style.display = "none";
    document.querySelector(".dice").classList.add("anm");
    dice_value = parseInt(Math.random() * 6) + 1;
    // dice_value = 4;

    LIST = [[0, 0, 0], [-90, 0, 0], [0, 90, 0], [0, -90, 0], [90, 0, 0], [180, 0, 0]];

    x = LIST[dice_value - 1][0];
    y = LIST[dice_value - 1][1];
    z = LIST[dice_value - 1][2];

    setTimeout(() => {
        document.querySelector(".dice").classList.remove("anm");
        document.querySelector(".dice").style.transform = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(${z}deg)`;
        playerMover(dice_value);

    }, 3000);
};

// The function of checking the existence of a ladder
function check_ladders() {
    for (let i = 0; i < ladders.length; i++) {
        if (ladders[i][0] == pos) {
            setTimeout(() => {
                console.log("Matched", pos);
                if (pos >= 1) {
                    removebox("b_" + pos);
                }
                pos = ladders[i][1];
                setbox("b_" + pos, "red");

            }, 3000);
        }

    }
};

// The function of checking the existence of a snake
function check(data) {
    for (let i = 0; i < data.length; i++) {
        if (data[i][0] == pos) {
            setTimeout(() => {

                if (pos >= 1) {
                    removebox("b_" + pos);
                }
                pos = data[i][1];
                setbox("b_" + pos, "red");

            }, 1000);
        }

    }
};




