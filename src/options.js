// Saves options to chrome.storage
function save_options() {
	
	var enterprise_url = document.getElementById('enterprise_url').value;
	
	if (!enterprise_url) {
		alert('Error: No value specified');
		return;
	}
  
  	var list = enterprise_url;
	chrome.storage.sync.get(
		"enterprise_url_list", 
		function(items) {
			// if success??
			if(items.enterprise_url_list) {
				list += "," + items.enterprise_url;
			}

			chrome.storage.sync.set({
				"enterprise_url_list": list,
			}, 
			function(result) {
				restore_options();
			});
		}
	);
	
}

function clear_options() {
	chrome.storage.sync.set({
		"enterprise_url_list": ""
	}, 
	function(result) {
		restore_options();
	});
}


// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  
	// Use default value color = 'red' and likesColor = true.
	chrome.storage.sync.get(
		"enterprise_url_list", 
		function(items) {
			// if success??
			if(items.enterprise_url_list) {
				
				var theList = items.enterprise_url_list;
				
				// TODO: break comma delimited items up in <li> elements
				
				document.getElementById('enterprise_url_list').textContent = theList;
			}
			else {
				document.getElementById('enterprise_url_list').textContent = "None";
			}
		});

	}

	document.addEventListener('DOMContentLoaded', restore_options);
	document.getElementById('save').addEventListener('click', save_options);
	document.getElementById('clear').addEventListener('click', clear_options);
	
	/*
	function saveChanges() {
	// Get a value saved in a form.
	var theValue = textarea.value;
	// Check that there's some code there.
	if (!theValue) {
	message('Error: No value specified');
	return;
	}
	// Save it using the Chrome extension storage API.
	chrome.storage.sync.set({'value': theValue}, function() {
	// Notify that we saved.
	message('Settings saved');
	});
	}
		  
		  
	chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (key in changes) {
	var storageChange = changes[key];
	console.log('Storage key "%s" in namespace "%s" changed. ' +
	'Old value was "%s", new value is "%s".',
	key,
	namespace,
	storageChange.oldValue,
	storageChange.newValue);
	}
	});
	*/