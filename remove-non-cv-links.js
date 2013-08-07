/*
  author: david.bass at wwu dot edu
	date: 10 July 2013
	goal: remove non-controlled-vocabulary links from the description area of our CONTENTdm v6 system.
	copyright WWU 2013
	
  http://jsfiddle.net/JF2Ad/1/
	
*/


$(document).ready(function () {
    // do not execute the link-remover on search results pages or landing pages
    var currentUrl = document.URL;
    var isSearchPage = currentUrl.indexOf('/cdm/search');
	var isLandingPage = currentUrl.indexOf('/cdm/landingpage');
	
    if ((isSearchPage == -1) && (isLandingPage == -1)) {
        $("a.body_link_11:visible").each(function () {
            // ignore any links without an href; those are the list of collections used in advanced search 

            var $t = $(this);
            var this_link = $(this).attr("href");
            this_link = $.trim(this_link);
            var link_has_slashes = 0;
            link_has_slashes = this_link.indexOf('//');

            if (link_has_slashes == -1) {
                // this link does not go to an external site, so continue checking the other criteria

                var cv_link = 0;
                cv_link = this_link.indexOf('/mode/exact');

                if (cv_link == -1) {
                    // this is not a Controlled-Vocabulary link
                    // if it's not a date or year link, then remove the link
                   
                    // MatchDate (e.g. 2006-12-01)
                    var YMDdateRegex = /(\d{4}\-\d{1,2}\-\d{1,2})/gm;
                    var isYMD = this_link.match(YMDdateRegex);
                    if (isYMD != null) {
                        // do not remove this link; it is a YMD
                        return;
                    }
                    
                    // MatchDate (e.g. 2006-12)
                    var YMdateRegex = /(\d{4}\-\d{1,2})/gm;
                    var isYM = this_link.match(YMdateRegex);
                    if (isYM != null) {
                        // do not remove this link; it is a YM
                        return;
                    }

                    // MatchDate (e.g. 2006)
                    var YdateRegex = /(\d{4})/gm;
                    var isY = this_link.match(YdateRegex);
                    if (isY != null) {
                        // do not remove this link; it is a Y
                        return;
                    }

                    $t.after($t.text());
                    $t.remove();
                }
            }
        });
    }
});
