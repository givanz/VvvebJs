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

Vvveb.ComponentsGroup[i18n('server.group')] = ["components/products", "components/product", "components/categories", "components/manufacturers", "components/search", "components/user", "components/product_gallery", "components/cart", "components/checkout", "components/filters", "components/product", "components/slider"];


Vvveb.Components.add("components/product", {
    name: i18n('server.productName'),
    attributes: ["data-component-product"],

    image: "icons/map.svg",
    html: '<iframe frameborder="0" src="https://maps.google.com/maps?&z=1&t=q&output=embed"></iframe>',
    
	properties: [
	{
        name: i18n('server.idProperty'),
        key: "id",
        htmlAttr: "id",
        inputtype: TextInput
    },
	{
        name: i18n('server.selectProperty'),
        key: "id",
        htmlAttr: "id",
        inputtype: SelectInput,
        data:{
			options: [{
                value: "",
                text: i18n('server.noneText')
            }, {
                value: "pull-left",
                text: i18n('server.leftText')
            }, {
                value: "pull-right",
                text: i18n('server.rightText')
            }]
       },
    },
	{
        name: i18n('server.select2Property'),
        key: "id",
        htmlAttr: "id",
        inputtype: SelectInput,
        data:{
			options: [{
                value: "",
                text: i18n('server.nimicText')
            }, {
                value: "pull-left",
                text: i18n('server.gigiText')
            }, {
                value: "pull-right",
                text: i18n('server.vasileText')
            }, {
                value: "pull-right",
                text: i18n('server.sad34Text')
            }]
       },
    }]
});    


Vvveb.Components.add("components/products", {
    name: i18n('server.productsName'),
    attributes: ["data-component-products"],

    image: "icons/products.svg",
    html: '<div class="mb-3"><label>' + i18n('server.yourResponseLabel') + '</label><textarea class="form-control"></textarea></div>',

    init: function (node)
	{
		document.querySelector('.mb-3[data-group]').style.display = "none";;
		if (node.dataset.type != undefined)
		{
			document.querySelector('.mb-3[data-group="'+ node.dataset.type + '"]').style.display = "block";;
		} else
		{		
			document.querySelector('.mb-3[data-group]:first').style.display = "block";
		}
	},
    properties: [{
        name: false,
        key: "type",
        inputtype: RadioButtonInput,
		htmlAttr:"data-type",
        data: {
            inline: true,
            extraclass:"btn-group-fullwidth",
            options: [{
                value: "autocomplete",
                text: i18n('server.autocompleteText'),
                title: "Autocomplete",
                icon:"la la-search",
                checked:true,
            }, {
                value: "automatic",
                icon:"la la-cog",
                text: i18n('server.configurationText'),
                title: "Configuration",
            }],
        },
		onChange : function(element, value, input) {
			
			document.querySelector('.mb-3[data-group]').style.display = "none";;
			document.querySelector('.mb-3[data-group="'+ input.value + '"]').style.display = "block";

			return element;
		}, 
		init: function(node) {
			return node.dataset.type;
		},            
    },{
        name: i18n('server.productsProperty'),
        key: "products",
        group:"autocomplete",
        htmlAttr:"data-products",
        inputtype: AutocompleteList,
        data: {
            url: "/admin/?module=editor/editor&action=productsAutocomplete",
        },
    },{
        name: i18n('server.numberOfProductsProperty'),
        group:"automatic",
        key: "limit",
		htmlAttr:"data-limit",
        inputtype: NumberInput,
        data: {
            value: "8",//default
            min: "1",
            max: "1024",
            step: "1"
        },        
        getFromNode: function(node) {
            return 10
        },
    },{
        name: i18n('server.startFromPageProperty'),
        group:"automatic",
        key: "page",
		htmlAttr:"data-page",
        data: {
            value: "1",//default
            min: "1",
            max: "1024",
            step: "1"
        },        
        inputtype: NumberInput,
        getFromNode: function(node) {
            return 0
        },
    },{
        name: i18n('server.orderByProperty'),
        group:"automatic",
        key: "order",
		htmlAttr:"data-order",
        inputtype: SelectInput,
        data: {
            options: [{
				value: "price_asc",
                text: i18n('server.priceAscendingText')
            }, {
                value: "price_desc",
                text: i18n('server.priceDescendingText')
            }, {
                value: "date_asc",
                text: i18n('server.dateAscendingText')
            }, {
                value: "date_desc",
                text: i18n('server.dateDescendingText')
            }, {
                value: "sales_asc",
                text: i18n('server.salesAscendingText')
            }, {
                value: "sales_desc",
                text: i18n('server.salesDescendingText')
            }]
		}
	},{
        name: i18n('server.categoryProperty'),
        group:"automatic",
        key: "category",
		htmlAttr:"data-category",
        inputtype: AutocompleteList,
        data: {
            url: "/admin/?module=editor/editor&action=productsAutocomplete",
        },

	},{
        name: i18n('server.manufacturerProperty'),
        group:"automatic",
        key: "manufacturer",
		htmlAttr:"data-manufacturer",
        inputtype: AutocompleteList,
        data: {
            url: "/admin/?module=editor/editor&action=productsAutocomplete",
		}
	},{
        name: i18n('server.manufacturer2Property'),
        group:"automatic",
        key: "manufacturer 2",
		htmlAttr:"data-manufacturer2",
        inputtype: AutocompleteList,
        data: {
            url: "/admin/?module=editor/editor&action=productsAutocomplete",
        },
    }]
});

Vvveb.Components.add("components/manufacturers", {
    name: i18n('server.manufacturersName'),
    classes: ["component_manufacturers"],
    image: "icons/categories.svg",
    html: '<div class="mb-3"><label>' + i18n('server.yourResponseLabel') + '</label><textarea class="form-control"></textarea></div>',
    properties: [{
        nolabel:false,
        inputtype: TextInput,
        data: {text:i18n('server.fieldsText')}
	},{
        name: i18n('server.nameProperty'),
        key: "category",
        inputtype: TextInput
	},{
        name: i18n('server.imageProperty'),
        key: "category",
        inputtype: TextInput
	}
    ]
});

Vvveb.Components.add("components/categories", {
    name: i18n('server.categoriesName'),
    classes: ["component_categories"],
    image: "icons/categories.svg",
    html: '<div class="mb-3"><label>' + i18n('server.yourResponseLabel') + '</label><textarea class="form-control"></textarea></div>',
    properties: [{
        name: i18n('server.nameProperty'),
        key: "name",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }]
});
Vvveb.Components.add("components/search", {
    name: i18n('server.searchName'),
    classes: ["component_search"],
    image: "icons/search.svg",
    html: '<div class="mb-3"><label>' + i18n('server.yourResponseLabel') + '</label><textarea class="form-control"></textarea></div>',
    properties: [{
        name: i18n('server.placeholder1'),
        key: "src",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }, {
        name: i18n('server.placeholder2'),
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: i18n('server.placeholder3'),
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }]
});
Vvveb.Components.add("components/user", {
    name: i18n('server.userName'),
    classes: ["component_user"],
    image: "icons/user.svg",
    html: '<div class="mb-3"><label>' + i18n('server.yourResponseLabel') + '</label><textarea class="form-control"></textarea></div>',
    properties: [{
        name: i18n('server.placeholder1'),
        key: "src",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }, {
        name: i18n('server.placeholder2'),
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: i18n('server.placeholder3'),
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }]
});
Vvveb.Components.add("components/product_gallery", {
    name: i18n('server.productGalleryName'),
    classes: ["component_product_gallery"],
    image: "icons/product_gallery.svg",
    html: '<div class="mb-3"><label>' + i18n('server.yourResponseLabel') + '</label><textarea class="form-control"></textarea></div>',
    properties: [{
        name: i18n('server.placeholder1'),
        key: "src",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }, {
        name: i18n('server.placeholder2'),
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: i18n('server.placeholder3'),
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }]
});
Vvveb.Components.add("components/cart", {
    name: i18n('server.cartName'),
    classes: ["component_cart"],
    image: "icons/cart.svg",
    html: '<div class="mb-3"><label>' + i18n('server.yourResponseLabel') + '</label><textarea class="form-control"></textarea></div>',
    properties: [{
        name: "asdasdad",
        key: "src",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }, {
        name: "34234234",
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: "d32d23",
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }]
});
Vvveb.Components.add("components/checkout", {
    name: i18n('server.checkoutName'),
    classes: ["component_checkout"],
    image: "icons/checkout.svg",
    html: '<div class="mb-3"><label>' + i18n('server.yourResponseLabel') + '</label><textarea class="form-control"></textarea></div>',
    properties: [{
        name: "asdasdad",
        key: "src",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }, {
        name: "34234234",
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: "d32d23",
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }]
});
Vvveb.Components.add("components/filters", {
    name: "Filters",
    classes: ["component_filters"],
    image: "icons/filters.svg",
    html: '<div class="mb-3"><label>' + i18n('server.yourResponseLabel') + '</label><textarea class="form-control"></textarea></div>',
    properties: [{
        name: "asdasdad",
        key: "src",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }, {
        name: "34234234",
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: "d32d23",
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }]
});
Vvveb.Components.add("components/product", {
    name: "Product",
    classes: ["component_product"],
    image: "icons/product.svg",
    html: '<div class="mb-3"><label>' + i18n('server.yourResponseLabel') + '</label><textarea class="form-control"></textarea></div>',
    properties: [{
        name: "asdasdad",
        key: "src",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }, {
        name: "34234234",
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: "d32d23",
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }]
});
Vvveb.Components.add("components/slider", {
    name: "Slider",
    classes: ["component_slider"],
    image: "icons/slider.svg",
    html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
    properties: [{
        name: "asdasdad",
        key: "src",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }, {
        name: "34234234",
        key: "width",
        htmlAttr: "width",
        inputtype: TextInput
    }, {
        name: "d32d23",
        key: "height",
        htmlAttr: "height",
        inputtype: TextInput
    }]
});
