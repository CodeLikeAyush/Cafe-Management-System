// <!-- ++++++++++++++++++++++++++++++++++++++++++++++++fetch all products script++++++++++++++++++++++++++++++++++++++++++++++++ -->


async function fetchProdForOrder(event) {
    try {
        let res = await fetch("/admin/create_order");
        var products = await res.json();
        // console.log(products)

        window.sessionStorage.setItem('order_page_prod_info', JSON.stringify(products));
        
        let str1 = "";
        products.forEach(product => {
            let str = `<option value="${product.prod_name}" id=${product.prod_id}>`
            str1 += str
        });

        document.getElementById('order_prod_list').innerHTML = str1
    } catch (err) {
        console.log(err)
    }

}