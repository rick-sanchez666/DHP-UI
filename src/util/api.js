import axios from "axios";


const base_url = "https://dhp-server.herokuapp.com/api";

axios.interceptors.request.use(function (config) {
  if(!config.url.includes("auth")) {
    const user = JSON.parse( localStorage.getItem("user") );
    const token = localStorage.getItem("token")
    config.url = `${config.url}/${user._id}`;
    config.headers = { "Authorization": `Bearer ${token}`}
    console.log(config);
  }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

function get(url) {
    return axios.get(url);
}

function post(url, payload) {
    return axios.post(url, payload);
}

export function signin( e, p) {
  const payload  ={email:  e, password: p};
  const url = `${base_url}/auth/signin`;
  return post(url, payload);
}

export function signup(payload) {
  const url = `${base_url}/auth/signup`;
  return post(url, payload)
}

export function searchPatient(id) {
  const url = `${base_url}/issuer/search/${id}`;
  return get(url)
}

export function newPatientReq(payload) {
  const url = `${base_url}/issuer/intake`;
  return post(url, payload);
}

export function getAFile(id) {
  const url = `${base_url}/verifier/transaction/${id}`;
  return get(url)
}



