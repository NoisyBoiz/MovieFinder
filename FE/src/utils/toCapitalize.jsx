function ToCapitalize(x){
    let arr = x.split(" ");
    let rs="";
    for(let i=0;i<arr.length;i++){
        let y = arr[i].charAt(0).toUpperCase();
        let z = arr[i].slice(1);
        rs+=y+z;
        if(i!==arr.length-1) rs+=" ";
    }
    return rs;
}
export default ToCapitalize;