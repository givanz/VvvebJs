/*
Animate on scroll
The edited page should include the aos library https://github.com/michalsnik/aos

  <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />

  <script src="https://unpkg.com/aos@next/dist/aos.js"></script>

  <script>
    AOS.init();
  </script>
*/ 
//clean aos classes on save
$(window).on("vvveb.getHtml.before", function(event, doc) {
	$("[data-aos]", doc).removeClass("aos-init aos-animate");
});

$(window).on("vvveb.getHtml.after", function(event, doc) {
	$("[data-aos]", doc).addClass("aos-init aos-animate");
});

//ignore aos classes for styles
Vvveb.Builder.ignoreClasses = Vvveb.Builder.ignoreClasses.concat(["aos-init", "aos-animate"]);

var aosAnimations = [
		{
			value: "",
			text: "[none]"
		}, {
		    //Fade animations
			optgroup: "Fade animations"
		}, {
			value: "fade",
			text: "Fade"
		}, {
			value: "fade-up",
			text: "Fade Up"
		}, {
			value: "fade-down",
			text: "Fade down"
		}, {
			value: "fade-left",
			text: "Fade left"
		}, {
			value: "fade-right",
			text: "Fade right"
		}, {
			value: "fade-up-right",
			text: "Fade up right"
		}, {
			value: "fade-up-left",
			text: "Fade up left"
		}, {
			value: "fade-down-right",
			text: "Fade down right"
		}, {
			value: "fade-down-left",
			text: "Fade down left"
		}, {
			//Flip animations
			optgroup: "Flip animations"
		}, {
			value: "flip-up",
			text: "Flip Up"
		}, {
			value: "flip-down",
			text: "Flip Down"
		}, {
			value: "flip-left",
			text: "Flip left"
		}, {
			value: "flip-right",
			text: "Flip right"
		}, {
			//Slide animations
			optgroup: "Slide animations"
		}, {
			value: "slide-up",
			text: "Slide up"
		}, {
			value: "slide-down",
			text: "Slide down"
		}, {
			value: "slide-left",
			text: "Slide left"
		}, {
			value: "slide-right",
			text: "Slide right"
		}, {
			//Zoom animations
			optgroup: "Zoom animations"
		}, {
			value: "zoom-in",
			text: "Zoom in"
		}, {
			value: "zoom-in-up",
			text: "Zoom in up"
		}, {
			value: "zoom-in-down",
			text: "Zoom in down"
		}, {
			value: "zoom-in-left",
			text: "Zoom in left"
		}, {
			value: "zoom-in-right",
			text: "Zoom in right"
		}, {
			value: "zoom-out",
			text: "Zoom out"
		}, {
			value: "zoom-out-up",
			text: "Zoom out up"
		}, {
			value: "zoom-out-down",
			text: "Zoom out down"
		}, {
			value: "zoom-out-left",
			text: "Zoom out left"
		}, {
			value: "zoom-out-right",
			text: "Zoom out right"
		}			
];
/*
var aosEasing = [
		{
			value: "",
			text: "[default]"
		}, {
			value: "linear",
			text: "linear"
		}, {
			value: "ease",
			text: "ease"
		}, {
			value: "ease-out",
			text: "ease-out"
		}, {
			value: "ease-in-out",
			text: "ease-in-out"
		}, {
			value: "ease-in-back",
			text: "ease-in-back"
		}, {
			value: "ease-out-back",
			text: "ease-out-back"
		}, {
			value: "ease-in-out-back",
			text: "ease-in-out-back"
		}, {
			value: "ease-in-sine",
			text: "ease-in-sine"
		}, {
			value: "ease-out-sine",
			text: "ease-out-sine"
		}, {
			value: "ease-in-quad",
			text: "ease-in-quad"
		}, {
			value: "ease-out-quad",
			text: "ease-out-quad"
		}, {
			value: "ease-in-out-quad",
			text: "ease-in-out-quad"
		}, {
			value: "ease-in-cubic",
			text: "ease-in-cubic"
		}, {
			value: "ease-out-cubic",
			text: "ease-out-cubic"
		}, {
			value: "ease-in-out-cubic",
			text: "ease-in-out-cubic"
		}, {
			value: "ease-in-quart",
			text: "ease-in-quart"
		}, {
			value: "ease-out-quart",
			text: "ease-out-quart"
		}, {
			value: "ease-in-out-quart",
			text: "ease-in-out-quart"
		}
];	
*/
var ComponentBaseAnimateScroll = {
	 properties: [{
		key: "animate_header",
		inputtype: SectionInput,
		name:false,
		sort: base_sort++,
		section: advanced_section,
		data: {header:"Animate on scroll"},
	}, {
        name: "Animation type",
        key: "type",
		htmlAttr: "data-aos",
        sort: base_sort++,
		section: advanced_section,
		inputtype: SelectInput,
		data: {
			options: aosAnimations,
		},
		onChange: function(node, value) {
			node.removeClass("aos-init aos-animate");
			if (value == "") {
				node.removeAttr("data-aos data-aos-duration data-aos-delay");
			} else {
				delay(() => node.addClass("aos-init aos-animate"), 
					node.data("aos-duration") ? node.data("aos-duration") : 1000);
			}
			return node;
		}
/*	}, {
        name: "Animation easing",
        key: "easing",
		htmlAttr: "data-aos-easing",
        sort: base_sort++,
		section: advanced_section,
		inputtype: SelectInput,
		data: {
			options: aosEasing,
		}*/
	}, {
        name: "Duration",
        key: "duration",
		htmlAttr: "data-aos-duration",
        sort: base_sort++,
		section: advanced_section,
		inputtype: RangeInput,
		data:{
			max: 10000, 
			min:0,
			step:100
	   },
	   defaultValue: 1000
	}, {
        name: "Delay",
        key: "delay",
		htmlAttr: "data-aos-delay",
        sort: base_sort++,
		section: advanced_section,
		inputtype: RangeInput,
		data:{
			max: 10000, 
			min:0,
			step:100
		},
		defaultValue: "0"
	}, {
        name: "",
        key: "delay",
		htmlAttr: "data-aos-delay",
        sort: base_sort++,
		section: advanced_section,
		inputtype: ButtonInput,
		data: {text:"Play animation", icon:"la-play"},		
		onChange: function(node, value) {
			node.removeClass("aos-init aos-animate");
			delay(() => node.addClass("aos-init aos-animate"), 
				node.data("aos-duration") ? node.data("aos-duration") : 1000);
			return node;
		}
	}]
};

Vvveb.Components.extend("_base", "_base", ComponentBaseAnimateScroll);
