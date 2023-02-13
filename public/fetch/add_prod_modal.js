// <!-- ++++++++++++++++++++++++++Add product modal script+++++++++++++++++++++++++++++++ -->
async function addProductModal(event) {

    document.getElementById('id05').style.display = 'block';

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