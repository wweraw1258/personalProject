import React, { useEffect, useState, useContext } from "react";
import './selectStateWebsite.css'
import { AuthContext } from "../../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { api } from "../../Component/api";
import * as AiIcons from 'react-icons/ai';
import { Button, Form } from 'reactstrap';
import Logout from "../../Component/Logout";
import * as BoxIcon from "react-icons/bi";
import Swal from "sweetalert2";
const SelectStateWebsite = () => {
  const { Checkx,Error,revokeToken } = useContext(AuthContext)
  let navigate = useNavigate();
  const [webStatus, setWebStatus] = useState(null)


  const statusWeb = async () => {
    try {
      var token = localStorage.getItem("accessToken")
      const res = await axios.post(`${api}/webStatus`, { accesstoken: token })
      if (res.data.state == "yes") {
        if (res.data.data == "Enable") {
          setWebStatus(true)
        } else {
          setWebStatus(false)
        }
      }
      else {
        Error()
        navigate("/")
      }
    }
    catch (e) {
      Error()
      navigate("/")
    }
  }

  const changeStatusWeb = async (status) => {
    if (status == true) {
      var text = "Enable"
    } else {
      var text = "Disable"
    }
    try {
      var token = localStorage.getItem("accessToken")
      const res = await axios.post(`${api}/changeWebStatus`, { accesstoken: token, status: text })
      if (res.data.state == "yes") {
        Swal.fire({
          icon: 'success',
          title: "เรียบร้อย",
          timer: 1500
      }).then(()=>{
        setWebStatus(!webStatus)
      })
      }

      else {
        Error()
        navigate("/")
      }
    }
    catch (e) {
      Error()
      navigate("/")
    }
  }


  useEffect(async () => {
    const x = await Checkx()
    try {
      if (x.state == "yes" && x.data == "admin") {   
        statusWeb()
      }
      else {
       Error()
        navigate("/")
      }
    } catch (e) {
      Error()
      navigate("/")
    }
  }, [])

  return (

    <>
      <input type="checkbox" id="check" />

      <div className="navbar">
        <label for="check">
          <i class="fas fa-bars" id="sidebar_btn"></i>
        </label>
        <a>
          <img src="https://sps.kps.ku.ac.th/t/images/PIC-LOGO/logo.png" className="img" />
          <a className="text">ระบบบริหารงานข้อมูลบุคลากร</a>
        </a>
        <Button outline color="danger" onClick={() => {
            Swal.fire(
              'เรียบร้อย',
              'ออกจากระบบเรียบร้อย',
              'success'
            ).then(() => {
                revokeToken()
              localStorage.clear()
              navigate("/")
            })
          }} ><AiIcons.AiOutlinePoweroff /></Button>
      </div>

      <div className="sidebar">
        <div className="navbar">
          <label for="check">
            <p class="fas fa-bars" id="sidebar_btn"></p>
          </label>
        </div>
        <div className="profile_info">
          <img src={localStorage.getItem("Profile")} class="profile" alt="" />
          <h4 >สถานะ : Admin </h4>
          <h4>{localStorage.getItem("Name")}</h4>
          <h5>{localStorage.getItem("gmail")}</h5>
        </div>
        <div>
          <a href="/personal/SearchData"><i><AiIcons.AiFillLock /></i> <samp>แก้ไขข้อมูลบุคลากร</samp></a>
          <a href="/personal/AddUser"><i><AiIcons.AiOutlineUsergroupAdd /></i> <samp>เพิ่มบุคลากร</samp></a>
          <a href="/personal/AddData"><i><AiIcons.AiFillEdit /></i> <samp>กรอกข้อมูลเพิ่มเติม</samp></a>
          <a href="/personal/openServer"><i><AiIcons.AiFillExclamationCircle /></i> <samp>สถานะระบบ</samp></a>
        </div>
      </div>


      <div className="mobile_nav">
        <input type="checkbox" id="check2" />
        <div className="nav_bar">
          <img src={localStorage.getItem("Profile")} class="mobile_profile_img" alt="" />
          <label for="check2">
            <i class="fa fa-bars nav_btn"></i>
          </label>
        </div>
        <div className="mobile_nav_items">
          <a href="/personal/SearchData"><i><AiIcons.AiFillLock /></i> <samp>แก้ไขข้อมูลบุคลากร</samp></a>
          <a href="/personal/AddUser"><i></i> <samp>เพิ่มบุคลากร</samp></a>
          <a href="/personal/AddData"><i><AiIcons.AiFillEdit /></i> <samp>กรอกข้อมูลเพิ่มเติม</samp></a>
          <a href="/personal/openServer"><i><AiIcons.AiFillExclamationCircle /></i> <samp>สถานะระบบ</samp></a>
        </div>
      </div>
      <div className="content">
        <div className="app1">
          <p style={{ color: "aquamarine" }} ></p>
          {/* <div class="form-check form-switch">
            <input class="form-check-input" tฟype="checkbox" role="switch" id="flexSwitchCheckDefault"/>
            <label class="form-check-label" for="flexSwitchCheckDefault">Default switch checkbox input</label>
      </div> */}
          <><label class="switch">
            <input type="checkbox" checked={webStatus} onChange={(event) => { changeStatusWeb(event.target.checked); }} />
            <span class="slider"></span>
          </label>
            <div>
              <p style={{ marginTop: '20px', fontSize: '20px', fontWeight: 'bold' }}>สถานะระบบ : </p>{webStatus == true ? <><BoxIcon.BiLockOpenAlt size={100} /><p style={{ marginTop: '40px', fontSize: '40px', fontWeight: 'bold' }}>ปกติ</p></> :
                //  อันนี้รูปเปิดใช้งาน

                // อันนี้รูปปิด
                <><BoxIcon.BiLockAlt size={100} /><p style={{ marginTop: '40px', fontSize: '40px', fontWeight: 'bold' }}>ปิดปรับปรุงระบบชั่วคราว</p></>}
            </div></>
          <p style={{ color: "aquamarine" }} ></p>
        </div>
      </div>
    </>
  )
}

export default SelectStateWebsite