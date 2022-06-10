import React, { Component } from 'react';


import axios from 'axios'
import join from 'url-join'

axios.interceptors.request.use(async (config)=> {

    const token = localStorage.getItem("accesstoken")
  if (jwtToken != null) {
      config.headers = { 'x-access-token': token}
  }
  config.url = join('http://demo.com/api/v1', config.url);
  return config;
  
});
export const httpClient = axios