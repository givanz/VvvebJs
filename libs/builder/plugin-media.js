var ImageInput = $.extend({}, ImageInput, {

    events: [
        ["change", "onChange", "input[type=text]"],
        ["click", "onClick", "button"],
        ["click", "onClick", "img"],
	 ],

	setValue: function(value) {
		if (value && value.indexOf("data:image") == -1 && value != "none") {
			$('input[type="text"]', this.element).val(value);
			$('img', this.element).attr("src",(value.indexOf("//") > -1 || value.indexOf("media/") > -1? '' : Vvveb.themeBaseUrl) + value);
		} else {
			$('img', this.element).attr("src", Vvveb.baseUrl + 'icons/image.svg');
		}
	},

    onChange: function(e, node) {
		//set initial relative path
		let src = this.value;
		
		delay(() => { 
			//get full image path
			let img = $("img", e.data.element).get(0);
			
			if (img.src) {
				src = img.src;
			}
			
			if (src) {
			    e.data.element.trigger('propertyChange', [src, this]);
			}
		}, 500);
		
		//e.data.element.trigger('propertyChange', [src, this]);
		
		//reselect image after loading to adjust highlight box size
		Vvveb.Builder.selectedEl.get(0).onload = function () {
				if (Vvveb.Builder.selectedEl) {
					Vvveb.Builder.selectedEl.click();
				}
		};
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
);
