import "./infoPopup.css";
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate as history } from 'react-router-dom'
import axios from "axios";
import { api } from "../Component/api";
import { AuthContext } from '../App'
import { useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
function InfoPopup() {
  const { setStatus, status, Checkx, Error,revokeToken } = useContext(AuthContext);
  let navigate = useNavigate();
  const [idcard, setIdcard] = useState("");
  const [tel, setTel] = useState("");
  const [titleNameThList, setTitleNameThList] = useState([])
  const [titleNameEngList, setTitleNameEngList] = useState([])
 

   const Savedata = async () => {
    let personal_infromation = new FormData();
    personal_infromation.append("คำนำหน้าไทย", document.getElementById("A1").value)
    personal_infromation.append("ชื่อจริงไทย", document.getElementById("A2").value)
    personal_infromation.append("นามสกุลไทย", document.getElementById("A3").value)
    personal_infromation.append("คำนำหน้าอังกฤษ", document.getElementById("A4").value)
    personal_infromation.append("ชื่อจริงอังกฤษ", document.getElementById("A5").value)
    personal_infromation.append("นามสกุลอังกฤษ", document.getElementById("A6").value)
    personal_infromation.append("เลขบัตรประชาชน", document.getElementById("A7").value)
    personal_infromation.append("พาสปอร์ต", document.getElementById("A8").value)
    personal_infromation.append("วันเกิด", document.getElementById("A9").value)
    personal_infromation.append("เพศ", document.getElementById("A10").value)
    personal_infromation.append("หมู่เลือด", document.getElementById("A11").value)
    personal_infromation.append("สถานะสมรส", document.getElementById("A12").value)
    personal_infromation.append("สัญชาติ", document.getElementById("A13").value)
    personal_infromation.append("เชื้อชาติ", document.getElementById("A14").value)
    personal_infromation.append("ศาสนา", document.getElementById("A15").value)
    personal_infromation.append("จังหวัดที่เกิด", document.getElementById("A16").value)
    personal_infromation.append("ประเทศที่เกิด", document.getElementById("A17").value)
    personal_infromation.append("รหัสไปรษณีย์", document.getElementById("A18").value)
    personal_infromation.append("เบอร์โทรศัพท์", document.getElementById("A19").value)
    personal_infromation.append("gmail", localStorage.getItem("gmail"))
   
    const token = localStorage.getItem("accessToken")
    if (token) {
      var blanktest = true
      for (var pair of personal_infromation.entries()) {
        if(!pair[1]){
          blanktest = false
        }else{
        if(pair[1].replace(/ /g, '').length==0){
          blanktest = false
        }
    }
    }
      if (document.getElementById("A7").value.length != 13 || document.getElementById("A19").value.length != 10 ||blanktest==false ) {
        alert("กรุณากรอข้อมูลให้ครบ")
      } 
      else {
        try {
           const res = await axios.post(`${api}/saveDataFst/${localStorage.getItem("accessToken")}`,personal_infromation)
          if (res.data.state == "yes") {
            Swal.fire('Saved!', 'กรุณาเข้าสู่ระบบอีกครั้ง', 'success').then(() => {
              localStorage.clear()
              revokeToken()
              navigate('/')
            })
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'เกิดข้อผิดพลาด',
            }).then(() => {
              localStorage.clear()
              revokeToken()
              navigate('/')
            })
          }

        }
        catch (e) {
          Error()
          navigate("/")
        }
      }
    } else {
      Error()
      navigate("/")
    }

  }


  const getTitleName = async () => {
    const token = localStorage.getItem("accessToken")
    if (token) {
      try {
        const res = await axios.post(`${api}/titleName`, { accesstoken: token })  
        if (res.data.state == "yes") {
          var th = []
          var eng = []
          var thShort = []
          var engShort = []
          res.data.data.map((value, i) => {
            if (value.language == "TH") {
              thShort.push(value.คำนำหน้าย่อ)
              th.push(value.คำนำหน้าเต็ม)
            } else {
              engShort.push(value.คำนำหน้าย่อ)
              eng.push(value.คำนำหน้าเต็ม)
            }
          })
          setTitleNameThList(th)
          setTitleNameEngList(eng)
       
        } else {
          Error()
          navigate("/")
        }
      }
      catch (e) {
        Error()
        navigate("/")
      }
    }
    else {
      Error()
      navigate("/")
    }
  }



  const checkComplte = async () => {
    try {
      var token = localStorage.getItem("accessToken")
      var gmail = localStorage.getItem("gmail")
      const response1 = await axios.post(`${api}/getIDcard`, { accesstoken: token, gmail: gmail })
      return response1.data.data.เลขบัตรประชาชน
    } catch (e) {
      return null
    }

  }


  useEffect(async () => { 
    const status = await Checkx()
    const completeData = await checkComplte()
    try {
      if (status.state == "yes" && (status.data == "user" || status.data == "hr") && completeData != null && completeData == "") {
        getTitleName()
      }
      else {
        Error()
        navigate("/")
  
      }
    } catch (e) {
      Error()
      navigate("/")
     
    }

    return true;
  }, [])



  return (

    <>

      <div className="bgname">

        <div className="boxname">
          <h2 style={{ fontSize: '25px', fontWeight: 'bold' }}>กรอกข้อมูลเพิ่มเติม</h2>
          <div>
            <div>
           
              <div className="rama-xi">
                <p>ชื่อ-นามสกุล (ภาษาไทย)</p>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <div className="rama-x">
                    <p>คำนำหน้า</p>
                  </div>
                  <select class="form-select form-select" aria-label=".form-select-sm example" id="A1" >
                    <option selected value={""}>โปรดระบุ...</option>

                    {titleNameThList != null ? titleNameThList.map((valuex, i) => {
                      
                        return (
                          <>
                            {<option value={valuex}>{valuex}</option>}
                          </>
                        )
                      
                    }) : null}


                  </select>
                </div>
                <div class="col-md-5">
                  <div className="rama-x">
                    <p>ชื่อ</p>
                  </div>


                  <input type="text" class="form-control" placeholder="ชื่อ" id="A2" />
                </div>
                <div class="col-md-5">
                  <div className="rama-x">
                    <p>นามสกุล</p>
                  </div>
                  <input type="text" class="form-control" placeholder="นามสกุล" id="A3" />
                </div>

              </div>
            </div>
            <div>
              <div className="rama-xi">
                <p>ชื่อ-นามสกุล (ภาษาอังกฤษ)</p>
              </div>
              <div class="row">
                <div class="col-md-2">
                  <div className="rama-x">
                    <p>คำนำหน้า</p>
                  </div>
                  <select class="form-select form-select" aria-label=".form-select-sm example" id="A4" >
                    <option selected value={""}>โปรดระบุ...</option>
                    {titleNameEngList != null ? titleNameEngList.map((valuex, i) => {
                    
                        return (
                          <>
                            {<option value={valuex}>{valuex}</option>}
                          </>
                        )
                    
                    }) : null}
                  </select>
                </div>
                <div class="col-md-5">
                  <div className="rama-x">
                    <p>Name</p>
                  </div>
                  <input type="text" class="form-control" placeholder="Name" id="A5" />
                </div>
                <div class="col-md-5">
                  <div className="rama-x">
                    <p>Surname</p>
                  </div>
                  <input type="text" class="form-control" placeholder="Surname" id="A6" />
                </div>
              </div>
            </div>
            <div className="rama-x">
              <p>เลขบัตรประจำตัวประชน</p>
            </div>
            <input class="form-control" type="text" placeholder="เลขบัตรประจำตัวประชาชน" id="A7" />


            <span className="errcheck">{idcard.length != 13 && idcard.length != 0 ? "กรุณากรอกให้ครบ 13 หลัก" : ""}</span>
            <div className="rama-x">
              <p>เลขหนังสือเดินทาง</p>
            </div>
            <input class="form-control" placeholder="เลขหนังสือเดินทาง" id="A8" />

            <div class="row">
              <div class="col-md-3">
                <div className="rama-x">
                  <p>วัน/เดือน/ปี เกิด</p>
                </div>
                <input type="date" class="form-control" placeholder="สัญชาติ" id="A9" />
              </div>
              <div class="col-md-3">
                <div className="rama-x">
                  <p>เพศ</p>
                </div>
                <select class="form-select form-select" aria-label=".form-select-sm example" id="A10" >
                  <option selected value={""}>โปรดระบุ...</option>
                  <option value="ชาย">ชาย</option>
                  <option value="หญิง">หญิง</option>
                </select>
              </div>
              <div class="col-md-3">
                <div className="rama-x">
                  <p>หมู่เลือด</p>
                </div>
                <select class="form-select form-select" aria-label=".form-select-sm example" id="A11">
                  <option selected value={""}>โปรดระบุ...</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="O">O</option>
                  <option value="AB">AB</option>
                </select>
              </div>
              <div class="col-md-3">
                <div className="rama-x">
                  <p>สถานะภาพสมรส</p>
                </div>
                <select class="form-select form-select" aria-label=".form-select-sm example" id="A12">
                  <option selected value={""}>โปรดระบุ...</option>
                  <option value="โสด">โสด</option>
                  <option value="สมรส">สมรส</option>
                  <option value="หย่าร้าง">หย่าร้าง</option>
                  <option value="แยกกันอยู่">แยกกันอยู่</option>
                </select>
              </div>
            </div>


            <div>
              <div class="row">
                <div class="col-md-4">
                  <div className="rama-x">
                    <p>สัญชาติ</p>
                  </div>
                  <input class="form-control" placeholder="สัญชาติ" id="A13" />
                </div>
                <div class="col-md-4">
                  <div className="rama-x">
                    <p>เชื้อชาติ</p>
                  </div>
                  <input class="form-control" placeholder="เชื้อชาติ" id="A14" />
                </div>
                <div class="col-md-4">
                  <div className="rama-x">
                    <p>ศาสนา</p>
                  </div>
                  <input class="form-control" placeholder="ศาสนา" id="A15" />
                </div>
              </div>

              <div class="row">
                <div class="col-md-4">
                  <div className="rama-x">
                    <p>จังหวัดที่เกิด</p>
                  </div>
                  <input class="form-control" placeholder="จังหวัดที่เกิด"id="A16"/>
                 
                </div>
                <div class="col-md-4">
                  <div className="rama-x">
                    <p>ประเทศที่เกิด</p>
                  </div>
                  <input class="form-control" placeholder="ประเทศที่เกิด" id="A17" />
                </div>
                <div class="col-md-4">
                  <div className="rama-x">
                    <p>รหัสไปรษณีย์</p>
                  </div>
                  <input class="form-control" placeholder="รหัสไปรษณีย์" id="A18" />
                </div>
              </div>
              <div className="rama-x">
                <p>เบอร์โทรศัพท์</p>
              </div>
              <input class="form-control" placeholder="เบอร์โทรศัพท์" id="A19" onChange={(event) => setTel(event.target.value)} />
             
            </div>
          </div>
          <button class="btn btn-success" style={{marginTop:'20px'}} onClick={()=>{Savedata()}}>บันทึกข้อมูล</button>
        </div>
      </div>

    </>
  )
}
export default InfoPopup