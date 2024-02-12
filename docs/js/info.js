function info(onsale, sold) {
    let price_onsale = 0;
    let price_sold = 0;

    for (let item of onsale) {
        price_onsale += Number(item[3].slice(1));
    }

    for (let item of sold) {
        price_sold += Number(item[3].slice(1));
    }

    $('#all_items').text(onsale.length + sold.length);
    $('#all_amount').text((price_onsale + price_sold).toLocaleString());
    $('#onsale_items').text(onsale.length);
    $('#onsale_amount').text(price_onsale.toLocaleString());
    $('#sold_items').text(sold.length);
    $('#sold_amount').text(price_sold.toLocaleString());
}