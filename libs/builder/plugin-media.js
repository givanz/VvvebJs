var ImageInput = $.extend({}, ImageInput, {

    events: [
        ["change", "onChange", "input[type=text]"],
        ["click", "onClick", "button"],
        ["click", "onClick", "img"],
	 ],

	setValue: function(value) {
		if (value.indexOf("data:image") == -1 && value != "none")
		{
				$('input[type="text"]', this.element).val(value);
				$('img', this.element).attr("src",value);
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
	
	onUpload: function(event, node) {
		
		if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
            //reader.readAsBinaryString(this.files[0]);
            file = this.files[0];
        }

		function imageIsLoaded(e) {
				
				image = e.target.result;
				
				var formData = new FormData();
				formData.append("file", file);
				formData.append("mediaPath", Vvveb.MediaModal.mediaPath + Vvveb.MediaModal.currentPath);
				formData.append("onlyFilename", true);
    
				$.ajax({
					type: "POST",
					url: 'upload.php',//set your server side upload script url
					data: formData,
					processData: false,
					contentType: false,
					success: function (data) {
						Vvveb.MediaModal.addFile(
						{
							name:data,
							type:"file",
							path: Vvveb.MediaModal.currentPath + "/" + data,
							size:1
						}, 
						true);
					},
					error: function (data) {
						alert(data.responseText);
					}
				});		
		}
	},
		
    
    onClick: function(e, element) {
		let modal = Vvveb.MediaModal;
		if (!modal) {
			modal = new MediaModal(true);
			modal.mediaPath = window.mediaPath;
		}
		
		modal.open(this);        
		
		if (!Vvveb.MediaModal) {
			$(".filemanager input[type=file]").on("change", ImageInput.onUpload);
		}
		
		Vvveb.MediaModal = modal;
    },
    
	init: function(data) {
		return this.render("imageinput-gallery", data);
	},
  }
);
