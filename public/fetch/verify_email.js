
const verify_email_form = document.querySelector("#verify_email_form");
verify_email_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let formdata = new FormData(verify_email_form);

    


    try {
        const rawResponse = await fetch('/verify', {
            method: 'post',
            body: formdata
        });
        // console.log(rawResponse.redirected);
        // console.log(rawResponse.url);
        // if (rawResponse.redirected == true) {
        //     window.location = rawResponse.url;
        //     return;
        // }
        const content = await rawResponse.json();


        console.log(content);
        alert(content.message)


    } catch (err) {
        console.log(err)
    }
})
