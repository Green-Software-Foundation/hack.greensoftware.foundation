import { useState } from 'react';

const getAjaxUrl = url => url.replace('/post?', '/post-json?');

const useMailchimpSubscribe = (url) => {
    const [status, setStatus] = useState(null);
    const [message, setMessage] = useState(null);

    const subscribe = (data) => {
        return new Promise((resolve, reject) => {
            setStatus('sending'); // Set status to "sending" before making the request
            setMessage(null);

            const params = new URLSearchParams(data).toString();
            const jsonpUrl = getAjaxUrl(url) + '&' + params;

            const callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
            window[callbackName] = (data) => {
                delete window[callbackName];
                document.body.removeChild(script);
                if (data.result !== 'success') {
                    setStatus('error');
                    setMessage(data.msg);
                    reject(data.msg);
                } else {
                    setStatus('success');
                    setMessage(data.msg);
                    resolve(data.msg);
                }
            };

            const script = document.createElement('script');
            script.src = `${jsonpUrl}&c=${callbackName}`;
            script.onerror = () => {
                delete window[callbackName];
                document.body.removeChild(script);
                const errorMessage = "JSONP request failed";
                setStatus('error');
                setMessage(errorMessage);
                reject(errorMessage);
            };
            document.body.appendChild(script);
        });
    };

    return { subscribe, status, message };
};

export default useMailchimpSubscribe;

