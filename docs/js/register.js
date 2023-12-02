function register() {
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

    if (err) { 
        document.querySelector("#register > div > div:nth-child(3)").insertAdjacentHTML('afterend', `<p class="err">入力エラーがあります (${code})</p>`); 
        return;
    }

    let item = ["onsale", sanitize(item_name), "￥" + Number(item_price), id_gen()];
    items.push(item);
    set_localstrage();
    load_localstrage();
    item_view();
    document.querySelector("#register").style.display = "none";
    document.querySelector("#name_register").value = "";
    document.querySelector("#price_register").value = "";
}