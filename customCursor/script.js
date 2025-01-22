let main = document.querySelector(".main");
let crsr = document.querySelector(".cursor");

main.addEventListener("mousemove", (dets) => {
  crsr.style.left = dets.clientX + "px";
  crsr.style.top = dets.clientY + "px";
});
