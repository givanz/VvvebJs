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
    target                        : false,
    inline                        : false,//see comment above
    toolbar_persist               : true,
    plugins                       : 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help quickbars emoticons',
    menubar                       : false,
    toolbar                       : [
        'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect',
        'alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist',
        'forecolor backcolor removeformat | insertfile image media link anchor codesample  | fullscreen  preview save print| ltr rtl | code |  charmap emoticons'],
    toolbar_sticky                : true,
    autosave_ask_before_unload    : true,
    autosave_interval             : '30s',
    autosave_prefix               : '{path}{query}-{id}-',
    autosave_restore_when_empty   : false,
    autosave_retention            : '2m',
    importcss_append              : true,
    file_picker_callback          : function(callback, value, meta) {
        if (!Vvveb.MediaModal) {
            Vvveb.MediaModal = new MediaModal(true);
            Vvveb.MediaModal.mediaPath = mediaPath;
        }
        Vvveb.MediaModal.open(null, callback);
    },
    height                        : 600,
    quickbars_insert_toolbar      : 'quickmedia quicklink quicktable',
    quickbars_selection_toolbar   : 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
    //quickbars_image_toolbar: 'alignleft aligncenter alignright | rotateleft rotateright | imageoptions',
    noneditable_noneditable_class : 'mceNonEditable',
    toolbar_mode                  : 'sliding',
    contextmenu                   : 'link image imagetools table',
    skin                          : 'oxide',
    content_css                   : '',
    content_style                 : 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    images_upload_url             : 'postAcceptor.php',

    image_advtab          : true,
    image_caption         : true,
    paste_data_images     : true,
    image_uploadtab       : true,
    images_file_types     : 'jpeg,jpg,png,gif',
    images_upload_handler : function(blobInfo, success, failure) {
        var base64str = 'data:' + blobInfo.blob().type + ';base64,' + blobInfo.base64();
        success(base64str);
    },
    file_picker_callback  : function(callback, value, meta) {
        if (!Vvveb.MediaModal) {
            Vvveb.MediaModal = new MediaModal(true);
            Vvveb.MediaModal.mediaPath = mediaPath;
        }
        Vvveb.MediaModal.open(null, callback);
    },

    branding : false,
};

Vvveb.WysiwygEditor = {

    isActive : false,
    oldValue : '',
    doc      : false,
    editor   : false,

    init : function(doc) {
        Vvveb.WysiwygEditor.doc = doc;
    },

    edit : function(element) {
        Vvveb.WysiwygEditor.element = element;
        Vvveb.WysiwygEditor.modalHtml = `
            <div class="modal fade modal-full" id="TinyMceModal" tabindex="-1" role="dialog" 
                 aria-labelledby="TinyMceModalLabel"
                 aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document"
                     style="max-height: 586px">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="TinyMceModalLabel">Editor</h5>
                            <button type="button" class="btn btn-sm" id="btn-tiny-iconclose" aria-label="Close">
                                <span aria-hidden="true"><i class="la la-times la-lg"></i></span>
                            </button>
                        </div>
                        <div class="modal-body" style="padding: 0">
                            <div id="TinyMceModal-editor">${element.outerHTML}</div>
                        </div>
                        <div class="modal-footer">
                            <div class="align-right">
                                <button type="button" class="btn btn-secondary" id="btn-tiny-buttonclose">Close</button>
                                <button type="button" class="btn btn-primary save-btn">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        document.body.append(generateElements(Vvveb.WysiwygEditor.modalHtml)[0]);
        let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('TinyMceModal'));
        modal.show();

        document.querySelector("#TinyMceModal .save-btn").addEventListener("click", Vvveb.WysiwygEditor.save);
        document.querySelector("#btn-tiny-iconclose").addEventListener("click", Vvveb.WysiwygEditor.destroy);
        document.querySelector("#btn-tiny-buttonclose").addEventListener("click", Vvveb.WysiwygEditor.destroy);

        Vvveb.WysiwygEditor.isActive = true;
        Vvveb.WysiwygEditor.oldValue = element.innerHTML;
        Vvveb.Builder.selectPadding = 0;
        Vvveb.Builder.highlightEnabled = false;

        tinyMceOptions.target = document.getElementById('TinyMceModal-editor');
        Vvveb.WysiwygEditor.editor = tinymce.init(tinyMceOptions);

        setTimeout(function() {
            document.getElementById("select-box").style.display = "none";
        }, 500);
    },

    save : function() {
        console.log(Vvveb.WysiwygEditor.element);
        Vvveb.WysiwygEditor.element.outerHTML = tinymce.activeEditor.getContent();

        Vvveb.Undo.addMutation({
            type     : 'characterData',
            target   : Vvveb.WysiwygEditor.element,
            oldValue : Vvveb.WysiwygEditor.oldValue,
            newValue : Vvveb.WysiwygEditor.element.innerHTML
        });

        Vvveb.WysiwygEditor.destroy();
    },

    destroy : function(element) {

        if (tinymce.activeEditor) {
            tinymce.activeEditor.destroy();
        }

        let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('TinyMceModal'));
        modal.hide();

        var TinyMceModal = document.getElementById('TinyMceModal');
        TinyMceModal.parentElement.removeChild(TinyMceModal);
        Vvveb.WysiwygEditor.isActive = false;

        Vvveb.Builder.highlightEnabled = false;
        // enable double click editor
        Vvveb.Builder.texteditEl = null;
    }
};

