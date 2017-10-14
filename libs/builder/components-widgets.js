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

Vvveb.ComponentsGroup['Widgets'] = ["widgets/googlemaps", "widgets/video"];

Vvveb.Components.add("widgets/googlemaps", {
    name: "Google Maps",
    attributes: ["data-component-maps"],
    image: "icons/map.svg",
    html: '<img src="../libs/builder/icons/maps.png">',
    
    //url parameters
    z:3, //zoom
    q:'Paris',//location
    t: 'q', //map type q = roadmap, w = satellite
    
    onChange: function (node, property, value)
    {
		map_iframe = jQuery('iframe', node);
		
		this[property.key] = value;
		
		mapurl = 'https://maps.google.com/maps?&q=' + this.q + '&z=' + this.z + '&t=' + this.t + '&output=embed';
		
		map_iframe.attr("src",mapurl);
		
		return node;
	},
    
    //use an image for dragging for performance reasons, iframes elements don't drag well
    afterDrop: function (node)
	{
		newnode = $('<div data-component-maps><iframe frameborder="0" src="https://maps.google.com/maps?&z=1&t=q&output=embed" width="100" height="100" style="width:100%;height:100%;pointer-events:none"></iframe></div>')
		node.replaceWith(newnode);
		return newnode;
	},
    properties: [{
        name: "Address",
        key: "q",
        inputtype: TextInput
    }, 
	{
        name: "Map type",
        key: "t",
        inputtype: SelectInput,
        data:{
			options: [{
                value: "q",
                text: "Roadmap"
            }, {
                value: "w",
                text: "Satellite"
            }]
       },
    },
    {
        name: "Zoom",
        key: "z",
        inputtype: RangeInput,
        data:{
			max: 20, //max zoom level
			min:1,
			step:1
       },
    }]
});

Vvveb.Components.add("widgets/video", {
    name: "Video",
    attributes: ["data-component-video"],
    image: "icons/video.svg",
    html: '<img src="../libs/builder/icons/video.svg" width="100" height="100">',
    
    //url parameters set with onChange
    t:'y',//video type
    id:'',//video id
    url: '', //html5 video src
    autoplay: false,
    controls: true,
    loop: false,
    
    //use image for drag and swap with iframe on drop for drag performance
    afterDrop: function (node)
	{
		newnode = $('<div data-component-video><iframe frameborder="0" src="https://www.youtube.com/embed/-stFvGmg1A8" style="width:100%;height:100%;pointer-events:none"></iframe></div>')
		node.replaceWith(newnode);
		return newnode;
	},

	init: function (node)
	{
		iframe = jQuery('iframe', node);
		video = jQuery('video', node);
		
		$("#right-panel [data-key=url]").hide();
		
		//check if html5
		if (video.length) 
		{
			this.url = video.src;
		} else if (iframe.length) //vimeo or youtube
		{
			src = iframe.attr("src");

			if (src && src.indexOf("youtube"))//youtube
			{
				this.id = src.match(/youtube.com\/embed\/([^$\?]*)/)[1];
			} else if (src && src.indexOf("vimeo"))//youtube
			{
				this.id = src.match(/vimeo.com\/video\/([^$\?]*)/)[1];
			}
		}
		
		$("#right-panel input[name=id]").val(this.id);
		$("#right-panel input[name=url]").val(this.url);
	},
	
	onChange: function (node, property, value)
	{
		this[property.key] = value;
		switch (this.t)
		{
			case 'y':
			$("#right-panel [data-key=id]").show();
			$("#right-panel [data-key=url]").hide();
			newnode = $('<div data-component-video><iframe src="https://www.youtube.com/embed/' + this.id + '?&amp;autoplay=' + this.autoplay + '&amp;loop=' + this.loop + '" allowfullscreen="true" style="height: 100%; width: 100%;" frameborder="0"></iframe></div>');
			break;
			case 'v':
			$("#right-panel [data-key=id]").show();
			$("#right-panel [data-key=url]").hide();
			newnode = $('<div data-component-video><iframe src="https://player.vimeo.com/video/' + this.id + '?&amp;autoplay=' + this.autoplay + '&amp;loop=' + this.loop + '" allowfullscreen="true" style="height: 100%; width: 100%;" frameborder="0"></iframe></div>');
			break;
			case 'h':
			$("#right-panel [data-key=id]").hide();
			$("#right-panel [data-key=url]").show();
			newnode = $('<div data-component-video><video src="' + this.url + '" ' + (this.controls?' controls ':'') + (this.loop?' loop ':'') + ' style="height: 100%; width: 100%;"></video></div>');
			break;
		}
		
		node.replaceWith(newnode);
		return newnode;
	},	
	
    properties: [{
        name: "Provider",
        key: "t",
        inputtype: SelectInput,
        data:{
			options: [{
                text: "Youtube",
                value: "y"
            }, {
                text: "Vimeo",
                value: "v"
            },{
                text: "HTML5",
                value: "h"
            }]
       },
	 },	       
     {
        name: "Video id",
        key: "id",
        inputtype: TextInput,
    },{
        name: "Url",
        key: "url",
        inputtype: TextInput
    },{
        name: "Autoplay",
        key: "autoplay",
        inputtype: CheckboxInput
    },{
        name: "Controls",
        key: "controls",
        inputtype: CheckboxInput
    },{
        name: "Loop",
        key: "loop",
        inputtype: CheckboxInput
    }]
});
