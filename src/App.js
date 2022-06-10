import "./App.css";
import "./Component/Navbar.css"
import "./Pages/HomeAdmin.css"
import "./Component/Sidebar"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import InfoPopup from './Pages/InfoPopup'
import EditAdmin from "./Pages/Admin/EditByAdmin";
import AddData from "./Pages/Admin/AddData"
import ShowdataHr from "./Pages/hr/ShowDataHr";
import SearchData from "./Pages/Admin/SearchData"

import React, { useState, createContext, useEffect } from 'react';

import Login from "./Pages/Login";
import EditByUser from "./Pages/User/EditByUser"
import ShowdataUser from "./Pages/User/ShowDataUser";
import SearchDataHr from "./Pages/hr/SearchDataHr";
import EditHr from "./Pages/hr/EditbyHr";
import AddDatahr from "./Pages/hr/AddDatahr";
import AddUserHr from "./Pages/hr/AddUserHr";
import SelectStateWebsite from "./Pages/Admin/selectStateWebsite";
import AddUser from "./Pages/Admin/AddUser";
import ShowdataAdmin from "./Pages/Admin/ShowDataAdmin";
import PDFprint from "./Component/PDFprint";
import axios from "axios";

import { api } from "./Component/api";

import Swal from "sweetalert2";

import GuestView from "./Pages/Guest/GuestView";



export const AuthContext = createContext();

function App() {
  const [status, setStatus] = useState(null)
  const [x, setX] = useState()

  const [webStatus, setWebStatus] = useState(null)

  const Checkx = async () => {
    Swal.fire({
      title: 'รอสักครู่',
      timer: 3000,

      didOpen: () => {
        Swal.showLoading()
      },
    })
    const accesstoken = localStorage.getItem("accessToken")
    const refreshtoken = await localStorage.getItem("refreshToken")
    const gmail = await localStorage.getItem("gmail")

    if (accesstoken) {

      try {

        const res = await axios.post(`${api}/check`, { accesstoken: accesstoken })

        if (res.data.message == "token expired") {

          localStorage.clear("accessToken")

          if (refreshtoken && gmail) {
            try {
              const res1 = await axios.post(`${api}/renewtoken`, { token: refreshtoken, gmail: gmail })

              console.log(res.data)
              if (res1.data.state == "yes") {

                localStorage.setItem("accessToken", res1.data.token)
                localStorage.setItem("refreshToken", refreshtoken)
                localStorage.setItem("gmail", gmail)
                try {
                  const res3 = await axios.post(`${api}/check`, { accesstoken: res1.data.token })
                  return res3.data
                } catch (e) {
                  return { "state": "no", "message": "fetch api err" }
                }
              } else {

                return { "state": "no", "message": "fetch api err" }
              }

            }
            catch (e) {

              return { "state": "no", "message": "fetch api err" }
            }


            return { "state": "no", "message": "fetch api err" }
          }
        } else {

          return (res.data)
        }
      }
      catch (e) {

        return { "state": "no", "message": "fetch api err" }

      }
    }
    else {

      return { "state": "no", "message": "no token" }
    }
  }

  const revokeToken = async () => {
    const res = await axios.get(`${api}/revokeToken/${localStorage.getItem("gmail")}`)
  }

  const Error = async () => {
    Swal.fire({
      icon: 'error',
      title: 'เกิดข้อพลาด',
      text: 'เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบอีกครั้ง',
    }).then(() => {

      localStorage.clear()
    })
  }


  const statusWeb = async () => {
    try {
      var token = localStorage.getItem("accessToken")
      const res = await axios.post(`${api}/webStatus`, { accesstoken: token })
      if (res.data.state == "yes") {

        if (res.data.data == "Disable") {
          Error()


        } else {
          setTimeout(statusWeb, 10000)
        }
      }
      else {
        Error()

      }
    }
    catch (e) {

      Error()
    }
  }


  return (
    <AuthContext.Provider

      value={{ setStatus, status, Checkx, x, statusWeb, webStatus, Error, revokeToken }}>

      <Router basename="/personal/">
        <div>

          <Routes>
            
            <Route path="/" element={<Login />} />
            <Route path="/infoPopup" element={<InfoPopup />} />
            <Route path="/EditByAdmin" element={<EditAdmin />} />
            <Route path="/AddData" element={<AddData />} />
            <Route path="/SearchData" element={<SearchData />} />
            <Route path="/ShowDataAdmin" element={<ShowdataAdmin />} />
            <Route path="/openServer" element={<SelectStateWebsite />} />
            <Route path="/AddUser" element={<AddUser />} />
            <Route path="/EditbyUser" element={<EditByUser />} />
            <Route path="/Showdatauser" element={<ShowdataUser />} />
            <Route path="/SearchDataHr" element={<SearchDataHr />} />
            <Route path="/AdddataHr" element={<AddDatahr />} />
            <Route path="/AddUserHr" element={<AddUserHr />} />
            <Route path="/EditByHr" element={<EditHr />} />
            <Route path="/ShowDataHr" element={<ShowdataHr />} />
            <Route path="/Guest/:gmail" element={<GuestView />} />
            <Route path="PDFprintdata" element={<PDFprint />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>

      </Router>
    </AuthContext.Provider>
  );
}

export default App;



