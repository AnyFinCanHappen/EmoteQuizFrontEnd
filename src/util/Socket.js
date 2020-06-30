import Axios from 'axios';
import Config from './config.json';

const {backendURL} = Config;

const HTTPMethod= Object.freeze({
    GET:"GET",
    POST:"POST"
});

function initSocket(){
    Axios.defaults.baseURL = backendURL;
}

async function sendGetHTTP(path){
    return await sendHTTP(HTTPMethod.GET,path);
}

async function sendHTTP(method, path, data){
    initSocket();
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