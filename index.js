const rows = document.getElementsByClassName("row"); // Get all elements that have the classname "row"

let indicator = "X"; // stores the current value

// Iterates all the rows variable and put an eventlistener on each of it
for (let i = 0; i < rows.length; i++) {
  rows[i].addEventListener("click", function () {
    if (rows[i].innerText === "") {
      if (indicator === "O") {
        rows[i].innerText = "X";
        indicator = "X";
      } else {
        rows[i].innerText = "O";
        indicator = "O";
      }
    }
  });
}
