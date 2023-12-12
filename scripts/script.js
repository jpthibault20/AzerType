/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires au fonctionnement du jeu. 
 * 
 *********************************************************************************/

/**
 * Cette fonction affiche dans la console le score de l'utilisateur
 * @param {number} score : le score de l'utilisateur
 * @param {number} nbMotsProposes : le nombre de mots proposés à l'utilisateur
 */
function afficherResultat(score, nbMotsProposes) {
    // Récupération de la zone dans laquelle on va écrire le score
    let spanScore = document.querySelector(".zoneScore span")
    // Ecriture du texte
    let affichageScore = `${score} / ${nbMotsProposes}` 
    // On place le texte à l'intérieur du span. 
    spanScore.innerText = affichageScore
}

/**
 * Cette fonction affiche une proposition, que le joueur devra recopier, 
 * dans la zone "zoneProposition"
 * @param {string} proposition : la proposition à afficher
 */
function afficherProposition(proposition) {
    let zoneProposition = document.querySelector(".zoneProposition")
    zoneProposition.innerText = proposition
}

/**
 * Cette fonction construit et affiche l'email. 
 * @param {string} nom : le nom du joueur
 * @param {string} email : l'email de la personne avec qui il veut partager son score
 * @param {string} score : le score. 
 */
function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

/**
 * Cette fonction permet de tester la valeure saisie pour le nom
 * @param {string} nom nom du joueur
 */
function validerNom(nom){
    let regex = new RegExp("[a-zA-Z]+")

    if (regex.test(nom) === false){
        throw new Error(`Le nom est trop court`)
    }

}

/**
 * Cette fonction permet de tester la valeure saisie pour l'email
 * @param {string} email email du destinataire
 */
function validerEmail(email) {
    let regex = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+")

    if (regex.test(email) === false){
        throw new Error(`L’e-mail n’est pas valide`)
    }

}

/**
 * Cette fonction permet d'afficher une ligne d'erreure sur la popup lors de l'envoie du formulaire
 * @param {string} messageErreur le message à afficher
 */
function afficherMessageErreur(messageErreur) {
    let messageErreurElement = document.querySelector(".popup span")

    if (messageErreurElement ===  null){
        let nouvelElement = document.createElement("span")
        let parentElement = document.querySelector(".popup")

        parentElement.appendChild(nouvelElement)
        
        messageErreurElement = document.querySelector(".popup span")
    }

        messageErreurElement.textContent = messageErreur

    
}

/**
 * Cette fonction permet de gérer le formulaire d'envoie du score
 * gère les erreures
 * @param {number} score le score de l'utilisateur
 */
function gererFormulaire(score){
    const form = document.querySelector('form')
    initAddEventListenerPopup()


    form.addEventListener("submit", (event) => {
        // On empêche le comportement par défaut de rechargement de la page
        event.preventDefault();
        console.log("Il n’y a pas eu de rechargement de page");
    
        // On récupère les deux champs et on affiche leur valeur
        const nom = document.getElementById("nom").value;
        const email = document.getElementById("email").value;
        
        try {
            validerNom(nom)
            validerEmail(email)
            afficherMessageErreur("")
        } catch (error) {
            console.log("Une erreur est survenue : " + error.message)
            afficherMessageErreur(error.message)
        }

    });
}

/**
 * Cette fonction lance le jeu. 
 * Elle demande à l'utilisateur de choisir entre "mots" et "phrases" et lance la boucle de jeu correspondante
 */
function lancerJeu() {
    // Initialisations
    let score = 0
    let i = 0
    let listeProposition = listeMots

    let btnValiderMot = document.getElementById("btnValiderMot")
    let inputEcriture = document.getElementById("inputEcriture")
    

    afficherProposition(listeProposition[i])

    // Gestion de l'événement click sur le bouton "valider"
    btnValiderMot.addEventListener("click", () => {
        if (inputEcriture.value === listeProposition[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        inputEcriture.value = ''
        if (listeProposition[i] === undefined) {
            afficherProposition("Le jeu est fini")
            btnValiderMot.disabled = true
        } else {
            afficherProposition(listeProposition[i])
        }
    })

    // Gestion de l'événement change sur les boutons radios. 
    let listeBtnRadio = document.querySelectorAll(".optionSource input")
    for (let index = 0; index < listeBtnRadio.length; index++) {
        listeBtnRadio[index].addEventListener("change", (event) => {
            // Si c'est le premier élément qui a été modifié, alors nous voulons
            // jouer avec la listeMots. 
            if (event.target.value === "1") {
                listeProposition = listeMots
            } else {
                // Sinon nous voulons jouer avec la liste des phrases
                listeProposition = listePhrases
            }
            // Et on modifie l'affichage en direct. 
            afficherProposition(listeProposition[i])
        })
    }

    afficherResultat(score, i)


    gererFormulaire(score)

}






