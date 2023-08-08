let bgVideoTemplate = '<video playsinline loop muted autoplay src="../../media/sample.webm" poster="../../media/sample.webp"><video>';
let bgImageTemplate = '<img src="../../media/4.jpg">';
let defaultSeparatorSvg = '<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 41" width="100%" height="300" fill="var(--bs-body-bg)" preserveAspectRatio="none"><defs><style>.cls-1{fill:inherit}</style></defs><title>rough-edges-bottom</title><path class="cls-1" d="M0,185l125-26,33,17,58-12s54,19,55,19,50-11,50-11l56,6,60-8,63,15v15H0Z" transform="translate(0 -159)"/></svg>';

let SectionBackground = [
	{
        key: "section_background_header",
        inputtype: SectionInput,
        name:false,
        sort: base_sort++,
		//section: style_section,
        data: {header:"Background"},
   },{
        name: false,
        key: "section-bg",
        inputtype: RadioButtonInput,
        data: {
            inline: true,
            extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "none",
                text: "None",
                title: "None",
                checked:true,
            }, {
                value: "bg-image",
                icon:"la la-image",
                text: "Image",
                title: "Image",    
			}, {/*  
                value: "gradient",
                icon:"la la-palette",
                text: "Gradient",
                title: "Gradient",
			}, {*/
                value: "bg-video",
                icon:"la la-video",
                text: "Video",
                title: "Video",/*
			}, {
                value: "slideshow",
                icon:"la la-arrows-alt-h",
                text: "Slider",
                title: "Slider",*/
            }],
        },
		hideGroups : function() {
			$('.mb-3[data-group="bg-image"],.mb-3[data-group="bg-video"]').hide();
		},
		
		onChange : function(node, value, input) {
			this.hideGroups();
			$('.mb-3[data-group="'+ input.value + '"]').show();

			let container = $("> .background-container", node);
			if (!container.length) {
				container = $('<div class="background-container"></div>');
				node.append(container);
			}
			
			let img = $("> .background-container > img", node);
			let video = $("> .background-container > video", node);
			
			$("> *", container).addClass("d-none");
			
			switch (value) {
				case "bg-image":
					if (img.length) {
						img.removeClass("d-none");
					} else {
						container.append(bgImageTemplate);
						//reselect element to load image
						node.click();
					}
				break;
				case "bg-video":
					if (video.length) {
						video.removeClass("d-none");
					} else {
						container.append(bgVideoTemplate);
						//reselect element to load video
						node.click();
					}
				break;
			}


			return element;
		}, 
		init: function(node) {
			let selected = "none";
			let img = $("> .background-container img:visible", node);
			let video = $("> .background-container video:visible", node);
			
			if (img.length) {
				selected = "bg-image";
			}
			if (video.length) {
				selected = "bg-video";
			}
			
			this.hideGroups();
			return selected;
		},            
    }, {
        name: "Image",
        key: "src",
        htmlAttr: "src",
		child:"> .background-container > img",
		group:"bg-image",
		inline:true,
        inputtype: ImageInput
    },{
        name: "Video",
        child: "source",
        key: "src",
        htmlAttr: "src",
		child:"> .background-container > video",
		group:"bg-video",
		inline:true,
        inputtype: VideoInput
   }, {
        name: "Poster",
        key: "poster",
        htmlAttr: "poster",
		child:"> .background-container > video",
		group:"bg-video",
		inline:true,
        inputtype: ImageInput
     }   
];


let SectionOverlay = [
	{
        key: "section_overlay",
        inputtype: SectionInput,
        name:false,
        sort: base_sort++,
		//section: style_section,
        data: {header:"Overlay"},
	},{
        //name: "Enable",
		name: false,
        key: "overlay",
        inline: true,
        //validValues: ["", "active"],
        inputtype: ToggleInput,
        data: {
			className: "form-switch-lg",
            on: 'true',
            off: 'false'
        },
		onChange : function(node, value, input) {
			let group = $('.mb-3[data-group="overlay"]');
			let overlay = $("> .overlay", node);
			
			if (value == 'true') {
				group.show();
				
				if (!overlay.length) {
					overlay = $('<div class="overlay"></div>');
					node.append(overlay);
				} else {
					overlay.removeClass("d-none");
				}
			} else {
				group.hide();
				overlay.addClass("d-none");
			}

			return element;
		}, 
		init: function(node) {
			let overlay = $("> .overlay:visible", node);
			let group = $('.mb-3[data-group="overlay"]');
			
			if (overlay.length) {
				group.show();
				console.log(group);
				return 'true';
			} else {
				group.hide();
				return 'false';
			}
		}		
    },{
        name: "Color",
        key: "background-color",
        htmlAttr: "style",
		child:"> .overlay",
		group:"overlay",
        inputtype: ColorInput
   }, {
        name: "Opacity",
        key: "opacity",
		htmlAttr: "style",
		inline:false,
		group:"overlay",
		child:"> .overlay",
        inputtype: RangeInput,
        data:{
			max: 1, //max zoom level
			min:0,
			step:0.1
       }
}];

function sectionSeparatorProperties(name, title) {
	return [{
        key: `section_${name}_separator`,
        inputtype: SectionInput,
        name:false,
        sort: base_sort++,
		//section: style_section,
        data: {header:`${title} Separator`},
	},{
        //name: "Enable",
		name: false,
        key: `${name}_separator`,
        inline: true,
        inputtype: ToggleInput,
        data: {
			className: "form-switch-lg",
            on: 'true',
            off: 'false'
        },
		onChange : function(node, value, input) {
			let group = $(`[data-group="${name}_separator"]`);
			let separator = $(`> .${name}.separator`, node);
			
			if (value == 'true') {
				group.show();
				
				if (!separator.length) {
					separator = $(`<div class="separator ${name}">${defaultSeparatorSvg}</div>`);
					node.append(separator);
				} else {
					separator.removeClass("d-none");
				}
			} else {
				group.hide();
				separator.addClass("d-none");
			}

			return element;
		}, 
		init: function(node) {
			let separator = $(`> .${name}.separator:visible`, node);
			let group = $(`[data-group="${name}_separator"]`);
			
			if (separator.length) {
				group.show();
				console.log(group);
				return 'true';
			} else {
				group.hide();
				return 'false';
			}
		}		
    },{
		name: "Icon",
		key: "icon",
		inline:true,
		group:`${name}_separator`,
		child:`.separator.${name} > svg`,
		inputtype: HtmlListSelectInput,
		onChange:function(element, value, input, component) {
			console.log(element);
			var newElement = $(value);
			let attributes = element.prop("attributes");
			
			//keep old svg size and colors
			$.each(attributes, function() {
				if (this.name == "viewBox") return;
                newElement.attr(this.name, this.value);
            });
            
			element.replaceWith(newElement);
			return newElement;
		},
		data: {
			url: Vvveb.baseUrl + "../../resources/svg/separators/{value}/index.html",
			clickElement:"li",
			insertElement:"svg",
			elements: 'Loading ...',
			options: [{
                value: "digital-red-panther",
                text: "Red panther"
            }]
		},
	}, {
		name: "Width",
		key: "width",
		htmlAttr: "width",
		group:`${name}_separator`,
		child:`.separator.${name} > svg`,
		inputtype: RangeInput,
		data:{
			max: 640,
			min:6,
			step:1
		}
   }, {
		name: "Height",
		key: "height",
		htmlAttr: "height",
		group:`${name}_separator`,
		child:`.separator.${name} > svg`,
		inputtype: RangeInput,
		data:{
			max: 640,
			min:6,
			step:1
		}			
   }, {
		name: "Stroke width",
		key: "stroke-width",
		htmlAttr: "stroke-width",
		group:`${name}_separator`,
		child:`.separator.${name} > svg`,
		inputtype: RangeInput,
		data:{
			max: 512,
			min:1,
			step:1
		}			
   },/*{
		key: "separator_svg_style_header",
		inputtype: SectionInput,
		name:false,
		group:`${name}_separator`,
		//sort: base_sort++,
		//section: style_section,
		data: {header:"Svg colors"},
	},*/ {
        name: "Fill Color",
        key: "fill",
        //sort: base_sort++,
        col:4,
        inline:true,
		//section: style_section,
		group:`${name}_separator`,
		child:`.separator.${name} > svg`,
		htmlAttr: "fill",
        inputtype: ColorInput,
   },{
        name: "Color",
        key: "color",
        //sort: base_sort++,
        col:4,
        inline:true,
		//section: style_section,
		group:`${name}_separator`,
		child:`.separator.${name} > svg`,
		htmlAttr: "color",
        inputtype: ColorInput,
   },{
        name: "Stroke",
        key: "stroke",
        //sort: base_sort++,
        col:4,
        inline:true,
		//section: style_section,
		group:`${name}_separator`,
		child:`.separator.${name} > svg`,
		htmlAttr: "color",
        inputtype: ColorInput,
  	}
];
}

let SectionBottomSeparator = [
	{
        key: "section_bottom_separator",
        inputtype: SectionInput,
        name:false,
        sort: base_sort++,
		//section: style_section,
        data: {header:"Bottom Separator"},
	},{
        //name: "Enable",
		name: false,
        key: "top_bottom",
        inline: true,
        validValues: ["", "active"],
        inputtype: ToggleInput,
        data: {
			className: "form-switch-lg",
            on: "active",
            off: ""
        }
	}, 
];

/* Section */
let ComponentSectionContent = [{
        name: "Title",
        key: "title",
        htmlAttr: "title",
        inputtype: TextInput
    }, {
        name: "Container width",
        key: "container-width",
		child:"> .container, > .container-fluid",
        htmlAttr: "class",
        validValues: ["container", "container-fluid"],
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
				value: "container",
				icon:"la la-box",
				text: "Boxed",
				title: "Boxed"
			}, 
			{
				value: "container-fluid",
				icon:"la la-arrows-alt-h",
				title: "Full",
				text: "Full"
			}]
        }
	}, {
        name: "Container height",
        key: "container-height",
		child:"> .container:first-child, > .container-fluid:first-child",
        htmlAttr: "class",
        validValues: ["", "vh-100"],
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
				value: "container",
				icon:"la la-expand",
				text: "Auto",
				title: "Auto",
				checked:true,
			}, 
			{
				value: "vh-100",
				icon:"la la-arrows-alt-v",
				title: "Full",
				text: "Full"
			}]
        }
	}, 
	...SectionBackground,
	...SectionOverlay,
	...sectionSeparatorProperties("top", "Top"),
	...sectionSeparatorProperties("bottom", "Bottom"),
];
   

let ComponentSectionStyle = [];/*[{
		key: "Section Style",
		inputtype: SectionInput,
		name:false,
		section: style_section,
		data: {header:"Style"},
 
	},{
        name: "Text1 Style",
        key: "text1",
        htmlAttr: "innerHTML",
        inputtype: TextInput,
        section: style_section,
    }, {
        name: "Name1 Style",
        key: "name1",
        htmlAttr: "name",
        inputtype: TextInput,
        section: style_section,
    }, {
        name: "Type1 Style",
        key: "type1",
		htmlAttr: "type",
        inputtype: SelectInput,
        section: style_section,
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
        name: "Autofocus1 Style",
        key: "autofocus1",
        htmlAttr: "autofocus",
        inputtype: CheckboxInput,
		inline:true,
        col:6,
        section: style_section
   	},{
        name: "Disabled1 Style",
        key: "disabled1",
        htmlAttr: "disabled",
        inputtype: CheckboxInput,		
		inline:true,
        col:6,
        section: style_section,
}];*/

let ComponentSectionAdvanced = [];/* [{
		key: "Section Advanced",
		inputtype: SectionInput,
		name:false,
		section: advanced_section,
		data: {header:"Advanced"},
 
	},{
        name: "Text1 Advanced",
        key: "text1",
        htmlAttr: "innerHTML",
        inputtype: TextInput,
        section: advanced_section,
    }, {
        name: "Name1 Advanced",
        key: "name1",
        htmlAttr: "name",
        inputtype: TextInput,
        section: advanced_section,
    }, {
        name: "Type1 Advanced",
        key: "type1",
		htmlAttr: "type",
        inputtype: SelectInput,
        section: advanced_section,
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
        name: "Autofocus1 Advanced",
        key: "autofocus1",
        htmlAttr: "autofocus",
        inputtype: CheckboxInput,
		inline:true,
        col:6,
        section: advanced_section
   	},{
        name: "Disabled1 Advanced",
        key: "disabled1",
        htmlAttr: "disabled",
        inputtype: CheckboxInput,		
		inline:true,
        col:6,
        section: advanced_section,
}];*/

function componentsInit(node) {
		
		$('.mb-3[data-group]').hide();

		let img = $("> .background-container img:visible", node);
		let video = $("> .background-container video:visible", node);
		let bg = "";
		
		if (img.length) {
			bg = "bg-image";
		}
		if (video.length) {
			bg = "bg-video";
		}
		
		if (bg) {
			$('.mb-3[data-group="' + bg + '"]').show();
		}
		
		if ($("> .overlay:visible", node).length) {
			$('.mb-3[data-group="overlay"]').show();
		}		
		
		if ($("> .separator.top:visible", node).length) {
			$('.mb-3[data-group="top_separator"]').show();
		}
		
		if ($("> .separator.bottom:visible", node).length) {
			$('.mb-3[data-group="bottom_separator"]').show();
		}
}

Vvveb.Components.add("elements/section", {
    nodes: ["section"],
    name: "Section",
    image: "icons/stream-solid.svg",
    html: `<section>
				<div class="container">
					<h1>Section</h1>
				</div>
			</section>`,
    properties: [
		...ComponentSectionContent, 
		...ComponentSectionStyle,
		...ComponentSectionAdvanced
	],
	init: componentsInit	
});  

Vvveb.Components.add("elements/header", {
    nodes: ["header"],
    name: "Header",
    image: "icons/stream-solid.svg",
    html: `<header>
				<div class="container">
					<h1>Section</h1>
				</div>
			</header>`,
    properties: [
		...ComponentSectionContent, 
		...ComponentSectionStyle,
		...ComponentSectionAdvanced
	],
    init: componentsInit	
});  


Vvveb.Components.add("elements/footer", {
    nodes: ["footer"],
    name: "Footer",
    image: "icons/stream-solid.svg",
    html: `<footer>
				<div class="container">
					<h1>Section</h1>
				</div>
			</footer>`,
    properties: [
		...ComponentSectionContent, 
		...ComponentSectionStyle,
		...ComponentSectionAdvanced
	],
    init: componentsInit
});  
