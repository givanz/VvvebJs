GoogleFontsManager = {
	url: "https://fonts.googleapis.com/css2?display=swap&family=",
	activeFonts: [],	

	updateFontList: function () {
		let googleFontsLink = Vvveb.Builder.frameHead.querySelector("google-fonts-link");

		if (this.activeFonts.length == 0) {
			googleFontsLink.remove();
			return;
		}

		if (!googleFontsLink) {
			googleFontsLink = generateElements(`<link id="google-fonts-link" href="" rel="stylesheet">`)[0];
			Vvveb.Builder.frameHead.append(googleFontsLink);
		}

		googleFontsLink.setAttribute("href", this.url + this.activeFonts.join("&family="));
	},
	
	removeFont: function (fontName) {
		let index = this.activeFonts.indexOf(fontName);
		this.activeFonts.splice(index, 1);
		this.updateFontList();
	},
	
	addFont: function (fontName) {
		this.activeFonts.push(fontName);
		this.updateFontList();
	}
}


Vvveb.FontsManager.addProvider("google", GoogleFontsManager);
	
let googleFonts = {};
let googlefontNames = [];
//load google fonts list and update wyswyg font selector and style tab font-family list
fetch(Vvveb.baseUrl + "../../resources/google-fonts.json")
.then((response) => {
	if (!response.ok) { throw new Error(response) }
	return response.json()
})
.then((data) => {
	Vvveb.FontsManager.addFontList("google", "Google Fonts", data);
})
.catch(error => {
	console.log(error.statusText);
	displayToast("bg-danger", "Error", "Error loading google fonts!");
});
