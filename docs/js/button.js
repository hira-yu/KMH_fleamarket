function register_view() {
    document.querySelector("#register").style.display = "flex";
}

function edit_view(name, price, id) {
    document.querySelector("#name_edit").value = name;
    document.querySelector("#price_edit").value = price;
    $("#name_edit").attr('data-id', id);
    document.querySelector("#edit").style.display = "flex";
}

function delete_view() {
    $("#item_name").text($("#name_edit").val());
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

function cancel(page = "def") {
    if (page == "delete") {
        document.querySelector("#delete").style.display = "none";
    } else {
        document.querySelector("#edit").style.display = "none";
        document.querySelector("#reset").style.display = "none";
        document.querySelector("#settle").style.display = "none";
        document.querySelector("#register").style.display = "none";

        if (document.querySelector(".err") != null) { document.querySelector(".err").remove(); }
    
        document.querySelector("#name_register").value = "";
        document.querySelector("#price_register").value = "";
    }
}