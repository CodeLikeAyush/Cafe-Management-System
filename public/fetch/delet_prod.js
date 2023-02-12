// <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++delete product script++++++++++++++++++++++++++++++++++ -->
async function delete_product(event) {
    // console.log(event.target.parentElement.children[0].children[0])
    const prod_id = event.target.parentElement.children[0].children[0].innerText;
    try {
        const rawResponse = await fetch('/admin/dashboard/manage_product/delete_product', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prod_id: prod_id })
        });
        const content = await rawResponse.json();

        // console.log(content);
        (event.target.parentElement.parentElement.parentElement).style.display = "none";
    } catch (err) {
        console.log(err)
    }
}