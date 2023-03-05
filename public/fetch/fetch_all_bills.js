// <!-- ++++++++++++++++++++++++++++++++++++++++++++++++fetch all bills script++++++++++++++++++++++++++++++++++++++++++++++++ -->

async function fetchBills(event) {
    try {
        let res = await fetch("/admin/view_bills");
        let bills = await res.json();
        console.log(bills)

        // Head of the table in str1:
        let str1 =
            `<tr class="header">
                    <th>Order Id</th>
                    <th>Customer Name</th>
                    <th>Email</th>
                    <th>Mobile No.</th>
                    <th>Amount (&#8377;)</th>
                    <th>View Bill</th>
            </tr>`;

        // we are appending other data rows of the table into str2:
        bills.forEach(bill => {
            str2 =
                // `<tr id="prod_tr_${bill.ord_id}" class = "prod">
                `<tr>
                         <td>${bill.ord_id}</td>
                         <td>${bill.cust_name.toUpperCase()}</td>
                         <td>${bill.email}</td>
                         <td>${bill.mob_no}</td>
                         <td>${bill.bill_amount}</td>
                         <td>
                         <a href="/bills_pdf/bill_${bill.ord_id}.pdf" target="_blank">
                            <span class="material-symbols-outlined" title="view bill">
                                description
                            </span>
                         </a>
                        </td>
                    </tr>`;

            str1 += str2;

        });
        // injecting (head and data) rows into the table body:
        document.getElementById("billsTable").innerHTML = str1;

    } catch (err) {
        console.log(err)
    }

}