function addParameterToURL(param,value){
    let _url = location.href;
    _url += (_url.split('?')[1] ? '&':'?') + param + "=" +value;
    return _url;
}