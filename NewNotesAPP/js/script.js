let palettes = [
    ["#FFFFFF","#EEEEEE","#000000"], // Light Mode
    ["#1C1C1C","#2B2B2B","#9F9F9F"], // Dark Mode
    ["#EFE6D5","#9DBEB7","#E73213"],
    ["#FEF031","#BDE902","#018558"], // Green
    ["#D7EAF3","#77B5D9","#14397D"],
    ["#AA00FF","#13C0DE","#FF7C00"], // TheGrefg
    ["#FDA25F","#D28E75","#C6E4F2"],

    // relleno
    ["#AA00FF","#13C0DE","#FF7C00"], // TheGrefg
    ["#AA00FF","#13C0DE","#FF7C00"], // TheGrefg
    /* TO TEST 
    ["#","#","#"],
    ["#","#","#"],
    ["#","#","#"],
    */
]
let lastSelected = 1;
let cantPostOptions = 3;

function createPost(cant) {
/* CREA UNA cant DE POST DUPLICANDO UNO INVISIBLE Y DEFAULT EN EL DOM */
    for (let i = 0; i < cant; i++) {
        let post = document.getElementById("copyPost");
        let body = document.getElementById("posts");
        let post2 = post.innerHTML;
        let div = document.createElement("div");
        div.classList.add("post");
        div.innerHTML = post2;
        body.appendChild(div);
        
    }
    let post = document.getElementsByClassName("post")
    for (let i = 0; i < post.length; i++) {
        lastSelected = i;
        thisPalette(1)
    }
    for (let i = 0; i < post.length; i++) 
        resetTime(i)

    lastSelected = 0;

    // ESTE CREATE POST TIENE 130 LINEAS MENOS QUE EL OTRO 
    // ADEMAS ES MAS FACIL DE MODIFICAR
}
function createFunc() {
    let cant = prompt("Cuantos posts quieres crear?");
    cant = parseInt(cant);
    console.log(cant)
    if (isNaN(cant)) {
        cant = 0;
    }
    createPost(cant)
}


function addEvents() {
    // AÑADE LOS EVENTOS "onclick" A TODOS LOS ELEMENTOS DE POST QUE LO NECESITEN
    let post = document.getElementsByClassName("post");
    let bt_showHide = document.getElementsByClassName("showHide");
    let btLeft = document.getElementsByClassName("bt_optionsGoLeft");
    let btRight = document.getElementsByClassName("bt_optionsGoRight");
    let changeColor = document.getElementsByClassName("changeColor");
    let removeBT = document.getElementsByClassName("removeBT");
    
    for (let i = 0; i < bt_showHide.length; i++) {
        bt_showHide[i].setAttribute("onclick", "toggleOptions("+i+")");
        btLeft[i].setAttribute("onclick", "opt_GoLeft("+i+")");
        btRight[i].setAttribute("onclick", "opt_GoRight("+i+")");
        changeColor[i].setAttribute("onclick", "alternateLeft()");
        removeBT[i].setAttribute("onclick","removeMe("+i+")");
        post[i].setAttribute("onclick", "select("+i+")");
    }
}

function select(id) {
    lastSelected = id;
}

function alternateLeft() {
    changeColor()

    let leftMenu = document.getElementById("leftMenu");
    let colorDiv = document.getElementsByClassName("colorPaletteDiv");
    let changeColorBt = document.getElementsByClassName("changeColor")

    if (leftMenu.classList.contains("closed")) {
        leftMenu.classList.add("opened");
        leftMenu.classList.remove("closed");

        colorDiv[0].classList.remove("no-visible");
        for (let i = 0; i < changeColorBt.length; i++)
            changeColorBt[i].innerHTML = "Close Palettes";
    } else {
        leftMenu.classList.remove("opened");
        leftMenu.classList.add("closed");
        
        colorDiv[0].classList.add("no-visible");
        for (let i = 0; i < changeColorBt.length; i++)
            changeColorBt[i].innerHTML = "Open Palettes";
    }
}

function changeColor() {
    let colorPaletteDiv = document.getElementsByClassName("colorPaletteDiv");
    let hidePalettes = document.getElementById("hidePalettes");
    if (colorPaletteDiv[0].classList.contains("no-visible")) {
        colorPaletteDiv[0].classList.remove("no-visible");
        //hidePalettes.classList.remove("no-visible");
    }
    else {
        colorPaletteDiv[0].classList.add("no-visible");
        //hidePalettes.classList.add("no-visible");
    }

    let colorPalette = document.getElementsByClassName("colorPalette");
    for (j = 0; j < colorPalette.length; j++) {
        colorPalette[j].setAttribute("onclick", "thisPalette("+j+")");
        colorPalette[j].setAttribute("onmouseout", "resetTime("+j+")");
    }
}

function thisPalette(number) {
    
    let id = lastSelected;
    let post = document.getElementsByClassName("post");
    let post_head = document.getElementsByClassName("post_head");
    let post_content = document.getElementsByClassName("post_content");
    post_content[id].style.transitionDuration = "0s";
    let post_options = document.getElementsByClassName("post_options");
    post_options[id].style.transitionDuration = "0s";
    let showHide = document.getElementsByClassName("showHide");
    showHide[id].style.transitionDuration = "0s";
    post[id].style.backgroundColor = palettes[number][0];
    post_head[id].style.backgroundColor = palettes[number][1];
    post_content[id].style.backgroundColor = palettes[number][1];
    post_options[id].style.backgroundColor = palettes[number][1];
    post[id].style.color = palettes[number][2];
    
}

function resetTime(id) {
    let post_content = document.getElementsByClassName("post_content");
    post_content[id].style.transitionDuration = ".5s";
    let post_options = document.getElementsByClassName("post_options");
    post_options[id].style.transitionDuration = ".5s";
    let showHide = document.getElementsByClassName("showHide");
    showHide[id].style.transitionDuration = ".5s";
}



function toggleOptions(id) {
    let post_options = document.getElementsByClassName("post_options");
    let post_options_content = document.getElementsByClassName("post_options_content");
    let post_content = document.getElementsByClassName("post_content");
    let bt_showHide = document.getElementsByClassName("showHide");
    
    if (post_options[id].classList.contains("showing")) {
        // REMOVE VISIBLE
        post_options[id].classList.remove("showing");
        post_options_content[id].classList.remove("showing");
        post_content[id].classList.remove("small");
        bt_showHide[id].classList.remove("showing");

        post_options[id].classList.add("hide");
        post_options_content[id].classList.add("hide");
        post_content[id].classList.add("big");
        bt_showHide[id].classList.add("hide");
    } else {
        // REMOVE HIDE
        post_options[id].classList.remove("hide");
        post_content[id].classList.remove("big");
        bt_showHide[id].classList.remove("hide");
        
        post_options[id].classList.add("showing");
        post_content[id].classList.add("small");
        bt_showHide[id].classList.add("showing");

        setTimeout(showOptionsContent.bind(null, id), 400)
    }
}

function showOptionsContent(id) {
    let post_options_content = document.getElementsByClassName("post_options_content");
    post_options_content[id].classList.remove("hide");
    post_options_content[id].classList.add("showing");
}

function opt_GoLeft(id) {
    let div = document.getElementsByClassName("post_options_options");
    let btLeft = document.getElementsByClassName("bt_optionsGoLeft");
    let btRight = document.getElementsByClassName("bt_optionsGoRight");
    for (let i = 2; i < cantPostOptions+1; i++) {
        if (div[id].classList.contains("set"+i)) {
            div[id].classList.remove("set"+i);
            div[id].classList.add("set"+(i-1));
            btLeft[id].classList.remove("set"+i);
            btLeft[id].classList.add("set"+(i-1));
            btRight[id].classList.remove("set"+i);
            btRight[id].classList.add("set"+(i-1));
        }
    }
}

function opt_GoRight(id) {
    let div = document.getElementsByClassName("post_options_options");
    let btLeft = document.getElementsByClassName("bt_optionsGoLeft");
    let btRight = document.getElementsByClassName("bt_optionsGoRight");
    for (let i = 1; i < cantPostOptions; i++) {
        if (div[id].classList.contains("set"+i)) {
            div[id].classList.remove("set"+i);
            div[id].classList.add("set"+(i+1));
            btLeft[id].classList.remove("set"+i);
            btLeft[id].classList.add("set"+(i+1));
            btRight[id].classList.remove("set"+i);
            btRight[id].classList.add("set"+(i+1));
            break;
        }
    }
}



function checkInput() {
    let header = document.getElementsByClassName("post_header");
    let input = document.getElementById("searchBar");
    let post = document.getElementsByClassName("post");

    for (let i = 0; i < header.length; i++) {
        let check1 = header[i].value.toLowerCase();
        let check2 = input.value.toLowerCase();

        if (check1.includes(check2)) {
            post[i].classList.remove("no-visible");
        } else {
            post[i].classList.add("no-visible");
        }
    }
}

function removeMe(id) {
    let post = document.getElementsByClassName("post");
    post[id].remove();
    addEvents();
}

function options() {
    let optionsMenu = document.getElementById("optionsMenu");
    if (optionsMenu.classList.contains("no-visible")) {
        optionsMenu.classList.remove("no-visible");
    } else {
        optionsMenu.classList.add("no-visible");
    }
}

function setGridSize() {
    let inputs = document.getElementsByClassName("gridSizeInput");
    let width = inputs[1].value;
    let height = inputs[0].value;
    console.log(width)
    if (width >= 3 && width <= 6 && height >= 1 && height <= 3) {
        let posts = document.getElementById("posts");
        posts.setAttribute("class", "");
        posts.classList.add("w"+width);
        posts.classList.add("h"+height);
    } else {
        alert("Los valores maximos son: (3-6) y (1-3)")
    }
}

// FUNCION AL CARGAR LA VENTANA
function setPaletteColors() {
    // GENERATE AND SETS THE COLOR OF THE PALETTE VIEW
    let duplicate = document.getElementById("copyPalette");
    for (let i = 0; i < palettes.length; i++) {
        let div = document.createElement("div");
        div.classList.add("colorPalette");
        div.innerHTML = duplicate.innerHTML;
        let colorPaletteDiv = document.getElementById("hidePalettes");
        colorPaletteDiv.appendChild(div);
    }

    let color = document.getElementsByClassName("color");
    let number = 0;
    for (let i = 3; i < color.length; i++) {
        for (let j = 0; j < palettes[number].length; j++) {
            color[i].style.backgroundColor = palettes[number][j];
            if (j != 2) i++;
        }
        number++;
    }
}
window.onload = function(ev) {
    createPost(18);
    addEvents();
    setPaletteColors();
}