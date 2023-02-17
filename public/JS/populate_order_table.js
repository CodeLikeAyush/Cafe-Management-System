function populateOrderTable(event) {

    const products = JSON.parse(sessionStorage.getItem('order_items'));

    if (products == null && event.target.classList.contains('tablinks')) {
        return;
    }

    function getPrice(item) {
        const storedData = JSON.parse(sessionStorage.getItem('order_page_prod_info'));

        storedData.forEach(data => {

        });

        const check = function (prod_info) {
            return prod_info.prod_name === item;
        }
        let found = storedData.find(check);

        return parseInt(found.unit_price);
        // console.log(found)
    }
    // Head of the table in str1:
    let str1 =
        `<tr class="header">
            <th>Item</th>
            <th>Price (&#8377;)</th>
            <th>Quantity</th>
            <th>Total (&#8377;)</th>
            <th>Delete</th>
    </tr>`;

    // we are appending other data rows of the table into str2:
    products.forEach(product => {
        str2 =
            `<tr id="ord_tr_${product.prod_id}" class = "prod">
                 <td>${product.item.toUpperCase()}</td>
                 <td>${getPrice(product.item)}</td>
                 <td>${product.quantity}</td>
                 <td>${parseInt(product.quantity) * (getPrice(product.item))}</td>
                 <td>
                    <div style="display: flex;">
                        <div style="display:none">
                            <span>${product.prod_id}</span>
                            <span>${product.categ_id}</span>
                        </div>
                        <span class="material-symbols-outlined delt_icon" title="delete product" onclick="delete_product(event)">delete</span>
                    </div>
                </td>
            </tr>`;

        str1 += str2;

    });
    // injecting (head and data) rows into the table body:
    document.getElementById("orderTable").innerHTML = str1;
}