const addToCart = (idProduct)=>{
    const url="cart/add?idProduct="+idProduct;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {  
            const data = JSON.parse(this.responseText);

            //document.getElementById("numbercart")=data.numProduct;
            // document.getElementById("numProduct").innerHTML=data.numProduct;
            // document.getElementById("totalPrice").innerHTML=data.totalPrice;
        
            try {
                const script = document.getElementById("templateProduct").innerHTML;
                const template = Handlebars.compile(script);
                const render = template(
                    {
                        numProduct: data.numProduct,
                        cover: data.product.cover,
                        name: data.product.name,
                        _id: data.product._id,
                        quantity: data.product.quantity,
                        ftotal: data.product.ftotal, 
                    });
                
                console.log(document.getElementById(idProduct).innerHTML);
                document.getElementById(idProduct).innerHTML = render;
            } catch (err) {
                alert("ERROR");
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

const popCart = (idProduct)=>{
    const url="cart/pop?idProduct="+idProduct;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            
            //document.getElementById("numbercart")=data.numProduct;
            // document.getElementById("numProduct").innerHTML=data.numProduct;
            // document.getElementById("totalPrice").innerHTML=data.totalPrice;
            try {
            
                const script = document.getElementById("templateProduct").innerHTML;
                const template = Handlebars.compile(script);
                const render = template(
                    {
                        numProduct: data.numProduct,
                        cover: data.product.cover,
                        name: data.product.name,
                        _id: data.product._id,
                        quantity: data.product.quantity,
                        ftotal: data.product.ftotal, 
                    });
                
                document.getElementById(idProduct).innerHTML = render;
            } catch (err) {
                alert("ERROR");
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

const removeProduct = (idProduct)=>{
    //alert(idProduct);
    const url="cart/remove?idProduct="+idProduct;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            document.getElementById(idProduct).innerHTML = "";

            //document.getElementById("numbercart")=data.numProduct;
            document.getElementById("numProduct").innerHTML=data.numProduct;
            document.getElementById("totalPrice").innerHTML=data.totalPrice;
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}