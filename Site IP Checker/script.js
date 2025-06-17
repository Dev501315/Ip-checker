document.addEventListener("DOMContentLoaded", () => {
  const bouton = document.getElementById("telecharger");
  const url = "https://drive.google.com/uc?export=download&id=1QGAh6kCJf9MvCUfWcC0_6ErlCXSy-tnG";// 🔁 ton lien ici

  function estMobile() {
    return /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);
  }

  if (estMobile()) {
    bouton.textContent = "Téléchargement uniquement sur PC";
    bouton.style.backgroundColor = "#555";
    bouton.style.cursor = "not-allowed";
    bouton.removeAttribute("href");
  } else {
    bouton.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = url;
    });
  }
});
