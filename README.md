# VvvebJs


## Drag and drop website builder javascript library.
Built with jQuery and Bootstrap 4.

[Live Demo](http://www.vvveb.com/vvvebjs/editor.html) using [Land.io](http://tatygrassini.github.io/landio-html/) and Bootstrap 4 components.

<img src="http://www.vvveb.com/img/browser.png?v=1">

By default the editor comes with Bootstrap 4 and Widgets components and can be extended with any kind of components and inputs.

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
<script src="libs/builder/components-bootstrap4.js"></script>	
<script src="libs/builder/components-widgets.js"></script>	


<script>
$(document).ready(function() 
{
	Vvveb.Builder.init('demo/index.html', function() {
		//load code after page is loaded here
		Vvveb.Gui.init();
	});
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
