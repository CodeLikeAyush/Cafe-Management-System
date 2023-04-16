
const add_categ_form = document.querySelector("#add_categ_form");
add_categ_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let formdata = new FormData(add_categ_form);
    // const prod_id = document.getElementById("edit_modal_prod_info").children[0].innerText;
    // formdata.append("id", prod_id);
    // console.log([...(formdata.entries())])

    const categ_name = formdata.get('category').toUpperCase();
    // const prod_categ = formdata.get('category').toUpperCase();
    // const prod_desc = formdata.get('description').toUpperCase();
    // const prod_price = formdata.get('price');
    // console.log(prod_name, prod_categ, prod_desc, prod_price)
    try {
        const rawResponse = await fetch('/admin/manage_category/add_category', {
            method: 'post',
            body: formdata
        });

        const content = await rawResponse.json();


        console.log(content);
        if (content.status == 'danger') {
            alertMessage(content.status, content.message);
            return;
        }

        let newRow = `
        <tr id="prod_tr_${content.categ_id}" class = "prod">
            <td>${categ_name.toUpperCase()}</td>
            <td>0</td>
            <td>
                <span class="material-symbols-outlined delt_icon" title="delete user" onclick="delete_category(event)">delete</span>
            </td>
   </tr>`
        let prevRows = document.getElementById('categTable').children[0].innerHTML;

        prevRows += newRow;
        document.getElementById("categTable").innerHTML = prevRows;

        // document.getElementById('id07').style.display = 'none';

        alertMessage(content.status, content.message);

    } catch (err) {
        console.log(err)
    }
})
