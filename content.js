const btn = document.getElementById('myCheck');
// On mouse-over, execute myFunction
function myFunction() {
    document.body.style.backgroundColor = "red";
    // console.log('hi');
    // alert('bye');
}

if (btn) {
    btn.addEventListener('click', myFunction);
}