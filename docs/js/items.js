function item_view() {
    let onsale = [];
    let sold = [];

    if (document.querySelector(".none") != null) { document.querySelector(".none").remove(); }

    if (items.length == 0) {
        document.querySelector("#item_list").innerHTML = '<p class="none">登録されている商品がありません.</p>';
    } else {
        document.querySelector("#item_list").innerHTML = "";
    }

    document.querySelector("#loading").style.display = "flex";

    requestAnimationFrame(function() {
        requestAnimationFrame(function() {
            let number = [];
            let dupli = new Set();
            let count = 0;
            let elem = ``;

            for (let item of items) {
                dupli.add(Number(item[0]));
                if (dupli.size != count + 1) {
                    number.push(Number(item[0]));
                } else {
                    count++;
                }
            }
            number = Array.from(new Set(number));

            for (let item of items) {
                if (item[1] == "onsale") {
                    onsale.push(item);
                } else {
                    sold.push(item);
                }
            }

            for (let item of onsale) {
                if (number.indexOf(Number(item[0])) == -1) {
                    elem = `<div class="item" data-id="${item[4]}"><div><p>${item[0]}</p></div><div><p>販売中</p></div><div><p>${item[2]}</p></div><div><p>￥${Number(item[3].slice(1)).toLocaleString()}</p></div></div>`;
                } else {
                    elem = `<div class="item" data-id="${item[4]}"><div class="number_err"><p>${item[0]}</p></div><div><p>販売中</p></div><div><p>${item[2]}</p></div><div><p>￥${Number(item[3].slice(1)).toLocaleString()}</p></div></div>`;
                }
                document.querySelector("#item_list").insertAdjacentHTML("beforeend", elem);
            }

            for (let item of sold) {
                if (number.indexOf(Number(item[0])) == -1) {
                    elem = `<div class="item sold" data-id="${item[4]}"><div><p>${item[0]}</p></div><div><p>販売済</p></div><div><p>${item[2]}</p></div><div><p>￥${Number(item[3].slice(1)).toLocaleString()}</p></div></div>`;
                } else {
                    elem = `<div class="item sold" data-id="${item[4]}"><div class="number_err"><p>${item[0]}</p></div><div><p>販売済</p></div><div><p>${item[2]}</p></div><div><p>￥${Number(item[3].slice(1)).toLocaleString()}</p></div></div>`;
                }
                document.querySelector("#item_list").insertAdjacentHTML("beforeend", elem);
            }

            info(onsale, sold);

            document.querySelector("#loading").style.display = "none";
        });
    });
}

function delete_item() {
    let item_id = $("#name_edit").attr('data-id');
    items.splice(items.indexOf(items.filter( e => e[4] === item_id)[0]), 1);
    
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
    document.querySelector('#compatibility_chk').style.display = "none";
}

$(document).on('click', '.item', function() {
    if ($(this).hasClass('sold')) {
        $("input[value='sold']").prop("checked",true);
    } else {
        $("input[value='onsale']").prop("checked",true);
    }
    edit_view($(this).find('div').eq(0).text(), $(this).find('div').eq(2).text(), $(this).find('div').eq(3).text().slice(1).replace(",", ""), $(this).attr('data-id'));
});

function unused_number(call) {
    if (items.length == 0) {
        return;
    }

    let lists = [];

    for (let i = 0; i < items.length; i++) {
        if (Number(items[i][0]) != Number(items[0][0]) + i) {
            for (let n = 1; n < Number(items[i][0]) - Number(items[i - 1][0]); n++) {
                lists.push(Number(items[i-1][0]) + n)
            }
        }
    }

    if (items[0][0] != '1') {
        for (let i = 1; i < Number(items[0][0]); i++) {
            lists.unshift(i);
        }
    }

    if (call == "register") {
        document.querySelector("#unused_number_register").innerHTML = "";
        for (let list of lists) {
            let elem = `<option value="${list}"></option>`;
            document.querySelector("#unused_number_register").insertAdjacentHTML("beforeend", elem);
        }
    } else {
        document.querySelector("#unused_number_edit").innerHTML = "";
        for (let list of lists) {
            let elem = `<option value="${list}"></option>`;
            document.querySelector("#unused_number_edit").insertAdjacentHTML("beforeend", elem);
        }
    }
}