Vvveb.ComponentsGroup['Base'] =
["html/heading", "html/image", "html/hr",  "html/form", "html/textinput", "html/textareainput", "html/selectinput", "html/fileinput", "html/checkbox", "html/radiobutton", "html/link", "html/video", "html/button"];

Vvveb.Components.extend("_base", "html/heading", {
    image: "icons/heading.svg",
    name: "Heading",
    nodes: ["h1", "h2","h3", "h4","h5","h6"],
    html: "<h1>Heading</h1>",
    
	properties: [
	{
        name: "Size",
        key: "size",
        inputtype: SelectInput,
        
        onChange: function(node, value) {
			
			return changeNodeName(node, "h" + value);
		},	
			
        init: function(node) {
            var regex;
            regex = /H(\d)/.exec(node.nodeName);
            if (regex && regex[1]) {
                return regex[1]
            }
            return 1
        },
        
        data:{
			options: [{
                value: "1",
                text: "1"
            }, {
                value: "2",
                text: "2"
            }, {
                value: "3",
                text: "3"
            }, {
                value: "4",
                text: "4"
            }, {
                value: "5",
                text: "5"
            }, {
                value: "6",
                text: "6"
            }]
       },
    }]
});    


Vvveb.Components.extend("_base", "html/link", {
    nodes: ["a"],
    name: "Link",
    html: '<a href="#" class="d-inline-block"><span>Link</span></a>',
	image: "icons/link.svg",
    properties: [{
        name: "Url",
        key: "href",
        htmlAttr: "href",
        inputtype: LinkInput
    }, {
        name: "Target",
        key: "target",
        htmlAttr: "target",
        inputtype: TextInput
    }]
});

Vvveb.Components.extend("_base", "html/image", {
    nodes: ["img"],
    name: "Image",
    html: '<img src="' +  Vvveb.baseUrl + 'icons/image.svg" class="mw-100">',
    /*
    afterDrop: function (node)
	{
		node.attr("src", '');
		return node;
	},*/
    image: "icons/image.svg",
    resizable:true,//show select box resize handlers
    
    properties: [{
        name: "Image",
        key: "src",
        htmlAttr: "src",
        inputtype: ImageInput
    }, {
        name: "Width",
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }, {
        name: "Alt",
        key: "alt",
        htmlAttr: "alt",
        inputtype: TextInput
    }]
});
Vvveb.Components.add("html/hr", {
    image: "icons/hr.svg",
    nodes: ["hr"],
    name: "Horizontal Rule",
    html: "<hr>"
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
    html: '<div class="mb-3"><label>Text</label><input type="text" class="form-control"></div></div>',
    properties: [{
        name: "Value",
        key: "value",
        htmlAttr: "value",
        inputtype: TextInput
    }, {
        name: "Type",
        key: "type",
        htmlAttr: "type",
		inputtype: SelectInput,
        data: {
            options: [{
                value: "text",
                text: "text"
            }, {
                value: "button",
                text: "button"
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
                text: "email"
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
                text: "number"
            }, {
                value: "password",
                text: "password"
            }, {
                value: "radio",
                text: "radio"
            }, {
                value: "range",
                text: "range"
            }, {
                value: "reset",
                text: "reset"
            }, {
                value: "search",
                text: "search"
            }, {
                value: "submit",
                text: "submit"
            }, {
                value: "tel",
                text: "tel"
            }, {
                value: "text",
                text: "text"
            }, {
                value: "time",
                text: "time"
            }, {
                value: "url",
                text: "url"
            }, {
                value: "week",
                text: "week"
            }]
        }
    }, {
        name: "Placeholder",
        key: "placeholder",
        htmlAttr: "placeholder",
        inputtype: TextInput
    }, {
        name: "Disabled",
        key: "disabled",
        htmlAttr: "disabled",
		col:6,
        inputtype: CheckboxInput,
	},{
        name: "Required",
        key: "required",
        htmlAttr: "required",
		col:6,
        inputtype: CheckboxInput,
    }]
});

Vvveb.Components.extend("_base", "html/selectinput", {
	nodes: ["select"],
    name: "Select Input",
    image: "icons/select_input.svg",
    html: '<div class="mb-3"><label>Choose an option </label><select class="form-control"><option value="value1">Text 1</option><option value="value2">Text 2</option><option value="value3">Text 3</option></select></div>',

	beforeInit: function (node)
	{
		properties = [];
		var i = 0;
		
		$(node).find('option').each(function() {

			data = {"value": this.value, "text": this.text};
			
			i++;
			properties.push({
				name: "Option " + i,
				key: "option" + i,
				//index: i - 1,
				optionNode: this,
				inputtype: TextValueInput,
				data: data,
				onChange: function(node, value, input) {
					
					option = $(this.optionNode);
					
					//if remove button is clicked remove option and render row properties
					if (input.nodeName == 'BUTTON')
					{
						option.remove();
						Vvveb.Components.render("html/selectinput");
						return node;
					}

					if (input.name == "value") option.attr("value", value); 
					else if (input.name == "text") option.text(value);
					
					return node;
				},	
			});
		});
		
		//remove all option properties
		this.properties = this.properties.filter(function(item) {
			return item.key.indexOf("option") === -1;
		});
		
		//add remaining properties to generated column properties
		properties.push(this.properties[0]);
		
		this.properties = properties;
		return node;
	},
    
    properties: [{
        name: "Option",
        key: "option1",
        inputtype: TextValueInput
	}, {
        name: "Option",
        key: "option2",
        inputtype: TextValueInput
	}, {
        name: "",
        key: "addChild",
        inputtype: ButtonInput,
        data: {text:"Add option", icon:"la-plus"},
        onChange: function(node)
        {
			 $(node).append('<option value="value">Text</option>');
			 
			 //render component properties again to include the new column inputs
			 Vvveb.Components.render("html/selectinput");
			 
			 return node;
		}
	}]
});

Vvveb.Components.extend("_base", "html/textareainput", {
    name: "Text Area",
    image: "icons/text_area.svg",
    html: '<div class="mb-3"><label>Your response:</label><textarea class="form-control"></textarea></div>'
});
Vvveb.Components.extend("_base", "html/radiobutton", {
    name: "Radio Button",
	attributes: {"type":"radio"},
    image: "icons/radio.svg",
    html: '<label class="radio"><input type="radio"> Radio</label>',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }]
});
Vvveb.Components.extend("_base", "html/checkbox", {
    name: "Checkbox",
    attributes: {"type":"checkbox"},
    image: "icons/checkbox.svg",
    html: '<label class="checkbox"><input type="checkbox"> Checkbox</label>',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }]
});
Vvveb.Components.extend("_base", "html/fileinput", {
    name: "Input group",
	attributes: {"type":"file"},
    image: "icons/text_input.svg",
    html: '<div class="mb-3">\
			  <input type="file" class="form-control">\
			</div>'
});


Vvveb.Components.extend("_base", "html/video", {
    nodes: ["video"],
    name: "Video",
    html: '<video width="320" height="240" playsinline loop autoplay><source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4"><video>',
    dragHtml: '<img  width="320" height="240" src="' + Vvveb.baseUrl + 'icons/video.svg">',
	image: "icons/video.svg",
    properties: [{
        name: "Src",
        child: "source",
        key: "src",
        htmlAttr: "src",
        inputtype: LinkInput
    },{
        name: "Width",
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    },{
        name: "Muted",
        key: "muted",
        htmlAttr: "muted",
        inputtype: CheckboxInput
    },{
        name: "Loop",
        key: "loop",
        htmlAttr: "loop",
        inputtype: CheckboxInput
    },{
        name: "Autoplay",
        key: "autoplay",
        htmlAttr: "autoplay",
        inputtype: CheckboxInput
    },{
        name: "Plays inline",
        key: "playsinline",
        htmlAttr: "playsinline",
        inputtype: CheckboxInput
    },{
        name: "Controls",
        key: "controls",
        htmlAttr: "controls",
        inputtype: CheckboxInput
    }]
});


Vvveb.Components.extend("_base", "html/button", {
    nodes: ["button"],
    name: "Html Button",
    image: "icons/button.svg",
    html: '<button>Button</button>',
    properties: [{
        name: "Text",
        key: "text",
        htmlAttr: "innerHTML",
        inputtype: TextInput
    }, {
        name: "Name",
        key: "name",
        htmlAttr: "name",
        inputtype: TextInput
    }, {
        name: "Type",
        key: "type",
		htmlAttr: "type",
        inputtype: SelectInput,
        data: {
			options: [{
				value: "button",
				text: "button"
			}, {	
				value: "reset",
				text: "reset"
			}, {
				value: "submit",
				text: "submit"
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
