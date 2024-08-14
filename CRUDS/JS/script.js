/*
ay 7aga leeha 3laka bel data == CRUD (S)
Create --- Read --- Update --- Delete --- Search
*/

let crtbtn = document.getElementById("crtbtn");
let inpts = document.getElementsByClassName("inpt");
let numofitem = document.getElementById("count");
let total = document.getElementById("tot");
let tot_div = document.getElementsByClassName("total_div");
let added = document.getElementsByClassName("added");
let obj = [];
let tmp;
let index = -1;
let mode = "create";
let deleter=document.getElementById("deleter");
let totspan=document.querySelector(".total-span");
/* array then we push items object*/

inpts[1].addEventListener("keyup", totalProduct);
inpts[2].addEventListener("keyup", totalProduct);
inpts[3].addEventListener("keyup", totalProduct);
inpts[4].addEventListener("keyup", totalProduct);

/*
+"34" +  +"6"= 40
byt7welo lee 2rkam lw 7tet 2bl 2l string +
*/
function totalProduct() {
  if (inpts[1].value != '')
 {
    total.innerHTML =
      + inpts[1].value 
      +
      + inpts[2].value
      +
      + inpts[3].value
      - 
      + inpts[4].value;

      totspan.style.background="#090";
  }
  else
  {
    total.innerHTML='';
    totspan.style.background="rgb(195, 19, 19)"; 
  }
}

if (localStorage.objarr) {
  obj = JSON.parse(localStorage.objarr);
  index = localStorage.getItem("index");
}
//34an lma 2l variable bykoon fady fel 2wl hy3ml error
//f t3ml check 2za kan leeh keema wla l2


function deleteAll() {
  obj = [];
  localStorage.setItem("objarr", JSON.stringify(obj));
  added[0].innerHTML = "";
  added[0].innerHTML = "";
  added[1].innerHTML = "";
  added[2].innerHTML = "";
  added[3].innerHTML = "";
  added[4].innerHTML = "";
  added[5].innerHTML = "";
  tot_div[0].innerHTML = "";
  added[6].innerHTML = "";
  added[7].innerHTML = "";
  added[8].innerHTML = "";
  deleter.innerHTML=`Delete All `;
}

crtbtn.addEventListener("click", newpro);

function newpro(event) {
  //index is for the update
  if (
    inpts[0].value.length > 0 &&
    inpts[1].value.length > 0 &&
    inpts[2].value.length > 0 &&
    inpts[3].value.length > 0 &&
    inpts[4].value.length > 0 &&
    inpts[5].value.length > 0
  ) {
    let o = {
      title: inpts[0].value.toLowerCase(),//for searching
      price: inpts[1].value,
      taxes: inpts[2].value,
      ads: inpts[3].value,
      discount: inpts[4].value,
      total: total.innerHTML,
      count: numofitem.value,
      category: inpts[5].value.toLowerCase(),
    };
    if (mode === "create")
      for (let j = 0; j < numofitem.value; j++) obj.push(o);
    else obj[tmp] = o;

    localStorage.setItem("objarr", JSON.stringify(obj));
    creating();
    clear();
  }
}

function clear() {
  inpts[0].value = "";
  inpts[1].value = "";
  inpts[2].value = "";
  inpts[3].value = "";
  inpts[4].value = "";
  inpts[5].value = "";
  numofitem.value = "";

  total.innerHTML='';
    totspan.style.background="rgb(195, 19, 19)"; 
}

function creating() {
  added[0].innerHTML = "";
  added[0].innerHTML = "";
  added[1].innerHTML = "";
  added[2].innerHTML = "";
  added[3].innerHTML = "";
  added[4].innerHTML = "";
  added[5].innerHTML = "";
  tot_div[0].innerHTML = "";
  added[6].innerHTML = "";
  added[7].innerHTML = "";
  added[8].innerHTML = "";
  for (let index = 0; index < obj.length; index++) {
    added[0].innerHTML += `<div>${index + 1}<hr></div>`;
    added[1].innerHTML += `<div>${obj[index].title}<hr></div>`;
    added[2].innerHTML += `<div>${obj[index].price}<hr></div>`;
    added[3].innerHTML += `<div>${obj[index].taxes}<hr></div>`;
    added[4].innerHTML += `<div>${obj[index].ads}<hr></div>`;
    added[5].innerHTML += `<div>${obj[index].discount}<hr></div>`;
    tot_div[0].innerHTML += `<div>${obj[index].total}<hr></div>`;
    added[6].innerHTML += `<div>${obj[index].category}<hr></div>`;
    //------------------<buttons>-------------------
    added[7].innerHTML += `<div><button onclick="updating(${index})" class="update-btn">UPDATE</button><hr></div>`;

    added[8].innerHTML += `<div><button onclick="deleting(${index})" class="delete-btn">DELETE</button><hr></div>`;

    crtbtn.innerHTML = "Create";
    numofitem.style.display = "block";
    mode = "create";
    deleter.innerHTML=`Delete All (${index+1}) `;
  }
}
creating();

//<<<<CREATE AND READ AND CLEAR AND ADD ITEM IN ARR OF OBJECT DONE>>>>

//FADEL DELETE ALL - DELETE - UPDATE - SEARCH
/*---------------------> updating <------------------- */

function updating(i) {
  scroll( {top:0} );
  inpts[0].value = obj[i].title;
  inpts[1].value = obj[i].price;
  inpts[2].value = obj[i].taxes;
  inpts[3].value = obj[i].ads;
  inpts[4].value = obj[i].discount;
  inpts[5].value = obj[i].category;
  totalProduct();
  crtbtn.innerHTML = "Update";
  numofitem.style.display = "none";
  mode = "update";
  tmp = i;
}

/* 2l create bt3ty m4 bt3ml overwrite lazm 23ml reload 34an t4t8l */

function deleting(i) {
  obj.splice(i, 1);
  localStorage.setItem("objarr", JSON.stringify(obj));
  creating();
}

//-------------<searching>-----------------------

let search_bar = document.getElementById("search_bar");
let search = "title";
/*default search mode is by title */

function searchmode(id) {
  if (id === "searchtitle") {
    search = "title";
    search_bar.placeholder = "search by title";
  } else {
    search = "category";
    search_bar.placeholder = "search by category";
  }
  search_bar.focus();
}

function searching() {
  if (search === "title") {
    added[0].innerHTML = "";
    added[0].innerHTML = "";
    added[1].innerHTML = "";
    added[2].innerHTML = "";
    added[3].innerHTML = "";
    added[4].innerHTML = "";
    added[5].innerHTML = "";
    tot_div[0].innerHTML = "";
    added[6].innerHTML = "";
    added[7].innerHTML = "";
    added[8].innerHTML = "";

    for (let index = 0; index < obj.length; index++) {
      if (obj[index].title.includes(search_bar.value.toLowerCase())) {
        added[0].innerHTML += `<div>${index + 1}<hr></div>`;
        added[1].innerHTML += `<div>${obj[index].title}<hr></div>`;
        added[2].innerHTML += `<div>${obj[index].price}<hr></div>`;
        added[3].innerHTML += `<div>${obj[index].taxes}<hr></div>`;
        added[4].innerHTML += `<div>${obj[index].ads}<hr></div>`;
        added[5].innerHTML += `<div>${obj[index].discount}<hr></div>`;
        tot_div[0].innerHTML += `<div>${obj[index].total}<hr></div>`;
        added[6].innerHTML += `<div>${obj[index].category}<hr></div>`;
        //------------------<buttons>-------------------
        added[7].innerHTML += `<div><button onclick="updating(${index})" class="update-btn">UPDATE</button><hr></div>`;
        added[8].innerHTML += `<div><button onclick="deleting(${index})" class="delete-btn">DELETE</button><hr></div>`;
      }
    }
  }
  //---------------------------<category>-----------------
  else {

    added[0].innerHTML = "";
    added[0].innerHTML = "";
    added[1].innerHTML = "";
    added[2].innerHTML = "";
    added[3].innerHTML = "";
    added[4].innerHTML = "";
    added[5].innerHTML = "";
    tot_div[0].innerHTML = "";
    added[6].innerHTML = "";
    added[7].innerHTML = "";
    added[8].innerHTML = "";

    for (let index = 0; index < obj.length; index++) {
      if (obj[index].category.includes(search_bar.value.toLowerCase())) {
        added[0].innerHTML += `<div>${index + 1}<hr></div>`;
        added[1].innerHTML += `<div>${obj[index].title}<hr></div>`;
        added[2].innerHTML += `<div>${obj[index].price}<hr></div>`;
        added[3].innerHTML += `<div>${obj[index].taxes}<hr></div>`;
        added[4].innerHTML += `<div>${obj[index].ads}<hr></div>`;
        added[5].innerHTML += `<div>${obj[index].discount}<hr></div>`;
        tot_div[0].innerHTML += `<div>${obj[index].total}<hr></div>`;
        added[6].innerHTML += `<div>${obj[index].category}<hr></div>`;
        //------------------<buttons>-------------------
        added[7].innerHTML += `<div><button onclick="updating(${index})" class="update-btn">UPDATE</button><hr></div>`;
        added[8].innerHTML += `<div><button onclick="deleting(${index})" class="delete-btn">DELETE</button><hr></div>`;
      }
    }
  }
}





/*
note only :-
------------
let obj2=obj;
kda homa 2l 2tneeen nafs 2l refrence;
34an bsawy array bee array
w 2na 3ayz 2l values bss m4 refrence f 2st3ml

let obj2=JSON.parse(JSON.stringify(obj));
*/
