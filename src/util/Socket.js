import Axios from 'axios';

const HTTPMethod= Object.freeze({
    GET:"GET",
    POST:"POST"
});

function initSocket(url){
    Axios.defaults.baseURL = url;
}

async function sendGetHTTP(url, path){
    return await sendHTTP(HTTPMethod.GET,url,path);
}

async function sendHTTP(method, url, path, data){
    initSocket(url);
    let response;
    switch(method){
        case HTTPMethod.GET:
            response = Axios.get(path);
            break;
        case HTTPMethod.POST:
            response = Axios.post(path,data);
            break;
        default:
            response = {
                "message": "Invalid HTTPmethod",
                "resultCode": -2
            };
            throw response;        
    }
    return await response;
}

export default{
    sendGetHTTP
};