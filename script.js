function applyTransformations() {
    // Récupération du lien href depuis la zone de texte
    var inputLink = document.getElementById("input-link").value;

    // Supprimer l'information aid= si elle est présente dans le lien
    var cleanLink = cleanAidParameter(inputLink);

    // Application des transformations
    var transformedCode = applyModifications(cleanLink);

    // Copier le contenu HTML du code transformé dans le presse-papiers
    copyToClipboard(transformedCode);

    // Affichage du code transformé
    document.getElementById("output-code").innerHTML = transformedCode;


    // Afficher un message en popup
    var popupMessage = document.getElementById("popup-message");
    popupMessage.style.display = "block";
    setTimeout(function() {
        popupMessage.style.display = "none";
    }, 5000); // Disparition après 5 secondes
}

function copyToClipboard(text) {
    var tempInput = document.createElement("textarea");
    tempInput.style.position = "absolute";
    tempInput.style.left = "-1000px";
    tempInput.style.top = "-1000px";
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
}

function cleanAidParameter(link) {
    // Vérifier si le paramètre aid= est présent dans le lien
    var indexOfAid = link.indexOf("&aid=");
    if (indexOfAid !== -1) {
        // Si le paramètre aid= est trouvé, supprimer cette partie du lien
        return link.substring(0, indexOfAid);
    } else {
        // Si le paramètre aid= n'est pas trouvé, retourner le lien tel quel
        return link;
    }
}

function applyModifications(link) {
    var code = `
    <link href="https://surveys-static.survicate.com/fonts/fonts.css" rel="stylesheet">
    <div style="margin: auto; max-width: 600px; font-family: 'Helvetica', sans-serif;">
        <div style="padding-bottom: 10px;">
            <div style="padding-bottom: 10px; max-width: 500px; margin: auto; font-size: 18px; color: #29292a; text-align: center; line-height: 30px;">
                Qu'avez-vous pensé de cette web-matinale ?
            </div>
        </div>
        <div style="text-align: center; margin: 0 auto;">
            <table cellspacing="0" cellpadding="0" style="display: inline-flex; margin-bottom: 0; margin-left: auto; margin-right: auto; margin-top: 2px;">
                <tr>
                    <td style="color: #7f8c8d; padding-top: 6px; padding-bottom: 10px; text-align: left;" align="left">0 - Pas du tout satisfait</td>
                </tr>
                <tr>
                    <td>
                        <center>
                            <table cellspacing="0" cellpadding="2" style="display: inline-flex; margin-bottom: 0; margin-left: auto; margin-right: auto; margin-top: 0; min-width: 30%;">
    `;

    // Appliquer le lien href fourni à chaque élément de lien dans le code
    for (var i = 0; i <= 10; i++) {
        code += `
        <td style="padding: 2px;">
            <table cellspacing="0" cellpadding="0">
                <tr>
                    <td style="background-color: ${getBackgroundColor(i)}; text-align: center; border-radius: 8px;" bgcolor="${getBackgroundColor(i)}" align="center"> <a href="${link}&aid=${i}" target="_blank" style="text-decoration: none; display: inline-block; border: 1px solid ${getBackgroundColor(i)}; border-radius: 8px; padding: 6px; width: 24px; line-height: 24px; white-space: nowrap; box-sizing: content-box; color: #ffffff !important;"> <font color="#ffffff">${i}</font> </a> </td>
                </tr>
            </table>
        </td>
        `;
    }

    code += `
    </table></center></td></tr>
    <tr><td style="color: #7f8c8d; padding-top: 6px; padding-bottom: 10px; text-align: right;" align="right">10 - Très satisfait</td></tr>
    </table>
    </div>
    </div>
    `;

    return code;
}

function getBackgroundColor(i) {
    if (i <= 3) return "#f13a29";
    else if (i <= 6) return "#e88d08";
    else if (i <= 8) return "#e8c507";
    else return "#7cbe1d";
}
