var pseudorentre = false;
var couleurchoisie = "aucune";

$(document).ready(function() {
	$("#boutonpseudo").on("click", () => {
		var pseudo = $("#pseudo").val();
		if(pseudo!="") {
			if($("#titre").text()=="Joueur 1") {
				localStorage.setItem("pseudo_joueur1",pseudo);
			}
			if($("#titre").text()=="Joueur 2") {
				localStorage.setItem("pseudo_joueur2",pseudo);
			}
			$("#pseudo").attr("readonly",true);
			$("#boutonpseudo").css("display","none").off();
			pseudorentre = true;
		}
		else {
			alert("Veuillez rentrer un pseudo")
		}
	});
	var colorelements = $(".color");
	for(i=0;i<colorelements.length;i++) {
		$(colorelements[i]).on("click",function() {
			var largeur = $(this).css("width");
			if((couleurchoisie=="aucune")||(couleurchoisie==($(this).attr("id")))) {
				if(largeur=="50px") {
					$(this).css({
						"width":"25px",
						"height":"25px"
					});
					couleurchoisie = "aucune";
				}
				else {
					$(this).css({
						"width":"50px",
						"height":"50px"
					});
					couleurchoisie = $(this).attr("id");
				}
			}
			else {
				alert("Vous avez déjà selectionner une couleur !");
			}

		});
	}
	$("#boutoncouleur").on("click",function(){
		if(couleurchoisie!="aucune") {
			var color;
			switch(couleurchoisie) {
				case "rouge":

					break;
			}
			localStorage.setItem("couleurbateau",couleurchoisie);
			$("#boutoncouleur").css("display","none").off();
		}
		else {
			alert("Vous n'avez pas selectionner de couleur");
		}
	});
	$("#boutonchoixbateaux").on("click",function(){
		if((pseudorentre==true)&&(couleurchoisie!="aucune")) {
			if($("#titre").text()=="Joueur 1") {
				document.location.href="choixbateauxplayer1.html";
			}
			if($("#titre").text()=="Joueur 2") {
				document.location.href="choixbateauxplayer2.html";
			}
		}
	})
});
