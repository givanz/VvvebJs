/*
Copyright 2017 Ziadin Givan

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

https://github.com/givanz/VvvebJs
*/

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
