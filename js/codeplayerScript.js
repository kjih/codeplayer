/*
 * codeplayerScript.js
 *
 * JavaScript file for CodePlayer
 */

/* Disable selection of toggle text */
$(".toggle").disableSelection();
$("#jsContainer").disableSelection();

/* Set codeContainerHeight 
 * Height is static and will not change if window is resized after page is loaded
*/
var windowHeight = $(window).height();
var menuBarHeight = $("#menuBar").height();
var codeContainerHeight = windowHeight - menuBarHeight - 4;

$(".codeContainer").height(codeContainerHeight + "px");

/* Toggle whether or not a container is displayed */
var displayTracker = [1, 0, 0, 1];
var displayCount = 2;

$(".toggle").click(function() {
	var activeDiv = $(this).attr('name');
	var activeContainer = "#" + activeDiv + "Container";
	var trackerIndex = getTrackerIndex(activeDiv);
	var width;
	var newWidth = "";

	$(this).toggleClass("selected");
	
	//alert(activeDiv + activeDivDisplay);

	if (displayTracker[trackerIndex] == 0) {
		$(activeContainer).css("display", "block");
		displayTracker[trackerIndex] = 1;
		displayCount++;
		width = 100 / displayCount;
		newWidth += width + "%";
		$(".codeContainer").css("width", newWidth);
	} else {
		$(activeContainer).css("display", "none");
		displayTracker[trackerIndex] = 0;
		displayCount--;
		width = 100 / displayCount;
		newWidth += width + "%";
		$(".codeContainer").css("width", newWidth);
	}
});

/* getTrackerIndex()
 * Returns the index of the tracker for given container name
 */
function getTrackerIndex(activeDiv) {
	if (activeDiv == "html") {
		return 0;
	} else if (activeDiv == "css") {
		return 1;
	} else if (activeDiv == "js") {
		return 2;
	} else if (activeDiv == "result") {
		return 3;
	}
}

/* Fill iframe contents with values of code containers when button is pressed */
$("#runButton").click(function() {
	$("iframe").contents().find("html").html('<style>' + $("#cssCode").val() + '</style>' + $("#htmlCode").val());

	/* JavaScript portion editing disabled for security purposes */
	document.getElementById("resultFrame").contentWindow.eval($("#jsCode").val());
});