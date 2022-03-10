import axios from 'axios';

const subscriptionKey = '';
const url = '';
export const callCognitiveApi = (data) => {
  const config = {
    headers: { 'content-type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': subscriptionKey },
  };
  const response = axios
    .post(url, data, config)
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    });
};