document.querySelector("#select-actions #edit-code-btn").after(generateElements('<a id="ai-assistant-btn" href="" title="AI assistant"><i class="icon-color-wand"></i></a>')[0]);

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

document.body.append(generateElements(aiModalTemplate)[0]);

let aiModal = document.getElementById("ai-assistant-modal");
let bsModal = bootstrap.Modal.getOrCreateInstance(aiModal);

aiModal.querySelector(".btn-ask-ai").addEventListener("click", function(event) {
	aiAssistantSendQuery();
	return false;
});

aiModal.querySelector(".btn-insert-content",).addEventListener("click", function(event) {
	let selectedEl = Vvveb.Builder.selectedEl;
	let text = selectedEl.innerHTML.trim();
	let textarea = aiModal.querySelector("textarea");
	textarea.value = textarea.value + "\n" + text;
	
	return false;
});
/*
aiModal.querySelector(".btn-save").addEventListener("click", function(event) {
	let selectedEl = Vvveb.Builder.selectedEl;
	selectedEl.innerHTML = $("textarea", aiModal).val();
	$("textarea", aiModal).val("")
});
*/
aiModal.querySelector(".close-btn").addEventListener("click", function(event) {
	aiModal.querySelector("textarea").value = "";
	let responses =  aiModal.querySelector(".responses");
	responses.innerHTML = "";
	responses.style.display = "none";
});

document.getElementById("ai-assistant-btn").addEventListener("click", function(event) {
	bsModal.show();
	
	event.preventDefault();
	return false;
});


document.addEventListener("click", function(event) {
	let element = event.target.closest(".btn-insert");
	if (element) {
		let response = element.closest(".response")
		let selectedEl = Vvveb.Builder.selectedEl;

		let node = response.querySelector(".content");
			
		selectedEl.append(node);
		
		Vvveb.Undo.addMutation({type: 'childList', 
								target: node.parentNode, 
								addedNodes: [node], 
								nextSibling: node.nextSibling});

		event.preventDefault();	
		return false;
	}
});

document.addEventListener("click", function(event) {
	let element = event.target.closest(".btn-replace");
	if (element) {
		let response = element.closest(".response")
		let selectedEl  = Vvveb.Builder.selectedEl;

		let node = response.querySelector(".content");
		
		Vvveb.Undo.addMutation({type: 'childList', 
								target: selectedEl.parentNode, 
								addedNodes: [node], 
								removedNodes: [selectedEl], 
								nextSibling: selectedEl.nextSibling});

		selectedEl.replaceWith(node);
	
		event.preventDefault();	
		return false;
	}
});

function aiAssistantSendQuery()  {
		if (!chatgptOptions["key"] ) {
			displayToast("bg-danger", "Error", 'No ChatGPT key configured! Enter a valid key in the plugin settings page.');
			return;
		}

		aiModal.querySelector(".spinner-border").style.display = '';
		
		let selection = aiModal.querySelector("textarea").value;
		
		const ChatGPT = {
			//api_key: chatgptOptions["key"] ?? null,
			model: chatgptOptions["model"] ?? "gpt-3.5-turbo-instruct",
			/*
			messages: [{
				role: "user",
				content: prompt
			  },{
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
			document.querySelector(".spinner-border", aiModal).style.display = 'none';
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

			let responses = document.querySelector(".responses");	
			let response = generateElements(aiResponseTemplate)[0];

			
			response.querySelector(".content").innerHTML = reply;
			responses.append(response);
			responses.style.display = '';
			response.scrollIntoViewIfNeeded();
			
			//$("textarea", aiModal).val(reply);
		}).catch(error => {
			aiModal.querySelector(".spinner-border").style.display = 'none';
			displayToast("bg-danger", "Error", error);
			console.log("something went wrong", error);
		})
}
