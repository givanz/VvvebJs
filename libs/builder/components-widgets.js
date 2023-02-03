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

Vvveb.ComponentsGroup['Widgets'] = ["widgets/googlemaps", "widgets/embed-video", "widgets/chartjs",/* "widgets/facebookpage", */"widgets/paypal", /*"widgets/instagram",*/ "widgets/twitter", "widgets/openstreetmap"/*, "widgets/facebookcomments"*/];

Vvveb.Components.extend("_base", "widgets/googlemaps", {
    name: "Google Maps",
    attributes: ["data-component-maps"],
    image: "icons/map.svg",
    dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/maps.png">',
    html: '<div data-component-maps><iframe frameborder="0" src="https://maps.google.com/maps?q=Bucharest&z=15&t=q&key=&output=embed" width="100%" height="100%" style="width:100%;height:100%;left:0px"></iframe></div>',
    resizable:true,//show select box resize handlers
    resizeMode:"css",
    
    
    //url parameters
    z:3, //zoom
    q:'Paris',//location
    t: 'q', //map type q = roadmap, w = satellite
    key: '',
    
	init: function (node)
	{
		let iframe = jQuery('iframe', node);
		let url = new URL(iframe.attr("src"));
		let params = new URLSearchParams(url.search);
		
		this.z = params.get("z");
		this.q = params.get("q");
		this.t = params.get("t");
		this.key = params.get("key");

		$(".component-properties input[name=z]").val(this.z);
		$(".component-properties input[name=q]").val(this.q);
		$(".component-properties select[name=t]").val(this.t);
		$(".component-properties input[name=key]").val(this.key);
	},
	    
    onChange: function (node, property, value) {
		map_iframe = jQuery('iframe', node);
		
		this[property.key] = value;
		
		mapurl = 'https://maps.google.com/maps?q=' + this.q + '&z=' + this.z + '&t=' + this.t + '&output=embed';
		
		map_iframe.attr("src",mapurl);
		
		return node;
	},

    properties: [{
        name: "Address",
        key: "q",
        inputtype: TextInput
    }, {
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
    }, {
        name: "Zoom",
        key: "z",
        inputtype: RangeInput,
        data:{
			max: 20, //max zoom level
			min:1,
			step:1
		}
    }, {
        name: "Key",
        key: "key",
        inputtype: TextInput
	}]
});

Vvveb.Components.extend("_base", "widgets/openstreetmap", {
    name: "Open Street Map",
    attributes: ["data-component-openstreetmap"],
    image: "icons/map.svg",
    dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/maps.png">',
    html: `<div data-component-openstreetmap><iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=-62.04673002474011%2C16.95487694424327%2C-61.60521696321666%2C17.196751341562923&layer=mapnik"></iframe></div>`,
    resizable:true,//show select box resize handlers
    resizeMode:"css",
    
    
    //url parameters
    bbox:'',//location
    layer: 'mapnik', //map type
    
	init: function (node)
	{
		let iframe = jQuery('iframe', node);
		let url = new URL(iframe.attr("src"));
		let params = new URLSearchParams(url.search);
		
		this.bbox = params.get("bbox");
		this.layer = params.get("layer");

		$(".component-properties input[name=bbox]").val(this.bbox);
		$(".component-properties input[name=layer]").val(this.layer);
	},
	    
    onChange: function (node, property, value) {
		map_iframe = jQuery('iframe', node);
		
		this[property.key] = value;
		
		mapurl = 'https://www.openstreetmap.org/export/embed.html?bbox=' + this.bbox + '&layer=' + this.layer;
		
		map_iframe.attr("src",mapurl);
		
		return node;
	},

    properties: [{
        name: "Map",
        key: "bbox",
        inputtype: TextInput
/*    }, {
        name: "Layer",
        key: "layer",
        inputtype: SelectInput,
        data:{
			options: [{
                value: "",
                text: "Default"
            }, {
                value: "Y",
                text: "CyclOSM"
            }, {
                value: "C",
                text: "Cycle Map"
            }, {
                value: "T",
                text: "Transport Map"
            }]
       }*/
	}]
});

Vvveb.Components.extend("_base", "widgets/embed-video", {
    name: "Embed Video",
    attributes: ["data-component-video"],
    image: "icons/youtube.svg",
    dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/youtube.svg" width="100" height="100">', //use image for drag and swap with iframe on drop for drag performance
    html: '<div data-component-video style="width:640px;height:480px;"><iframe frameborder="0" src="https://player.vimeo.com/video/24253126?autoplay=false&controls=false&loop=false&playsinline=true&muted=false" width="100%" height="100%"></iframe></div>',
    
    
    //url parameters set with onChange
    t:'y',//video type
    video_id:'',//video id
    url: '', //html5 video src
    autoplay: false,
    controls: false,
    loop: false,
    playsinline: true,
    muted: false,
    resizable:true,//show select box resize handlers
    resizeMode:"css",//div unlike img/iframe etc does not have width,height attributes need to use css
	youtubeRegex:/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]+)/i,
	vimeoRegex : /(?:vimeo\.com(?:[^\d]+))(\d+)/i,

	init: function (node)
	{
		iframe = jQuery('iframe', node);
		video = jQuery('video', node);
		
		$(".component-properties [data-key=url]").hide();
		$(".component-properties [data-key=poster]").hide();
		
		//check if html5
		if (video.length) 
		{
			this.url = video.src;
		} else if (iframe.length) //vimeo or youtube
		{
			let src = iframe.attr("src");
			let match;

			if (src && src.indexOf("youtube") && (match = src.match(this.youtubeRegex))) {//youtube
				this.video_id = match[1];
				this.t = "y";
			} else if (src && src.indexOf("vimeo") && (match = src.match(this.vimeoRegex))) { //vimeo
				this.video_id = match[1];
				this.t = "v";
			} else {
				this.t = "h";
			}
		}
		
		$(".component-properties input[name=video_id]").val(this.video_id);
		$(".component-properties input[name=url]").val(this.url);
		$(".component-properties select[name=t]").val(this.t);
	},
	
	onChange: function (node, property, value)
	{
		this[property.key] = value;
		//if (property.key == "t")
		{
			switch (this.t)
			{
				case 'y':
					$(".component-properties [data-key=video_id]").show();
					$(".component-properties [data-key=url]").hide();
					$(".component-properties [data-key=poster]").hide();
					newnode = $(`<iframe width="100%" height="100%" allowfullscreen="true" frameborder="0" allow="autoplay" 
										src="https://www.youtube.com/embed/${this.video_id}?autoplay=${this.autoplay}&controls=${this.controls}&loop=${this.loop}&playsinline=${this.playsinline}&muted=${this.muted}">
								</iframe>`);
				break;
				case 'v':
					$(".component-properties [data-key=video_id]").show();
					$(".component-properties [data-key=url]").hide();
					$(".component-properties [data-key=poster]").hide();
					newnode = $(`<iframe width="100%" height="100%" allowfullscreen="true" frameborder="0" allow="autoplay" 
										src="https://player.vimeo.com/video/${this.video_id}?autoplay=${this.autoplay}&controls=${this.controls}&loop=${this.loop}&playsinline=${this.playsinline}&muted=${this.muted}">
								</iframe>`);
				break;
				case 'h':
					$(".component-properties [data-key=video_id]").hide();
					$(".component-properties [data-key=url]").show();
					$(".component-properties [data-key=poster]").show();
					newnode = $('<video poster="' + this.poster + '" src="' + this.url + '" ' + (this.autoplay?' autoplay ':'') + (this.controls?' controls ':'') + (this.loop?' loop ':'') + (this.playsinline?' playsinline ':'') + (this.muted?' muted ':'') + ' style="height: 100%; width: 100%;"></video>');
				break;
			}
			
			$("> iframe, > video", node).replaceWith(newnode);
			return node;
		}
		
		return node;
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
	 },{
        name: "Video",
        key: "video_id",
        inputtype: TextInput,
   		onChange: function(node, value, input, component) {
			
			let youtube = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]+)/i;
			let vimeo = /(?:vimeo\.com(?:[^\d]+))(\d+)/i;
			let id = false;
			let t = false;

			if (((id = value.match(youtube)) && (t = "y")) || ((id = value.match(vimeo)) && (t = "v"))) {
				$(".component-properties select[name=t]").val(t);
				$(".component-properties select[name=video_id]").val(id[1]);

				component.t = t;
				component.video_id = id[1];

				return id[1];
			}
			
			return node;
		}
    },{
        name: "Poster",
        key: "poster",
        htmlAttr: "poster",
        inputtype: ImageInput
    }, {
        name: "Url",
        key: "url",
        inputtype: TextInput
    },{
		name: "Width",
        key: "width",
        htmlAttr: "style",
        inline:false,
        col:6,
        inputtype: CssUnitInput
    }, {
        name: "Height",
        key: "height",
        htmlAttr: "style",
        inline:false,
        col:6,
        inputtype: CssUnitInput
    },{
		key: "video_options",
        inputtype: SectionInput,
        name:false,
        data: {header:"Options"},
    },{
        name: "Auto play",
        key: "autoplay",
        htmlAttr: "autoplay",
        inline:true,
        col:4,
        inputtype: CheckboxInput
    },{
        name: "Plays inline",
        key: "playsinline",
        htmlAttr: "playsinline",
        inline:true,
        col:4,
        inputtype: CheckboxInput
    },{
        name: "Controls",
        key: "controls",
        htmlAttr: "controls",
        inline:true,
        col:4,
        inputtype: CheckboxInput
    },{
        name: "Loop",
        key: "loop",
        htmlAttr: "loop",
        inline:true,
        col:4,
        inputtype: CheckboxInput
    },{
        name: "Muted",
        key: "muted",
        htmlAttr: "muted",
        inline:true,
        col:4,
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

Vvveb.Components.extend("_base", "widgets/facebookcomments", {
    name: "Facebook Comments",
    attributes: ["data-component-facebookcomments"],
    image: "icons/facebook.svg",
    dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/facebook.svg">',
    html: '<div  data-component-facebookcomments><script>(function(d, s, id) {\
			  var js, fjs = d.getElementsByTagName(s)[0];\
			  if (d.getElementById(id)) return;\
			  js = d.createElement(s); js.id = id;\
			  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6&appId=";\
			  fjs.parentNode.insertBefore(js, fjs);\
			}(document, \'script\', \'facebook-jssdk\'));</script>\
			<div class="fb-comments" \
			data-href="' + window.location.href + '" \
			data-numposts="5" \
			data-colorscheme="light" \
			data-mobile="" \
			data-order-by="social" \
			data-width="100%" \
			></div></div>',
    properties: [{
        name: "Href",
        key: "business",
        htmlAttr: "data-href",
        child:".fb-comments",
        inputtype: TextInput
    },{		
        name: "Item name",
        key: "item_name",
        htmlAttr: "data-numposts",
        child:".fb-comments",
        inputtype: TextInput
    },{		
        name: "Color scheme",
        key: "colorscheme",
        htmlAttr: "data-colorscheme",
        child:".fb-comments",
        inputtype: TextInput
    },{		
        name: "Order by",
        key: "order-by",
        htmlAttr: "data-order-by",
        child:".fb-comments",
        inputtype: TextInput
    },{		
        name: "Currency code",
        key: "width",
        htmlAttr: "data-width",
        child:".fb-comments",
        inputtype: TextInput
	}]
});
/*
Vvveb.Components.extend("_base", "widgets/instagram", {
    name: "Instagram",
    attributes: ["data-component-instagram"],
    image: "icons/instagram.svg",
    drophtml: '<img src="' + Vvveb.baseUrl + 'icons/instagram.png">',
    html: '<div align=center data-component-instagram>\
			<blockquote class="instagram-media" data-instgrm-captioned data-instgrm-permalink="https://www.instagram.com/p/tsxp1hhQTG/" data-instgrm-version="8" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:658px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:8px;"> <div style=" background:#F8F8F8; line-height:0; margin-top:40px; padding:50% 0; text-align:center; width:100%;"> <div style=" background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAMAAAApWqozAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURczMzPf399fX1+bm5mzY9AMAAADiSURBVDjLvZXbEsMgCES5/P8/t9FuRVCRmU73JWlzosgSIIZURCjo/ad+EQJJB4Hv8BFt+IDpQoCx1wjOSBFhh2XssxEIYn3ulI/6MNReE07UIWJEv8UEOWDS88LY97kqyTliJKKtuYBbruAyVh5wOHiXmpi5we58Ek028czwyuQdLKPG1Bkb4NnM+VeAnfHqn1k4+GPT6uGQcvu2h2OVuIf/gWUFyy8OWEpdyZSa3aVCqpVoVvzZZ2VTnn2wU8qzVjDDetO90GSy9mVLqtgYSy231MxrY6I2gGqjrTY0L8fxCxfCBbhWrsYYAAAAAElFTkSuQmCC); display:block; height:44px; margin:0 auto -44px; position:relative; top:-22px; width:44px;"></div></div> <p style=" margin:8px 0 0 0; padding:0 4px;"> <a href="https://www.instagram.com/p/tsxp1hhQTG/" style=" color:#000; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px; text-decoration:none; word-wrap:break-word;" target="_blank">Text</a></p> <p style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; line-height:17px; margin-bottom:0; margin-top:8px; overflow:hidden; padding:8px 0 7px; text-align:center; text-overflow:ellipsis; white-space:nowrap;">A post shared by <a href="https://www.instagram.com/instagram/" style=" color:#c9c8cd; font-family:Arial,sans-serif; font-size:14px; font-style:normal; font-weight:normal; line-height:17px;" target="_blank"> Instagram</a> (@instagram) on <time style=" font-family:Arial,sans-serif; font-size:14px; line-height:17px;" datetime="-">-</time></p></div></blockquote>\
			<script async defer src="//www.instagram.com/embed.js"></script>\
		</div>',
    properties: [{
        name: "Widget id",
        key: "instgrm-permalink",
        htmlAttr: "data-instgrm-permalink",
        child: ".instagram-media",
        inputtype: TextInput
    }],
});
*/
Vvveb.Components.extend("_base", "widgets/twitter", {
    name: "Twitter",
    attributes: ["data-component-twitter"],
    image: "icons/twitter.svg",
    dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/twitter.svg">',
    html: '<div data-component-twitter><iframe width="100%" height="100%"src="https://platform.twitter.com/embed/Tweet.html?embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=943901463998169088"></iframe></div>',
    resizable:true,//show select box resize handlers
    resizeMode:"css",
    twitterRegex : /(?:twitter\.com(?:[^\d]+))(\d+)/i,

    tweet:'',//location
	init: function (node)
	{
		let iframe = jQuery('iframe', node);
		let src = iframe.attr("src");
		let url = new URL(src);
		let params = new URLSearchParams(url.search);
		
		this.tweet = params.get("id");
		
		if (!this.tweet) {
			if (match = src.match(this.twitterRegex)) {
				this.tweet = match[1];
			}
			
		}

		$(".component-properties input[name=tweet]").val(this.tweet);
	},
	    
    onChange: function (node, property, value) {
		tweet_iframe = jQuery('iframe', node);

		if (property.key == "tweet") {
			this[property.key] = value;
			
			tweeturl = 'https://platform.twitter.com/embed/Tweet.html?embedId=twitter-widget-0&frame=false&hideCard=false&hideThread=false&id=' + this.tweet;
			
			tweet_iframe.attr("src",tweeturl);
		}
		
		return node;
	},

    properties: [{
        name: "Tweet",
        key: "tweet",
        inputtype: TextInput,
   		onChange: function(node, value, input, component) {
			
			let twitterRegex = /(?:twitter\.com(?:[^\d]+))(\d+)/i;
			let id = false;

			if (id = value.match(twitterRegex)) {
				$(".component-properties input[name=tweet]").val(id[1]);

				component.tweet = id[1];
				return id[1];
			}
			
			return node;
		}
	}]
});

Vvveb.Components.extend("_base", "widgets/paypal", {
    name: "Paypal",
    attributes: ["data-component-paypal"],
    image: "icons/paypal.svg",
    html: '<form action="https://www.paypal.com/cgi-bin/webscr" method="post" data-component-paypal>\
\
				<!-- Identify your business so that you can collect the payments. -->\
				<input type="hidden" name="business"\
					value="givanz@yahoo.com">\
\
				<!-- Specify a Donate button. -->\
				<input type="hidden" name="cmd" value="_donations">\
\
				<!-- Specify details about the contribution -->\
				<input type="hidden" name="item_name" value="VvvebJs">\
				<input type="hidden" name="item_number" value="Support">\
				<input type="hidden" name="currency_code" value="USD">\
\
				<!-- Display the payment button. -->\
				<input type="image" name="submit"\
				src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"\
				alt="Donate">\
				<img alt="" width="1" height="1"\
				src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" >\
\
			</form>',
    properties: [{
        name: "Email",
        key: "business",
        htmlAttr: "value",
        child:"input[name='business']",
        inputtype: TextInput
    },{		
        name: "Item name",
        key: "item_name",
        htmlAttr: "value",
        child:"input[name='item_name']",
        inputtype: TextInput
    },{		
        name: "Item number",
        key: "item_number",
        htmlAttr: "value",
        child:"input[name='item_number']",
        inputtype: TextInput
    },{		
        name: "Currency code",
        key: "currency_code",
        htmlAttr: "value",
        child:"input[name='currency_code']",
        inputtype: TextInput
	}],
});
    
Vvveb.Components.extend("_base", "widgets/facebookpage", {
    name: "Facebook Page Plugin",
    attributes: ["data-component-facebookpage"],
    image: "icons/facebook.svg",
    dropHtml: '<img src="' + Vvveb.baseUrl + 'icons/facebook.png">',
	html: `<div data-component-facebookpage><div class="fb-page" 
			 data-href="https://www.facebook.com/facebook" 
			 data-tabs="timeline"
			 data-width="" 
			 data-height="" 
			 data-small-header="true" 
			 data-adapt-container-width="true" 
			 data-hide-cover="false" 
			 data-show-facepile="true">
			 
				<blockquote cite="https://www.facebook.com/facebook" class="fb-xfbml-parse-ignore">
					<a href="https://www.facebook.com/facebook">Facebook</a>
				</blockquote>

			</div>

			<div id="fb-root"></div>
			<script async defer crossorigin="anonymous" src="https://connect.facebook.net/ro_RO/sdk.js#xfbml=1&version=v15.0" nonce="o7Y7zPjy"></script>
		</div>`,

    properties: [{
        name: "Small header",
        key: "small-header",
        htmlAttr: "data-small-header",
        child:".fb-page",
        inputtype: TextInput
    },{		
        name: "Adapt container width",
        key: "adapt-container-width",
        htmlAttr: "data-adapt-container-width",
        child:".fb-page",
        inputtype: TextInput
    },{		
        name: "Hide cover",
        key: "hide-cover",
        htmlAttr: "data-hide-cover",
        child:".fb-page",
        inputtype: TextInput
    },{		
        name: "Show facepile",
        key: "show-facepile",
        htmlAttr: "data-show-facepile",
        child:".fb-page",
        inputtype: TextInput
    },{		
        name: "App Id",
        key: "appid",
        htmlAttr: "data-appId",
        child:".fb-page",
        inputtype: TextInput
	}],
   onChange: function(node, input, value, component) {
	   
	   var newElement = $(this.html);
	   newElement.find(".fb-page").attr(input.htmlAttr, value);

	   $("[data-fbcssmodules]", Vvveb.Builder.frameHead).remove();
	   $("[data-fbcssmodules]", Vvveb.Builder.frameBody).remove();
	   $("script[src^='https://connect.facebook.net']", Vvveb.Builder.frameHead).remove();


	   node.parent().html(newElement.html());
	   return newElement;
	}	
});
    
Vvveb.Components.extend("_base", "widgets/chartjs", {
    name: "Chart.js",
    attributes: ["data-component-chartjs"],
    image: "icons/chart.svg",
	dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/chart.svg">',
    html: '<div data-component-chartjs class="chartjs" data-chart=\'{\
			"type": "line",\
			"data": {\
				"labels": ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],\
				"datasets": [{\
					"data": [12, 19, 3, 5, 2, 3],\
					"fill": false,\
					"borderColor":"rgba(255, 99, 132, 0.2)"\
				}, {\
					"fill": false,\
					"data": [3, 15, 7, 4, 19, 12],\
					"borderColor": "rgba(54, 162, 235, 0.2)"\
				}]\
			}}\' style="min-height:240px;min-width:240px;width:100%;height:100%;position:relative">\
			  <canvas></canvas>\
			</div>',
	chartjs: null,
	ctx: null,
	node: null,

	config: {/*
			type: 'line',
			data: {
				labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
				datasets: [{
					data: [12, 19, 3, 5, 2, 3],
					fill: false,
					borderColor:'rgba(255, 99, 132, 0.2)',
				}, {
					fill: false,
					data: [3, 15, 7, 4, 19, 12],
					borderColor: 'rgba(54, 162, 235, 0.2)',
				}]
			},*/
	},		

	dragStart: function (node)
	{
		//check if chartjs is included and if not add it when drag starts to allow the script to load
		body = Vvveb.Builder.frameBody;
		
		if ($("#chartjs-script", body).length == 0)
		{
			$(body).append('<script id="chartjs-script" src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>');
			$(body).append('<script>\
				$(document).ready(function() {\
					$(".chartjs").each(function () {\
						ctx = $("canvas", this).get(0).getContext("2d");\
						config = JSON.parse(this.dataset.chart);\
						chartjs = new Chart(ctx, config);\
					});\
				\});\
			  </script>');
		}
		
		return node;
	},
	

	drawChart: function ()
	{
		if (this.chartjs != null) this.chartjs.destroy();
		this.node.dataset.chart = JSON.stringify(this.config);
		
		config = Object.assign({}, this.config);//avoid passing by reference to avoid chartjs to fill the object
		this.chartjs = new Chart(this.ctx, config);
	},
	
	init: function (node)
	{
		this.node = node;
		this.ctx = $("canvas", node).get(0).getContext("2d");
		this.config = JSON.parse(node.dataset.chart);
		this.drawChart();

		return node;
	},
  
  
	beforeInit: function (node)
	{
		return node;
	},
    
    properties: [
	{
        name: "Type",
        key: "type",
        inputtype: SelectInput,
        data:{
			options: [{
                text: "Line",
                value: "line"
            }, {
                text: "Bar",
                value: "bar"
            }, {
                text: "Pie",
                value: "pie"
            }, {
                text: "Doughnut",
                value: "doughnut"
            }, {
                text: "Polar Area",
                value: "polarArea"
            }, {
                text: "Bubble",
                value: "bubble"
            }, {
                text: "Scatter",
                value: "scatter"
            },{
                text: "Radar",
                value: "radar"
            }]
       },
		init: function(node) {
			return JSON.parse(node.dataset.chart).type;
		},
       onChange: function(node, value, input, component) {
		   component.config.type = value;
		   component.drawChart();
		   
		   return node;
		}
	 }]
});
