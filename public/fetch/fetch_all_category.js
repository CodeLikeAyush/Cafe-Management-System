// <!-- ++++++++++++++++++++++++++++++++++++++++++++++++fetch all products script++++++++++++++++++++++++++++++++++++++++++++++++ -->

async function fetchCategory(event) {
    try {
        let res = await fetch("/admin/manage_category");
        let categories = await res.json();
        // console.log(products)

        // Head of the table in str1:
        let str1 =
            `<tr class="header">
            <th>Category Name</th>
            <th>Total Products</th>
            <th>Delete Category</th>
    
        </tr>`;

        // we are appending other data rows of the table into str2:
        categories.forEach(category => {
            str2 =
                `<tr id="prod_tr_${category.categ_id}" class = "prod">
                         <td>${category.categ_name.toUpperCase()}</td>
                         <td>${category.prod_count}</td>
                         <td>
                         <span class="material-symbols-outlined delt_icon" title="delete user" onclick="delete_category(event)">delete</span>
                        </td>
                    </tr>`;

            str1 += str2;

        });
        // injecting (head and data) rows into the table body:
        document.getElementById("categTable").innerHTML = str1;

    } catch (err) {
        console.log(err)
    }

}