Vvveb.Components.extend("_base", "_base", {
	 properties: [
	 {
        name: "Font family",
        key: "font-family",
		htmlAttr: "style",
        sort: base_sort++,
        col:6,
		inline:true,
        inputtype: SelectInput,
        data: {
			options: [{
				value: "",
				text: "extended"
			}, {
				value: "Ggoogle ",
				text: "google"
			}]
		}
	}]
});	
