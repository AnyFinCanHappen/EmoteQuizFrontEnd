import Socket from './Socket.js';
import Config from './config.json'

const {backendEP} = Config;

async function sendPrepareEP()
{
    return await Socket.sendGetHTTP(backendEP.getEmotes);
}

export default{
    sendPrepareEP
}