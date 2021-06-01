
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