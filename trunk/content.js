

	//console.log( "  v  content.js  v","" );

const SS_SLUG = "StyleSqueezeForGmail_";


function SS_message_listener( msg,sender,callback ) {
	//console.log( "","  v  v  v  v  v  v  v  v  v  " );
	//console.log( "  content:listener:in: ", msg,sender,callback );
	if( msg.content ) {
		if( msg.content.action ) {
			if( !msg.content.args )
				msg.content.args = {};
			msg.content.args.sender = sender;
			var r = SS_do( msg.content.action, msg.content.args );
			if( callback )
				callback(r);
		}
	}
	//console.log( "  content:listener:out: " );
	//console.log( "  ^  ^  ^  ^  ^  ^  ^  ^  ^  ","" );
}
chrome.extension.onMessage.addListener(SS_message_listener);


function SS_do( action, args ) {
	//console.log( "content.js:do:in: ", action, args );
	var r = "NULL";
	switch( action ) {
			
		case "insertCss":
			r =  SS_loadcssfile("chrome-extension://hihfijcemiblehoaopenleffdehkiehn/gmail.css");
			//return chrome.tabs.insertCSS({file:"gmail.css",runAt:"document_start"});
			break;	
			
		case "removeCss":
			r =  SS_removecssfile("chrome-extension://hihfijcemiblehoaopenleffdehkiehn/gmail.css");
			break;	
			
		default:
			//console.log("Unknown action: ", action );
			r =  "Unknown action";
			break;	
	}
	//console.log( "content.js:do:out: ", r );
	return r;
}



function SS_removecssfile(filename){
	//var node = document.getElementById(SS_SLUG+filename);node.parentNode.removeChild(node);
	$(SS_SLUG+filename).remove();
	
}
function SS_loadcssfile(filename){
	$("head").append('<link rel="stylesheet" type="text/css" src="'+filename+'" id="'+SS_SLUG+filename+'">');
}




function SS_do_bg( the_action,the_args ) {
	//console.log( "","  v  v  v  v  v  v  v  v  v  " );
	//console.log( "  content:do_content:in: ", the_action, the_args );
	response = null;
	//chrome.extension.sendMessage({content:"boo"},function(r){//console.log(":::::",r,":::::");response=r;});
	chrome.extension.sendMessage({bg:{ action:the_action, args:the_args }},
		function(r){response=r;});
	//console.log( "  content:do_content:out: ", response );
	//console.log( "  ^  ^  ^  ^  ^  ^  ^  ^  ^  ","" );
	return response;
}

//console.log( "------------- SS_do_bg(pageAction.show)" );
// Loads the pageAction icon.
SS_do_bg("pageAction.show");

//SS_do("insertCss");


//console.log( "------------- SS_do_bg(getOptions)" );
//SS_do_bg("getOptions");

	//console.log( "  ^  content.js  ^","","","" );