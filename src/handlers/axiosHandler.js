import axios from "axios";
const Api_Url = process.env.REACT_APP_API_URL;
const Api_Url_Geo = process.env.REACT_APP_API_URL_GEO;
// under construction...
export const fetchApi = async (url, method, body) => {
  // console.log("body", body);
  const response = await axios({
    method,
    url: `${Api_Url}${url}`,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    ...body,
  })
    .then((response) =>
      console.log(`response of fetchApi url: ${url}`, response)
    )
    .catch((error) => console.log(`error of fetchApi url: ${url}`, error));
  return {
    data: response?.data,
    status: response?.status,
    statusText: response?.statusText,
  };
};
export const fetchApiGeo = async (url, method, body) => {
  const response = await axios({
    method,
    url: `${Api_Url_Geo}${url}`,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body,
  })
    .then((response) =>
      console.log(`response of fetchApi url: ${url}`, response)
    )
    .catch((error) => console.log(`error of fetchApi url: ${url}`, error));
  return {
    data: response.data,
    status: response.status,
    statusText: response.statusText,
  };
};
