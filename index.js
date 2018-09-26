let note_list = [];
let counter = 0;
let current_id;
class Note {
  constructor(title, subject, note_id) {
    this.title = title;
    this.subject = subject;
    this.note_id = note_id;
  }

}
function btn_add() {
  let title = document.getElementById("id_title").value.trim();
  let subject = document.getElementById("id_textarea").value.trim();
  if (title == "") {
    alert("Please input a Title");
    return;
  }
  if (subject == "") {
    alert("Please input the subject");
    return;
  }

  let list = document.getElementById("div_items");
  let item = document.createElement("ol");

  item.id = "item_"+counter;
  counter++;

  let note = new Note(title, subject, item.id);
  note_list.push(note);

  item.onclick = function() {showNote(this.id)};
  item.innerHTML = note.title;
  item.classList.add("list_item");
  list.appendChild(item);
  current_id = item.id;
  clear();
  populate(note_list);
}
function btn_new() {
  clear();
  current_id = "";
}
function btn_delete() {
  if (note_list.length == 0 || current_id == "")
    return;
  let index = 0;
  for (let i = 0; i < note_list.length; i++) {
    if (note_list[i].note_id == current_id) {
      index = i;
      break;
    }
  }
  var current_note = document.getElementById(note_list[index].note_id);
  document.getElementById("div_items").removeChild(current_note);
  note_list.splice(index, 1);
  clear();
  current_id = "";
}
function showNote(item_id) {
  current_id = item_id;
  let index = 0;
  for (let i = 0; i < note_list.length; i++) {
    if (note_list[i].note_id == item_id) {
      index = i;
      break;
    }
  }

  let showTitle = note_list[index].title;
  let showSubject = note_list[index].subject;

  document.getElementById("id_title").value = showTitle;
  document.getElementById("id_textarea").value = showSubject;
}

function search() {
  let user_search = document.getElementById("searchInput").value;
  if (user_search.trim() == "") {
    populate(note_list);
  }
  let search_list = [];

  for (let i = 0; i < note_list.length; i++) {
    if (note_list[i].title.includes(user_search)) {
      search_list.push(note_list[i]);
    }
  }
  populate(search_list);
}
function populate(new_list) {
  let list = document.getElementById("div_items");

  while(list.firstChild) {
    list.removeChild(list.firstChild);
  }
  for (let i = 0; i < new_list.length; i++) {
    //let current_note = document.getElementById(new_list[i]);
    let item = document.createElement("ol");
    item.id = new_list[i].note_id;
    item.onclick = function() {showNote(this.id)};
    item.innerHTML = new_list[i].title;
    item.classList.add("list_item");
    list.appendChild(item);
  }

}
function clear() {
  document.getElementById("id_title").value = "";
  document.getElementById("id_textarea").value = "";
  document.getElementById("searchInput").value = "";
}
