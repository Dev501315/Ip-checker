const mesQuestions = [
  {
    question: "Comment télécharger l'application ?",
    response: "Tu as une fiche d'aide à disposition pour l'installation de l'application dans le site clique sur menu puis aide."
  },
  {
    question: "Mes données sont ils protégées ?",
    response: "Effectivement les données sont protégées sur un serveur, notre application a un certificat SSL permettant de garder la confidentialité de nos utilisateurs. L'IP est stockée temporairement dans nos logs !"
  },
  {
    question: "Qu'est ce que l'API StackOverflow ?",
    response: "Tout d'abord, nous avons incorporé une API dans notre site permettant de poser différentes questions comme des sujets sur le codage informatique mais aussi nos propres questions."
  }
];

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById('question-input');
  const responseList = document.getElementById('response-list');
  const answerDisplay = document.getElementById('answer-display');
  const bouton = document.getElementById("telecharger");
  const url = "https://drive.google.com/uc?export=download&id=1y4j_-wlZmVANsfZ3fSfE_HWid6KUSKgh";
  let timeoutId;

  // === Gestion de la recherche de questions ===
  input.addEventListener('input', function () {
    clearTimeout(timeoutId);
    const question = this.value.trim();
    answerDisplay.style.display = 'none';

    if (question.length < 1) {
      responseList.innerHTML = '';
      return;
    }

    timeoutId = setTimeout(() => {
      axios.get("https://api.stackexchange.com/2.3/search", {
        params: {
          order: "desc",
          sort: "relevance",
          intitle: question,
          site: "stackoverflow"
        }
      })
      .then(response => {
        const items = response.data.items;
        responseList.innerHTML = '';

        // 🔍 Filtrage des questions personnalisées
        const persoFiltred = mesQuestions.filter(q =>
          q.question.toLowerCase().includes(question.toLowerCase())
        );
        console.log("Résultats perso :", persoFiltred);

        if (items.length === 0 && persoFiltred.length === 0) {
          responseList.innerHTML = '<li>Aucune suggestion.</li>';
          return;
        }

        // ✅ Questions personnalisées avec style
        persoFiltred.forEach(q => {
          const li = document.createElement('li');
          li.innerHTML = `💡 <strong>${q.question}</strong>`;
          li.style.cursor = 'pointer';
          li.addEventListener('click', () => {
            answerDisplay.textContent = q.response;
            answerDisplay.style.display = 'block';
            input.value = q.question;
            responseList.innerHTML = '';
          });
          responseList.appendChild(li);
        });

        // ✅ Résultats API StackOverflow
        items.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `<a href="${item.link}" target="_blank" rel="noopener noreferrer">${item.title}</a>`;
          responseList.appendChild(li);
        });
      })
      .catch(error => {
        console.error(error);
        responseList.innerHTML = '<li>Erreur lors de la récupération.</li>';
      });
    }, 500);
  });

  // === Gestion du bouton de téléchargement ===
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

  // === Récupération et affichage de l'adresse IP ===
  axios.get('https://api64.ipify.org?format=json')
    .then(response => {
      const ip = response.data.ip;
      document.getElementById('ip-display').textContent = ip;
    })
    .catch(error => {
      console.error('Erreur IP :', error);
      document.getElementById('ip-display').textContent = "Erreur de chargement.";
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const menu = document.querySelector('.menu');

    menuBtn.addEventListener('click', () => {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
    });

    // Fermer le menu si on clique ailleurs
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
        menu.style.display = 'none';
      }
    });
  });










