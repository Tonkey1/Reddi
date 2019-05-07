//set the current tab as 0
var currentTab = 0;
showTab(currentTab);

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("previous-button").style.display = "none";    //dont show the previous button on the first page or the last
    }
    else {
        document.getElementById("previous-button").style.display = "inline";
    }
    if (n != (x.length - 1)) {
        document.getElementById("next-button").innerHTML = "Next";
    }
    else {
        document.getElementById("next-button").innerHTML = "Submit";
    }
    progressbarcnt(n)
}

function nextPage(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        document.getElementById("lsignup").submit();
        return false;
    }
    showTab(currentTab);
}
//to check whether the form is valid
function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
    }

    if (valid) {
        document.getElementsByClassName("progressbar")[currentTab].className += " finish";
    }
    return valid;
}

function progressbarcnt(n) {
    var i, x = document.getElementsByClassName("progressbar");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}