var editModeActive = false;
var removeActive = false;

function editMode() {

  let post = document.getElementsByClassName("post");
  let head = document.getElementsByClassName("post_head");
  let post_content = document.getElementsByClassName("post_content");
  let buttons = document.getElementsByClassName("bt_edit");
  let editButton = document.getElementById("bt_editMode");
  if (!removeActive && post.length >= 1) {
    if (editModeActive) {
      editModeActive = false;
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.add("no-visible");
        post[i].removeAttribute("onclick");
        buttons[i].removeAttribute("disabled");
        post[i].classList.remove("unselected");
        head[i].setAttribute("class", "post_head");
        post_content[i].setAttribute("class", "post_content");
        disableEdit(i+1)
      }
      let img = document.createElement("img");
      img.setAttribute("src", "src/img/edit.png");
      img.setAttribute("width", "20px");
      img.setAttribute("height", "20px")
      editButton.innerHTML = "";
      editButton.appendChild(img);
    } else {
      editModeActive = true;
      addEditEvents();
      enableEdit(0);
      let img = document.createElement("img");
      img.setAttribute("src", "src/img/greenEdit.png");
      img.setAttribute("width", "20px");
      img.setAttribute("height", "20px")
      editButton.innerHTML = "";
      editButton.appendChild(img);
    }
  }
}

function addEditEvents() {
  let post = document.getElementsByClassName("post");
  let buttons = document.getElementsByClassName("bt_edit");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("no-visible");
    post[i].setAttribute("onclick", "enableEdit("+i+")");
  }
}

function enableEdit(id) {
  let post = document.getElementsByClassName("post");
  let buttons = document.getElementsByClassName("bt_edit");
  let head = document.getElementsByClassName("post_head");
  let post_content = document.getElementsByClassName("post_content");
  let headers = document.getElementsByClassName("post_header");
  let text = document.getElementsByClassName("post_text");
  let addSize = document.getElementsByClassName("addSize");
  addEditEvents();
  for (let i = 1; i <= post.length; i++){
    disableEdit(i)
    if (i-1 != id) {
      buttons[i-1].setAttribute("disabled","");
      post[i-1].classList.add("unselected");
      head[i-1].setAttribute("class", "post_head unselected");
      post_content[i-1].setAttribute("class", "post_content unselected");
    }
  }

  post[id].setAttribute("id", "resizable");
  post[id].removeAttribute("onclick");
  let headers_value = headers[id].innerHTML;
  let text_value = text[id].innerHTML;
  headers[id].remove();
  text[id].remove();
  delete headers;
  delete text;
  let headers_input = document.createElement("input");
  headers_input.value = headers_value;
  headers_input.setAttribute("class", "post_header");
  let text_input = document.createElement("textarea");
  text_input.innerHTML = text_value;
  text_input.setAttribute("class", "post_text");
  head[id].appendChild(headers_input);
  post_content[id].appendChild(text_input);
  addSize[id].classList.remove("no-visible");
  checkSize(id+1);
}

function disableEdit(i) {
  let post = document.getElementsByClassName("post");
  let buttons = document.getElementsByClassName("bt_edit");
  let head = document.getElementsByClassName("post_head");
  let post_content = document.getElementsByClassName("post_content");
  let headers = document.getElementsByClassName("post_header");
  let text = document.getElementsByClassName("post_text");
  let addSize = document.getElementsByClassName("addSize");
  let options = document.getElementsByClassName("noteOptions");
  buttons[i-1].removeAttribute("disabled");
  post[i-1].classList.remove("unselected");
  head[i-1].setAttribute("class", "post_head");
  post_content[i-1].setAttribute("class", "post_content");

  if (post[i-1].id == "resizable") {
    post[i-1].removeAttribute("id");
    let headers_value = headers[i-1].value;
    let text_value = text[i-1].value;
    headers[i-1].remove();
    text[i-1].remove();
    delete headers;
    delete text;
    let headers_text = document.createElement("h2");
    headers_text.innerHTML = headers_value;
    headers_text.setAttribute("class", "post_header");
    let post_text = document.createElement("pre");
    post_text.innerHTML = text_value;
    post_text.setAttribute("class", "post_text");
    head[i-1].appendChild(headers_text);
    post_content[i-1].appendChild(post_text);
    addSize[i-1].classList.add("no-visible");
    options[i-1].classList.add("no-visible");
    checkSize(i);
  }
}

function enableOptions(id) {
  id = id-1;
  let options = document.getElementsByClassName("noteOptions");
  if (options[id].classList.contains("no-visible")) {
    options[id].classList.remove("no-visible");
    checkColor(id);
  }
  else
    options[id].classList.add("no-visible");
}

function checkColor(id) {
  let post = document.getElementsByClassName("post");
  let post_head = document.getElementsByClassName("post_head");
  let colorInput = document.getElementsByClassName("colorInput");
  let leftBT = document.getElementsByClassName("colorSelectLeftBT");

  if (leftBT[id].id == "colorSelectLeftBT1") {
    let hexa = getHEX(post[id].style.backgroundColor);
    colorInput[id].value = hexa;
  } else if (leftBT[id].id == "colorSelectLeftBT2") {
    let hexa = getHEX(post_head[id].style.backgroundColor);
    colorInput[id].value = hexa;
  } else {
    let hexa = getHEX(post_head[id].style.color);
    colorInput[id].value = hexa;
  }
}

function changeBack(id) {
  let post = document.getElementsByClassName("post");
  let colorInput = document.getElementsByClassName("colorInput");
  post[id-1].style.backgroundColor = colorInput[id-1].value;
}

function changeTextBack(id) {
  let post_head = document.getElementsByClassName("post_head");
  let post_header = document.getElementsByClassName("post_header");
  let post_content = document.getElementsByClassName("post_content");
  let post_text = document.getElementsByClassName("post_text");
  let colorInput = document.getElementsByClassName("colorInput");

  post_head[id-1].style.backgroundColor = colorInput[id-1].value;
  post_header[id-1].style.backgroundColor = colorInput[id-1].value;
  post_content[id-1].style.backgroundColor = colorInput[id-1].value;
  post_text[id-1].style.backgroundColor = colorInput[id-1].value;
}

function changeTextColor(id) {
  let post_head = document.getElementsByClassName("post_head");
  let post_header = document.getElementsByClassName("post_header");
  let post_content = document.getElementsByClassName("post_content");
  let post_text = document.getElementsByClassName("post_text");
  let colorInput = document.getElementsByClassName("colorInput");

  post_head[id-1].style.color = colorInput[id-1].value;
  post_header[id-1].style.color = colorInput[id-1].value;
  post_content[id-1].style.color = colorInput[id-1].value;
  post_text[id-1].style.color = colorInput[id-1].value;
}

function selectColorToRight(id) {
  id = id-1;
  let colorSelectShow = document.getElementsByClassName("colorSelectShow");
  let leftBT = document.getElementsByClassName("colorSelectLeftBT");
  let rightBT = document.getElementsByClassName("colorSelectRightBT");
  let colorInput = document.getElementsByClassName("colorInput");
  
  for (let i = 1; i <= 2; i++) {
    if (colorSelectShow[id].classList.contains("colorSelectShow"+i)) {
      colorSelectShow[id].classList.remove("colorSelectShow"+i);
      colorSelectShow[id].classList.add("colorSelectShow"+(i+1));

      switch (i+1) {
        case 2: {
          colorSelectShow[id].innerHTML = "Text Background";
          colorInput[id].setAttribute("oninput", "changeTextBack("+(id+1)+")");
          let post_head = document.getElementsByClassName("post_head");
          let hexa = getHEX(post_head[id].style.backgroundColor);
          colorInput[id].value = hexa;
          break;
        }
        case 3: {
          colorSelectShow[id].innerHTML = "Text Color";
          colorInput[id].setAttribute("oninput", "changeTextColor("+(id+1)+")");
          let post_head = document.getElementsByClassName("post_head");
          let hexa = getHEX(post_head[id].style.color);
          colorInput[id].value = hexa;
          break;
        }
      }

      leftBT[id].setAttribute("id","colorSelectLeftBT"+(i+1));
      rightBT[id].setAttribute("id","colorSelectRightBT"+(i+1));
      break;
    }
  }
}

function selectColorToLeft(id) {
  id = id-1;
  let colorSelectShow = document.getElementsByClassName("colorSelectShow");
  let leftBT = document.getElementsByClassName("colorSelectLeftBT");
  let rightBT = document.getElementsByClassName("colorSelectRightBT");
  let colorInput = document.getElementsByClassName("colorInput");

  for (let i = 2; i <= 3; i++) {
    if (colorSelectShow[id].classList.contains("colorSelectShow"+i)) {
      colorSelectShow[id].classList.remove("colorSelectShow"+i);
      colorSelectShow[id].classList.add("colorSelectShow"+(i-1));

      switch (i-1) {
        case 1: {
          colorSelectShow[id].innerHTML = "Post Background";
          colorInput[id].setAttribute("oninput", "changeBack("+(id+1)+")");
          let post = document.getElementsByClassName("post");
          let hexa = getHEX(post[id].style.backgroundColor);
          colorInput[id].value = hexa;
          delete post;
          break;
        }
        case 2: {
          colorSelectShow[id].innerHTML = "Text Background";
          colorInput[id].setAttribute("oninput", "changeTextBack("+(id+1)+")")
          let post_head = document.getElementsByClassName("post_head");
          let hexa = getHEX(post_head[id].style.backgroundColor);
          colorInput[id].value = hexa;
          break;
        }
      }

      leftBT[id].setAttribute("id","colorSelectLeftBT"+(i-1));
      rightBT[id].setAttribute("id","colorSelectRightBT"+(i-1));
      break;
    }
  }
}
/*
function HEXtoRGB(hex) {
  var red = parseInt(hex[1]+hex[2],16);
  var green = parseInt(hex[3]+hex[4],16);
  var blue = parseInt(hex[5]+hex[6],16);
}*/

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getRGBValues(str) {
  var vals = str.substring(str.indexOf('(') +1, str.length -1).split(', ');
  return {
    'r': vals[0],
    'g': vals[1],
    'b': vals[2]
  };
}

function getHEX(str) {
  let rgb_values = getRGBValues(str);
  rgb_values["r"] = parseInt(rgb_values["r"]);
  rgb_values["g"] = parseInt(rgb_values["g"]);
  rgb_values["b"] = parseInt(rgb_values["b"]);
  let hexa = rgbToHex(rgb_values["r"], rgb_values["g"], rgb_values["b"]);
  return hexa
}

function removePost() {
  var buttons = document.getElementsByClassName("bt_edit");
  var button = document.getElementById("bt_bin");
  if (!editModeActive && buttons.length >= 1 || removeActive) {
    if (removeActive) {
      removeActive = false;
      for (let i = 1; i <= buttons.length; i++) {
        if (buttons.length >= 1) {
          let img = document.createElement("img");
          img.setAttribute("width", "25px");
          img.setAttribute("height", "25px");
          buttons[i-1].innerHTML = "";
          img.setAttribute("src", "src/img/postOptions.png");
          buttons[i-1].appendChild(img);
        }
        buttons[i-1].classList.add("no-visible");
        buttons[i-1].classList.remove("resetRotation");
      }
      button.innerHTML = "";
      let img2 = document.createElement("img");
      img2.setAttribute("width", "20px");
      img2.setAttribute("height", "20px");
      img2.setAttribute("src", "src/img/bin.png");
      button.appendChild(img2);
      addEvents();
    } else {
      removeActive = true;
      for (let i = 1; i <= buttons.length; i++) {
        if (buttons.length >= 1) {
          let img = document.createElement("img");
          img.setAttribute("width", "25px");
          img.setAttribute("height", "25px");
          buttons[i-1].innerHTML = "";
          
          img.setAttribute("src", "src/img/redbin.png");
          buttons[i-1].setAttribute("onclick", "removeSelf("+(i-1)+")");
          buttons[i-1].appendChild(img);
        }
        button.innerHTML = "";
        let img2 = document.createElement("img");
        img2.setAttribute("width", "20px");
        img2.setAttribute("height", "20px");
        img2.setAttribute("src", "src/img/redbin.png");
        buttons[i-1].classList.remove("no-visible");
        buttons[i-1].classList.add("resetRotation");
        button.appendChild(img2);
      }
    }
  }
}

function removeSelf(cont) {
  let post = document.getElementsByClassName("post");
  post[cont].remove();
  var buttons = document.getElementsByClassName("bt_edit");
  if (post.length == 0)
    removePost()
  for (let i = 1; i <= buttons.length; i++) {
    buttons[i-1].setAttribute("onclick", "removeSelf("+(i-1)+")");
  } 
}

// PUTS THE SIZE OF ELEMENT TO THE PROPER WAY
function checkSize(id) {
  let post = document.getElementsByClassName("post");
  let post_head = document.getElementsByClassName("post_head");
  let post_header = document.getElementsByClassName("post_header");
  let post_content = document.getElementsByClassName("post_content");
  let post_text = document.getElementsByClassName("post_text");

  let width = post[id-1].clientWidth;
  let height = post[id-1].clientHeight;
  post_head[id-1].style.width = (width-20) + "px";
  post_header[id-1].style.width = (post_head[id-1].clientWidth-90) + "px";
  post_content[id-1].style.width = (width-40) + "px";
  post_content[id-1].style.height = (height-120) + "px";
  post_text[id-1].style.width = (post_content[id-1].clientWidth-25) + "px";
  post_text[id-1].style.maxWidth = (post_content[id-1].clientWidth-25) + "px";
  post_text[id-1].style.height = (post_content[id-1].clientHeight-25) + "px";
  post_text[id-1].style.maxHeight = (post_content[id-1].clientHeight-25) + "px";
}

function addWidth(id) {
  id = id-1
  let post = document.getElementsByClassName("post");
  let bt_addWidth = document.getElementsByClassName("bt_addWidth");
  let bt_addHeight = document.getElementsByClassName("bt_addHeight");
  for (let i = 1; i <= 5; i++) {
    let checkClass = "hor"+i;
    let nextClass = "hor"+(i+1);
    if (post[id].classList.contains(checkClass)) {
      setSizeClass(checkClass, nextClass, post, bt_addWidth, bt_addHeight, id);
      break;
    }
  }
  addAutoSize();
}

function addHeight(id) {
  id = id-1;
  let post = document.getElementsByClassName("post");
  let bt_addWidth = document.getElementsByClassName("bt_addWidth");
  let bt_addHeight = document.getElementsByClassName("bt_addHeight");
  for (let i = 1; i <= 2; i++) {
    let checkClass = "ver"+i;
    let nextClass = "ver"+(i+1);
    if (post[id].classList.contains(checkClass)) {
      setSizeClass(checkClass, nextClass, post, bt_addWidth, bt_addHeight, id);
      break;
    }
  }
  addAutoSize();
}

function removeWidth(id) {
  id = id-1;
  let post = document.getElementsByClassName("post");
  let bt_addWidth = document.getElementsByClassName("bt_addWidth");
  let bt_addHeight = document.getElementsByClassName("bt_addHeight");
  for (let i = 2; i <= 6; i++) {
    let checkClass = "hor"+i;
    let nextClass = "hor"+(i-1);
    if (post[id].classList.contains(checkClass)) {
      setSizeClass(checkClass, nextClass, post, bt_addWidth, bt_addHeight, id);
      break;
    }
  }
  addAutoSize();
}

function removeHeight(id) {
  id = id-1;
  let post = document.getElementsByClassName("post");
  let bt_addWidth = document.getElementsByClassName("bt_addWidth");
  let bt_addHeight = document.getElementsByClassName("bt_addHeight");
  for (let i = 2; i <= 3; i++) {
    let checkClass = "ver"+i;
    let nextClass = "ver"+(i-1);
    if (post[id].classList.contains(checkClass)) {
      setSizeClass(checkClass, nextClass, post, bt_addWidth, bt_addHeight, id);
      break;
    }
  }
}

function addAutoSize() {
  let post = document.getElementsByClassName("post");
  let bt_addWidth = document.getElementsByClassName("bt_addWidth");
  let bt_addHeight = document.getElementsByClassName("bt_addHeight");
  for (let i = 0; i < post.length; i++) {
    if (i != post.length-1) {
      if (post[i].offsetTop == post[i+1].offsetTop) {
        if (post[i].clientHeight < post[i+1].clientHeight) {
          for (let j = 2; j <= 3; j++) {
            let nextClass = "ver"+j;
            if (post[i+1].classList.contains(nextClass)) {
              setSizeClass(("ver"+(j-1)), nextClass, post, bt_addHeight, bt_addWidth, i);
              addAutoSize()
            }
          }
        }
      }
    }
  }
}

function setSizeClass(checkClass, nextClass, post, bt_addHeight, bt_addWidth, id) {
  post[id].classList.remove(checkClass);
  post[id].classList.add(nextClass);
  bt_addHeight[id].classList.remove(checkClass);
  bt_addHeight[id].classList.add(nextClass);
  bt_addWidth[id].classList.remove(checkClass);
  bt_addWidth[id].classList.add(nextClass);
  let bt_removeWidth = document.getElementsByClassName("bt_removeWidth");
  let bt_removeHeight = document.getElementsByClassName("bt_removeHeight");
  bt_removeHeight[id].classList.remove(checkClass);
  bt_removeHeight[id].classList.add(nextClass);
  bt_removeWidth[id].classList.remove(checkClass);
  bt_removeWidth[id].classList.add(nextClass);
  checkSize(id+1)
}


// ADD ALL THE ONCLICK EVENTS TO POSTS
function addEvents() {
  let post = document.getElementsByClassName("post");
  let button = document.getElementsByClassName("bt_edit");
  let bt_addHeight = document.getElementsByClassName("bt_addHeight");
  let bt_addWidth = document.getElementsByClassName("bt_addWidth");
  let bt_removeWidth = document.getElementsByClassName("bt_removeWidth");
  let bt_removeHeight = document.getElementsByClassName("bt_removeHeight");
  let colorInput = document.getElementsByClassName("colorInput");
  let leftBT = document.getElementsByClassName("colorSelectLeftBT");
  let rightBT = document.getElementsByClassName("colorSelectRightBT");

  for (let i = 1; i <= post.length; i++){
    post[i-1].removeAttribute("onclick");
    post[i-1].removeAttribute("onpointermove");
    button[i-1].removeAttribute("onclick");
    bt_addWidth[i-1].removeAttribute("onclick");
    bt_addHeight[i-1].removeAttribute("onclick");
    bt_removeWidth[i-1].removeAttribute("onclick");
    bt_removeHeight[i-1].removeAttribute("onclick");
    colorInput[i-1].removeAttribute("oninput");
    leftBT[i-1].removeAttribute("onclick");
    rightBT[i-1].removeAttribute("onclick");
  }

  for (let i = 1; i <= post.length; i++){
    post[i-1].setAttribute("onclick", "checkSize("+i+")");
    post[i-1].setAttribute("onpointermove", "checkSize("+i+")");
    button[i-1].setAttribute("onclick", "enableOptions("+i+")");
    bt_addWidth[i-1].setAttribute("onclick","addWidth("+i+")");
    bt_addHeight[i-1].setAttribute("onclick","addHeight("+i+")");
    bt_removeWidth[i-1].setAttribute("onclick","removeWidth("+i+")");
    bt_removeHeight[i-1].setAttribute("onclick","removeHeight("+i+")");
    colorInput[i-1].setAttribute("oninput", "changeBack("+i+")");
    leftBT[i-1].setAttribute("onclick", "selectColorToLeft("+i+")");
    rightBT[i-1].setAttribute("onclick", "selectColorToRight("+i+")");
  }
}


// CREATE POST
function createMultiplePost() {
  let amount = prompt("How many posts do you want? (default 1)");
  if (amount == "") {
    amount = 1;
  }
  if (!isNaN(amount)) {
    for (let i = 0; i < amount; i++) {
      createPost();
    }
  } else {
    alert("Must be a valid number!");
  }
}

function createPost() {
  if (!removeActive && !editModeActive) {
    let posts = document.getElementById("posts");

    /* Main Div*/
    let post = document.createElement("div");
    post.setAttribute("class", "post hor1 ver1");

    /* Post header*/
    let post_head = document.createElement("div");
    post_head.setAttribute("class", "post_head");
    
    let post_header = document.createElement("h2");
    post_header.innerHTML = "Texto Aqui";
    post_header.setAttribute("class", "post_header");
    let bt_edit = document.createElement("button");
    bt_edit.setAttribute("class","bt_edit no-visible");
    let img = document.createElement("img");
    img.setAttribute("width", "25px");
    img.setAttribute("src", "src/img/postOptions.png");
    bt_edit.appendChild(img);
    let noteOptions = document.createElement("div");
    noteOptions.classList.add("noteOptions");
    noteOptions.classList.add("no-visible");
    let changeColorDiv = document.createElement("div");
    changeColorDiv.classList.add("noteSubOptions");
    changeColorDiv.classList.add("sub2");
    changeColorDiv.classList.add("changeColorDiv");
    let colorInput = document.createElement("input");
    colorInput.setAttribute("type", "color");
    colorInput.classList.add("colorInput");
    colorInput.value = "#ffffff";
    let colorSelectShow = document.createElement("p");
    colorSelectShow.classList.add("colorSelectShow");
    colorSelectShow.classList.add("colorSelectShow1");
    
    colorSelectShow.innerHTML = "Post Background";
    //colorSelectShow.innerHTML = "Text Background";
    //colorSelectShow.innerHTML = "Text Color";
    let colorSelectLeftBT = document.createElement("button");
    colorSelectLeftBT.setAttribute("id", "colorSelectLeftBT1");
    colorSelectLeftBT.classList.add("colorSelectBT");
    colorSelectLeftBT.classList.add("colorSelectLeftBT");
    let leftImg = document.createElement("img");
    leftImg.setAttribute("src", "src/img/left-right.png");
    leftImg.setAttribute("width", "20px");
    colorSelectLeftBT.appendChild(leftImg);
    let colorSelectRightBT = document.createElement("button");
    colorSelectRightBT.setAttribute("id", "colorSelectRightBT1");
    colorSelectRightBT.classList.add("colorSelectBT");
    colorSelectRightBT.classList.add("colorSelectRightBT");
    let rightImg = document.createElement("img");
    rightImg.setAttribute("src", "src/img/left-right.png");
    rightImg.setAttribute("width", "20px");
    colorSelectRightBT.appendChild(rightImg);


    changeColorDiv.appendChild(colorInput);
    changeColorDiv.appendChild(colorSelectShow);
    changeColorDiv.appendChild(colorSelectLeftBT);
    changeColorDiv.appendChild(colorSelectRightBT);
    noteOptions.appendChild(changeColorDiv);
    let changeGroupDiv = document.createElement("div");
    changeGroupDiv.classList.add("noteSubOptions");
    changeGroupDiv.classList.add("changeGroupDiv");
    let buttonGroup = document.createElement("button");
    buttonGroup.setAttribute("id", "changeGroup");
    buttonGroup.innerHTML = "Change Group";
    changeGroupDiv.appendChild(buttonGroup);
    noteOptions.appendChild(changeGroupDiv);
    post_head.appendChild(post_header);
    post_head.appendChild(bt_edit);
    post_head.appendChild(noteOptions);


    /* Post content*/
    post.appendChild(post_head);
    let post_content = document.createElement("div");
    post_content.setAttribute("class","post_content");
    let pre = document.createElement("pre");
    pre.setAttribute("class", "post_text");
    pre.innerHTML = "text example";
    post_content.appendChild(pre);
    post.appendChild(post_content);


    /* ChangeSize Div*/
    let addSize = document.createElement("div");
    addSize.setAttribute("class", "addSize no-visible");
    let bt_addWidth = document.createElement("button");
    bt_addWidth.classList.add("bt_addWidth");
    bt_addWidth.classList.add("hor1");
    bt_addWidth.classList.add("ver1");
    let img_addWidth = document.createElement("img");
    img_addWidth.setAttribute("width", "25px");
    img_addWidth.setAttribute("src", "src/img/create.png");
    bt_addWidth.appendChild(img_addWidth);
    let bt_addHeight = document.createElement("button");
    bt_addHeight.classList.add("bt_addHeight");
    bt_addHeight.classList.add("hor1");
    bt_addHeight.classList.add("ver1");
    let img_addHeight = document.createElement("img");
    img_addHeight.setAttribute("width", "25px");
    img_addHeight.setAttribute("src", "src/img/create.png");
    bt_addHeight.appendChild(img_addHeight);
    let bt_removeWidth = document.createElement("button");
    bt_removeWidth.classList.add("bt_removeWidth");
    bt_removeWidth.classList.add("hor1");
    bt_removeWidth.classList.add("ver1");
    let img_removeWidth = document.createElement("img");
    img_removeWidth.setAttribute("width", "25px");
    img_removeWidth.setAttribute("src", "src/img/remove.png");
    bt_removeWidth.appendChild(img_removeWidth);
    let bt_removeHeight = document.createElement("button");
    bt_removeHeight.classList.add("bt_removeHeight");
    bt_removeHeight.classList.add("hor1");
    bt_removeHeight.classList.add("ver1");
    let img_removeHeight = document.createElement("img");
    img_removeHeight.setAttribute("width", "25px");
    img_removeHeight.setAttribute("src", "src/img/remove.png");
    bt_removeHeight.appendChild(img_removeHeight);
    addSize.appendChild(bt_addWidth);
    addSize.appendChild(bt_addHeight);
    addSize.appendChild(bt_removeWidth);
    addSize.appendChild(bt_removeHeight);
    post.appendChild(addSize);

    /* ADD TO DOM*/
    posts.appendChild(post);
    addEvents();
    delete posts;
    delete post;
    delete post_head;
    delete post_header;
    delete bt_edit;
    delete img;
    delete noteOptions;
    delete changeColorDiv;
    delete colorInput;
    delete changeGroupDiv;
    delete buttonGroup;
    delete post_content;
    delete pre;
    delete addSize;
    delete bt_addWidth;
    delete img_addWidth;
    delete bt_addHeight;
    delete img_addHeight;
    delete bt_removeWidth;
    delete img_removeWidth;
    delete bt_removeHeight;
    delete img_removeHeight;
  }
}


/* SAVE AND IMPORT FUNCTIONS */
function saveAll() {
  let post = document.getElementById("posts");
  let text = btoa(post.innerHTML);
  var blob = new Blob([text], {type:"text/plain"});
  var fileLink = document.createElement("a");
  fileLink.download = "saveFile.txt";
  fileLink.href = window.URL.createObjectURL(blob);
  document.body.appendChild(fileLink);
  fileLink.click();
  fileLink.remove();
}

function importSave() {
  let input = document.createElement('input');
  input.type = 'file';
  input.setAttribute("id", "fileInput");
  input.click();
  input.addEventListener("change", function () {
    if (this.files && this.files[0]) {
      var myFile = this.files[0];
      var reader = new FileReader();
      reader.addEventListener('load', function (e) {
        if (confirm('Esta seguro que desea subir este archivo? Todos los datos actuales serán perdidos.')) {
          let post = document.getElementById("posts");
          let result = atob(e.target.result);
          post.innerHTML = result;
        }
      });
      reader.readAsBinaryString(myFile);
    }
  });
}


// THIS WILL EXECUTE WHEN THE WINDOW LOAD
function loader() {
  createPost();
}
window.onload = loader();
