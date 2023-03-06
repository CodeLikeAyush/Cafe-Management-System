
// <!-- ++++++++++++++++++++++++++++++++++++++++++++++++++delete product script++++++++++++++++++++++++++++++++++ -->
async function delete_category(event) {
    // console.log(event.target.parentElement.parentElement.id)
    const id = event.target.parentElement.parentElement.id;
    const category_id = id.slice(8,);
    try {
        const rawResponse = await fetch('/admin/manage_category/delete_category', {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ categ_id: category_id })
        });
        const content = await rawResponse.json();
        (event.target.parentElement.parentElement).remove();

        alertMessage(content.status, content.message);
        console.log(content);

    } catch (err) {
        console.log(err)
    }
}