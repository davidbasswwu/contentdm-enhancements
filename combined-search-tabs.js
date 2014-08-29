/*
	author: david.bass at wwu dot edu
	date: 25 July 2013, updated 29 aug 2014
	summary: 
		if the user is on a search results page, show them 3 tabs (exact, all, any), with the search result count in the tab title.
		
*/

$(document).ready(function() {
	
    var currentPath = window.location.pathname;
	var searchResultsPage = currentPath.indexOf('/searchterm/');

	var searchTerm = $("#searchterm").val();
	var exactSearch = currentPath.indexOf('/mode/exact');
	var allSearch = currentPath.indexOf('/mode/all');
	var anySearch = currentPath.indexOf('/mode/any');

    if (searchResultsPage != -1) {
		// we are on a search results page
		// find out how many results are shown

		var cdm_collection = $("#cdm_collection").val();

		if ((allSearch != -1) || (anySearch != -1)) {
			// do not continue if this is an All or Any search
			
		} else {
			// load the tabs
			
			// hide the check/uncheck all button/text until we can only check/uncheck the visible checboxes
			$("#cdmFavoritesCheckAll").hide();
			$('span:contains("Check/uncheck all")').hide();
			
			
			/* hide the original pagination buttons if the tabs are visible */
			$(".link_bar_pagination").css("display","none");	

			/* hide the original number of results if the tabs are visible */
			$(".float_right.body_text_10").css("display","none");	
				
				
			// add the tabs
			var tabs = "<div id='tab-row'><ul class='tabrow'>";
			tabs += " <li id='tab-exact' class='tab selected'>Exact phrase (<span id='num_exact_results'></span> results)</li>";
			tabs += " <li id='tab-all' class='tab'>All of the words <span id='num_all_results'> &nbsp; &nbsp; <span class='spin'>&nbsp;</span> </span></li>";
			tabs += " <li id='tab-any' class='tab'>Any of the words <span id='num_any_results'> &nbsp; &nbsp; <span class='spin'>&nbsp;</span> </span></li>";
			tabs += "</ul></div>";
			$("#results_tn_col2").append(tabs);
			
			var tabContents = "<div class='tab_content selected_tab_content' id='tab-exact_content'><div id='paginationLinksExact'></div><div id='resultsExact'></div></div>";
			tabContents += "<div class='tab_content' id='tab-all_content'><div id='paginationLinksAll' class='link_bar_pagination'></div><div id='resultsAll'></div></div>";
			tabContents += "<div class='tab_content' id='tab-any_content'><div id='paginationLinksAny' class='link_bar_pagination'></div><div id='resultsAny'></div></div>";
			$("#results_tn_col2").append(tabContents);
			
			if (exactSearch != -1) {
				// this is an exact search
				var numResults = $("#cdm_results_total").val();
				$("#num_exact_results").text(numResults);

				var allSearchPath = currentPath.replace("/mode/exact/", "/mode/all/");
				var anySearchPath = currentPath.replace("/mode/exact/", "/mode/any/");
			} else {
				var allSearchPath = currentPath + "/mode/all/";
				var anySearchPath = currentPath + "/mode/any/";
			}
			
			//console.log(allSearchPath);
			//console.log(anySearchPath);

			if ((exactSearch == -1) && (allSearch == -1) && (anySearch == -1)) {
				// the url does not specify how strict the search is, so it's using the default (exact) settings;
				var numResults = $("#cdm_results_total").val();
				$("#num_exact_results").text(numResults);
			}

			// move the default/exact results into #tab-exact_content;
			if (numResults == 0) {
				var currentResults = $("#cdmResultsGridView").html();
				$("#tab-exact_content").html(currentResults);
				$("#cdmResultsGridView").html("");
			} else {
				var paginationLinksExact = $(".link_bar_pagination").html();
				$('#paginationLinksExact').html(paginationLinksExact);
				var currentResults = $("#cdmResultsBrowseAllItemsView").html();
				$("#resultsExact").html(currentResults);
				$("#cdmResultsBrowseAllItemsView").html("");
			}

			// get the 'all' results
			$.get(allSearchPath, function(dataAll) {
				var allResults = $(dataAll).find("#cdmResultsBrowseAllItemsView").html();
				var numAllResults = $(dataAll).find("#cdm_results_total").val();
				var paginationLinksAll = $(dataAll).find(".link_bar_pagination").html();
				$('#paginationLinksAll').html(paginationLinksAll);
				$('#resultsAll').html(allResults);
				$("#num_all_results").text("(" + numAllResults + " results)");
			});
			
			// get the 'any' results and insert them into the tabs
			$.get(anySearchPath, function(dataAny) {
				var anyResults = $(dataAny).find("#cdmResultsBrowseAllItemsView").html();
				var numAnyResults = $(dataAny).find("#cdm_results_total").val();
				var paginationLinksAny = $(dataAny).find(".link_bar_pagination").html();
				$('#paginationLinksAny').html(paginationLinksAny);
				$('#resultsAny').html(anyResults);
				$("#num_any_results").text("(" + numAnyResults + " results)");
			});

		}
	}
	
	
	
	
	
		$("li.tab").on("click", function() {
			// remove "selected" class from all tabs
			$("li.tab").removeClass("selected");

			// set this tab to "selected" class
			$(this).addClass("selected");

			// hide all content
			$("div.tab_content").removeClass("selected_tab_content");

			// show the current content div
			var tab_content_div = "#" + $(this).attr("id") + "_content";
			
			$(tab_content_div).addClass("selected_tab_content");

		});

	/*
	TODO: 
	// override the check-all button to check only the visible items (not the ones hidden on another tab)
	cdm.Favorites.bindFavoritesSelectAll=function() {
		$('#cdmFavoritesCheckAll').click(function() {
			cdm.Favorites.checkBoxClass += ":visible";				// only select the visible checkboxes
			checkUncheck=$(this).is(':checked');
			$(cdm.Favorites.checkBoxClass).each(function() {
				if (checkUncheck){
					$(this).attr('checked',true);
				}else{
					$(this).attr('checked',false);
				}
			});
		});
	}
	*/
	
});
