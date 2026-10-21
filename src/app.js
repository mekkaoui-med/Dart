// Daret — simulateur. Ton code commence ici.
// Le HTML (index.html) est déjà intégré : lis-le, repère les id et les data-*, puis fais-le vivre.

const form = document.getElementById("daret-form");

const input = document.getElementById("nom-cercle");
const inputErreur = document.getElementById("nom-cercle-erreur");

const Cotisationinput = document.getElementById("cotisation");
const cotisationErreur = document.getElementById("cotisation-erreur");

const selectedPeriodicite = document.getElementById("periodicite");
const periodiciteErreur = document.getElementById("periodicite-erreur");

const dateDebut = document.getElementById("date-debut");
const dateDebutErreur = document.getElementById("date-debut-erreur");

const inputAjParticipant = document.getElementById("input-Aj-participant");
const ajouterParticipant = document.getElementById("ajouter-participant");
const participantsListe = document.getElementById("participants-liste");
const participantsErreur = document.getElementById("participants-erreur");
const ajoutParticipantZone = document.getElementById("ajouter-participant-zone")
const validerAjoutParticipant = document.getElementById("valdation-ajout-participant")
 
inputAjParticipant.classList.remove("hidden")
ajouterParticipant.addEventListener("click", function(){
    ajoutParticipantZone.classList.remove("hidden");
    inputAjParticipant.focus();
})

const regexPattern = /^[\p{L}\p{N} -]{3,40}$/u;

function validateNomCercle() {
  const value = input.value.trim();
  const isValid = regexPattern.test(value);

  if (isValid) {
    inputErreur.textContent = "";
    inputErreur.classList.add("hidden");
    input.setAttribute("aria-invalid", "true");
    input.classList.remove("border-daret-erreur");
    input.classList.add("border-daret-bordure");
  } else {
    inputErreur.textContent =
      "3 à 40 caractères : lettres, chiffres, espaces, tirets.";
    inputErreur.classList.remove("hidden");
    input.setAttribute("aria-invalid", "false");
    input.classList.remove("border-daret-bordure");
    input.classList.add("border-daret-erreur");
  }

  return isValid;
}

function validateCotisation() {
  const value = Cotisationinput.value.trim();

  const cotisationIsValide =
    value !== "" &&
    Number.parseInt(value) &&
    Number(value) >= 100 &&
    Number(value) <= 50000;

  if (cotisationIsValide) {
    cotisationErreur.textContent = "";
    cotisationErreur.classList.add("hidden");
    Cotisationinput.setAttribute("aria-invalid", "false");

    Cotisationinput.classList.remove("text-daret-erreur");
    Cotisationinput.classList.add("border-daret-bordure");
  } else {
    cotisationErreur.textContent =
      "Veuillez saisir un nombre entier compris entre 100 et 50 000.";
    cotisationErreur.classList.remove("hidden");
    Cotisationinput.setAttribute("aria-invalid", "true");

    Cotisationinput.classList.remove("border-daret-bordure");
    Cotisationinput.classList.add("text-daret-erreur");
  }
  return cotisationIsValide;
}

function validatePeriodicite() {
  const selectedValue = selectedPeriodicite.value;
  if (selectedValue === "") {
    periodiciteErreur.textContent = "Veuillez sélectionner un periodicite";
    periodiciteErreur.classList.remove("hidden");
    selectedPeriodicite.setAttribute("aria-invalid", "true");

    selectedPeriodicite.classList.remove("border-daret-bordure");
    selectedPeriodicite.classList.add("text-daret-erreur");

    return false;
  } else {
    periodiciteErreur.textContent = "";
    periodiciteErreur.classList.add("hidden");
    selectedPeriodicite.setAttribute("aria-invalid", "false");

    selectedPeriodicite.classList.remove("text-daret-erreur");
    selectedPeriodicite.classList.add("border-daret-bordure");
    return true;
  }
}

function validateDate() {
  const selectedDate = dateDebut.value;

  const todyaDate = new Date();
  const year = todyaDate.getFullYear();
  const month = String(todyaDate.getMonth() + 1).padStart(2, "0");
  const day = String(todyaDate.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  const validateDay = selectedDate !== "" && selectedDate >= todayStr;
  if (validateDay) {
    dateDebutErreur.textContent = "";
    dateDebutErreur.classList.add("hidden");
    dateDebut.setAttribute("aria-invalid", "false");

    dateDebut.classList.remove("text-daret-erreur");
    dateDebut.classList.add("border-daret-bordure");
  } else {
    dateDebutErreur.textContent =
      selectedDate == ""
        ? "Veuillez sélectionner une date de début"
        : "La date de début doit être aujourd'hui ou une date ultérieure.";
    dateDebutErreur.classList.remove("hidden");
    dateDebut.setAttribute("aria-invalid", "true");
    dateDebut.classList.remove("border-daret-bordure");
    dateDebut.classList.add("text-datet-erreur");
  }
  return validateDay;
}

function validateParticipants(name){
    name.trim()
    if(name === ""){
        return "Veuillez saisir un prénom."
    }
    if(!regexPattern.test(name)){
        return "Le prénom doit contenir entre 2 et 30 lettres."
    }

}

validerAjoutParticipant.addEventListener("click", function(){
    const validationParticipantMsg = validateParticipants(inputAjParticipant.value)
    
})

input.addEventListener("input", validateNomCercle);
selectedPeriodicite.addEventListener("change", validatePeriodicite);
Cotisationinput.addEventListener("input", validateCotisation);
dateDebut.addEventListener("change", validateDate);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateNomCercle()) {
    input.focus();
    return;
  }
  if (!validateCotisation()) {
    Cotisationinput.focus();
    return;
  }
  if (!validatePeriodicite()) {
    selectedPeriodicite.focus();
    return;
  }
  if (!validateDate()) {
    dateDebut.focus();
    return;
  }

});
