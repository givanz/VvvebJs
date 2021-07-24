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

var ckeditorOptions = {
	extraPlugins:"sharedspace",
	sharedSpaces:{
		top: "#wysiwyg-editor",
	}
};

Vvveb.WysiwygEditor = {
	
	isActive: false,
	oldValue: '',
	doc:false,
	editor:false,
	toolbar:false,
	
	init: function(doc) {
		this.doc = doc;
		//use default editor toolbar for ckeditor
		this.toolbar = $('#wysiwyg-editor');
		this.toolbar.removeClass("default-editor").addClass("ckeditor");
		this.toolbar.html('');
	},
	
	edit: function(element) {
		this.element = element;
		this.isActive = true;
		this.oldValue = element.html();
		Vvveb.Builder.selectPadding = 10;
		//Vvveb.Builder.highlightEnabled = false;
		element.attr({'contenteditable':true, 'spellcheckker':false});
		
		CKEDITOR.disableAutoInline = true;
		ckeditorOptions.sharedSpaces.top = this.toolbar.get(0);
		this.editor = CKEDITOR.inline( element.get(0), ckeditorOptions );

		this.toolbar.show();
	},

	destroy: function(element) {
		//this.editor.destroy();
		element.removeAttr('contenteditable spellcheckker');
		//Vvveb.Builder.highlightEnabled = true;
		this.toolbar.hide();
		
		node = this.element.get(0);
		Vvveb.Undo.addMutation({type:'characterData', 
								target: node, 
								oldValue: this.oldValue, 
								newValue: node.innerHTML});
	}
}
