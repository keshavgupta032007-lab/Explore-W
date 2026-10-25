(function () {
  var button = document.getElementById("menu");
  var nav = document.getElementById("nav");
  if (!button || !nav) return;
  button.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    button.setAttribute("aria-expanded", open ? "true" : "false");
  });
})();
