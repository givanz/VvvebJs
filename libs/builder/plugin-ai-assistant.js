$("#select-actions #edit-code-btn").after('<a id="ai-assistant-btn" href="" title="AI assistant"><i class="icon-color-wand"></i></a>');

let aiModalTemplate = `<div class="modal fade" id="ai-assistant-modal" tabindex="-1" role="dialog" aria-labelledby="textarea-modal" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <p class="modal-title text-primary"><i class="icon-color-wand"></i> Ai assistant</p>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
        </button>
      </div>
      <div class="modal-body">
        
        <textarea rows="5" cols="150" class="form-control mb-3"></textarea>
      
	    <button type="button" class="btn btn-success btn-ask-ai"><i class="icon-color-wand la-lg"></i> Ask AI</button>
	    <button type="button" class="btn btn-light border btn-insert"><i class="icon-arrow-up la-lg"></i> Insert element content</button>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-lg btn-save" data-bs-dismiss="modal"><i class="la la-save"></i> Save</button>
        <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal"><i class="la la-times"></i> Close</button>
      </div>
    </div>
  </div>
</div>`;

$("body").append(aiModalTemplate);

let aiModal = $("#ai-assistant-modal");

$(".btn-ask-ai", aiModal).on("click", function(event) {
	aiAssistantSendQuery();
	return false;
});

$(".btn-insert", aiModal).on("click", function(event) {
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

$("#ai-assistant-btn").on("click", function(event) {
	aiModal.modal("show");
	
	return false;
});

function aiAssistantSendQuery()  {
		if (!chatgptOptions["key"] ) {
			displayToast("bg-danger", "Error", 'No ChatGPT key configured! Enter a valid key in the plugin settings page.');
			return;
		}
		
		let selection = $("textarea", aiModal).val();

		const ChatGPT = {
			api_key: chatgptOptions["key"] ?? null,
			model: chatgptOptions["model"] ?? "text-davinci-003",
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
			temperature: chatgptOptions["temperature"] ?? 0,
			max_tokens: chatgptOptions["max_tokens"] ?? 70,
			prompt: selection,
			format: "html"
		};

		fetch("https://api.openai.com/v1/completions", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${ChatGPT.api_key}`
			},
			body: JSON.stringify(ChatGPT)
		}).then(res => res.json()).then(data => {
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
			
			$("textarea", aiModal).val(reply);
		}).catch(error => {
			displayToast("bg-danger", "Error", error);
			console.log("something went wrong", error);
		})
}
