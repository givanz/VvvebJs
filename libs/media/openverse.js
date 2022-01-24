class OpenVerse {
	
	//page_count
	
	constructor ()
	{
		//register your key at https://api.openverse.engineering/v1/ and replace client_id, client_secret and name bellow
		this.key = {
				"client_secret" : "YhVjvIBc7TuRJSvO2wIi344ez5SEreXLksV7GjalLiKDpxfbiM8qfUb5sNvcwFOhBUVzGNdzmmHvfyt6yU3aGrN6TAbMW8EOkRMOwhyXkN1iDetmzMMcxLVELf00BR2e",
				"client_id" : "pm8GMaIXIhkjQ4iDfXLOvVUUcIKGYRnMlZYApbda",
				"name" : "My amazing project",
    			"grant_type" : "client_credentials"
		};	
		
		this.accessToken =  {
			"access_token" : "DLBYIcfnKfolaXKcmMC8RIDCavc2hW",
			"scope" : "read write groups",
			"expires_in" : 36000,
			"token_type" : "Bearer"
		 };
		
		
		this.filters = {
			"license" :["BY-ND", "PDM", "BY-NC", "BY-NC-SA", "BY-NC-ND", "BY-SA", "BY", "CC0"],
			"license_type" :["all", "all-cc", "commercial", "modification"],
			"categories" :["illustration", "photograph", "digitized_artwork"],
			"aspect_ratio" :["tall", "wide", "square"],
			"size" :["small", "medium", "large"],
			"source" :["woc_tech", "wikimedia", "wellcome_collection", "thorvaldsensmuseum", "thingiverse", "svgsilh", "statensmuseum", "spacex", "smithsonian_zoo_and_conservation", "smithsonian_postal_museum", "smithsonian_portrait_gallery", "smithsonian_national_museum_of_natural_history", "smithsonian_libraries", "smithsonian_institution_archives", "smithsonian_hirshhorn_museum", "smithsonian_gardens", "smithsonian_freer_gallery_of_art", "smithsonian_cooper_hewitt_museum", "smithsonian_anacostia_museum", "smithsonian_american_indian_museum", "smithsonian_american_history_museum", "smithsonian_american_art_museum", "smithsonian_air_and_space_museum", "smithsonian_african_art_museum", "smithsonian_african_american_history_museum", "sketchfab", "sciencemuseum", "rijksmuseum", "rawpixel", "phylopic", "nypl", "nasa", "museumsvictoria", "met", "mccordmuseum", "iha", "geographorguk", "floraon", "flickr", "europeana", "eol", "digitaltmuseum", "deviantart", "clevelandmuseum", "brooklynmuseum", "bio_diversity", "behance", "animaldiversity", "WoRMS", "CAPL", "500px"]			
		},
		
		this.baseUrl = 'https://api.openverse.engineering/v1/images?format=json&filter_dead=true&';
		this.currentUrl = this.baseUrl;
		this.filtersParameters = "";
		
		this.authenticate();
		
	}
	
	authenticate() {
		let url = "https://api.openverse.engineering/v1/auth_tokens/token/";
		let self = this;
		
			$.ajax({
				url: url,
				type: 'POST',
				dataType: "json",
				data:this.key
			}).done(function(data) {
				this.accessToken = data;
				console.log('OpenVerse Authentication:' , data);
			});		
	}
	
	
	setFiltersParams(filtersParameters) {
		this.filtersParameters = filtersParameters;
	}		
	
	getResults(callback) {
		this.currentUrl = this.baseUrl + this.filtersParameters;
		
		$.ajax({
				url: this.currentUrl,
				type: 'GET',
				dataType: "json",
				headers: {
					'Authorization': 'Bearer ' + this.accessToken.access_token,
				}
			}).done(function(data) {
					callback(data);
			});		

			/*
			jQuery.getJSON(this.currentUrl, function( data ) {
				callback(data);
			});		
			*/
	}
}

class OpenVerseDisplay extends OpenVerse {
	
	constructor ()
	{
		super();
	}
	
	getFiltersHtml() {
		let html = "";
		for (name in this.filters) {
			let values = this.filters[name];
			html += "<div class='col-md-3'>";
			html += "<label>" + ucFirst(name.replaceAll("_", " ")) + "</label>";
			html += "<select class='form-select' name="+ name +"><option value=''>All</option>";
			for (let i=0;i< values.length;i++) {
				let value = values[i];
				let valueName = ucFirst(value.replaceAll("_", " "));
				html += "<option value="+ value + ">"+ valueName +"</option>";
			}
			html += "</select>";
			html += "</div>";
			
		}
		return html;
	}
	
	showLoading() {
		$("#openverse-results").html(`
		<div class="spinner-border" style="width: 5rem; height: 5rem;margin: 5rem auto; display:block" role="status">
		  <span class="visually-hidden">Loading...</span>
		</div>`);
	}
	
	setFilters() {
		this.filtersParameters = $("#openverse-form").serialize();
		//this.setFiltersParams(filters);
	}

	displayResults(data) {
		  var items = [];
		  
		  $.each( data['results'], function( key, val ) {

		  let item = 
			`<li class="files">									
			  <label class="form-check">									 
				<input type="radio" class="form-check-input" value="${val['thumbnail']}" name="file[]">
				<span class="form-check-label">
				</span>
				<div href="#" class="files">
				  <img class="image" loading="lazy" src="${val['thumbnail']}" title="${val['title']}">
				  <div class="info">
					<div class="name">${val['title']}</div>
					<a href="javascript:void(0);" class="preview-link"><i class="la la-search-plus"></i></a>
					<div class="preview">
						<img loading="lazy" src="${val['thumbnail']}">

						<div class="details">
							<a href="${val['license_url']}" target="_blank">${val['license']} ${val['license_version']}</a><br/>
							<a href="${val['creator_url']}" target="_blank">${val['creator']}</a><br/>
							<a href="${val['foreign_landing_url']}" target="_blank">${val['source']}</a><br/>
							<span>${val['attribution']}</span>
						</div>
					</div>
					<span class="details">
						<a href="${val['foreign_landing_url']}" target="_blank">${val['source']}</a><br/>
						<a href="${val['license_url']}" target="_blank">${val['license']} ${val['license_version']}</a><br/>
						<a href="${val['creator_url']}" target="_blank">${val['creator']}</a><br/>
					</span>
				  </div>
				</div>									
			  </label>								
			</li>`;

			items.push( item );
		  });
		 
		$("#openverse-results").html(items.join( "" ));
		 //pagination
		const maxpages = 15;		  
		let pages =  data['page_count'];
		let visiblePages = 5;
		let pagenum = openverse.pageNo ? openverse.pageNo : 1;
		let pageStop = 1;
		let currentPage = openverse.pageNo;

		if (pages > maxpages)
		{
			if (pagenum > visiblePages)
			{
				if ((pagenum + visiblePages) > pages) {
					currentPage = pages - maxpages - 1;
					pageStop = pages;
				} else  {
					currentPage = pagenum - visiblePages;
					pageStop = pagenum + visiblePages;
				}
			} else {
				currentPage = 1;
				pageStop = maxpages;
			}
		}

		  let pagination = '';
		  let active = '';

		  //next
		  let prev = Math.max(pagenum - 1, 1);
		  pagination += `<li class="page-item"><button type="button" name="page" value="${prev}" class="me-1 page-link" onclick="openverse.page(${prev});return false;">Prev</button></li>`;
		  
		  for (let i = currentPage; i <= pageStop; i++) {
			  if (i == pagenum) {
				  active = "active"; 
			  } else {
				  active = "";
			  }
			  pagination += `<li class="page-item ${active}"><button type="button" name="page" value="${i}" class="page-link" onclick="openverse.page(${i});return false;">${i}</button></li>`;
		  }
		  
		  //next
		  let next = Math.min(pagenum + 1, pages);
		  pagination += `<li class="page-item"><button type="button" name="page" value="${next}" class="ms-1 page-link" onclick="openverse.page(${next});return false;">Next</button></li>`;
		  
		  pagination += `<div class="p-2"> total pages ${data['page_count']}</div>`;
		
		  $("#openverse-pagination").html(pagination);
	}
	
	page(pageNo) {
		this.pageNo = pageNo;
		this.filtersParameters = $("#openverse-form").serialize() + "&page=" + pageNo;
		this.showLoading();
		this.getResults(this.displayResults);
	}
	
	search() {
		this.setFilters();
		this.showLoading();
		this.getResults(this.displayResults);
	}
	
	toggleBtn() {
		return `                       
			<button class="btn btn-outline-secondary btn-sm btn-icon me-3 float-end" id="openverse-toggle"
			   data-bs-toggle="collapse" 
			   data-bs-target="#openverse-form" 
			   aria-expanded="false" 
			   >
			   <i class="la la-search-plus la-lg"></i>
				OpenVerse Search
			</button>
           `;
	}
	
	displayPanel() {
		return `<ul class="data" id="openverse-results"></ul>`;
	}
	
	paginationContainer() {
		return `<div class="pagination" id="openverse-pagination">
		</div>`;
	}
		
	topPanel() {
		return `
			<form id="openverse-form" class="collapse p-4">
				<div class="input-group">
					<input id="openverse" name="q" class="form-control w-50">
					<button class="btn btn-primary px-4" id="openverse-search-btn">Search</button>
					
					<a class="btn btn-outline-secondary btn-sm btn-icon" 
					   data-bs-toggle="collapse" 
					   data-bs-target="#openverse-filters" 
					   aria-expanded="false" 
					   >
					   <i class="la la-filter la-lg"></i>
						Filters
					</a>
				</div>
				
				
			   
				<div id="openverse-filters" class="row collapse">
					<div class="col-md-3">
						<label class="w-100">Results per page
							<input name="page_size" type="number" value="20" step="10" class="form-control">
						</label>
					</div>
					<div class="col-md-3 d-flex flex-column-reverse">
						<label class="form-check-label">
							<input name="mature" type="checkbox" value="false" class="form-check-input">
							Mature content
						</label>
						<label class="form-check-label">
							<input name="qa" type="checkbox" value="false" class="form-check-input">
							Quality assurance
						</label>
					</div>
				</div>

				<!-- div class="pagination">
					<button type="button" name="page" value="1" class="btn btn-primary me-1">1</button>
					<button type="button" name="page" value="2" class="btn btn-secondary me-1">2</button>
				</div -->
			</form>`;
	}
	
	init() {
		let self = this ;
		$("#MediaModal .top-panel").append(self.topPanel());
		$("#MediaModal .display-panel").append(self.displayPanel());
		$("#MediaModal .top-right .align-right").append(self.toggleBtn());
		$("#MediaModal .modal-footer .align-left").append(self.paginationContainer());
		$("#openverse-filters").prepend(self.getFiltersHtml());
		$("#openverse-search-btn").click(function (e) { self.search();e.preventDefault(); } );
		
		//if openverse enabled hide media images
		$("#openverse-form").on("show.bs.collapse", function (e){ 
			if (e.target.id == "openverse-form") { 
				$("#MediaModal #openverse-results").show(); 
				$("#MediaModal #openverse-pagination").show(); 
				$("#MediaModal #media-files").hide();
			} 
		});
		$("#openverse-form").on("hide.bs.collapse", function (e){
			if (e.target.id == "openverse-form") { 
				$("#MediaModal #openverse-results").hide(); 
				$("#MediaModal #openverse-pagination").hide(); 
				$("#MediaModal #media-files").show(); 
			}
		});
	}
}

let openverse = new OpenVerseDisplay();
$(window).on( "mediaModal:init", function( event, myName ) { 
	openverse.init();
});
