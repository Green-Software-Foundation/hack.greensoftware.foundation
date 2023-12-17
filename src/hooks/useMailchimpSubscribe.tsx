import { useState } from 'react';
import jsonp from 'jsonp';

const getAjaxUrl = url => url.replace('/post?', '/post-json?');

const useMailchimpSubscribe = (url) => {
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState(null);

  const subscribe = (data) => {
    return new Promise((resolve, reject) => {
      const params = new URLSearchParams(data).toString();
      const ajaxUrl = getAjaxUrl(url) + '&' + params;
      setStatus('sending'); // Set status to 'sending' indicating loading state
      setMessage(null);

      jsonp(
        ajaxUrl,
        { param: 'c' },
        (err, data) => {
          if (err) {
            setStatus('error');
            setMessage(err.message);
            reject(err);
          } else if (data.result !== 'success') {
            setStatus('error');
            setMessage(data.msg);
            reject(new Error(data.msg));
          } else {
            setStatus('success');
            setMessage(data.msg);
            resolve(data.msg);
          }
        }
      );
    });
  };

  return { subscribe, status, message };
};

export default useMailchimpSubscribe;
