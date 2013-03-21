
	console.log( "  v  popup.js  v","" );

if( ! SS_do ) {
	console.log("styleSqueeze_do not defined!!");
}
  
  

function toggle() {
  var toggler = document.getElementById("toggler_StyleSqueeze");  
  var options = styleSqueeze_do("getOptions");
  
  if( options == "off" ) {
	  styleSqueeze_do("insertCss");
	  styleSqueeze_do("setOptions",'on');
	  toggler.innerHTML = "off"
  }
  else {
	  styleSqueeze_do("removeCss");
	  styleSqueeze_do("setOptions",'off');
	  toggler.innerHTML = "on"
  }
  return false;
}



// Restores select box state to saved value from localStorage.
var toggler = document.getElementById("toggler_StyleSqueeze");  
var options = styleSqueeze_do("getOptions");
if( options == "on" ) {
  styleSqueeze_do("insertCss");
  toggler.innerHTML = "off";
}
toggler.addEventListener("click",toggle);
  

	console.log( "  ^  popup.js  ^","","","","" );