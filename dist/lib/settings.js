function loadSt(){var t,a,s,e=H5S.settings;$("[data-sttype]").each(function(){t=$(this),a=t.attr("data-sttype"),s=t.attr("data-stname"),"boolean"==a?e[s]?t.addClass("set_checked"):t.removeClass("set_checked"):"string"==a&&(e[s]?t.val(e[s]):t.val(""))})}function saveSt(){var t,a,s,e={};$("[data-sttype]").each(function(){t=$(this),a=t.attr("data-sttype"),s=t.attr("data-stname"),"boolean"==a?e[s]=t.hasClass("set_checked"):"string"==a&&(e[s]=t.val())}),H5S.settings=e}