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
		for (var event in this.events)
		{
			fun = this[ this.events[event][0] ];
			el = this.events[event][1];
		
			this.element.on(event, el, {element: this.element}, fun);
		}
		
		return this.element;
	}
};

var TextInput = $.extend({}, Input, {

    events: {
        "keyup": ['onChange', 'input'],
	 },

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

    events: {
        "change": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("checkboxinput", data);
	},
  }
);

var SelectInput = $.extend({}, Input, {
	

    events: {
        "change": ['onChange', 'select' /*'select'*/],
	 },
	

	setValue: function(value) {
		$('select', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("select", data);
	},
	
  }
);


var LinkInput = $.extend({}, TextInput, {

    events: {
        "keyup": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);

var RangeInput = $.extend({}, Input, {

    events: {
        "change": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("rangeinput", data);
	},
  }
);

var NumberInput = $.extend({}, Input, {

    events: {
        "change": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("numberinput", data);
	},
  }
);

var ColorInput = $.extend({}, Input, {

    events: {
        "change": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("colorinput", data);
	},
  }
);

var FileUploadInput = $.extend({}, TextInput, {

    events: {
        "keyup": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);

var RadioInput = $.extend({}, TextInput, {

    events: {
        "keyup": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
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

    events: {
        "change": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
		
	init: function(data) {
		return this.render("toggle", data);
	},
  }
);

var ValueTextInput = $.extend({}, TextInput, {

    events: {
        "keyup": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);

var GridLayoutInput = $.extend({}, TextInput, {

    events: {
        "keyup": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);

var ProductsInput = $.extend({}, TextInput, {

    events: {
        "keyup": ['onChange', 'input'],
	 },

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
);


var GridInput = $.extend({}, Input, {
	

    events: {
        "change": ['onChange', 'select' /*'select'*/],
        "click": ['onChange', 'button' /*'select'*/],
	 },
	

	setValue: function(value) {
		$('select', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("grid", data);
	},
	
  }
);

var TextValueInput = $.extend({}, Input, {
	

    events: {
        "keyup": ['onChange', 'input'],
        "click": ['onChange', 'button' /*'select'*/],
	 },
	

	setValue: function(value) {
		$('input', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("textvalue", data);
	},
	
  }
);

var ButtonInput = $.extend({}, Input, {

    events: {
        "click": ['onChange', 'button' /*'select'*/],
	 },
	

	setValue: function(value) {
		$('button', this.element).val(value);
	},
	
	init: function(data) {
		return this.render("button", data);
	},
	
  }
);
