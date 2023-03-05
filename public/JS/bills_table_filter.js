// <!-- ++++++++++++++++++++++++++++view-bills-table-list-filter-script+++++++++++++++++++++++++++++++++++++ -->

function filterBills() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("mybillInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("billsTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}