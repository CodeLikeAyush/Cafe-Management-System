// <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++remove item from cart script++++++++++++++++++++++++++++++++++ -->
async function remove_item(event) {

    const products = JSON.parse(sessionStorage.getItem('order_items'));
    // console.log(products)
    let id = (event.target.parentElement.parentElement.parentElement).getAttribute('id');


    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        if (product.item_id == id.substring(7,)) {
            products.splice(i, 1);
            break;

        }
    }
    // console.log(products)
    window.sessionStorage.setItem('order_items', JSON.stringify(products));
    populateOrderTable();
    totalBill();

    alertMessage("warning", "Item Removed");


}