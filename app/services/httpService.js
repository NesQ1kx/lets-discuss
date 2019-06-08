import axios from 'axios';

const LOCAL_ADDRESS = 'http://192.168.1.65:3000';

export const httpService = function() {
    return {
        get: function(url) {
            return axios.get(`${LOCAL_ADDRESS}/${url}`);
        }
    }
}();
