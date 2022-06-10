import React, { useState,useEffect,useContext } from "react";
import './Login.css'
import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import { FcGoogle } from "react-icons/fc";
import {useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import{AuthContext} from '../App'
import { api } from "../Component/api";
function Login() {

  const {setStatus,Error} = useContext(AuthContext);
  const [buttonPopup1, setButtonPopup1] = useState(false);
  const [buttonPopup2, setButtonPopup2] = useState(false);
  const [titleName,setTitleName] = useState("")
  const [name,setName] = useState("")
  const [surname,setSurname] = useState("")
  const [email,setEmal] = useState("")
  const [tel,setTel]= useState("")

  let navigate = useNavigate();



  const alertUser = async (response) => {
  
    try {
      
      const res = await axios.post(`${api}/login`, { token:response.tokenId })
       if(res.data.result=="success"){
      localStorage.setItem("accessToken",res.data.token.accessToken)
      localStorage.setItem("refreshToken",res.data.token.refreshToken)
      localStorage.setItem("gmail",response.profileObj.email)
      localStorage.setItem("Name",response.profileObj.givenName+"   "+response.profileObj.familyName)
      localStorage.setItem("Profile",response.profileObj.imageUrl)
      
   if(res.data.สิทธิ์=="admin"){

    navigate("/searchdata")

    }
    else if(res.data.สิทธิ์=="hr" || res.data.สิทธิ์=="user" ){
      try{
        const response1 = await axios.post(`${api}/getIDcard`,{accesstoken:res.data.token.accessToken,gmail:response.profileObj.email})
        console.log(response1.data.data)

        if(response1.data.state=="yes"){
          if(response1.data.data.เลขบัตรประชาชน){
              if(res.data.สิทธิ์=="hr"){
                navigate("/SearchDataHr")
              }else{
                navigate("/ShowdataUser")
              }
          }else{
            localStorage.setItem("login",response1.data.data.เลขบัตรประชาชน)
            navigate("/infopopup")
          }
        }else{
          Error()
        }
      }catch(e){
        Error()
      }
    }
    else{
      Swal.fire({
        icon: 'success',
        title: "รอการยืนยัน แล้วเข้าสู่ระบบใหม่อีกครั้ง",
        timer: 1500
    })
   
    }
        
    }
    else if(res.data.result=="update"){
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อพลาด',
        text: 'ระบบกำลังทำการปรับปรุง',
      }).then(() => {
      
        localStorage.clear()
      })
    }
    else{
    
      Error()
    }

    }
    catch (e) {
  
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อพลาด',
        text: 'กรุณาเข้าสู่ระบบอีกครั้ง',
      })
    }
  }


  return (
    <div className="Backgroundmain">
  
      <div className="Backgroundmainx">

        <div className="Box">

          <div className="Boxxx" >
            <img className="imglog" src="https://upload.wikimedia.org/wikipedia/commons/9/97/KU_Logo.png" alt="Italian Trulli" />
          </div>

          <div className="line"></div>

          <div className="Boxx" >
            <div > 
             <label className="title"> 
               ควยออม
             </label>
              </div>

            <div>
              <GoogleLogin
                clientId="498082550669-eko194a37frqb3o1kpg53hgsm9pujplp.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={alertUser}
                onFailure={alertUser}
                cookiePolicy={'single_host_origin'}
                render={renderProps => (
                  <button className="btnGg" onClick={renderProps.onClick} disabled={renderProps.disabled}>{<FcGoogle size={40} />}<div className="space"></div>Login With Google</button>
                )}
              />
            </div>
          
          </div>
                   
        </div>
      </div>

    </div>

  )
}

export default Login