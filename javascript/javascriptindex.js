function debut() {
	var boutoncommencer = document.getElementById("commencer");
	boutoncommencer.addEventListener("click", () => {
		document.location.href="html/formulaireplayer1.html"
	});
}

window.addEventListener("load",debut);//Lance le programme lorsque la page est entièrement chargée
