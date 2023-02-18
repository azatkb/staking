export const formatDate = (createdAt) =>{
    if(createdAt){
        let date = new Date(createdAt);
        let dateString = date.getDate() + '.' + (date.getMonth() < 9 ? '0' + (date.getMonth()+1) : (date.getMonth() + 1) )  + '.' + date.getFullYear() + ' ' + (date.getHours() < 9 ? ('0'+date.getHours()): (date.getHours()))  + ':' + (date.getMinutes() < 10? ('0'+date.getMinutes()) : (date.getMinutes()));
        return dateString;
    }else{
        return '';
    }
}

export default formatDate;