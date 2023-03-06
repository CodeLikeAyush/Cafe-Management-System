
const login_form = document.querySelector("#login_form");
login_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let formdata = new FormData(login_form);

    const email = formdata.get('email').toUpperCase();
    const passw = formdata.get('password');
    const passw_repeat = formdata.get('password-repeat');


    try {
        const rawResponse = await fetch('/login', {
            method: 'post',
            body: formdata
        });
        // console.log(rawResponse.redirected);
        // console.log(rawResponse.url);
        if (rawResponse.redirected == true) {
            window.location = rawResponse.url;
            return;
        }
        const content = await rawResponse.json();


        console.log(content);
        alert(content.message)


    } catch (err) {
        console.log(err)
    }
})
