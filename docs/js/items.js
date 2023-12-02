function item_view() {
    let onsale = [];
    let sold = [];

    if (document.querySelector(".none") != null) { document.querySelector(".none").remove(); }

    if (items.length == 0) {
        document.querySelector("#item_list").innerHTML = '<p class="none">登録されている商品がありません.</p>';
    } else {
        document.querySelector("#item_list").innerHTML = "";
    }

    for (let item of items) {
        if (item[0] == "onsale") {
            onsale.push(item);
        } else {
            sold.push(item);
        }
    }

    for (let item of onsale) {
        let elem = `<div class="item" data-id="${item[3]}"><div><p>販売中</p></div><div><p>${item[1]}</p></div><div><p>￥${Number(item[2].slice(1)).toLocaleString()}</p></div></div>`;
        document.querySelector("#item_list").innerHTML += elem;
    }

    for (let item of sold) {
        let elem = `<div class="item sold" data-id="${item[3]}"><div><p>販売済</p></div><div><p>${item[1]}</p></div><div><p>￥${Number(item[2].slice(1)).toLocaleString()}</p></div></div>`;
        document.querySelector("#item_list").innerHTML += elem;
    }

    info(onsale, sold);
}

function delete_item() {
    let item_id = $("#name_edit").attr('data-id');
    items.splice(items.indexOf(items.filter( e => e[3] === item_id)[0]), 1);
    set_localstrage();
    load_localstrage();
    item_view();
    document.querySelector("#edit").style.display = "none";
    document.querySelector("#delete").style.display = "none";
}

function list_clear() {
    localStorage.clear();
    load_localstrage();
    item_view();
    document.querySelector("#reset").style.display = "none";
}

$(document).on('click', '.item', function() {
    if ($(this).hasClass('sold')) {
        $("input[value='sold']").prop("checked",true);
    } else {
        $("input[value='onsale']").prop("checked",true);
    }
    edit_view($(this).find('div').eq(1).text(), $(this).find('div').eq(2).text().slice(1).replace(",", ""), $(this).attr('data-id'));
});