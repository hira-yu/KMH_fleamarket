function register() {
    let item_number = document.querySelector("#number_register").value;
    let item_name = document.querySelector("#name_register").value;
    let item_price = document.querySelector("#price_register").value;

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

    if (item_number != '' && (item_number.search(/^[0-9]+$/) == -1 || item_number <= 0)) {
        err = true;
        code += 16;
    }

    if (err) {
        document.querySelector("#register > div > div:nth-child(4)").insertAdjacentHTML('afterend', `<p class="err">入力エラーがあります (${code})</p>`);
        return;
    }

    if (item_number == '') {
        item_number = Number(items.slice(-1)[0][0]) + 1;
    }

    let item = [Number(item_number), "onsale", sanitize(item_name), "￥" + Number(item_price), id_gen()];
    items.push(item);

    try {
        set_localstrage();
    } catch {
        document.querySelector("#register > div > div:nth-child(5)").insertAdjacentHTML('afterend', `<p class="err">登録エラー (199)</p>`);
        load_localstrage();
        return;
    }
    load_localstrage();
    item_view();

    document.querySelector("#register").style.display = "none";
    document.querySelector("#number_register").value = "";
    document.querySelector("#name_register").value = "";
    document.querySelector("#price_register").value = "";
}