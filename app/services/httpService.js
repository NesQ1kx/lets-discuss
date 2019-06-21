import axios from 'axios';

const LOCAL_ADDRESS = 'http://192.168.157.27:3000';

export const httpService = function() {
    return {
        get: function(url) {
            return axios.get(`${LOCAL_ADDRESS}/${url}`);
        }
    }
}();
