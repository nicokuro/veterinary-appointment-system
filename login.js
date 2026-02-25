let form = document.getElementById("loginForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  let usuario = document.getElementById("usuario").value;
  let password = document.getElementById("password").value;

  if (usuario === "duena" && password === "admin123") {
    localStorage.setItem("adminLogueado", "true");
    window.location.href = "index.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});
