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

Vvveb.ComponentsGroup['Server Components'] = ["components/products", "components/categories", "components/manufacturers", "components/search", "components/user", "components/product_gallery", "components/cart", "components/checkout", "components/filters", "components/product", "components/slider"];


Vvveb.Components.add("components/product", {
    name: "Products",
    attributes: ["data-component-product"],

    image: "icons/map.svg",
    html: '<iframe frameborder="0" src="https://maps.google.com/maps?&z=1&t=q&output=embed"></iframe>',
    
	properties: [
	{
        name: "Id",
        key: "id",
        htmlAttr: "id",
        inputtype: TextInput
    },
	{
        name: "Select",
        key: "id",
        htmlAttr: "id",
        inputtype: SelectInput,
        data:{
			options: [{
                value: "",
                text: "None"
            }, {
                value: "pull-left",
                text: "Left"
            }, {
                value: "pull-right",
                text: "Right"
            }]
       },
    },
	{
        name: "Select 2",
        key: "id",
        htmlAttr: "id",
        inputtype: SelectInput,
        data:{
			options: [{
                value: "",
                text: "nimic"
            }, {
                value: "pull-left",
                text: "gigi"
            }, {
                value: "pull-right",
                text: "vasile"
            }, {
                value: "pull-right",
                text: "sad34"
            }]
       },
    }]
});    


Vvveb.Components.add("components/products", {
    name: "Products",
    classes: ["component_products"],
    image: "icons/products.svg",
    html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
    onPropertiesShow: function ()
	{
		$('.form-group[class*="group-"]').hide();
		current = $('.form-group input[name="type"]:checked').val();
		//console.log(current);
		//console.log(this.el);
		$('.form-group[class*="group-' + current + '"]').show();
		
		jQuery("input.product_autocomplete", this.el).autocomplete("/?module=ajax&action=product_autocomplete", {json_key:'products'});		
	},
    properties: [{
        name: "Type",
        key: "type",
        nolabel:true,
        inputtype: RadioInput,
        data: {
            options: [{
                value: "autocomplete",
                text: "Autocomplete",
                icon:"linecons-user",
                isChecked:true,
            }, {
                value: "automatic",
                icon:"linecons-cog",
                text: "Automatic"
            }],
            name:"type",
			onChange : function(event) {
				current = $(event.currentTarget).val();
				$('.form-group[class*="group-"]').hide();
				$('.form-group[class*="group-' + current + '"]').show();

			},            
        },
    },{
        name: "Products",
        key: "height",
        nolabel:true,
        group:"autocomplete",
        inputtype: ProductsInput,
    },{
        name: "Number of products",
        group:"automatic",
        key: "limit",
        inputtype: TextInput,
        getFromNode: function(node) {
            return 10
        },
    },{
        name: "Start from page",
        group:"automatic",
        key: "page",
        inputtype: TextInput,
        getFromNode: function(node) {
            return 0
        },
    },{
        name: "Order by",
        group:"automatic",
        key: "order",
        inputtype: SelectInput,
        data: {
            options: [{
				value: "price_asc",
                text: "Price Ascending"
            }, {
                value: "price_desc",
                text: "Price Descending"
            }, {
                value: "date_asc",
                text: "Date Ascending"
            }, {
                value: "date_desc",
                text: "Date Descending"
            }, {
                value: "sales_asc",
                text: "Sales Ascending"
            }, {
                value: "sales_desc",
                text: "Sales Descending"
            }]
		}
	},{
        name: "Category",
        group:"automatic",
        key: "category",
        inputtype: TextInput
	},{
        name: "Manufacturer",
        group:"automatic",
        key: "category",
        inputtype: TextInput
	},{
        nolabel:true,
        inputtype: TextInput,
        data: {text:"Fields"}
	},{
        name: "Name",
        key: "category",
        inputtype: TextInput
	},{
        name: "Price",
        key: "category",
        inputtype: TextInput
	},{
        name: "Image",
        key: "category",
        inputtype: TextInput
	},{
        name: "Sale badge",
        key: "category",
        inputtype: TextInput
	},{
        name: "Currency",
        key: "category",
        inputtype: TextInput
    }
    
    ]
});

Vvveb.Components.add("components/manufacturers", {
    name: "Manufacturers",
    classes: ["component_manufacturers"],
    image: "icons/categories.svg",
    html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
    properties: [{
        nolabel:true,
        inputtype: TextInput,
        data: {text:"Fields"}
	},{
        name: "Name",
        key: "category",
        inputtype: TextInput
	},{
        name: "Image",
        key: "category",
        inputtype: TextInput
	}
    ]
});

Vvveb.Components.add("components/categories", {
    name: "Categories",
    classes: ["component_categories"],
    image: "icons/categories.svg",
    html: '<div class="form-group"><label>Your response:</label><textarea class="form-control"></textarea></div>',
    properties: [{
        name: "Name",
        key: "name",
        htmlAttr: "src",
        inputtype: FileUploadInput
    }]
});
Vvveb.Components.add("components/search", {
    name: "Search",
    classes: ["component_search"],
    image: "icons/search.svg",
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
Vvveb.Components.add("components/user", {
    name: "User",
    classes: ["component_user"],
    image: "icons/user.svg",
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
Vvveb.Components.add("components/product_gallery", {
    name: "Product gallery",
    classes: ["component_product_gallery"],
    image: "icons/product_gallery.svg",
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
Vvveb.Components.add("components/cart", {
    name: "Cart",
    classes: ["component_cart"],
    image: "icons/cart.svg",
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
Vvveb.Components.add("components/checkout", {
    name: "Checkout",
    classes: ["component_checkout"],
    image: "icons/checkout.svg",
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
Vvveb.Components.add("components/filters", {
    name: "Filters",
    classes: ["component_filters"],
    image: "icons/filters.svg",
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
Vvveb.Components.add("components/product", {
    name: "Product",
    classes: ["component_product"],
    image: "icons/product.svg",
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
