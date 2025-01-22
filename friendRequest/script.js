const buttons = document.querySelectorAll(".btn");
const relations = document.querySelectorAll(".relation");

buttons.forEach((btn, index) => {
  let isFriend = false;

  btn.addEventListener("click", function () {
    isFriend = !isFriend; // Toggle the state
    console.log(isFriend);

    // Update the corresponding relation element
    const relation = relations[index];
    console.log(relations[index]);
    relation.textContent = isFriend ? "Friend" : "Stranger";
    relation.style.color = isFriend ? "green" : "red";

    // Update button text and style
    btn.textContent = isFriend ? "Remove Friend" : "Add Friend";
    btn.style.backgroundColor = isFriend ? "red" : "green";
  });
});
