let elem = document.querySelectorAll(".elem");

elem.forEach(function (val) {
  console.log(val.childNodes);

  val.addEventListener("mouseenter", function () {
    val.childNodes[3].style.opacity = "1";
  });
  val.addEventListener("mouseleave", function () {
    val.childNodes[3].style.opacity = "0";
  });
  val.addEventListener("mousemove", function (dets) {
    val.childNodes[3].style.left = dets.x + "px";
    val.childNodes[3].style.top = dets.y + "px";
  });
});
elem.forEach(function (val, index) {
  let colors = ["red", "blue", "green", "orange"];
  let h1 = val.querySelector("h1");
  if (h1) {
    h1.style.color = "white"; // Default color
  }

  val.addEventListener("mouseenter", function () {
    if (h1) {
      h1.style.color = colors[index % colors.length];
    }
  });

  val.addEventListener("mouseleave", function () {
    if (h1) {
      h1.style.color = "white"; // Revert to default color
    }
  });
});
