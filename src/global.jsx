const globalData = {
    userName: '',
    userAvatar: '',
    token: '',
}
var isLogin = false

export function setGlobalData(key, val) {
    globalData[key] = val
}
export function getGlobalData(key) {
    return globalData[key]
}
export function setLoginState(val){
    isLogin = val;
}

export function getLoginState(){
    return isLogin;
}