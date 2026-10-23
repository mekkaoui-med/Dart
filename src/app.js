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
const ajoutParticipantZone = document.getElementById(
  "ajouter-participant-zone",
);
const validerAjoutParticipant = document.getElementById(
  "valdation-ajout-participant",
);
const participantsCompteur = document.getElementById("participants-compteur");

const minParticipant = Number(participantsListe.dataset.min);
const maxParticipant = Number(participantsListe.dataset.max);

// us-03 :
const resumeCagnotte = document.getElementById("resume-cagnotte");
const resumeTotalCycle = document.getElementById("resume-total-cycle");
const resumeNbTours = document.getElementById("resume-nb-tours");
const resumeDates = document.getElementById("resume-dates");

const contenuResultat = document.getElementById("contenu-resultat");
const etatVide = document.getElementById("etat-vide");

inputAjParticipant.classList.remove("hidden");
ajouterParticipant.addEventListener("click", function () {
  ajoutParticipantZone.classList.remove("hidden");
  inputAjParticipant.focus();
});

const regexPattern = /^[\p{L}\p{N} -]{3,40}$/u;
const participantRegex = /^\p{L}{2,30}$/u;

function validateNomCercle() {
  const value = input.value.trim();
  const isValid = regexPattern.test(value);

  if (isValid) {
    inputErreur.textContent = "";
    inputErreur.classList.add("hidden");
    input.setAttribute("aria-invalid", "false");
    input.classList.remove("border-daret-erreur");
    input.classList.add("border-daret-bordure");
  } else {
    inputErreur.textContent =
      "3 à 40 caractères : lettres, chiffres, espaces, tirets.";
    inputErreur.classList.remove("hidden");
    input.setAttribute("aria-invalid", "true");
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
function validateParticipants(name) {
  name = name.trim();
  if (name === "") {
    return "Veuillez saisir un prénom.";
  }
  if (!participantRegex.test(name)) {
    return "Le prénom doit contenir entre 2 et 30 lettres.";
  }
  return "";
}

function creerParticipant(name) {
  const li = document.createElement("li");
  li.className = "flex items-center gap-2";

  const input = document.createElement("input");
  input.type = "text";
  input.name = "participants[]";
  input.value = name;
  input.placeholder = "Entrez un prénom";
  input.className = "border rounded-2xl px-3 py-2";
  input.required = true;

  const buttonRetirer = document.createElement("button");
  buttonRetirer.type = "button";
  buttonRetirer.textContent = "Retirer";
  buttonRetirer.className = "rounded border px-3 py-2";
  buttonRetirer.dataset.action = "retirer";

  li.append(input, buttonRetirer);
  participantsListe.append(li);
}

creerParticipant("");
creerParticipant("");
creerParticipant("");

function metreAjourCounter() {
  const count = participantsListe.children.length;

  participantsCompteur.textContent = `${count} participant${count > 1 ? "s" : ""}`;
}

function calculerCercle(cotisation, nombreParticipants) {
  const montantBeneficiaire = cotisation * nombreParticipants;
  const nombreTours = nombreParticipants;
  const totalParParticipant = cotisation * nombreTours;

  return {
    montantBeneficiaire,
    nombreTours,
    totalParParticipant,
  };
}
// afich the result of dart :

function afficheResult() {
  const cotisation = Number(Cotisationinput.value);
  const nombreParticipants = participantsListe.querySelectorAll(
    'input[name="participants[]"]',
  ).length;

  const result = calculerCercle(cotisation, nombreParticipants);

  resumeCagnotte.textContent = `${result.montantBeneficiaire} MAD`;
  resumeTotalCycle.textContent = `${result.totalParParticipant} MAD`;
  resumeNbTours.textContent = result.nombreTours;

  const dateFin = calculerDateFin(
    dateDebut.value,
    selectedPeriodicite.value,
    result.nombreTours,
  );

  const dateDebutFormatee = new Date(
    `${dateDebut.value}T12:00:00`,
  ).toLocaleDateString("fr-FR");

  const dateFinFormatee = dateFin.toLocaleDateString("fr-FR");

  resumeDates.textContent = `${dateDebutFormatee} – ${dateFinFormatee}`;

  contenuResultat.classList.remove("hidden");
  etatVide.classList.add("hidden");
}
function calculerDateFin(dateDebut, periodicite, nombreTours) {
  const date = new Date(`${dateDebut}T12:00:00`);

  for (let i = 1; i < nombreTours; i++) {
    if (periodicite === "hebdomadaire") {
      date.setDate(date.getDate() + 7);
    } else if (periodicite === "quinzaine") {
      date.setDate(date.getDate() + 15);
    } else if (periodicite === "mensuelle") {
      const jour = date.getDate();

      date.setDate(1);
      date.setMonth(date.getMonth() + 1);

      const dernierJour = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
      ).getDate();

      date.setDate(Math.min(jour, dernierJour));
    }
  }

  return date;
}

validerAjoutParticipant.addEventListener("click", function () {
  const nouveauPrenom = inputAjParticipant.value.trim();

  // 1. Validate the name
  const validationMessage = validateParticipants(nouveauPrenom);

  if (validationMessage !== "") {
    participantsErreur.textContent = validationMessage;
    participantsErreur.classList.remove("hidden");
    return;
  }

  // 2. Check the maximum
  const count = participantsListe.children.length;

  if (count >= maxParticipant) {
    participantsErreur.textContent = `Vous ne pouvez pas ajouter plus de ${maxParticipant} participants.`;
    participantsErreur.classList.remove("hidden");
    return;
  }

  // 3. Check for duplicate names
  const prenomExiste = Array.from(
    participantsListe.querySelectorAll("input"),
  ).some(
    (input) => input.value.trim().toLowerCase() === nouveauPrenom.toLowerCase(),
  );

  if (prenomExiste) {
    participantsErreur.textContent = "Ce prénom existe déjà.";
    participantsErreur.classList.remove("hidden");
    return;
  }

  // 4. Create the participant
  creerParticipant(nouveauPrenom);

  // 5. Clear the temporary input and error
  inputAjParticipant.value = "";
  participantsErreur.textContent = "";
  participantsErreur.classList.add("hidden");

  // 6. Update the counter
  metreAjourCounter();

  inputAjParticipant.focus();
});

participantsListe.addEventListener("click", function (event) {
  const button = event.target.closest('[data-action="retirer"]');

  if (!button || !participantsListe.contains(button)) {
    return;
  }

  const count = participantsListe.children.length;

  if (count <= minParticipant) {
    participantsErreur.textContent = `Vous devez garder au moins ${minParticipant} participants.`;
    participantsErreur.classList.remove("hidden");
    return;
  }

  button.closest("li").remove();

  participantsErreur.textContent = "";
  participantsErreur.classList.add("hidden");

  metreAjourCounter();
});
metreAjourCounter();

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
    afficheResult();
});
