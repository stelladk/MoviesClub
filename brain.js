function search(value) {

}

function bookm(element) {
    // alert("booya");
    if (element.children[0].className == "fa fa-bookmark-o") {
        element.children[0].className = "fa fa-bookmark";
    } else {
        element.children[0].className = "fa fa-bookmark-o";
        f = 0;
    }
}