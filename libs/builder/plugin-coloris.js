let colorisOptions = {
  el: '.coloris',
  theme: 'polaroid',
//  themeMode: 'dark',
  formatToggle: true,
//  closeButton: true,
//  clearButton: true,
/*
  swatches: [
	'#264653',
	'#2a9d8f',
	'#e9c46a',
	'#f4a261',
	'#e76f51',
	'#d62828',
	'#023e8a',
	'#0077b6',
	'#0096c7',
	'#00b4d8',
	'#48cae4'
  ]
*/ 
};

ColorInput = { ...Input, ...{
    
    events: [
        ["change", "onChange", "input"],
	 ],
	 
	setValue: function(value) {
		if (this.element && value) {
			let input = this.element.querySelector('input');
			this.element.style.color = value;

			if (input) { 
				input.value = value;//this.rgb2hex(value);
			}
		}
	},
		
	init: function(data) {
		this.element = this.render("colorinput", data);
		//Coloris({ ...colorisOptions, ...{el: this.element.firstElementChild}});
		return this.element;
	},
  }
};

Coloris(colorisOptions);
