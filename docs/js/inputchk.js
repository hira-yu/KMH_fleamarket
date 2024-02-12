function input_check(select) {
    if (select == 1) {
        let item_number = document.querySelector("#number_register").value;
        if (item_number != '' && (item_number.search(/^[0-9]+$/) == -1 || item_number <= 0)) {
            document.querySelector("#number_register").classList.add("input_err");
            document.querySelector("#number_register + span").innerHTML = "※1以上の半角数字で入力してください";
        } else {
            document.querySelector("#number_register").classList.remove("input_err");
            document.querySelector("#number_register + span").innerHTML = "";
        }
    }

    if (select == 2) {
        let item_name = document.querySelector("#name_register").value;
        if (item_name == '') {
            document.querySelector("#name_register").classList.add("input_err");
            document.querySelector("#name_register + span").innerHTML = "※商品名は必須項目です";
        } else {
            document.querySelector("#name_register").classList.remove("input_err");
            document.querySelector("#name_register + span").innerHTML = "";
        }
    }

    if (select == 3) {
        let item_price = document.querySelector("#price_register").value;
        if (item_price != '' && item_price.search(/^[0-9]+$/) == -1) {
            document.querySelector("#price_register").classList.add("input_err");
            document.querySelector("#price_register + span").innerHTML = "※0以上の半角数字で入力してください";
        } else if (item_price.length > 4) {
            document.querySelector("#price_register").classList.add("input_err");
            document.querySelector("#price_register + span").innerHTML = "※10,000未満の半角数字で入力してください";
        } else if (item_price == '') {
            document.querySelector("#price_register").classList.add("input_err");
            document.querySelector("#price_register + span").innerHTML = "※販売価格は必須項目です";
        } else {
            document.querySelector("#price_register").classList.remove("input_err");
            document.querySelector("#price_register + span").innerHTML = "";
        }
    }

    if (select == 4) {
        let item_number = document.querySelector("#number_edit").value;
        if (item_number != '' && (item_number.search(/^[0-9]+$/) == -1 || item_number <= 0)) {
            document.querySelector("#number_edit").classList.add("input_err");
            document.querySelector("#number_edit + span").innerHTML = "※1以上の半角数字で入力してください";
        } else {
            document.querySelector("#number_edit").classList.remove("input_err");
            document.querySelector("#number_edit + span").innerHTML = "";
        }
    }

    if (select == 5) {
        let item_name = document.querySelector("#name_edit").value;
        if (item_name == '') {
            document.querySelector("#name_edit").classList.add("input_err");
            document.querySelector("#name_edit + span").innerHTML = "※商品名は必須項目です";
        } else {
            document.querySelector("#name_edit").classList.remove("input_err");
            document.querySelector("#name_edit + span").innerHTML = "";
        }
    }

    if (select == 6) {
        let item_price = document.querySelector("#price_edit").value;
        if (item_price != '' && item_price.search(/^[0-9]+$/) == -1) {
            document.querySelector("#price_edit").classList.add("input_err");
            document.querySelector("#price_edit + span").innerHTML = "※0以上の半角数字で入力してください";
        } else if (item_price.length > 4) {
            document.querySelector("#price_edit").classList.add("input_err");
            document.querySelector("#price_edit + span").innerHTML = "※10,000未満の半角数字で入力してください";
        } else if (item_price == '') {
            document.querySelector("#price_edit").classList.add("input_err");
            document.querySelector("#price_edit + span").innerHTML = "※販売価格は必須項目です";
        } else {
            document.querySelector("#price_edit").classList.remove("input_err");
            document.querySelector("#price_edit + span").innerHTML = "";
        }
    }
}