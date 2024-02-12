function load_localstrage() {
    if (window.localStorage) {
	    items = JSON.parse(localStorage.getItem('items'));
        if (items == null) {
            items = [];
        } else {
            items = items.sort(function(a,b){return(a[0] - b[0]);});
        }
    }
}

function set_localstrage() {
    if (window.localStorage) {
        localStorage.setItem('items', JSON.stringify(items.sort(function(a,b){return(a[0] - b[0]);}), undefined, 1));
    }
}

load_localstrage();
if (items.length != 0) {
    if (compatibility_chk()) {
        item_view();
    }
} else {
    item_view();
}