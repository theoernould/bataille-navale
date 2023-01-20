
// ATTENTION, PROBLEME AVEC LA DESTRUCTION DES BATEAUX !

// Récupération des positions des bateaux des deux joueurs
var stockagepositionsplayer1 = JSON.parse(localStorage.getItem("stockagepositionsplayer1"));// JSON.parse sert à décoder le tableau stocker dans le localStorage
var stockagepositionsplayer2 = JSON.parse(localStorage.getItem("stockagepositionsplayer2"));

// Récupération des pseudos des bateaux des deux joueurs
var pseudo_joueur1 = localStorage.getItem("pseudo_joueur1");
var pseudo_joueur2 = localStorage.getItem("pseudo_joueur2");

// Tableau reliant nombres et lettres pour l'utiliser dans le placement des bateaux
var ordrelettres = ["A","B","C","D","E","F","G","H","I","J"];

// On définit que c'est le joueur 1 qui commence
var tour_joueur = "joueur1";

// On prépare le tableau qui stockera toutes les cases détruites
var liste_cases_detruites_player1 = [];
var liste_cases_detruites_player2 = [];

// On prépare le tableau qui stockera les bateaux détruits uniquement et pas les cases qui ont été touchées mais qui étaient vides
var liste_bateaux_detruits_player1 = [];
var liste_bateaux_detruits_player2 = [];

// Variables pour rentrer des valeurs dans les tableaux ci-dessus
var avancement_destruction_player1 = 0;
var avancement_destruction_player2 = 0;

// Ce tableau correspond à l'état des bateaux du joueur 1
var w1 = [];

    w1[0] = [];
    w1[1] = [];
    w1[2] = [];
    w1[3] = [];
    w1[4] = [];

    w1[0].value = 0;
    w1[0].max = 4;
    w1[0].nom = "porteavions";
    w1[0].etat = "intact";

    w1[1].value = 0;
    w1[1].max = 3;
    w1[1].nom = "croiseur";
    w1[1].etat = "intact";

    w1[2].value = 0;
    w1[2].max = 2;
    w1[2].nom = "torpilleur";
    w1[2].etat = "intact";

    w1[3].value = 0;
    w1[3].max = 2;
    w1[3].nom = "contretorpilleur";
    w1[3].etat = "intact";

    w1[4].value = 0;
    w1[4].max = 1;
    w1[4].nom = "sousmarin";
    w1[4].etat = "intact";

// Ce tableau correspond à l'état des bateaux du joueur 2
var w2 = [];

    w2[0] = [];
    w2[1] = [];
    w2[2] = [];
    w2[3] = [];
    w2[4] = [];

    w2[0].value = 0;
    w2[0].max = 4;
    w2[0].nom = "porteavions";
    w2[0].etat = "intact";

    w2[1].value = 0;
    w2[1].max = 3;
    w2[1].nom = "croiseur";
    w2[1].etat = "intact";

    w2[2].value = 0;
    w2[2].max = 3;
    w2[2].nom = "torpilleur";
    w2[2].etat = "intact";

    w2[3].value = 0;
    w2[3].max = 2;
    w2[3].nom = "contretorpilleur";
    w2[3].etat = "intact";

    w2[4].value = 0;
    w2[4].max = 1;
    w2[4].nom = "sousmarin";
    w2[4].etat = "intact";

$(document).ready(function() {
  // Fait en sorte qu'il n'y ait que le bouton JOUER dès que l'utilisateur arrive sur la page
  $("#plateau").css("display","none");
  $("#titre").css("display","none");
  $("#jouer").on("click",() => {
      $("#titre").css("display","block").text("Au tour de "+pseudo_joueur1);
      $("#plateau").css("display","flex");
      $("#jouer").css("display","none");
      generationlignes();
      generationBateauxPlayer2();
      Listener();
  });
});

// Ajoute un EventListener sur chaque case du plateau de jeu
function Listener() {
  $("#plateau button:not(.casenumeroplateau)").each(function() {
    $(this).on("click",function() {
        if(tour_joueur=="joueur1") {
            // "Classe" correspond à l'attribut classe de la case
            var classe = $(this).attr("class");
            var numtab;
            if(classe!="casenormal_paschoisi") {
                switch(classe) {
                    case "porteavions":
                        numtab = 0;
                        break;
                    case "croiseur":
                        numtab = 1;
                        break;
                    case "torpilleur":
                        numtab = 2;
                        break;
                    case "contretorpilleur":
                        numtab = 3;
                        break;
                    case "sousmarin":
                        numtab = 4;
                        break;
                }
                $(this).css("background-color","red").attr("class","case_"+classe+"_detruit");
                    var avancement_bateau = w2[numtab].value;
                    var max = w2[numtab].max;
                    if(avancement_bateau<max) {
                        w2[numtab].value = parseInt(avancement_bateau+1);
                        var img = $("<img>").attr("src","../donnees/croix.png");
                        $(this).append(img);
                        liste_cases_detruites_player1[avancement_destruction_player1] = $(this).attr("id");
                        liste_bateaux_detruits_player1[avancement_destruction_player1] = $(this).attr("id");
                        avancement_destruction_player1++;
                          alert("Vous avez touché le "+classe+" de "+pseudo_joueur2);
                    }
                    else {
                      w2[numtab].etat = "detruit";
                      var img = $("<img>").attr("src","../donnees/croix.png");
                      $(this).append(img);
                      alert("Vous avez détruit le "+classe+" de "+pseudo_joueur2);
                      checkWin();
                    }
            }
            else {
                  if($(this).css("background-color")!="red") {
                    $(this).css("background-color","red").attr("class","case_"+classe+"_detruit");
                      liste_cases_detruites_player1[avancement_destruction_player1] = $(this).attr("id");
                      avancement_destruction_player1++;
                      alert("Vous n'avez pas touché un bateau de votre adversaire")
                  }
                  else {
                    alert("Vous avez déjà touché cette case");
                  }
            }
                // Génération du plateau de l'autre joueur
                removeAll();
                generationlignes();
                generationBateauxPlayer1();
                generationDestructionPlayer2();
                $("#titre").text("Au tour de "+pseudo_joueur2);
                tour_joueur = "joueur2";
                Listener();
        }

        else {
            var classe = $(this).attr("class");
            var numtab;
            if(classe!="casenormal_paschoisi") {
                switch(classe) {
                    case "porteavions":
                        numtab = 0;
                        break;
                    case "croiseur":
                        numtab = 1;
                        break;
                    case "torpilleur":
                        numtab = 2;
                        break;
                    case "contretorpilleur":
                        numtab = 3;
                        break;
                    case "sousmarin":
                        numtab = 4;
                        break;
                }
                $(this).css("background-color","red").attr("class","case_"+classe+"_detruit");
                    var avancement_bateau = w1[numtab].value;
                    var max = w1[numtab].max;
                    if(avancement_bateau<max) {
                        w1[numtab].value = parseInt(avancement_bateau+1);
                        var img = $("<img>").attr("src","../donnees/croix.png");
                        $(this).append(img);
                        liste_cases_detruites_player2[avancement_destruction_player2] = $(this).attr("id");
                        liste_bateaux_detruits_player2[avancement_destruction_player2] = $(this).attr("id");
                        avancement_destruction_player2++;
                          alert("Vous avez touché le "+classe+" de "+pseudo_joueur1);
                    }
                    else {
                      w1[numtab].etat = "detruit";
                      var img = $("<img>").attr("src","../donnees/croix.png");
                      $(this).append(img);
                      alert("Vous avez détruit le "+classe+" de "+pseudo_joueur1);
                      checkWin();
                    }
            }

            else {
                  if($(this).css("background-color")!="red") {
                    $(this).css("background-color","red").attr("class","case_"+classe+"_detruit");
                      liste_cases_detruites_player2[avancement_destruction_player2] = $(this).attr("id");
                      avancement_destruction_player2++;
                      alert("Vous n'avez pas touché un bateau de votre adversaire")
                  }
                  else {
                    alert("Vous avez déjà touché cette case");
                  }
            }

            // Génération du plateau de l'autre joueur
            removeAll();
            generationlignes();
            generationBateauxPlayer2();
            generationDestructionPlayer1();
            $("#titre").text("Au tour de "+pseudo_joueur1);
            tour_joueur = "joueur1";
            Listener();
        }
    });
  });
}

// Affiche les cases précédemment touchées par le joueur adverse
function generationDestructionPlayer1() {
  for(i=0;i<liste_cases_detruites_player1.length;i++) {
    var id = liste_cases_detruites_player1[i];
    $(String("#"+id)).css("background-color","red");
  }

  for(i=0;i<5;i++) {
    if(w2[i].etat=="detruit") {
      // Si un bateau est totalement détruit il va ici afficher toutes les cases correspondantes à celui-ci en noir
      var taillebateau;
      switch(i) {
          case 0 :
              taillebateau = 5;
          break;
          case 1 :
              taillebateau = 4;
          break;
          case 2 :
              taillebateau = 3;
          break;
          case 3 :
              taillebateau = 3;
          break;
          case 4 :
              taillebateau = 2;
          break;
      }
      if(stockagepositionsplayer2[i].typeplacement=="vertical") {

          var nom_bateau = stockagepositionsplayer2[i].nombateau;
          var lettre = stockagepositionsplayer2[i].lettre;
          var numero = stockagepositionsplayer2[i].numero;

          for(x=0;x<numero.length;x++) {
              $(String("#case_"+lettre+"_"+numero[x])).attr("class",String(nom_bateau+"_detruit")).css("background-color","black");
          }

      }

      else {

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

              var numero = stockagepositionsplayer2[i].horizontal_numero_ref;
              var lettres = stockagepositionsplayer2[i].lettre;
              var nom_bateau = stockagepositionsplayer2[i].nombateau;

              for(x=0;x<=lettres.length;x++) {
                $(String("#case_"+lettres[x]+"_"+numero)).attr("class",String(nom_bateau+"_detruit")).css("background-color","black");
              }

      }
    }
    else {
      for(x=0;x<liste_bateaux_detruits_player1.length;x++) {
        var new_id = liste_cases_detruites_player1[x];
        var tabChildrens = $(String("#"+new_id)).children();
        var state = checkIfImgExist(tabChildrens);
        if(state=="ok") {
          var id2 = liste_bateaux_detruits_player1[x];
          $("<img>").attr("src","../donnees/croix.png").appendTo(String("#"+id2));
        }
      }
    }
  }
}

// VERIFIE SI UN DES DEUX JOUEURS A GAGNE ET AFFICHE BRAVO SI OUI

function checkWin() {
  //CHECK VICTOIRE PLAYER1
  var state_bateau1_player2 = w2[0].etat;
  var state_bateau2_player2 = w2[1].etat;
  var state_bateau3_player2 = w2[2].etat;
  var state_bateau4_player2 = w2[3].etat;
  var state_bateau5_player2 = w2[4].etat;
  if(state_bateau1_player2==state_bateau2_player2==state_bateau3_player2==state_bateau4_player2==state_bateau5_player2=="detruit") {
    alert(pseudo_joueur1+" a gagné !");
    setTimeout(function() {
      $("body").children().each(function() {
        $(this).remove();
      });
      $("<div>").text("Bravo "+pseudo_joueur1+" ! Tu as gagné !")
    },5000);
  }

  //CHECK VICTOIRE PLAYER2
  var state_bateau1_player1 = w1[0].etat;
  var state_bateau2_player1 = w1[1].etat;
  var state_bateau3_player1 = w1[2].etat;
  var state_bateau4_player1 = w1[3].etat;
  var state_bateau5_player1 = w1[4].etat;
  if(state_bateau1_player1==state_bateau2_player1==state_bateau3_player1==state_bateau4_player1==state_bateau5_player1=="detruit") {
    alert(pseudo_joueur2+" a gagné !");
    setTimeout(function() {
      $("body").children().each(function() {
        $("body").children().each(function() {
          $(this).remove();
        });
        $("<div>").text("Bravo "+pseudo_joueur2+" ! Tu as gagné !")
      });
    },5000);
  }
}

// Sécurité pour éviter que plusieurs images se créent dans un même bouton
function checkIfImgExist(tabChildrens) {
  if(tabChildrens.length==0) {
    return "ok";
  }
  else {
    return "pasok";
  }
}

function generationDestructionPlayer2() {
  for(i=0;i<liste_cases_detruites_player2.length;i++) {
    var id = liste_cases_detruites_player2[i];
    $(String("#"+id)).css("background-color","red");
  }
  for(i=0;i<5;i++) {
    if(w1[i].etat=="detruit") {
      var taillebateau;
      switch(i) {
          case 0 :
              taillebateau = 5;
          break;
          case 1 :
              taillebateau = 4;
          break;
          case 2 :
              taillebateau = 3;
          break;
          case 3 :
              taillebateau = 3;
          break;
          case 4 :
              taillebateau = 2;
          break;
      }
      if(stockagepositionsplayer1[i].typeplacement=="vertical") {

          var nom_bateau = stockagepositionsplayer1[i].nombateau;
          var lettre = stockagepositionsplayer1[i].lettre;
          var numero = stockagepositionsplayer1[i].numero;

          for(x=0;x<numero.length;x++) {
              $(String("#case_"+lettre+"_"+numero[x])).attr("class",String(nom_bateau+"_detruit")).css("background-color","black");
          }

      }

      else {

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

              var numero = stockagepositionsplayer1[i].horizontal_numero_ref;
              var lettres = stockagepositionsplayer1[i].lettre;
              var nom_bateau = stockagepositionsplayer1[i].nombateau;

              for(x=0;x<=lettres.length;x++) {
                $(String("#case_"+lettres[x]+"_"+numero)).attr("class",String(nom_bateau+"_detruit")).css("background-color","black");
              }

      }
    }
    else {
      for(x=0;x<liste_bateaux_detruits_player2.length;x++) {
        var new_id = liste_cases_detruites_player2[x];
        var tabChildrens = $(String("#"+new_id)).children();
        var state = checkIfImgExist(tabChildrens);
        if(state=="ok") {
          var id2 = liste_bateaux_detruits_player2[x];
          $("<img>").attr("src","../donnees/croix.png").appendTo(String("#"+id2));
        }
      }
    }
  }
}

// Supprime toutes les cases du tableau
function removeAll() {
    $("#plateau").children().each(function() {
        $(this).remove();
    });
}

// Ajoute des ID sur les cases où des bateaux sont placés
function generationBateauxPlayer1() {
  for(i=0;i<stockagepositionsplayer1.length;i++) {
      var taillebateau;
      switch(i) {
          case 0 :
              taillebateau = 5;
          break;
          case 1 :
              taillebateau = 4;
          break;
          case 2 :
              taillebateau = 3;
          break;
          case 3 :
              taillebateau = 3;
          break;
          case 4 :
              taillebateau = 2;
          break;
      }
      if(stockagepositionsplayer1[i].typeplacement=="vertical") {

          var nom_bateau = stockagepositionsplayer1[i].nombateau;
          var lettre = stockagepositionsplayer1[i].lettre;
          var numero = stockagepositionsplayer1[i].numero;

          for(x=0;x<numero.length;x++) {
              $(String("#case_"+lettre+"_"+numero[x])).attr("class",nom_bateau);
          }

      }

      else {

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

              var numero = stockagepositionsplayer1[i].horizontal_numero_ref;
              var lettres = stockagepositionsplayer1[i].lettre;
              var nom_bateau = stockagepositionsplayer1[i].nombateau;

              for(x=0;x<=lettres.length;x++) {
                $(String("#case_"+lettres[x]+"_"+numero)).attr("class",nom_bateau);
              }

      }
  }
}

// Ajoute des ID sur les cases où des bateaux sont placés
function generationBateauxPlayer2() {
  for(i=0;i<stockagepositionsplayer2.length;i++) {
      var taillebateau;
      switch(i) {
          case 0 :
              taillebateau = 5;
          break;
          case 1 :
              taillebateau = 4;
          break;
          case 2 :
              taillebateau = 3;
          break;
          case 3 :
              taillebateau = 3;
          break;
          case 4 :
              taillebateau = 2;
          break;
      }
      if(stockagepositionsplayer2[i].typeplacement=="vertical") {

          var nom_bateau = stockagepositionsplayer2[i].nombateau;
          var lettre = stockagepositionsplayer2[i].lettre;
          var numero = stockagepositionsplayer2[i].numero;

          for(x=0;x<numero.length;x++) {
              $(String("#case_"+lettre+"_"+numero[x])).attr("class",nom_bateau);
          }

      }

      else {

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

              var numero = stockagepositionsplayer2[i].horizontal_numero_ref;
              var lettres = stockagepositionsplayer2[i].lettre;
              var nom_bateau = stockagepositionsplayer2[i].nombateau;

              for(x=0;x<=lettres.length;x++) {
                $(String("#case_"+lettres[x]+"_"+numero)).attr("class",nom_bateau);
              }

      }
  }
}

/*function generationBateauxPlayer1() {
    for(i=0;i<stockagepositionsplayer1.length;i++) {
        var taillebateau;
        switch(i) {
            case 0 :
                taillebateau = 5;
            break;
            case 1 :
                taillebateau = 4;
            break;
            case 2 :
                taillebateau = 3;
            break;
            case 3 :
                taillebateau = 3;
            break;
            case 4 :
                taillebateau = 2;
            break;
        }
        if(stockagepositionsplayer1[i].typeplacement=="vertical") {

            var nom_bateau = stockagepositionsplayer1[i].nombateau;
            var lettre = stockagepositionsplayer1[i].lettre;
            var numero = stockagepositionsplayer1[i].numero;

            for(x=0;x<numero.length;x++) {
                $(String("#case_"+lettre+"_"+numero[x])).attr("class",nom_bateau);
            }

        }

        else {

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

                var numero = stockagepositionsplayer1[i].horizontal_numero_ref;
                var lettres = stockagepositionsplayer1[i].lettre;
                var nom_bateau = stockagepositionsplayer1[i].nombateau;

                for(x=0;x<=lettres.length;x++) {
                  $(String("#case_"+lettres[x]+"_"+numero)).attr("class",nom_bateau);
                }

        }
    }
}

function generationBateauxPlayer2() {
    for(i=0;i<stockagepositionsplayer2.length;i++) {
        var taillebateau;
        switch(i) {
            case 0 :
                taillebateau = 5;
            break;
            case 1 :
                taillebateau = 4;
            break;
            case 2 :
                taillebateau = 3;
            break;
            case 3 :
                taillebateau = 3;
            break;
            case 4 :
                taillebateau = 2;
            break;
        }
        if(stockagepositionsplayer2[i].typeplacement=="vertical") {

            var nom_bateau = stockagepositionsplayer2[i].nombateau;
            var lettre = stockagepositionsplayer2[i].lettre;
            var numero = stockagepositionsplayer2[i].numero;

            for(x=0;x<numero.length;x++) {
                $(String("#case_"+lettre+"_"+numero[x])).attr("class",nom_bateau);
            }

        }

        else {

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

                var numero = stockagepositionsplayer2[i].horizontal_numero_ref;
                var lettres = stockagepositionsplayer2[i].lettre;
                var nom_bateau = stockagepositionsplayer2[i].nombateau;

                for(x=0;x<=lettres.length;x++) {
                  $(String("#case_"+lettres[x]+"_"+numero)).attr("class",nom_bateau);
                }

        }
    }
}*/

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
            $("<div>").text("").attr("class","casenumeroplateau").appendTo("#lettres");
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
