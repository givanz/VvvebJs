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

bgcolorClasses = ["bg-primary", "bg-secondary", "bg-success", "bg-danger", "bg-warning", "bg-info", "bg-body-secondary", "bg-dark", "bg-white"]

bgcolorSelectOptions = [{
	value: "Default",
	text: ""
},{
	value: "bg-primary",
	text: i18n('common.colorPrimary')
},{
	value: "bg-secondary",
	text: i18n('common.colorSecondary')
},{
	value: "bg-success",
	text: i18n('common.colorSuccess')
},{
	value: "bg-danger",
	text: i18n('common.colorDanger')
},{
	value: "bg-warning",
	text: i18n('common.colorWarning')
},{
	value: "bg-info",
	text: i18n('common.colorInfo')
},{
	value: "bg-body-secondary",
	text: i18n('common.colorLight')
},{
	value: "bg-dark",
	text: i18n('common.colorDark')
},{
	value: "bg-white",
	text: i18n('common.colorWhite')
}];

function changeNodeName(node, newNodeName) {
	let newNode;
	newNode = document.createElement(newNodeName);
	attributes = node.attributes;
	
	for (i = 0, len = attributes.length; i < len; i++) {
		newNode.setAttribute(attributes[i].nodeName, attributes[i].nodeValue);
	}

	while (node.hasChildNodes()) {
		newNode.appendChild(node.removeChild(node.firstChild))
	}

	node.replaceWith(newNode);
	
	return newNode;
}

let base_sort = 1000;//start sorting for base component from 100 to allow extended properties to be first
let style_section = 'style';
let advanced_section = 'advanced';

Vvveb.Components.add("_base", {
    name: i18n('common.componentElement'),
	properties: [{
        key: "element_header",
        inputtype: SectionInput,
        name:false,
        sort:base_sort++,
        data: {header:i18n('common.generalHeader')},
    },{
        name: i18n('common.idProperty'),
        key: "id",
        htmlAttr: "id",
        sort: base_sort++,
        inline:false,
        col:6,
        inputtype: TextInput
    },{
        name: i18n('common.classProperty'),
        key: "class",
        htmlAttr: "class",
        sort: base_sort++,
        inline:false,
        col:6,
        inputtype: TextInput
    }
   ]
});    

//display
Vvveb.Components.extend("_base", "_base", {
	 properties: [{
        key: "display_header",
        inputtype: SectionInput,
        name:false,
        sort: base_sort++,
		section: style_section,
        data: {header:i18n('common.displayHeader')},
     },{
		//linked styles notice message
		name:"",
		key: "linked_styles_check",
        sort: base_sort++,
        section: style_section,
        inline:false,
        col:12,
        inputtype: NoticeInput,
        data: {
			type:'warning',
			title:i18n('common.linkedStylesTitle'),
			text:i18n('common.linkedStylesNoticeText'),
		},
		afterInit:function(node, inputElement) {
			let selector = Vvveb.StyleManager.getSelectorForElement(node);
			let elements = window.FrameDocument.querySelectorAll(selector);

			if (elements.length <= 1) {
				if (inputElement.style) {
					inputElement.style.display = "none";
				}
			} else {
				inputElement.style.display = "";
				inputElement.querySelector(".elements-count").innerHTML = elements.length;
				inputElement.querySelector(".text-muted").innerHTML = selector;
				
				inputElement.querySelector(".id-input", inputElement).addEventListener("click", (event) => {
					document.querySelectorAll(".content-tab a").forEach(e => e.click());
					
					setTimeout(function () { 
						let idInput = document.querySelectorAll("[name=id]");
						idInput.forEach(el => {if (el.offsetParent) el.focus()});/*
						idInput.forEach(el => el .dispatchEvent(new FocusEvent("focusin", {
							bubbles: true,
							cancelable: false
						})));*/
					}, 700);
					
					event.preventDefault();
					return false;
				});
				
				inputElement.querySelector(".linked-elements-hover").addEventListener("mouseenter", function (){
					elements.forEach( e => e.style.outline = "2px dotted blue");
				});
				
				inputElement.querySelector(".linked-elements-hover").addEventListener("mouseleave", function (){
					elements.forEach( e => e.style.outline = "");
				});
			}
		},	 
    },{
        name: i18n('common.displayProperty'),
        key: "display",
        htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: SelectInput,
        validValues: ["block", "inline", "inline-block", "none"],
        data: {
            options: [{
                value: "block",
                text: i18n('common.displayBlock')
            },{
                value: "inline",
                text: i18n('common.displayInline')
            },{
                value: "inline-block",
                text: i18n('common.displayInlineBlock')
            },{
                value: "inline-block",
                text: i18n('common.displayInlineBlock')
            },{
                value: "flex",
                text: i18n('common.displayFlex')
            },{
                value: "inline-flex",
                text: i18n('common.displayInlineFlex')
            },{
                value: "grid",
                text: i18n('common.displayGrid')
            },{
                value: "inline-grid",
                text: i18n('common.displayInlineGrid')
            },{
                value: "table",
                text: i18n('common.displayTable')
            },{
                value: "table-row",
                text: i18n('common.displayTableRow')
            },{
                value: "list-item",
                text: i18n('common.displayListItem')
            },{
                value: "inherit",
                text: i18n('common.displayInherit')
            },{
                value: "initial",
                text: i18n('common.displayInitial')
            },{
                value: "none",
                text: i18n('common.displayNone')
            }]
        }
    },{
        name: i18n('common.positionProperty'),
        key: "position",
        htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: SelectInput,
        validValues: ["static", "fixed", "relative", "absolute"],
        data: {
            options: [{
                value: "static",
                text: i18n('common.positionStatic')
            },{
                value: "fixed",
                text: i18n('common.positionFixed')
            },{
                value: "relative",
                text: i18n('common.positionRelative')
            },{
                value: "absolute",
                text: i18n('common.positionAbsolute')
            }]
        }
    },{
        name: i18n('common.topProperty'),
        key: "top",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        parent:"",
        inputtype: CssUnitInput
	},{
        name: i18n('common.leftProperty'),
        key: "left",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        parent:"",
        inputtype: CssUnitInput
    },{
        name: i18n('common.bottomProperty'),
        key: "bottom",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        parent:"",
        inputtype: CssUnitInput
	},{
        name: i18n('common.rightProperty'),
        key: "right",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        parent:"",
        inputtype: CssUnitInput
    },{
        name: i18n('common.floatProperty'),
        key: "float",
        htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
        inline:false,
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "none",
                icon:"la la-times",
                //text: "None",
                title: i18n('common.floatNone'),
                checked:true,
            },{
                value: "left",
                //text: "Left",
                title: i18n('common.floatLeft'),
                icon:"la la-align-left",
                checked:false,
            },{
                value: "right",
                //text: "Right",
                title: i18n('common.floatRight'),
                icon:"la la-align-right",
                checked:false,
            }],
         }
	},{
        name: i18n('common.opacityProperty'),
        key: "opacity",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
		inline:false,
        parent:"",
        inputtype: RangeInput,
        data:{
			max: 1, //max zoom level
			min:0,
			step:0.1
       },
	},{
        name: i18n('common.backgroundColorProperty'),
        key: "background-color",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:true,
		htmlAttr: "style",
        inputtype: ColorInput,
	},{
        name: i18n('common.textColorProperty'),
        key: "color",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:true,
		htmlAttr: "style",
        inputtype: ColorInput,
  	}]
});    

//Typography
let ComponentBaseTypography = {
	 properties: [{
		key: "typography_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:i18n('common.typographyHeader')},
 
	},{
        name: i18n('common.fontSizeProperty'),
        key: "font-size",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.fontWeightProperty'),
        key: "font-weight",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: i18n('common.fontWeightDefault')
			},{	
				value: "100",
				text: i18n('common.fontWeightThin')
			},{
				value: "200",
				text: i18n('common.fontWeightExtraLight')
			},{
				value: "300",
				text: i18n('common.fontWeightLight')
			},{
				value: "400",
				text: i18n('common.fontWeightNormal')
			},{
				value: "500",
				text: i18n('common.fontWeightMedium')
			},{
				value: "600",
				text: i18n('common.fontWeightSemiBold')
			},{
				value: "700",
				text: i18n('common.fontWeightBold')
			},{
				value: "800",
				text: i18n('common.fontWeightExtraBold')
			},{
				value: "900",
				text: i18n('common.fontWeightUltraBold')
			}],
		}
    },{
        name: i18n('common.fontFamilyProperty'),
        key: "font-family",
	htmlAttr: "style",
        sort: base_sort++,
	section: style_section,
        col:12,
	inline:false,
        inputtype: SelectInput,
        data: {
			options: fontList
		}
	},{
        name: i18n('common.textAlignProperty'),
        key: "text-align",
        htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
        inline:false,
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "",
                icon:"la la-times",
                //text: "None",
                title: i18n('common.floatNone'),
                checked:true,
            },{
                value: "left",
                //text: "Left",
                title: i18n('common.alignLeft'),
                icon:"la la-align-left",
                checked:false,
            },{
                value: "center",
                //text: "Center",
                title: i18n('common.alignCenter'),
                icon:"la la-align-center",
                checked:false,
            },{
                value: "right",
                //text: "Right",
                title: i18n('common.floatRight'),
                icon:"la la-align-right",
                checked:false,
            },{
                value: "justify",
                //text: "justify",
                title: i18n('common.alignJustify'),
                icon:"la la-align-justify",
                checked:false,
            }],
        },
	},{
        name: i18n('common.lineHeightProperty'),
        key: "line-height",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.letterSpacingProperty'),
        key: "letter-spacing",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.textDecorationProperty'),
        key: "text-decoration-line",
        htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
        inline:false,
        inputtype: RadioButtonInput,
        data: {
			extraclass:"btn-group-sm btn-group-fullwidth",
            options: [{
                value: "none",
                icon:"la la-times",
                //text: "None",
                title: i18n('common.floatNone'),
                checked:true,
            },{
                value: "underline",
                //text: "Left",
                title: i18n('common.decorationUnderline'),
                icon:"la la-long-arrow-alt-down",
                checked:false,
            },{
                value: "overline",
                //text: "Right",
                title: i18n('common.decorationOverline'),
                icon:"la la-long-arrow-alt-up",
                checked:false,
            },{
                value: "line-through",
                //text: "Right",
                title: i18n('common.decorationLineThrough'),
                icon:"la la-strikethrough",
                checked:false,
            },{
                value: "underline overline",
                //text: "justify",
                title: i18n('common.decorationUnderlineOverline'),
                icon:"la la-arrows-alt-v",
                checked:false,
            }],
        },
	},{
        name: i18n('common.decorationColorProperty'),
        key: "text-decoration-color",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:true,
		htmlAttr: "style",
        inputtype: ColorInput,
	},{
        name: i18n('common.decorationStyleProperty'),
        key: "text-decoration-style",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:true,
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: i18n('common.styleDefault')
			},{	
				value: "solid",
				text: i18n('common.styleSolid')
			},{
				value: "wavy",
				text: i18n('common.styleWavy')
			},{
				value: "dotted",
				text: i18n('common.styleDotted')
			},{
				value: "dashed",
				text: i18n('common.styleDashed')
			},{
				value: "double",
				text: i18n('common.styleDouble')
			}],
		}
  }]
}

Vvveb.Components.extend("_base", "_base", ComponentBaseTypography);
    
//Size
let ComponentBaseSize = {
	 properties: [{
		key: "size_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:i18n('common.sizeHeader'), expanded:false},
	},{
        name: i18n('common.widthProperty'),
        key: "width",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.heightProperty'),
        key: "height",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.minWidthProperty'),
        key: "min-width",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.minHeightProperty'),
        key: "min-height",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.maxWidthProperty'),
        key: "max-width",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.maxHeightProperty'),
        key: "max-height",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }]
}

Vvveb.Components.extend("_base", "_base", ComponentBaseSize);

//Margin
let ComponentBaseMargin = {
	 properties: [{
		key: "margins_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:i18n('common.marginHeader'), expanded:false},
	},{
        name: i18n('common.topProperty'),
        key: "margin-top",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.rightProperty'),
        key: "margin-right",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    },{
        name: i18n('common.bottomProperty'),
        key: "margin-bottom",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    },{
        name: i18n('common.leftProperty'),
        key: "margin-left",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }]
}

Vvveb.Components.extend("_base", "_base", ComponentBaseMargin);

//Padding
let ComponentBasePadding = {

	 properties: [{
		key: "paddings_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:i18n('common.paddingHeader'), expanded:false},
	},{
        name: i18n('common.topProperty'),
        key: "padding-top",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.rightProperty'),
        key: "padding-right",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    },{
        name: i18n('common.bottomProperty'),
        key: "padding-bottom",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    },{
        name: i18n('common.leftProperty'),
        key: "padding-left",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }]
}

Vvveb.Components.extend("_base", "_base", ComponentBasePadding);


//Border
Vvveb.Components.extend("_base", "_base", {
	 properties: [{
		key: "border_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:i18n('common.borderHeader'), expanded:false},
	 },{        
        name: i18n('common.styleProperty'),
        key: "border-style",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:12,
		inline:false,
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: i18n('common.styleDefault')
			},{	
				value: "solid",
				text: i18n('common.styleSolid')
			},{
				value: "dotted",
				text: i18n('common.styleDotted')
			},{
				value: "dashed",
				text: i18n('common.styleDashed')
			}],
		}
	},{
        name: i18n('common.widthProperty'),
        key: "border-width",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
   	},{
        name: i18n('common.colorProperty'),
        key: "border-color",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
		htmlAttr: "style",
        inputtype: ColorInput,
	}]
});    



//Border radius
Vvveb.Components.extend("_base", "_base", {
	 properties: [{
		key: "border_radius_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:i18n('common.borderRadiusHeader'), expanded:false},
	},{
        name: i18n('common.topLeftRadiusProperty'),
        key: "border-top-left-radius",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
	},{
        name: i18n('common.topRightRadiusProperty'),
        key: "border-top-right-radius",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    },{
        name: i18n('common.bottomLeftRadiusProperty'),
        key: "border-bottom-left-radius",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    },{
        name: i18n('common.bottomRightRadiusProperty'),
        key: "border-bottom-right-radius",
		htmlAttr: "style",
        sort: base_sort++,
		section: style_section,
        col:6,
		inline:false,
        inputtype: CssUnitInput
    }]
});    

//Background image
Vvveb.Components.extend("_base", "_base", {
	 properties: [{
		key: "background_image_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: style_section,
		data: {header:i18n('common.backgroundImageHeader'), expanded:false},
	 },{
        name: i18n('common.imageProperty'),
        key: "Image",
        sort: base_sort++,
		section: style_section,
		//htmlAttr: "style",
        inputtype: ImageInput,
        
        init: function(node) {
			let image = node.style.backgroundImage.replace(/url\(['"]?([^"\)$]+?)['"]?\).*/, '$1');
			return image;
        },

		onChange: function(node, value) {
			
			Vvveb.StyleManager.setStyle(node, "background-image", 'url(' + value + ')');
			
			return node;
		}        

   	},{
        name: i18n('common.repeatProperty'),
        key: "background-repeat",
        sort: base_sort++,
		section: style_section,
		htmlAttr: "style",
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: i18n('common.styleDefault')
			},{	
				value: "repeat-x",
				text: i18n('common.repeatX')
			},{
				value: "repeat-y",
				text: i18n('common.repeatY')
			},{
				value: "no-repeat",
				text: i18n('common.noRepeat')
			}],
		}
   	},{
        name: i18n('common.sizeProperty'),
        key: "background-size",
        sort: base_sort++,
		section: style_section,
		htmlAttr: "style",
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: i18n('common.styleDefault')
			},{	
				value: "contain",
				text: i18n('common.sizeContain')
			},{
				value: "cover",
				text: i18n('common.sizeCover')
			}],
		}
   	},{
        name: i18n('common.positionXProperty'),
        key: "background-position-x",
        sort: base_sort++,
		section: style_section,
		htmlAttr: "style",
        col:6,
		inline:true,
		inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: i18n('common.styleDefault')
			},{	
				value: "center",
				text: i18n('common.positionCenter')
			},{	
				value: "right",
				text: i18n('common.positionRight')
			},{
				value: "left",
				text: i18n('common.positionLeft')
			}],
		}
   	},{
        name: i18n('common.positionYProperty'),
        key: "background-position-y",
        sort: base_sort++,
		section: style_section,
		htmlAttr: "style",
        col:6,
		inline:true,
		inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: i18n('common.styleDefault')
			},{	
				value: "center",
				text: i18n('common.positionCenter')
			},{	
				value: "top",
				text: i18n('common.positionTop')
			},{
				value: "bottom",
				text: i18n('common.positionBottom')
			}],
		}
    }]
});    


//Device visibility
let ComponentDeviceVisibility = {
	 properties: [{
		key: "visibility_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: advanced_section,
		data: {header:i18n('common.hideOnDeviceHeader')},
	},{
        name: i18n('common.extraSmallDevicesProperty'),
        key: "hidexs",
        col:6,
		inline:true,
		sort: base_sort++,
		section: advanced_section,
        htmlAttr: "class",
        validValues: ["d-xs-none"],
        inputtype: ToggleInput,
        data: {
            on: "d-xs-none",
            off: ""
        }
	},{
        name: i18n('common.smallDevicesProperty'),
        key: "hidesm",
        col:6,
		inline:true,
		sort: base_sort++,
		section: advanced_section,
        htmlAttr: "class",
        validValues: ["d-sm-none"],
        inputtype: ToggleInput,
        data: {
            on: "d-sm-none",
            off: ""
        }
	},{
        name: i18n('common.mediumDevicesProperty'),
        key: "hidemd",
        col:6,
		inline:true,
		sort: base_sort++,
		section: advanced_section,
        htmlAttr: "class",
        validValues: ["d-md-none"],
        inputtype: ToggleInput,
        data: {
            on: "d-md-none",
            off: ""
        }
	},{
        name: i18n('common.largeDevicesProperty'),
        key: "hidelg",
        col:6,
		inline:true,
		sort: base_sort++,
		section: advanced_section,
        htmlAttr: "class",
        validValues: ["d-lg-none"],
        inputtype: ToggleInput,
        data: {
            on: "d-lg-none",
            off: ""
        }
	},{
        name: i18n('common.extraLargeDevicesProperty'),
        key: "hidexl",
        col:6,
		inline:true,
		sort: base_sort++,
		section: advanced_section,
        htmlAttr: "class",
        validValues: ["d-xl-none"],
        inputtype: ToggleInput,
        data: {
            on: "d-xl-none",
            off: ""
        }
	},{
        name: i18n('common.extraExtraLargeDevicesProperty'),
        key: "hidexxl",
        col:6,
		inline:true,
		sort: base_sort++,
		section: advanced_section,
        htmlAttr: "class",
        validValues: ["d-xxl-none"],
        inputtype: ToggleInput,
        data: {
            on: "d-xxl-none",
            off: ""
        }
    }]
};

Vvveb.Components.extend("_base", "_base", ComponentDeviceVisibility);


Vvveb.Components.add("config/bootstrap", {
    name: i18n('common.bootstrapVariablesComponent'),
	beforeInit: function (node) {
		properties = [];
		let i = 0;
		let j = 0;

		let cssVars = Vvveb.ColorPaletteManager.getAllCSSVariableNames(window.FrameDocument.styleSheets/*, ":root"*/);
		
		for (type in cssVars) {
			properties.push({
				key: "cssVars" + type,
				inputtype: SectionInput,
				name:type,
				sort: base_sort++,
				data: {header:type[0].toUpperCase() + type.slice(1)},
			});
			
			for (selector in cssVars[type]) {
				
				let friendlyName = selector.replaceAll(/--bs-/g,"").replaceAll("-", " ").trim();  
				friendlyName = friendlyName[0].toUpperCase() + friendlyName.slice(1);

				let value = cssVars[type][selector];
				let input;
				
				data = {selector, type:value.type, step:"any"};
				
				if (value.type == "color") {
					input = ColorInput;
				} else if (value.type == "font") {
					input = SelectInput;
					data.options = fontList;
				} else if (value.type == "dimensions") {
					input = CssUnitInput;
				}

				i++;
				properties.push({
					name: friendlyName,
					key: "cssvar" + i,
					defaultValue: value.value,
					//index: i - 1,
					columnNode: this,
					col:(value.type == "font" || value.type == "dimensions") ? 12 : 6,
					inline:(value.type == "font" || value.type == "dimensions") ? false : true,
					section: advanced_section,
					inputtype: input,
					data: data,
					onChange: function(node, value, input) {
						
						if (this.data.type == "font") {
							let option = input.options[input.selectedIndex];
							Vvveb.FontsManager.addFont(option.dataset.provider, value, node[0]);
						}

						Vvveb.StyleManager.setStyle(":root", this.data.selector, value);
						
						return node;
					},	
				});
			}
		}
		
		this.properties = properties;
		return node;
	},
	properties: [],
});
