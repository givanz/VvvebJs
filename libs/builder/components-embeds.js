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


Vvveb.ComponentsGroup['Embeds'] = ["embeds/embed"];

Vvveb.Components.extend("_base", "embeds/embed", {
    name: "Embed",
    attributes: ["data-component-oembed"],
    image: "icons/code.svg",
    //dragHtml: '<img src="' + Vvveb.baseUrl + 'icons/maps.png">',
	html: `<div data-component-oembed data-url="">
			<div class="alert alert-light  m-5" role="alert">
				<img width="64" src="${Vvveb.baseUrl}icons/code.svg">
				<h6>Enter url to embed</h6>
			</div></div>`,


    properties: [{
        name: "Url",
        key: "url",
		htmlAttr: "data-url",
        inputtype: TextInput,
        onChange: function(node, value) {
			node.innerHTML = `<div class="alert alert-light d-flex justify-content-center">
				  <div class="spinner-border m-5" role="status">
					<span class="visually-hidden">Loading...</span>
				  </div>
				</div>`;
			
			getOembed(value).then(response => {
				  node.innerHTML = response.html;
				  let containerW = node.offsetWidth;
				  let iframe = node.querySelector("iframe");
				  if (iframe) {
					  let ratio = containerW / iframe.offsetWidth;
					  iframe.setAttribute("width", (width * ratio));
					  iframe.setAttribute("height", (height * ratio));
				  }

				  let arr = node.querySelectorAll('script').forEach(script => {
						let newScript = Vvveb.Builder.frameDoc.createElement("script");
						newScript.src = script.src;
						script.replaceWith(newScript);
				  });				  
				  
			}).catch(error => console.log(error));

			return node;
		},	
    },{
        name: "Width",
        key: "width",
        child:"iframe",
        htmlAttr: "width",
        inputtype: CssUnitInput
    },{
        name: "Height",
        key: "height",
        child:"iframe",
        htmlAttr: "height",
        inputtype: CssUnitInput
	}]
});

for (const provider of ["youtube", "vimeo", "dailymotion", "flickr", "smugmug", "scribd", "twitter", "soundcloud", "slideshare", "spotify", "imgur", "issuu", "mixcloud", "ted", "animoto", "tumblr", "kickstarter", "reverbnation", "reddit", "speakerdeck", "screencast", "amazon", "someecards", "tiktok","pinterest", "wolfram", "anghami"])  {
	Vvveb.Components.add("embeds/" + provider, {
		name: provider,
		image: "icons/code.svg",
		html: `<div data-component-oembed data-url="">
				<div class="alert alert-light  m-5" role="alert">
					<img width="64" src="${Vvveb.baseUrl}icons/code.svg">
					<h6>Enter ${provider} url to embed</h6>
				</div></div>`,
	});
	Vvveb.ComponentsGroup['Embeds'].push("embeds/" + provider);
}
