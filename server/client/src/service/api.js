import axios from 'axios';

import { API_NOTIFICATION_MESSAGES, SERVICE_URLS} from '../constants/config';
import { getAccessToken, getType } from '../utils/common-utils';
import appInsights from 'applicationinsights';


const API_URL = 'https://blogoptimize.azurewebsites.net/';

appInsights.setup('91892bc9-9b1a-4bd3-8977-525c8859dcd1').start();


const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'content-Type': 'application/json',
    }

})

axiosInstance.interceptors.request.use(
    function (config) {
        // Log request information to Application Insights
    appInsights.defaultClient.trackEvent({
        name: 'HttpRequest',
        properties: {
          method: config.method,
          url: config.url,
          headers: JSON.stringify(config.headers),
        },
      });
        if (config.TYPE.params){
            config.params = config.TYPE.params;
        } else if (config.TYPE.query){
            config.url = config.url + '/' + config.TYPE.query;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }   

)

axiosInstance.interceptors.response.use(
    function (response) {
        // Log response information to Application Insights
    appInsights.defaultClient.trackEvent({
        name: 'HttpResponse',
        properties: {
          status: response.status,
          headers: JSON.stringify(response.headers),
          data: JSON.stringify(response.data),
        },
      });
        return processResponse(response);
    },
    function (error) {
        return Promise.reject(processError(error));
    }   

)

const processResponse = (response) => {
    if (response.status === 200) {
        return {isSuccess: true, data: response.data}
    }
    else{
        return {
            isFailure: true, 
            status: response?.status,
            msg: response?.msg,
            code: response?.code
        }
        
    }
}

const processError = (error) => {
    if (error.response) {
        // Request made and server responded with a status code that is not in the range of 2xx
        console.log('ERROR IN RESPONSE:', error);
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status,
        }
    }
    else if (error.request) {
        // The request was made but no response was received
        console.log('ERROR IN REQUEST:', error);
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.requestFailure,
            code: ""
        }
    }
    else {
        // Something happened in setting up the request that triggered an Error
        console.log('ERROR IN NETWORK:', error);
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGES.networkError,
            code: ""
        }
    }
}

const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress, showDownloadProgress) => 
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
                authorization: getAccessToken()
            },
            TYPE : getType(value, body),
            onUploadProgress: function(progressEvent){
                if (showUploadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showUploadProgress(percentCompleted);
                }
            },
            onDownloadProgress: function(progressEvent){
                if (showDownloadProgress) {
                    let percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    showDownloadProgress(percentCompleted);
                }
            }
        })
}

export { API } ;
        