checkConn();

function search(value) {
    
}
function signout(value) {
    var r = confirm("Would you like to sign out?")
    if (r == true) {
      log_in_out(false);
    }
}

function login(){
    log_in_out(true);
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

function log_in_out(f){
    sessionStorage.setItem('connected',f);
    checkConn();    
    window.location.reload();
}

function checkConn(){
    var connected=sessionStorage.getItem('connected');
    if(connected==null){
        sessionStorage.setItem('connected',false);
        connected=false;
    }
    if(connected=="true"){
        document.getElementById("signup_btn").style.display="none";
        document.getElementById("login_btn").style.display="none";
        document.getElementById("bookm_btn").style.display="list-item";
        document.getElementById("profile_btn").style.display="list-item";
    }else{
        document.getElementById("signup_btn").style.display="list-item";
        document.getElementById("login_btn").style.display="list-item";
        document.getElementById("bookm_btn").style.display="none";
        document.getElementById("profile_btn").style.display="none";
    }
}