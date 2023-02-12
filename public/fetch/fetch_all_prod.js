// <!-- ++++++++++++++++++++++++++++++++++++++++++++++++fetch all products script++++++++++++++++++++++++++++++++++++++++++++++++ -->

async function fetchProducts(event) {
    try {
        let res = await fetch("/admin/dashboard/manage_product");
        let products = await res.json();
        // console.log(products)

        // Head of the table in str1:
        let str1 =
            `<tr class="header">
                    <th>Name</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Price ( &#8377; )</th>
                    <th>Action</th>
            </tr>`;

        // we are appending other data rows of the table into str2:
        products.forEach(product => {
            str2 =
                `<tr id=${product.product_id} class = "prod">
                         <td>${product.product_name.toUpperCase()}</td>
                         <td>${product.category_name.toUpperCase()}</td>
                         <td>${product.product_description.toUpperCase()}</td>
                         <td>${product.price}</td>
                         <td>
                            <div style="display: flex;">
                                <div style="display:none">
                                    <span>${product.product_id}</span>
                                    <span>${product.category_id}</span>
                                </div>
                                <label class="switch"><input type="checkbox" ${product.in_stock ? "checked" : " "} onchange="toggleStock(event)"><span class="slider round" title="in stock?"></span></label>
                                <span class="material-symbols-outlined delt_icon" title="delete product" onclick="delete_product(event)">delete</span>
                                <span class="material-symbols-outlined edit_icon" title="edit product" onclick="editProduct(event)">edit</span>
                            </div>
                        </td>
                    </tr>`;

            str1 += str2;

        });
        // injecting (head and data) rows into the table body:
        document.getElementById("myTable").innerHTML = str1;

    } catch (err) {
        console.log(err)
    }

}