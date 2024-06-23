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


// Simple JavaScript Templating and buildParams
// John Resig - https://johnresig.com/ - MIT Licensed
(function(){
  let cache = {};
  let startTag = "{%";
  let endTag = "%}";
  let re1 = new RegExp(`((^|${endTag})[^\t]*)'`,"g");
  let re2 = new RegExp(`\t=(.*?)${endTag}`,"g");
  
  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
	let fn = /^[-a-zA-Z0-9]+$/.test(str) ?
      cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :
              
      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "let p=[],print=function(){p.push.apply(p,arguments);};" +
         
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
         
        // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split(startTag).join("\t")
          .replace(re1, "$1\r")
          .replace(re2, "',$1,'")
          .split("\t").join("');")
          .split(endTag).join("p.push('")
          .split("\r").join("\\'")
      + "');}return p.join('');");
    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();


var rbracket = /\[\]$/;
	
function buildParams( prefix, obj,  add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		for(var key in obj) {
			let v = obj[key];
			if ( rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					add
				);
			}
		}

	} else if ( typeof obj === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ],  add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
function nestedFormData( a ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = typeof valueOrFunction === "function" ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	if ( a == null ) {
		return "";
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( Object.is( a ) ) ) {

		// Serialize the form elements
		for(var key in object) {
			let v = object[key];
		//jQuery.each( a, function() {
			add( key, v );
		};

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};


let delay = (function(){
  let timer = 0;
  return function(callback, ms){
    clearTimeout (timer);
    timer = setTimeout(callback, ms);
  };
})();

function isElement(obj){
   return (typeof obj==="object") &&
      (obj.nodeType===1) && (typeof obj.style === "object") &&
      (typeof obj.ownerDocument ==="object")/* && obj.tagName != "BODY"*/;
}

function generateElements(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return template.content.children;
}

function offset(el) {
  box = el.getBoundingClientRect();
  docElem = document.documentElement;
  return {
    top: box.top + window.pageYOffset - docElem.clientTop,
    left: box.left + window.pageXOffset - docElem.clientLeft
  };
}

if (Vvveb === undefined) var Vvveb = {};

Vvveb.defaultComponent = "_base";
Vvveb.preservePropertySections = true;
//icon = use component icon when dragging | html = use component html to create draggable element
Vvveb.dragIcon = 'icon';
//if empty the html of the component is used to view dropping in real time but for large elements it can jump around for this you can set a html placeholder with this option
Vvveb.dragElementStyle = "background:limegreen;width:100%;height:3px;border:1px solid limegreen;box-shadow:0px 0px 2px 1px rgba(0,0,0,0.14);overflow:hidden;";
Vvveb.dragHtml = '<div style="' + Vvveb.dragElementStyle + '"></div>';

Vvveb.baseUrl =  document.currentScript?document.currentScript.src.replace(/[^\/]*?\.js$/,''):'';
Vvveb.imgBaseUrl =  Vvveb.baseUrl;

Vvveb.ComponentsGroup = {};
Vvveb.SectionsGroup = {};
Vvveb.BlocksGroup = {};

Vvveb.Components = {
	
	_components: {},
	
	_nodesLookup: {},
	
	_attributesLookup: {},

	_classesLookup: {},
	
	_classesRegexLookup: {},
	
	componentPropertiesElement: "#right-panel .component-properties",

	componentPropertiesDefaultSection: "content",

	get: function(type) {
		return this._components[type];
	},

	updateProperty: function(type, key, value) {
		let properties = this._components[type]["properties"];
		for (property in properties) {
			if (key == properties[property]["key"])  {
				return this._components[type]["properties"][property] = 
				Object.assign(properties[property], value);
			}
		}
	},

	getProperty: function(type, key) {
		let properties = this._components[type] ? this._components[type]["properties"] : [];
		for (property in properties) {
			if (key == properties[property]["key"])  {
				return properties[property];
			}
		}
	},

	add: function(type, data) {
		data.type = type;
		
		this._components[type] = data;
		
		if (data.nodes) {
			for (let i in data.nodes) {	
				this._nodesLookup[ data.nodes[i] ] = data;
			}
		}
		
		if (data.attributes) {
			if (data.attributes.constructor === Array) {
				for (let i in data.attributes) {	
					this._attributesLookup[ data.attributes[i] ] = data;
				}
			} else {
				for (let i in data.attributes) {	
					if (typeof this._attributesLookup[i] === 'undefined') {
						this._attributesLookup[i] = {};
					}

					if (typeof this._attributesLookup[i][ data.attributes[i] ] === 'undefined') {
						this._attributesLookup[i][ data.attributes[i] ] = {};
					}

					this._attributesLookup[i][ data.attributes[i] ] = data;
				}
			}
		}
		
		if (data.classes) {
			for (let i in data.classes) {	
				this._classesLookup[ data.classes[i] ] = data;
			}
		}
		
		if (data.classesRegex) {
			for (let i in data.classesRegex) {	
				this._classesRegexLookup[ data.classesRegex[i] ] = data;
			}
		}
	},
	
	extend: function(inheritType, type, data) {
		 
		 let newData = data;
		 
		 if (inheritData = this._components[inheritType]) {
			newData = {...inheritData, ...data};
			newData.properties = (data.properties ? data.properties : []).concat(inheritData.properties ? inheritData.properties : []);
		 }

		 //sort by order
		 newData.properties.sort(function (a,b) {
				if (typeof a.sort  === "undefined") a.sort = 0;
				if (typeof b.sort  === "undefined") b.sort = 0;

				if (a.sort < b.sort)
					return -1;
				if (a.sort > b.sort)
					return 1;
				return 0;
			});
		
		this.add(type, newData);
	},
	
	
	matchNode: function(node) {
		let component = {};
		
		if (!node || !node.tagName) return false;
		
		if (node.attributes && node.attributes.length) {
			//search for attributes
			for (let i in node.attributes) {
				if (node.attributes[i]) {
					attr = node.attributes[i].name;
					value = node.attributes[i].value;

					if (attr in this._attributesLookup) {
						component = this._attributesLookup[ attr ];
						
						//currently we check that is not a component by looking at name attribute
						//if we have a collection of objects it means that attribute value must be checked
						if (typeof component["name"] === "undefined") {
							if (value in component) {
								return component[value];
							}
						} else {
							return component;
						}
					}
				}
			}
				
			for (let i in node.attributes) {
				attr = node.attributes[i].name;
				value = node.attributes[i].value;
				
				//check for node classes
				if (attr == "class") {
					classes = value.split(" ");
					
					for (j in classes) {
						if (classes[j] in this._classesLookup)
						return this._classesLookup[ classes[j] ];	
					}
					
					for (regex in this._classesRegexLookup) {
						regexObj = new RegExp(regex);
						if (regexObj.exec(value)) {
							return this._classesRegexLookup[ regex ];	
						}
					}
				}
			}
		}

		tagName = node.tagName.toLowerCase();
		if (tagName in this._nodesLookup) return this._nodesLookup[ tagName ];
	
		return false;
		//return false;
	},
	
	render: function(type, panel = false) {

		let component = this._components[type];
		if (!component) return;

		if (!panel) {
			//panel = document.querySelector(this.componentPropertiesElement);
			panel = this.componentPropertiesElement;
		}

		let defaultSection = this.componentPropertiesDefaultSection;
		let componentsPanelSections = {};

		document.querySelectorAll(panel + " .tab-pane").forEach((el, i) => {
			let sectionName = el.dataset.section;
			componentsPanelSections[sectionName] = el;
			for (const item of el.querySelectorAll(
				'label:not([data-header="default"]) + input,' +
				'label:not([data-header="default"]),' +
				'.section:not([data-section="default"])'
			)) {
			  item.remove();
			}
		});
		
		let section = componentsPanelSections[defaultSection].querySelector('.section[data-section="default"]');
		
		if (!(Vvveb.preservePropertySections && section)) {
			let template = tmpl("vvveb-input-sectioninput", {key:"default", header:component.name});

			componentsPanelSections[defaultSection].replaceChildren();
			componentsPanelSections[defaultSection].append(generateElements(template)[0]);
			
			section = componentsPanelSections[defaultSection].querySelector(".section");
		}

		componentsPanelSections[defaultSection].querySelector('[data-header="default"] span').innerHTML = component.name;
		section.replaceChildren();	
	
		if (component.beforeInit) component.beforeInit(Vvveb.Builder.selectedEl);
		
		let element;
		
		let fn = function(component, property) {
			if (property.input) {
				property.input.addEventListener('propertyChange', (event) => {
						element = selectedElement = Vvveb.Builder.selectedEl;
						let value = event.detail.value, input = event.detail.input, origEvent = event.detail.origEvent;
						
						if (property.child) element = element.querySelector(property.child);
						if (property.parent) element = element.parent(property.parent);
						
						if (property.onChange) {
							let ret = property.onChange(element, value, input, component, origEvent);
							//if on change returns an object then is returning the dom node otherwise is returning the new value
							if (typeof ret == "object")  {
								element = ret;
							} else {
								value = ret;
							}
						}/* else */
						if (property.htmlAttr) {
							oldValue = element.getAttribute(property.htmlAttr);
							
							if (property.htmlAttr == "class" && property.validValues) {
								if (property.validValues) {
									element.classList.remove(...property.validValues.filter(v => v));
								}
								if (value) {
									element.classList.add(...value.split(" "));
								}
							}
							else if (property.htmlAttr == "style") {
								//keep old style for undo
								oldStyle = window.FrameDocument.getElementById("vvvebjs-styles").textContent;
								element = Vvveb.StyleManager.setStyle(element, property.key, value);
							} else if (property.htmlAttr == "innerHTML")  {
								element = Vvveb.ContentManager.setHtml(element, value);
							} else if (property.htmlAttr == "innerText")  {
								element = Vvveb.ContentManager.setText(element, value);
							} else {
								//if value is empty then remove attribute useful for attributes without values like disabled
								if (value) {
									element.setAttribute(property.htmlAttr, value);
								} else {
									element.removeAttribute(property.htmlAttr);
								}
							}
							
							if (property.htmlAttr == "style") {
								mutation = {
									type: 'style', 
									target: element, 
									attributeName: property.htmlAttr, 
									oldValue: oldStyle, 
									newValue: window.FrameDocument.getElementById("vvvebjs-styles").textContent};
								
								Vvveb.Undo.addMutation(mutation);
							} else {
								Vvveb.Undo.addMutation({
									type: 'attributes', 
									target: element, 
									attributeName: property.htmlAttr, 
									oldValue: oldValue, 
									newValue: element.getAttribute(property.htmlAttr)
								});
							}
						}

						if (component.onChange) {
							element = component.onChange(element, property, value, input);
						}
						
						if (property.child || property.parent) {
							Vvveb.Builder.selectNode(selectedElement);
						} else {
							Vvveb.Builder.selectNode(element);
						}
						
						return element;
				});		
			}
			
			return property.input;
		};			
	
		let nodeElement = Vvveb.Builder.selectedEl;

		for (let i in component.properties) {
			let property = component.properties[i];
			let element = nodeElement;

			if (property.beforeInit) property.beforeInit(element);
			
			if (property.child) element = element.querySelector(property.child) ?? element;
			if (property.parent) element = element.closest(property.parent) ?? element;
			
			if (property.data) {
				property.data["key"] = property.key;
			} else {
				property.data = {"key" : property.key};
			}

			if (typeof property.group  === 'undefined') property.group = null;

			property.input = property.inputtype.init(property.data, element);
			
			let value;
			if (property.init) {
				property.inputtype.setValue(property.init(element));
			} else if (property.htmlAttr) {
				if (property.htmlAttr == "style") {
					//value = element.css(property.key);//jquery css returns computed style
					value = Vvveb.StyleManager.getStyle(element, property.key);//getStyle returns declared style
				} else
				if (property.htmlAttr == "innerHTML") {
					value = Vvveb.ContentManager.getHtml(element);
				} else if (property.htmlAttr == "innerText") {
					value = Vvveb.ContentManager.getText(element);
				} else {
					value = element.getAttribute(property.htmlAttr);
				}

				//if attribute is class check if one of valid values is included as class to set the select
				if (value && property.htmlAttr == "class" && property.validValues) {
					let valid = value.split(" ").filter(function(el) {
						return property.validValues.indexOf(el) != -1
					});
					
					if (valid && valid.length) {
						value = valid[0];
					} else  {
						value = "";
					}
				} 
				
				if (!value && property.defaultValue) {
					value = property.defaultValue;
				}

				property.inputtype.setValue(value);
			} else {
				if (!value && property.defaultValue) {
					value = property.defaultValue;
				}

				property.inputtype.setValue(value);
			}
			
			fn(component, property);
			
			let propertySection = defaultSection;
			if (property.section) {
				propertySection = property.section;
			}			

			if (property.inputtype == SectionInput) {
				section = componentsPanelSections[propertySection].querySelector('.section[data-section="' + property.key + '"]');
				
				if (Vvveb.preservePropertySections && section) {
					section.replaceChildren();
				} else  {
					componentsPanelSections[propertySection].append(property.input);
					section = componentsPanelSections[propertySection].querySelector('.section[data-section="' + property.key + '"]');
				}
			}
			else {
				let row = generateElements(tmpl('vvveb-property', property))[0]; 
				row.querySelector('.input').append(property.input);
				section.append(row);
			}
			
			if (property.inputtype.afterInit) {
				property.inputtype.afterInit(property.input);
			}

			if (property.afterInit) {
				property.afterInit(element, property.input);
			}
		}

		if (component.init) component.init(nodeElement);
	}
};	


Vvveb.Blocks = {
	
	_blocks: {},

	get: function(type) {
		return this._blocks[type];
	},

	add: function(type, data) {
		data.type = type;
		this._blocks[type] = data;
	},
};	

Vvveb.Sections = {
	
	_sections: {},

	get: function(type) {
		return this._sections[type];
	},

	add: function(type, data) {
		data.type = type;
		this._sections[type] = data;
	},
};	



Vvveb.WysiwygEditor = {
	
	isActive: false,
	oldValue: '',
	doc:false,
	

	editorSetStyle: function (tag, style = {}, toggle = false) {
		let iframeWindow = Vvveb.Builder.iframe.contentWindow;
		let selection = iframeWindow.getSelection();
		let element = this.element;
		let range;

		if (!tag) {
			tag = "span";
		}

		if (selection.rangeCount > 0) {
			//check if the whole text is inside an existing node to use the node directly
			if ((selection.baseNode && selection.baseNode.nextSibling == null && selection.baseNode.previousSibling == null 
				&& selection.anchorOffset == 0 && selection.focusOffset == selection.baseNode.length) 
				|| (selection.anchorOffset == selection.focusOffset)) {
					
				element = selection.baseNode.parentNode;
				
			} else {
				element = document.createElement(tag);
				range = selection.getRangeAt(0);
				range.surroundContents(element);
				range.selectNodeContents(element.childNodes[0], 0); 
			}
		}
		
		if (element && style) {
			for (name in style) {

				if ( !style[name] || 
					(toggle && element.style.getPropertyValue(name))) {

					element.style.removeProperty(name);
					
				} else {
					element.style.setProperty(name, style[name]);
				}
			}
		}
		
		//if edited text is an empty span remove the span
		if (element.tagName == "SPAN" && element.style.length == 0 && element.attributes.length <= 1) {
			let textNode = iframeWindow.document.createTextNode(element.innerText);
			element.replaceWith(textNode);
			element = textNode;

			range = iframeWindow.document.createRange();
			range.selectNodeContents(element);
			selection.removeAllRanges();
			selection.addRange(range);		
        }
		
		//select link element to edit link etc
		if (tag == "a") {
			Vvveb.Builder.selectNode(element);
			Vvveb.Builder.loadNodeComponent(element);
		}
		return element;
	},
	
	init: function(doc) {
		this.doc = doc;
		let self = this;
		
		document.getElementById("bold-btn").addEventListener("click", function (e) {
				//doc.execCommand('bold',false,null);
				//self.editorSetStyle("b", {"font-weight" : "bold"}, true);
				self.editorSetStyle(false, {"font-weight" : "bold"}, true);
				e.preventDefault();
				return false;
		});

		document.getElementById("italic-btn").addEventListener("click", function (e) {
				//doc.execCommand('italic',false,null);
				//self.editorSetStyle("i", {"font-style" : "italic"}, true);
				self.editorSetStyle(false, {"font-style" : "italic"}, true);
				e.preventDefault();
				return false;
		});

		document.getElementById("underline-btn").addEventListener("click", function (e) {
				//doc.execCommand('underline',false,null);
				//self.editorSetStyle("u", {"text-decoration" : "underline"}, true);
				self.editorSetStyle(false, {"text-decoration" : "underline"}, true);
				e.preventDefault();
				return false;
		});
		
		document.getElementById("strike-btn").addEventListener("click", function (e) {
				//doc.execCommand('strikeThrough',false,null);
				//self.editorSetStyle("strike",  {"text-decoration" : "line-through"}, true);
				self.editorSetStyle(false,  {"text-decoration" : "line-through"}, true);
				e.preventDefault();
				return false;
		});

		document.getElementById("link-btn").addEventListener("click", function (e) {
				//doc.execCommand('createLink',false,"#");
				self.editorSetStyle("a");
				e.preventDefault();
				return false;
		});

		document.getElementById("fore-color").addEventListener("change", function (e) {
				//doc.execCommand('foreColor',false,this.value);
				self.editorSetStyle(false, {"color" : this.value});
				e.preventDefault();
				return false;
		});

		
		document.getElementById("back-color").addEventListener("change", function (e) {
				//doc.execCommand('hiliteColor',false,this.value);
				self.editorSetStyle(false, {"background-color" : this.value});
				e.preventDefault();
				return false;
		});
		
		document.getElementById("font-size").addEventListener("change", function (e) {
				//doc.execCommand('fontSize',false,this.value);
				self.editorSetStyle(false, {"font-size" : this.value});
				e.preventDefault();
				return false;
		});

		let sizes = "<option value=''> - Font size - </option>";
		for (i = 1;i <= 128; i++) {
			sizes += "<option value='"+ i +"px'>"+ i +"</option>";
		}
		document.getElementById("font-size").innerHTML = sizes;		

		document.getElementById("font-family").addEventListener("change", function (e) {
				let option = this.options[this.selectedIndex];
				let element = self.editorSetStyle(false, {"font-family" : this.value});
				Vvveb.FontsManager.addFont(option.dataset.provider, this.value, element);
				//doc.execCommand('fontName',false,this.value);
				e.preventDefault();
				return false;
		});

		document.getElementById("justify-btn").addEventListener("click", function (e) {
				//let command = "justify" + this.dataset.value;
				//doc.execCommand(command,false,"#");
				
				self.editorSetStyle(false, {"text-align" : e.srcElement.dataset.value});
				e.preventDefault();
				return false;
		});
	},
	
	undo: function(element) {
		this.doc.execCommand('undo',false,null);
	},

	redo: function(element) {
		this.doc.execCommand('redo',false,null);
	},
	
	edit: function(element) {
		element.setAttribute("contenteditable", true);
		element.setAttribute("spellcheckker", false);
		document.getElementById("wysiwyg-editor").style.display = "block";

		this.element = element;
		this.isActive = true;
		this.oldValue = element.innerHTML;

		document.getElementById("font-family").value = Vvveb.StyleManager.getStyle(element,'font-family');
		document.getElementById("fore-color").value = Vvveb.StyleManager.getStyle(element,'color');
		document.getElementById("back-color").value = Vvveb.StyleManager.getStyle(element,'background-color');
		element.focus();
	},

	destroy: function(element) {
		element.removeAttribute("contenteditable");
		element.removeAttribute("spellcheckker");
 
		document.getElementById("wysiwyg-editor").style.display = "none";
		this.isActive = false;

	
		node = this.element;
		Vvveb.Undo.addMutation({type:'characterData', 
								target: node, 
								oldValue: this.oldValue, 
								newValue: node.innerHTML});
	}
}
	
Vvveb.Builder = {

	component : {},
	dragMoveMutation : false,
	isPreview : false,
	runJsOnSetHtml : false,
	designerMode : false,
	highlightEnabled : false,
	selectPadding: 0,
	leftPanelWidth: 275,
	ignoreClasses: ["clearfix", "masonry", "has-shadow"],
	
	init: function(url, callback) {

		let self = this;
		
		self.loadControlGroups();
		self.loadBlockGroups();
		self.loadSectionGroups();
		
		self.selectedEl = null;
		self.highlightEl = null;
		self.initCallback = callback;
		
        self.documentFrame = document.querySelector("#iframe-wrapper > iframe");
        self.canvas = document.getElementById("canvas");

		self._loadIframe(url + (url.indexOf('?') > -1 ? '&r=':'?r=') + Math.random());
		
		self._initDragdrop();
		
		self._initBox();

		self.dragElement = null;
		
		self.highlightEnabled = true;
		
		self.leftPanelWidth = document.getElementById("left-panel").width;
		
		self.adjustListsHeight();
		
		window.addEventListener("scroll resize", function(event) {
			self.adjustListsHeight();
		});
	},
	
/* controls */    	
	loadControlGroups : function() {	

		let componentsList = document.querySelectorAll(".components-list");
		let item = {}, component = {};
		let count = 0;
		
		componentsList.forEach(function (list, i) {
			let type = list.dataset.type;
			list.replaceChildren();
			count ++;
			
			for (group in Vvveb.ComponentsGroup) {
				
				list.append(generateElements(
				`<li class="header" data-section="${group}"  data-search="">
					<label class="header" for="${type}_comphead_${group}${count}">
						${group}<div class="header-arrow"></div>
					</label>
					<input class="header_check" type="checkbox" checked="true" id="${type}_comphead_${group}${count}">
					<ol></ol>
				</li>`)[0]);
								
				//list.append('<li class="header clearfix" data-section="' + group + '"  data-search=""><label class="header" for="' + type + '_comphead_' + group + count + '">' + group + '  <div class="header-arrow"></div>\
					//				   </label><input class="header_check" type="checkbox" checked="true" id="' + type + '_comphead_' + group + count + '">  <ol></ol></li>');

				let componentsSubList = list.querySelector('li[data-section="' + group + '"]  ol');
				
				components = Vvveb.ComponentsGroup[ group ];
				
				for (i in components) {
					componentType = components[i];
					component = Vvveb.Components.get(componentType);
					
					if (component) {
						item = generateElements(`<li data-section="${group}" data-drag-type="component" data-type="${componentType}" data-search="${component.name.toLowerCase()}">
							<span>${component.name}</span>
						</li>`)[0];

						if (component.image) {

							item.style.backgroundImage = "url(" + Vvveb.imgBaseUrl + component.image + ")"; 			
							item.style.backgroundRepeat = "no-repeat";
						}
						
						componentsSubList.append(item);
					}
				}
			}
		});
	 },
	 
	loadSectionGroups : function() {	

		let sectionsList = document.querySelectorAll(".sections-list");
		let item = {};

		sectionsList.forEach(function (list, i) {
			let type = list.dataset.type;
			list.replaceChildren();

			for (group in Vvveb.SectionsGroup) {
				list.append(generateElements(
				`<li class="header" data-section="${group}"  data-search="">
					<label class="header" for="${type}_sectionhead_${group}">
						${group}<div class="header-arrow"></div>
					</label>
					<input class="header_check" type="checkbox" checked="true" id="${type}_sectionhead_${group}">
					<ol></ol>
				</li>`)[0]);

				let sectionsSubList = list.querySelector('li[data-section="' + group + '"]  ol');
				sections = Vvveb.SectionsGroup[ group ];

				for (i in sections) {
					sectionType = sections[i];
					section = Vvveb.Sections.get(sectionType);
					
					if (section) {
						item = generateElements(`<li data-section="${group}" data-type="${sectionType}" data-search="${section.name.toLowerCase()}">
									<span class="name">${section.name}</span>
									<div class="add-section-btn" title="Add section"><i class="la la-plus"></i></div>
									<img class="preview" src="" loading="lazy">
								</li>`)[0];

						if (section.image) {

							let image = ((section.image.indexOf('/') == -1) ? Vvveb.imgBaseUrl:'') + section.image;
							
							/*
							Object.assign(item.style,{
								//backgroundImage: "url(" + image + ")",
								//backgroundRepeat: "no-repeat"
							});*/
							
							item.querySelector("img").setAttribute("src", image);
						}
						
						sectionsSubList.append(item)
					}
				}
			}
		});
	 },
	 
	loadBlockGroups : function() {	

		let blocksList = document.querySelectorAll(".blocks-list");
		let item = {};

		blocksList.forEach(function (list, i) {
			let type = list.dataset.type;
			list.replaceChildren();

			for (group in Vvveb.BlocksGroup) {
				list.append(generateElements(
				`<li class="header" data-section="${group}"  data-search="">
					<label class="header" for="${type}_blockhead_${group}">
						${group}<div class="header-arrow"></div>
					</label>
					<input class="header_check" type="checkbox" checked="true" id="${type}_blockhead_${group}">
					<ol></ol>
				</li>`)[0]);

				let blocksSubList = list.querySelector('li[data-section="' + group + '"]  ol');
				blocks = Vvveb.BlocksGroup[ group ];

				for (i in blocks) {
					blockType = blocks[i];
					block = Vvveb.Blocks.get(blockType);
					
					if (block) {
						item = generateElements(`<li data-section="${group}" data-drag-type="block" data-type="${blockType}" data-search="${block.name.toLowerCase()}">
									<span class="name">${block.name}</span>
									<img class="preview" src="" loading="lazy">
								</li>`)[0];

						if (block.image) {

							let image = ((block.image.indexOf('/') == -1) ? Vvveb.imgBaseUrl:'') + block.image;
							/*
							Object.assign(item.style,{
								//backgroundImage: "url(" + image + ")",
								//backgroundRepeat: "no-repeat"
							});*/
							
							item.querySelector("img").setAttribute("src", image);
							
							
						}
						
						blocksSubList.append(item);
					}
				}
			}
		});
	 },
	
	 adjustListsHeight: function () {
		 let left = document.querySelectorAll("#left-panel .drag-elements-sidepane > div:not(.block-preview), #left-panel .component-properties > .tab-content");
		 let right = document.querySelectorAll("#right-panel .drag-elements-sidepane > div:not(.block-preview), #right-panel .component-properties > .tab-content");
		 let wHeight = window.outerHeight;
		 let maxOffset = 0;

		 function adjust(elements) {
			 elements.forEach(function (e,i) {
				 e.style.height = "";
				 let offset =  Math.floor(e.getBoundingClientRect()["top"]);
				 if (offset >= wHeight) return;
				 maxOffset = Math.max(maxOffset, offset);
				 let height = wHeight - maxOffset;
				 if (!offset) {
					height += parseInt(e.dataset.offset ?? 0);
				 }
				 e.style.height = height + "px";
			});
		}
		
		adjust(left);
		maxOffset = 0;
		adjust(right);
	},
	 
	
	loadUrl : function(url, callback) {	
		let self = this;
		document.getElementById("select-box").style.display = "none";
		
		self.initCallback = callback;
		if (Vvveb.Builder.iframe.src != url) Vvveb.Builder.iframe.src = url;
	},
	
/* iframe */
	_loadIframe : function(url) {	

		let self = this;
		self.iframe = this.documentFrame;
		self.iframe.src = url;

	    return this.documentFrame.addEventListener("load", function() {
				window.FrameWindow = self.iframe.contentWindow;
				window.FrameDocument = self.iframe.contentWindow.document;
				let addSectionBox = document.getElementById("add-section-box"); 
				let highlightBox = document.getElementById("highlight-box");
				let SelectBox = document.getElementById("select-box");
				
				highlightBox.style.display = "none"; 
				

				window.FrameWindow.addEventListener("beforeunload", function(event) {
					if (Vvveb.Undo.undoIndex >= 0) {
						let dialogText = "You have unsaved changes";
						event.returnValue = dialogText;
						return dialogText;
					}
				});
				
				window.FrameWindow.addEventListener("unload", function(event) {
					document.querySelector(".loading-message").classList.add("active");
					Vvveb.Undo.reset();
				});
				
				//prevent accidental clicks on links when editing text
				window.FrameDocument.addEventListener("click", function(event) {
					if (Vvveb.WysiwygEditor.isActive && event.target.closest("a"))  {
						event.preventDefault();
						return false;
					}
				});
				
				selectBoxPosition = function(event) {
						let pos;
						let target;
						
						highlightBox.style.display = "none"; 
						
						if (self.selectedEl) {
							pos    = offset(self.selectedEl);
							target = self.selectedEl;
						} else
						if (self.highlightEl) {
							pos    = offset(self.highlightEl);
							target = self.highlightEl;
						}
						
						SelectBox.style.top  = (pos.top - (self.frameDoc.scrollTop ?? 0)  - self.selectPadding) + "px"; 
						SelectBox.style.left = (pos.left - (self.frameDoc.scrollLeft ?? 0) - self.selectPadding) + "px";

						SelectBox.style.width = ((target.offsetWidth ?? target.clientWidth) + self.selectPadding * 2) + "px"; 			
						SelectBox.style.height = ((target.offsetHeight ?? target.clientHeight) + self.selectPadding * 2) + "px";
				}
				
				window.FrameWindow.addEventListener("scroll", selectBoxPosition);
				window.FrameWindow.addEventListener("resize", selectBoxPosition);
			
				Vvveb.WysiwygEditor.init(window.FrameDocument);
				Vvveb.StyleManager.init(window.FrameDocument);
				Vvveb.ColorPaletteManager.init(window.FrameDocument);

				if (self.initCallback) self.initCallback();

                return self._frameLoaded();
        });		
        
	},	
    
    _frameLoaded : function() {
		
		let self = Vvveb.Builder;
		
		self.frameDoc  = window.FrameDocument;
		self.frameHtml = window.FrameDocument.querySelector("html");
		self.frameBody = window.FrameDocument.querySelector("body");
		self.frameHead = window.FrameDocument.querySelector("head");
		
		//insert editor helpers like non editable areas
		self.frameHead.append(generateElements('<link data-vvveb-helpers href="' + Vvveb.baseUrl + '../../css/vvvebjs-editor-helpers.css" rel="stylesheet">')[0]);

		self._initHighlight();
		
		window.dispatchEvent(new CustomEvent("vvveb.iframe.loaded", {detail: self.frameDoc}));

		document.querySelector(".loading-message").classList.remove("active");
		
		//enable save button only if changes are made
		let setSaveButtonState = function (e) { 
			if (Vvveb.Undo.hasChanges()){
				document.querySelectorAll("#top-panel .save-btn").forEach(e => e.removeAttribute("disabled"));
			} else {
				document.querySelectorAll("#top-panel .save-btn").forEach(e => e.setAttribute("disabled", "true"));
			}
		};		
		
		Vvveb.Builder.frameBody.addEventListener("vvveb.undo.add", setSaveButtonState);		
		Vvveb.Builder.frameBody.addEventListener("vvveb.undo.restore", setSaveButtonState);		
    },	
    
    _getElementType: function(el) {
		
		//search for component attribute
		let componentName = '';  
		let componentAttribute = '';  
		   
		if (el.attributes) {
			for (let j = 0; j < el.attributes.length; j++){
			  let nodeName = el.attributes[j].nodeName;	
			  
			  if (nodeName.indexOf('data-component') > -1)	 {
				componentName = nodeName.replace('data-component-', '');	
				return [componentName, "component"];
			  }		  
			  
			  if (nodeName.indexOf('data-v-component-') > -1)	 {
				componentName = nodeName.replace('data-v-component-', '');	
				return [componentName,"component"];
			  }

			  if (nodeName.indexOf('data-v-') > -1)	 {
				componentAttribute = (componentAttribute ? componentAttribute + " - " : "") + 
										nodeName.replace('data-v-', '') + " ";	
			  }
			}
		}

		if (componentAttribute != '') return [componentAttribute, "attribute"];
		
		if (el.id) {
			componentName = "#" + el.id;
		} else {
			componentName = (el.className && (typeof el.className == "string")) ? "." + el.className.split(" ")[0] : "";
		}
		
		return [componentName, el.tagName];
	},
	
	loadNodeComponent:  function(node) {
		data = Vvveb.Components.matchNode(node);
		let component;
		
		if (data) 
			component = data.type;
		else 
			component = Vvveb.defaultComponent;
			
		Vvveb.component = Vvveb.Components.get(component);	
		Vvveb.Components.render(component);

	},
	
	moveNodeUp:  function(node) {
		if (!node) {
			node = Vvveb.Builder.selectedEl;
		}

		oldParent = node.parentNode;
		oldNextSibling = node.nextSibling;

		next = node.previousElementSibling;
		
		if (next) {
			next.before(node);
		} else {
			node.parentNode.before(node);
		}
		
		Vvveb.Builder.selectNode(node);

		newParent = node.parentNode;
		newNextSibling = node.nextSibling;
		
		Vvveb.Undo.addMutation({type: 'move', 
								target: node,
								oldParent: oldParent,
								newParent: newParent,
								oldNextSibling: oldNextSibling,
								newNextSibling: newNextSibling});

	},

	moveNodeDown:  function(node) {
			if (!node) {
				node = Vvveb.Builder.selectedEl;
			}

			oldParent = node.parentNode;
			oldNextSibling = node.nextSibling;

			next = node.nextElementSibling;
			
			if (next) {
				next.after(node);
			} else {
				node.parentNode.after(node);
			}
			
			Vvveb.Builder.selectNode(node);
			
			newParent = node.parentNode;
			newNextSibling = node.nextSibling;
			
			Vvveb.Undo.addMutation({type: 'move', 
									target: node,
									oldParent: oldParent,
									newParent: newParent,
									oldNextSibling: oldNextSibling,
									newNextSibling: newNextSibling});
	},

	cloneNode:  function(node) {
		if (!node) {
			node = Vvveb.Builder.selectedEl;
		}

		clone = node.cloneNode(true);
		
		node.after(clone);
		
		node.click();
		
		element = clone;
		
		Vvveb.Undo.addMutation({type: 'childList', 
								target: node.parentNode, 
								addedNodes: [element],
								nextSibling: node.nextSibling});
		
	},
	
	
	selectNode:  function(node) {
		let SelectBox = document.getElementById("select-box");
		
		if (!node) {
			SelectBox.style.display = "none";
			return;
		}

		let self = this;
		let SelectActions = document.getElementById("select-actions");
		let AddSectionBtn = document.getElementById("add-section-btn");
		let elementType = this._getElementType(node);
		
		if (self.texteditEl && (self.selectedEl != node)) {
			Vvveb.WysiwygEditor.destroy(self.texteditEl);
			self.selectPadding = 0;
			SelectBox.classList.remove("text-edit");
			SelectActions.style.display = "";
			self.texteditEl = null;
		}

		if (elementType[1] == "BODY") {
			SelectActions.style.display = "none";
			AddSectionBtn.style.display = "none";
		} else {
			SelectActions.style.display = "";
			AddSectionBtn.style.display = "";
		}

		let target = node;
		self.selectedEl = target;

		try {
			let pos = offset(target);
				
			SelectBox.style.top  = (pos.top - (self.frameDoc.scrollTop ?? 0)  - self.selectPadding) + "px"; 
			SelectBox.style.left = (pos.left - (self.frameDoc.scrollLeft ?? 0) - self.selectPadding) + "px"; 			
			SelectBox.style.width = ((target.offsetWidth ?? target.clientWidth) + self.selectPadding * 2) + "px"; 			
			SelectBox.style.height = ((target.offsetHeight ?? target.clientHeight) + self.selectPadding * 2) + "px";
			SelectBox.style.display = "block";
				 
			Vvveb.Breadcrumb.loadBreadcrumb(target);
		
		} catch(err) {
			console.log(err);
			return false;
		}
			 
		document.querySelector("#highlight-name .type").innerHTML = elementType[0];
		document.querySelector("#highlight-name .name").innerHTML = elementType[1];
		
	},

/* iframe highlight */    
    _initHighlight: function() {
		
		let self = Vvveb.Builder;
		
		let highlightMove = function(event) {
			if (self.highlightEnabled == true && event.target && isElement(event.target)) {

				self.highlightEl = target = event.target;
				let pos = offset(target);
				let height = target.offsetHeight;
				let halfHeight = Math.max(height / 2, 5);
				let width = target.offsetWidth;
				let halfWidth = Math.max(width / 2, 5);
				let prepend = true;
				
				let x = event.x;
				let y = event.y;

				if (self.isResize) {
					if (!self.initialPosition) {
						self.initialPosition = {x,y};
					}
					
					let deltaX = x - self.initialPosition.x; 
					let deltaY = y - self.initialPosition.y; 
					
					pos = offset(self.selectedEl);
					
					width = self.initialSize.width;
					height = self.initialSize.height;
					
					switch (self.resizeHandler) {
						// top
						case "top-left":
							height -= deltaY; 
							width -= deltaX; 
						break;
						
						case "top-center":
							height -= deltaY; 
						break;
						
						case "top-right":
							height -= deltaY; 
							width += deltaX; 
						break;
						
						// center 
						case "center-left":
							width -= deltaX; 
						break;
						
						case "center-right":
							width += deltaX; 
						break;
						
						// bottom 
						case "bottom-left":
							width -= deltaX; 
							height += deltaY; 
						break;
						
						case "bottom-center":
							height += deltaY; 
						break;
						
						case "bottom-right":
							width += deltaX; 
							height += deltaY; 
						break;
					}
				
				    if (self.resizeMode == "css") {
				        self.selectedEl.style.width = width + "px";
				        self.selectedEl.style.height = height + "px";
				    } else {
				        self.selectedEl.setAttribute("width", width);
				        self.selectedEl.setAttribute("height", height);
				    }

					let SelectBox = document.getElementById("select-box");
					SelectBox.style.top  = pos.top - (self.frameDoc.scrollTop ?? 0) + "px"; 
					SelectBox.style.left = pos.left - (self.frameDoc.scrollLeft ?? 0) + "px"; 			
					SelectBox.style.width = width + "px"; 			
					SelectBox.style.height = self.selectedEl.offsetHeight + "px";
					SelectBox.style.display = "block";
				
				} else if (self.isDragging) {
					let parent = self.highlightEl;
					let parentTagName = parent.tagName.toLowerCase();
					
					let noChildren = {
						input: true,
						textarea: true,
						img: true,
						svg: true,
						iframe: true,
						embed: true,
						col: true,
						area: true,
						hr: true,
						br: true,
						wbr: true
					};
					
					try {
							if ((pos.top  < (y - halfHeight)) || (pos.left  < (x - halfWidth))) {
								if (noChildren[parentTagName]) { 
									self.dragElement.after(parent);
								} else {
									if (parent == self.dragElement.parenNode) {
										parent.appendChild(self.dragElement);
									} else {
										parent.append(self.dragElement);
									}
								}

								prepend = true;
							} else {
								if (noChildren[parentTagName]) { 
									parent.parentNode.insertBefore(self.dragElement, parent);
								} else {
									parent.prepend(self.dragElement);
								}

								prepend = false;
							};
							
							if (self.designerMode) {
								let parentOffset = offset(self.dragElement.offsetParent);
								self.dragElement.style.position =  "absolute"; 
								self.dragElement.style.x = x - (parentOffset.left - self.frameDoc.scrollLeft); 
								self.dragElement.style.y = y - (parentOffset.top - self.frameDoc.scrollTop); 			
							}
							
					} catch(err) {
						console.log(err);
						return false;
					}
					
					if (!self.designerMode && self.iconDrag) {
						self.iconDrag.style.top  = (y + 60) + "px"; 
						self.iconDrag.style.left = (x + self.leftPanelWidth + 10) + "px"; 			
					}
				}// else //uncomment else to disable parent highlighting when dragging
				{
					//if text editor is open check if the highlighted element is not inside the editor
					if (Vvveb.WysiwygEditor.isActive )  {
						if (self.texteditEl.contains(event.target)) {
							return true;
						}
					}
						 
					document.getElementById("highlight-box").setAttribute("style",
						`top:${pos.top - (self.frameDoc.scrollTop ?? 0)}px; 
						 left:${pos.left - (self.frameDoc.scrollLeft ?? 0)}px;
						 width:${width}px; 
						 height:${height}px;
						 display:${event.target.hasAttribute('contenteditable') ? "none":"block"};
						 border:${self.isDragging ? "1px dashed #0d6efd":""};
					`);

					if (height < 50) {
						document.getElementById("section-actions").classList.add("outside");	 
					} else {
						document.getElementById("section-actions").classList.remove("outside");	
					}

					let elementType = self._getElementType(event.target);
					document.querySelector("#highlight-name .type").innerHTML = elementType[0];
					document.querySelector("#highlight-name .name").innerHTML = elementType[1];
				}
			}	
			
		};
		
		self.frameBody.addEventListener("mousemove", highlightMove);
		
		let highlightUp = function(event) {
			self.isResize = false;
			document.querySelectorAll("#section-actions, #highlight-name").forEach(el => el.style.display = "");
			if (self.isDragging) {
				self.isDragging = false;
				Vvveb.Builder.highlightEnabled = true;
				if (self.iconDrag) self.iconDrag.remove();
				document.getElementById("component-clone")?.remove();

				if (self.dragMoveMutation === false) {				
					if (self.component.dragHtml || Vvveb.dragHtml) { //if dragHtml is set for dragging then set real component html
						if (self.component) {
							newElement = generateElements(self.component.html)[0];
							self.dragElement.replaceWith(newElement);
							self.dragElement = newElement;
						}
					} 
					
					if (self.component.afterDrop) self.dragElement = self.component.afterDrop(self.dragElement);
				} else {
					self.selectedEl.classList.remove("is-dragged");
					self.dragElement.replaceWith(self.selectedEl);
					self.dragElement = self.selectedEl;
				}

				node = self.dragElement;
				self.selectNode(node);
				Vvveb.TreeList.loadComponents();
				Vvveb.TreeList.selectComponent(node);
				self.loadNodeComponent(node);
				//if component properties is loaded in left panel tab instead of right panel show tab
				let propertiesTab = document.querySelector(".component-properties-tab a");
				if (propertiesTab.offsetParent) {//if properites tab is enabled/visible 
						propertiesTab.style.display = "";
						const bsTab = bootstrap.Tab.getOrCreateInstance(propertiesTab);
						bsTab.show(); 
				}
				
				if (self.dragMoveMutation === false) {
					Vvveb.Undo.addMutation({type: 'childList', 
											target: node.parentNode, 
											addedNodes: [node], 
											nextSibling: node.nextSibling});
				} else {
					self.dragMoveMutation.newParent = node.parentNode;
					self.dragMoveMutation.newNextSibling = node.nextSibling;
					
					Vvveb.Undo.addMutation(self.dragMoveMutation);
					self.dragMoveMutation = false;
				}
			}
		};
		
		self.frameBody.addEventListener("mouseup", highlightUp);

		let highlightDbClick = function(event) {
			
			if (Vvveb.Builder.isPreview == false) {
				
				if (!Vvveb.WysiwygEditor.isActive)  {
					self.selectPadding = 10;
					self.texteditEl = target = event.target;

					Vvveb.WysiwygEditor.edit(self.texteditEl);
					
					_updateSelectBox = function(event) {
						if (!self.texteditEl) return;
						let pos = offset(self.selectedEl);

						let SelectBox = document.getElementById("select-box");

						SelectBox.style.top  = (pos.top - (self.frameDoc.scrollTop ?? 0)  - self.selectPadding) + "px";
						SelectBox.style.left = (pos.left - (self.frameDoc.scrollLeft ?? 0) - self.selectPadding) + "px";
						SelectBox.style.width = (self.texteditEl.offsetWidth + (self.selectPadding * 2)) + "px";
						SelectBox.style.height = (self.texteditEl.offsetHeight + (self.selectPadding * 2)) + "px";
						SelectBox.style.display = "block";
					};
					
					//update select box when the text size is changed
					self.texteditEl.addEventListener("blur", _updateSelectBox);	
					self.texteditEl.addEventListener("keyup", _updateSelectBox);	
					self.texteditEl.addEventListener("paste", _updateSelectBox);	
					self.texteditEl.addEventListener("input", _updateSelectBox);	
					_updateSelectBox();	
					
					document.getElementById("select-box").classList.add("text-edit")
					document.getElementById("select-actions").style.display = "none";
					document.getElementById("highlight-box").style.display = "none";
				}
		 	}
		};
		
		self.frameBody.addEventListener("dblclick", highlightDbClick);
		
		let highlightClick = function(event) {
			
			if (Vvveb.Builder.isPreview == false){
				if (event.target) {
					if (Vvveb.WysiwygEditor.isActive )  {
						if (self.texteditEl.contains(event.target)) {
							return true;
						}
					}
					//if component properties is loaded in left panel tab instead of right panel show tab
					let componentTab = document.querySelector(".component-properties-tab a");
					if (componentTab.offsetParent) { //if properites tab is enabled/visible 
						componentTab.style.display = "";
						const bsTab = bootstrap.Tab.getOrCreateInstance(componentTab);
						bsTab.show(); 
					}
					
					self.selectNode(event.target);
					Vvveb.TreeList.selectComponent(event.target);
					self.loadNodeComponent(event.target);

					if (Vvveb.component.resizable) {
						document.getElementById("select-box").classList.add("resizable");
                      	self.resizeMode = Vvveb.component.resizeMode;
					} else {
						document.getElementById("select-box").classList.remove("resizable");
					}
					
					document.getElementById("add-section-box").style.display = "none";
					event.preventDefault();
					return false;
				}	
			}	
			
		};
		
		self.frameBody.addEventListener("click", highlightClick);
		
	},
	
	_initBox: function() {
		let self = this;
		
		document.getElementById("drag-btn").addEventListener("mousedown", function(event) {
			//self.dragElement = self.selectedEl.setAttribute("style",Vvveb.dragElementStyle);
			if (event.which == 1) {//left click
				self.isDragging = true;
				document.querySelectorAll("#section-actions, #highlight-name, #select-box").forEach(el => el.style.display = "");
				
				
				if (self.designerMode) {
					self.dragElement = self.selectedEl;
				} else {
					self.selectedEl.style.position  = ""; 
					self.selectedEl.style.top  = ""; 
					self.selectedEl.style.left = ""; 			

					self.selectedEl.classList.add("is-dragged");
					self.dragElement = generateElements(Vvveb.dragHtml)[0];
				}

				node = self.selectedEl;			

				self.dragMoveMutation = {type: 'move', 
									target: node,
									oldParent: node.parentNode,
									oldNextSibling: node.nextSibling};
					
				//self.selectNode(false);
				event.preventDefault();
				return false;
			}
		});


		let resizeDown = function(event) {
			if (event.which == 1) {//left click
				document.querySelector("#section-actions, #highlight-name, #highlight-box").style.display = "none";
				
				self.isResize = true;
				self.initialSize = {"width" : self.selectedEl.offsetWidth, "height" : self.selectedEl.offsetHeight};
				self.initialPosition = false;
				self.resizeHandler = this.className;

				event.preventDefault();
				return false;
			}
		};
		
		document.querySelectorAll(".resize > div").forEach(e => e.addEventListener("mousedown", resizeDown));

		document.getElementById("down-btn").addEventListener("click", function(event) {

			document.getElementById("select-box").style.display = "none";

			Vvveb.Builder.moveNodeDown();

			event.preventDefault();
			return false;
		});
		
		document.getElementById("up-btn").addEventListener("click", function(event) {
			document.getElementById("select-box").style.display = "none";

			Vvveb.Builder.moveNodeUp();

			event.preventDefault();
			return false;
		});
		
		document.getElementById("clone-btn").addEventListener("click", function(event) {
			
			Vvveb.Builder.cloneNode();
			
			event.preventDefault();
			return false;
		});
		
		document.getElementById("parent-btn").addEventListener("click", function(event) {
			
			node = self.selectedEl.parentNode;
			
			self.selectNode(node);
			self.loadNodeComponent(node);
			Vvveb.TreeList.selectComponent(node);
			
			event.preventDefault();
			return false;
		});		
		
		document.getElementById("save-reusable-btn").addEventListener("click", function(event) {
			
			node = self.selectedEl;

			let type = 'block';
			if (node.tagName.toLowerCase() == 'section') {
				type = 'section';
			}
			
			let name = prompt("Enter name for new reusable " + type, '');
			if (name) {
				Vvveb.Builder.saveElement(node, type, name);
			}
			
			event.preventDefault();
			return false;
		});
		
		let codeEditorOldValue;
		document.getElementById("edit-code-btn").addEventListener("click", function(event) {
			let value = Vvveb.Builder.selectedEl.innerHTML;

			Vvveb.ModalCodeEditor.show();
			Vvveb.ModalCodeEditor.setValue(value);
			
			codeEditorOldValue = value;

			event.preventDefault();
			return false;
		});

		let onSave = function(event) {
			Vvveb.Builder.selectedEl.innerHTML = event.detail;
			
			node = Vvveb.Builder.selectedEl;
			Vvveb.Undo.addMutation({type:'characterData', 
				target: node, 
				oldValue: codeEditorOldValue, 
				newValue: node.innerHTML});				
				
			Vvveb.Builder.selectNode(node);	
		};
		
		window.addEventListener("vvveb.ModalCodeEditor.save", onSave); 
		
		document.getElementById("translate-code-btn")?.addEventListener("click", function(event) {
			let selectedEl = Vvveb.Builder.selectedEl;
			let value = selectedEl.innerHTML.trim();
			// uncomment to use outerHTML, not recommended
			//let value = selectedEl.outerHTML;
			Vvveb.ModalCodeEditor.show();
			Vvveb.ModalCodeEditor.setValue(value);

			let onSave = function(event) { 
				selectedEl.innerHTML = event.detail;
				//selectedEl.outerHTML = value;
			};

			window.removeEventListener("vvveb.ModalCodeEditor.save", onSave); 
			window.addEventListener("vvveb.ModalCodeEditor.save", onSave); 
				
			event.preventDefault();
			return false;
		});

		document.getElementById("delete-btn").addEventListener("click", function(event) {
			document.getElementById("select-box").style.display = "none";
			
			node = self.selectedEl;
		
			Vvveb.Undo.addMutation({type: 'childList', 
									target: node.parentNode, 
									removedNodes: [node],
									nextSibling: node.nextSibling});

			self.selectedEl.remove();

			event.preventDefault();
			return false;
		});

		let addSectionBox = document.getElementById("add-section-box");
		let addSectionElement = {};
		
		document.getElementById("add-section-btn").addEventListener("click", function(event) {
			
			addSectionElement = self.highlightEl; 
			addSectionBox.style.display  = "block"; 

			let pos = offset(addSectionElement);	
			let top = ((pos.top + window.FrameWindow.pageYOffset + addSectionElement.clientTop) - self.frameHtml.scrollTop) + addSectionElement.offsetHeight;
			let left = ((pos.left + window.FrameWindow.pageXOffset + addSectionElement.clientLeft) - self.frameHtml.scrollLeft) + (addSectionElement.offsetWidth / 2) - (addSectionBox.offsetWidth / 2);
			let outerHeight = window.FrameWindow.innerHeight + self.frameHtml.scrollTop;

			//check if box is out of viewport and move inside
			if (left < 0) left = 0;
			if (top < 0) top = 0;
			if ((left + addSectionBox.offsetWidth) > self.frameHtml.offsetWidth) left = self.frameHtml.offsetWidth - addSectionBox.offsetWidth;
			if (((top + addSectionBox.offsetHeight) + self.frameHtml.scrollTop) > outerHeight) top = top - addSectionBox.offsetHeight;
			
			addSectionBox.style.top  = top + "px"; 
			addSectionBox.style.left  = left + "px"; 

			event.preventDefault();
			return false;
		});
		
		document.getElementById("close-section-btn").addEventListener("click", function(event) {
			addSectionBox.style.display = "none";
		});
		
		function addSectionComponent(component, after = true) {
			let node = generateElements(component.html)[0];
			
			if (after) {
				addSectionElement.after(node);
			} else {
				addSectionElement.append(node);
			}
			
			if (component.afterDrop) {
				node = component.afterDrop(node);
			}

			node = node;
			self.selectNode(node);
			self.loadNodeComponent(node);
			Vvveb.TreeList.loadComponents();
			Vvveb.TreeList.selectComponent(node);

			Vvveb.Undo.addMutation({type: 'childList', 
									target: node.parentNode, 
									addedNodes: [node], 
									nextSibling: node.nextSibling});
		}
		
		addSectionBox.addEventListener("click", function(event) {
			let element = event.target.closest(".components-list li ol li");
			if (element) {
				let html = Vvveb.Components.get(element.dataset.type);

				addSectionComponent(html, (document.querySelector("[name='add-section-insert-mode']:checked").value == "after"));

				addSectionBox.style.display = "none";
			}
		});

		addSectionBox.addEventListener("click", function(event) {
			let element = event.target.closest(".blocks-list li ol li");
			if (element) {
				let html = Vvveb.Blocks.get(element.dataset.type);

				addSectionComponent(html, (document.querySelector("[name='add-section-insert-mode']:checked").value == "after"));

				addSectionBox.style.display = "none";
			}
		});
		

		addSectionBox.addEventListener("click", function(event) {
			let element = event.target.closest(".sections-list li ol li");
			if (element) {
				let html = Vvveb.Sections.get(element.dataset.type);

				addSectionComponent(html, (document.querySelector("[name='add-section-insert-mode']:checked").value == "after"));

				addSectionBox.style.display = "none";
			}
		});
		
	},	

/* drag and drop */
	_initDragdrop : function() {

		let self = this;
		self.isDragging = false;	
		
		document.addEventListener("mousedown", function(event) {
			let element = event.target.closest(".drag-elements-sidepane ul > li > ol > li[data-drag-type]");
			
			if (element && event.which == 1) {//left click
				document.getElementById("component-clone")?.remove();
				document.querySelector("#section-actions, #highlight-name, #select-box").style.display = "none";
				
				if (element.dataset.dragType == "component") {
					self.component = Vvveb.Components.get(element.dataset.type);
				}
				else if (element.dataset.dragType == "section") {
					self.component = Vvveb.Sections.get(element.dataset.type);
				}
				else if (element.dataset.dragType == "block") {
					self.component = Vvveb.Blocks.get(element.dataset.type);
				}
				
				if (self.component.dragHtml) {
					html = self.component.dragHtml;
				} else if (Vvveb.dragHtml) { 
					html = Vvveb.dragHtml;
				} else {
					html = self.component.html;
				}
				
				self.dragElement = generateElements(html)[0];
				//self.dragElement.css("border", "1px dashed #4285f4");
				
				if (self.component.dragStart) self.dragElement = self.component.dragStart(self.dragElement);

				self.isDragging = true;
				if (Vvveb.dragIcon == 'html') {
					self.iconDrag = generateElements(html)[0];
					self.iconDrag.setAttribute("id", "dragElement-clone");
					self.iconDrag.style.position = "absolute";
				}
				else if (self.designerMode == false) {
					self.iconDrag = document.createElement("img");
					self.iconDrag.setAttribute("id", "dragElement-clone");
					self.iconDrag.setAttribute("src", element.style.backgroundImage.replace(/^url\(['"](.+)['"]\)/, '$1'));
					
					self.iconDrag.style.zIndex = "100";
					self.iconDrag.style.position = "absolute";
					self.iconDrag.style.width = "64px";
					self.iconDrag.style.height = "64px";
					self.iconDrag.style.top = event.y + "px";
					self.iconDrag.style.left = event.x + "px";
				}
					
				document.body.append(self.iconDrag);
				
				event.preventDefault();
				return false;
			}
		});
		
		document.addEventListener('mouseup', function(event) {
			if (self.iconDrag && self.isDragging == true) {
				self.isDragging = false;
				document.getElementById("component-clone")?.remove();
				document.querySelectorAll("#section-actions, #highlight-name, #select-box").forEach(el => el.style.display = "");
				self.iconDrag.remove();
				if(self.dragElement){
					self.dragElement.remove();
				}
			}
		});
		
		document.addEventListener('mousemove', function(event) {
			if (self.iconDrag && self.isDragging == true) {
				let x = (event.clientX || event.clientX);
				let y = (event.clientY || event.clientY);

				self.iconDrag.style.left  = (x - 60) + "px";
				self.iconDrag.style.top  = (y - 30) + "px";

				elementMouseIsOver = document.elementFromPoint(x - 60, y - 40);
				
				//if drag elements hovers over iframe switch to iframe mouseover handler	
				return;
				if (elementMouseIsOver && elementMouseIsOver.tagName == 'IFRAME') {
					self.frameBody.dispatchEvent(new MouseEvent("mousemove", {
								bubbles: true,
								cancelable: true,
					}));					
					
					//self.frameBody.trigger("mousemove", event);
					event.stopPropagation();
					self.selectNode(false);
				}
			}
		});
		
		document.addEventListener("mouseup", function(event) {
			let element = event.target.closest(".drag-elements-sidepane ul > ol > li > li");
			if (element) {
				self.isDragging = false;
				document.getElementById("component-clone")?.remove()
				document.querySelectorAll("#section-actions, #highlight-name, #select-box").forEach(el => el.style.display = "");
			}
		});
			
	},
	
	removeHelpers: function (html, keepHelperAttributes = false) {
		//tags like stylesheets or scripts 
		html = html.replace(/<[^>]+?data-vvveb-helpers.+?>/gi, "");
		//attributes
		if (!keepHelperAttributes) {
			html = html.replace(/\s*data-vvveb-\w+(=["'].*?["'])?\s*/gi, "");
		}
		
		html = html.replaceAll("vvveb-hidden", "");
		return html;
	},

	getHtml: function(keepHelperAttributes = true) {
		let doc = window.FrameDocument;
		let hasDoctpe = (doc.doctype !== null);
		let html = "";
		
		doc.querySelectorAll("[contenteditable]").forEach(e => e.removeAttribute("contenteditable"));
		doc.querySelectorAll("[spellcheckker]").forEach(e => e.removeAttribute("spellcheckker"));
		doc.querySelectorAll('script[src^="chrome-extension://"]').forEach(e => e.remove());
		doc.querySelectorAll('script[src^="moz-extension://"]').forEach(e => e.remove());
		
		// scroll page to top to avoid saving the page in a different state
		// like saving with sticky classes set for navbar etc
		// this.iframe.contentWindow.scrollTo(0,0);
		
		window.dispatchEvent(new CustomEvent("vvveb.getHtml.before", {detail: doc}));

		if (hasDoctpe) html =
		"<!DOCTYPE "
         + doc.doctype.name
         + (doc.doctype.publicId ? ' PUBLIC "' + doc.doctype.publicId + '"' : '')
         + (!doc.doctype.publicId && doc.doctype.systemId ? ' SYSTEM' : '') 
         + (doc.doctype.systemId ? ' "' + doc.doctype.systemId + '"' : '')
         + ">\n";
          
         Vvveb.FontsManager.cleanUnusedFonts();

         html += doc.documentElement.outerHTML;
         html = this.removeHelpers(html, keepHelperAttributes);
         
		 window.dispatchEvent(new CustomEvent("vvveb.getHtml.after", {detail: doc}));
		 window.dispatchEvent(new CustomEvent("vvveb.getHtml.filter", {detail: html}));
         
         return html;
	},
	
	setHtml: function(html) {
		//documentElement.innerHTML resets <head> each time and the page flickers
		//return window.FrameDocument.documentElement.innerHTML = html;
		
		function getTag(html, tag, outerHtml = false) {
			start = html.indexOf("<" + tag);
			end = html.indexOf("</" + tag);		

			if (start >= 0 && end >= 0) {
				if (outerHtml)
					return html.slice(start, end + 3 + tag.length);
				else
					return html.slice(html.indexOf(">", start) + 1, end);
			} else {
				return html;
			}
		}

		if (this.runJsOnSetHtml) {
			this.frameBody.innerHTML = getTag(html, "body");
		}
		else {
			window.FrameDocument.body.innerHTML = getTag(html, "body");
		}
			
		//use outerHTML if you want to set body tag attributes
		//window.FrameDocument.body.outerHTML = getTag(html, "body", true);

		//set head html only if changed to avoid page flicker
		let headHtml = getTag(html, "head");
		if (window.FrameDocument.head.innerHTML != headHtml) {
			window.FrameDocument.head.innerHTML = headHtml;
		}
	},

	saveElement: function(element, type, name, callback) {
		if (type == 'section') {
			Vvveb.Sections.add('reusable/'+ name, {
				name,
				image: "img/logo-small.png",
				html: element.outerHTML});
			
			if (Vvveb.SectionsGroup["Reusable"] === undefined) {
				Vvveb.SectionsGroup["Reusable"] = [];
			}
			
			Vvveb.SectionsGroup["Reusable"].push('reusable/'+ name);
			Vvveb.Builder.loadSectionGroups();
		} else {
			Vvveb.Blocks.add('reusable/'+ name, {
				name,
				image: "img/logo-small.png",
				html: element.outerHTML});
			
			if (Vvveb.BlocksGroup["Reusable"] === undefined) {
				Vvveb.BlocksGroup["Reusable"] = [];
			}
			
			Vvveb.BlocksGroup["Reusable"].push('reusable/'+ name);
			Vvveb.Builder.loadBlockGroups();
		}
		
		let data = {type, name, html:element.outerHTML};
		
		fetch(saveReusableUrl, {method: "POST",  body: new URLSearchParams(data)})
		.then((response) => {
			if (!response.ok) { throw new Error(response) }
			return response.text()
		})
		.then((data) => {
			if (callback) callback(data);
			let bg = "bg-success";
			if (true || data.success || text == "success") {		
			} else {
				bg = "bg-danger";
			}
			
			displayToast(bg, "Save", data.message ?? data);					
		})
		.catch(error => {
			console.log(error.statusText);
			displayToast("bg-danger", "Error", "Error saving!");
		});
		/*
		return $.ajax({
			type: "POST",
			url: saveReusableUrl,//set your server side save script url
			data: data,
			cache: false,
		}).done(function (data, text) {
			if (callback) callback(data);
			let bg = "bg-success";
			if (data.success || text == "success") {		
			} else {
				bg = "bg-danger";
			}
			
			displayToast(bg, "Save", data.message ?? data);			
		}).fail(function (data) {
			displayToast("bg-danger", "Error", "Error saving!");
			alert(data.responseText);
		});		
		*/
	},
	
	saveAjax: function(data, saveUrl, callback, error ) {
		if (!data["file"]) {
			data["file"]  = Vvveb.FileManager.getCurrentFileName();
		}
		        
		if (!data["startTemplateUrl"]) {
			data["html"] = this.getHtml();
		}

		//data['elements'] = new URLSearchParams(data['elements']);

		return fetch(saveUrl, {
			method: "POST",  
			headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
			body:  nestedFormData(data)
		})
		.then((response) => {
			if (!response.ok) {  return Promise.reject(response);  }
			return response.text();
		})
		.then((data) => {
			if (callback) callback(data);
			Vvveb.Undo.reset();
			document.querySelectorAll("#top-panel .save-btn").forEach(e => e.setAttribute("disabled", "true"));
		})
		.catch((err) => {
			if (error) error(err);
			let message = error.statusText ?? "Error saving!";
			displayToast("bg-danger", "Error", message);

			err.text().then( errorMessage => {
			  	let message = errorMessage.substr(0, 200);
				displayToast("bg-danger", "Error", message);
			})
		});
	},
	
	setDesignerMode: function(designerMode = false) {
		this.designerMode = designerMode;
	}

};

Vvveb.ModalCodeEditor = {
	modal: false,
	editor: false,
	
	init: function(modal = false, editor = false) {
		if (modal) {
			this.modal = modal;
		} else {
			this.modal = document.getElementById('codeEditorModal');
		}
		if (editor) {
			this.editor = editor;
		} else {
			this.editor = this.modal.querySelector('textarea');
		}
		
		let self = this;

		this.modal.querySelector('.save-btn').addEventListener("click",  function(event) {
			window.dispatchEvent(new CustomEvent("vvveb.ModalCodeEditor.save", {detail: self.getValue()}));
			self.hide();
			return false;
		});
	},
	
	show: function(value) {
		if (!this.modal) {
			this.init();
		}
		
		const bsModal = bootstrap.Modal.getOrCreateInstance(this.modal);
		return bsModal.show(); 
	},

	hide: function(value) {
		const bsModal = bootstrap.Modal.getOrCreateInstance(this.modal);
		return bsModal.hide(); 
	},
	
	getValue: function() {
		return this.editor.value;;
	},
	
	setValue: function(value) {
		if (!this.modal) {
			this.init();
		}
		this.editor.value = value;
	},
}

Vvveb.CodeEditor = {
	
	isActive: false,
	oldValue: '',
	doc:false,
	textarea:false,
	
	init: function(doc) {
		this.textarea = document.querySelector("#vvveb-code-editor textarea");
		this.textarea.value = Vvveb.Builder.getHtml();

		this.textarea.addEventListener("keyup", e => {
			delay(() => Vvveb.Builder.setHtml(this.value), 1000);
		});

		//load code on document changes
		Vvveb.Builder.frameBody.addEventListener("vvveb.undo.add", () => Vvveb.CodeEditor.setValue());
		Vvveb.Builder.frameBody.addEventListener("vvveb.undo.restore", () => Vvveb.CodeEditor.setValue());
		
		//load code when a new url is loaded
		Vvveb.Builder.documentFrame.addEventListener("load", () => Vvveb.CodeEditor.setValue());

		this.isActive = true;
	},

	setValue: function(value) {
		if (this.isActive) {
			this.textarea.value = Vvveb.Builder.getHtml();
		}
	},

	destroy: function(element) {
		//this.isActive = false;
	},

	toggle: function() {
		if (this.isActive != true) {
			this.isActive = true;
			return this.init();
		}
		this.isActive = false;
		this.destroy();
	}
}


Vvveb.CssEditor = {
	
	isActive: false,
	oldValue: '',
	doc:false,
	textarea:false,
	
	init: function(doc) {
		this.textarea = document.getElementById("css-editor")
		this.textarea.value = Vvveb.StyleManager.getCss();
		let self = this;
		
		document.querySelectorAll('[href="#css-tab"],[href="#configuration"]').forEach( t => t.addEventListener("click", e => {
			self.textarea.value = Vvveb.StyleManager.getCss();
		}));
		
		this.textarea.addEventListener("keyup", e => {
			delay(() => Vvveb.StyleManager.setCss(self.textarea.value), 1000);
		});
	},

	getValue: function() {
		return this.textarea.value;
	},
	
	setValue: function(value) {
		this.textarea.value = value;
		Vvveb.StyleManager.setCss(value);
	},

	destroy: function() {
	}
}

function displayToast(bg, title, message, id = "top-toast") {
	document.querySelector("#" + id + " .toast-body .message").innerHTML = message;
	let header = document.querySelector("#" + id + " .toast-header");
	header.classList.remove("bg-danger", "bg-success")
	header.classList.add(bg);
	header.querySelector("strong").innerHTML = title;
	document.querySelector("#" + id + " .toast").classList.add("show");
	delay(() => document.querySelector("#" + id + " .toast").classList.remove("show"), 5000);
}			

Vvveb.Gui = {
	
	init: function() {
		document.querySelectorAll("[data-vvveb-action]").forEach(function (el,i) {
			on = el.dataset.vvvebOn ?? "click";
			el.addEventListener(on, Vvveb.Gui[el.dataset.vvvebAction]);
		});
	},
	
	undo : function () {
		if (Vvveb.WysiwygEditor.isActive) {
			Vvveb.WysiwygEditor.undo();
		} else {
			Vvveb.Undo.undo();
		}
		Vvveb.Builder.selectNode();
	},
	
	redo : function () {
		if (Vvveb.WysiwygEditor.isActive) {
			Vvveb.WysiwygEditor.redo();
		} else {
			Vvveb.Undo.redo();
		}
		Vvveb.Builder.selectNode();
	},
	
	//show modal with html content
	save : function () {
		document.getElementById('textarea-modal textarea').val(Vvveb.Builder.getHtml());
		document.getElementById('textarea-modal').modal();
	},
    
	//post html content through ajax to save to filesystem/db
	saveAjax : function () {
		let btn = this;
		let saveUrl = this.dataset.vvvebUrl;
		let file = Vvveb.FileManager.getPageData('file');
		//if offcanvas check if user provided new template name
		if (btn.classList.contains("save-offcanvas")) {
			if (document.querySelector("#save-offcanvas [name=template]:checked").value == "new") {
				file = document.querySelector("#save-offcanvas [name=folder]").value + "/" + document.querySelector("#save-offcanvas [name=file]").value;
			}
		}

		btn.querySelector(".loading").classList.toggle("d-none");
		btn.querySelector(".button-text").classList.toggle("d-none");
	
		return Vvveb.Builder.saveAjax({file}, saveUrl, (data) => {
			//use toast to show save status

			let bg = "bg-success";
			if (true || data.success || data == "success") {		
				document.querySelectorAll("#top-panel .save-btn").forEach(e => e.setAttribute("disabled", "true"));
			} else {
				bg = "bg-danger";
			}
			
			displayToast(bg, "Save", data.message ?? data);

			const offcanvas = document.getElementById('save-offcanvas');
			if (offcanvas) {
				let instance = bootstrap.Offcanvas.getInstance(offcanvas);
				if (instance) instance.style.display = "none";			
			}
			
			document.querySelector(".loading", btn).classList.toggle("d-none");
			document.querySelector(".button-text", btn).classList.toggle("d-none");
		}, (error) => {
			document.querySelector(".loading", btn).classList.toggle("d-none");
			document.querySelector(".button-text", btn).classList.toggle("d-none");
			let message = error.statusText ?? "Error saving!";
			displayToast("bg-danger", "Error", message);

			error.text().then( errorMessage => {
			  	let message = errorMessage.substr(0, 200);
				displayToast("bg-danger", "Error", message);
			})
		});		
	},
	
	download : function () {
		filename = /[^\/]+$/.exec(Vvveb.Builder.iframe.src)[0];
		uriContent = "data:application/octet-stream,"  + encodeURIComponent(Vvveb.Builder.getHtml());

		let link = document.createElement('a');
		if ('download' in link) {
			link.dataset.download = filename;
			link.href = uriContent;
			link.target = "_blank";
			
			document.body.appendChild(link);
			result = link.click();
			document.body.removeChild(link);
			link.remove();
			
		} else {
			location.href = uriContent;
		}
	},
	
	viewport : function () {
		document.getElementById("canvas").setAttribute("class", this.dataset.view);
		document.getElementById("iframe1").removeAttribute("style");
		document.querySelectorAll(".responsive-btns .active").forEach(e => e.classList.remove("active"));
		if (this.dataset.view) this.classList.add("active");
	},
	
	toggleEditor : function () {
		document.getElementById("vvveb-builder").classList.toggle("bottom-panel-expand");
		document.getElementById("toggleEditorJsExecute").classList.toggle("d-none");
		//hide breadcrumb when showing the editor
		document.querySelector(".breadcrumb-navigator .breadcrumb").classList.toggle("d-none");
		Vvveb.CodeEditor.toggle();
	},
	
	toggleEditorJsExecute : function () {
		Vvveb.Builder.runJsOnSetHtml = this.checked;
	},
	
	preview : function () {
		(Vvveb.Builder.isPreview == true)?Vvveb.Builder.isPreview = false:Vvveb.Builder.isPreview = true;
		document.getElementById("iframe-layer").classList.toggle("d-none");
		document.getElementById("vvveb-builder").classList.toggle("preview");
	},
	
	fullscreen : function () {
		launchFullScreen(document); // the whole page
	},
	
	search : function () {
		let searchText = this.value;
		let panel = this.parentNode.parentNode.querySelector("div > ul");
		panel.querySelectorAll("li ol li").forEach(function (el, i) {
			el.style.display = "none";
			if (el.dataset.search.indexOf(searchText) > -1) el.style.display = "";
		});
	},
	
	clearSearch : function (e) {
		let input = this.parentNode.querySelector("input");
		input.value = "";
		input.dispatchEvent(new KeyboardEvent("keyup", {
			bubbles: true,
			cancelable: true,
		}));
	},
	
	expand : function (e) {
		this.parentNode.parentNode.parentNode.querySelectorAll('input.header_check[type="checkbox"]').forEach(e => e.checked = true);
	},

	collapse : function (e) {
		this.parentNode.parentNode.parentNode.querySelectorAll('input.header_check[type="checkbox"]').forEach(e => e.checked = false);
	},


	//Pages, file/components tree 
	newPage : function () {
		
		let newPageModal = document.getElementById('new-page-modal');
		let form = newPageModal.querySelector("form");
		
		const bsModal = bootstrap.Modal.getOrCreateInstance(newPageModal);
		bsModal.show(); 

		let submitForm = function(e) {

			let data = {};
			this.querySelectorAll("input[type=text],input[type=checkbox]:checked,input[type=radio]:checked, select").forEach( (el, i) => {
				if (el.offsetParent) data[el.name] = el.value;
			});			
			
			if (data['file']) {
				data['title']  = data['file'].replace('/', '').replace('.html', '');
				//let name = data['name'] = data['folder'].replace('/', '_') + "-" + data['title'];
				if (!data['name']) {
					data['name'] = data['title'];
				}
				data['url']  = data['file'] = data['folder'] + "/" + data['file'];
				//data['url']  = Vvveb.themeBaseUrl + data['url'];
			}

			e.preventDefault();

			return Vvveb.Builder.saveAjax(data, this.action, function (savedData) {
					data.title = data.name;

					if (typeof savedData === 'object' && savedData !== null) {
						data.name = savedData.name ?? data.name;
						data.url = savedData.url ?? data.url;
						data.file = savedData.file ?? data.file;
						data.title = savedData.title ?? data.title;
					}
					
					let page = Vvveb.FileManager.addPage(data.name, data);
					Vvveb.FileManager.loadPage(data.name);
					Vvveb.FileManager.scrollToPage(page);
					bsModal.hide();
			});
		};
		
		form.removeEventListener("submit", submitForm);
		form.addEventListener("submit", submitForm);
	},
	
	setDesignerMode : function () {
		//aria-pressed attribute is updated after action is called and we check for false instead of true
		let designerMode = this.attributes["aria-pressed"].value == "true";
		Vvveb.Builder.setDesignerMode(designerMode);
	},
	
	//layout
	togglePanel: function (panel, cssVar) {
		panel = document.querySelector(panel);
		let body = document.querySelector("body");
		let prevValue = getComputedStyle(body).getPropertyValue(cssVar);
		let visible = false;
		
		if (prevValue !== "0px") {
			panel.dataset.layoutToggle = prevValue;
			body.style.setProperty(cssVar, "0px");
			panel.style.display = "none";
			visible = false;
		} else {
			prevValue= panel.dataset.layoutToggle;
			body.style.setProperty(cssVar, "");
			panel.style.display = "";
			visible = true;
		}
		
		Vvveb.Builder.adjustListsHeight();
		return visible;
	},

	toggleFileManager: function () {
		Vvveb.Gui.togglePanel("#filemanager", "--builder-filemanager-height");
	},
	
	toggleLeftColumn: function () {
		Vvveb.Gui.togglePanel("#left-panel", "--builder-left-panel-width");
	},	
	
	toggleRightColumn: function (rightColumnEnabled = null) {
		rightColumnEnabled = Vvveb.Gui.togglePanel("#right-panel", "--builder-right-panel-width");

		document.getElementById("vvveb-builder").classList.toggle("no-right-panel");
		document.querySelector(".component-properties-tab").classList.toggle("d-none");
		
		Vvveb.Components.componentPropertiesElement = (rightColumnEnabled ? "#right-panel" :"#left-panel #properties") + " .component-properties";
		let componentTab = document.querySelector("#components-tab");

		if (document.getElementById("properties").offsetParent) {
			const bsTab = bootstrap.Tab.getOrCreateInstance(componentTab);
			componentTab.style.display = "";
			bsTab.show(); 
		}

		Vvveb.Builder.adjustListsHeight();
	},

	toggleTreeList: function () {
		let treeList = document.getElementById("tree-list");
		treeList.classList.toggle("d-none");
		if (!treeList.offsetParent) {
			document.getElementById("toggle-tree-list").classList.remove("active");
		}
	},

	darkMode: function () {
		let theme = document.documentElement.getAttribute("data-bs-theme");
		let icon = document.querySelector(".btn-dark-mode i");
		
		if (theme == "dark") {
			theme = "light";
			icon.classList.remove("la-moon")
			icon.classList.add("la-sun");
		} else if (theme == "light" || theme == "auto") {
			theme = "dark";
			icon.classList.remove("la-sun")
			icon.classList.add("la-moon");
		} else {
			theme = "auto";
		}
		
		document.documentElement.setAttribute("data-bs-theme", theme);
		localStorage.setItem('theme', theme);
		//document.cookie = 'theme=' + theme;
	},
}

Vvveb.StyleManager = {
	
	styles:{},
	cssContainer:false,
	mobileWidth: '320px',
	tabletWidth: '768px',
	doc:false,
	
	init: function(doc) {
		if (doc) {
			this.doc = doc;
			
			let style = false;
			let _style = false;
			
			//check if editor style is present
			for (let i = 0; i < doc.styleSheets.length; i++) {
					_style = doc.styleSheets[i];
					if (_style.ownerNode.id && _style.ownerNode.id == "vvvebjs-styles") {
						style = _style.ownerNode;
						break;
					}
			}
			
			//if style element does not exist create it			
			if (!style) {
				style = generateElements('<style id="vvvebjs-styles"></style>')[0];
				doc.head.append(style);
				return this.cssContainer = style;
			}
			
			//if it exists
			this.cssContainer = style;
			this.loadCss();

			return this.cssContainer; 
		}
	},	
	
	loadCss: function() {
		let style = this.cssContainer.sheet;
		//if style exist then load all css styles for editor
		for (let j = 0; j < style.cssRules.length; j++) {
			media = (typeof style.cssRules[j].media === "undefined") ? 
				"desktop" : (style.cssRules[j].media[0] === "screen and (max-width: 1220px)") 
				? "tablet" : (style.cssRules[j].media[0] === "screen and (max-width: 320px)") 
				? "mobile" : "desktop";
			
			selector = (media === "desktop") ? style.cssRules[j].selectorText : style.cssRules[j].cssRules[0].selectorText;
			styles = (media === "desktop") ? style.cssRules[j].style : style.cssRules[j].cssRules[0].style;

			if (media) {
				this.styles[media] = this.styles[media] ?? {};
				if (selector) {
					this.styles[media][selector] = {};
				
					for (let k = 0; k < styles.length; k++) {
								
						property = styles[k];
						value = styles[property];
					
						this.styles[media][selector][property] = value;
					}
				}
			}
		}		
	},
	
	getSelectorForElement: function(element) {
		if (!element) return '';
		
		let currentElement = element;
		let selector = [];
		
		while (currentElement.parentElement) {
			let elementSelector = "";
			let classSelector = Array.from(currentElement.classList).map(function (className) {
					if (Vvveb.Builder.ignoreClasses.indexOf(className) == -1) {
						return "." + className;
					}
				}).join("");

			//element (tag) selector
			let tag = currentElement.tagName.toLowerCase();
			//exclude top most element body unless the parent element is body
			if (tag == "body" && selector.length > 1) {
				break;
			}
			
			//stop at a unique element (with id)
			if (currentElement.id) {
				elementSelector = "#" + currentElement.id;
				selector.push(elementSelector);
				break;
			} else if (classSelector) {
				//class selector
				elementSelector = classSelector;
			} else {
				//element selector
				elementSelector = tag
			}
			
			if (elementSelector) {
				selector.push(elementSelector);
			}
			
			currentElement = currentElement.parentElement;
		}
		
		return selector.reverse().join(" > ");
	},	
	
	setStyle: function(element, styleProp, value) {
		if (typeof(element) == "string") {
			selector = element;
		} else {
			let node = element;

			//if propert is set with inline style attribute then override it and don't save to css
			//inline text editor sets properties like font-size inline that can't be later overriten from css
			if (node.style && node.style[styleProp]) {
				node.style[styleProp] = value;
				return element;
			}

			selector = this.getSelectorForElement(node);	
		}
		
		media = document.getElementById("canvas").classList.contains("tablet") ? "tablet" : document.getElementById("canvas").classList.contains("mobile") ? "mobile" : "desktop";
		
		//styles[media][selector][styleProp] = value
		if (!this.styles[media]) {
			this.styles[media] = {};
		}
		if (!this.styles[media][selector]) {
			this.styles[media][selector] = {};
		}
		if (!this.styles[media][selector][styleProp]) {
			this.styles[media][selector][styleProp] = {};
		}
		this.styles[media][selector][styleProp] = value;
		
		this.generateCss(media);

		return element;		
        	//uncomment bellow code to set css in element's style attribute 
		//return element.css(styleProp, value);
	},
	
	setCss: function (css) {
		this.cssContainer.innerHTML = css;
		this.loadCss();
	},

	getCss: function (css) {
		return this.cssContainer.innerHTML;
	},
	
	generateCss: function (media) {
		//let css = "";
		//for (selector in this.styles[media]) {

		//	css += `${selector} {`;
		//	for (property in this.styles[media][selector]) {
		//		value = this.styles[media][selector][property];
		//		css += `${property}: ${value};`;
		//	}
		//	css += '}';
		//}

		//this.cssContainer.innerHTML = css;

		//return element;
		//refresh container element to avoid issues with changes from code editor
		this.cssContainer = this.doc.getElementById("vvvebjs-styles");

		let css = "";
		for (media in this.styles) {
			if (media === "tablet" || media === "mobile") {
				css += `@media screen and (max-width: ${(media === 'tablet') ? this.tabletWidth : this.mobileWidth}){\n\n`
			}
			for (selector in this.styles[media]) {
				css += `${selector} {\n`;	
				for (property in this.styles[media][selector]) {
					value = this.styles[media][selector][property];
					css += `\t${property}: ${value};\n`;
				}
				css += '}\n\n';
			}
			if (media === "tablet" || media === "mobile") {
				css += `}\n\n`
			}
		}

		return this.cssContainer.innerHTML = css;
	},
	
	
	_getCssStyle: function(element, styleProp){
		let value = "";
		let el;

		el = element;
		selector = this.getSelectorForElement(el);

		media = document.getElementById("canvas").classList.contains("tablet") ? "tablet" : document.getElementById("canvas").classList.contains("mobile") ? "mobile" : "desktop";

		if (el.style && el.style.length > 0 && el.style[styleProp]) {//check inline
			value = el.style[styleProp];
		} else if (this.styles[media] !== undefined && this.styles[media][selector] !== undefined && this.styles[media][selector][styleProp] !== undefined) {//check defined css
			value = this.styles[media][selector][styleProp];

			if (styleProp == 'font-family') {
			}
		} else if (window.getComputedStyle) {
			value = document.defaultView.getDefaultComputedStyle ? 
						document.defaultView.getDefaultComputedStyle(el,null).getPropertyValue(styleProp) : 
						window.getComputedStyle(el,null).getPropertyValue(styleProp);

		}
		return value;
	},
	
	getStyle: function(element,styleProp){
		return this._getCssStyle(element, styleProp);
	}
}

Vvveb.ContentManager = {
	getAttr: function(element, attrName) {
		return element.getAttribute(attrName);
	},
	
	setAttr: function(element, attrName, value) {
		return element.setAttribute(attrName, value);
	},
	
	setHtml: function(element, html) {
		return element.innerHTML = html;
	},
	
	getHtml: function(element) {
		return element.innerHTML;
	},

	setText: function(element, text) {
		return element.text(text);
	},
	
	getText: function(element) {
		return element.text();
	},
};

function getNodeTree (node, parent, allowedComponents, idToNode = {}) {
	
	function getNodeTreeTraverse (node, parent, id = '') {
		
		if (node.hasChildNodes()) {
			for (let j = 0; j < node.childNodes.length; j++) {
				
				child = node.childNodes[j];

				//skip text and comments nodes
				if (child.nodeType == 3 || child.nodeType == 8) {
					continue;
				}
				
				if (child && child["attributes"] != undefined && 
					(matchChild = Vvveb.Components.matchNode(child))) {

					if (Array.isArray(allowedComponents)
						&& allowedComponents.indexOf(matchChild.type) == -1) {
						
						element = getNodeTreeTraverse(child, parent);	
						continue;
					}
				
					element = {
						name: matchChild.name,
						image: matchChild.image,
						type: matchChild.type,
						node: child,
						id: id + '-' + j,
						children: []
					};
					
					element.children = [];
					parent.push(element);
					idToNode[id + '-' + j] = child;
					
					element = getNodeTreeTraverse(child, element.children, id + '-' + j);
				} else {
					element = getNodeTreeTraverse(child, parent, id + '-' + j);	
				}
			}
		}

		return false;
	}
	
	getNodeTreeTraverse(node, parent, '1');
}

function drawComponentsTree(tree) {
	let j = 1;
	let prefix = Math.floor(Math.random() * 100);
	
	function drawComponentsTreeTraverse(tree) {
		let list = document.createElement("ol");
		j++;
		
		for (i in tree) {
			let node = tree[i];
			let id = node.id;
			let li;
			
			if (!id) {
				id = prefix + '-' + j + '-' + i; 
			}
			
			if (tree[i].children.length > 0) {
				li = generateElements('<li data-component="' + node.name + '">\
								<label for="id' + id + '" style="background-image:url(' + Vvveb.imgBaseUrl + node.image + ')"><span>' + node.name + '</span></label>\
								<input type="checkbox" id="id' + id + '">\
							</li>')[0];		
				li.append(drawComponentsTreeTraverse(node.children));
			}
			else {
				li = generateElements('<li data-component="' + node.name + '" class="file">\
							<label for="id' +  id + '" style="background-image:url(' + Vvveb.imgBaseUrl + node.image + ')"><span>' + node.name + '</span></label>\
							<input type="checkbox" id="id' + id + '">\
							</li>')[0];
			}

			li._treeNode = node.node;
			list.append(li);
		}
		
		return list;
	}
	
	return drawComponentsTreeTraverse(tree);
}


let selected = null;
let dragover = null;

Vvveb.SectionList = {
	
	selector: '.sections-container',
	allowedComponents: {},
	
	init: function(allowedComponents = {}) {

		this.allowedComponents = allowedComponents;

		document.querySelector(this.selector).addEventListener("click", function (e) {
			let element = e.target.closest(":scope > div .controls");
			if (element) {
				let node = element.parentNode._node;
				if (node) {
					node.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
					//node.click();
					Vvveb.Builder.selectNode(node);
					Vvveb.Builder.loadNodeComponent(node);
				}
			}
		});
		
		document.querySelector(this.selector).addEventListener("dblclick", function (e) {
			let element = e.target.closest(":scope > div");
			if (element) {
				node = element._node;
				node.click();
			}
		});
		
		
		document.querySelector(this.selector).addEventListener("click", function (e) {
			let element = e.target.closest("li[data-component] label");
			if (element) {
				let node = element.parentNode._node;
				if (node) {
					node.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
					node.click();
				}
			}
		});
		
		document.querySelector(this.selector).addEventListener("mouseenter", function (e) {
			let element = e.target.closest("li[data-component] label");
			if (element) {
				node = document.querySelector(element.parentNode._node);
				node.css("outline","1px dashed blue");
			}
		});
		
		document.querySelector(this.selector).addEventListener("mouseleave", function (e){
			let element = e.target.closest("li[data-component] label");
			if (element) {
				node = document.querySelector(element.parentNode._node);
				node.css("outline","");
				if (node.getAttribute("style") == "") node.removeAttribute("style");
			}
		});		
		
		document.querySelector(this.selector).addEventListener("dragstart", this.dragStart);
		document.querySelector(this.selector).addEventListener("dragover", this.dragOver);
		document.querySelector(this.selector).addEventListener("dragend", this.dragEnd);
		
		document.querySelector(this.selector).addEventListener("click", function (e) {
			let element = e.target.closest(".delete-btn");
			if (element) {
				let section = element.closest(".section-item");
				let node = section._node;
				node.remove();
				section.remove();
				
				e.stopPropagation();
				e.preventDefault();
			}
		});

		let sectionIn;
		let img = document.querySelector(".block-preview img");
		document.querySelector(".sections-list").addEventListener("mouseover", function (e) {
			let element = e.target.closest("li[data-type]");
			if (element) {
				if (sectionIn != element) {
					let src = element.querySelector("img").getAttribute("src");
					sectionIn = element;
					img.setAttribute("src", src);
					img.style.display = "";
				}
			} else {
				sectionIn = element;
				img.setAttribute("src", "");
				img.style.display = "none";
			}
		})
		
		/*
		document.querySelector(this.selector).addEventListener("click", ".up-btn", function (e) {
			let section = e.target.closest(".section-item");
			let node = section._node;
			Vvveb.Builder.moveNodeUp(node);
			Vvveb.Builder.moveNodeUp(section);
			
			e.preventDefault();
		});


		document.querySelector(this.selector).addEventListener("click", ".down-btn", function (e) {
			let section = e.target.closest(".section-item");
			let node = section._node;
			Vvveb.Builder.moveNodeDown(node);
			Vvveb.Builder.moveNodeDown(section);
			
			e.preventDefault();
		});
		*/

		
		let self = this;
		document.querySelector(".sections-list").addEventListener("click", function (e) {
			let element = e.target.closest(".add-section-btn");
			if (element) {
				let item = element.closest("li");
				let section = Vvveb.Sections.get(item.dataset.type);
				let node = generateElements(section.html)[0];
				let sectionType = node.tagName.toLowerCase();
				let afterSection = Vvveb.Builder.frameBody.querySelector(":scope > " + sectionType + ":last-of-type");
				
				if (afterSection) {
					afterSection.after(node);
				} else {
					if (sectionType == "nav") {
						afterSection = Vvveb.Builder.frameBody.querySelector(":scope > nav:first,> header:last-of-type");		
						
						if (afterSection) {
							afterSection.before(node);
						} else {
							Vvveb.Builder.frameBody.append(node);
						}
					} else if (sectionType != "footer") {
						afterSection = Vvveb.Builder.frameBody.querySelector("body > footer:last-of-type");		
						
						if (afterSection) {
							afterSection.before(node);
						} else {
							Vvveb.Builder.frameBody.append(node);
						}
					} else {
						Vvveb.Builder.frameBody.append(node);
					}
				}
				
				node.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
				//node.click();
				Vvveb.Builder.selectNode(node);
				Vvveb.Builder.loadNodeComponent(node);
				/*
				Vvveb.Builder.frameHtml.animate({
					scrollTop: node.offset().top
				}, 1000);
				
				delay(() => node.click(), 1000);
				*/
				
				
				node = node;
				Vvveb.Undo.addMutation({type: 'childList', 
										target: node.parentNode, 
										addedNodes: [node], 
										nextSibling: node.nextSibling});								

				
				self.loadSections();
				Vvveb.TreeList.loadComponents();
				Vvveb.TreeList.selectComponent(node);

				e.preventDefault();
			}
		});
		
		document.querySelector(this.selector).addEventListener("click", function (e) {
			let element = e.target.closest(".properties-btn");
			if (element) {
				let section = element.closest(".section-item");
				let node = section._node;
				node.click();
				
				e.preventDefault();
			}
		});
		
	},
	
	getSections: function() {
		let sections = [];
		let sectionList = 
			window.FrameDocument.body.querySelectorAll(':scope > section, :scope > header, :scope > footer, :scope > main, :scope > nav');
		
		sectionList.forEach(function (node, i) {
			let id = node.id ? node.id : (node.title ? node.title : node.className);
			if (!id) {
				id = 'section-' +  Math.floor(Math.random() * 10000);
			}
			let section = {
				name: id.replace(/[^\w+]+/g,' '),
				id: node.id,
				type: node.tagName.toLowerCase(),
				node: node
			};
			sections.push(section);
		});
		
		return sections;
	},

	loadComponents: function(sectionListItem, section, allowedComponents = {}) {

		let tree = [];
		getNodeTree(section, tree, allowedComponents);
		
		let html = drawComponentsTree(tree);
		document.querySelector("ol", sectionListItem).replaceWith(html);
	},
	
	
	addSection: function(data) {
		let section = generateElements(tmpl("vvveb-section", data))[0];
		section._node = data.node;
		document.querySelector(this.selector).append(section);

		//this.loadComponents(section, data.node, this.allowedComponents);
	},

	loadSections: function() {
		let sections = this.getSections();

		document.querySelector(this.selector).replaceChildren();
		for (i in sections) {
			this.addSection(sections[i]);
		}

	},
	
	//drag and drop 
	dragOver: function(e) {
		let element = e.target.closest("div");
		if (element) {
			if (e.target != dragover && 
				e.target.className == "section-item") {

				if (dragover) {
					dragover.classList.remove("drag-over");
				}
				dragover = e.target;  
				dragover.classList.add("drag-over");
			}
		}
	},

	dragEnd: function (e) {
		let element = e.target.closest("div");
		if (element) {

			if (dragover) {
				let parent = selected.parentNode;
				let selectedNode = selected._node;
				let replaceNode = dragover._node;

				if ((dragover.offsetTop > selected.offsetTop)) {
					//replace section item list
					parent.insertBefore(selected, dragover.nextElementSibling);
					//replace section
					replaceNode.parentNode.insertBefore(selectedNode, replaceNode.nextElementSibling);
				} else {
					//replace section item list
					parent.insertBefore(selected, dragover);
					//replace section
					replaceNode.parentNode.insertBefore(selectedNode, replaceNode);
				}
				
				dragover.classList.remove("drag-over");
				
				let node = selectedNode;
				
				self.dragMoveMutation = {type: 'move', 
									target: node,
									oldParent: node.parentNode,
									oldNextSibling: node.nextSibling};
												
			}

			selected = null;
			dragover = null;
		}
	},

	dragStart: function (e) {
		let element = e.target.closest("div");
		if (element) {
			selected = e.target
		}
	},
}

Vvveb.TreeList = {
	selector: '#tree-list',

	container: null,
	
	tree: [],
	
	idToNode : {},
	
	init: function() {
		// header move
		this.container = document.querySelector(this.selector);
		let header = this.container.querySelector(".header");
		let isDown = false;
		let offset = [0,0];
		let self = this;

		header.addEventListener('mousedown', function(e) {
			if (e.which == 1) {//left click
				isDown = true;
				offset = [
					self.container.offsetLeft - e.clientX,
					self.container.offsetTop - e.clientY
				];
			}
		}, true);

		document.addEventListener('mouseup', function() {
			isDown = false;
		}, true);

		document.addEventListener('mousemove', function(event) {
			if (isDown) {
				event.preventDefault();
				let left = Math.max(event.clientX + offset[0], 0);
				let top = Math.max(event.clientY + offset[1], 0);

				if (left >= 0 && (left < (window.innerWidth - self.container.clientWidth))) self.container.style.left = left + "px";
				if (top >= 0 && (top < (window.innerHeight - self.container.clientHeight))) self.container.style.top  = top + "px";
			}
		});

		document.querySelector(this.selector).addEventListener("click", function (e) {
			let element = e.target.closest("li[data-component]");
			if (element) {
				node = element._treeNode;
				node.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
				//node.click();
				Vvveb.Builder.selectNode(node);
				Vvveb.Builder.loadNodeComponent(node);
				
				document.querySelector(self.selector + " .active")?.classList.remove("active");	
				element.querySelector("label").classList.add("active");
			}
		})
		
		document.querySelector(this.selector).addEventListener("mousemove", function (e) {
			let element = e.target.closest("li[data-component]");
			if (element) {
				node = element._treeNode;
				
				node.dispatchEvent(new MouseEvent("mousemove", {
					bubbles: true,
					cancelable: true,
				}));
			}
		})
	},
	
	selectComponent: function(node) {
		let id;
		for (i in this.idToNode) {
			if (node == this.idToNode[i]) {
				id = i;
				break;
			}
		}

		if (id) {
			let element = document.getElementById("id" + id);

			this.container.querySelector(".active")?.classList.remove("active");	
			//collapse all 
			let checkboxes = this.container.querySelectorAll("input[type=checkbox]:checked");
			for (let i = 0, len = checkboxes.length; i < len; i++) {
				checkboxes[i].checked = false;
				let label = checkboxes[i].labels[0];
				if (label) {
					label.classList.remove("active");
				}
			}

			//expand parents
			if (element) {
				let parent = element;
				let current = element;
				while (parent = current.closest("li")) {
					current = parent.parentNode; 
					let input = parent.querySelector("input");
					if (input && input.hasAttribute("type") && input.type == "checkbox") {
						input.checked = true;
					}
				}
				
				element.checked = true;
				element.labels[0].classList.add("active");
				element.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
			}
		}
		
		return false;
	},
	
	loadComponents: function() {
		let list = this.container.querySelector(".tree > ol");
		//if navigator not visible don't load
		if (list.offsetParent === null) return;
		
		this.tree     = [];
		this.idToNode = {};
		getNodeTree(window.FrameDocument.body, this.tree, {}, this.idToNode);
		
		let ol = drawComponentsTree(this.tree);
		list.replaceWith(ol);
		//list.replaceWith(html);
	},	
}

Vvveb.FileManager = {
	tree:false,
	pages:{},
	currentPage: false,
	allowedComponents: {},
	
	init: function(allowedComponents = {}) {
		
		this.allowedComponents = allowedComponents;
		this.tree = document.querySelector("#filemanager .tree > ol");
		this.tree.replaceChildren();
		
		this.tree.addEventListener("click", function (e) {
			let element = event.target.closest("a");
			if (element) {
				e.stopImmediatePropagation();
				if (element.classList.contains('view')) return;
				e.preventDefault();
				return false;
			}
		});	
		
		this.tree.addEventListener("click", function (e) {
			let element = event.target.closest(".delete");
			if (element) {
				Vvveb.FileManager.deletePage(element.closest("li"), e);
				e.stopImmediatePropagation();
				e.preventDefault();
				return false;
			}
		});

		this.tree.addEventListener("click", function (e) {
			let element = event.target.closest(".rename");
			if (element) {
				Vvveb.FileManager.renamePage(element.closest("li"), e, false);
				e.stopImmediatePropagation();
				e.preventDefault();
				return false;
			}
		});

		this.tree.addEventListener("click", function (e) {
			let element = event.target.closest(".duplicate");
			if (element) {
				Vvveb.FileManager.renamePage(element.closest("li"), e, true);
				e.stopImmediatePropagation();
				e.preventDefault();
				return false;
			}
		});
		
		this.tree.addEventListener("click", function (e) {
			let element = event.target.closest("li[data-page] label");
			if (element) {
				let page = element.parentNode.dataset.page;
				if (page) Vvveb.FileManager.loadPage(page, allowedComponents);
				return false;			
			}
		});
		
		this.tree.addEventListener("click", function (e) {
			let element = event.target.closest("li[data-component] label");
			if (element) {
				node = e.currentTarget.parentNode._node;
				node.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
				node.click();
			}
		});
		
		this.tree.addEventListener("mouseenter", function (e) {
			let element = event.target.closest("li[data-component] label");
			if (element) {
				node = e.currentTarget.parentNode._node;
				node.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});

				node.dispatchEvent(new MouseEvent("mousemove", {
					bubbles: true,
					cancelable: true,
				}));
				//node.trigger("mousemove");
			}			
		});
	},
	
	deletePage: function(element, e) {
		let page = element.dataset;
		if (confirm(`Are you sure you want to delete "${page.file}"template?`)) {

			//allow event to change page or cancel by setting page to false
			window.dispatchEvent(new CustomEvent("vvveb.FileManager.deletePage", {
				detail: page
			}));
			
			if (page) {
				
				fetch(deleteUrl, {method: "POST",  body: new URLSearchParams({file:page.file})})
				.then((response) => {
					if (!response.ok) {  return Promise.reject(response);  }
					return response.text()
				})
				.then((data) => {
						let bg = "bg-success";
						if (data.success) {		
							document.querySelectorAll("#top-panel .save-btn").forEach(e => e.setAttribute("disabled", "true"));
						} else {
							bg = "bg-danger";
						}

						displayToast(bg, "Delete", data.message ?? data);
				})
				.catch(error => {
					console.log(error.statusText);
					let message = error.statusText ?? "Error deleting page!";
					displayToast("bg-danger", "Error", message);

					err.text().then( errorMessage => {
						let message = errorMessage.substr(0, 200);
						displayToast("bg-danger", "Error", message);
					})					
				});

				element.remove();
			}
		}
	},	
	
	renamePage: function(element, e, duplicate = false) {
		let page = element.dataset;
		let newfile = prompt(`Enter new file name for "${page.file}"`, page.file);
		let _self = this;
		if (newfile) {

			//allow event to change page or newfile or cancel by setting page to false
			window.dispatchEvent(new CustomEvent("vvveb.FileManager.renamePage", {
				detail: {page, newfile}
			}));
			
			if (page) {

				fetch(renameUrl, {method: "POST",  body: new URLSearchParams({file:page.file, newfile:newfile, duplicate})})
				.then((response) => {
					if (!response.ok) {  return Promise.reject(response);  }
					return response.text()
				})
				.then((data) => {
						let bg = "bg-success";
						if (data.success) {		
							document.querySelectorAll("#top-panel .save-btn").forEach(e => e.setAttribute("disabled", "true"));
						} else {
							bg = "bg-danger";
						}

						displayToast(bg, "Rename", data.message ?? data);
						let baseName = newfile.replace('.html', '');
						let newName = friendlyName(newfile.replace(/.*[\/\\]+/, '')).replace('.html', '');
						
						if (duplicate) {
							let data = _self.pages[page.page];
							data["file"] = newfile;
							data["title"] = newName;
							Vvveb.FileManager.addPage(baseName, data);
						} else {
							_self.pages[page.page]["file"] = newfile;
							_self.pages[page.page]["title"] = newName;
							document.querySelector(":scope > label span", element).innerHTML = newName;
							page.url = page.url.replace(page.file, newfile);
							page.file = newfile;
							_self.pages[page.page]["url"] = page.url;
							_self.pages[page.page]["file"] = page.file;
						}
				})
				.catch(error => {
					console.log(error);
					let message = error.statusText ?? "Error renaming page!";
					displayToast("bg-danger", "Error", message);

					err.text().then( errorMessage => {
						let message = errorMessage.substr(0, 200);
						displayToast("bg-danger", "Error", message);
					})
				});				
			}
		}
	},
	
	addPage: function(name, data) {

		//allow event to change name or cancel by setting name to false
		window.dispatchEvent(new CustomEvent("vvveb.FileManager.addPage", {
			detail: [name, data],
		}));

		if (!name) {
			return false;
		}

		this.pages[name] = data;
		data['name'] = name;

		let folder = this.tree;
		if (data.folder) {
			if ((data.folder && data.folder != "/") && !(folder = folder.querySelector('li[data-folder="' + data.folder + '"]')))  {
				data.folderTitle = data.folder[0].toUpperCase() + data.folder.slice(1);
				folder = generateElements(tmpl("vvveb-filemanager-folder", data))[0];
				this.tree.append(folder);
			}

			folder = folder.querySelector("ol");
		} 
		
		let page = generateElements(tmpl("vvveb-filemanager-page", data))[0];
		folder.append(page);
		return page;
	},
	
	addPages: function(pages) {
		for (page in pages) {
			this.addPage(pages[page]['name'], pages[page]);
		}
	},
	
	addComponent: function(name, url, title, page) {
		document.querySelector("[data-page='" + page + "'] > ol", this.tree).append(
			tmpl("vvveb-filemanager-component", {name:name, url:url, title:title}));
	},
	
	loadComponents: function(allowedComponents = {}) {

		let tree = [];
		getNodeTree(window.FrameDocument.body, tree, allowedComponents);
		
		let html = drawComponentsTree(tree);
		document.querySelector("[data-page='" + this.currentPage + "'] > ol", this.tree).replaceWith(html);
	},
	
	getCurrentUrl: function() {
		if (this.currentPage) {
			return this.pages[this.currentPage]['url'];
		}
	},	
    
	getCurrentPage: function() {
		return this.currentPage;
	},	
    
	getPageData: function(key) {
		if (this.currentPage) {
			return this.pages[this.currentPage][key];
		}
	},	
    
    
	getCurrentFileName: function() {
	    if (this.currentPage) {
		    let folder = this.pages[this.currentPage]['folder'];
		    folder = folder ? folder + '/': ''; 
		    return folder + this.pages[this.currentPage]['file'];
            }
	},
	
	reloadCurrentPage: function() {
		if (this.currentPage)
		return this.loadPage(this.currentPage);
	},
	
	loadPage: function(name, allowedComponents = false, disableCache = true, loadComponents = false) {
		let url = this.pages[name]['url'] ?? "";
		
		if (!url) {
			return;
		}
		
		let page = this.tree.querySelector("[data-page='" + name + "']");
		//remove active from current active page
		this.tree.querySelector("[data-page].active")?.classList.remove("active");
		//set loaded page as active
		page.classList.add("active");
		//open parent folder if closed
		page.closest("[data-folder]")?.querySelector("input[type=checkbox]").setAttribute("checked", true);
		
		this.currentPage = name;
		document.querySelector(".btn-preview-url").setAttribute("href", url);

		//allow event to change page or url or cancel by setting url to false
		let self = this;

		window.dispatchEvent(new CustomEvent("vvveb.FileManager.loadPage", {
			detail: self.pages[name],
		}));

		if (url) {
			Vvveb.Builder.loadUrl(url + (disableCache ? (url.indexOf('?') > -1 ? '&r=':'?r=') + Math.random():''), 
				function () { 
					if (loadComponents) { Vvveb.FileManager.loadComponents(allowedComponents); }
					Vvveb.SectionList.loadSections(allowedComponents); 
					Vvveb.TreeList.loadComponents(); 
					Vvveb.StyleManager.init(); 
				});
		}
	},

	scrollToPage: function(page) {
		page.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
	},
}

Vvveb.Breadcrumb = {
	tree:false,	
	
	init: function() {
		this.tree = document.querySelector(".breadcrumb-navigator > .breadcrumb");
		this.tree.replaceChildren();

		this.tree.addEventListener("click", function (e) {
			let element = event.target.closest(".breadcrumb-item");
			if (element) {
				let node = element._node;
				if (node) {
					//node.click();
					Vvveb.Builder.selectNode(node);
					Vvveb.Builder.loadNodeComponent(node);
					node.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
				}
				
				e.preventDefault();
			}
		});
		
		let currentHoverNode;
		this.tree.addEventListener("mousemove", function (e) {
			if (event.target == currentHoverNode) return;
			currentHoverNode = event.target;
			
			let element = event.target.closest(".breadcrumb-item");
			if (element) {
				let node = element._node;

				node.dispatchEvent(new MouseEvent("mousemove", {
					bubbles: true,
					cancelable: true,
				}));
			}
		})
	},
	
	addElement: function(data, element) {
		let li = generateElements(tmpl("vvveb-breadcrumb-navigaton-item", data))[0];
		li._node = element;			
		this.tree.prepend(li);
	},
		
	loadBreadcrumb: function(element) {
		this.tree.replaceChildren();
		let currentElement = element;
		
		while (currentElement.parentElement) {
			let elementType = Vvveb.Builder._getElementType(currentElement);
			let el = elementType[1].toLowerCase();
		
			this.addElement({
				"name":  el + " " + elementType[0],
				"className": "el-" + el
			}, currentElement);
			
			currentElement = currentElement.parentElement;
		}
	}
}

Vvveb.FontsManager = {
	
	activeFonts:[],
	providers: {},//{"google":GoogleFontsManager};
	
	addProvider: function(provider, Obj) {
		this.providers[provider] = Obj;
	},
	
	//add also element so we can keep track of the used fonts to remove unused ones
	addFont: function(provider, fontFamily, element = false) {
		if (!provider) return;
		
		let providerObj = this.providers[provider];
		if (providerObj) {
			providerObj.addFont(fontFamily);
			this.activeFonts.push({provider, fontFamily, element});
		}
	},
	
	removeFont: function(provider, fontFamily) {
		let providerObj = this.providers[provider];
		if (provider!= "default" && providerObj) {
			providerObj.removeFont(fontFamily);
		}
	},
	
	//check if the added fonts are still used for the elements they were set and remove unused ones
	cleanUnusedFonts: function (){
		for (i in this.activeFonts) {
			let elementFont = this.activeFonts[i];
			if (elementFont.element) {
				if (Vvveb.StyleManager.getStyle(elementFont.element,'font-family').replaceAll('"','') != elementFont.fontFamily) {
					this.removeFont(elementFont.provider, elementFont.fontFamily);
				}
			}
		}
	}
};


Vvveb.ColorPalette = {
	colors: {},
	
	getAll: function() {
		return this.colors;
	},
	
	add: function(name, color) {
		this.colors[name] = color;
	},
	
	remove: function(color) {
		delete this.colors[name];
	},
}

function friendlyName(name) {
	name = name.replaceAll("--bs-","").replaceAll("-", " ").trim();  
	return name = name[0].toUpperCase() + name.slice(1);
}

Vvveb.ColorPaletteManager = {
	
	cssVars: {"font": {}, "color" : {}, "dimensions": {}},
	
	getType:  function (type) { 
		return this.cssVars[type];
	},
		
	getAllCSSVariableNames:  function (styleSheets = document.styleSheets, selector){

	   for(let i = 0; i < styleSheets.length; i++){
		  try{ 
			 let cssRules =  styleSheets[i].cssRules;
			 for( let j = 0; j < cssRules.length; j++){
				try{
				   let style = cssRules[j].style;	
				   if (selector && cssRules[j].selectorText && cssRules[j].selectorText != selector) continue;
				   for(let k = 0; k < style.length; k++){
					  let name = style[k];
					  let value = style.getPropertyValue(name).trim();
					  let type = "";
					  
					  
					  if(name.startsWith("--")){
						//ignore bootstrap rgb variables
						if (name.endsWith("-rgb")) continue;
						//ignore variables depending on other variables
						if (value.startsWith("var(")) continue;

						 let friendlyName = name.replace("--bs-","").replaceAll("-", " ");  
						 
						 if (value.startsWith("#")) {
							 type = "color";
						} else if (value.indexOf('"') >= 0 || value.indexOf("'") >= 0) {
							type = "font";
						} else if (value.endsWith('em') > 0 || value.endsWith('px') > 0) {
							type = "dimensions";
						} else if (!isNaN(parseFloat(value))) {
							type = "dimensions";
						}

						if (type) {
							 if (!this.cssVars[type]) this.cssVars[type] = {};
							 this.cssVars[type][name] = {value, type, friendlyName};
						 }
					  }
				   }
				} catch (error) {}
			 }
		  } catch (error) {}
	   }
	   
	   return this.cssVars;
	},
	
	getCssWithVars:  function (styleSheets = document.styleSheets, vars){
	   let cssVars = {};
	   let css = "";
	   let cssStyles = "";
	   for(let i = 0; i < styleSheets.length; i++){
		  try{ 
			 let cssRules =  styleSheets[i].cssRules;
			 for( let j = 0; j < cssRules.length; j++){
				try{
				   let style = cssRules[j].style;	
				   //if (selector && cssRules[j].selectorText && cssRules[j].selectorText != selector) continue;
				   cssStyles = "";
				   for(let k = 0; k < style.length; k++){
					  let name = style[k];
					  let value = style.getPropertyValue(name);
					  if(name.startsWith('--bs-btn-')) {
						  for (v in vars) {
							  if (value == vars[v]) {
								  cssVars[name] = v;
								  cssStyles += name + ":var(" + v + ");\n";
							}
						  }
					  }
					  
				   }
				   if (cssStyles) {
				   css += cssRules[j].selectorText + "{\n"
				   css += cssStyles;
				   css += "}\n";
					}
				} catch (error) {}
			 }
		  } catch (error) {}
	   }
	   return cssVars;
	},

	init: function(document) {
		Vvveb.Components.render("config/bootstrap", "#configuration .component-properties");
		
		//apply current theme color palette
		//let colors = Vvveb.ColorPaletteManager.getType("color");
		let colors = this.cssVars.color;
		for (const name in colors) {
			let color = colors[name].value;

			if (color[0] == "#" && color.length == 7) {//add only valid hex color values 7 char long
				//add color as name to keep values unique
				Vvveb.ColorPalette.add(color, color);
			}
		}
	},
	
};

Vvveb.Config = {
	components :[],
	blocks :[],
	plugins :[],
	
	load: function(url = 'default.json') {
		$.getJSON( url, function( data ) {
			
		});
	}
}

// Toggle fullscreen
function launchFullScreen(document) {
  if(document.documentElement.requestFullScreen) {
    
		if (document.FullScreenElement)
			document.exitFullScreen();
		else
			document.documentElement.requestFullScreen();
//mozilla		
  } else if(document.documentElement.mozRequestFullScreen) {

		if (document.mozFullScreenElement)
			document.mozCancelFullScreen();
		else
			document.documentElement.mozRequestFullScreen();
//webkit	  
  } else if(document.documentElement.webkitRequestFullScreen) {

		if (document.webkitFullscreenElement)
			document.webkitExitFullscreen();
		else
			document.documentElement.webkitRequestFullScreen();
//ie	  
  } else if(document.documentElement.msRequestFullscreen) {

		if (document.msFullScreenElement)
			document.msExitFullscreen();
		else
			document.documentElement.msRequestFullscreen();
  }
}

let fontList = [{
	value: "",
	text: "Default"
}, {
	value: "Arial, Helvetica, sans-serif",
	text: "Arial"
}, {
	value: "'Lucida Sans Unicode', 'Lucida Grande', sans-serif",
	text: 'Lucida Grande'
}, {
	value: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
	text: 'Palatino Linotype'
}, {
	value: "'Times New Roman', Times, serif",
	text: 'Times New Roman'
}, {
	value: "Georgia, serif",
	text: "Georgia, serif"
}, {
	value: "Tahoma, Geneva, sans-serif",
	text: "Tahoma"
}, {
	value: "'Comic Sans MS', cursive, sans-serif",
	text: 'Comic Sans'
}, {
	value: "Verdana, Geneva, sans-serif",
	text: 'Verdana'
}, {
	value: "Impact, Charcoal, sans-serif",
	text: 'Impact'
}, {
	value: "'Arial Black', Gadget, sans-serif",
	text: 'Arial Black'
}, {
	value: "'Trebuchet MS', Helvetica, sans-serif",
	text: 'Trebuchet'
}, {
	value: "'Courier New', Courier, monospace",
	text: 'Courier New'
}, {
	value: "'Brush Script MT', sans-serif",
	text: 'Brush Script'
}];
