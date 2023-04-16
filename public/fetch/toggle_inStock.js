
// < !-- +++++++++++++++++++++++++++++++++++++++++++ Toggle inStock script+++++++++++++++++++++++++++++++++++++ -->
async function toggleStock(event) {
    const inStock = event.target.checked;
    const id = event.target.parentElement.parentElement.children[0].children[0].innerText;

    // console.log(id)
    // console.log(inStock)
    try {
        const rawResponse = await fetch('/admin/manage_product/toggleStock', {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inStock: inStock, id: id })
        });
        console.log(rawResponse)

        // if (rawResponse.redirected == true) {
        //     window.location = rawResponse.url;
        //     return;
        // }
        const content = await rawResponse.json();

        console.log(content);
        alertMessage(content.status, content.message);

    } catch (err) {
        console.log(err)
    }


}