
const frm = document.querySelector("#edit_prod_form_");
frm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let formdata = new FormData(frm);
    const prod_id = document.getElementById("edit_modal_prod_info").children[0].innerText;
    formdata.append("id", prod_id);
    // console.log([...(formdata.entries())])

    const prod_name = formdata.get('name').toUpperCase();
    const prod_categ = formdata.get('category').toUpperCase();
    const prod_desc = formdata.get('description').toUpperCase();
    const prod_price = formdata.get('price');
    // console.log(prod_name, prod_categ, prod_desc, prod_price)
    try {
        const rawResponse = await fetch('/admin/dashboard/manage_product/edit_prod', {
            method: 'post',
            body: formdata
        });
        const content = await rawResponse.json();

        // console.log(document.getElementById(`prod_tr_${prod_id}`))
        document.getElementById(`prod_tr_${prod_id}`).children[0].innerText = prod_name;
        document.getElementById(`prod_tr_${prod_id}`).children[1].innerText = prod_categ;
        document.getElementById(`prod_tr_${prod_id}`).children[2].innerText = prod_desc;
        document.getElementById(`prod_tr_${prod_id}`).children[3].innerText = prod_price;

        document.getElementById('id04').style.display = 'none';

        console.log(content);
    } catch (err) {
        console.log(err)
    }
})
