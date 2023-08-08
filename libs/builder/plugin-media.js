var ImageInput = $.extend({}, ImageInput, {

	tag: "img",
	
    events: [
        ["change", "onChange", "input[type=text]"],
        ["click", "onClick", "button"],
        ["click", "onClick", "img"],
	 ],

	setValue: function(value) {
		if (value && value.indexOf("data:image") == -1 && value != "none") {
			$('input[type="text"]', this.element).val(value);
				$(this.tag, this.element).attr("src",(value.indexOf("//") > -1 || value.indexOf("media/") > -1? '' : Vvveb.themeBaseUrl) + value);
		} else {
			$(this.tag, this.element).attr("src", Vvveb.baseUrl + 'icons/image.svg');
		}
	},

    onChange: function(e, node, data) {
		//set initial relative path
		let src = this.value;
		let tag = e.data.input.tag;
		
		delay(() => { 
			//get full image path
			let img = $(tag, e.data.element).get(0);
			
			if (img.src) {
				src = img.getAttribute("src");
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

var VideoInput = $.extend({}, ImageInput, {
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
);
