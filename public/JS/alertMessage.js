
function alertMessage(status, message) {

    // add onclick event to dismis button(X) of the alert to dismis the alert: 
    var close = document.getElementsByClassName("closebtn");
    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.opacity = "0";
            setTimeout(function () { div.style.display = "none"; }, 100000);
        }
    }



    // grab all the alert div using class "alert":
    let alerts = document.querySelectorAll(".alert");



    // show for a moment and hide the alerts for various types of alerts(success, warning....etc.):
    if (status === "danger") {
        const danger_alert = alerts[0];
        danger_alert.children[2].innerText = message;
        danger_alert.style.display = "block";
        setTimeout(function () {
            danger_alert.style.opacity = "0"
            setTimeout(() => {
                danger_alert.style.display = "none";
            }, 1000);
        }, 1000);
        danger_alert.style.opacity = "initial"
        danger_alert.style.display = "initial"
    }
    else if (status === "success") {
        const success_alert = alerts[1];
        success_alert.children[2].innerText = message;
        success_alert.style.display = "block";
        setTimeout(function () {
            success_alert.style.opacity = "0"
            setTimeout(() => {
                success_alert.style.display = "none";
            }, 1000);
        }, 1000);
        success_alert.style.opacity = "initial"
        success_alert.style.display = "initial"
    }
    else if (status === "info") {
        const info_alert = alerts[2];
        info_alert.children[2].innerText = message;
        info_alert.style.display = "block";
        setTimeout(function () {
            info_alert.style.opacity = "0"
            setTimeout(() => {
                info_alert.style.display = "none";
            }, 1000);
        }, 1000);
        info_alert.style.opacity = "initial"
        info_alert.style.display = "initial"
    }
    else if (status === "warning") {
        const warning_alert = alerts[3];
        warning_alert.children[2].innerText = message;
        warning_alert.style.display = "block";
        setTimeout(function () {
            warning_alert.style.opacity = "0"
            setTimeout(() => {
                warning_alert.style.display = "none";
            }, 1000);
        }, 1000);
        warning_alert.style.opacity = "initial"
        warning_alert.style.display = "initial"
    }


}