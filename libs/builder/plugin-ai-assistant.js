$("#select-actions #edit-code-btn").after('<a id="ai-assistant-btn" href="" title="AI assistant"><i class="icon-color-wand"></i></a>');

let aiResponseTemplate = `
<div class="response">
	<div class="content">

		<div class="card">
		  <div class="card-body">
			<h5 class="card-title">Welcome to our website!</h5>
			<p class="card-text">Thank you for visiting our site. We hope you find everything you need.</p>
			<button class="btn btn-primary">Learn More</button>
		  </div>
		</div>

	</div>
	
	<div class="ai-actions">
		<button type="button" class="btn btn-sm btn-outline-primary btn-insert"><i class="icon-arrow-up"></i>Insert content</button>
		<button type="button" class="btn btn-sm btn-outline-primary btn-replace"><i class="icon-swap-horizontal-outline"></i> Replace with</button>
	</div>
</div>	
`;
			
let aiModalTemplate = `<div class="modal fade" id="ai-assistant-modal" tabindex="-1" role="dialog" aria-labelledby="textarea-modal" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <p class="modal-title text-primary"><i class="icon-color-wand"></i> Ai assistant</p>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
        </button>
      </div>
      <div class="modal-body">
        
        <textarea rows="3" cols="150" class="form-control mb-3"></textarea>
      
	    <button type="button" class="btn btn-success btn-ask-ai"><i class="icon-color-wand la-lg"></i> Ask AI</button>
	    <button type="button" class="btn btn-light border btn-insert-content"><i class="icon-arrow-up la-lg"></i> Insert element content</button>
		
		<div class="spinner-border spinner-border-sm mx-3" role="status" style="display:none">
		  <span class="visually-hidden">Loading...</span>
		</div>
		
		<div class="responses mt-3 pt-3 border-top" style="display:none">
		</div>

      </div>
      <div class="modal-footer">
        <!-- <button type="button" class="btn btn-primary btn-lg btn-save" data-bs-dismiss="modal"><i class="la la-save"></i> Save</button> -->
        <button type="button" class="btn btn-secondary btn-lg close-btn" data-bs-dismiss="modal"><i class="la la-times"></i> Close</button>
      </div>
    </div>
  </div>
</div>
<style>
.responses {
	overflow-y: auto;
    resize: vertical;
	height:300px;
	border-top:1px solid var(--bs-border-color);
}

.response {
	margin-top:1rem;
	padding-top:1rem;
	border-bottom:1px solid var(--bs-border-color);
}
.response .ai-actions{
	margin:1rem;	
	text-align:right;
}

.response .ai-actions i {
	font-size: 1.15rem;
    line-height: 1;
    vertical-align: text-top;
}
`;

$("body").append(aiModalTemplate);

let aiModal = $("#ai-assistant-modal");

$(".btn-ask-ai", aiModal).on("click", function(event) {
	aiAssistantSendQuery();
	return false;
});

$(".btn-insert-content", aiModal).on("click", function(event) {
	let selectedEl = Vvveb.Builder.selectedEl.get(0);
	let text = selectedEl.innerHTML.trim();
	
	$("textarea", aiModal).val(function( index, value ) {
		return value + "\n" + text;
	});
	
	return false;
});

$(".btn-save", aiModal).on("click", function(event) {
	let selectedEl = Vvveb.Builder.selectedEl.get(0);
	selectedEl.innerHTML = $("textarea", aiModal).val();
	$("textarea", aiModal).val("")
});

$(".close-btn", aiModal).on("click", function(event) {
	$("textarea", aiModal).val("")
	$(".responses", aiModal).html("").hide();
});

$("#ai-assistant-btn").on("click", function(event) {
	aiModal.modal("show");
	
	return false;
});


$("#ai-assistant-modal").on("click", ".btn-insert",function(event) {
	let response = $(this).parents(".response:first")
	let selectedEl = Vvveb.Builder.selectedEl;

	var node = $( $(".content", response).html() );
		
	selectedEl.append(node);
	
	node = node.get(0);
	
	Vvveb.Undo.addMutation({type: 'childList', 
							target: node.parentNode, 
							addedNodes: [node], 
							nextSibling: node.nextSibling});
	
	return false;
});

$("#ai-assistant-modal").on("click", ".btn-replace",function(event) {
	let response    = $(this).parents(".response:first")
	let selectedEl  = Vvveb.Builder.selectedEl;

	var node = $( $(".content", response).html() );
	
	node = node.get(0);
	
	Vvveb.Undo.addMutation({type: 'childList', 
							target: selectedEl[0].parentNode, 
							addedNodes: [node], 
							removedNodes: [selectedEl[0]], 
							nextSibling: selectedEl[0].nextSibling});

	selectedEl.replaceWith(node);
	
	return false;
});

function aiAssistantSendQuery()  {
		if (!chatgptOptions["key"] ) {
			displayToast("bg-danger", "Error", 'No ChatGPT key configured! Enter a valid key in the plugin settings page.');
			return;
		}

		$(".spinner-border", aiModal).show();
		
		let selection = $("textarea", aiModal).val();
		
		const ChatGPT = {
			//api_key: chatgptOptions["key"] ?? null,
			model: chatgptOptions["model"] ?? "gpt-3.5-turbo-instruct",
			/*
			messages: [
			  {
				role: "user",
				content: prompt
			  },
			  {
				role: "system",
				content: "You are a Bootstrap 5 Html expert."
			  },
			],
			*/
			temperature: parseInt(chatgptOptions["temperature"] ?? 0),
			max_tokens: parseInt(chatgptOptions["max_tokens"] ?? 300),
			prompt: selection,
			//format: "html"
		};

		fetch("https://api.openai.com/v1/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${chatgptOptions["key"]}`
			},
			body: JSON.stringify(ChatGPT)
		}).then(res => res.json()).then(data => {
			$(".spinner-border", aiModal).hide();
			if (data.error) {
				let message = '';
				for (name in data.error) {
					message += name +":" + data.error[name] + "\n";
				}
				//alert(message);
				displayToast("bg-danger", "Error", message);
				return;
			}
			
			let reply = '';
			for (let i = 0; i < data.choices.length; i++) {
				reply += data.choices[i].text + "\n";
			}

			let responses = $(".responses");	
			let response = $(aiResponseTemplate);

			
			$(".content", response).html(reply);
			responses.append(response);
			responses.show();
			response[0].scrollIntoViewIfNeeded();
			
			//$("textarea", aiModal).val(reply);
		}).catch(error => {
			$(".spinner-border", aiModal).hide();
			displayToast("bg-danger", "Error", error);
			console.log("something went wrong", error);
		})
}
