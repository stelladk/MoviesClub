function search(value) {

}

function bookm() {
    // alert("booya");
    var f = 0;
    if (f == 0) {
        document.getElementsByClassName("fa fa-bookmark-o")[1].className = "fa fa-bookmark";
        f = 1;
    } else {
        document.getElementsByClassName("fa fa-bookmark")[1].className = "fa fa-bookmark-o";
        f = 0;
    }
}