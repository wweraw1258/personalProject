import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { api } from "../../Component/api";
import { useLocation, useNavigate } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import * as VscIcons from 'react-icons/vsc';
import { Button } from 'reactstrap';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Tabs, Tab } from "react-bootstrap";
import PropTypes from 'prop-types';
import '../ShowdataAdmin.css';
import Logout from "../../Component/Logout";
import Swal from "sweetalert2";
import { AuthContext } from '../../App'

const ShowdataHr = () => {
  let navigate = useNavigate();
  const location = useLocation()
  const {  Checkx,Error,revokeToken } = useContext(AuthContext);
  const [Perinfor, setPerinfor] = useState([]);
  const [AddressNow, setAddressNow] = useState([]);
  const [AddressRegis, setAddressRegis] = useState([]);
  const [Interested, setInterested] = useState([]);
  const [Study, setStudy] = useState([]);
  const [Teaching, setTeaching] = useState([]);
  const [Performance, setPerformance] = useState([]);
  const [Reward, setReward] = useState([]);
  const [Educational, setEducational] = useState([]);
  const [Position, setPosition] = useState([]);
  const [EmploymentOrder, setEmploymentOrder] = useState([]);
  const [Salary, setSalary] = useState([]);
  const [Insignia, setInsignia] = useState([]);
  const [EmploymentAppoval, setEmploymentAppoval] = useState([]);
  const [Administrative, setAdministrative] = useState([]);
  const [StudyLeave, setStudyLeave] = useState([]);
  const [Certificate, setCertificate] = useState([]);
  const [Module, setModule] = useState([]);
  const [Leave, setLeave] = useState([]);
  const [PositionAcademicReqHis, setPositionAcademicReqHis] = useState([]);
  const [Development, setDevelopment] = useState([]);
  const [otherData, setOtherData] = useState([])
  const [Email, setEmail] = useState([]);
  const [Email2, setEmail2] = useState([]);



  const getAdmin = async () => {

    try {
      var token = await localStorage.getItem("accessToken")
      const res = await axios.post(`${api}/getprofilefinal`, { accesstoken: token, gmail: location.state.gmail })
      console.log(res.data)
      if (res.data.state == "yes") {

        setPerinfor(res.data.personal_information[0])

        if (res.data.address.length != 0) {
          if (res.data.address[0].ประเภท == "ตามทะเบียนบ้าน") {
            setAddressNow(res.data.address[1])
            setAddressRegis(res.data.address[0])
          } else {
            setAddressNow(res.data.address[0])
            setAddressRegis(res.data.address[1])
          }
        }


        setInterested(res.data.personal_skill)
        setStudy(res.data.education_his)
        setTeaching(res.data.teaching)
        setPerformance(res.data.work)
        setReward(res.data.reward)
        setEducational(res.data.education_level[0])
        setPosition(res.data.position_level[0])
        setEmploymentOrder(res.data.employment_order[0])
        setSalary(res.data.salary_his)
        setInsignia(res.data.insignia)
        setEmploymentAppoval(res.data.employment_appoval)
        setAdministrative(res.data.menagement_position)
        setStudyLeave(res.data.study_leave)
        setCertificate(res.data.affair_trianing)
        setModule(res.data.personnal_file)
        setLeave(res.data.leave_his)
        setPositionAcademicReqHis(res.data.position_academic_req_his)
        setDevelopment(res.data.personal_dev_plan)
        setOtherData(res.data.other_data)
        setEmail(res.data.personal_information[0].อีเมล.split(","))
        //  setEmail2(res.data.positon_level)

      }else{
        Error()
          navigate("/")
      }
    } catch (e) {
      Error()
          navigate("/")
    }

  }



  useEffect(async () => {
    const x = await Checkx()
    try {
      if (x.state == "yes" && x.data == "hr") {
        if (location.state) {
          getAdmin()
    
        } else {
          Error()
          navigate("/")
        }
       
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
          <h4 >สถานะ : Hr </h4>
          <h4>{localStorage.getItem("Name")}</h4>
          <h5>{localStorage.getItem("gmail")}</h5>
        </div>
        <div>
        <a href="/personal/SearchDataHr"><i><AiIcons.AiFillLock /></i> <samp>แก้ไขข้อมูลบุคลากร</samp></a>
            <a href="/personal/AddUserHr"><i><AiIcons.AiOutlineUsergroupAdd /></i> <samp>เพิ่มบุคลากร</samp></a>
            <a href="/personal/AdddataHr"><i><AiIcons.AiFillEdit /></i> <samp>กรอกข้อมูลเพิ่มเติม</samp></a>
        </div>
      </div>


      <div className="mobile_nav">
        <input type="checkbox" id="check2" />
        <div className="nav_bar">
          <img src={localStorage.getItem("Profile")}  class="mobile_profile_img" alt="" />
          <label for="check2">
            <i class="fa fa-bars nav_btn"></i>
          </label>
        </div>
        <div className="mobile_nav_items">
        <a href="/personal/SearchDataHr"><i><AiIcons.AiFillLock /></i> <samp>แก้ไขข้อมูลบุคลากร</samp></a>
            <a href="/personal/AddUserHr"><i><AiIcons.AiOutlineUsergroupAdd /></i> <samp>เพิ่มบุคลากร</samp></a>
            <a href="/personal/AdddataHr"><i><AiIcons.AiFillEdit /></i> <samp>กรอกข้อมูลเพิ่มเติม</samp></a>
        </div>
      </div>

      <div className="content">

      
<Tabs defaultActiveKey="1" id="uncontrolled-tab-example" className="mb-3" >


{/* ทำแบบนี้ */}

  <Tab eventKey="1" title="ข้อมูลส่วนตัว">

    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2" >
        <div className="jam" >
          <div class="row">
            <div class="col-md-4">
              <div className="jamimg">
                <div className="imgprofile">
                  {Perinfor["รูปภาพ"] && Perinfor["รูปภาพ"]!="null" ?
                    <img src={`${api}/file/${localStorage.getItem("accessToken")}/${Perinfor["gmail"]}/${Perinfor["รูปภาพ"]}`} />
                    :
                    <img src={`https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png`} />
                  }

                </div>
              </div>
            </div>

            <div class="col">
              <div>
                {/* <p style={{color : "white"}} >/</p> */}
                <div className="rama-xi1">
                  <h3>ข้อมูลส่วนตัว</h3>
                </div>
                <div className="rama-xi1">
                  <div class="row">
                    <div class="col-md-4">
                      <p>ชื่อ-นามสกุล (ภาษาไทย) : </p>
                    </div>
                    <div class="col">
                   {Perinfor ? <p className="textbb">{Perinfor.คำนำหน้าไทย} {Perinfor.ชื่อจริงไทย} {Perinfor.นามสกุลไทย}</p> :null} {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
                <div className="rama-x1">
                  <div class="row">
                    <div class="col-md-4">
                      <p>ชื่อ-นามสกุล (ภาษาอังกฤษ) :  </p>
                    </div>
                    <div class="col">
                    {Perinfor ?  <p className="textbb">{Perinfor.คำนำหน้าอังกฤษ} {Perinfor.ชื่อจริงอังกฤษ} {Perinfor.นามสกุลอังกฤษ}</p> :null}  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
                <div className="rama-x1">
                  <div class="row">
                    <div class="col-md-4">
                      <p>เลขบัตรประจำตัวประชาชน :  </p>
                    </div>
                    <div class="col">
                    {Perinfor ? <p className="textbb">{Perinfor.เลขบัตรประชาชน}</p> :null}  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
                <div className="rama-x1">
                  <div class="row">
                    <div class="col-md-4">
                      <p>เบอร์โทรศัพท์ :  </p>
                    </div>
                    <div class="col">
                    {Perinfor ?  <p className="textbb">{Perinfor.เบอร์โทรศัพท์}</p> :null}  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>

                <div className="rama-x1">
                  <div class="row">
                    <div class="col-md-4">
                      <p>Gmail :  </p>
                    </div>
                    <div class="col">
                    <p className="textbb">{Perinfor.gmail}</p>
                    </div>
                  </div>
                </div>


                <div className="rama-x1">
                  <div class="row">
                    <div class="col-md-4">
                      <p>E-mail :  </p>
                    </div>
                    <div class="col">
                      {Email != [] ? Email.map((valuex, i) => {
                        return (
                          <>
                            <p className="textbb">{valuex}</p> {/* ไว้แสดงข้อมูลเสมอ */}
                          </>
                        )
                      }) : null}

                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
          <p style={{ color: "white" }} >/</p>
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>วัน/เดือน/ปี เกิด :  </p>
              </div>
              <div class="col-md-3">
              {Perinfor ? <p className="textbb">{Perinfor.วันเกิด}</p> : null} {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>เลขหนังสือเดินทาง :  </p>
              </div>
              <div class="col-md-3">
              {Perinfor ? <p className="textbb">{Perinfor.พาสปอร์ต}</p> : null} {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-2">
                <p>เพศ :  </p>
              </div>
              <div class="col-md-2">
              {Perinfor ? <p className="textbb">{Perinfor.เพศ}</p> : null} {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-2">
                <p>หมู่เลือด :  </p>
              </div>
              <div class="col-md-2">
              {Perinfor ? <p className="textbb">{Perinfor.หมู่เลือด}</p> : null} {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-2">
                <p>สถานะภาพสมรส :  </p>
              </div>
              <div class="col-md-2">
              {Perinfor ? <p className="textbb">{Perinfor.สถานะสมรส}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-2">
                <p>สัญชาติ :  </p>
              </div>
              <div class="col-md-2">
              {Perinfor ? <p className="textbb">{Perinfor.สัญชาติ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-2">
                <p>เชื้อชาติ :  </p>
              </div>
              <div class="col-md-2">
              {Perinfor ? <p className="textbb">{Perinfor.เชื้อชาติ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-2">
                <p>ศาสนา :  </p>
              </div>
              <div class="col-md-2">
              {Perinfor ? <p className="textbb">{Perinfor.ศาสนา}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
          <div className="rama-x2">
            <div class="row">

              <div class="col-md-2">
                <p>จังหวัดที่เกิด :  </p>
              </div>
              <div class="col-md-2">
              {Perinfor ? <p className="textbb">{Perinfor.จังหวัดที่เกิด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>

              <div class="col-md-2">
                <p>ประเทศที่เกิด :  </p>
              </div>
              <div class="col-md-2">
              {Perinfor ? <p className="textbb">{Perinfor.ประเทศที่เกิด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-2">
                <p>รหัสไปรษณีย์ :  </p>
              </div>
              <div class="col-md-2">
              {Perinfor ? <p className="textbb">{Perinfor.รหัสไปรษณีย์}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ที่อยู่ปัจจุบัน</h3>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ที่อยู่ :  </p>
              </div>
              <div class="col">
              {AddressNow ? <p className="textbb">{AddressNow.บ้านเลขที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ตรอก/ซอย :  </p>
              </div>
              <div class="col-md-3">
              {AddressNow ? <p className="textbb">{AddressNow["ตรอก/ซอย"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>ถนน :  </p>
              </div>
              <div class="col-md-3">
              {AddressNow ? <p className="textbb">{AddressNow.ถนน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ตำบล :  </p>
              </div>
              <div class="col-md-3">
              {AddressNow ? <p className="textbb">{AddressNow.ตำบล}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>อำเภอ :  </p>
              </div>
              <div class="col-md-3">
              {AddressNow ? <p className="textbb">{AddressNow["อำเภอ/เขต"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>จังหวัด :  </p>
              </div>
              <div class="col-md-3">
              {AddressNow ? <p className="textbb">{AddressNow.จังหวัด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>รหัสไปรษณีย์ :  </p>
              </div>
              <div class="col-md-3">
              {AddressNow ? <p className="textbb">{AddressNow.รหัสไปรษณีย์}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ที่อยู่ตามทะเบียนบ้าน</h3>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ที่อยู่ :  </p>
              </div>
              <div class="col">
              {AddressRegis ? <p className="textbb">{AddressRegis.บ้านเลขที่} </p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ตรอก/ซอย :  </p>
              </div>
              <div class="col-md-3">
              {AddressRegis ? <p className="textbb">{AddressRegis["ตรอก/ซอย"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>ถนน :  </p>
              </div>
              <div class="col-md-3">
              {AddressRegis ? <p className="textbb">{AddressRegis.ถนน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ตำบล :  </p>
              </div>
              <div class="col-md-3">
              {AddressRegis ? <p className="textbb">{AddressRegis.ตำบล}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>อำเภอ :  </p>
              </div>
              <div class="col-md-3">
              {AddressRegis ? <p className="textbb">{AddressRegis["อำเภอ/เขต"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>จังหวัด :  </p>
              </div>
              <div class="col-md-3">
              {AddressRegis ? <p className="textbb">{AddressRegis.จังหวัด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>รหัสไปรษณีย์ :  </p>
              </div>
              <div class="col-md-3">
              {AddressRegis ? <p className="textbb">{AddressRegis.รหัสไปรษณีย์}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ประวัติข้อมูลการศึกษา</h3>
        </div>
        {Study != [] ? Study.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <h5>{i + 1}.</h5>
                  <div class="row">
                    <div class="col-md-3">
                      <p>ระดับการศึกษา :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.ระดับการศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ชื่อวุฒิ :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.ชื่อปริญญา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                    <div class="col-md-3">
                      <p>ชื่อสาขา :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.สาขา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>

                  </div>

                </div>
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่อนุมัติปริญญา :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex["วันอนุมัติปริญญา"]}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                    <div class="col-md-3">
                      <p>วันที่ปรับวุฒิการศึกษา :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.วันปรับวุฒิการศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>

                  </div>

                </div>
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หมายเหตุ :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>


                  </div>

                </div>
              </div>
            </>
          )
        }) : null}

      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>




  <Tab eventKey="2" title="ข้อมูลตำแหน่งงาน">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>การบรรจุ</h3>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ประเภทการบรรจุ :  </p>
              </div>
              <div class="col-md-3">
              {EmploymentOrder ? <p className="textbb">{EmploymentOrder.ประเภทการบรรจุ}</p> : null} {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>คำสั่งบรรจุ :  </p>
              </div>
              <div class="col-md-3">
              {EmploymentOrder ? <p className="textbb">{EmploymentOrder.คำสั่งบรรจุ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>คำสั่งเลขที่ :  </p>
              </div>
              <div class="col-md-3">
              {EmploymentOrder ? <p className="textbb">{EmploymentOrder.เลขที่คำสั่ง}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>คำสั่งลงวันที่ :  </p>
              </div>
              <div class="col-md-3">
              {EmploymentOrder ? <p className="textbb">{EmploymentOrder.คำสั่งลงวันที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>เริ่มจ้าง/บรรจุ เมื่อ :  </p>
              </div>
              <div class="col-md-3">
              {EmploymentOrder ? <p className="textbb">{EmploymentOrder["เริ่มจ้าง/บรรจุ"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>ระดับที่เริ่มจ้าง/บรรจุ :  </p>
              </div>
              <div class="col-md-3">
              {EmploymentOrder ? <p className="textbb">{EmploymentOrder["ระดับที่เริ่มจ้าง/บรรจุ"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>รับโอน เมื่อ :  </p>
              </div>
              <div class="col-md-3">
              {EmploymentOrder ? <p className="textbb">{EmploymentOrder.รับโอน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>คำสั่งโอนเลขที่ :  </p>
              </div>
              <div class="col-md-3">
              {EmploymentOrder ? <p className="textbb">{EmploymentOrder.คำสั่งโอนเลขที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ระดับที่โอน :  </p>
              </div>
              <div class="col-md-3">
              {EmploymentOrder ? <p className="textbb">{EmploymentOrder.ระดับที่โอน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>หมายเหตุของการบรรจุ/แหล่งเงิน :  </p>
              </div>
              <div class="col-md-3">
              {EmploymentOrder ? <p className="textbb">{EmploymentOrder["หมายเหตุของการบรรจุ/แหล่งเงิน"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ข้อมูลตำแหน่ง</h3>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>อัตราเลขที่ :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position.อัตราเลขที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>ตำแหน่ง :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position.ตำแหน่ง}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ระดับ :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position.ระดับ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>ปฏิบัติงานที่ :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position.ปฏิบัติงานที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ภาควิชา/ฝ่าย :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position["ภาควิชา/ฝ่าย"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>คณะ/สำนัก/สถาบัน :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position["คณะ/สำนัก/สถาบัน"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>วิทยาเขต :  </p>
              </div>
              <div class="col">
              {Position ? <p className="textbb">{Position.วิทยาเขต}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>เบอร์โทรศัพท์ที่ทำงาน :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position.เบอร์โทรศัพท์ที่ทำงาน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>เบอร์ต่อ :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position.เบอร์ต่อ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>เบอร์ภายใน :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position.เบอร์ภายใน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>เบอร์ต่อ :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position.เบอร์ต่อภายใน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>โทรสาร :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position.โทรสาร}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>เบอร์ต่อ :  </p>
              </div>
              <div class="col-md-3">
              {Position ? <p className="textbb">{Position.เบอร์ต่อโทรสาร}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
          </div>
        </div>

      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>วุฒิการศึกษาตามอัตรา</h3>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>วุฒิการศึกษาตามอัตรา :  </p>
              </div>
              <div class="col-md-3">
              {Educational ? <p className="textbb">{Educational.วุฒิการศึกษาตามอัตรา}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>วุฒิพิเศษ :  </p>
              </div>
              <div class="col-md-3">
              {Educational ? <p className="textbb">{Educational.วุฒิพิเศษ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>วุฒิสูงสุดที่จบ :  </p>
              </div>
              <div class="col-md-3">
              {Educational ? <p className="textbb">{Educational.วุฒิสูงสุดที่จบ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ชื่อปริญญาสูงสุด :  </p>
              </div>
              <div class="col-md-3">
              {Educational ? <p className="textbb">{Educational.ชื่อปริญญาสูงสุด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>ชื่อปริญญาสูงสุด (ย่อ) :  </p>
              </div>
              <div class="col-md-3">
              {Educational ? <p className="textbb">{Educational["ชื่อปริญญาสูงสุด(ย่อ)"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ชื่อปริญญาสูงสุด (ภาษาอังกฤษ) :  </p>
              </div>
              <div class="col-md-3">
              {Educational ? <p className="textbb">{Educational["ชื่อปริญญาสูงสุด(อังกฤษ)"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>ชื่อปริญญาสูงสุด (ย่อภาษาอังกฤษ) :  </p>
              </div>
              <div class="col-md-3">
              {Educational ? <p className="textbb">{Educational["ชื่อปริญญาสูงสุด(ย่ออังกฤษ)"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ชื่อสาขา :  </p>
              </div>
              <div class="col-md-3">
              {Educational ? <p className="textbb">{Educational.ชื่อสาขา}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>ชื่อสาขา (ภาษาอังกฤษ) :  </p>
              </div>
              <div class="col-md-3">
              {Educational ? <p className="textbb">{Educational["ชื่อสาขา(อังกฤษ)"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ชื่อสถานศึกษา :  </p>
              </div>
              <div class="col-md-3">
              {Educational ?  <p className="textbb">{Educational.ชื่อสถานศึกษา}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
              <div class="col-md-3">
                <p>ชื่อสถานศึกษา (ภาษาอังกฤษ) :  </p>
              </div>
              <div class="col-md-3">
              {Educational ? <p className="textbb">{Educational["ชื่อสถานศึกษา(อังกฤษ)"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>
        <div className="rama-x1">
          <div className="rama-x2">
            <div class="row">
              <div class="col-md-3">
                <p>ประเทศที่จบ :  </p>
              </div>
              <div class="col">
              {Educational ? <p className="textbb">{Educational.ประเทศที่จบ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
              </div>
            </div>
          </div>
        </div>

      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>การจ้างต่อ/ขยายเวลาราชการ</h3>
        </div>
        {EmploymentAppoval != [] ? EmploymentAppoval.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <h5>{i + 1}.</h5>
                  <div class="row">
                    <div class="col-md-3">
                      <p>คำสั่งจ้างต่อ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.คำสั่งจ้างต่อ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>คำสั่งเลขที่ :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.คำสั่งเลขที่}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                    <div class="col-md-3">
                      <p>คำสั่งลงวันที่ :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.คำสั่งลงวันที่}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>เริ่มจ้าง เมื่อ :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.เริ่มจ้าง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                    <div class="col-md-3">
                      <p>สิ้นสุดการจ้าง เมื่อ :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.สิ้นสุดการจ้าง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>

  </Tab>
  <Tab eventKey="3" title="เครื่องราชอิสริยาภรณ์">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>เครื่องราชอิสริยาภรณ์</h3>
        </div>
        {Insignia != [] ? Insignia.map((valuex, i) => {
          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <h5>{i + 1}.</h5>
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่รับพระราชทาน :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่รับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ชื่อเครื่องราชอิสริยาภรณ์ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.ชื่อเครื่องราชอิสริยาภรณ์}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ตำแหน่ง :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.ตำแหน่ง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                    <div class="col-md-3">
                      <p>ระดับ :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.ระดับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่เลื่อนระดับ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่เลื่อนระดับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>

            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>
  <Tab eventKey="4" title="งานสอนและสาขาที่สนใจ">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ด้านงานสอน</h3>
        </div>
        {Teaching != [] ? Teaching.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <h5>{i + 1}.</h5>
                  <div class="row">
                    <div class="col-md-3">
                      <p>ระดับการสอน :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.ระดับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>รหัสรายวิชา :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.รหัสวิชา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                    <div class="col-md-3">
                      <p>ชื่อรายวิชา :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.ชื่อไทย} ({valuex.ชื่ออังกฤษ})</p> {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หมายเหตุ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }) : null}
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>สาขาที่เชี่ยวชาญและสนใจ</h3>
        </div>
        {Interested != [] ? Interested.map((valuex, i) => {

          return (
            <>

              <div className="rama-x1">
                <div className="rama-x2">
                  <h5>{i + 1}.</h5>
                  <div class="row">
                    <div class="col-md-3">
                      <p>ชื่อสาขาที่เชี่ยวชาญและสนใจ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.ชื่อไทย} ({valuex.ชื่ออังกฤษ}) </p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }) : null}
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>รางวัลที่ได้รับ</h3>
        </div>
        {Reward != [] ? Reward.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <h5>{i + 1}.</h5>
                  <div class="row">
                    <div class="col-md-3">
                      <p>ปีของผลงาน :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.ปี}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ผลงานรางวัลที่ได้รับ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.รายละเอียด}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>
  <Tab eventKey="5" title="ผลงาน">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ผลงาน</h3>
        </div>
        {Performance != [] ? Performance.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ประเภท :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.ประเภท}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ปีของผลงาน :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.ปี}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ชื่อผลงาน :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.รายละเอียด}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>

    </div>
  </Tab>
  <Tab eventKey="6" title="ประวัติการเลื่อนขั้นเงินเดือน">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ประวัติการเลื่อนขั้นเงินเดือน/ค่าจ้าง/ค่าตอบแทน</h3>
        </div>
        {Salary != [] ? Salary.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>เงินเดือน :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.เงินเดือน}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่เลื่อนระดับ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่เลื่อนขั้น}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ร้อยละ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.ร้อยละ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>เงินพิเศษ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.เงินพิเศษ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หมายเหตุ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }) : null}

      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>
  <Tab eventKey="7" title="ตำแหน่งทางการบริหาร">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ตำแหน่งทางการบริหาร</h3>
        </div>
        {Administrative != [] ? Administrative.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ชื่อตำแหน่ง :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.ชื่อตำแหน่ง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่เริ่มดำรงตำแหน่ง :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันเริ่มดำรงตำแหน่ง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่สิ้นสุด :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันสิ้นสุด}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หมายเหตุ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>

    </div>
  </Tab>
  <Tab eventKey="8" title="ประวัติการขอตำแหน่งทางวิชาการ">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ประวัติการขอตำแหน่งทางวิชาการ</h3>
        </div>
        {PositionAcademicReqHis != [] ? PositionAcademicReqHis.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ชื่อตำแหน่งที่ขอ :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.ชื่อตำแหน่ง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่เริ่มขอ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่เริ่มขอ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่ได้รับ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่ได้รับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>เงินพิเศษประจำตำแหน่ง :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.เงินพิเศษประจำตำแหน่ง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หมายเหตุ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>

            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>

  <Tab eventKey="9" title="ข้อมูลการลาศึกษาต่อ">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ข้อมูลการลาศึกษาต่อ</h3>
        </div>
        {StudyLeave != [] ? StudyLeave.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ระดับการศึกษาที่ลา :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.ระดับการศึกษาที่ลา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่เริ่มศึกษา :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่เริ่มศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่คาดว่าจะจบการศึกษา :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่คาดว่าจะจบการศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หลักสูตรที่ศึกษา :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.หลักสูตรที่ศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>มหาวิทยาลัยที่ศึกษา :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.มหาวิทยาลัยที่ศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ค่าใช้จ่าย :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex["ทุน/เงินส่วนตัว"]}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ประเทศ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.ประเทศ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หมายเหตุ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>

            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>
  <Tab eventKey="10" title="ข้อมูลไปราชการและการอบรม">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ข้อมูลไปราชการและการอบรม</h3>
        </div>
        {Certificate != [] ? Certificate.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ชื่อกิจกรรมราชการที่ไป :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.ชื่อกิจกรรมราชการที่ไป}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันเดินทางไป :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันเดินทางไป}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันเดินทางกลับ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันเดินทางกลับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>งบประมาณ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.งบประมาณ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>สถานที่ไป :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.สถานที่ไป}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หน่วยงานที่จัดกิจกรรม :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.หน่วยงานกิจกรรม}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>Certificate/ใบรับรอง :  </p>
                    </div>
                    <div class="col">
                      <a className="textbb" href={`${api}/file/${localStorage.getItem("accessToken")}/${location.state.gmail}/${valuex["ชื่อในdb"]}`}>เปิดไฟล์</a> {/* ไว้แสดงข้อมูลเสมอ */}

                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หมายเหตุ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>

            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>
  <Tab eventKey="11" title="ข้อมูลประวัติการลา">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ข้อมูลประวัติการลา</h3>
        </div>
        {Leave != [] ? Leave.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ประเภทการลา :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.ประเภทการลา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>เหตุผลที่ลา :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.เหตุผลการลา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่เริ่ม :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่เริ่ม}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันสิ้นสุด :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่สิ้นสุด}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หมายเหตุ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.note}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>

            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>
  <Tab eventKey="12" title="แผนพัฒนาบุคคล">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>แผนการพัฒนาบุคคล</h3>
        </div>
        {Development != [] ? Development.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>จุดเด่น :  </p>
                    </div>
                    <div class="col-md-3">
                      <p className="textbb">{valuex.จุดเด่น}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>จุดด้อย :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.จุดด้อย}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>การปรับปรุง :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.การปรับปรุง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ระยะเวลา :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.ระยะเวลา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>ผลลัพธ์ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.ผลลัพธ์}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หมายเหตุ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>

            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>




  <Tab eventKey="13" title="ไฟล์ส่วนตัว">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ไฟล์ส่วนตัว</h3>
        </div>
        {Module != [] ? Module.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>เอกสาร :  </p>
                    </div>
                    <div class="col-md-3">
                      <a className="textbb" href={`${api}/file/${localStorage.getItem("accessToken")}/${location.state.gmail}/${valuex["ชื่อในdb"]}`}>{valuex.ชื่อเอกสาร}</a>  {/* ไว้แสดงข้อมูลเสมอ */}

                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วันที่เก็บ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่เก็บ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หมายเหตุ :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>

            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>

  <Tab eventKey="14" title="ข้อมูลอื่นๆ">
    <div className="showboxad">
      <p style={{ color: "aquamarine" }} >/</p>
      <div className="infobox2">
        <div className="rama-x3">
          <p style={{ color: "white" }} >/</p>
          <h3>ข้อมูลอื่นๆ</h3>
        </div>
        {otherData != [] ? otherData.map((valuex, i) => {

          return (
            <>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หัวข้อ :  </p>
                    </div>
                    <div class="col-md-3">
                    <p className="textbb">{valuex.หัวข้อ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}

                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วัน/เดือน/ปี :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.วันที่}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="rama-x1">
                <div className="rama-x2">
                  <div class="row">
                    <div class="col-md-3">
                      <p>รายละเอียด :  </p>
                    </div>
                    <div class="col">
                      <p className="textbb">{valuex.รายละเอียด}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>

            </>
          )
        }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${location.state.gmail}`}> 
          <button type="button" class="btn btn-secondary"><VscIcons.VscFilePdf /> File PDF</button>
        </Link>
      </div>
      <p style={{ color: "aquamarine" }} >/</p>
    </div>
  </Tab>
</Tabs>






</div>

    </div>
  )
}
export default ShowdataHr
