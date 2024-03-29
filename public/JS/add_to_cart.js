let fo = document.querySelector('#prod_detail_form');
fo.addEventListener('submit', (event) => {
    event.preventDefault();

    data = new FormData(fo);
    // console.log([...(data.entries())])

    let item = data.get('item');
    let quant = data.get('quantity');
    function getItemId(item) {
        const storedData = JSON.parse(sessionStorage.getItem('order_page_prod_info'));

        storedData.forEach(data => {

        });

        const check = function (prod_info) {
            return prod_info.prod_name === item;
        }
        let found = storedData.find(check);

        return parseInt(found.prod_id);
        // console.log(found)
    }
    let item_id = getItemId(item)
    // console.log(item_id)

    // getting the session storage:
    let stored_order = window.sessionStorage.getItem('order_items');

    // initializing order_info:
    let order_info;
    if (stored_order == null) { // if session storage is empty then initialize order_info with empty array
        order_info = [];
    }
    else {// if session storage is not empty then initialize order_info with stored value parsed into array
        order_info = JSON.parse(stored_order);
    }

    // create new object from the form data
    let new_order = { item: item, quantity: quant, item_id: item_id };

    // check if the new-order is already present in the order stored in localstorage:
    const check = function (order) {
        return order.item === new_order.item;
    }
    let found = order_info.find(check);

    // if new-order is not stored already, then push it in order_info:
    if (!found) {
        order_info.push(new_order);
    }

    // store the order_info into the localStorage:
    window.sessionStorage.setItem('order_items', JSON.stringify(order_info));

    // console.log(order_info)
    populateOrderTable();
    totalBill();
    alertMessage("success", "Item Added");


})