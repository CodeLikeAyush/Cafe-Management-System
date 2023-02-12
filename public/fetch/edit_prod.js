
const frm = document.querySelector("#edit_prod_form_");
frm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let formdata = new FormData(frm);
    const prod_id = document.getElementById("edit_modal_prod_info").children[0].innerText;
    formdata.append("id", prod_id);
    console.log([...(formdata.entries())])
    // let id_input = document.getElementById("prod_id").value;
    // let name_input = document.getElementById("prod_name").value;
    // let categ_input = document.getElementById("product_categ").value;
    // let desc_input = document.getElementById("desc").value;
    // let price_input = document.getElementById("price").value;
    // console.log(id_input, name_input, categ_input, desc_input, price_input)
    // console.log(categ_input)
    try {
        const rawResponse = await fetch('/admin/dashboard/manage_product/edit_prod', {
            method: 'post',
            body: formdata
        });
        const content = await rawResponse.json();
        document.getElementById('id04').style.display = 'block';
        window.location.reload();
        console.log(content);
    } catch (err) {
        console.log(err)
    }
})




// const btn = document.querySelector('#submit');
// const form = document.querySelector('#edit_prod_form_');


// form.addEventListener('submit', (e) => {
//     // prevent the form from submitting
//     e.preventDefault();

//     // show the form values
//     const formData = new FormData(form);
//     // const values = [...formData.entries()];
//     // console.log(values);
//     console.log(formData)
// });