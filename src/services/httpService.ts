import axios, { AxiosError } from 'axios';
import logger from './logService';

const onError = (error: AxiosError): Promise<AxiosError> => {
    logger.error(error);
    return Promise.reject(error);
};

axios.interceptors.request.use(undefined, onError);
axios.interceptors.response.use(undefined, onError);

export default {
    get: axios.get,
    post: axios.post,
};
