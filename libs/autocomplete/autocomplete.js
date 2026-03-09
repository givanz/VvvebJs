/**
*    Json key/value autocomplete for jQuery 
*    Provides a transparent way to have key/value autocomplete
*    Copyright (C) 2008 Ziadin Givan
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU Lesser General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU Lesser General Public License
*    along with this program.  If not, see http://www.gnu.org/licenses/
*    
*    Examples 
* 
*	 document.querySelectorAll("input#example").autocomplete("autocomplete.php");//using default parameters
* 
*	 document.querySelectorAll("input#example").autocomplete("autocomplete.php",{minChars:3,timeout:3000,validSelection:false,parameters:{'myparam':'myvalue'},before : function(input,text) {},after : function(input,text) {}});
* 
*    minChars = Minimum characters the input must have for the ajax request to be made
*	 timeOut = Number of miliseconds passed after user entered text to make the ajax request   
*    validSelection = If set to true then will invalidate (set to empty) the value field if the text is not selected (or modified) from the list of items.
*    parameters = Custom parameters to be passed
*    after, before = a function that will be caled before/after the ajax request
*/
function _AutocompleteInput(el, params) {
	let textInput = el;
	let name = textInput.getAttribute("name");
	let text = textInput.dataset.text;
	let textName = name;
	let index = 0;
	
	//check if name is array[name]
	if ((index = textName.lastIndexOf(']')) > 0) {
		textName = textName.substring(0, index) + "_text" + textName.substring(index, this.length);
	} else {
		textName += "_text";
	}
	
	textInput.setAttribute("name", textName);
	
	//create a new hidden input that will be used for holding the return value when posting the form, then swap names with the original input
	let hiddenInput = generateElements('<input type=hidden name="' + name + '"/>')[0];
	hiddenInput.value = textInput.value;
	textInput.after(hiddenInput);

	if (text) {
		textInput.value = text;
	}
	
	let valueInput = el.nextElementSibling;
	//create the ul that will hold the text and values
	valueInput.before(generateElements('<ul class="autocomplete"></ul>')[0]);
	let list = valueInput.previousElementSibling;
	list.after(generateElements('<button class="btn-close"></button>')[0]);
	let btnClose = list.nextElementSibling;

	let oldText = '';
	let typingTimeout;
	let size = 0;
	let selected = -1;
	let self = this;

	
	let settings = { ...{//provide default settings
		minChars : 1,
		timeout: 1000,
		after : null,
		before : null,
		onSelect : null,
		validSelection : true,
		allowFreeText:false,
		searchOnFocus:true,
		useKeyAsValue:false,
		url : el.dataset.url,
		listName : el.dataset.listName ?? "list",
		parameters : {'inputName' : valueInput.getAttribute('name'), 'inputId' : textInput.getAttribute('id')}
	}, ...params};


	function selectOption(value, text) {
		valueInput.value = value; 
		textInput.value = text; 

		const e = new CustomEvent("autocomplete.change", {bubbles: true, detail: { value, text, name, listName:settings.listName } });
		textInput.dispatchEvent(e);				

		//textInput.trigger("autocomplete.change", [ value, text, name, settings.listName ]);
		if (typeof settings.onSelect == "function")  {
				settings.onSelect(value, text, name, settings.listName);
		}			
		clear(); 
	}

	list.addEventListener("click", function (e) {
		let item = event.target.closest("li"); 
		if (item) {
			value = item.getAttribute('value'); 
			text = item.textContent;
			if (settings.useKeyAsValue) {
				selectOption(value, value);
			} else {
				selectOption(value, text);
			}
		}
	});	

	function getData(text){
		window.clearInterval(typingTimeout);
		if (text != oldText && (settings.minChars != null && text.length >= settings.minChars)) {
			clear();
			if (typeof settings.before == "function")  {
				settings.before(textInput,text);
			}

			textInput.classList.add('autocomplete-loading');
			settings.parameters.text = text.trim();
			
			
			let results = (data) => {
				let items = '';
				if (data) {
					size = 0;

					  for ( key in data ) {//get key => value
							let txt = generateElements("<span>" + data[key] + "<span>")[0].textContent;
							let replace = txt.replace(text, "<strong>" + text + "</strong>");
							let value = data[key].replace(txt, replace);
							
							items += '<li value="' + key + '">' + value + '</li>';
							size++;
					  }

					list.style.width = (Math.max(100, textInput.clientWidth)) + "px";
					list.innerHTML = items;
					//on mouse hover over elements set selected class and on click set the selected value and close list
					list.style.display = "block";

					if (typeof settings.after == "function")  {
						settings.after(textInput,text);
					}
					textInput.classList.add('autocomplete-open');
				}
				textInput.classList.remove('autocomplete-loading');
			};
			
			if (settings.url) {
				fetch(settings.url + "&"+ new URLSearchParams(settings.parameters))
				.then((response) => {
					if (!response.ok) { throw new Error(response) }
					return response.json()
				})
				.then(results)
				.catch(error => {
					console.log(error.statusText);
					//displayToast("bg-danger", "Error", "Error saving!");
				});			
			}
			
			if (settings.data) {
				results(settings.data.filter((search) => search.indexOf(text) !== -1));
			}
			
			oldText = text;
		}
	}
	
	function clear() {
		textInput.classList.remove('autocomplete-open');
		textInput.classList.remove('autocomplete-loading');
		list.style.display = "none";
		size = 0;
		selected = -1;
	}	
	
	btnClose.addEventListener("click", function (e) {
		clear();
		e.preventDefault();
		return false;
	});

	if (settings.searchOnFocus) {
		textInput.addEventListener("focusin", function(e) {
			getData(textInput.value);
		});	
	}
	
	textInput.addEventListener("focusout", function(e) {
		//if no valid selection empty input
		setTimeout(() => {
			if (!hiddenInput.value && !settings.allowFreeText) {
				textInput.value = "";
			}
			clear();
		}, 500);
	});	
	
	textInput.addEventListener("keydown", function(e) {
		window.clearInterval(typingTimeout);

		if(e.which == 27) {//escape
			clear();
		} else if (e.which == 46 || e.which == 8) {//delete and backspace
			clear();
			//invalidate previous selection
			if (settings.validSelection) valueInput.value = "";
		}
		else if(e.which == 13) {//enter 
			if ( list.style.display == "none") {//if the list is not visible then make a new request, otherwise hide the list
				getData(textInput.value);
			} else {
				clear();
			}
			
			if (settings.allowFreeText) {
				selectOption(textInput.value, textInput.value);
				clear();
			} else {
				let selected = list.querySelector("li.selected");
				if (selected) {
					if (settings.useKeyAsValue) {
						selectOption(selected.getAttribute('value'), selected.getAttribute('value'));
					} else {
						selectOption(selected.getAttribute('value'), selected.textContent);
					}
					clear();
				}
			}
			e.preventDefault();
			return false;
		}
		else if(e.which == 40 || e.which == 9 || e.which == 38) {//move up, down 

		  switch(e.which) 
		  {
			case 40: //down
			case 9:
			  selected = (selected >= size - 1) ? 0 : selected + 1; break;
			case 38://up
			  selected = (selected < 0) ? size -1 : selected - 1; break;
			default: break;
		  }
		  //set selected item and input values
		  list.querySelectorAll("li").forEach((e, i) => {
			  if (i == selected) {
				  //textInput.value = e.textContent;	        
				  //valueInput.value = e.getAttribute('value');
				  e.classList.add("selected");
			  } else {
				  e.classList.remove("selected");
			  }
		  });
		} else  { 
			//invalidate previous selection
			if (settings.validSelection) valueInput.value = '';
			typingTimeout = window.setTimeout(function() { getData(textInput.value) },settings.timeout);
		}
	});
	
	return textInput;
}
	
function _AutocompleteList(el, options) {
	
		let autocomplete = _AutocompleteInput(el, options);//$(el).autocomplete(options);
		let values = {};

		let settings = { ...{//provide default settings
			listName : el.dataset.listName ?? "list",
		}, ...options};

		//look ahead if autocomple-list element is already in the page and reuse
		//useful to populate the autocomplete list from db
		let list;
		let sibling = autocomplete;
		while (sibling = sibling.nextElementSibling) {
			if (sibling.classList.contains("autocomplete-list")) {
				if (sibling.tagName != "input") {
					list = sibling;
				}
				break;
			}
		}

		if (!list) {
			list = generateElements('<div class="autocomplete-list card border-top-0"></div>')[0];
		}
		
		let autocomplete_hidden = autocomplete.nextElementSibling;
		let name = autocomplete_hidden.getAttribute("name");
		
		autocomplete_hidden.nextElementSibling.nextElementSibling.after(list);
		let autocomplete_list_hidden = generateElements('<input type=hidden name="' + name + '_list"  value="' + autocomplete_hidden.value + '"/>')[0];
		
		//list.after(autocomplete_list_hidden.nextElementSibling);//add list after btn-close

		function addItem(value, text) {
			
			list.append(generateElements('<div>\
				<span>' + text + '</span>\
				<button type="button" class="btn-close remove-btn" aria-label="Remove"></button>\
				<input name="' + settings.listName + '[' + value + ']" value="' + value + '" type="hidden">\
			 </div>')[0]);
			 autocomplete.value = "";
		};
	
		function setList() {
			let values = {};
			list.querySelectorAll('input[type="hidden"]').forEach(el => {
				values[el.value] = el.parentNode.querySelector("span").textContent;
			});

			autocomplete_list_hidden.value = JSON.stringify(values);
			
			return values;
		};

		
		function setValue(value) { 
			if (value == "" || value == undefined) return false;
			let values = [];
//			value = decodeURIComponent(value);

			if (typeof value == "string") {
				values = JSON.parse(value);
			} else /*if (typeof value == "string")*/ {
				values = value;
			}
			
			for (key in values) {
				addItem(key, values[key]);
			}
			
			setList();
		};

		autocomplete.addEventListener("autocomplete.change", function (event) {
				autocomplete.addItem(event.detail.value, event.detail.text);
				values = autocomplete.setList();
				const e = new CustomEvent('autocompletelist.change', {bubbles: true, detail: [ JSON.stringify(values) ] });
				event.currentTarget.dispatchEvent(e);				
				//autocomplete.trigger("autocompletelist.change", [ JSON.stringify(values) ]);
			  //target, event, element, input
		  }
		);		
/*
		autocomplete.on("autocomplete.change", function(event, value, text) { 
				autocomplete.addItem(value, text);
				values = autocomplete.setList();
				const e = new CustomEvent('autocompletelist.change', {bubbles: true, detail: [ JSON.stringify(values) ] });
				event.currentTarget.dispatchEvent(e);				
				//autocomplete.trigger("autocompletelist.change", [ JSON.stringify(values) ]);
		 });
*/
		list.addEventListener("click", function (event, value, text)  {
			let item = event.target.closest(".remove-btn"); 
			if (item) {
				item.parentNode.remove();
				let values = setList();
				const e = new CustomEvent('autocompletelist.change', {bubbles: true, detail: [ values ] });
				autocomplete.dispatchEvent(e);				
				//autocomplete.trigger("autocompletelist.change", [ JSON.stringify(values) ]);
				event.preventDefault();
				return false;
			}
		});		 

		autocomplete.setValue = setValue;
		autocomplete.addItem = addItem;
		autocomplete.setList = setList;

		el.autocompleteList = autocomplete;
		
		return autocomplete;
}

 function _TagsInput(el, options)  {
		let autocomplete = _AutocompleteInput(el, options);//$(el).autocomplete(options);

		let settings = { ...{//provide default settings
			listName : el.dataset.listName ?? "list",
		}, ...options};

		let list = autocomplete.parentNode;//document.querySelectorAll('<div class="form-control autocomplete-list" style="min-height: 100px;height: 100px; overflow: auto;"></div>');
		
		let autocomplete_hidden = autocomplete.nextElementSibling;
		
		let name = autocomplete_hidden.getAttribute("name");
		
		autocomplete_hidden.nextElementSibling;//.after(list);
		let autocomplete_list_hidden = generateElements('<input type=hidden name="' + name + '_list" value="' + autocomplete_hidden.value + '"/>')[0];
		
		list.appendChild(autocomplete_list_hidden);

		function addItem(value, text) {
			let attributes = ';'
			let name = '';
			//if name is array set value otherwise set value as array key
			if (settings.listName.lastIndexOf('[') > 0) {
				name = settings.listName + '[' + value + ']';
				attributes = 'name="' + name + '" value="' + text + '"';
			} else {
				name = settings.listName + '[' + settings.listId + '][' + value + ']';
				attributes = 'name="' + name + '" value="' + text + '"';
			}
			
			autocomplete.before(generateElements('<div class="tag"><span>' + text + '</span>\
				<a href="#" class="remove-btn"><i class="la la-times"></i></a>\
				<input ' + attributes + ' type="hidden">\
			 </div>')[0]);
			 autocomplete.value = "";
		};
	
		function setList() {
			
			let values = {};
			//console.log(('input[name ="list[]"]', list).serialize());
			list.querySelectorAll('.tag input[type="hidden"]').forEach(el => {
				values[el.value] = el.parentNode.querySelector("span").textContent;
			});

			//values = encodeURIComponent(JSON.stringify(values));
			//values = JSON.stringify(values);//.replace('"', '\"');
			autocomplete_list_hidden.value = JSON.stringify(values);
			return values;
		};

		
		function setValue(value) { 
			if (value == "" || value == undefined) return false;
			let values = [];
//			value = decodeURIComponent(value);

			if (typeof value == "string") {
				values = JSON.parse(value);
			} else /*if (typeof value == "string")*/ {
				values = value;
			}
			
			for (key in values) {
				addItem(key, values[key]);
			}
			
			setList();
		};

		let self = this;

		autocomplete.addEventListener("autocomplete.change", function(event) { 
				addItem(event.detail.value, event.detail.text);
				let values = autocomplete.setList();
				const e = new CustomEvent("tagsinput.change", {bubbles: true, detail: [ values ] });
				autocomplete.dispatchEvent(e);				
				//autocomplete.trigger("tagsinput.change", [ values ]);
		 });

		list.addEventListener("click", function (event)  {
			let item = event.target.closest(".remove-btn"); 
			if (item) {
				item.parentNode.remove();

				let values = setList();
				const e = new CustomEvent('tagsinput.change', {bubbles: true, detail: [ values ] });
				autocomplete.dispatchEvent(e);				
				
				event.preventDefault();
				return false;
			}
		});		 

		autocomplete.setValue = setValue;
		autocomplete.addItem = addItem;
		autocomplete.setList = setList;

		el.tagsInput = autocomplete;
		
		return autocomplete;
}
