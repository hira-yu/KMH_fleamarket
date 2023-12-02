function load_localstrage() {
    if (window.localStorage) {
	    items = JSON.parse(localStorage.getItem('items'));
        if (items == null) {
            items = [];
        }
    }
}

function set_localstrage() {
    if (window.localStorage) {
        localStorage.setItem('items', JSON.stringify(items, undefined, 1));
    }
}

load_localstrage();
item_view();