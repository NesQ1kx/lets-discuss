import axios from 'axios';

import {LOCAL_IP} from "../constants/url";

const MAIN_URL = `http://${LOCAL_IP}:3000`;

export const httpService = function() {
    return {
        get: function(url) {
            return axios.get(`${MAIN_URL}/${url}`);
        }
    }
}();
