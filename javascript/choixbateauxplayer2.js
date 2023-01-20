var stockagepositionsplayer2 = [];
var ordrelettres = ["A","B","C","D","E","F","G","H","I","J"];

$(document).ready(function() {
  var typeplacement = "vertical";
  localStorage.setItem("bateauchoisi","porteavions");
  localStorage.setItem("porteavions","paschoisi");
  localStorage.setItem("croiseur","paschoisi");
  localStorage.setItem("torpilleur","paschoisi");
  localStorage.setItem("sousmarin","paschoisi");
  localStorage.setItem("contretorpilleur","paschoisi");
  localStorage.setItem("taillebateau",5)
  var tab = $("#types").children();
  var couleurbateau = localStorage.getItem("couleurbateau");
  stockagepositionsplayer2[0]={};stockagepositionsplayer2[1]={};stockagepositionsplayer2[2]={};stockagepositionsplayer2[3]={};stockagepositionsplayer2[4]={};
  stockagepositionsplayer2[0].nombateau = "porteavions";stockagepositionsplayer2[1].nombateau = "croiseur";stockagepositionsplayer2[2].nombateau = "contretorpilleur";stockagepositionsplayer2[3].nombateau = "sousmarin";stockagepositionsplayer2[4].nombateau = "torpilleur";
  for(g=0;g<5;g++) {
	  stockagepositionsplayer2[g].numero = [];
    stockagepositionsplayer2[g].lettre = [];
    /*stockagepositionsplayer2[g].vertical_lettre_ref = "";
    stockagepositionsplayer2[g].horizontal_numero_ref = "";
    stockagepositionsplayer2[g].typeplacement = "vertical";*/
  }
  for(i=0;i<tab.length;i++) {
    var bateau = tab[i];
    switch(bateau.id) {
      case "porteavions":
        $("<input>").attr("class","dejachoisi").attr("value","Porte-avions").attr("id","boutonporteavions").attr("type","button").appendTo(String("#"+bateau.id)).on("click",function(){
          if($(this).attr("class")=="dejachoisi") {
            $(this).attr("class","paschoisi");
          }
          else {
            $(".dejachoisi").attr("class","paschoisi");
            $(this).attr("class","dejachoisi");
            var bateauchoisi = $(this).parent().attr("id");
            localStorage.setItem("bateauchoisi","porteavions");
			      localStorage.setItem("porteavions","paschoisi");
            localStorage.setItem("taillebateau",5);
          }
        });
        creationbateaux(5,couleurbateau,String(bateau.id));
        break;
      case "croiseur":
        $("<input>").attr("class","paschoisi").attr("value","Croiseur").attr("id","boutoncroiseur").attr("type","button").appendTo(String("#"+bateau.id)).on("click",function(){
          if($(this).attr("class")=="dejachoisi") {
            $(this).attr("class","paschoisi");
          }
          else {
            $(".dejachoisi").attr("class","paschoisi");
            $(this).attr("class","dejachoisi");
            var bateauchoisi = $(this).parent().attr("id");
            localStorage.setItem("bateauchoisi","croiseur");
			localStorage.setItem("croiseur","paschoisi");
            localStorage.setItem("taillebateau",4);
          }
        });
        creationbateaux(4,couleurbateau,String(bateau.id));
        break;
      case "contretorpilleur":
        $("<input>").attr("class","paschoisi").attr("value","Contre-torpilleur").attr("id","boutoncontretorpilleur").attr("type","button").appendTo(String("#"+bateau.id)).on("click",function(){
          if($(this).attr("class")=="dejachoisi") {
            $(this).attr("class","paschoisi");
          }
          else {
            $(".dejachoisi").attr("class","paschoisi");
            $(this).attr("class","dejachoisi");
            var bateauchoisi = $(this).parent().attr("id");
            localStorage.setItem("bateauchoisi","contretorpilleur");
			localStorage.setItem("contretorpilleur","paschoisi");
            localStorage.setItem("taillebateau",3);
          }
        });
        creationbateaux(3,couleurbateau,String(bateau.id));
        break;
      case "sousmarin":
        $("<input>").attr("class","paschoisi").attr("value","Sous-marin").attr("id","boutonsousmarin").attr("type","button").appendTo(String("#"+bateau.id)).on("click",function(){
          if($(this).attr("class")=="dejachoisi") {
            $(this).attr("class","paschoisi");
          }
          else {
            $(".dejachoisi").attr("class","paschoisi");
            $(this).attr("class","dejachoisi");
            var bateauchoisi = $(this).parent().attr("id");
            localStorage.setItem("bateauchoisi","sousmarin");
			localStorage.setItem("sousmarin","paschoisi");
            localStorage.setItem("taillebateau",3);
          }
        });
        creationbateaux(3,couleurbateau,String(bateau.id));
        break;
      case "torpilleur":
        $("<input>").attr("class","paschoisi").attr("value","Torpilleur").attr("id","boutontorpilleur").attr("type","button").appendTo(String("#"+bateau.id)).on("click",function(){
          if($(this).attr("class")=="dejachoisi") {
            $(this).attr("class","paschoisi");
          }
          else {
            $(".dejachoisi").attr("class","paschoisi");
            $(this).attr("class","dejachoisi");
            var bateauchoisi = $(this).parent().attr("id");
            localStorage.setItem("bateauchoisi","torpilleur");
			localStorage.setItem("torpilleur","paschoisi");
            localStorage.setItem("taillebateau",2);
          }
        });
        creationbateaux(2,couleurbateau,String(bateau.id));
        break;
    }
  }
  //Génération des lignes
  generationlignes();
    $("#changementypeplacement").on("click",() => {
      if(typeplacement=="vertical") {
        typeplacement = "horizontal";
        $("#changementypeplacement").attr("value","H");
      }
      else {
        typeplacement = "vertical";
        $("#changementypeplacement").attr("value","V");
      }
    });
      //Placement des bateaux
      $(".casenormal_paschoisi").each(function(){
        $(this).on("click",function(){
          var element = $(this).attr("id").split("_");
          var bateauchoisi = localStorage.getItem("bateauchoisi");
          var taillebateau = parseInt(localStorage.getItem("taillebateau"));
          var lettre = element[1];
          var numero = parseInt(element[2]);
          var numerolettre;
          var couleurchoisie = localStorage.getItem("couleurbateau");
          switch(lettre) {
            case "A":
              numerolettre = 0;
              break;
            case "B":
              numerolettre = 1;
              break;
            case "C":
              numerolettre = 2;
              break;
            case "D":
              numerolettre = 3;
              break;
            case "E":
              numerolettre = 4;
              break;
            case "F":
              numerolettre = 5;
              break;
            case "G":
              numerolettre = 6;
              break;
            case "H":
              numerolettre = 7;
              break;
            case "I":
              numerolettre = 8;
              break;
            case "J":
              numerolettre = 9;
              break;
          }
          //CLICK VERTICAL
          if(typeplacement=="vertical") {
        	  var statut = "ok";
        	  var statutbateau = localStorage.getItem(bateauchoisi);
        	  if(statutbateau=="paschoisi") {
        			for(i=numero;(i<numero+taillebateau)&&(statut=="ok");i++) {
        				if($(String("#case_"+lettre+"_"+i)).attr("class")=="casenormal_paschoisi") {
        					statut = "ok";
        				}
        				else {
        					statut = "pasok";
        				}
        		   }
        		    if(statut=="ok") {
        				var numerobateau;
        				var tabnumber = 0;
        				switch(bateauchoisi) {
        					case "porteavions":
        						numerobateau = 0;
        						break;
        					case "croiseur":
        						numerobateau = 1;
        						break;
        					case "contretorpilleur":
        						numerobateau = 2;
        						break;
        					case "sousmarin":
        						numerobateau = 3;
        						break;
        					case "torpilleur":
        						numerobateau = 4;
        						break;

        				}
        				  for(i=numero;i<parseInt(numero+taillebateau);i++) {
        					$(String("#case_"+lettre+"_"+i)).css("background-color",couleurchoisie).attr("class","casenormal_choisie");
        					stockagepositionsplayer2[numerobateau].numero[tabnumber] = i;
        					tabnumber++;
                  }
                  stockagepositionsplayer2[numerobateau].lettre = lettre;
                  stockagepositionsplayer2[numerobateau].typeplacement = "vertical";
        				  localStorage.setItem(bateauchoisi,"dejachoisi");
                  checkPlacement();
        		    }
        	  }
        	  else {
        		  alert("bateau déjà placé");
        	  }
          }
          //CLICK HORIZONTAL
          else {
            var statutbateau = localStorage.getItem(bateauchoisi);
            if(statutbateau=="paschoisi") {
              var statut;
              for(i=numerolettre;i<parseInt(numerolettre+taillebateau);i++) {
                if($(String("#case_"+ordrelettres[i]+"_"+numero)).attr("class")=="casenormal_paschoisi") {
                  statut = "ok";
                }
                else {
                  statut ="pasok";
                  return;
                }
              }
              if(statut="ok") {
                switch(bateauchoisi) {
        					case "porteavions":
        						numerobateau = 0;
        						break;
        					case "croiseur":
        						numerobateau = 1;
        						break;
        					case "contretorpilleur":
        						numerobateau = 2;
        						break;
        					case "sousmarin":
        						numerobateau = 3;
        						break;
        					case "torpilleur":
        						numerobateau = 4;
        						break;

        				}
                stockagepositionsplayer2[numerobateau].typeplacement = "horizontal";
                stockagepositionsplayer2[numerobateau].horizontal_numero_ref = numero;
                var tabnumber = 0;
                for(i=numerolettre;i<parseInt(numerolettre+taillebateau);i++) {
                  $(String("#case_"+ordrelettres[i]+"_"+numero)).css("background-color",couleurchoisie).attr("class","casenormal_choisie");
      					  stockagepositionsplayer2[numerobateau].lettre[tabnumber] = ordrelettres[i];
      					  tabnumber++;
                }
                localStorage.setItem(bateauchoisi,"dejachoisi");
                checkPlacement();
              }
            }
            else {
      		      alert("bateau déjà placé");
      	    }
          }
        });
        $(this).hover(function(){
          var element = $(this).attr("id").split("_");
          var bateauchoisi = localStorage.getItem("bateauchoisi");
          var taillebateau = parseInt(localStorage.getItem("taillebateau"));
          var lettre = element[1];
          var numero = parseInt(element[2]);
          var couleurchoisie = localStorage.getItem("couleurbateau");
          switch(lettre) {
            case "A":
              numerolettre = 0;
              break;
            case "B":
              numerolettre = 1;
              break;
            case "C":
              numerolettre = 2;
              break;
            case "D":
              numerolettre = 3;
              break;
            case "E":
              numerolettre = 4;
              break;
            case "F":
              numerolettre = 5;
              break;
            case "G":
              numerolettre = 6;
              break;
            case "H":
              numerolettre = 7;
              break;
            case "I":
              numerolettre = 8;
              break;
            case "J":
              numerolettre = 9;
              break;
          }

          var newcolor;

          switch(couleurchoisie) {
            case "rouge":
              newcolor = "red";
              break;
            case "bleu":
              newcolor = "blue";
              break;
            case "vert":
              newcolor = "green";
              break;
            case "orange":
              newcolor = "orange";
              break;
            case "violet":
              newcolor = "purple";
              break;
          }

          //MOUSE_ENTER VERTICAL
          if(typeplacement=="vertical") {
          	for(i=numero;i<numero+taillebateau;i++) {
          		if($(String("#case_"+lettre+"_"+i)).attr("class")=="casenormal_paschoisi") {
          			$(String("#case_"+lettre+"_"+i)).css("background-color",newcolor);
          		}
            }
          }
          //MOUSE_ENTER HORIZONTAL
          else {
            for(i=numerolettre;i<parseInt(numerolettre+taillebateau);i++) {
              if($(String("#case_"+ordrelettres[i]+"_"+numero)).attr("class")=="casenormal_paschoisi") {
          			$(String("#case_"+ordrelettres[i]+"_"+numero)).css("background-color",newcolor);
          		}
            }
          }
    	},function(){
          var element = $(this).attr("id").split("_");
          var bateauchoisi = localStorage.getItem("bateauchoisi");
          var taillebateau = parseInt(localStorage.getItem("taillebateau"));
          var lettre = element[1];
          var numero = parseInt(element[2]);
          var couleurchoisie = localStorage.getItem("couleurbateau");
          var taillebateau = parseInt(localStorage.getItem("taillebateau"));
          switch(lettre) {
            case "A":
              numerolettre = 0;
              break;
            case "B":
              numerolettre = 1;
              break;
            case "C":
              numerolettre = 2;
              break;
            case "D":
              numerolettre = 3;
              break;
            case "E":
              numerolettre = 4;
              break;
            case "F":
              numerolettre = 5;
              break;
            case "G":
              numerolettre = 6;
              break;
            case "H":
              numerolettre = 7;
              break;
            case "I":
              numerolettre = 8;
              break;
            case "J":
              numerolettre = 9;
              break;
          }
          //MOUSE_OVER VERTICAL
          if(typeplacement=="vertical") {
        		for(i=numero;i<numero+taillebateau;i++) {
        			if($(String("#case_"+lettre+"_"+i)).attr("class")=="casenormal_paschoisi") {
        				$(String("#case_"+lettre+"_"+i)).css("background-color","white");
        			}
        		}
          }
          //MOUSE_OVER HORIZONTAL
          else {
            for(i=numerolettre;i<parseInt(numerolettre+taillebateau);i++) {
              if($(String("#case_"+ordrelettres[i]+"_"+numero)).attr("class")=="casenormal_paschoisi") {
          			$(String("#case_"+ordrelettres[i]+"_"+numero)).css("background-color","white");
          		}
            }
          }
    	});
      });
    });

function checkPlacement() {
      let etat_choix_porteavions = localStorage.getItem("porteavions");
      let etat_choix_croiseur = localStorage.getItem("croiseur");
      let etat_choix_contretorpilleur = localStorage.getItem("contretorpilleur");
      let etat_choix_sousmarin = localStorage.getItem("sousmarin");
      let etat_choix_torpilleur = localStorage.getItem("torpilleur");

      console.log(etat_choix_contretorpilleur);

      if((etat_choix_porteavions=="dejachoisi")&&(etat_choix_croiseur=="dejachoisi")&&(etat_choix_contretorpilleur=="dejachoisi")&&(etat_choix_sousmarin=="dejachoisi")&&(etat_choix_torpilleur=="dejachoisi")) {
        localStorage.setItem("stockagepositionsplayer2",JSON.stringify(stockagepositionsplayer2));

        $("<input>").attr({
          type:"button",
          value:"Jouer",
          id:"skip_choixbateau"
        }).appendTo("#box").on("click",() => {
          document.location.href = "jouer.html";
        });
      }
}

function creationbateaux(taille,couleur,parent) {
  var newcolor;
  $("<div>").appendTo((String("#"+parent))).attr("id",String("cases"+parent)).attr("class","emplacementcases");
  switch(couleur) {
    case "rouge":
      newcolor = "red";
      break;
    case "bleu":
      newcolor = "blue";
      break;
    case "vert":
      newcolor = "green";
      break;
    case "orange":
      newcolor = "orange";
      break;
    case "violet":
      newcolor = "purple";
      break;
  }
  for(y=1;y<=taille;y++) {
    $("<div>").appendTo(String("#cases"+parent)).attr("class","casetype").css("background-color",newcolor);
  }
}

function generationlignes(couleur) {
    $("<div>").attr("id","lettres").attr("class","ligne").appendTo("#plateau");
    generationcolonnes("lettres");
    for(k=1;k<=10;k++) {
      $("<div>").attr("id",String("ligne"+k)).attr("class","ligne").appendTo("#plateau");
      generationcolonnes("nombres",k);
    }
    $(".casenormal").attr("type","button");
}


function generationcolonnes(type,numeroligne) {
  if(type=="lettres") {
    for(x=1;x<=11;x++) {
      switch(x) {
        case 1:
          $("<input>").attr("id","changementypeplacement").attr("type","button").attr("class","casenumeroplateau").attr("value","V").appendTo("#lettres");
          break;
        case 2:
          $("<div>").text("A").attr("class","casenumeroplateau").appendTo("#lettres");
          break;
        case 3:
          $("<div>").text("B").attr("class","casenumeroplateau").appendTo("#lettres");
          break;
        case 4:
          $("<div>").text("C").attr("class","casenumeroplateau").appendTo("#lettres");
          break;
        case 5:
          $("<div>").text("D").attr("class","casenumeroplateau").appendTo("#lettres");
          break;
        case 6:
          $("<div>").text("E").attr("class","casenumeroplateau").appendTo("#lettres");
          break;
        case 7:
          $("<div>").text("F").attr("class","casenumeroplateau").appendTo("#lettres");
          break;
        case 8:
          $("<div>").text("G").attr("class","casenumeroplateau").appendTo("#lettres");
          break;
        case 9:
          $("<div>").text("H").attr("class","casenumeroplateau").appendTo("#lettres");
          break;
        case 10:
          $("<div>").text("I").attr("class","casenumeroplateau").appendTo("#lettres");
          break;
        case 11:
          $("<div>").text("J").attr("class","casenumeroplateau").appendTo("#lettres");
          break;
      }
    }
  }
  else {
    for(x=1;x<=11;x++) {
      switch(x) {
        case 1:
          $("<div>").text(numeroligne).attr("class","casenumeroplateau").appendTo(String("#ligne"+numeroligne));
          break;
        case 2:
          $("<button>").attr("class","casenormal_paschoisi").attr("type","button").attr("id",String("case_A_"+numeroligne)).appendTo(String("#ligne"+numeroligne));
          break;
        case 3:
          $("<button>").attr("class","casenormal_paschoisi").attr("type","button").attr("id",String("case_B_"+numeroligne)).appendTo(String("#ligne"+numeroligne));
          break;
        case 4:
          $("<button>").attr("class","casenormal_paschoisi").attr("type","button").attr("id",String("case_C_"+numeroligne)).appendTo(String("#ligne"+numeroligne));
          break;
        case 5:
          $("<button>").attr("class","casenormal_paschoisi").attr("type","button").attr("id",String("case_D_"+numeroligne)).appendTo(String("#ligne"+numeroligne));
          break;
        case 6:
          $("<button>").attr("class","casenormal_paschoisi").attr("type","button").attr("id",String("case_E_"+numeroligne)).appendTo(String("#ligne"+numeroligne));
          break;
        case 7:
          $("<button>").attr("class","casenormal_paschoisi").attr("type","button").attr("id",String("case_F_"+numeroligne)).appendTo(String("#ligne"+numeroligne));
          break;
        case 8:
          $("<button>").attr("class","casenormal_paschoisi").attr("type","button").attr("id",String("case_G_"+numeroligne)).appendTo(String("#ligne"+numeroligne));
          break;
        case 9:
          $("<button>").attr("class","casenormal_paschoisi").attr("type","button").attr("id",String("case_H_"+numeroligne)).appendTo(String("#ligne"+numeroligne));
          break;
        case 10:
          $("<button>").attr("class","casenormal_paschoisi").attr("type","button").attr("id",String("case_I_"+numeroligne)).appendTo(String("#ligne"+numeroligne));
          break;
        case 11:
          $("<button>").attr("class","casenormal_paschoisi").attr("type","button").attr("id",String("case_J_"+numeroligne)).appendTo(String("#ligne"+numeroligne));
          break;
      }
    }
  }
};
