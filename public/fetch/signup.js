
const signup_form = document.querySelector("#signup_form");
signup_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let formdata = new FormData(signup_form);

    // const name = formdata.get('name').toUpperCase();
    const email = formdata.get('email').toUpperCase();
    const passw = formdata.get('password');
    const passw_repeat = formdata.get('password-repeat');

    if (passw != passw_repeat) {
        window.alert("Password not maching");
        return;
    }
    try {
        const rawResponse = await fetch('/signup', {
            method: 'post',
            body: formdata
        });
        const content = await rawResponse.json();


        console.log(content);


        document.getElementById('id02').style.display = 'none';
        alert(content.message);


    } catch (err) {
        console.log(err)
    }
})
