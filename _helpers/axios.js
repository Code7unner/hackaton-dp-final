const axios = require('axios');
const instance = axios.create({
    headers: {
        'X-ProstoAI-Project-ID': '5d8e0b4c1f0000023d163e55',
        'X-ProstoAI-Api-KEY': '77a26d6f-c995-40e8-bf6c-52ee27d95046'
    }
});

module.exports = instance;