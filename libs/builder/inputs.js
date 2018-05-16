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

var Input = {
	
	init: function(name) {
	},


	onChange: function(event, node) {
		
		if (event.data && event.data.element)
		{
			event.data.element.trigger('propertyChange', [this.value, this]);
		}
	},

	renderTemplate: function(name, data) {
		return tmpl("vvveb-input-" + name, data);
	},

	render: function(name, data) {
		this.element = $(this.renderTemplate(name, data));
		
		//bind events
		if (this.events)
		for (var i in this.events)
		{
			event = this.events[i][0];
			fun = this[ this.events[i][1] ];
			el = this.events[i][2];
		
			this.element.on(event, el, {element: this.element, input:this}, fun);
		}

		return this.element;
	}
};

var TextInput = $.extend({}, Input, {

    events: [
        ["keyup", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);

var CheckboxInput = $.extend({}, Input, {

	onChange: function(event, node) {
		
		if (event.data && event.data.element)
		{
			event.data.element.trigger('propertyChange', [this.checked, this]);
		}
	},

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("checkboxinput", data);
	},
  }
);

var SelectInput = $.extend({}, Input, {
	
    events: [
        ["change", "onChange", "select"],
	 ],
	

	setValue: function(value) {
		$('select', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("select", data);
	},
	
  }
);


var LinkInput = $.extend({}, TextInput, {

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);

var RangeInput = $.extend({}, Input, {

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("rangeinput", data);
	},
  }
);

var NumberInput = $.extend({}, Input, {

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("numberinput", data);
	},
  }
);

var CssUnitInput = $.extend({}, Input, {

	number:0,
	unit:"px",
		
	onChange: function(event) {
		
		if (event.data && event.data.element)
		{
			input = event.data.input;
			input[this.name] = this.value;// this.name = unit or number	
			
			value = "";	
			if (input.unit == "auto")  
			{
				$(event.data.element).addClass("auto"); 
				value = input.unit;
			}
			else 
			{
				$(event.data.element).removeClass("auto"); 
				value = input.number + input.unit;
			}
			
			event.data.element.trigger('propertyChange', [value, this]);
		}
	},
	
    events: [
        ["change", "onChange", "select"],
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		this.number = parseInt(value);
		this.unit = value.replace(this.number, '');
		
		if (this.unit == "auto") $(this.element).addClass("auto");

		$('input', this.element).val(this.number);
		$('select', this.element).val(this.unit);
	},
	
	init: function(data) {
		return this.render("cssunitinput", data);
	},
  }
);

var ColorInput = $.extend({}, Input, {

	 //html5 color input only supports setting values as hex colors even if the picker returns only rgb
	 rgb2hex: function(rgb) {
		 
		 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
		 
		 return (rgb && rgb.length === 4) ? "#" +
		  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
		  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : rgb;
	},

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(this.rgb2hex(value));
	},
	
	init: function(data) {
		return this.render("colorinput", data);
	},
  }
);

var FileUploadInput = $.extend({}, TextInput, {

    events: [
        ["keyup", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);


var RadioInput = $.extend({}, Input, {

	onChange: function(event, node) {
		
		if (event.data && event.data.element)
		{
			event.data.element.trigger('propertyChange', [this.value, this]);
		}
	},

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).removeAttr('checked');
		if (value)
		$("input[value=" + value + "]", this.element).prop('checked', true);
	},
	
	init: function(data) {
		return this.render("radioinput", data);
	},
  }
);

var RadioButtonInput = $.extend({}, RadioInput, {

	init: function(data) {
		return this.render("radiobuttoninput", data);
	},
  }
);

var ToggleInput = $.extend({}, TextInput, {

	onChange: function(event, node) {
		if (event.data && event.data.element)
		{
			event.data.element.trigger('propertyChange', [this.checked?this.getAttribute("data-value-on"):this.getAttribute("data-value-off"), this]);
		}
	},

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
		
	init: function(data) {
		return this.render("toggle", data);
	},
  }
);

var ValueTextInput = $.extend({}, TextInput, {

    events: [
        ["keyup", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);

var GridLayoutInput = $.extend({}, TextInput, {

    events: [
        ["keyup", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);

var ProductsInput = $.extend({}, TextInput, {

    events: [
        ["keyup", "onChange", "input"],
	 ],

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);


var GridInput = $.extend({}, Input, {
	

    events: [
        ["change", "onChange", "select" /*'select'*/],
        ["click", "onChange", "button" /*'select'*/],
	 ],
	

	setValue: function(value) {
		$('select', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("grid", data);
	},
	
  }
);

var TextValueInput = $.extend({}, Input, {
	

    events: [
        ["keyup", "onChange", "input"],
	    ["click", "onChange", "button" /*'select'*/],
	 ],
	

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textvalue", data);
	},
	
  }
);

var ButtonInput = $.extend({}, Input, {

    events: [
        ["click", "onChange", "button" /*'select'*/],
	 ],
	

	setValue: function(value) {
		$('button', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("button", data);
	},
	
  }
);

var SectionInput = $.extend({}, Input, {

    events: [
        ["click", "onChange", "button" /*'select'*/],
	 ],
	

	setValue: function(value) {
		return false;
	},
	
	init: function(data) {
		return this.render("sectioninput", data);
	},
	
  }
);

var ListInput = $.extend({}, Input, {
	
    events: [
        ["change", "onChange", "select"],
	 ],
	

	setValue: function(value) {
		$('select', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("listinput", data);
	},
	
  }
);
