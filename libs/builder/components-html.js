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

Vvveb.ComponentsGroup[i18n('html.baseGroup')] =
["html/heading", "html/image", "html/hr",  "html/form", "html/textinput", "html/textareainput", "html/selectinput"/*, "html/fileinput"*/, "html/checkbox", "html/radiobutton", "html/link", "html/button", "html/paragraph", "html/blockquote", "html/list", "html/table", "html/preformatted", "html/audio", "html/video","html/iframe"];

Vvveb.Components.extend("_base", "html/heading", {
    image: "icons/heading.svg",
    name: i18n('html.headingName'),
    nodes: ["h1", "h2","h3", "h4","h5","h6"],
    html: "<h1>" + i18n('html.headingDefault') + "</h1>",
    
	properties: [{
        name: "Size",
        key: "size",
        inputtype: SelectInput,
        
        onChange: function(node, value) {

			return changeNodeName(node, "h" + value);
		},	
			
        init: function(node) {
            let regex;
            regex = /H(\d)/.exec(node.nodeName);
            if (regex && regex[1]) {
                return regex[1]
            }
            return 1
        },
        
        data:{
			options: [{
                value: "1",
                text: i18n('html.heading1Text')
            }, {
                value: "2",
                text: i18n('html.heading2Text')
            }, {
                value: "3",
                text: i18n('html.heading3Text')
            }, {
                value: "4",
                text: i18n('html.heading4Text')
            }, {
                value: "5",
                text: i18n('html.heading5Text')
            }, {
                value: "6",
                text: i18n('html.heading6Text')
            }]
       },
    }]
});    


let linkComponentProperties = [
/*	{
		name: "Text",
		key: "text",
		sort:1,
		htmlAttr: "innerText",
		inputtype: TextInput
	},*/
	{
		name: i18n('embeds.urlProperty'),
		key: "href",
		sort:2,
		htmlAttr: "href",
		inputtype: LinkInput
	},{
		name: "Rel",
		key: "rel",
		sort:3,
		htmlAttr: "rel",
		inputtype: LinkInput
	}, {
		name: i18n('html.targetProperty'),
		key: "target",
		sort:4,
		htmlAttr: "target",
		inputtype: SelectInput,
		data:{
			options: [{
				value: "",
				text: ""
			}, {
				value: "_blank",
				text: i18n('html.blankText')
			}, {
				value: "_parent",
				text: i18n('html.parentText')
			}, {
				value: "_self",
				text: i18n('html.selfText')
			}, {
				value: "_top",
				text: i18n('html.topText')
			}]
	   },
	}, {
		name: "Download",
		sort:5,
		key: "download",
		htmlAttr: "download",
		inputtype: CheckboxInput,
}];

Vvveb.Components.extend("_base", "html/link", {
    nodes: ["a"],
    name: i18n('html.linkName'),
    html: '<a href="#" rel="noopener">Link Text</a>',
	image: "icons/link.svg",
    properties: linkComponentProperties
});

Vvveb.Components.extend("_base", "html/image", {
    nodes: ["img"],
    name: i18n('html.imageName'),
    html: '<img src="' +  Vvveb.baseUrl + 'icons/image.svg" width="200" class="img-fluid align-center">',
    image: "icons/image.svg",
    resizable:true,//show select box resize handlers
    
    properties: [{
        name: i18n('html.imageName'),
        key: "src",
        htmlAttr: "src",
        inputtype: ImageInput
    }, {
        name: i18n('html.widthProperty'),
        key: "width",
        htmlAttr: "width",
        inputtype: NumberInput
    }, {
        name: i18n('html.heightProperty'),
        key: "height",
        htmlAttr: "height",
        inputtype: NumberInput
    }, {
        name: i18n('elements.altProperty'),
        key: "alt",
        htmlAttr: "alt",
        inputtype: TextInput
    }, {
        name: "Align",
        key: "align",
        htmlAttr: "class",
        inline:false,
        validValues: ["", "align-left", "align-center", "align-right"],
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon:"la la-times",
                //text: "None",
                title: "None",
                checked:true,
            }, {
                value: "align-left",
                //text: "Left",
                title: "text-start",
                icon:"la la-align-left",
                checked:false,
            }, {
                value: "align-center",
                //text: "Center",
                title: "Center",
                icon:"la la-align-center",
                checked:false,
            }, {
                value: "align-right",
                //text: "Right",
                title: "Right",
                icon:"la la-align-right",
                checked:false,
            }],
        },
	},{
		key: "link_options",
        inputtype: SectionInput,
        //name:false,
        data: {header:"Link"},
    },{
        name: "Enable link",
        key: "enable_link",
        inputtype: CheckboxInput,
        data: {
            className: "form-switch"
        },
		setGroup: value => {
			let group = document.querySelectorAll('.mb-3[data-group="link"]');
			if (group.length) {
				group.forEach(el => {
					if (value) {	
						el.style.display = "";
					} else {
						el.style.display = "none";
					}
				});
			}
		}, 		
		onChange : function(node, value, input)  {
			this.setGroup(value);
			if (value) {
				const wrappingElement = document.createElement('a');
				node.replaceWith(wrappingElement);
				wrappingElement.appendChild(node);
			} else {
				if (node.parentNode.tagName.toLowerCase() == "a"){
					node.parentNode.replaceWith(node);
				}
			}
			return node;
		}, 
		init: function (node) {
			let value = node.parentNode.tagName.toLowerCase() == "a";
			this.setGroup(value);
			return value;
		}
	}].concat(
	    //add link properties after setting parent to <a> element
		linkComponentProperties.map(
		(el) => {let a = Object.assign({}, el);a["parent"] = "a";a["group"] = "link";return a}
	)),
	
    init(node) {
		let group = document.querySelectorAll('.mb-3[data-group="link"]');
		if (group.length) {
			group.forEach(el => {
				if (value) {	
					el.style.display = "";
				} else {
					el.style.display = "none";
				}
			});
		}

		return node;
	}	
});

Vvveb.Components.extend("_base", "html/hr", {
    image: "icons/hr.svg",
    nodes: ["hr"],
    name: i18n('html.horizontalRuleName'),
    html: '<hr class="border-primary border-4 opacity-25">',
	properties:[{
        name: i18n('common.typeProperty'),
        key: "border-color",
		htmlAttr: "class",
        validValues: ["border-primary", "border-secondary", "border-success", "border-danger", "border-warning", "border-info", "border-light", "border-dark", "border-white"],
        inputtype: SelectInput,
        data: {
            options: [{
				value: "Default",
				text: ""
			}, {
				value: "border-primary",
				text: "Primary"
			}, {
				value: "border-secondary",
				text: "Secondary"
			}, {
				value: "border-success",
				text: "Success"
			}, {
				value: "border-danger",
				text: "Danger"
			}, {
				value: "border-warning",
				text: "Warning"
			}, {
				value: "border-info",
				text: "Info"
			}, {
				value: "border-light",
				text: "Light"
			}, {
				value: "border-dark",
				text: "Dark"
			}, {
				value: "border-white",
				text: "White"
			}]
        }
    },{
        name: "Border",
        key: "border-size",
		htmlAttr: "class",
        validValues: ["border-1", "border-2", "border-3", "border-4", "border-5"],
        inputtype: SelectInput,
        data: {
            options: [{
				value: "Default",
				text: ""
			}, {
				value: "border-1",
				text: "Size 1"
			}, {
				value: "border-2",
				text: "Size 2"
			}, {
				value: "border-3",
				text: "Size 3"
			}, {
				value: "border-4",
				text: "Size 4"
			}, {
				value: "border-5",
				text: "Size 5"
			}]
        }
    },{
        name: "Opacity",
        key: "opacity",
		htmlAttr: "class",
        validValues: ["opacity-25", "opacity-50", "opacity-75", "opacity-100"],
        inputtype: SelectInput,
        data: {
            options: [{
				value: "Default",
				text: ""
			}, {
				value: "opacity-25",
				text: "Opacity 25%"
			}, {
				value: "opacity-50",
				text: "Opacity 50%"
			}, {
				value: "opacity-75",
				text: "Opacity 75%"
			}, {
				value: "opacity-100",
				text: "Opacity 100%"
			}]
        }
    }]
});

Vvveb.Components.extend("_base", "html/label", {
    name: "Label",
    nodes: ["label"],
    html: '<label for="">Label</label>',
    properties: [{
        name: "For id",
        htmlAttr: "for",
        key: "for",
        inputtype: TextInput
    }]
});


Vvveb.Components.extend("_base", "html/textinput", {
    name: "Input",
	nodes: ["input"],
	//attributes: {"type":"text"},
    image: "icons/text_input.svg",
    html: '<input type="text" class="form-control">',
    properties: [{
        name: i18n('html.nameProperty'),
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }, {
        name: i18n('html.valueProperty'),
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput
    }, {
        name: i18n('common.typeProperty'),
        key: "type",
        htmlAttr: "type",
		inputtype: SelectInput,
        data: {
            options: [{
                value: "text",
                text: i18n('html.textProperty')
            }, {
                value: "button",
                text: i18n('html.buttonTypeText')
            }, {
                value: "checkbox",
                text: "checkbox"
            }, {
                value: "color",
                text: "color"
            }, {
                value: "date",
                text: "date"
            }, {
                value: "datetime-local",
                text: "datetime-local"
            }, {
                value: "email",
                text: i18n('html.emailTypeText')
            }, {
                value: "file",
                text: "file"
            }, {
                value: "hidden",
                text: "hidden"
            }, {
                value: "image",
                text: "image"
            }, {
                value: "month",
                text: "month"
            }, {
                value: "number",
                text: i18n('html.numberTypeText')
            }, {
                value: "password",
                text: i18n('html.passwordTypeText')
            }, {
                value: "radio",
                text: "radio"
            }, {
                value: "range",
                text: "range"
            }, {
                value: "reset",
                text: i18n('html.resetTypeText')
            }, {
                value: "search",
                text: i18n('html.searchTypeText')
            }, {
                value: "submit",
                text: i18n('html.submitTypeText')
            }, {
                value: "tel",
                text: "tel"
            }, {
                value: "text",
                text: i18n('html.textProperty')
            }, {
                value: "time",
                text: "time"
            }, {
                value: "url",
                text: i18n('embeds.urlProperty')
            }, {
                value: "week",
                text: "week"
            }]
        }
    }, {
        name: i18n('html.placeholderProperty'),
        key: "placeholder",
        htmlAttr: "placeholder",
        inputtype: TextInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
		col:6,
		inline:true,
        inputtype: CheckboxInput,
	},{
        name: "Required",
        key: "required",
        htmlAttr: "required",
		col:6,
		inline:true,
        inputtype: CheckboxInput,
    }]
});

Vvveb.Components.extend("_base", "html/selectinput", {
	nodes: ["select"],
    name: i18n('html.selectInputName'),
    image: "icons/select_input.svg",
    html: '<select class="form-control"><option value="value1">Text 1</option><option value="value2">Text 2</option><option value="value3">Text 3</option></select>',

	beforeInit: function (node) {
		properties = [];
		let i = 0;
		
		node.querySelectorAll('option').forEach(el => {
			data = {"value": el.value, "text": el.text};
			i++;
			properties.push({
				name: "Option " + i,
				key: "option" + i,
				//index: i - 1,
				optionNode: el,
				inline:true,
				inputtype: TextValueInput,
				data: data,
				onChange: function(node, value, input) {
					
					option = this.optionNode;
					
					//if remove button is clicked remove option and render row properties
					if (input.nodeName == 'BUTTON') {
						option.remove();
						Vvveb.Components.render("html/selectinput");
						return node;
					}

					if (input.name == "value") option.setAttribute("value", value); 
					else if (input.name == "text") option.textContent = value;
					return node;
				},	
			});
		});

		//remove all option properties
		this.properties = this.properties.filter(function(item) {
			return item.key.indexOf("option") === -1;
		});
		
		//add remaining properties to generated column properties
		this.properties =  properties.concat(this.properties);
		
		return node;
	},
    
    properties: [{
        name: i18n('html.nameProperty'),
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
		col:6,
		inline:true,
        inputtype: CheckboxInput,
	},{
        name: "Required",
        key: "required",
        htmlAttr: "required",
		col:6,
		inline:true,
        inputtype: CheckboxInput,
    }, {
        name: i18n('html.optionProperty'),
        key: "option1",
        inputtype: TextValueInput
	}, {
        name: i18n('html.optionProperty'),
        key: "option2",
        inputtype: TextValueInput
	}, {
        name: "",
        key: "addChild",
        inputtype: ButtonInput,
        data: {text:"Add option", icon:"la-plus"},
        onChange: function(node)
        {
			 node.append(generateElements('<option value="value">Text</option>')[0]);
			 
			 //render component properties again to include the new column inputs
			 Vvveb.Components.render("html/selectinput");
			 
			 return node;
		}
	}]
});

Vvveb.Components.extend("_base", "html/textareainput", {
	nodes: ["textarea"],
    name: "Text Area",
    image: "icons/text_area.svg",
    html: '<textarea class="form-control"></textarea>',
	properties: [{
        name: i18n('html.nameProperty'),
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }, {
        name: i18n('html.valueProperty'),
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput
    }, {
        name: i18n('html.placeholderProperty'),
        key: "placeholder",
        htmlAttr: "placeholder",
        inputtype: TextInput
    }, {
        name: i18n('html.columnsProperty'),
        key: "cols",
        htmlAttr: "cols",
        inputtype: NumberInput
    }, {
        name: "Rows",
        key: "rows",
        htmlAttr: "rows",
        inputtype: NumberInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
		col:6,
		inline:true,
        inputtype: CheckboxInput,
	},{
        name: "Required",
        key: "required",
        htmlAttr: "required",
		col:6,
		inline:true,
        inputtype: CheckboxInput,
    }]	
});
Vvveb.Components.extend("_base", "html/radiobutton", {
    name: i18n('html.radioButtonName'),
	attributes: {"type":"radio"},
    image: "icons/radio.svg",
    html: `<div class="form-check">
			  <label class="form-check-label">
				<input class="form-check-input" type="radio" name="radiobutton"> Option 1
			  </label>
			</div>
			<div class="form-check">
			  <label class="form-check-label">
				<input class="form-check-input" type="radio" name="radiobutton" checked> Option 2
			  </label>
			</div>
			<div class="form-check">
			  <label class="form-check-label">
				<input class="form-check-input" type="radio" name="radiobutton"> Option 3
			  </label>
			</div>`,
    properties: [{
        name: i18n('html.nameProperty'),
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput,
        //inline:true,
        //col:6
    },{
        name: i18n('html.valueProperty'),
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput,
        //inline:true,
        //col:6
    },{
		name: i18n('html.checkedProperty'),
        key: "checked",
        htmlAttr: "Checked",
        inputtype: CheckboxInput,
        //inline:true,
        //col:6
	},{
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
		col:6,
		inline:true,
        inputtype: CheckboxInput,
	},{
        name: "Required",
        key: "required",
        htmlAttr: "required",
		col:6,
		inline:true,
        inputtype: CheckboxInput,
     }]
});

Vvveb.Components.extend("_base", "html/checkbox", {
    name: i18n('html.checkboxName'),
    attributes: {"type":"checkbox"},
    image: "icons/checkbox.svg",
    html: `<div class="form-check">
			  <label class="form-check-label">
				<input class="form-check-input" type="checkbox" value=""> Default checkbox
			  </label>
			</div>`,
    properties: [{
        name: i18n('html.nameProperty'),
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput,
        //inline:true,
        //col:6
    },{
        name: i18n('html.valueProperty'),
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput,
        //inline:true,
        //col:6
    },{
		name: i18n('html.checkedProperty'),
        key: "checked",
        htmlAttr: "Checked",
        inputtype: CheckboxInput,
        //inline:true,
        //col:6
	},{
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
		col:6,
		inline:true,
        inputtype: CheckboxInput,
	},{
        name: "Required",
        key: "required",
        htmlAttr: "required",
		col:6,
		inline:true,
        inputtype: CheckboxInput,
     }]
});

/*
Vvveb.Components.extend("_base", "html/fileinput", {
    name: "Input group",
	attributes: {"type":"file"},
    image: "icons/text_input.svg",
    html: '<input type="file" class="form-control">'
});
*/

Vvveb.Components.extend("_base", "html/video", {
    nodes: ["video"],
    name: i18n('html.videoName'),
    html: '<video width="320" height="240" playsinline loop autoplay muted src="../../media/demo/sample.webm" poster="../../media/sample.webp"><video>',
    dragHtml: '<img  width="320" height="240" src="' + Vvveb.baseUrl + 'icons/video.svg">',
	image: "icons/video.svg",
    resizable:true,//show select box resize handlers
    properties: [{
        name: "Video",
        //child: "source",
        key: "src",
        htmlAttr: "src",
        inputtype: VideoInput
    },{       
		name: i18n('html.posterProperty'),
        key: "poster",
        htmlAttr: "poster",
        inputtype: ImageInput
    },{
        name: i18n('html.widthProperty'),
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: i18n('html.heightProperty'),
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    },{
        name: i18n('html.mutedProperty'),
        key: "muted",
        htmlAttr: "muted",
        inputtype: CheckboxInput
    },{
        name: i18n('elements.loopProperty'),
        key: "loop",
        htmlAttr: "loop",
        inputtype: CheckboxInput
    },{
        name: i18n('elements.autoplayProperty'),
        key: "autoplay",
        htmlAttr: "autoplay",
        inputtype: CheckboxInput
    },{
        name: "Plays inline",
        key: "playsinline",
        htmlAttr: "playsinline",
        inputtype: CheckboxInput
    },{
        name: i18n('html.controlsProperty'),
        key: "controls",
        htmlAttr: "controls",
        inputtype: CheckboxInput
    },{
	name:"",
	key: "autoplay_warning",
        inline:false,
        col:12,
        inputtype: NoticeInput,
        data: {
			type:'warning',
			title:'Autoplay',
			text:'Most browsers allow auto play only if video is muted and plays inline'
		}
	}]
});


Vvveb.Components.extend("_base", "html/button", {
    nodes: ["button"],
    name: "Html Button",
    image: "icons/button.svg",
    html: '<button>Button</button>',
    properties: [{
        name: i18n('html.textProperty'),
        key: "text",
        htmlAttr: "innerHTML",
        inputtype: TextInput
    }, {
        name: i18n('html.nameProperty'),
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }, {
        name: i18n('html.typeProperty'),
        key: "type",
		htmlAttr: "type",
        inputtype: SelectInput,
        data: {
			options: [{
				value: "button",
				text: i18n('html.buttonTypeText')
			}, {	
				value: "reset",
				text: i18n('html.resetTypeText')
			}, {
				value: "submit",
				text: i18n('html.submitTypeText')
			}],
		}
   	},{
        name: "Autofocus",
        key: "autofocus",
        htmlAttr: "autofocus",
        inputtype: CheckboxInput,
		inline:true,
        col:6,
   	},{
		name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
        inputtype: CheckboxInput,
		inline:true,
        col:6,
	}]
});

Vvveb.Components.extend("_base", "html/paragraph", {
    nodes: ["p"],
    name: i18n('html.paragraphName'),
	image: "icons/paragraph.svg",
	html: '<p>Lorem ipsum</p>',
    properties: [{
        name: "Text align",
        key: "p-text-align",
        htmlAttr: "class",
        inline:false,
        validValues: ["", "text-start", "text-center", "text-end"],
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon:"la la-times",
                //text: "None",
                title: "None",
                checked:true,
            }, {
                value: "text-start",
                //text: "Left",
                title: "text-start",
                icon:"la la-align-left",
                checked:false,
            }, {
                value: "text-center",
                //text: "Center",
                title: "Center",
                icon:"la la-align-center",
                checked:false,
            }, {
                value: "text-end",
                //text: "Right",
                title: "Right",
                icon:"la la-align-right",
                checked:false,
            }],
        },
	}]
});

Vvveb.Components.extend("_base", "html/blockquote", {
    nodes: ["blockquote"],
    name: i18n('html.blockquoteName'),
	image: "icons/blockquote.svg",
	html: `<blockquote cite="https://en.wikipedia.org/wiki/Marcus_Aurelius">
				<p>Today I shall be meeting with interference, ingratitude, insolence, disloyalty, ill-will, and selfishness all of them due to the offenders' ignorance of what is good or evil.</p>
				<cite class="small">
					<a href="https://en.wikipedia.org/wiki/Marcus_Aurelius" class="text-decoration-none" target="blank">Marcus Aurelius</a>
				</cite>	
			</blockquote>`,
    properties: [{
        name: i18n('html.citeProperty'),
        key: "cite",
        inline:false,
        htmlAttr: "cite",
        inputtype: TextInput,
    }]
});

Vvveb.Components.extend("_base", "html/list", {
    nodes: ["ul", "ol"],
    name: i18n('html.listName'),
	image: "icons/list.svg",
	html: `<ul>
				<li>Begin with the possible; begin with one step.</li>
				<li>Never think of results, just do!</li>
				<li>Patience is the mother of will.</li>
				<li>Man must use what he has, not hope for what is not.</li>
				<li>Only super-efforts count.</li>
			</ul>`,
	properties: [{
        name: i18n('html.typeProperty'),
        key: "type",
        inputtype: SelectInput,
        
        onChange: function(node, value) {
			return changeNodeName(node, value);
		},	
			
        init: function(node) {
            return node.nodeName.toLowerCase()
        },
        
        data:{
            options: [{
                value: "ul",
                text: i18n('html.unorderedListText')
            }, {
                value: "ol",
                text: i18n('html.orderedListText')
            }]
       },
    },{
		name: i18n('html.itemsProperty'),
        key: "items",
        inputtype: ListInput,
		htmlAttr:"data-slides-per-view",
		inline:true,
		data: {
			selector:"li",
			container:"",
			prefix:"Item ",
			removeElement: true,
			"newElement": `<li>Do everything quickly and well.</li>`
		},
		onChange: function(node, value, input, component, event) {
			let element = node;

			if (event.action) {
				if (event.action == "add") {
					//node.append(generateElements(`<li>List item</li>`)[0]);
					
					//temporary solution to better update list
					Vvveb.Components.render("html/list");
				}
				if (event.action == "remove") {
				} else if (event.action == "select") {
				}
			}
			
			return node;
		},
	}]			
});

Vvveb.Components.extend("_base", "html/preformatted", {
    nodes: ["pre"],
    name: i18n('html.preformattedName'),
	image: "icons/paragraph.svg",
	html: `<pre>Today I shall be meeting with interference, 
ingratitude, insolence, disloyalty, ill-will, and
selfishness all of them due to the offenders'
ignorance of what is good or evil..</pre>`,
    properties: [{
        name: i18n('html.textProperty'),
        key: "text",
        inline:false,
        htmlAttr: "innerHTML",
        inputtype: TextareaInput,
        data:{
			rows:20,
		}
    }]
});

Vvveb.Components.extend("_base", "html/form", {
    nodes: ["form"],
    image: "icons/form.svg",
    name: i18n('html.formName'),
    html: `<form action="" method="POST">
	  <div class="mb-3">
		<label for="exampleInputEmail1" class="form-label">Email address</label>
		<input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
		<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
	  </div>
	  <div class="mb-3">
		<label for="exampleInputPassword1" class="form-label">Password</label>
		<input type="password" class="form-control" id="exampleInputPassword1">
	  </div>
	  <div class="mb-3 form-check">
		<input type="checkbox" class="form-check-input" id="exampleCheck1">
		<label class="form-check-label" for="exampleCheck1">Check me out</label>
	  </div>
	  <button type="submit" class="btn btn-primary">Submit</button>
	</form>`,
    properties: [/*{
        name: "Style",
        key: "style",
        htmlAttr: "class",
        validValues: ["", "form-search", "form-inline", "form-horizontal"],
        inputtype: SelectInput,
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "form-search",
                text: "Search"
            }, {
                value: "form-inline",
                text: "Inline"
            }, {
                value: "form-horizontal",
                text: "Horizontal"
            }]
        }
    }, */{
        name: i18n('html.actionProperty'),
        key: "action",
        htmlAttr: "action",
        inputtype: TextInput
    }, {
        name: i18n('html.methodProperty'),
        key: "method",
        htmlAttr: "method",
        inputtype: SelectInput,
        data: {
            options: [{
                value: "post",
                text: i18n('html.postMethodText')
            }, {
                value: "get",
                text: i18n('html.getMethodText')
            }]
        }
    }, {
        name: "Encoding type",
        key: "enctype",
        htmlAttr: "enctype",
        inputtype: SelectInput,
        data: {
            options: [{
                value: "",
                text: ""
            }, {
                value: "application/x-www-form-urlencoded",
                text: "Url encoded (default)"
            }, {
                value: "multipart/form-data",
                text: "Multipart (for file upload)"
            }, {
                value: "text/plain",
                text: "Text plain"
            }]
        }
    }]
});

Vvveb.Components.extend("_base", "html/tablerow", {
    nodes: ["tr"],
    image: "icons/table.svg",
    name: "Table Row",
    html: "<tr><td>Cell 1</td><td>Cell 2</td><td>Cell 3</td></tr>",
    properties: [{
        name: i18n('html.typeProperty'),
        key: "type",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["", "success", "danger", "warning", "active"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "success",
                text: "Success"
            }, {
                value: "error",
                text: "Error"
            }, {
                value: "warning",
                text: "Warning"
            }, {
                value: "active",
                text: "Active"
            }]
        }
    }]
});
Vvveb.Components.extend("_base", "html/tablecell", {
    nodes: ["td"],
    image: "icons/table.svg",
    name: "Table Cell",
    html: "<td>Cell</td>"
});

Vvveb.Components.extend("_base", "html/tableheadercell", {
    nodes: ["th"],
    image: "icons/table.svg",
    name: "Table Header Cell",
    html: "<th>Head</th>"
});

Vvveb.Components.extend("_base", "html/tablebody", {
    nodes: ["tbody"],
    image: "icons/table.svg",
    name: "Table Body",
    html: "<tbody>Table body</tbody>"
});

Vvveb.Components.extend("_base", "html/tablefooter", {
    nodes: ["tfooter"],
    image: "icons/table.svg",
    name: "Table Footer",
    html: "<tfooter>Table footer</tfooter>"
});

Vvveb.Components.extend("_base", "html/tablehead", {
    nodes: ["thead"],
    image: "icons/table.svg",
    name: "Table Head",
    html: "<thead><tr><th>Head 1</th><th>Head 2</th><th>Head 3</th></tr></thead>",
    properties: [{
        name: i18n('common.typeProperty'),
        key: "type",
        htmlAttr: "class",
        inputtype: SelectInput,
        validValues: ["", "success", "danger", "warning", "info"],
        data: {
            options: [{
                value: "",
                text: "Default"
            }, {
                value: "success",
                text: "Success"
            }, {
                value: "anger",
                text: "Error"
            }, {
                value: "warning",
                text: "Warning"
            }, {
                value: "info",
                text: "Info"
            }]
        }
    }]
});

Vvveb.Components.extend("_base", "html/table", {
    nodes: ["table"],
    classes: ["table"],
    image: "icons/table.svg",
    name: i18n('html.tableName'),
    html: `<table class="table table-striped table-hover">
			  <thead>
				<tr>
				  <th scope="col">#</th>
				  <th scope="col">First</th>
				  <th scope="col">Last</th>
				  <th scope="col">Handle</th>
				</tr>
			  </thead>
			  <tbody>
				<tr>
				  <th scope="row">1</th>
				  <td>Mark</td>
				  <td>Otto</td>
				  <td>@mdo</td>
				</tr>
				<tr>
				  <th scope="row">2</th>
				  <td>Jacob</td>
				  <td>Thornton</td>
				  <td>@fat</td>
				</tr>
				<tr>
				  <th scope="row">3</th>
				  <td colspan="2">Larry the Bird</td>
				  <td>@twitter</td>
				</tr>
			  </tbody>
			</table>`,
    properties: [{
        name: i18n('common.typeProperty'),
        key: "type",
		htmlAttr: "class",
        validValues: ["table-primary", "table-secondary", "table-success", "table-danger", "table-warning", "table-info", "table-light", "table-dark", "table-white"],
        inputtype: SelectInput,
        data: {
            options: [{
				value: "Default",
				text: ""
			}, {
				value: "table-primary",
				text: "Primary"
			},{
				value: "table-secondary",
				text: "Secondary"
			},{
				value: "table-success",
				text: "Success"
			},{
				value: "table-danger",
				text: "Danger"
			},{
				value: "table-warning",
				text: "Warning"
			},{
				value: "table-info",
				text: "Info"
			},{
				value: "table-light",
				text: "Light"
			},{
				value: "table-dark",
				text: "Dark"
			},{
				value: "table-white",
				text: "White"
			}]
        }
    }, {
        name: "Responsive",
        key: "responsive",
        htmlAttr: "class",
        validValues: ["table-responsive"],
        inputtype: ToggleInput,
        data: {
            on: "table-responsive",
            off: ""
        }
    }, {
        name: i18n('html.smallProperty'),
        key: "small",
        htmlAttr: "class",
        validValues: ["table-sm"],
        inputtype: ToggleInput,
        data: {
            on: "table-sm",
            off: ""
        }
    }, {
        name: i18n('html.hoverProperty'),
        key: "hover",
        htmlAttr: "class",
        validValues: ["table-hover"],
        inputtype: ToggleInput,
        data: {
            on: "table-hover",
            off: ""
        }
    }, {
        name: i18n('html.borderedProperty'),
        key: "bordered",
        htmlAttr: "class",
        validValues: ["table-bordered"],
        inputtype: ToggleInput,
        data: {
            on: "table-bordered",
            off: ""
        }
    }, {
        name: i18n('html.stripedProperty'),
        key: "striped",
        htmlAttr: "class",
        validValues: ["table-striped"],
        inputtype: ToggleInput,
        data: {
            on: "table-striped",
            off: ""
        }
    }, {
        name: i18n('html.inverseProperty'),
        key: "inverse",
        htmlAttr: "class",
        validValues: ["table-inverse"],
        inputtype: ToggleInput,
        data: {
            on: "table-inverse",
            off: ""
        }
    },   
    {
        name: "Head options",
        key: "head",
        htmlAttr: "class",
        child:"thead",
        inputtype: SelectInput,
        validValues: ["", "thead-dark", "thead-light"],
        data: {
            options: [{
                value: "",
                text: i18n('html.displayNone')
            }, {
                value: "thead-default",
                text: "Default"
            }, {
                value: "thead-inverse",
                text: "Inverse"
            }]
        }
    }]
});

Vvveb.Components.extend("_base", "html/audio", {
    nodes: ["audio"],
    attributes: ["data-component-audio"],
    name: i18n('html.audioName'),
    image: "icons/audio.svg",
    html: `<figure data-component-audio><audio controls src="#"></audio></figure>`,
    properties: [{
        name: "Src",
        key: "src",
        child:"audio",
        htmlAttr: "src",
        inputtype: LinkInput
	}, {
       	key: "audio_options",
        inputtype: SectionInput,
        name:false,
        data: {header:"Options"},
    }, {
		name: i18n('elements.autoplayProperty'),
        key: "autoplay",
        htmlAttr: "autoplay",
        child:"audio",
        inputtype: CheckboxInput,
        inline:true,
        col:4,
/*    }, {
        name: "Controls",
        key: "controls",
        htmlAttr: "controls",
        inputtype: CheckboxInput,
        child:"audio",
        inline:true,
        col:4,
*/    }, {
        name: i18n('elements.loopProperty'),
        key: "loop",
        htmlAttr: "loop",
        inputtype: CheckboxInput,
        child:"audio",
        inline:true,
        col:4
    }]
});


Vvveb.Components.extend("_base", "html/pdf", {
    attributes: ["data-component-pdf"],
    image: "icons/pdf.svg",
    name: "Pdf embed",
    html: `<object data="" type="application/pdf" data-component-pdf></object>`,
    properties: [{
        name: "Data",
        key: "data",
        htmlAttr: "data",
        inputtype: TextInput
    }]
});

Vvveb.Components.extend("_base", "html/embed", {
    attributes: ["data-component-embed"],
    image: "icons/embed.svg",
    name: "Embed",
    html: `<object data="" type="application/pdf" data-component-pdf></object>`,
    properties: [{
        name: "Data",
        key: "data",
        htmlAttr: "data",
        inputtype: TextInput
    }]
});

Vvveb.Components.extend("_base", "html/html", {
    nodes: ["html"],
    name: "Html Page",
    image: "icons/posts.svg",
    html: `<html><body></body></html>`,
    properties: [{
        name: i18n('html.titleProperty'),
        key: "title",
        htmlAttr: "innerHTML",
        inputtype: TextInput,
        child:"title",
    }, {
        name: i18n('html.metaDescriptionProperty'),
        key: "description",
        htmlAttr: "content",
        inputtype: TextInput,
        child:'meta[name=description]',
    }, {
        name: i18n('html.metaKeywordsProperty'),
        key: "keywords",
        htmlAttr: "content",
        inputtype: TextInput,
        child:'meta[name=keywords]',
    }]
});

/*
Vvveb.ComponentsGroup['Base'] =
["html/heading", "html/image", "html/hr",  "html/form", "html/textinput", "html/textareainput", "html/selectinput", "html/fileinput", "html/checkbox", "html/radiobutton", "html/link", "html/video", "html/button", "html/paragraph", "html/blockquote", "html/list", "html/table", "html/preformatted"];

*/

Vvveb.Components.extend("_base", "html/iframe", {
	attributes: ["data-component-iframe"],
    name: i18n('html.iframeName'),
    image: "icons/file.svg",
    html: '<div data-component-iframe><iframe src="https://www.vvveb.com" width="320" height="240"></iframe></div>',
	properties: [{
        name: "Src",
        key: "src",
        htmlAttr: "src",
        child:"iframe",
        inputtype: TextInput
    }, {
        name: i18n('html.widthProperty'),
        key: "width",
        htmlAttr: "width",
        child:"iframe",
        inputtype: CssUnitInput
    }, {
        name: i18n('html.heightProperty'),
        key: "height",
        htmlAttr: "height",
        child:"iframe",
        inputtype: CssUnitInput
	}]	
});
