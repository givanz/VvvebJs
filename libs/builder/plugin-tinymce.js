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

//doesn't support elements from iframe https://github.com/tinymce/tinymce/issues/3117
//use ckeditor instead that supports inline editing for iframe elements

var tinyMceOptions = {
  //selector: 'textarea',
  target:false,
  inline:false,//see comment above
  toolbar_mode: 'floating',
  toolbar_persist: true,
  plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help quickbars emoticons',
  //imagetools_cors_hosts: ['picsum.photos'],
  menubar: false,//'file edit view insert format tools table help',
  toolbar: [
		'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect',
		'alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist',
		'forecolor backcolor removeformat | insertfile image media link anchor codesample  | fullscreen  preview save print| ltr rtl | code template |  charmap emoticons'],
  toolbar_sticky: true,
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m',
  image_advtab: true,
  /*
  link_list: [
	{ title: 'My page 1', value: 'https://www.tiny.cloud' },
	{ title: 'My page 2', value: 'http://www.moxiecode.com' }
  ],
  image_list: [
	{ title: 'My page 1', value: 'https://www.tiny.cloud' },
	{ title: 'My page 2', value: 'http://www.moxiecode.com' }
  ],
  image_class_list: [
	{ title: 'None', value: '' },
	{ title: 'Some class', value: 'class-name' }
  ],
  */
  importcss_append: true,
  file_picker_callback: function (callback, value, meta) {
		if (!Vvveb.MediaModal) {
			Vvveb.MediaModal = new MediaModal(true);
			Vvveb.MediaModal.mediaPath = mediaPath;
		}
		Vvveb.MediaModal.open(null, callback);
	return;
	/* Provide file and text for the link dialog */
	if (meta.filetype === 'file') {
	  callback('https://www.google.com/logos/google.jpg', { text: 'My text' });
	}

	/* Provide image and alt text for the image dialog */
	if (meta.filetype === 'image') {
	  callback('https://www.google.com/logos/google.jpg', { alt: 'My alt text' });
	}

	/* Provide alternative source and posted for the media dialog */
	if (meta.filetype === 'media') {
	  callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.google.com/logos/google.jpg' });
	}
  },
  /*
  templates: [
	{ title: 'New Table', description: 'creates a new table', content: '<div class="mceTmpl"><table width="98%%"  border="0" cellspacing="0" cellpadding="0"><tr><th scope="col"> </th><th scope="col"> </th></tr><tr><td> </td><td> </td></tr></table></div>' },
	{ title: 'Starting my story', description: 'A cure for writers block', content: 'Once upon a time...' },
	{ title: 'New list with dates', description: 'New List with dates', content: '<div class="mceTmpl"><span class="cdate">cdate</span><br /><span class="mdate">mdate</span><h2>My List</h2><ul><li></li><li></li></ul></div>' }
  ],
  template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
  template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
  */
  height: 600,
  image_caption: true,
  quickbars_insert_toolbar: 'quickmedia quicklink quicktable',
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  //quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
  noneditable_noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link image imagetools table',
  skin: 'oxide',
  content_css: '',
  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
  images_upload_url: 'postAcceptor.php',

  /* we override default upload handler to simulate successful upload*/
  images_upload_handler: function (blobInfo, success, failure) {
    setTimeout(function () {
      /* no matter what you upload, we will turn it into TinyMCE logo :)*/
      success('http://moxiecode.cachefly.net/tinymce/v9/images/logo.png');
    }, 2000);
  },


	branding:false,
};

Vvveb.WysiwygEditor = {
	
	isActive: false,
	oldValue: '',
	doc:false,
	editor:false,
	
	init: function(doc) {
		this.doc = doc;
	},
	
	edit: function(element) {
		this.element = element;
		this.isActive = true;
		this.oldValue = element.html();
		Vvveb.Builder.selectPadding = 0;
		Vvveb.Builder.highlightEnabled = false;

		tinyMceOptions.target = element.get(0);
		this.editor = tinymce.init(tinyMceOptions);
	},

	destroy: function(element) {
		tinymce.activeEditor.destroy();
		Vvveb.Builder.highlightEnabled = true;
		
		node = this.element.get(0);
		Vvveb.Undo.addMutation({type:'characterData', 
								target: node, 
								oldValue: this.oldValue, 
								newValue: node.innerHTML});
	}
}
