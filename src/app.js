// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.

const form = document.getElementById("daret-form");

const input = document.getElementById("nom-cercle");
const error = document.getElementById("nom-cercle-erreur");


const regexPattern = /^[\p{L}\p{N} -]{3,40}$/u;

function validateNomCercle() {
  const value = input.value.trim();
  const isValid = regexPattern.test(value);

  if (isValid) {
    error.textContent = "";
    error.classList.add("hidden");
    input.classList.remove("border-daret-erreur");
    input.classList.add("border-daret-bordure");
  } else {
    error.textContent = "3 à 40 caractères : lettres, chiffres, espaces, tirets.";
    error.classList.remove("hidden");
    input.classList.remove("border-daret-bordure");
    input.classList.add("border-daret-erreur");
  }

  return isValid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateNomCercle()) {
    input.focus();
    return;
  }

//   console.log(input.value.trim());
});