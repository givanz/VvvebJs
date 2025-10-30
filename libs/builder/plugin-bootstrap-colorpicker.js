let ColorInput = { ...ColorInput, ...{

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		let color = this.rgb2hex(value);
		document.querySelector('input', this.element).value
		document.querySelector('i', this.element).style.backgroundColor = value;
	},
	
	init: function(data) {
		let colorinput = this.render("bootstrap-color-picker-input", data);
		let colorpicker = document.querySelector('.input-group', colorinput).colorpicker();
		return colorinput;
	},
  }
};

