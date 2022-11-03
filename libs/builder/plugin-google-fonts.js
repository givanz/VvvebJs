GoogleFontsManager = {
	url: "https://fonts.googleapis.com/css2?display=swap&family=",
	activeFonts: [],	

	updateFontList: function () {
		let googleFontsLink = $("#google-fonts-link", Vvveb.Builder.frameHead);

		if (this.activeFonts.length == 0) {
			googleFontsLink.remove();
			return;
		}

		if (googleFontsLink.length < 1) {
			googleFontsLink = $(`<link id="google-fonts-link" href="" rel="stylesheet">`);
			Vvveb.Builder.frameHead.append(googleFontsLink);
		}
		
		googleFontsLink.attr("href", this.url + this.activeFonts.join("&family="));
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
$.ajax({
	url: Vvveb.baseUrl + "../../resources/google-fonts.json",
	cache: true,
	dataType: "json",
	success: function(data) {
		//let json = JSON.parse(data);
		googleFonts = data ;
		//let fontSelect = $("#font-familly");
		
		let fontSelect = $("<optgroup label='Google Fonts'></optgroup>");
		for (font in googleFonts) {
			googlefontNames.push({"text":font, "value":font, "data-provider": "google"});
			let option = new Option(font, font);
			option.dataset.provider = "google";
			//option.style.setProperty("font-family", font);
			fontSelect.append(option);
		}
		$("#font-family").append(fontSelect);	

		let list = Vvveb.Components.getProperty("_base", "font-family");
		if (list) {
			list.onChange = function (node,value, input, component) {
				let option = input.options[input.selectedIndex];
				Vvveb.FontsManager.addFont(option.dataset.provider, value, node);
				return node;
			};
			
			list.data.options.push({optgroup:"Google Fonts"});
			list.data.options = list.data.options.concat(googlefontNames);

			Vvveb.Components.updateProperty("_base", "font-family", {data:list.data});
			
			//update default font list
			fontList = list.data.options;
		}
	}
});
