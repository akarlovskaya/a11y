/*--------------------------------------------------------------
Script by Jeff Smith (@jeffsmith) on CodePen.
http://codepen.io/jeffsmith/pen/mPByya/
--------------------------------------------------------------*/
jQuery(function($) {
    var tabs = $("#tabs");

    // For each individual tab DIV, set class and aria-hidden attribute, and hide it
    $(tabs).find("> div").attr({
        "class": "tabPanel",
        "aria-hidden": "true"
    }).hide();

    // Get the list of tab links
    var tabsList = tabs.find("ul:first").attr({
        "class": "tabsList",
    });

    // For each item in the tabs list...
    $(tabsList).find("li > a").each(
        function(a){
            var tab = $(this);

            // Create a unique id using the tab link's href
            var tabId = "tab-" + tab.attr("href").slice(1);

            // Assign tab id and aria-selected attribute to the tab control, but do not remove the href
            tab.attr({
                "id": tabId,
                "aria-selected": "false",
            }).parent().attr("role", "presentation");

            // Assign aria attribute to the relevant tab panel
            $(tabs).find(".tabPanel").eq(a).attr("aria-labelledby", tabId);

            // Set the click event for each tab link
            tab.click(
                function(e){
                    var tabPanel;

                    // Prevent default click event
                    e.preventDefault();

                    // Change state of previously selected tabList item
                    $(tabsList).find("> li.current").removeClass("current").find("> a").attr("aria-selected", "false");

                    // Hide previously selected tabPanel
                    $(tabs).find(".tabPanel:visible").attr("aria-hidden", "true").hide();

                    // Show newly selected tabPanel
                    tabPanel = $(tabs).find(".tabPanel").eq(tab.parent().index());
                    tabPanel.attr("aria-hidden", "false").show();

                    // Set state of newly selected tab list item
                    tab.attr("aria-selected", "true").parent().addClass("current");

                    // Set focus to the first heading in the newly revealed tab content
                    tabPanel.children("h2").attr("tabindex", -1).focus();
                }
            );
        }
    );

    // Set keydown events on tabList item for navigating tabs
    $(tabsList).delegate("a", "keydown",
        function (e) {
            var tab = $(this);
            switch (e.which) {
                case 37: case 38:
                    if (tab.parent().prev().length!=0) {
                        tab.parent().prev().find("> a").click();
                    } else {
                        $(tabsList).find("li:last > a").click();
                    }
                    break;
                case 39: case 40:
                    if (tab.parent().next().length!=0) {
                        tab.parent().next().find("> a").click();
                    } else {
                        $(tabsList).find("li:first > a").click();
                    }
                    break;
            }
        }
    );

    // Show the first tabPanel
    $(tabs).find(".tabPanel:first").attr("aria-hidden", "false").show();

    // Set state for the first tabsList li
    $(tabsList).find("li:first").addClass("current").find(" > a").attr({
        "aria-selected": "true",
        "tabindex": "0"
    });
});