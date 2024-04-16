ImageInput = { ...ImageInput, ...{

	tag: "img",
	
    events: [
        ["change", "onImageChange", "input[type=text]"],
        ["click", "onClick", "button"],
        ["click", "onClick", "img"],
	 ],

	setValue: function(value) {
		if (value && value.indexOf("data:image") == -1 && value != "none") {
				this.element[0].querySelector('input[type="text"]').value = value;
				//$('input[type="text"]', this.element).val(value);
				let src = (value.indexOf("//") > -1 || value.indexOf("media/") > -1 || value.indexOf("image-cache/") > -1 ? '' : Vvveb.themeBaseUrl) + value
				this.element[0].querySelector(this.tag).src = src;
				//$(this.tag, this.element).attr("src", src);
		} else {
			this.element[0].querySelector(this.tag).src = Vvveb.baseUrl + 'icons/image.svg';
			///$(this.tag, this.element).attr("src", Vvveb.baseUrl + 'icons/image.svg');
		}
	},

    onImageChange: function(event, node, input) {
		//set initial relative path
		let self = this;
		let src = self.value;
		let tag = input.tag;

		let img = node.querySelector(tag);
		if (img.src) {
			src = img.getAttribute("src");
		}
		
		if (src) {
			input.value = src;
			input.onChange.call(self, event, node, input);
			//e.data.element.trigger('propertyChange', [src, this]);
		}
		
		//reselect image after loading to adjust highlight box size
		let onLoad = function () {
				if (Vvveb.Builder.selectedEl) {
					Vvveb.Builder.selectedEl.click();
				}
		};
		
		Vvveb.Builder.selectedEl.addEventListener("load", onLoad);
	},
		
    
    onClick: function(e, element) {
		if (!Vvveb.MediaModal) {
			Vvveb.MediaModal = new MediaModal(true);
			Vvveb.MediaModal.mediaPath = window.mediaPath;
		}
		
		Vvveb.MediaModal.open(this);        
    },
    
	init: function(data) {
		return this.render("imageinput-gallery", data);
	},
  }
}

VideoInput = { ...ImageInput, ...{
	tag:"video",

    events: [
        ["change", "onChange", "input[type=text]"],
        ["click", "onClick", "button"],
        ["click", "onClick", "video"],
	 ],

	
	init: function(data) {
		return this.render("videoinput-gallery", data);
	},
  }
}
