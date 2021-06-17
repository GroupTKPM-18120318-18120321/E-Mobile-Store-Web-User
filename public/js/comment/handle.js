
function postComment(){
    const url = window.location.href;
    const inpTxtComment = document.getElementById("inpTxtComment");
    const inptTxtName = document.getElementById("inpTxtName");
    const avatar= document.getElementById("inpAvatar");
    if (inpTxtComment.value === "" || inptTxtName==="") {
        return;
    }

    let postBody = "";

    postBody += "txtComment=" + inpTxtComment.value;
    postBody += "&nameUser="+inptTxtName.value;
    if(avatar.value!="")
        postBody += "&avatar="+avatar.value;
    
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            inpTxtComment.value = "";
            const data = JSON.parse(this.responseText);

            try {
                const script = document.getElementById("templateComment").innerHTML;
                const template = Handlebars.compile(script);
                const render = template(data);
                document.getElementById("collapse-1").innerHTML = render;
            } catch (err) {
                alert("ERROR");
            }
        }
    };


    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(postBody);
}



function getPageComment(page){
    const url = window.location.href + "/loadPageComment?page=" + page;
    const partialComment = document.getElementById("collapse-1");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);

            try {
                const script = document.getElementById("templateComment").innerHTML;
                const template = Handlebars.compile(script);
                const render = template(data);
                partialComment.innerHTML = render;
                //partialComment.scrollTop=0;
                document.getElementById("Comment").scrollIntoView();
            } catch (err) {
                alert("ERROR");
            }
        }
    };


    xhttp.open("GET", url, true);
    xhttp.send();
}

function loadChildComment(idParentComment){
    const url = window.location.href + "/loadChildComment?idParentComment=" +idParentComment;
    const partialComment = document.getElementById(idParentComment);
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);

            try {
                const script = document.getElementById("templateChildComment").innerHTML;
                const template = Handlebars.compile(script);
                const render = template(data);
                partialComment.innerHTML = render;
                //partialComment.scrollTop=0;
                //document.getElementById("Comment").scrollIntoView();
            } catch (err) {
                alert("ERROR");
            }
        }
    };


    xhttp.open("GET", url, true);
    xhttp.send();
}

function postChildComment(idParentComment){
    const url = window.location.href;
    const inpTxtChildComment = document.getElementById("inpTxtChild"+idParentComment);
    const avatar= document.getElementById("inpAvatar");
    const inptTxtName = document.getElementById("inpTxtName");
    
    if (inpTxtChildComment.value === "" || inptTxtName==="") {
        return;
    }

    let postBody = "";

    postBody += "txtComment=" + inpTxtChildComment.value;
    postBody += "&idParentComment=" + idParentComment;
    postBody += "&nameUser="+inptTxtName.value;
    if(avatar.value!="")
        postBody += "&avatar="+avatar.value;
    //postBody += "&nameUser="+inptTxtName.value;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            inpTxtChildComment.value = "";
            const data = JSON.parse(this.responseText);

            try {
                const script = document.getElementById("templateComment").innerHTML;
                const template = Handlebars.compile(script);
                const render = template(data);
                document.getElementById("collapse-1").innerHTML = render;
            } catch (err) {
                alert("ERROR");
            }
        }
    };

    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(postBody);
}

