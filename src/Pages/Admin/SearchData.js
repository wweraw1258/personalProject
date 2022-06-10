import React, { useContext, useEffect, useState } from "react";
import "../SearchData.css";
import { useNavigate } from 'react-router-dom'
import * as AiIcons from 'react-icons/ai';
import { Button, Container } from 'reactstrap';
import { Table } from "react-bootstrap";

import Check from "../../Component/Check";
import Combo from "../../Component/Combo";
import Delete from "../../Component/Delete";
import axios from "axios";
import { AuthContext } from '../../App'
import { icons } from "react-icons/lib";
import { api } from "../../Component/api";
import Swal from "sweetalert2";
import {Row,Col } from "reactstrap";


const SearchData = () => {
  let navigate = useNavigate();
  const [dataUser, setDataUser] = useState(null)
  const [tempDataUser, setTempDataUser] = useState(null)
  const [textSearch, SetTextSearch] = useState('')
  const [conSearch, setConSearch] = useState(1)
  const [sex, setSex] = useState(0)
  const {  Checkx,Error ,revokeToken} = useContext(AuthContext);
 const [photo, setPhoto] = useState("https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png")

  const getalldata = async () => {
    const token = localStorage.getItem("accessToken")
    try {
      const res = await axios.post(`${api}/admin/alluser`, { accesstoken: token })
      setDataUser(res.data)
      setTempDataUser(res.data)
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
        navigate("/searchdata")
        getalldata() 
      }
      else {
      alert("x")
      }
    } catch (e) {
      alert("j")
    }
  }, [])




  const Search = (text, con, male) => {
    if (text) {
      const newdata = tempDataUser.filter((item) => {
    
        const textData = text
        if (con == 1) {
          var itemData = item.ชื่อจริงไทย
        }
        else if (con == 2) {
          var itemData = item.นามสกุลไทย
        }
        else if (con == 3) {
          var itemData = item.ชื่อจริงอังกฤษ
        }
        else if (con == 4) {
          var itemData = item.นามสกุลอังกฤษ
        }
        else if (con == 5) {
          var itemData = item.gmail
        }
        else {
          var itemData = item.เบอร์โทรศัพท์
        }

        
        if(male!=" "){
          if(item.เพศ==male){
            if (itemData != null ) {
              return itemData.indexOf(textData) > -1;
            }
          }

        }else{
          if (itemData != null ) {
            return itemData.indexOf(textData) > -1;
          }
        }

              
      })
  
      
      SetTextSearch(text)
      setDataUser(newdata)
      
      setSex(male)
      setConSearch(con)
    }
    else {
      if (male != " ") {
        const newdata = tempDataUser.filter((item) => {
          var itemData = item.เพศ
          if (itemData != null && item.เพศ == male)
            return itemData;
        })
        SetTextSearch(text)
        setDataUser(newdata)
        setSex(male)
        setConSearch(con)
      }
      else {
        setDataUser(tempDataUser)
        SetTextSearch(text)

      }
    }
  }






  return (

    <div>
      <div>
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
            <a href="/personal/AddUser"><i><AiIcons.AiOutlineUsergroupAdd /></i><samp>เพิ่มบุคลากร</samp></a>
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
            <a href="/personal/AddUser"><i><AiIcons.AiOutlineUsergroupAdd /></i> <samp>เพิ่มบุคลากร</samp></a>
            <a href="/personal/AddData"><i><AiIcons.AiFillEdit /></i> <samp>กรอกข้อมูลเพิ่มเติม</samp></a>
            <a href="/personal/openServer"><i><AiIcons.AiFillExclamationCircle /></i> <samp>สถานะระบบ</samp></a>
          </div>
        </div>

        <div className="content">


          <div className="Adata">
            <div className="Asss">



              <p className="Atext" style={{marginTop:'20px'}}>ตารางรายชื่อบุคลากรทั้งหมด</p>
              <div class="row">
                <div class="col">
                  <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder=""
                      onChange={(event) => {
                        SetTextSearch(event.target.value)
                        Search(event.target.value, conSearch, sex)
                      }
                      }
                    />

                  </div>
                </div>
                <div class="col-md-2">
                  <select class="form-select"
                    onChange={(event) => {
                      setConSearch(event.target.value)
                      Search(textSearch, event.target.value, sex)
                    }}
                  >

                    <option selected value={1}
                    >ค้นหาด้วยชื่อภาษาไทย</option>
                    <option value={2}>ค้นหาด้วยนามสกุลภาษาไทย</option>
                    <option value={3}>ค้นหาด้วยชื่อภาษาอังกฤษ</option>
                    <option value={4}>ค้นหาด้วยนามสกุลภาษาอังกฤษ</option>
                    <option value={5}>ค้นหาด้วยอีเมล</option>
                    <option value={6}>ค้นหาด้วยเบอร์โทรศัพท์</option>
                  </select>
                </div>
                <div class="col-md-2">
                  <select class="form-select" onChange={(event) => {
                    setSex(event.target.value)
                    Search(textSearch, conSearch, event.target.value)
                  }}>

                    <option selected value={" "}>ทั้งหมด</option>
                    <option value={"ชาย"}>ชาย</option>
                    <option value={"หญิง"}>หญิง</option>
                  </select>
                </div>
              </div>

              <div className="All">


                <div  class="table-responsive"> {/*style={{ margin: '20px' }}*/}
                  <table  class="table table-striped table-hover table-info table-sm table-bordered">
                    <thead>
                      <tr>
                        <th scope="col">       </th>
                        <th scope="col">ชื่อ-นามสกุล(ไทย)</th>
                        <th scope="col">ชื่อ-นามสกุล(อังกฤษ)</th>
                        <th scope="col">Gmail</th>
                        <th scope="col">สถานะในระบบ</th>
                        <th scope="col">Public</th>
                        <th scope="col">จัดการข้อมูล</th>
                      </tr>
                    </thead>

                    {dataUser && tempDataUser ?
                      textSearch || sex ?
                        <tbody>
                          {dataUser.map((value, i) => {
                            return (
                              <tr>
                                <td>
                            
                                {dataUser[i].รูปภาพ && dataUser[i].รูปภาพ!="null" ?
                                    <img className="imgx" src={`${api}/file/${localStorage.getItem("accessToken")}/${dataUser[i].gmail}/${dataUser[i].รูปภาพ}`} alt="" />
                                    :
                                    <img className="imgx" src={photo} alt="" />
                                  }
                                </td>
                                <td  class="align-middle">{dataUser[i].ชื่อจริงไทย}  {dataUser[i].นามสกุลไทย}</td>
                                <td  class="align-middle">{dataUser[i].ชื่อจริงอังกฤษ}  {dataUser[i].นามสกุลอังกฤษ}</td>
                                <td  class="align-middle">{dataUser[i].gmail}</td>
                                <td  class="align-middle"><Combo status={dataUser[i].สิทธิ์} gmail={dataUser[i].gmail} /></td>
                                <td  class="align-middle"><Check status={dataUser[i].public} gmail={dataUser[i].gmail} /></td>
                                <td  class="align-middle">
                                  <Container className="icon">
                                  <Row xs="auto">
                                  <Col>                          
                                  <i onClick={() => {
                                    // navigate("/editbyadmin",{state: { test: 'test'}})
                                    navigate("/editbyadmin", { state: { gmail: dataUser[i].gmail } })
                                  }} className="coloricon">
                                    <AiIcons.AiFillEdit />
                                  </i>
                                  </Col>
                                  <Col>
                                  <i onClick={() => { navigate("/ShowDataAdmin", { state: { gmail: dataUser[i].gmail } }) }} className="coloricon2">
                                    <AiIcons.AiFillEye />
                                  </i>
                                  </Col>
                                  <Col><Delete gmail={dataUser[i].gmail} /></Col>
                                  </Row>
                               

                                  

                                  
                                  </Container>
                                </td>
                              </tr>

                            )
                          })}


                        </tbody>


                        : <tbody>

                          {tempDataUser.map((value, i) => {
                            return (
                              <tr>
                                <td>
                                {tempDataUser[i].รูปภาพ && tempDataUser[i].รูปภาพ!="null"
                                    ?
                                    <img className="imgx" src={`${api}/file/${localStorage.getItem("accessToken")}/${tempDataUser[i].gmail}/${tempDataUser[i].รูปภาพ}`} alt="" />
                                    :
                                    <img className="imgx" src={photo} alt="" />
                                  }
                                </td>
                                <td  class="align-middle">{tempDataUser[i].ชื่อจริงไทย}  {tempDataUser[i].นามสกุลไทย}</td>
                                <td  class="align-middle">{tempDataUser[i].ชื่อจริงอังกฤษ}  {tempDataUser[i].นามสกุลอังกฤษ}</td>
                                <td  class="align-middle">{tempDataUser[i].gmail}</td>
                                <td  class="align-middle"><Combo status={tempDataUser[i].สิทธิ์} gmail={tempDataUser[i].gmail} /></td>
                                <td  class="align-middle"><Check status={tempDataUser[i].public} gmail={tempDataUser[i].gmail} /></td>
                                <td  class="align-middle">
                                <Container>
                                  <Row xs="auto">
                                  <Col> 
                                  <i onClick={() => {
                                    navigate("/editbyadmin", { state: { gmail: tempDataUser[i].gmail } })
                                  }} className="coloricon">
                                    <AiIcons.AiFillEdit />
                                  </i>
                                  </Col>
                                  <Col> 
                                  <i onClick={() => { navigate("/ShowDataAdmin", { state: { gmail: tempDataUser[i].gmail } }) }} className="coloricon2">
                                    <AiIcons.AiFillEye />
                                  </i>
                                  </Col>
                                  <Col> 
                                  <Delete gmail={tempDataUser[i].gmail} />
                                  </Col>
                                  </Row>
                                </Container>
                                </td>
                              </tr>

                            )
                          })}


                        </tbody>
                      : null}

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default SearchData;



