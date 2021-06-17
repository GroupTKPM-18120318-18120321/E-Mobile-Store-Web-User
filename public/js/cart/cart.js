const addToCart = (idProduct)=>{
    const url="/payment/cart/add?idProduct="+idProduct;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {  
            const data = JSON.parse(this.responseText);

           
            // document.getElementById("numProduct").innerHTML=data.numProduct;
            document.getElementById("totalPrice").innerHTML=data.totalPrice;
            
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
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

const popCart = (idProduct)=>{
    const url="/payment/cart/pop?idProduct="+idProduct;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            
            // document.getElementById("numbercart")=data.numProduct;
            // document.getElementById("numProduct").innerHTML=data.numProduct;
            document.getElementById("totalPrice").innerHTML=data.totalPrice;
           
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
    const url="/payment/cart/remove?idProduct="+idProduct;
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            const data = JSON.parse(this.responseText);
            document.getElementById(idProduct).innerHTML = "";

            //document.getElementById("numbercart")=data.numProduct;
            document.getElementById("numProduct").innerHTML=data.numProduct;
            document.getElementById("totalPrice").innerHTML=data.totalPrice;

            if(data.numProduct=="0"){
                const script = document.getElementById("templateEmpty").innerHTML;
                const template = Handlebars.compile(script);
                const render = template();
                document.getElementById("cart").innerHTML=script;
            }

            
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}

const validateName = ()=>{
    let notify="";

    const name = document.getElementById("name");

    if(name.value==="")
        notify+="Tên người dùng không được bỏ trống <br>";

    document.getElementById("notify").innerHTML=notify;
   
    if(notify!="") {   
        document.getElementById("notify").display="block";
    }
    else 
        document.getElementById("notify").display="none";
}
const validatePhone= ()=>{
    let notify="";

    const name = document.getElementById("name");

    const phoneNumber = document.getElementById("phoneNumber");

    if(phoneNumber.value==="")
        notify+="Số điện thoại không được bỏ trống <br>";
    else if(phoneNumber.value.match("/^[0-9]+$/") || phoneNumber.value.length<9)
        notify+="Số điện thoại không hợp lệ <br>";
    document.getElementById("notify").innerHTML=notify;
    if(notify!="") {
        document.getElementById("notify").display="block";
    }
    else 
        document.getElementById("notify").display="none";
}

const validateCity = ()=>{
    let notify="";

    const city = document.getElementById("city");

    if(city.value==="")
        notify+="Tỉnh/Thành phố không được bỏ trống <br>";
    
    document.getElementById("notify").innerHTML=notify;
    if(notify!="") {

        document.getElementById("notify").display="block";
    }
    else 
        document.getElementById("notify").display="none";
}  

const validateDistrict = ()=>{
    let notify="";

    const district = document.getElementById("district");

    if(district.value==="")
        notify+="Quận/Huyện không được bỏ trống <br>";

    document.getElementById("notify").innerHTML=notify;

    if(notify!="") {

        document.getElementById("notify").display="block";
    }
    else 
        document.getElementById("notify").display="none";
}  
    
const validateSubDistrict = ()=>{
    let notify="";

    const subDistrict = document.getElementById("subDistrict");

    if(subDistrict.value==="")
        notify+="Xã/Thị trấn không được bỏ trống <br>";

    document.getElementById("notify").innerHTML=notify;

    if(notify!="") {
 
        document.getElementById("notify").display="block";
    }
    else 
        document.getElementById("notify").display="none";
}  

const validateStreet = ()=>{
    let notify="";

    const street = document.getElementById("street");

    if(street.value==="")
        notify+="Số nhà/Tên đường không được bỏ trống <br>";

    document.getElementById("notify").innerHTML=notify;

    if(notify!="") {
        document.getElementById("notify").display="block";
    }
    else 
        document.getElementById("notify").display="none";
}  
    
    
    
