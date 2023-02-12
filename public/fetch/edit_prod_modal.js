// <!-- ++++++++++++++++++++++++++edit product script+++++++++++++++++++++++++++++++ -->
async function editProduct(event) {

    // get Values from product TABLE:
    const prod_id = event.target.parentElement.parentElement.children[0].children[0].children[0].innerText;
    let prod_name = event.target.parentElement.parentElement.parentElement.children[0].innerText;
    // const categ_id = event.target.parentElement.parentElement.children[0].children[1].children[1].innerText;
    let prod_desc = event.target.parentElement.parentElement.parentElement.children[2].innerText;
    let prod_price = event.target.parentElement.parentElement.parentElement.children[3].innerText;
    // console.log(prod_id, prod_name, categ_id, prod_desc, prod_price)
    // console.log(categ_id)

    // grab edit-product-modal input fields:
    let prod_id_input = document.getElementById("edit_modal_prod_info").children[0];
    // let categ_id_input = document.getElementById("edit_modal_prod_info").children[1]
    let name_input = document.getElementById("prod_name")
    let desc_input = document.getElementById("desc")
    let price_input = document.getElementById("price")
    // let prod_id = document.querySelector("#edit_modal_prod_info").children[0];

    // set values in the edit-product-modal input fiels:
    prod_id_input.innerText = prod_id;
    // categ_id_input.innerText = categ_id;
    name_input.value = prod_name;
    desc_input.value = prod_desc;
    price_input.value = prod_price;
    // console.log(prod_id_input)
    // console.log(categ_id_input)

    document.getElementById('id04').style.display = 'block';
    try {
        // fetching all category names and embedding it in option for choosing category in edit product modal:
        let res = await fetch("/admin/dashboard/manage_product/edit_prod");
        let data = await res.json();

        // console.log(data)
        let str1 = "";
        data.forEach(element => {
            let str = `<option value="${element.category_name}" class=${element.category_id}>`
            str1 += str
        });
        document.getElementById('categ_list').innerHTML = str1


    } catch (err) {
        console.log(err)
    }
}