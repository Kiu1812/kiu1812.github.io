var editActive = false;
var resizing = false;
var removeActive = false;

// ACTIVATE OR DEACTIVATE THE EDIT MODE OF "thisArg" POST
function edit(thisArg) {
  var post = document.getElementsByClassName("post");
  var head = document.getElementsByClassName("post_head");
  var headers = document.getElementsByClassName("post_header");
  var post_content = document.getElementsByClassName("post_content");
  var text = document.getElementsByClassName("post_text");
  var buttons = document.getElementsByClassName("bt_edit");
  let addSize = document.getElementsByClassName("addSize");
  if (editActive) {
    editActive = false;
    for (let i = 1; i <= post.length; i++){
      if (i != thisArg) {
        buttons[i-1].removeAttribute("disabled");
        post[i-1].classList.remove("unselected");
        head[i-1].setAttribute("class", "post_head");
        post_content[i-1].setAttribute("class", "post_content");
      }
    }
    post[thisArg-1].removeAttribute("id");
    let headers_value = headers[thisArg-1].value;
    let text_value = text[thisArg-1].value;
    headers[thisArg-1].remove();
    text[thisArg-1].remove();
    delete headers;
    delete text;
    let headers_text = document.createElement("h2");
    headers_text.innerHTML = headers_value;
    headers_text.setAttribute("class", "post_header");
    let post_text = document.createElement("pre");
    post_text.innerHTML = text_value;
    post_text.setAttribute("class", "post_text");
    head[thisArg-1].appendChild(headers_text);
    post_content[thisArg-1].appendChild(post_text);
    addSize[thisArg-1].classList.add("no-visible");
    checkSize(thisArg);
  } else {
    editActive = true;
    for (let i = 1; i <= post.length; i++){
      if (i != thisArg) {
        buttons[i-1].setAttribute("disabled","");
        post[i-1].classList.add("unselected");
        head[i-1].setAttribute("class", "post_head unselected");
        post_content[i-1].setAttribute("class", "post_content unselected");
      }
    }
    post[thisArg-1].setAttribute("id", "resizable");
    let headers_value = headers[thisArg-1].innerHTML;
    let text_value = text[thisArg-1].innerHTML;
    headers[thisArg-1].remove();
    text[thisArg-1].remove();
    delete headers;
    delete text;
    let headers_input = document.createElement("input");
    headers_input.value = headers_value;
    headers_input.setAttribute("class", "post_header");
    let text_input = document.createElement("textarea");
    text_input.innerHTML = text_value;
    text_input.setAttribute("class", "post_text");
    head[thisArg-1].appendChild(headers_input);
    post_content[thisArg-1].appendChild(text_input);
    addSize[thisArg-1].classList.remove("no-visible");
  }
}

function removePost() {
  var buttons = document.getElementsByClassName("bt_edit");
  var button = document.getElementById("bt_bin");
  if (!editActive) {
    if (removeActive) {
      removeActive = false;
      for (let i = 1; i <= buttons.length; i++) {
        if (buttons.length >= 1) {
          let img = document.createElement("img");
          img.setAttribute("width", "25px");
          img.setAttribute("height", "25px");
          buttons[i-1].innerHTML = "";
          img.setAttribute("src", "src/img/edit.png");
          buttons[i-1].appendChild(img);
        }
        
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
        button.appendChild(img2);
      }
    }
  }
}

function removeSelf(cont) {
  let post = document.getElementsByClassName("post");
  post[cont].remove();
  var buttons = document.getElementsByClassName("bt_edit");
  for (let i = 1; i <= buttons.length; i++) {
    buttons[i-1].setAttribute("onclick", "removeSelf("+(i-1)+")");
  } 
}

// PUTS THE SIZE OF ALL THE ELEMENTS TO THE PROPER WAY WHEN RESIZING
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

  for (let i = 1; i <= post.length; i++){
    post[i-1].removeAttribute("onclick");
    post[i-1].removeAttribute("onpointermove");
    button[i-1].removeAttribute("onclick");
    bt_addWidth[i-1].removeAttribute("onclick");
    bt_addHeight[i-1].removeAttribute("onclick");
    bt_removeWidth[i-1].removeAttribute("onclick");
    bt_removeHeight[i-1].removeAttribute("onclick");
  }

  for (let i = 1; i <= post.length; i++){
    post[i-1].setAttribute("onclick", "checkSize("+i+")");
    post[i-1].setAttribute("onpointermove", "checkSize("+i+")");
    button[i-1].setAttribute("onclick", "edit("+i+")");
    bt_addWidth[i-1].setAttribute("onclick","addWidth("+i+")");
    bt_addHeight[i-1].setAttribute("onclick","addHeight("+i+")");
    bt_removeWidth[i-1].setAttribute("onclick","removeWidth("+i+")");
    bt_removeHeight[i-1].setAttribute("onclick","removeHeight("+i+")");
  }
}


// CREATE POST
function createPost() {
  if (!removeActive && !editActive) {
    let posts = document.getElementById("posts");
    let post = document.createElement("div");
    post.setAttribute("class", "post hor1 ver1");
    let post_head = document.createElement("div");
    post_head.setAttribute("class", "post_head");
    let post_header = document.createElement("h2");
    post_header.innerHTML = "Texto Aqui";
    post_header.setAttribute("class", "post_header");
    let bt_edit = document.createElement("button");
    bt_edit.setAttribute("class","bt_edit");
    let img = document.createElement("img");
    img.setAttribute("width", "25px");
    img.setAttribute("src", "src/img/edit.png");
    bt_edit.appendChild(img);
    post_head.appendChild(post_header);
    post_head.appendChild(bt_edit);
    post.appendChild(post_head);
    let post_content = document.createElement("div");
    post_content.setAttribute("class","post_content");
    let pre = document.createElement("pre");
    pre.setAttribute("class", "post_text");
    pre.innerHTML = "text example";
    post_content.appendChild(pre);
    post.appendChild(post_content);
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
    posts.appendChild(post);
    addEvents();
  }
}

function saveAll() {
  let post = document.getElementById("posts");
  let text = post.innerHTML;
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
        console.log(e.target.result)
        if  (confirm('Esta seguro que desea subir este archivo? Todos los datos actuales serán perdidos.')) {
          let post = document.getElementById("posts");
          post.innerHTML = e.target.result;
        }
      });
      reader.readAsBinaryString(myFile);
    }   
    self.remove()
  });
}


// THIS WILL EXECUTE WHEN THE WINDOW LOAD
function loader() {
  createPost();
}
window.onload = loader();