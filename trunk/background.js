
const SS_SLUG = "StyleSqueezeForGmail_";
//var StyleSqueeze_title "Style Squeeze for Gmail";

// Listen for any changes to the URL of any tab.
//chrome.tabs.onUpdated.addListener(checkForValidUrl);

//console.log("background.js - v v v");





////console.log(" > adding chrome.tabs.onMessage listener ...");
//This function will be called whenever this extension sends a message.
function SS_message_listener( msg,sender,callback ) {
	//console.log( "","  v  v  v  v  v  v  v  v  v  " );
	//console.log( "  bg:listener:in: ", msg,sender,callback );
	if( msg.bg ) {
		if( msg.bg.action ) {
			if( !msg.bg.args )
				msg.bg.args = {};
			msg.bg.args.sender = sender;
			var r = SS_do( msg.bg.action, msg.bg.args );
			if( callback )
				callback(r);
			//callback( {result:_styleSqueeze_do(message.action, message.args?message.args:'')});
		}
	}
	//console.log( "  bg:listener:out: " );
	//console.log( "  ^  ^  ^  ^  ^  ^  ^  ^  ^  ","" );
}
chrome.extension.onMessage.addListener(SS_message_listener);
//chrome.tabs.onUpdated.addListener(_styleSqueeze_recieveMessage);


function SS_do( action, args ) {
	//console.log( "","  v  v  v  v  v  v  v  v  v  " );
	//console.log( "  bg:do:in: ", action, args );
	var r = null;
	switch( action ) {
			
		case "pageAction.show":
			if( !args || !args.sender ) {
				console.error("bg:do:: Sender is not defined. Using current tab.",args );
				chrome.tabs.getCurrent(function(tab){chrome.pageAction.show(tab.id);});
			}
			else {
				chrome.pageAction.show(args.sender.tab.id);
			}
			//var info = "hi";
			//chrome.pageAction.setPopup({tabId:id,popup:info});
			//chrome.pageAction.setTitle({tabId:id,title:info});
			break;	
			
		case "getOptions":
			r = localStorage["StyleSqueeze"];
			break;	
			
		case "setOptions":
			r = localStorage["StyleSqueeze"] = args;
			break;	
			
		case "insertCss":
		case "removeCss":
			r = SS_do_content(action);
			//return chrome.tabs.insertCSS({file:"gmail.css",runAt:"document_start"});
			break;	
			
			
			
		default:
			//console.log("Unknown action: ", action );
			r = "Unknown action";
			break;	
	}
	//console.log( "  bg:do:out: ", r );
	//console.log( "  ^  ^  ^  ^  ^  ^  ^  ^  ^  ","" );
	return r;
}



function SS_do_content( the_action, the_args ) {
	//console.log( "","  v  v  v  v  v  v  v  v  v  " );
	//console.log( "  bg:do_content:in: ", the_action, the_args );
	var response = "NULL";
	chrome.extension.sendMessage({content:{ action:the_action, args:the_args }},function(r){response=r;});
	//console.log( "  bg:do_content:out: ", response );
	//console.log( "  ^  ^  ^  ^  ^  ^  ^  ^  ^  ","" );
	return response;
}




//console.log("background.js - ^ ^ ^");