
exports.formatConcurency= (concurency)=>{
    let result="";
    const arr=[];
    let tmp;
    do{
        tmp=concurency%1000;
        arr.unshift(tmp==0?"000":tmp);
        concurency=Math.floor(concurency/1000);
    }while(concurency>0);

    for(let i=0;i<arr.length;i++){
        result+=arr[i];
        result += i==arr.length-1 ? "" :".";
    }   

    return result;
}

exports.getConcurency=(strConcurency) =>{
    let result=0;
    const arr=strConcurency.split(".");
    for(let i of arr){
        result = result*1000+parseInt(i);
    }  

    return result;
}

exports.addParameterToURL=(url, param, value)=>{
    const position=url.search(param);
    if(position!=-1) url = url.slice(0,position) + param + "=" +value;
    else url += (url.split('?')[1] ? '&':'?') + param + "=" +value;
    return url;
}

exports.calculateTime= (time)=>{
    const t1 = Date.parse(time);
    const timeNow = new Date(Date.now());
    const t2 = Date.parse(timeNow);
    const diff= Math.ceil((t2-t1)/1000)
    let result="";

    if(diff>365*24*3600){
        result+=new Date(time).toLocaleDateString();
    }
    else if(diff>30*24*3600){
        result+=Math.floor(diff/(30*24*3600)) + " tháng trước";
    }
    else if(diff>24*3600){
        result+=Math.floor(diff/(24*3600)) + " ngày trước";
    }
    else if(diff>3600){
        result+=Math.floor(diff/(3600)) + " giờ trước";
    }
    else if(diff>60){
        result+=Math.floor(diff/(60)) + " phút trước";
    }
    else{
        result+="Gần đây";
    }
    return result;
}

const formatTime = (time)=>{    
    let result="";
    result=time.getDate()+"-"+ time.getMonth()+ "-" + time.getYear();
    return result;
}