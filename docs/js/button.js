function register_view() {
    unused_number("register");
    document.querySelector("#number_register + span").innerHTML = "";
    document.querySelector("#name_register + span").innerHTML = "";
    document.querySelector("#price_register + span").innerHTML = "";
    document.querySelector("#number_register").classList.remove("input_err");
    document.querySelector("#name_register").classList.remove("input_err");
    document.querySelector("#price_register").classList.remove("input_err");

    if (items.length != 0) {
        document.querySelector("#number_register").value = Number(items.slice(-1)[0][0]) + 1;
    } else {
        document.querySelector("#number_register").value = 1;
    }
    document.querySelector("#register").style.display = "flex";
}

function edit_view(number, name, price, id) {
    unused_number("edit");
    document.querySelector("#number_edit + span").innerHTML = "";
    document.querySelector("#name_edit + span").innerHTML = "";
    document.querySelector("#price_edit + span").innerHTML = "";
    document.querySelector("#number_edit").classList.remove("input_err");
    document.querySelector("#name_edit").classList.remove("input_err");
    document.querySelector("#price_edit").classList.remove("input_err");

    document.querySelector("#number_edit").value = number;
    document.querySelector("#name_edit").value = name;
    document.querySelector("#price_edit").value = price;
    $("#name_edit").attr('data-id', id);
    document.querySelector("#edit").style.display = "flex";
}

function delete_view() {
    $("#item_name").text($("#name_edit").val());
    $("#item_number").text($("#number_edit").val());
    document.querySelector("#delete").style.display = "flex";
}

function reset_view() {
    document.querySelector("#reset").style.display = "flex";
}

function settle_view() {
    $("#sold_money").text($("#sold_amount").text() + "円");
    settle();
    document.querySelector("#settle").style.display = "flex";
}

function setting_view() {
    document.querySelector("#setting").style.display = "flex";
}

function help_view() {
    document.querySelector("#help").style.display = "flex";
}

function version_view() {
    document.querySelector("#version").style.display = "flex";
}

function cancel(page = "def") {
    if (page == "delete") {
        document.querySelector("#delete").style.display = "none";
    } else if (page == "version") {
        document.querySelector("#version").style.display = "none";
    } else {
        document.querySelector("#help").style.display = "none";
        document.querySelector("#edit").style.display = "none";
        document.querySelector("#reset").style.display = "none";
        document.querySelector("#settle").style.display = "none";
        document.querySelector("#setting").style.display = "none";
        document.querySelector("#register").style.display = "none";

        if (document.querySelector(".err") != null) { document.querySelector(".err").remove(); }

        document.querySelector("#name_register").value = "";
        document.querySelector("#price_register").value = "";
    }
}