Vvveb.CodeEditor = {
	
	isActive: false,
	oldValue: '',
	doc:false,
	codemirror:false,
	
	init: function(doc) {

		if (this.codemirror == false)		
		{
			this.codemirror = CodeMirror.fromTextArea(document.querySelector("#vvveb-code-editor textarea"), {
				mode: 'text/html',
				lineNumbers: true,
				autofocus: true,
				lineWrapping: true,
				//viewportMargin:Infinity,
				theme: 'material'
			});
			
			this.isActive = true;
			this.codemirror.getDoc().on("change", function (e, v) { 
				if (v.origin != "setValue")
				delay(() => Vvveb.Builder.setHtml(e.getValue()), 1000);
			});
		}
		
		
		//load code on document changes
		Vvveb.Builder.frameBody.on("vvveb.undo.add vvveb.undo.restore", function (e) { Vvveb.CodeEditor.setValue(e);});
		//load code when a new url is loaded
		Vvveb.Builder.documentFrame.on("load", function (e) { Vvveb.CodeEditor.setValue();});

		this.isActive = true;
		this.setValue();

		return this.codemirror;
	},

	setValue: function(value) {
		if (this.isActive == true)
		{
			var scrollInfo = this.codemirror.getScrollInfo();
			this.codemirror.setValue(Vvveb.Builder.getHtml());
			this.codemirror.scrollTo(scrollInfo.left, scrollInfo.top);
			let self = this;
			setTimeout(function() {
				self.codemirror.refresh();
			}, 300);
		}
	},

	destroy: function(element) {
		/*
		//save memory by destroying but lose scroll on editor toggle
		this.codemirror.toTextArea();
		this.codemirror = false;
		*/ 
		this.isActive = false;
	},

	toggle: function() {
		if (this.isActive != true)
		{
			this.isActive = true;
			return this.init();
		}
		this.isActive = false;
		this.destroy();
	}
}


// override modal code editor to use code mirror
Vvveb.ModalCodeEditor.init = function (modal = false, editor = false) {
	this.modal  = $('#codeEditorModal');
	this.editor = CodeMirror.fromTextArea(document.querySelector("#codeEditorModal textarea"), {
		mode: 'text/html',
		lineNumbers: true,
		autofocus: true,
		lineWrapping: true,
		//viewportMargin:Infinity,
		theme: 'material'
	});
	
	let self = this;
	$('.save-btn', this.modal).on("click",  function(event) {
		$(window).triggerHandler("vvveb.ModalCodeEditor.save", self.getValue());
		self.hide();
	});
}

Vvveb.ModalCodeEditor.setValue = function (value) {
	var scrollInfo = this.editor.getScrollInfo();
	this.editor.setValue(value);
	this.editor.scrollTo(scrollInfo.left, scrollInfo.top);
	let self = this;
	setTimeout(function() {
		self.editor.refresh();
	}, 300);
};

Vvveb.ModalCodeEditor.getValue = function (value) {
	return this.editor.getValue();
};
