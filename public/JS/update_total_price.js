
function update_price(event) {
    // console.log(event.target.value)
    const price = parseInt(document.querySelector('#item_price').value);
    const quantity = parseInt(event.target.value);
    // console.log(price, quantity)

    document.querySelector("#total_price").value = price * quantity;

}