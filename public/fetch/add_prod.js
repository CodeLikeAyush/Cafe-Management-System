
const add_prod_form = document.querySelector("#add_prod_form");
add_prod_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let formdata = new FormData(add_prod_form);
    // const prod_id = document.getElementById("edit_modal_prod_info").children[0].innerText;
    // formdata.append("id", prod_id);
    // console.log([...(formdata.entries())])

    const prod_name = formdata.get('name').toUpperCase();
    const prod_categ = formdata.get('category').toUpperCase();
    const prod_desc = formdata.get('description').toUpperCase();
    const prod_price = formdata.get('price');
    // console.log(prod_name, prod_categ, prod_desc, prod_price)
    try {
        const rawResponse = await fetch('/admin/dashboard/manage_product/add_prod', {
            method: 'post',
            body: formdata
        });
        const content = await rawResponse.json();


        console.log(content);

        let newRow = `<tr id="prod_tr_${content.prod_id}" class = "prod">
        <td>${prod_name.toUpperCase()}</td>
        <td>${prod_categ.toUpperCase()}</td>
        <td>${prod_desc.toUpperCase()}</td>
        <td>${prod_price}</td>
        <td>
           <div style="display: flex;">
               <div style="display:none">
                   <span>${content.prod_id}</span>
                   <span></span>
               </div>
               <label class="switch"><input type="checkbox" checked onchange="toggleStock(event)"><span class="slider round" title="in stock?"></span></label>
               <span class="material-symbols-outlined delt_icon" title="delete product" onclick="delete_product(event)">delete</span>
               <span class="material-symbols-outlined edit_icon" title="edit product" onclick="editProduct(event)">edit</span>
           </div>
       </td>
   </tr>`
        let prevRows = document.getElementById('productTable').children[0].innerHTML;

        prevRows += newRow;
        document.getElementById("productTable").innerHTML = prevRows;

        document.getElementById('id05').style.display = 'none';

        alertMessage(content.status, content.message);

    } catch (err) {
        console.log(err)
    }
})
