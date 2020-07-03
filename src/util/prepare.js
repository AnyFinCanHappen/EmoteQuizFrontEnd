import Socket from './Socket.js';
import Config from './config.json'

const {backendEP, backendURL, bttvEP} = Config;

async function sendPrepareEP()
{
    return await Socket.sendGetHTTP(backendURL,backendEP.getEmotes);
}

async function sendBttvEP(limit, offset)
{
    const acceptCode = 200;
    let queryParam = {
        limit:limit,
        offset:offset
    };
    const querystring = require('querystring');
    let queryString = querystring.stringify(queryParam);
    let response = await Socket.sendGetHTTP(bttvEP.URL, bttvEP.path.concat("?").concat(queryString));
    if(response.status === acceptCode){
        let emoteListShuffled = shuffle(response.data);
        let emotes = [];
        for(var i  = 0; i < 10; i ++){
            let emote = {
                id:emoteListShuffled[i].emote.id,
                code:emoteListShuffled[i].emote.code,
                type:emoteListShuffled[i].emote.imageType
            }
            emotes.push(emote);
        }
        return {
            emotes:emotes
        };
    }
    else{
        return response;
    }
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
export default{
    sendPrepareEP,
    sendBttvEP
}