
function populate_price(event) {
    // console.log("populate")
    // console.log(event.target.value)
    if (event.target.value != '') {
        document.querySelector('#item_quant').removeAttribute('disabled')
    }
    let prod_info = sessionStorage.getItem('order_page_prod_info')
    prod_info = (JSON.parse(prod_info))
    var found = prod_info.find(function (element) {
        return element.prod_name === event.target.value;
    });
    // console.log(found.unit_price)
    document.querySelector('#item_quant').value = 1;
    document.querySelector('#item_price').value = found.unit_price;
    document.querySelector('#total_price').value = found.unit_price;
}