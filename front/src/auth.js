export const isAutorized = ()=>{
    let token = localStorage.getItem("token");
    if(token){
        return true;
    }
    return false;
}

export const getEmail = ()=>{
    let profile = localStorage.getItem("profile");
    if(profile){
        profile = JSON.parse(profile);
        return profile.email;
    }
    return "";
}

export const getRole = ()=>{
    let profile = localStorage.getItem("profile");
    if(profile){
        profile = JSON.parse(profile);
        return profile.role;
    }
    return "";
}

export const getId = ()=>{
    let profile = localStorage.getItem("profile");
    if(profile){
        profile = JSON.parse(profile);
        return profile._id;
    }
    return "";
}

export const headers = {
    headers: {
        Authorization: localStorage.getItem('token')
    }
};