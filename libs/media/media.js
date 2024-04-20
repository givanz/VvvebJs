function ucFirst(str) {
  if (!str) return str;

  return str[0].toUpperCase() + str.slice(1);
}

let mediaScanUrl = 'scan.php';

class MediaModal {
	constructor (modal = true)
	{
		this.isInit = false;
		this.isModal = modal;
		
		this.modalHtml = 
		`
		<div class="modal fade modal-full" id="MediaModal" tabindex="-1" role="dialog" aria-labelledby="MediaModalLabel" aria-hidden="true">
		  <div class="modal-dialog modal-xl modal-dialog-scrollable" role="document">
			<div class="modal-content">
			  <div class="modal-header">
				<h5 class="modal-title" id="MediaModalLabel">Media</h5>
                
				<button type="button" class="btn btn-sm" data-bs-dismiss="modal" aria-label="Close">
				  <span aria-hidden="true"><i class="la la-times la-lg"></i></span>
				</button>
			  </div>
			  <div class="modal-body">
	
                      <div class="filemanager">

						<div class="top-right d-flex justify-content-between">
                             
                            <div class="align-left">          
								<div class="breadcrumbs"></div>
							</div>
                                       
                                   
                            <div class="align-right">                   
								<div class="search">
									<input type="search" id="media-search-input" placeholder="Find a file.." />
								</div>
								
								<button class="btn btn-outline-secondary btn-sm btn-icon me-5 float-end border-secondary-subtle" 
								   data-bs-toggle="collapse" 
								   data-bs-target=".upload-collapse" 
								   aria-expanded="false" 
								   >
								   <i class="la la-cloud-upload-alt la-lg"></i>
									Upload new file
								</button>
							</div>
							
						</div>

						<div class="top-panel">

							<div class="upload-collapse collapse">

								<button id="upload-close" type="button" class="btn btn-sm btn-light" aria-label="Close" data-bs-toggle="collapse" data-bs-target=".upload-collapse" aria-expanded="true">
								   <span aria-hidden="true"><i class="la la-times la-lg"></i></span>
								</button>
								
							   <h3>Drop or choose files to upload</h3>
							   
							   <input type="file" multiple class=""> 
								
								<div class="status"></div>
							</div>


						</div>
						
						<div class="display-panel">
							
							<ul class="data" id="media-files"></ul>
						
							<div class="nothingfound">
								<div class="nofiles"></div>
								<span>No files here.</span>
							</div>
						</div>
					</div>

			  </div>
			  <div class="modal-footer justify-content-between">
			  
				<div class="align-left">
			
				</div>
			  
				<div class="align-right">
					<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary save-btn">Add selected</button>
				</div>
			  </div>
			</div>
		  </div>
		</div>`;
		
		this.response = [],
		this.currentPath = '';
		this.breadcrumbsUrls = [];
		this.filemanager = null;
		this.breadcrumbs = null;
		this.fileList = null;
		this.mediaPath = "/public/media/";
		this.type = "single";
	}
	
	addModalHtml() {
		if (this.isModal) document.body.append(generateElements(this.modalHtml)[0]);
		document.querySelector("#MediaModal .save-btn").addEventListener("click", () => this.save());
	}
	
	showUploadLoading() {
		document.querySelector("#MediaModal .upload-collapse .status").innerHTML = `
		<div class="spinner-border" style="width: 5rem; height: 5rem;margin: 5rem auto; display:block" role="status">
		  <span class="visually-hidden">Loading...</span>
		</div>`;
	}

	hideUploadLoading() {
		document.querySelector("#MediaModal .upload-collapse .status").innerHTML = '';
	}
	
	save() {
		
		let file = document.querySelector("#MediaModal .files input:checked").value ?? false;
		let src = file;
		
		if (!file) return;

		if (file.indexOf("//") == -1) {
			src = this.mediaPath + file;
		}

		if (this.targetThumb) {
			document.querySelector(this.targetThumb).setAttribute("src", src);
		}
		
		if (this.callback) {
			this.callback(src);
		}

		if (this.targetInput) {
			let input = document.querySelector(this.targetInput);
			input.value = file;
			const e = new Event("change",{bubbles: true});
			input.dispatchEvent(e);
			//$(this.targetInput).val(file).trigger("change");
		}

		let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('MediaModal'));
		if (this.isModal) modal.hide();
	}
	
	init() {
		if (!this.isInit) {
			if (this.isModal) this.addModalHtml();
			let self = this;

			this.initGallery();
			this.isInit = true;

			document.querySelector(".filemanager input[type=file]").addEventListener("change", this.onUpload);
			document.querySelector(".filemanager").addEventListener("click", function (e) {
				let element = e.target.closest(".btn-delete");
				if (element) {
					 self.deleteFile(element);
				} else {
					element = e.target.closest(".btn-rename");
					if (element) {
						 self.renameFile(element);
					}
				}
			});

			const event = new CustomEvent( "mediaModal:init", {detail: { type:this.type, targetInput:this.targetInput, targetThumb:this.targetThumb, callback:this.callback} });
			window.dispatchEvent(event);			
		}
	}
	
	open(element, callback) {
		if (element instanceof Element) {
			this.targetInput = element.dataset.targetInput;
			this.targetThumb = element.dataset.targetThumb;
			if (element.dataset.type) {
				this.type = element.dataset.type;
			}
		} else if (element) {
			this.targetInput = element.targetInput;
			this.targetThumb = element.targetThumb;
			if (element.type) {
				this.type = element.type;
			}
		}
		
		this.callback = callback;
		this.init();

		let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('MediaModal'));
		if (this.isModal) modal.show();
	}


	initGallery() {
		this.filemanager = document.querySelector('.filemanager'),
		this.breadcrumbs = document.querySelector('.breadcrumbs'),
		this.fileList = this.filemanager.querySelector('.data');
		let _this = this;

		// Start by fetching the file data from scan.php with an AJAX request
		fetch(mediaScanUrl)
		.then((response) => {
			if (!response.ok) { throw new Error(response) }
			return response.json();
		})
		.then((data) => {
			 _this.response = [data],
			 _this.currentPath = '',
			 _this.breadcrumbsUrls = [];

			let folders = [],
				files = [];
				
			window.dispatchEvent(new HashChangeEvent("hashchange"));
		})
		.catch(error => {
			console.log(error.statusText);
			displayToast("bg-danger", "Error", "Error loading media!");
		});

		// This event listener monitors changes on the URL. We use it to
		// capture back/forward navigation in the browser.

		window.addEventListener('hashchange', function(){

			_this.goto(window.location.hash);

			// We are triggering the event. This will execute 
			// this function on page load, so that we show the correct folder:

		});


		// Hiding and showing the search box
		let search = this.filemanager.querySelector('input[type=search]');

		this.filemanager.querySelector('.search').addEventListener("click", function(){
			let _search = this;

			_search.querySelectorAll('span').forEach(function (el,i) { el.style.display = "none";});
			search.style.display = "";
			search.focus();

		});


		// Listening for keyboard input on the search field.
		// We are using the "input" event which detects cut and paste
		// in addition to keyboard input.

		search.addEventListener('input', function(e) {

			let folders = [];
			let files = [];

			let value = this.value.trim();

			if(value.length) {

				_this.filemanager.classList.add('searching');

				// Update the hash on every key stroke
				window.location.hash = 'search=' + value.trim();

			}

			else {

				_this.filemanager.classList.remove('searching');
				window.location.hash = encodeURIComponent(_this.currentPath);

			}

		});
		
		search.addEventListener('keyup', function(e) {

			// Clicking 'ESC' button triggers focusout and cancels the search

			let search = this;

			if(e.keyCode == 27) {

				search.trigger('focusout');

			}

		});
		
		search.addEventListener("focusout", function(e) {

			// Cancel the search

			let search = this;

			if(!search.value.trim().length) {

				window.location.hash = encodeURIComponent(_this.currentPath);
				search.style.display = 'none';
				search.parentNode.querySelectorAll('span').style.display = '';

			}

		});

		// Clicking on folders

		this.fileList.addEventListener('click', function(e) {
			let el = event.target.closest('li.folders');
			if (el) {
				e.preventDefault();

				let nextDir = el.querySelector('a').getAttribute('href');

				if(_this.filemanager.classList.contains('searching')) {

					// Building the this.breadcrumbs

					_this.breadcrumbsUrls = _this.generateBreadcrumbs(nextDir);

					_this.filemanager.classList.remove('searching');
					let search = _this.filemanager.querySelector('input[type=search]');
					search.val('')
					search.style.display = 'none';
					_this.filemanager.querySelectorAll('span').forEach(e => e.style.display = '');
				}
				else {
					_this.breadcrumbsUrls.push(nextDir);
				}

				window.location.hash = encodeURIComponent(nextDir);
				_this.currentPath = nextDir;
			}
		});


		// Clicking on this.breadcrumbs

		this.breadcrumbs.addEventListener('click', function(e){
			let el = event.target.closest('a');
			if (el) {
				e.preventDefault();

				let index = [...el.parentNode.children].indexOf(el),
					nextDir = _this.breadcrumbsUrls[index];
					nextDir = el.getAttribute("href");

				_this.breadcrumbsUrls.length = Number(index);

				window.location.hash = encodeURIComponent(nextDir);
			}
		});
	}


		// Navigates to the given hash (path)

		goto(hash) {

			hash = decodeURIComponent(hash).slice(1).split('=');
			let _this = this;

			if (hash.length) {
				let rendered = '';

				// if hash has search in it

				if (hash[0] === 'search') {

					this.filemanager.classList.add('searching');
					rendered = _this.searchData(_this.response, hash[1].toLowerCase());

					if (rendered.length) {
						this.currentPath = hash[0];
						this.render(rendered);
					}
					else {
						this.render(rendered);
					}

				}

				// if hash is some path

				else if (hash[0].trim().length) {

					rendered = this.searchByPath(hash[0]);

					if (rendered.length) {

						this.currentPath = hash[0];
						this.breadcrumbsUrls = this.generateBreadcrumbs(hash[0]);
						this.render(rendered);

					}
					else {
						this.currentPath = hash[0];
						this.breadcrumbsUrls = this.generateBreadcrumbs(hash[0]);
						this.render(rendered);
					}

				}

				// if there is no hash

				else {
					this.currentPath = this.response[0].path;
					this.breadcrumbsUrls.push(this.response[0].path);
					this.render(this.searchByPath(this.response[0].path));
				}
			}
		}

		// Splits a file path and turns it into clickable breadcrumbs
_
		generateBreadcrumbs(nextDir){
			let path = nextDir.split('/').slice(0);
			for(let i=1;i<path.length;i++){
				path[i] = path[i-1]+ '/' +path[i];
			}
			return path;
		}


		// Locates a file by path

		searchByPath(dir) {
			let path = dir.split('/'),
				demo = this.response,
				flag = 0;

			for(let i=0;i<path.length;i++){
				for(let j=0;j<demo.length;j++){
					if(demo[j].name === path[i]){
						flag = 1;
						demo = demo[j].items;
						break;
					}
				}
			}

			//demo = flag ? demo : [];
			return demo;
		}


		// Recursively search through the file tree

		searchData(data, searchTerms) {

			let _this = this;
			let folders = [];
			let files = [];

			let _searchData = function (data, searchTerms) { 
			data.forEach(function(d){
				if(d.type === 'folder') {

						_searchData(d.items,searchTerms);

						if(d.name.toLowerCase().indexOf(searchTerms) >= 0) {
						folders.push(d);
					}
				}
				else if(d.type === 'file') {
						if(d.name.toLowerCase().indexOf(searchTerms) >= 0) {
						files.push(d);
					}
				}
			});
			};
			
			_searchData(data, searchTerms);
			
			return {folders: folders, files: files};
		}


		onUpload(event) {
			let file;
			if (this.files && this.files[0]) {
				Vvveb.MediaModal.showUploadLoading();
				let reader = new FileReader();
				reader.onload = imageIsLoaded;
				reader.readAsDataURL(this.files[0]);
				//reader.readAsBinaryString(this.files[0]);
				file = this.files[0];
			}

			function imageIsLoaded(e) {
					
					let image = e.target.result;
					
					let formData = new FormData();
					formData.append("file", file);
					formData.append("mediaPath", Vvveb.MediaModal.mediaPath + Vvveb.MediaModal.currentPath);
					formData.append("onlyFilename", true);
		

					fetch('upload.php', {method: "POST",  body: formData})
					.then((response) => {
						console.log(response);
						if (!response.ok) { throw new Error(response) }
						return response.text()
					})
					.then((data) => {
						let fileElement = Vvveb.MediaModal.addFile({
							name:data,
							type:"file",
							path: Vvveb.MediaModal.currentPath + "/" + data,
							size:1
						},true);
						
						fileElement.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
						
						Vvveb.MediaModal.hideUploadLoading();				
					})
					.catch(error => {
						console.log(error);
						Vvveb.MediaModal.hideUploadLoading();						
						displayToast("bg-danger", "Error", "Error uploading!");
					});		
			}
		}	
	
		deleteFile(el) {
			let parent = el.closest("li");
			let file = parent.querySelector('input[type ="hidden"]').value;
			if (confirm(`Are you sure you want to delete "${file}"template?`)) {
				
			fetch(deleteUrl, {method: "POST",  body: {file}})
				.then((response) => {
					console.log(response);
					if (!response.ok) { throw new Error(response) }
					return response.text()
				})
				.then((data) => {
					let bg = "bg-success";
					if (data.success) {		
					} else {
						//bg = "bg-danger";
					}
					
					document.querySelectorAll("#top-toast .toast-body").html(data)
					document.querySelectorAll("#top-toast .toast-header").classList.remove(["bg-danger", "bg-success"]).classList.add(bg);
					document.querySelectorAll("#top-toast .toast").classList.add("show");
					delay(() => document.querySelectorAll("#top-toast .toast").classList.remove("show"), 5000);		
				
					parent.remove();	
				})
				.catch(error => {
					console.log(error);
					displayToast("bg-danger", "Error", "Error deleting file!");
				});	
			}
		}

		renameFile(el) {
			let parent = el.closest("li");
			let file = parent.querySelector('input[type ="hidden"]').value;
			let newfile = prompt(`Enter new file name for "${file}"`, file);

			if (newfile) {
				fetch(renameUrl, {method: "POST",  body: {file, newfile}})
				.then((response) => {
					console.log(response);
					if (!response.ok) { throw new Error(response) }
					return response.text()
				})
				.then((data) => {
					let bg = "bg-success";
					if (data.success) {		
					} else {
						//bg = "bg-danger";
					}
					
					document.querySelectorAll("#top-toast .toast-body").html(data)
					document.querySelectorAll("#top-toast .toast-header").classList.remove(["bg-danger", "bg-success"]).classList.add(bg);
					document.querySelectorAll("#top-toast .toast").classList.add("show");
					delay(() => document.querySelectorAll("#top-toast .toast").classList.remove("show"), 5000);
				})
				.catch(error => {
					console.log(error);
					displayToast("bg-danger", "Error", "Error renaming file!");
				});	
			}
		}
		
		addFile(f, selected) {
				let _this= this;
				let isImage = false;
				let actions = '';
				
				let fileSize = _this.bytesToSize(f.size),
						name = _this.escapeHTML(f.name),
						fileType = name.split('.'),
						icon = '<span class="icon file"></span>';

					fileType = fileType[fileType.length-1];
					
					if (fileType == "jpg" || fileType == "jpeg" || fileType == "png" || fileType == "gif" || fileType == "svg" || fileType == "webp") {
						
						//icon = '<div class="image" style="background-image: url(' + _this.mediaPath + f.path + ');"></div>';
						icon = '<img class="image" loading="lazy" src="' + _this.mediaPath + f.path + '">';
						isImage = true;
					} else {
						icon = '<span class="icon file f-'+fileType+'">.'+fileType+'</span>';
					}
					//icon = '<span class="icon file f-'+fileType+'">.'+fileType+'</span>';

				
				
				actions += '<a href="javascript:void(0);" title="Rename" class="btn btn-outline-primary btn-sm border-0 btn-rename"><i class="la la-edit"></i></a> <a href="javascript:void(0);" title="Delete" class="btn btn-outline-danger btn-sm border-0 btn-delete"><i class="la la-trash"></i></a>';

				const event = new CustomEvent("mediaModal:fileActions", {detail: { file: _this.mediaPath + f.path, name, fileType, fileSize, isImage, fileType, actions} });
				window.dispatchEvent(event);			

				if (isImage) actions += '<a href="javascript:void(0);" class="preview-link p-2"><i class="la la-search-plus"></i></a>';
				
				let file = generateElements('<li class="files">\
						<label class="form-check">\
						<input type="hidden" value="' +  _this.mediaPath + f.path + '" name="filename[]">\
						  <input type="' + ((_this.type == "single") ? "radio" : "checkbox") + '" class="form-check-input" value="' + f.path + '" name="file[]" ' + ((selected == "single") ? "checked" : "") + '><span class="form-check-label"></span>\
						  <div href="#\" class="files">'+icon+'<div class="info"><div class="name">'+ name +'</div><span class="details">'+fileSize+'</span>\
							' + actions + '\
							 <div class="preview">\
								<img src="' + _this.mediaPath + f.path + '">\
								<div>\
									<span class="name">'+ name +'</span><span class="details">'+fileSize+'</span>\
								</div>\
							</div>\
						  </div>\
						</label>\
					</li>')[0];
				
				_this.fileList.append(file);

				if (selected) {
					file.querySelector("input[type ='radio'], input[type='checkbox']").checked = true;
				}
				
				return file;
		}

		
		render(data) {

			let scannedFolders = [],
				scannedFiles = [];

			if(Array.isArray(data)) {

				data.forEach(function (d) {

					if (d.type === 'folder') {
						scannedFolders.push(d);
					}
					else if (d.type === 'file') {
						scannedFiles.push(d);
					}

				});

			}
			else if(typeof data === 'object') {

				scannedFolders = data.folders;
				scannedFiles = data.files;

			}


			// Empty the old result and make the new one

			this.fileList.replaceChildren();//.style.display = 'none';
			if(!scannedFolders.length && !scannedFiles.length) {
				this.filemanager.querySelector('.nothingfound').style.display = '';
			}
			else {
				this.filemanager.querySelector('.nothingfound').style.display = 'none';
			}

			let _this = this;
			
			if(scannedFolders.length) {

				scannedFolders.forEach(function(f) {

					let itemsLength = f.items.length,
						name = _this.escapeHTML(f.name),
						icon = '<span class="icon folder"></span>';

					if(itemsLength) {
						icon = '<span class="icon folder full"></span>';
					}

					if(itemsLength == 1) {
						itemsLength += ' item';
					}
					else if(itemsLength > 1) {
						itemsLength += ' items';
					}
					else {
						itemsLength = 'Empty';
					}

					let folder = generateElements('<li class="folders"><a href="'+ f.path +'" title="'+ f.path +'" class="folders">'+icon+'<div class="info"><span class="name">' + name + '</span> <span class="details">' + itemsLength + '</span></div></a></li>')[0];
					_this.fileList.append(folder);
				});

			}

			if(scannedFiles.length) {

				scannedFiles.forEach(function(f) {

					_this.addFile(f);
					
				});

			}


			// Generate the breadcrumbs

			let url = '';

			if(this.filemanager.classList.contains('searching')){

				url = '<span>Search results: </span>';
				this.fileList.classList.remove('animated');

			}
			else {

				this.fileList.classList.add('animated');

				this.breadcrumbsUrls.forEach(function (u, i) {

					let name = u.split('/');

					if (i !== _this.breadcrumbsUrls.length - 1) {
						url += '<a href="'+u+'"><span class="folderName">' + name[name.length-1] + '</span></a> <span class="arrow">→</span> ';
					}
					else {
						url += '<span class="folderName">' + name[name.length-1] + '</span>';
					}

				});

			}

			this.breadcrumbs.replaceChildren();
			this.breadcrumbs.appendChild(generateElements('<a href="/"><i class="la la-home"></i><span class="folderName">&ensp;home</span></a>')[0]);
			this.breadcrumbs.appendChild(generateElements('<span>' + url + '</span>')[0]);
			
			// Show the generated elements

			this.fileList.animate({'display':'inline-block'});

		}


		// This function escapes special html characters in names

		escapeHTML(text) {
			return text.replace(/\&/g,'&amp;').replace(/\</g,'&lt;').replace(/\>/g,'&gt;');
		}


		// Convert file sizes from bytes to human readable units

		bytesToSize(bytes) {
			let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes == 0) return '0 Bytes';
			let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
			return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
		}	
}
/*
export {
  MediaModal
}
*/
