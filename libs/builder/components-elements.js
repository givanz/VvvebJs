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

https://github.com/givanz/Vvvebjs
*/

Vvveb.ComponentsGroup['Elements'] = [
/*sections */
"elements/section", 
"elements/footer", 
"elements/header", 
"elements/svg-icon",
"elements/gallery",
];



Vvveb.Components.extend("_base","elements/svg-icon", {
    nodes: ["svg"],
    name: "Svg Icon",
    image: "icons/star.svg",
    html: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="64" height="64">
		<path d="M 30.335938 12.546875 L 20.164063 11.472656 L 16 2.132813 L 11.835938 11.472656 L 1.664063 12.546875 L 9.261719 19.394531 L 7.140625 29.398438 L 16 24.289063 L 24.859375 29.398438 L 22.738281 19.394531 Z"/>
    </svg>`,
    properties: [{
		name: "Icon",
		key: "icon",
		inline:true,
		inputtype: HtmlListSelectInput,
		onChange:function(element, value, input, component) {
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
			url: Vvveb.baseUrl + "../../resources/svg/icons/{value}/index.html",
			clickElement:"li",
			insertElement:"svg",
			elements: 'Loading ...',
			options: [{
                value: "eva-icons",
                text: "Eva icons"
            }, {
                value: "ionicons",
                text: "IonIcons"
            }, {
                value: "linea",
                text: "Linea"
            }, {
                value: "remix-icon",
                text: "RemixIcon"
            }, {
                value: "unicons",
                text: "Unicons"
            }, {
                value: "clarity-icons",
                text: "Clarity icons"
            }, {
                value: "jam-icons",
                text: "Jam icons"
            }, {
                value: "ant-design-icons",
                text: "Ant design icons"
            }, {
                value: "themify",
                text: "Themify"
            }, {
                value: "css.gg",
                text: "Css.gg"
            }, {
                value: "olicons",
                text: "Olicons"
            }, {
		value: "open-iconic",
		text: "Open iconic"
            }, {
                value: "boxicons",
                text: "Box icons"
            }, {
                value: "elegant-font",
                text: "Elegant font"
            }, {
                value: "dripicons",
                text: "Dripicons"
            }, {
                value: "feather",
                text: "Feather"
            }, {
                value: "coreui-icons",
                text: "Coreui icons"
            }, {
                value: "heroicons",
                text: "Heroicons"
            }, {
                value: "iconoir",
                text: "Iconoir"
            }, {
                value: "iconsax",
                text: "Iconsax"
            }, {
                value: "ikonate",
                text: "Ikonate"
            }, {
                value: "tabler-icons",
                text: "Tabler icons"
            }, {
                value: "octicons",
                text: "Octicons"
            }, {
                value: "system-uicons",
                text: "System-uicons"
            }, {
                value: "font-awesome",
                text: "FontAwesome"
            }, {
                value: "pe-icon-7-stroke",
                text: "Pixeden icon 7 stroke"
            }, {
                value: "77_essential_icons",
                text: "77 essential icons"
            }, {
                value: "150-outlined-icons",
                text: "150 outlined icons"
            }, {
                value: "material-design",
                text: "Material Design"
            }]
		},
	}, {
		name: "Width",
		key: "width",
		htmlAttr: "width",
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
		inputtype: RangeInput,
		data:{
			max: 512,
			min:1,
			step:1
		}			
   },{
		key: "svg_style_header",
		inputtype: SectionInput,
		name:false,
		//sort: base_sort++,
		section: style_section,
		data: {header:"Svg colors"},
	}, {
        name: "Fill Color",
        key: "fill",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "fill",
        inputtype: ColorInput,
   },{
        name: "Color",
        key: "color",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "color",
        inputtype: ColorInput,
   },{
        name: "Stroke",
        key: "Stroke",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "color",
        inputtype: ColorInput,
  	}]
});   


Vvveb.Components.add("elements/svg-element", {
    nodes: ["path", "line", "polyline", "polygon", "rect", "circle", "ellipse", "g"],
    name: "Svg element",
    image: "icons/star.svg",
    html: ``,
    properties: [{
        name: "Fill Color",
        key: "fill",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "fill",
        inputtype: ColorInput,
   },{
        name: "Color",
        key: "color",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "color",
        inputtype: ColorInput,
   },{
        name: "Stroke",
        key: "Stroke",
        //sort: base_sort++,
        col:4,
        inline:true,
		section: style_section,
		htmlAttr: "color",
        inputtype: ColorInput,
  	}, {
  		name: "Stroke width",
		key: "stroke-width",
		htmlAttr: "stroke-width",
		inputtype: RangeInput,
		data:{
			max: 512,
			min:1,
			step:1
		}			
	}]
});  

//Gallery
Vvveb.Components.add("elements/gallery", {
    attributes: ["data-component-gallery"],
    name: "Gallery",
    image: "icons/images.svg",
    html: `
			<div class="gallery masonry has-shadow" data-component-gallery>
				<div class="item">
					<a>
						<img src="/media/7.jpg">
					</a>
				</div>
				<div class="item">
					<a>
						<img src="/media/2.jpg">
					</a>
				</div>
				<div class="item">
					<a>
						<img src="/media/15.jpg">
					</a>
				</div>
				<div class="item">
					<a>
						<img src="/media/4.jpg">
					</a>
				</div>
				<div class="item">
					<a>
						<img src="/media/5.jpg">
					</a>
				</div>
				<div class="item">
					<a>
						<img src="/media/6.jpg">
					</a>
				</div>
				<div class="item">
					<a>
						<img src="/media/7.jpg">
					</a>
				</div>
			</div>
			`,
		properties: [{
			name: "Masonry layout",
			key: "masonry",
			htmlAttr: "class",
			validValues: ["masonry", "flex"],
			inputtype: ToggleInput,
			data: {
				on: "masonry",
				off: "flex"
			},
			setGroup: group => {
				$('.mb-3[data-group]').attr('style','display:none !important');
				$('.mb-3[data-group="'+ group + '"]').attr('style','');
			}, 		
			onChange : function(node, value, input)  {
				this.setGroup(value);
				return node;
			}, 
			init: function (node) {
				if ($(node).hasClass("masonry")) {
					return "masonry";
				} else {
					return "flex";
				}
			},   			
		}, {
			name: "Image shadow",
			key: "shadow",
			htmlAttr: "class",
			validValues: [ "", "has-shadow"],
			inputtype: ToggleInput,
			data: {
				on: "has-shadow",
				off: ""
			},
		}, {
			name: "Horizontal gap",
			key: "column-gap",
			htmlAttr: "style",
			inputtype: CssUnitInput,
			data:{
				max: 100,
				min:0,
				step:1
			}
	   }, {
			name: "Vertical gap",
			key: "margin-bottom",
			htmlAttr: "style",
			child: ".item",
			inputtype: CssUnitInput,
			data:{
				max: 100,
				min:0,
				step:1
			}
	   }, {
			name: "Images per row masonry",
			key: "column-count",
			group:"masonry",
			htmlAttr: "style",
			inputtype: RangeInput,
			data:{
				max: 12,
				min:1,
				step:1
			}
		}, {
			name: "Images per row flex",
			group:"flex",
			key: "flex-basis",
			child: ".item",
			htmlAttr: "style",
			inputtype: RangeInput,
			data:{
				max: 12,
				min:1,
				step:1
			},
			onChange: function(node, value, input, component, inputElement) {
				if (value) {
					value = 100 / value;
					value += "%";
				} 
				
				return value;
			}  			
	   }, {
			name: "",
			key: "addChild",
			inputtype: ButtonInput,
			data: {text:"Add image", icon:"la la-plus"},
			onChange: function(node) {
				 $(node).append('<div class="item"><a><img src="/media/15.jpg"></a></div>');
				 
				 //render component properties again to include the new image
				 //Vvveb.Components.render("ellements/gallery");
				 
				 return node;
			}
	}],
    init(node)	{
		
		$('.mb-3[data-group]').attr('style','display:none !important');
		
		let source = "flex";
		if ($(node).hasClass("masonry")) {
			source = "masonry";
		} else {
			source = "flex";
		}

		$('.mb-3[data-group="'+ source + '"]').attr('style','');
	}	
});  

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
/*	}, {
        key: "section_separators",
        inputtype: SectionInput,
        name:false,
        sort: base_sort++,
		//section: style_section,
        data: {header:"Separators"},
	},{
        name: false,
        key: "type",
        inputtype: RadioButtonInput,
		htmlAttr:"data-separators",
        data: {
            inline: true,
            extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "top",
                text: "Top Separator",
                title: "Top Separator",
                icon:"la la-arrow-up",
            }, {
                value: "bottom",
                text: "Bottom Separator",
                title: "Bottom Separator",
                icon:"la la-arrow-down",
            }],
        },
		onChange : function(element, value, input) {
			
			$('.mb-3[data-group]').hide();
			$('.mb-3[data-group="'+ input.value + '"]').show();

			return element;
		}, 
		init: function(node) {
			return node.dataset.type;
		}			
	}, {
        key: "section_background_header",
        inputtype: SectionInput,
        name:false,
        sort: base_sort++,
		//section: style_section,
        data: {header:"Background"},
   },{
        name: false,
        key: "type",
        inputtype: RadioButtonInput,
		htmlAttr:"data-type",
        data: {
            inline: true,
            extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "none",
                text: "None",
                title: "None",
                checked:true,
            }, {
                value: "image",
                icon:"la la-image",
                text: "Image",
                title: "Image",      
			}, {
                value: "gradient",
                icon:"la la-palette",
                text: "Gradient",
                title: "Gradient",
			}, {
                value: "video",
                icon:"la la-video",
                text: "Video",
                title: "Video",
			}, {
                value: "slideshow",
                icon:"la la-arrows-alt-h",
                text: "Slider",
                title: "Slider",
            }],
        },
		onChange : function(element, value, input) {
			
			$('.mb-3[data-group]').hide();
			$('.mb-3[data-group="'+ input.value + '"]').show();

			return element;
		}, 
		init: function(node) {
			return node.dataset.type;
		},            
*/    }   
];
   

let ComponentSectionStyle =  [{
		key: "Section Style",
		inputtype: SectionInput,
		name:false,
		section: style_section,
		data: {header:"Style"},
}];

let ComponentSectionAdvanced =  [{
		key: "Section Advanced",
		inputtype: SectionInput,
		name:false,
		section: advanced_section,
		data: {header:"Advanced"},
 
}];


Vvveb.Components.add("elements/section", {
    nodes: ["section"],
    name: "Section",
    image: "icons/stream-solid.svg",
    init: function (node)
	{
		$('.mb-3[data-group]').hide();
		if (node.dataset.type != undefined)
		{
			$('.mb-3[data-group="'+ node.dataset.type + '"]').show();
		} else
		{		
			$('.mb-3[data-group]:first').show();
		}
	},	
    html: `<section>
				<div class="container">
					<h1>Section</h1>
				</div>
			</section>`,
    properties: [
		...ComponentSectionContent, 
		...ComponentSectionStyle,
		...ComponentSectionAdvanced
	]
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
	]
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
	]
});  
