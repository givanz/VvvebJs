Vvveb.CodeEditor = {
	
	isActive: false,
	oldValue: '',
	doc:false,
	codemirror:false,
	
	init: function(doc) {

		if (this.codemirror == false) {
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
		Vvveb.Builder.frameBody.addEventListener("vvveb.undo.add", () => Vvveb.CodeEditor.setValue());
		Vvveb.Builder.frameBody.addEventListener("vvveb.undo.restore", () => Vvveb.CodeEditor.setValue());
		
		//load code when a new url is loaded
		Vvveb.Builder.documentFrame.addEventListener("load", () => Vvveb.CodeEditor.setValue());

		this.isActive = true;
		this.setValue();

		return this.codemirror;
	},

	setValue: function(value) {
		if (this.isActive == true) {
			let scrollInfo = this.codemirror.getScrollInfo();
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
		if (this.isActive != true) {
			this.isActive = true;
			return this.init();
		}
		this.isActive = false;
		this.destroy();
	}
}


// override modal code editor to use code mirror
Vvveb.ModalCodeEditor.init = function (modal = false, editor = false) {
	this.modal  = document.getElementById("codeEditorModal");
	this.editor = CodeMirror.fromTextArea(document.querySelector("#codeEditorModal textarea"), {
		mode: 'text/html',
		lineNumbers: true,
		autofocus: true,
		lineWrapping: true,
		//viewportMargin:Infinity,
		theme: 'material'
	});
	
	let self = this;
	this.modal.querySelector('.save-btn').addEventListener("click",  function(event) {
		window.dispatchEvent(new CustomEvent("vvveb.ModalCodeEditor.save", {detail: self.getValue()}));
		self.hide();
		return false;
	});
}

Vvveb.ModalCodeEditor.setValue = function (value) {
	let scrollInfo = this.editor.getScrollInfo();
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


Vvveb.CssEditor = {
	
	oldValue: '',
	doc:false,
	textarea:false,
	editor:false,
	
	init: function(doc) {
		this.textarea = document.getElementById("css-editor");
		this.editor = CodeMirror.fromTextArea(this.textarea, {
			mode: 'text/css',
			lineNumbers: true,
			autofocus: true,
			lineWrapping: true,
			//viewportMargin:Infinity,
			theme: 'material'
		});		
		
		let self = this;
		
		document.querySelectorAll('[href="#css-tab"],[href="#configuration"]').forEach( t => t.addEventListener("click", e => {
			self.setValue(Vvveb.StyleManager.getCss());
		}));
		
		this.editor.getDoc().on("change", function (e, v) { 
			if (v.origin != "setValue")
			delay(() => Vvveb.StyleManager.setCss(e.getValue()), 1000);
		});
	},

	getValue: function() {
		return this.editor.getValue();
	},
	
	setValue: function(value) {
		let scrollInfo = this.editor.getScrollInfo();
		this.editor.setValue(value);
		this.editor.scrollTo(scrollInfo.left, scrollInfo.top);
		let self = this;
		setTimeout(function() {
			self.editor.refresh();
		}, 300);
		//Vvveb.StyleManager.setCss(value);
	},

	destroy: function(element) {
	}
}
