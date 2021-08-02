//getting inputs
const inputbox = document.getElementById("txtAddListItem");
const addbutton = document.getElementById("btnAddListItem");
const check = document.getElementById("checky")
const todolist = document.querySelector(".list")

inputbox.onkeyup = () => {
    let input = inputbox.value;
    if (input.trim() != 0) {
        addbutton.classList.add("active")
    } else {
        addbutton.classList.remove("active")
    }
}
showlist();

addbutton.onclick = () => {
    let input = inputbox.value
    if (input.trim() != 0) {
        let getlocalstorage = localStorage.getItem("New Item")
        if (getlocalstorage == null) {
            listitems = [];
        } else {
            listitems = JSON.parse(getlocalstorage);
        }
        listitems.push(input)
        localStorage.setItem("New Item", JSON.stringify(listitems));
        addbutton.classList.remove("active")
        showlist();
        write_footer();
    }
}

//add task list inside ul
function showlist() {
    let input = inputbox.value
    let getlocalstorage = localStorage.getItem("New Item")
    if (getlocalstorage == null) {
        listitems = [];
    } else {
        listitems = JSON.parse(getlocalstorage);
    }
    let new_row = "";

    listitems.forEach((element, index) => {
        new_row += `<li> ${element} <span class="check"><input type="checkbox"></span> <span class="trash"><i class="fas fa-trash" onclick=deletetask(${index})></i></span></li>`
    });
    todolist.innerHTML = new_row;
    inputbox.value = "";
}

//delete task function
function deletetask(index) {
    let getlocalstorage = localStorage.getItem("New Item")
    listitems = JSON.parse(getlocalstorage);
    listitems.splice(index, 1);
    //update the list after delete is done
    localStorage.setItem("New Item", JSON.stringify(listitems));
    showlist();
    write_footer();
}


function clearall() {
    localStorage.clear();
    showlist();
    let footer = document.querySelector(".footer")
    footer.innerHTML = (`<i>You have 0 items on your list.</i>  <button ID="btnClearAll" OnClick=clearall();> Clear All</button>`)
}

function write_footer() {
    let getlocalstorage = localStorage.getItem("New Item")
    listitems = JSON.parse(getlocalstorage)

    let rowcount = 0;

    listitems.forEach(element => {
        rowcount += 1
    });
    let footer = document.querySelector(".footer")
    footer.innerHTML = (`<i>You have ${rowcount} items on your list.</i>  <button ID="btnClearAll" OnClick=clearall();> Clear All</button>`)
}
write_footer();
