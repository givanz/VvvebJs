let ColorInput = { ...ColorInput, ...{

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		let color = this.rgb2hex(value);
		$('input', this.element).val();
		$('i', this.element).css('background-color', value);
	},
	
	init: function(data) {
		let colorinput = this.render("bootstrap-color-picker-input", data);
		let colorpicker = $('.input-group', colorinput).colorpicker();
		return colorinput;
	},
  }
);

