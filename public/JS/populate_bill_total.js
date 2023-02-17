function totalBill(event) {
    // get the cart items stored in session-storage:
    const products = JSON.parse(sessionStorage.getItem('order_items'));

    // if no item in storage and this function is has been called because we are just navigating through vertical navigation then nothing to do and so return:
    if (products == null && event.target.classList.contains('tablinks')) {
        return;
    }

    // get info about all the available products from local storage:
    let info = JSON.parse(window.sessionStorage.getItem('order_page_prod_info'));



    let sum = 0;
    products.forEach(product => {
        let quantity;
        let price;
        quantity = product.quantity;

        // callback function to find the ordered product info from all the products:
        const check = function (prod) {
            return prod.prod_name === product.item;
        }
        // finding the ordered product from all products stored info:
        let found = info.find(check);

        price = found.unit_price;
        // price = quantity * price; and updating sum:
        sum += quantity * price;
    });

    // updating the value of total bill in the page:
    document.querySelector('#total_bill').value = sum;


}