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

let Input = {
	
	init: function(name) {
	},


	onChange: function(event, node, input) {
		if (event && event.target) {
			const e = new CustomEvent('propertyChange', { detail: {value : input.value ?? this.value, input: this, origEvent:event} });
			event.currentTarget.dispatchEvent(e);
		}
	},

	renderTemplate: function(name, data) {
		return tmpl("vvveb-input-" + name, data);
	},

	setValue: function(value) {
		if (this.element[0] && value) {
			let input = this.element[0].querySelector('input');
		
			if (input) { 
				input.value = value;
			}
		}
	},
	
	render: function(name, data) {
		let html = this.renderTemplate(name, data);
		this.element = generateElements(html);
		
		//bind events
		if (this.events)
		for (let i in this.events) {
			ev = this.events[i][0];
			fun = this[ this.events[i][1] ];
			el = this.events[i][2];
		
			this.element[0].addEventListener(ev, function (ev, el, fun, target, event) {
			  if (event.target.closest(el)) {
				  //target, event, element, input
				return fun.call(event.target, event, target, this);
			  }
			}.bind(this, ev, el, fun, this.element[0]));		
		}

		return this.element[0];
	}
};

let TextInput = { ...Input, ...{

    events: [
        //event, listener, child element
        ["focusout", "onChange", "input"],
	 ],
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
}

let TextareaInput = { ...Input, ...{

    events: [
        ["keyup", "onChange", "textarea"],
	 ],
	
	setValue: function(value) {
		if (this.element[0] && value) {
			let input = this.element[0].querySelector('textarea');
		
			if (input) { 
				input.value = value;
			}
		}
	},
	
	init: function(data) {
		return this.render("textareainput", data);
	},
  }	
}

let CheckboxInput = { ...Input, ...{

    events: [
        ["change", "onCheck", "input"],
	 ],
	
	onCheck: function(event, node, input) {
		input.value = this.checked;
		return input.onChange.call(this, event, node, input);
	},

	setValue: function(value) {
		if (this.element[0]) {
			let input = this.element[0].querySelector('input');

			if (input) { 
				if (value) {
					input.checked = true;
				} else {
					input.checked = false;
				}
			}
		}
	},
	
	init: function(data) {
		return this.render("checkboxinput", data);
	},
  }
}

let SelectInput = { ...Input, ...{
	
    events: [
        ["change", "onChange", "select"],
	 ],
	

	setValue: function(value) {
		if (this.element[0] && value) {
			let input = this.element[0].querySelector('select');
		
			if (input) { 
				input.value = value;
			}
		}
	},
	
	init: function(data) {
		return this.render("select", data);
	},
  }
}

let IconSelectInput = { ...Input, ...{
	
    events: [
        ["change", "onChange", "select"],
	 ],
	

	setValue: function(value) {
		if (this.element[0] && value) {
			let input = this.element[0].querySelector('select');
		
			if (input) { 
				input.value = value;
			}
		}
	},
	
	init: function(data) {
		return this.render("icon-select", data);
	},
  }
}

let HtmlListSelectInput = { ...Input, ...{
	
	data:{},
	cache:{},
	
    events: [
        //["click", "onChange", "li"],
        ["change", "onListChange", "select"],
        ["keyup", "searchElement", "input.search"],
        ["click", "clearSearch", "button.clear-backspace"],
	 ],
	
	clearSearch : function(event, element, input) {
		let search = element.querySelector("input.search");
		if (search) {
			search.value = "";
			input.searchElement(event, element, input);
		}
		
		search.dispatchEvent(new KeyboardEvent("keyup", {
			bubbles: true,
			cancelable: true,
		}));
	},


	searchElement : function(event, element, input) {
		searchText = this.value;
		
		delay(() => {
			element.querySelectorAll("li").forEach((el, i) => {
				
				if (!searchText || el.title.indexOf(searchText) > -1) { 
					el.style.display = '';
				} else {
					el.style.display = 'none';
				}
			});
			
		}, 500);
	},	

	onElementClick: function(event, element, input) {
		let data = input.data;
		let svg = this.closest(data.insertElement);
		let value = svg.outerHTML ?? "<svg></svg>";
		input.value = value;
		let ret = input.onChange.call(this, event, element, input);
		
		return element;
	},
	
	onListChange: function(event, element, input) {
		let url = input.data.url.replace('{value}', this.value);
		let elements = element.querySelector(".elements");
		
		elements.innerHTML = `<div class="p-4"><div class="spinner-border spinner-border-sm" role="status">
		  <span class="visually-hidden">Loading...</span>
		</div> Loading...</div>`;
		
		//cache ajax requests
		if (input.cache[url] != undefined) {
			elements.innerHTML = input.cache[url];
		} else {
			fetch(url)
			.then((response) => {
				if (!response.ok) { throw new Error(response) }
				return response.text()
			})
			.then((text) => {
					input.cache[url] = text;
					elements.innerHTML = text;
			})
			.catch(error => {
				console.log(error.statusText);
				displayToast("bg-danger", "Error", "Error loading list");
			});
		}
	},
	
	setValue: function(value) {
		let select = this.element[0].querySelector("select");
		if (value && select) {
			select.value = value;
		}
	},
	
	init: function(data) {
		this.data = data;
		this.events.push(["click", "onElementClick", data.clickElement]);
		let template = this.render("html-list-select", data);
		let select = template.querySelector("select");
		this.onListChange.call(select, new Event('change'), template, this);
		return template;
	},
  }
}

let LinkInput = { ...TextInput, ...{

    events: [
        ["change", "onChange", "input"],
	 ],
	/*
	setValue: function(value) {
		//value = value.replace(/(?<!\/)www\./, 'https://www.');
		this.element.querySelector('input').value = value;
	},
	*/
	init: function(data) {
		return this.render("textinput", data);
	},
  }
}

let DateInput = { ...TextInput, ...{

    events: [
        ["change", "onChange", "input"],
	 ],
	
	init: function(data) {
		return this.render("dateinput", data);
	},
  }
}

let RangeInput = { ...Input, ...{

    events: [
        ["change", "onRangeChange", "input"],
	 ],
	 
	onRangeChange: function(event, node, input) {
		this.parentNode.querySelector('input[type=number]').value = this.value;
		this.parentNode.querySelector('input[type=range]').value = this.value;
		return input.onChange.call(this, event, node, input);
	},	 

	setValue: function(value) {
		this.element[0].querySelector('input[type=number]').value = value;
		this.element[0].querySelector('input[type=range]').value = value;
	},
	
	init: function(data) {
		return this.render("rangeinput", data);
	},
  }
}

let NumberInput = { ...Input, ...{

    events: [
        ["change", "onChange", "input"],
	 ],
	
	init: function(data) {
		return this.render("numberinput", data);
	},
  }
}

let CssUnitInput = { ...Input, ...{

	number:0,
	unit:"px",

    events: [
        ["change", "onInputChange", "select"],
        ["change", "onInputChange", "input"],
        ["keyup", "onInputChange", "input"],
	 ],
		
	onInputChange: function(event, node, input) {
		if (node) {
			let number = node.querySelector("input").value;
			let unit = node.querySelector("select").value;

			if (this.value != "") input[this.name] = this.value;// this.name = unit or number	
			if (unit == "") unit = "px";//if unit is not set use default px
		
			let value = "";	
			if (unit == "auto")  {
				node.classList.add("auto");
				value = unit;
			}
			else  {
				node.classList.remove("auto");
				value = number + (unit ? unit : "");
			}
			
			input.value = value;

			return input.onChange.call(this, event, node, input);
		}
	},
	
	setValue: function(value) {
		if (value && this.element) {
			let element = this.element[0];
			this.number = parseFloat(value);
			this.unit = value.replace(this.number, '').trim();
			
			if (this.unit == "auto") element.classList.add("auto");

			element.querySelector("input[type=number]").value = this.number;
			element.querySelector("select").value = this.unit;
		}
	},
	
	init: function(data) {
		return this.render("cssunitinput", data);
	},
  }
}

let ColorInput = { ...Input, ...{

	 //html5 color input only supports setting values as hex colors even if the picker returns only rgb
	 rgb2hex: function(value) {
		 if (value) {
			 value = value.trim();
			 
			 if (rgb = value.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i)) {
				 
				 return (rgb && rgb.length === 4) ? "#" +
				  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
				  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
				  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : rgb;
			 }
		}
		 
		 return value;
	},

    events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		if (this.element[0] && value) {
			let input = this.element[0].querySelector('input');
		
			if (input) { 
				input.value = this.rgb2hex(value);
			}
		}
	},
	
	init: function(data) {
		//if no palette provided use default
		if (!data.palette) {
			data.palette = Vvveb.ColorPalette.getAll();
		}
		
		return this.render("colorinput", data);
	},
  }
}

let ImageInput = { ...Input, ...{

    events: [
        ["focusout", "onChange", "input[type=text]"],
        ["change", "onUpload", "input[type=file]"],
	 ],

	setValue: function(value) {

		//don't set blob value to avoid slowing down the page		
		if (value.indexOf("data:image") == -1) {
			element.querySelector('input[type="text"]').value = value;
		}
	},

	onUpload: function(event, node) {

		if (this.files && this.files[0]) {
            let reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
            //reader.readAsBinaryString(this.files[0]);
            file = this.files[0];
        }

		function imageIsLoaded(e) {
				
				image = e.target.result;
				
				event.data.element.trigger('propertyChange', [image, this]);
				
				//return;//remove this line to enable php upload

				let formData = new FormData();
				formData.append("file", file);
    
				$.ajax({
					type: "POST",
					url: 'upload.php',//set your server side upload script url
					data: formData,
					processData: false,
					contentType: false,
					success: function (data) {
						console.log("File uploaded at: ", data);
						
						//if image is succesfully uploaded set image url
						event.data.element.trigger('propertyChange', [data, this]);
						
						//update src input
						event.data.element.querySelector('input[type="text"]').value = data;
					},
					error: function (data) {
						alert(data.responseText);
					}
				});		
		}
	}		
 }	
}

let FileUploadInput = { ...TextInput, ...{

    events: [
        ["focusout", "onChange", "input"],
	 ],

	init: function(data) {
		return this.render("textinput", data);
	},
  }
}

let RadioInput = { ...Input, ...{

	events: [
        ["change", "onChange", "input"],
	 ],

	setValue: function(value) {
		if (this.element[0] && value) {
			let input = this.element[0].querySelector('input');
		
			if (input) { 
				if (value == input.value) {
					input.setAttribute("checked", "true");
					input.checked = true;
				} else {
					input.checked = false;
					input.removeAttribute("checked");
				}
				
			}
		}
	},
	
	init: function(data) {
		return this.render("radioinput", data);
	},
  }
}

let RadioButtonInput = { ...RadioInput, ...{

	setValue: function(value) {
		if (this.element[0] && value) {
			let inputs = this.element[0].querySelectorAll('input');
			inputs.forEach((el, i) => {
				if (value == el.value) {
					selected = el;
				} else {
					el.checked = false;
					el.removeAttribute("checked");
				}		
			});

			selected.checked = true;
			selected.setAttribute("checked", "checked");
		}
	},

	init: function(data) {
		return this.render("radiobuttoninput", data);
	},
  }
}

let ToggleInput = { ...Input, ...{
	events: [
        ["change", "onToggleChange", "input"],
	 ],

	onToggleChange: function(event, node, input) {
		input.value = this.checked ? this.getAttribute("data-value-on") : this.getAttribute("data-value-off");
		return input.onChange.call(this, event, node, input);
	},

	setValue: function(value) {
		if (this.element[0]) {
			let input = this.element[0].querySelector('input');

			if (input) { 
				if (value == input.getAttribute("data-value-on")) {
					input.checked = true;
					input.setAttribute("checked", true);
				} else {
					input.checked = false;
					input.removeAttribute("checked");
				}
			}
		}
	},
	
	init: function(data) {
		return this.render("toggle", data);
	},
  }
}

let ValueTextInput = { ...TextInput, ...{

    events: [
        ["focusout", "onChange", "input"],
	 ],
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
}

let GridLayoutInput = { ...TextInput, ...{

    events: [
        ["focusout", "onChange", "input"],
	 ],
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
}

let ProductsInput = { ...TextInput, ...{

    events: [
        ["focusout", "onChange", "input"],
	 ],
	
	init: function(data) {
		return this.render("textinput", data);
	},
  }
}

let GridInput = { ...Input, ...{
	

    events: [
        ["change", "onChange", "select" /*'select'*/],
        ["click", "onChange", "button" /*'select'*/],
	 ],
	

	setValue: function(value) {
		if (this.element[0] && value) {
			let input = this.element[0].querySelector('select');
		
			if (input) { 
				input.value = value;
				input.querySelector("option[selected]").selected = true;
			}
		}
	},
	
	init: function(data) {
		return this.render("grid", data);
	},
  }
}

let TextValueInput = { ...Input, ...{
	

    events: [
        ["focusout", "onChange", "input"],
	    ["click", "onChange", "button" /*'select'*/],
	 ],
	
	setValue: function(value) {
		return false;
	},
		
	init: function(data) {
		return this.render("textvalue", data);
	},
  }
}

let ButtonInput = { ...Input, ...{

    events: [
        ["click", "onChange", "button" /*'select'*/],
	 ],
	

	setValue: function(value) {
		if (this.element[0] && value) {
			let input = this.element[0].querySelector('button');
		
			if (input) { 
				input.value = value;
			}
		}		
	},
	
	init: function(data) {
		return this.render("button", data);
	},
  }
}

let SectionInput = { ...Input, ...{

    events: [
        //["click", "onChange", "button" /*'select'*/],
	 ],
	

	setValue: function(value) {
		return false;
	},
	
	init: function(data) {
		return this.render("sectioninput", data);
	},
  }
}

let ListInput = { ...Input, ...{
	
    events: [
        ["change", "onChange", "select"],
        ["click", "remove", ".delete-btn"],
        ["click", "add", ".btn-new"],
        ["click", "select", ".section-item"],
	 ],
	

	remove: function(event, node) {
		let sectionItem = this.closest(".section-item");
		let index = sectionItem.index();
		let data = event.data.input.data;
		
		if (data.removeElement) {
			event.data.input.node.querySelector(data.container + " " + data.selector + ":nth-child(" + index + ")").remove();
		}
		sectionItem.remove();
		
		event.action = "remove";
		event.index = index;
		event.data.input.onChange(event, node);
		return false;
	},

	add: function(event, node, input) {
		let newElement = input.data.newElement ?? false;
		if (newElement) {
			event.data.input.node.querySelector(input.data.container).append(generateElements(newElement)[0]);
		}
		
		event.action = "add";
		input.onChange(event, node, input, this);
		return false;
	},	
	
	select: function(event, node, input) {
		let index = [...this.parentNode.children].indexOf(el);
		
		event.action = "select";
		event.index = index;
		input.onChange(event, node, input, this);
		return false;
	},

	setValue: function(value) {
	},

	init: function(data, node) {
		this.component = data.component;
		this.selector = data.selector;
		this.node = node;

		let elements = this.node.querySelectorAll(data.container + " " + this.selector);
		let options = [];
		
		elements.forEach(function (e, i) {
			let element = e;
			if (data.nameElement) {
				element = element.querySelector(data.nameElement);
			}
			let name = (data.name = "text" ? element.textContent : element.id);
			options.push({
				name: name,
				type: (data.prefix ?? "") + (i + 1) + (data.suffix ?? ""),
			});
		});

		data.options = options;
		data.elements = elements;
		this.data = data;

		return this.render("listinput", data);
	},
  }
}

let AutocompleteInput = { ...Input, ...{

    events: [
        ["autocomplete.change", "onAutocompleteChange", "input"],
	 ],

	onAutocompleteChange: function(event, value, text) {
		input.value = value;
		return this.onChange(event, node);
	},

	init: function(data) {
		
		this.element = this.render("textinput", data);
		
		let autocomplete = new Autocomplete({input:this.element.querySelector("input"), url:data.url});
		
		return this.element;
	}
  }
}

let AutocompleteList = { ...Input, ...{

    events: [
        ["autocompletelist.change", "onAutocompleteChange", "input"],
	 ],

	onAutocompleteChange: function(event, node, input) {
		input.value = event.detail;
		return input.onChange.call(this, event, node, input);
	},

	setValue: function(value) {
		if (this.element[0] && value) {
			let input = this.element[0].querySelector('input');
		
			if (input) { 
				input.dataset.autocompleteList.setValue(value);
				
			}
		}		
	},

	init: function(data) {
		
		this.element = this.render("textinput", data);
		
		let autocomplete = new Autocomplete({input:this.element.querySelector("input"), url:data.url});
		$('input', this.element).autocompleteList(data);//using default parameters
		
		return this.element;
	}
  }
}

let TagsInput = { ...Input, ...{

    events: [
        ["tagsinput.change", "onTagsInputChange", "input"],
	 ],

	onTagsInputChange: function(event, value, text) {
		input.value = value;
		return this.onChange(event, node);
	},

	setValue: function(value) {
		if (this.element[0] && value) {
			let input = this.element[0].querySelector('select');
		
			if (input) { 
				input.dataset.tagsInput.setValue(value);
				
			}
		}
	},

	init: function(data) {
		
		this.element = this.render("tagsinput", data);
		
		$('input', this.element).tagsInput(data);//using default parameters
		
		return this.element;
	}
  }
}


let NoticeInput = { ...Input, ...{

    events: [
	 ],
	
	init: function(data) {
		return this.render("noticeinput", data);
	},
  }
}
