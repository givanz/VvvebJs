# VvvebJs


## Drag and drop website builder javascript library.

For a full featured CMS using VvvebJs check [Vvveb CMS](https://github.com/givanz/Vvveb)

Built with jQuery and Bootstrap 5.

## [Live Demo](https://www.vvveb.com/vvvebjs/editor.html)

[![npm](https://img.shields.io/npm/v/vvvebjs.svg)](https://www.npmjs.com/package/vvvebjs)

Using [Vvveb landing page template](https://github.com/givanz/Vvveb-landing-bootstrap5-template) for demo page and Bootstrap 5 sections and blocks.

<img src="https://www.vvveb.com/img/browser.png">

### Features

* Components and blocks/snippets drag and drop and in page insert.
* Undo/Redo operations.
* One or two panels interface.
* File manager and component hierarchy navigation.
* Add new page modal with template and folder options.
* Live code editor with codemirror plugin syntax highlighting.
* Image upload with example php script included.
* Page download or export html or save page on server with example php script included.
* Components/Sections/Blocks list search.
* Bootstrap 5 components.
* Media gallery with integrated CC0 image search and server upload support.
* Image, video and iframe elements resize handles.
* Elements breadcrumb for easier parent elements selection.
* Full Google fonts list support for font selection.
* Youtube, Google maps, Charts.js etc widgets.
* Optional CKEditor plugin to replace builtin text editor.
* Zip download plugin to download the page and all assets as zip file.
* SVG Icon component bundled with hundreds of free icons.
* Animate on scroll support for page elements.
* Theme global typography and color pallette editor.


By default the editor comes with Bootstrap 5 and Widgets components and can be extended with any kind of components and inputs.

## Usage

```html
<!-- jquery-->
<script src="js/jquery.min.js"></script>
<script src="js/jquery.hotkeys.js"></script>

<!-- bootstrap-->
<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>

<!-- builder code-->
<script src="libs/builder/builder.js"></script>	
<!-- undo manager-->
<script src="libs/builder/undo.js"></script>	
<!-- inputs-->
<script src="libs/builder/inputs.js"></script>	
<!-- components-->
<script src="libs/builder/components-bootstrap5.js"></script>	
<script src="libs/builder/components-widgets.js"></script>	


<script>
$(document).ready(function()  {
	Vvveb.Gui.init();
	Vvveb.FileManager.init();
	Vvveb.SectionList.init();
	var pages = 
	[
		{name:"narrow-jumbotron", title:"Jumbotron",  url: "demo/narrow-jumbotron/index.html", file: "demo/narrow-jumbotron/index.html", assets: ['demo/narrow-jumbotron/narrow-jumbotron.css']},
		{name:"album", title:"Album",  url: "demo/album/index.html", file: "demo/album/index.html", folder:"content", assets: ['demo/album/album.css']},
	];
	
	Vvveb.FileManager.addPages(pages);
	Vvveb.FileManager.loadPage("narrow-jumbotron");
	Vvveb.Breadcrumb.init();
});
</script>
```

For editor html and components/input javascript templates check editor.html

For css changes edit scss/editor.scss and scss/_builder.scss

## Documentation

For documentation check the [wiki](https://github.com/givanz/VvvebJs/wiki)

## Support

If you like the project you can support it with a [PayPal donation](https://paypal.me/zgivan)


## License

Apache 2.0
