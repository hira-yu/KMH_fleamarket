function save() {
    let status = "onsale";
    let item_id = $("#name_edit").attr('data-id');
    let item_number = document.querySelector("#number_edit").value;
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

    if (item_number != '' && item_number <= 0) {
        err = true;
        code += 16
    }

    if (item_number != '' && item_number.search(/^[0-9]+$/) == -1) {
        err = true;
        code += 32;
    }

    if (err) {
        document.querySelector("#edit > div > div:nth-child(5)").insertAdjacentHTML('afterend', `<p class="err">入力エラーがあります (${code})</p>`);
        return;
    }

    if (item_number == '') {
        item_number = Number(items.slice(-1)[0][0]) + 1;
    }

    if ($('input:radio[name="status"]:checked').val() == "sold") {
        status = "sold";
    }

    let item = [Number(item_number), status, sanitize(item_name), "￥" + Number(item_price), item_id];

    items[items.indexOf(items.filter( e => e[4] === item_id)[0])] = item;

    try {
        set_localstrage();
    } catch {
        document.querySelector("#edit > div > div:nth-child(5)").insertAdjacentHTML('afterend', `<p class="err">登録エラー (199)</p>`);
        load_localstrage();
        return;
    }
    load_localstrage();
    item_view();

    document.querySelector("#edit").style.display = "none";
    document.querySelector("#number_edit").value = "";
    document.querySelector("#name_edit").value = "";
    document.querySelector("#price_edit").value = "";
}