function downloadcsv() {
    let date = new Date();
    let year = date.getFullYear();
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = date.getDate();
    let date_obj = year + month + day;
    const filename = `freemarket_item_list_${date_obj}.csv`;

    const header = "状態,品名,売価,内部管理ID\r\n"
    let data = header;

    for (let item of items) {
        data += item[0] + ",";
        data += unsanitize(item[1]) + ",";
        data += item[2] + ",";
        data += item[3];

        data += "\r\n";
    }

    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const blob = new Blob([bom, data], { type: "text/csv" });

    if (window.navigator.msSaveBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        const url = (window.URL || window.webkitURL).createObjectURL(blob);
        const download = document.createElement("a");
        download.href = url;
        download.download = filename;
        download.click();
        (window.URL || window.webkitURL).revokeObjectURL(url);
    }
}

function setfile() {
    $("#file").click();
}

$("#file").change(function() {
    let file = $(this).get(0).files[0];
    let filereader = new FileReader();
    let err = false;
    let code = 200;
    let regex = /[^0-9]/g;

    if (document.querySelector(".err") != null) { document.querySelector(".err").remove(); }

    if (!file.name.includes(".csv")) {
        document.querySelector("#register > div > div:nth-child(4)").insertAdjacentHTML('afterend', `<p class="err">読み込みエラー (${code})</p>`); 
        return;
    }

    filereader.addEventListener('load', function(e) {        
        let codes = new Uint8Array(e.target.result);
        let encoding = Encoding.detect(codes);
        
        let unicodeString = Encoding.convert(codes, {
            from: encoding,
            to: 'UNICODE',
            type: 'string',
        });

        let item_datas = unicodeString.split(/\r\n/);

        if (item_datas[0] != "状態,品名,売価,内部管理ID") {
            document.querySelector("#register > div > div:nth-child(4)").insertAdjacentHTML('afterend', '<p class="err">読み込みエラー (299)</p>'); 
            return;
        }

        item_datas.shift();
        item_datas.pop();

        console.log(item_datas.length);

        if (item_datas.length == 0) {
            document.querySelector("#register > div > div:nth-child(4)").insertAdjacentHTML('afterend', '<p class="err">読み込みエラー (290)</p>'); 
            return;
        }

        for (let item of item_datas) {
            item = item.split(/, |,/);

            if (item.length != 4) {
                code += 1;
                document.querySelector("#register > div > div:nth-child(4)").insertAdjacentHTML('afterend', `<p class="err">読み込みエラー (${code})</p>`); 
                return;
            }
            
            item[1] = sanitize(item[1]);
            item[2] = "￥" + item[2].replace(regex, "");

            if (!(item[0] == "onsale" || item[0] == "sold")) {
                err = true;
                code += 2;
            }

            if (item[1] == '') {
                err = true;
                code += 4;
            }
        
            if (item[2].replace(regex, "") == '') {
                err = true;
                code += 8;
            }
            
            if (item[2].replace(regex, "").length > 4) {
                err = true;
                code += 16;
            }
        
            if (err) { 
                document.querySelector("#register > div > div:nth-child(4)").insertAdjacentHTML('afterend', `<p class="err">読み込みエラー (${code})</p>`); 
                return;
            }

            item[3] = id_gen();

            items.push(item);
        }

        set_localstrage();
        load_localstrage();
        item_view();
        document.querySelector("#register").style.display = "none";
        document.querySelector("#name_register").value = "";
        document.querySelector("#price_register").value = "";
    });

    document.querySelector("#file").value = "";
    console.log(file);
    filereader.readAsArrayBuffer(file);
})