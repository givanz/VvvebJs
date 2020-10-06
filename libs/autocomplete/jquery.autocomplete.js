/**
*    Json key/value autocomplete for jQuery 
*    Provides a transparent way to have key/value autocomplete
*    Copyright (C) 2008 Ziadin Givan
*
*    This program is free software: you can redistribute it and/or modify
*    it under the terms of the GNU Lesser General Public License as published by
*    the Free Software Foundation, either version 3 of the License, or
*    (at your option) any later version.
*
*    This program is distributed in the hope that it will be useful,
*    but WITHOUT ANY WARRANTY; without even the implied warranty of
*    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*    GNU General Public License for more details.
*
*    You should have received a copy of the GNU Lesser General Public License
*    along with this program.  If not, see http://www.gnu.org/licenses/
*    
*    Examples 
* 
*	 $("input#example").autocomplete("autocomplete.php");//using default parameters
* 
*	 $("input#example").autocomplete("autocomplete.php",{minChars:3,timeout:3000,validSelection:false,parameters:{'myparam':'myvalue'},before : function(input,text) {},after : function(input,text) {}});
* 
*    minChars = Minimum characters the input must have for the ajax request to be made
*	 timeOut = Number of miliseconds passed after user entered text to make the ajax request   
*    validSelection = If set to true then will invalidate (set to empty) the value field if the text is not selected (or modified) from the list of items.
*    parameters = Custom parameters to be passed
*    after, before = a function that will be caled before/after the ajax request
*/
(function ($) {

$.fn.autocomplete = function(settings) 
{
	return this.each( function()//do it for each matched element
	{
		var textInput = $(this);
		textInput.attr("name", textInput.attr("name") + "_text");
		
		//create a new hidden input that will be used for holding the return value when posting the form, then swap names with the original input
		var hiddenInput = $('<input type=hidden name="' + textInput.attr("name") + '"/>');
		hiddenInput.val( textInput.val() );
		textInput.after(hiddenInput);
		
		var valueInput = $(this).next();
		//create the ul that will hold the text and values
		valueInput.after('<ul class="autocomplete"></ul>');
		var list = valueInput.next();
		
		var oldText = '';
		var typingTimeout;
		var size = 0;
		var selected = -1;

		settings = $.extend(//provide default settings
		{
			minChars : 1,
			timeout: 1000,
			after : null,
			before : null,
			validSelection : true,
			url : this.dataset.url,
			parameters : {'inputName' : valueInput.attr('name'), 'inputId' : textInput.attr('id')}
		} , settings);

		function getData(text)
		{
			window.clearInterval(typingTimeout);
			if (text != oldText && (settings.minChars != null && text.length >= settings.minChars))
			{
				clear();
				if (settings.before == "function") 
				{
					settings.before(textInput,text);
				}
				textInput.addClass('autocomplete-loading');
				settings.parameters.text = text;
				
				$.getJSON(settings.url, settings.parameters, function(data)
				{
					var items = '';
					if (data)
					{
						size = 0;

						  for ( key in data )//get key => value
						  {	
								items += '<li value="' + key + '">' + data[key].replace(new RegExp("(" + text + ")","i"),"<strong>$1</strong>") + '</li>';
								size++;
						  }
						
						list.css({/*top: textInput.offset().top + textInput.outerHeight(), left: textInput.offset().left,*/ width: Math.max(100, textInput.outerWidth())}).html(items);
						//on mouse hover over elements set selected class and on click set the selected value and close list
						list.show().children().
						hover(function() { $(this).addClass("selected").siblings().removeClass("selected");}, function() { $(this).removeClass("selected") } ).
						  click(function () { value = $(this).attr('value'); text = $(this).text();valueInput.val( value ); textInput.val( text ); textInput.trigger("autocomplete.change", [ value, text ]);clear(); });

						if (settings.after == "function") 
						{
							settings.after(textInput,text);
						}
						
					}
					textInput.removeClass('autocomplete-loading');
				});
				oldText = text;
			}
		}
		
		function clear()
		{
			list.hide();
			size = 0;
			selected = -1;
		}	
		
		textInput.keydown(function(e) 
		{
			window.clearInterval(typingTimeout);
			if(e.which == 27)//escape
			{
				clear();
			} else if (e.which == 46 || e.which == 8)//delete and backspace
			{
				clear();
				//invalidate previous selection
				if (settings.validSelection) valueInput.val('');
			}
			else if(e.which == 13)//enter 
			{ 
				if ( list.css("display") == "none")//if the list is not visible then make a new request, otherwise hide the list
				{ 
					getData(textInput.val());
				} else
				{
					clear();
				}
				e.preventDefault();
				return false;
			}
			else if(e.which == 40 || e.which == 9 || e.which == 38)//move up, down 
			{
			  switch(e.which) 
			  {
				case 40: //down
				case 9:
				  selected = (selected >= size - 1) ? 0 : selected + 1; break;
				case 38://up
				  selected = (selected < 0) ? size -1 : selected - 1; break;
				default: break;
			  }
			  //set selected item and input values
			  textInput.val( list.children().removeClass('selected').eq(selected).addClass('selected').text() );	        
			  valueInput.val( list.children().eq(selected).attr('value') );
			} else 
			{ 
				//invalidate previous selection
				if (settings.validSelection) valueInput.val('');
				typingTimeout = window.setTimeout(function() { getData(textInput.val()) },settings.timeout);
			}
		});
	});
};

$.autocompleteList = function(el, settings) 
{
		var autocomplete = $(el).autocomplete(settings);
		
		var list = $('<div class="autocomplete-list card border-top-0"></div>');
		
		var autocomplete_hidden = autocomplete.next();
		
		var name =  autocomplete_hidden.attr("name");
		
		autocomplete_hidden.next().after(list);
		var autocomplete_list_hidden = $('<input type=hidden name="' + name + '_list"  value="' + autocomplete_hidden.val() + '"/>');
		
		list.after(autocomplete_list_hidden);

		function addItem(value, text)
		{
			list.append($('<div class=""><button type="button" class="remove-btn close text-muted" aria-label="Close"><div aria-hidden="true">&times;</div></button><span>' + text + '</span>\
				<input name="list[]" value="' + value + '" type="hidden">\
			 </div>'));
			 autocomplete.val("");
		};
	
		function setList()
		{
			values = {};
			$('input[name="list[]"]', list).each(function(i, el)
			{
				values[this.value] = $("span", this.parentNode).text();
			});

			autocomplete_list_hidden.val( JSON.stringify(values) );
		};

		
		function setValue(value) { 
			if (value == "" || value == undefined) return false;
//			value = decodeURIComponent(value);
			values = JSON.parse(value);
			
			for (key in values)
			{
				addItem(key, values[key]);
			}
			
			setList();
		};

		autocomplete.on("autocomplete.change", function(event, value, text) { 
				var autolist = $(this).data("autocompleteList");

				autolist.addItem(value, text);
				autolist.setList();
				autolist.trigger("autocompletelist.change", [ JSON.stringify(values) ]);
		 });

		list.on("click", ".remove-btn", function (event, value, text) 
		{
			this.parentNode.remove();
			setList();
			autocomplete.trigger("autocompletelist.change", [ JSON.stringify(values) ]);

			event.preventDefault();
			return false;
		});		 

		autocomplete.setValue = setValue;
		autocomplete.addItem = addItem;
		autocomplete.setList = setList;

		$.data(el, "autocompleteList", autocomplete);
		
		return autocomplete;
}

$.fn.autocompleteList = function(options) 
{
	return this.each( function()
	{
		$.autocompleteList(this, options);
	});
};

$.tagsInput = function(el, settings) 
{
		var autocomplete = $(el).autocomplete(settings);
		
		var list = autocomplete.parent();//$('<div class="form-control autocomplete-list" style="min-height: 100px;height: 100px; overflow: auto;"></div>');
		
		var autocomplete_hidden = autocomplete.next();
		
		var name =  autocomplete_hidden.attr("name");
		
		autocomplete_hidden.next();//.after(list);
		var autocomplete_list_hidden = $('<input type=hidden name="' + name + '_list" value="' + autocomplete_hidden.val() + '"/>');
		
		list.append(autocomplete_list_hidden);

		function addItem(value, text)
		{
			autocomplete.before($('<div class="badge border m-1"><a href="#" class="btn-link"><i class="la la-close"></i></a> <span>' + text + '</span>\
				<input name="list[]" value="' + value + '" type="hidden">\
			 </div>'));
			 autocomplete.val("");
		};
	
		function setList()
		{
			var values = {};
			//console.log($('input[name="list[]"]', list).serialize());
			$('input[name="list[]"]', list).each(function(i, el)
			{
				values[this.value] = $("span", this.parentNode).text();
			});

			//values = encodeURIComponent(JSON.stringify(values));
			values = JSON.stringify(values);//.replace('"', '\"');
			autocomplete_list_hidden.val( values );
			return values;
		};

		
		function setValue(value) { 
			if (value == "" || value == undefined) return false;
			values = JSON.parse(value);
			
			for (key in values)
			{
				addItem(key, values[key]);
			}
			
			setList();
		};

		autocomplete.on("autocomplete.change", function(event, value, text) { 
				var autolist = $(this).data("tagsInput");

				autolist.addItem(value, text);
				var values = autolist.setList();
				autolist.trigger("tagsinput.change", [ values ]);
		 });

		list.on("click", ".remove-btn", function (event, value, text) 
		{
			this.parentNode.remove();
			var values = autolist.setList();
			autocomplete.trigger("tagsinput.change", [ values ]);

			event.preventDefault();
			return false;
		});		 

		autocomplete.setValue = setValue;
		autocomplete.addItem = addItem;
		autocomplete.setList = setList;

		$.data(el, "tagsInput", autocomplete);
		
		return autocomplete;
}

$.fn.tagsInput = function(options) 
{
	return this.each( function()//do it for each matched element
	{
		$.tagsInput(this, options);
	});
};

})(jQuery);
