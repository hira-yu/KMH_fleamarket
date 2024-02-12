function compatibility_chk() {
    if (items[0].length !=5) {
        if (items[0].length == 4) {
            document.querySelector('#compatibility_chk').style.display = "flex";

            document.querySelector("#compatibility_chk > div > h3").innerText = '商品データの互換性がありません';
            document.querySelector("#item_list").innerHTML = '<p class="none">商品データ互換エラーのため表示できません.</p>';

            let elem = `<p>内部保存されている商品データは、現在のシステムバージョンと互換性がありません<br>非互換原因は以下の通りです<br>・管理Noを読み込めない<br><br>以下のいずれかの方法で回復できます<br>・商品データを初期化する(保存されているデータは失われます)<br>・システムによる商品データの変換を行う(管理Noは自動付与されます)<br><br>バックアップとして商品データをCSVで保存できます<br><br>ご不明点等がありましたら<a href="https://forms.gle/CVyJEt46SLEeaq198" target="_blank" rel="noopener noreferrer">問い合わせフォーム</a>または電話でご連絡ください</p>`;
            let convert_btn = `<button class="green multi" onclick="data_convert()"><p class="btn_str white">データ変換</p></button>`;
            document.querySelector('#compatibility_chk > div > div').insertAdjacentHTML("beforeend", elem);
            document.querySelector('#compatibility_chk > div > div > button:first-child').insertAdjacentHTML("afterend", convert_btn);
            return false;
        } else {
            document.querySelector('#compatibility_chk').style.display = "flex";

            document.querySelector("#compatibility_chk > div > h3").innerText = '商品データが破損しています';
            document.querySelector("#item_list").innerHTML = '<p class="none">商品データ破損のため表示できません.</p>';

            let elem = `<p>内部保存されている商品データの破損を検出しました<br>回復するには商品データの初期化を行ってください<br><br>何度も発生する場合は<a href="https://forms.gle/CVyJEt46SLEeaq198" target="_blank" rel="noopener noreferrer">問い合わせフォーム</a>または電話でご連絡ください</p>`;
            document.querySelector('#compatibility_chk > div > div').insertAdjacentHTML("beforeend", elem);
            return false;
        }
    }
    return true;
}

function data_convert() {
    if (document.querySelector(".err") != null) { document.querySelector(".err").remove(); }

    for (let i = 0; i < items.length; i++) {
        items[i].unshift(i + 1);
    }

    try {
        set_localstrage();
    } catch {
        document.querySelector("#compatibility_chk > div > div:nth-child(2)").insertAdjacentHTML('afterend', `<p class="err">変換エラー</p>`);
        load_localstrage();
        return;
    }
    load_localstrage();
    item_view();

    document.querySelector('#compatibility_chk').style.display = "none";
}