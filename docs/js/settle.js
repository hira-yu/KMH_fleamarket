function box_disp() {
    if (document.getElementById("detail_opt").checked) {
        document.querySelector("#sga_money_box").style.display = 'flex';
        document.querySelector("#profit_box").style.display = 'flex';
        document.querySelector("#income_box").style.display = 'flex';
        document.querySelector("#result_box").style.display = 'flex';
        document.querySelector("#margin_box").style.display = 'flex';
    } else {
        $("#sga_money_box").hide();
        $("#profit_box").hide();
        $("#income_box").hide();
        $("#result_box").hide();
        $("#margin_box").hide();
    }
}

$(document).on("keyup", "#start_money, #now_money, #sga_money", function () {
    settle();
});

$(document).on("change", "#detail_opt", function () {
    box_disp();
    settle();
});

function settle() {
    let regex = /[^0-9]/g;

    let start_money = $("#start_money").val();
    let now_money = $("#now_money").val();
    let sga_money = $("#sga_money").val();
    let sold_money = $("#sold_money").text().slice(0, -1).replace(regex, "");
    let profit = 0;
    let _profit = 0;
    let income = 0;
    let _income = 0;
    let result = 0;
    let _result = 0;
    let _diff = 0;
    let diff = 0;
    let margin = 0;
    let check = document.getElementById("detail_opt").checked;

    box_disp();

    if (start_money != '' && now_money != '' && sga_money != '') {
        _profit = Number(sold_money) - Number(sga_money);
        _income = Number(now_money) - Number(start_money) - Number(sold_money);
        _result = Number(_profit) + Number(_income);
        _diff = Number(now_money) - Number(start_money);
        margin = (_profit / sold_money * 100).toFixed(2);
    } else if (start_money != '' && now_money != '' && sga_money == '' && !check) {
        _diff = Number(now_money) - Number(start_money);
    }

    if (_profit < 0) {
        profit = "△" + (_profit * -1).toLocaleString();
    } else {
        profit = (_profit).toLocaleString();
    }

    if (_income < 0) {
        income = "△" + (_income * -1).toLocaleString();
    } else {
        income = (_income).toLocaleString();
    }

    if (_result < 0) {
        result = "△" + (_result * -1).toLocaleString();
    } else {
        result = (_result).toLocaleString();
    }

    if (_diff < 0) {
        diff = "△" + (_diff * -1).toLocaleString();
    } else {
        diff = (_diff).toLocaleString();
    }

    $('#profit').text(profit + "円");
    $('#income').text(income + "円");
    $('#result').text(result + "円");
    $('#diff').text(diff + "円");
    $('#margin').text(margin + "%");
}
