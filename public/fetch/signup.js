
const signup_form = document.querySelector("#signup_form");
signup_form.addEventListener('submit', async (event) => {
    event.preventDefault();

    let formdata = new FormData(signup_form);
    // const prod_id = document.getElementById("edit_modal_prod_info").children[0].innerText;
    // formdata.append("id", prod_id);
    // console.log([...(formdata.entries())])

    const name = formdata.get('name').toUpperCase();
    // const mob_no = formdata.get('contactNumber').toUpperCase();
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

        //     let newRow = `<tr id="prod_tr_${content.prod_id}" class = "prod">
        //         <td>${prod_name.toUpperCase()}</td>
        //         <td>${prod_categ.toUpperCase()}</td>
        //         <td>${prod_desc.toUpperCase()}</td>
        //         <td>${prod_price}</td>
        //         <td>
        //            <div style="display: flex;">
        //                <div style="display:none">
        //                    <span>${content.prod_id}</span>
        //                    <span></span>
        //                </div>
        //                <label class="switch"><input type="checkbox" checked onchange="toggleStock(event)"><span class="slider round" title="in stock?"></span></label>
        //                <span class="material-symbols-outlined delt_icon" title="delete product" onclick="delete_product(event)">delete</span>
        //                <span class="material-symbols-outlined edit_icon" title="edit product" onclick="editProduct(event)">edit</span>
        //            </div>
        //        </td>
        //    </tr>`
        //     let prevRows = document.getElementById('productTable').children[0].innerHTML;

        //     prevRows += newRow;
        //     document.getElementById("productTable").innerHTML = prevRows;

        document.getElementById('id05').style.display = 'none';


    } catch (err) {
        console.log(err)
    }
})
