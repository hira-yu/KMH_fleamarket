function save() {
    let status = "onsale";
    let item_id = $("#name_edit").attr('data-id');
    let item_name = document.querySelector("#name_edit").value;
    let item_price = document.querySelector("#price_edit").value;

    let err = false;
    let code = 100;

    if (document.querySelector(".err") != null) { document.querySelector(".err").remove(); }

    if (item_name == '') {
        err = true;
        code += 1;
    }

    if (item_price == '') {
        err = true;
        code += 2;
    }
    
    if (item_price.length > 4) {
        err = true;
        code += 4;
    }
    
    if (item_price != '' && item_price.search(/^[0-9]+$/) == -1) {
        err = true;
        code += 8;
    }

    if (err) { 
        document.querySelector("#edit > div > div:nth-child(4)").insertAdjacentHTML('afterend', `<p class="err">入力エラーがあります (${code})</p>`); 
        return;
    }

    if ($('input:radio[name="status"]:checked').val() == "sold") {
        status = "sold"
    }

    let item = [status, sanitize(item_name), "￥" + Number(item_price), item_id];

    items[items.indexOf(items.filter( e => e[3] === item_id)[0])] = item;

    set_localstrage();
    load_localstrage();
    item_view();
    document.querySelector("#edit").style.display = "none";
    document.querySelector("#name_edit").value = "";
    document.querySelector("#price_edit").value = "";
}