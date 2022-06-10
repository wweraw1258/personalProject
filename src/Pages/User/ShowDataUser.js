import React,{ useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from "axios";
import { api } from "../../Component/api";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './ShowdataUser.css';
import * as AiIcons from 'react-icons/ai';
import { Button } from 'reactstrap';
import * as VscIcons from 'react-icons/vsc';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthContext } from '../../App'
import Swal from 'sweetalert2';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




export default function ShowDataUser() {
  const {  Checkx,Error,revokeToken } = useContext(AuthContext);
  const [value, setValue] = React.useState(0);
  let navigate = useNavigate();
  const location = useLocation()
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
  const [otherData, setOtherData] = useState([])
  const [Leave, setLeave] = useState([]);
  const [PositionAcademicReqHis, setPositionAcademicReqHis] = useState([]);
  const [Development, setDevelopment] = useState([]);
  const [Email, setEmail] = useState([]);
  const [Email2, setEmail2] = useState([]);
  const [photo,setPhoto] = useState("https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png")

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getData = async () => {

    try {
      var token = await localStorage.getItem("accessToken")
      const res = await axios.post(`${api}/getprofilefinal`, { accesstoken: token, gmail:localStorage.getItem("gmail")})
      console.log(res.data)
      if (res.data.state == "yes") {

        setPerinfor(res.data.personal_information[0])
        try{
          if(res.data.personal_information[0].รูปภาพ)
          setPhoto(`${api}/file/${localStorage.getItem("accessToken")}/${res.data.personal_information[0].gmail}/${res.data.personal_information[0].รูปภาพ}`)
        }catch(e){
          setPhoto("https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png")
        }
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
        setOtherData(res.data.other_data)
        setDevelopment(res.data.personal_dev_plan)
         setEmail(res.data.personal_information[0].อีเมล.split(","))
    

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
      if (x.state == "yes" && x.data == "user") {
        if (localStorage.getItem("gmail")) {
          getData()
    
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
          <h4 >สถานะ : User </h4>
          <h4>{localStorage.getItem("Name")}</h4>
          <h5>{localStorage.getItem("gmail")}</h5>
        </div>
        <div>
        <a href="/personal/ShowDataUser"><i><AiIcons.AiFillLock /></i> <samp>ข้อมูลส่วนตัว</samp></a>
          <a href="/personal/EditbyUser"><i><AiIcons.AiFillEdit /></i> <samp>แก้ไขข้อมูลส่วนตัว</samp></a>
        
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
        <a href="/personal/ShowDataUser"><i><AiIcons.AiFillLock /></i> <samp>ข้อมูลส่วนตัว</samp></a>
          <a href="/personal/EditbyUser"><i><AiIcons.AiFillEdit /></i> <samp>แก้ไขข้อมูลส่วนตัว</samp></a>
        </div>
      </div>

      <div className="content">
  
    <Box sx={{ width: '100%' }}>
        
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <div className='bgshowUser'>
        <Tabs value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example" >
          <Tab label="ข้อมูลส่วนตัว" {...a11yProps(0)} />
          <Tab label="ข้อมูลตำแหน่งงาน" {...a11yProps(1)} />
          <Tab label="เครื่องราชอิสริยาภรณ์" {...a11yProps(2)} />
          <Tab label="งานสอนและสาขาที่สนใจ" {...a11yProps(3)} />
          <Tab label="ผลงาน" {...a11yProps(4)} />
          <Tab label="ประวัติการเลื่อนขั้นเงินเดือน" {...a11yProps(5)} />
          <Tab label="ตำแหน่งทางการบริหาร" {...a11yProps(6)} />
          <Tab label="ประวัติการขอตำแหน่งทางวิชาการ" {...a11yProps(7)} />
          <Tab label="ข้อมูลการลาศึกษาต่อ" {...a11yProps(8)} />
          <Tab label="ข้อมูลไปราชการและการอบรม" {...a11yProps(9)} />
          <Tab label="ข้อมูลการลา" {...a11yProps(10)} />
          <Tab label="แผนการพัฒนาบุคคล" {...a11yProps(11)} />
          <Tab label="ไฟล์ส่วนตัว" {...a11yProps(12)} />
          <Tab label="ข้อมูลอื่นๆ" {...a11yProps(13)} />
        </Tabs>
        </div>
      </Box>
      
      <TabPanel value={value} index={0}> 

       <div className='showboxUser'>
           <div style={{marginBottom:'30px'}} className='middlepic'>
               <div className="imgprofileUser">
                    <img src={photo}/>
               </div>
               </div>              
            <div class="col">
                   {/* <p style={{color: "white"}} >/</p> */}
                   <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>ข้อมูลส่วนตัว</h4>
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อ-นามสกุล (ภาษาไทย):  </p> 
                          </div>
                          <div class="col">
                            {Perinfor ? <p className="textcus">{Perinfor.คำนำหน้าไทย} {Perinfor.ชื่อจริงไทย} {Perinfor.นามสกุลไทย}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อ-นามสกุล (ภาษาอังกฤษ):  </p> 
                          </div>
                          <div class="col">
                          {Perinfor ? <p className="textcus">{Perinfor.คำนำหน้าอังกฤษ} {Perinfor.ชื่อจริงอังกฤษ} {Perinfor.นามสกุลอังกฤษ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เลขบัตรประจำตัวประชาชน:  </p> 
                          </div>
                          <div class="col">
                          {Perinfor ? <p className="textcus">{Perinfor.เลขบัตรประชาชน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เบอร์โทรศัพท์:  </p> 
                          </div>
                          <div class="col">
                          {Perinfor ? <p className="textcus">{Perinfor.เบอร์โทรศัพท์}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>Gmail:  </p> 
                          </div>
                          <div class="col">
                          <p className="textcus">{Perinfor.gmail}</p> 
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>E-mail:  </p> 
                          </div>
                          <div class="col">
                            {Email != [] ? Email.map((valuex, i) => {

                                return (
                                    <>
                                       <p className="textcus">{valuex}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                                    </>
                                )
                            }) : null}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
            </div>

            <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-2">
                            <p>วัน/เดือน/ปี เกิด:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.วันเกิด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-2">
                            <p>เลขหนังสือเดินทาง:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.พาสปอร์ต}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
        </div>
        <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-2">
                            <p>เพศ:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.เพศ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-2">
                            <p>หมู่เลือด:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.หมู่เลือด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-2">
                            <p>สถานะภาพสมรส:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.สถานะสมรส}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
        </div>
        <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-2">
                            <p>สัญชาติ:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.สัญชาติ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-2">
                            <p>เชื้อชาติ:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.เชื้อชาติ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
        </div>
        <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-2">
                            <p>ศาสนา:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.ศาสนา}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-2">
                            <p>จังหวัดที่เกิด:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.จังหวัดที่เกิด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
        </div>
        <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-2">
                            <p>ประเทศที่เกิด:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.ประเทศที่เกิด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-2">
                            <p>รหัสไปรษณีย์:  </p> 
                          </div>
                          <div class="col-md-2">
                          {Perinfor ? <p className="textcus">{Perinfor.รหัสไปรษณีย์}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
        </div>
        <div class="col">
        <div className="fontcus1">
            <h4 style={{marginBottom:'30px'}}>ที่อยู่ปัจจุบัน</h4>
        </div>
        </div>
        <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-1">
                            <p>ที่อยู่:  </p> 
                          </div>
                          <div class="col-md-5">
                          {AddressNow ? <p className="textcus">{AddressNow.บ้านเลขที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-1">
                            <p>ตรอก/ซอย:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressNow ? <p className="textcus">{AddressNow["ตรอก/ซอย"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-1">
                            <p>ถนน:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressNow ? <p className="textcus">{AddressNow.ถนน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          
                       </div>                        
        </div>

        <div className="fontcus3">
                        <div class="row">
                        <div class="col-md-1">
                            <p>ตำบล:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressNow ? <p className="textcus">{AddressNow.ตำบล}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-1">
                            <p>อำเภอ:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressNow ? <p className="textcus">{AddressNow["อำเภอ/เขต"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-1">
                            <p>จังหวัด:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressNow ? <p className="textcus">{AddressNow.จังหวัด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-1">
                            <p>รหัสไปรษณีย์:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressNow ? <p className="textcus">{AddressNow.รหัสไปรษณีย์}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
        </div>

        <div class="col">
        <div className="fontcus1">
            <h4 style={{marginBottom:'30px'}}>ที่อยู่ตามทะเบียนบ้าน</h4>
        </div>
        </div>
        <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-1">
                            <p>ที่อยู่:  </p> 
                          </div>
                          <div class="col-md-5">
                          {AddressRegis ? <p className="textcus">{AddressRegis.บ้านเลขที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-1">
                            <p>ตรอก/ซอย:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressRegis ? <p className="textcus">{AddressRegis["ตรอก/ซอย"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-1">
                            <p>ถนน:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressRegis ? <p className="textcus">{AddressRegis.ถนน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          
                       </div>                        
        </div>

        <div className="fontcus3">
                        <div class="row">
                        <div class="col-md-1">
                            <p>ตำบล:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressRegis ? <p className="textcus">{AddressRegis.ตำบล}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-1">
                            <p>อำเภอ:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressRegis ? <p className="textcus">{AddressRegis["อำเภอ/เขต"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-1">
                            <p>จังหวัด:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressRegis ? <p className="textcus">{AddressRegis.จังหวัด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-1">
                            <p>รหัสไปรษณีย์:  </p> 
                          </div>
                          <div class="col-md-2">
                          {AddressRegis ? <p className="textcus">{AddressRegis.รหัสไปรษณีย์}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
        </div>

        <div class="col">
                   {/* <p style={{color: "white"}} >/</p> */}
                   <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>ประวัติข้อมูลการศึกษา</h4>
                    </div>

                    {Study != [] ? Study.map((valuex, i) => {

                   return (
                      <>
                      <div className="fontcus2">
                        <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ระดับการศึกษา:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ระดับการศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                        <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อวุฒิ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ชื่อปริญญา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                        <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อสาขา:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.สาขา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                    <div className="fontcus3">
                            <div class="row">
                              <div class="col-md-3">
                                <p>วันที่อนุมัติปริญญา :  </p>
                              </div>
                              <div class="col-md-3">
                                <p className="textcus">{valuex["วันอนุมัติปริญญา"]}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                              </div>
                              <div class="col-md-3">
                                <p>วันที่ปรับวุฒิการศึกษา :  </p>
                              </div>
                              <div class="col-md-3">
                                <p className="textcus">{valuex.วันปรับวุฒิการศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                              </div>
                            </div>
                          </div>
                    </div>

                    <div className="fontcus2">
                    <div className="fontcus3">
                            <div class="row">
                              <div class="col-md-3">
                                <p>หมายเหตุ :  </p>
                              </div>
                              <div class="col-md-3">
                                <p className="textcus">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                              </div>
                            </div>
                    </div>
                    </div>
             </>
             )
           }) : null} 
           </div>
        </div>
        <div className="midbut">
          <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}>         
            <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
          </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className='showboxUser'>
      <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>การบรรจุ</h4>
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ประเภทการบรรจุ:  </p> 
                          </div>
                          <div class="col-md-3">
                          {EmploymentOrder ? <p className="textcus">{EmploymentOrder.ประเภทการบรรจุ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>คำสั่งบรรจุ:  </p> 
                          </div>
                          <div class="col-md-3">
                          {EmploymentOrder ? <p className="textcus">{EmploymentOrder.คำสั่งบรรจุ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>คำสั่งเลขที่:  </p> 
                          </div>
                          <div class="col-md-3">
                          {EmploymentOrder ? <p className="textcus">{EmploymentOrder.เลขที่คำสั่ง}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>คำสั่งลงวันที่:  </p> 
                          </div>
                          <div class="col-md-3">
                          {EmploymentOrder ? <p className="textcus">{EmploymentOrder.คำสั่งลงวันที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>  
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เริ่มจ้าง/บรรจุ เมื่อ:  </p> 
                          </div>
                          <div class="col-md-3">
                          {EmploymentOrder ? <p className="textcus">{EmploymentOrder["เริ่มจ้าง/บรรจุ"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>ระดับที่เริ่มจ้าง/บรรจุ:  </p> 
                          </div>
                          <div class="col-md-3">
                          {EmploymentOrder ? <p className="textcus">{EmploymentOrder["ระดับที่เริ่มจ้าง/บรรจุ"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div> 
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>รับโอน เมื่อ:  </p> 
                          </div>
                          <div class="col-md-3">
                          {EmploymentOrder ? <p className="textcus">{EmploymentOrder.รับโอน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>คำสั่งโอนเลขที่:  </p> 
                          </div>
                          <div class="col-md-3">
                          {EmploymentOrder ? <p className="textcus">{EmploymentOrder.คำสั่งโอนเลขที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div> 
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ระดับที่โอน:  </p> 
                          </div>
                          <div class="col-md-3">
                          {EmploymentOrder ? <p className="textcus">{EmploymentOrder.ระดับที่โอน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>หมายเหตุของการบรรจุ/แหล่งเงิน:  </p> 
                          </div>
                          <div class="col-md-3">
                          {EmploymentOrder ? <p className="textcus">{EmploymentOrder["หมายเหตุของการบรรจุ/แหล่งเงิน"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div> 

          <div className="fontcus1"> 
                    <h4 style={{marginBottom:'30px'}}>ข้อมูลตำแหน่ง</h4>
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>อัตราเลขที่:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position.อัตราเลขที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>ตำแหน่ง:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position.ตำแหน่ง}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ระดับ:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position.ระดับ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>ปฏิบัติงานที่:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position.ปฏิบัติงานที่}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ภาควิชา/ฝ่าย:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position["ภาควิชา/ฝ่าย"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>คณะ/สำนัก/สถาบัน:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position["คณะ/สำนัก/สถาบัน"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วิทยาเขต:  </p> 
                          </div>
                          <div class="col">
                          {Position ? <p className="textcus">{Position.วิทยาเขต}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เบอร์โทรศัพท์ที่ทำงาน:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position.เบอร์โทรศัพท์ที่ทำงาน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>เบอร์ต่อ:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position.เบอร์ต่อ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เบอร์ภายใน:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position.เบอร์ภายใน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>เบอร์ต่อ:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position.เบอร์ต่อภายใน}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>โทรสาร:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Position ? <p className="textcus">{Position.โทรสาร}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">                    
                      </div>                    
                    </div>

        <div className="fontcus1"> 
                    <h4 style={{marginBottom:'30px'}}>วุฒิการศึกษาตามอัตรา</h4>
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วุฒิการศึกษาตามอัตรา:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational.วุฒิการศึกษาตามอัตรา}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>วุฒิพิเศษ:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational.วุฒิพิเศษ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วุฒิสูงสุดที่จบ:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational.วุฒิสูงสุดที่จบ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อปริญญาสูงสุด:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational.ชื่อปริญญาสูงสุด}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>ชื่อปริญญาสูงสุด (ย่อ):  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational["ชื่อปริญญาสูงสุด(ย่อ)"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อปริญญาสูงสุด (ภาษาอังกฤษ):  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational["ชื่อปริญญาสูงสุด(อังกฤษ)"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>ชื่อปริญญาสูงสุด (ย่อภาษาอังกฤษ):  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational["ชื่อปริญญาสูงสุด(ย่ออังกฤษ)"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อสาขา:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational.ชื่อสาขา}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>ชื่อสาขา (ภาษาอังกฤษ):  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational["ชื่อสาขา(อังกฤษ)"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อสถานศึกษา:  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational.ชื่อสถานศึกษา}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>ชื่อสถานศึกษา (ภาษาอังกฤษ):  </p> 
                          </div>
                          <div class="col-md-3">
                          {Educational ? <p className="textcus">{Educational["ชื่อสถานศึกษา(อังกฤษ)"]}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ประเทศที่จบ:  </p> 
                          </div>
                          <div class="col">
                          {Educational ? <p className="textcus">{Educational.ประเทศที่จบ}</p> : null}  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

        <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>การจ้างต่อ/ขยายเวลาราชการ</h4>
                    </div>
                    {EmploymentAppoval != [] ? EmploymentAppoval.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                         <h5>{i + 1}.</h5>
                        <div class="row">
                          <div class="col-md-3">
                            <p>คำสั่งจ้างต่อ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.คำสั่งจ้างต่อ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>คำสั่งเลขที่:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.คำสั่งเลขที่}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>คำสั่งลงวันที่:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.คำสั่งลงวันที่}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เริ่มจ้าง เมื่อ:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.เริ่มจ้าง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>สิ้นสุดการจ้าง เมื่อ:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.สิ้นสุดการจ้าง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    </>
                  )
                }) : null}

      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <div className='showboxUser'>
      <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>เครื่องราชอิสริยาภรณ์</h4>
                    </div>
                    {Insignia != [] ? Insignia.map((valuex, i) => {
                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                         <h5>{i + 1}.</h5>
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันที่รับพระราชทาน:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันที่รับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อเครื่องราชอิสริยาภรณ์:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ชื่อเครื่องราชอิสริยาภรณ์}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ตำแหน่ง:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.ตำแหน่ง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>ระดับ:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.ระดับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันที่เลื่อนระดับ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันที่เลื่อนระดับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    </>
                  )
                }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <div className='showboxUser'>
      <div className="fontcus1"> 
                    <h4 style={{marginBottom:'30px'}}>ด้านงานสอน</h4>
                    </div>
                    {Teaching != [] ? Teaching.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                         <h5>{i + 1}.</h5>
                        <div class="row">
                          <div class="col-md-3">
                            <p>ระดับการสอน:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ระดับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>รหัสรายวิชา:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.รหัสวิชา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                          <div class="col-md-3">
                            <p>ชื่อรายวิชา:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.ชื่อไทย} ({valuex.ชื่ออังกฤษ})</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>หมายเหตุ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    </>
                  )
                }) : null}
   
    <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>สาขาที่เชี่ยวชาญและสนใจ</h4>
                    </div>
                     {Interested != [] ? Interested.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                         <h5>{i + 1}.</h5>
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อสาขาที่เชี่ยวชาญและสนใจ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ชื่อไทย} ({valuex.ชื่ออังกฤษ})</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    </>
                  )
                }) : null}
    <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>รางวัลที่ได้รับ</h4>
                    </div>
                    {Reward != [] ? Reward.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                         <h5>{i + 1}.</h5>
                        <div class="row">
                          <div class="col-md-3">
                            <p>ปีของผลงาน:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ปี}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ผลงานรางวัลที่ได้รับ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.รายละเอียด}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                  
                     </>
                     )
                   }) : null}  
          </div>
          <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={4}>
      <div className='showboxUser'>
    <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>ผลงาน</h4>
                    </div>
                    {Performance != [] ? Performance.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ประเภท:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ประเภท}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ปีของผลงาน:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ปี}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อผลงาน:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.รายละเอียด}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                   </div>
                   </>
                  )
                }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={5}>
      <div className='showboxUser'>
      <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>ประวัติการเลื่อนขั้นเงินเดือน/ค่าจ้าง/ค่าตอบแทน</h4>
                    </div>
                    {Salary != [] ? Salary.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เงินเดือน:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.เงินเดือน}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันที่เลื่อนระดับ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันที่เลื่อนขั้น}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เปอร์เซ็นต์(%):  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ร้อยละ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เงินพิเศษ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.เงินพิเศษ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>หมายเหตุ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    </>
                  )
                }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={6}>
      <div className='showboxUser'>
      <div className="fontcus1"> 
                    <h4 style={{marginBottom:'30px'}}>ตำแหน่งทางการบริหาร</h4>
                    </div>
                    {Administrative != [] ? Administrative.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อตำแหน่ง:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.ชื่อตำแหน่ง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันที่เริ่มดำรงตำแหน่ง:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันเริ่มดำรงตำแหน่ง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันที่สิ้นสุด:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันสิ้นสุด}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>หมายเหตุ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    </>
                  )
                }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={7}>
      <div className='showboxUser'>
      <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>ประวัติการขอตำแหน่งทางวิชาการ</h4>
                    </div>
                    {PositionAcademicReqHis != [] ? PositionAcademicReqHis.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อตำแหน่งที่ขอ:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.ชื่อตำแหน่ง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันที่เริ่มขอ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันที่เริ่มขอ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันที่ได้รับ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันที่ได้รับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เงินพิเศษประจำตำแหน่ง:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.เงินพิเศษประจำตำแหน่ง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>หมายเหตุ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    </>
                  )
                }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={8}>

      <div className='showboxUser'>
      <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>ข้อมูลการลาศึกษาต่อ</h4>
                    </div>
                    {StudyLeave != [] ? StudyLeave.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ระดับการศึกษาที่ลา:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.ระดับการศึกษาที่ลา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันที่เริ่มศึกษา:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันที่เริ่มศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันที่คาดว่าจะจบการศึกษา:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันที่คาดว่าจะจบการศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>หลักสูตรที่ศึกษา:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.หลักสูตรที่ศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>มหาวิทยาลัยที่ศึกษา:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.มหาวิทยาลัยที่ศึกษา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ค่าใช้จ่าย:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex["ทุน/เงินส่วนตัว"]}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ประเทศ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ประเทศ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>หมายเหตุ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    </>
                  )
                }) : null}
      </div>  
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={9}>
      <div className='showboxUser'>
      <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>ข้อมูลไปราชการและการอบรม</h4>
                    </div>
                      {Certificate != [] ? Certificate.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ชื่อกิจกรรมการไปราชการ:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.ชื่อกิจกรรมราชการที่ไป}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันเดินทางไป:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันเดินทางไป}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันเดินทางกลับ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันเดินทางกลับ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>งบประมาณ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.งบประมาณ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>สถานที่ไป:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.สถานที่ไป}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>หน่วยงานที่จัดกิจกรรม:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.หน่วยงานกิจกรรม}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>Certificate/ใบรับรอง:  </p> 
                          </div>
                          <div class="col">
                          <a className="textcus" href={`${api}/file/${localStorage.getItem("accessToken")}/${localStorage.getItem("gmail")}/${valuex["ชื่อในdb"]}`}>เปิดไฟล์</a> {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>หมายเหตุ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    </>
                  )
                }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={10}>
      <div className='showboxUser'>
      <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>ข้อมูลประวัติการลา</h4>
                    </div>
                    {Leave != [] ? Leave.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ประเภทการลา:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.ประเภทการลา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>เหตุผลที่ลา:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.เหตุผลการลา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันที่เริ่ม:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันที่เริ่ม}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>วันสิ้นสุด:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.วันที่สิ้นสุด}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>หมายเหตุ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.note}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    </>
                  )
                }) : null}               
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
      <TabPanel value={value} index={11}>
      <div className='showboxUser'>
      <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>แผนการพัฒนาบุคคล</h4>
                    </div>
                    {Development != [] ? Development.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>จุดเด่น:  </p> 
                          </div>
                          <div class="col-md-3">
                            <p className="textcus">{valuex.จุดเด่น}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>จุดด้อย:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.จุดด้อย}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>การปรับปรุง:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.การปรับปรุง}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ระยะเวลา:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ระยะเวลา}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>
                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>ผลลัพธ์:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.ผลลัพธ์}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>

                    <div className="fontcus2">
                         <div className="fontcus3">
                        <div class="row">
                          <div class="col-md-3">
                            <p>หมายเหตุ:  </p> 
                          </div>
                          <div class="col">
                            <p className="textcus">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                          </div>
                       </div>                        
                      </div>                    
                    </div>  
                    </>
                  )
                }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>

      <TabPanel value={value} index={12}>
      <div className='showboxUser'>
      <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>ไฟล์ส่วนตัว</h4>
                    </div>
                    {Module != [] ? Module.map((valuex, i) => {

                  return (
                    <>
                    <div className="fontcus2">
                          <div className="fontcus3">
                            <div class="row">
                              <div class="col-md-3">
                                <p>เอกสาร :  </p>
                              </div>
                              <div class="col-md-3">
                                <a className="textcus" href={`${api}/file/${localStorage.getItem("accessToken")}/${localStorage.getItem("gmail")}/${valuex["ชื่อในdb"]}`}>{valuex.ชื่อเอกสาร}</a>  {/* ไว้แสดงข้อมูลเสมอ */}

                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="fontcus2">
                          <div className="fontcus3">
                            <div class="row">
                              <div class="col-md-3">
                                <p>วันที่เก็บ :  </p>
                              </div>
                              <div class="col">
                                <p className="textcus">{valuex.วันที่เก็บ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="fontcus2">
                          <div className="fontcus3">
                            <div class="row">
                              <div class="col-md-3">
                                <p>หมายเหตุ :  </p>
                              </div>
                              <div class="col">
                                <p className="textcus">{valuex.หมายเหตุ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                              </div>
                            </div>
                          </div>
                        </div>  
                    </>
                  )
                }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>

      <TabPanel value={value} index={13}>
      <div className='showboxUser'>
      <div className="fontcus1">
                    <h4 style={{marginBottom:'30px'}}>ข้อมูลอื่นๆ</h4>
                    </div>
                    {otherData != [] ? otherData.map((valuex, i) => {

          return (
            <>
              <div className="fontcus2">
                <div className="fontcus3">
                  <div class="row">
                    <div class="col-md-3">
                      <p>หัวข้อ :  </p>
                    </div>
                    <div class="col-md-3">
                    <p className="textcus">{valuex.หัวข้อ}</p>  {/* ไว้แสดงข้อมูลเสมอ */}

                    </div>
                  </div>
                </div>
              </div>
              <div className="fontcus2">
                <div className="fontcus3">
                  <div class="row">
                    <div class="col-md-3">
                      <p>วัน/เดือน/ปี :  </p>
                    </div>
                    <div class="col">
                      <p className="textcus">{valuex.วันที่}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="fontcus2">
                <div className="fontcus3">
                  <div class="row">
                    <div class="col-md-3">
                      <p>รายละเอียด :  </p>
                    </div>
                    <div class="col">
                      <p className="textcus">{valuex.รายละเอียด}</p>  {/* ไว้แสดงข้อมูลเสมอ */}
                    </div>
                  </div>
                </div>
              </div>

            </>
          )
          }) : null}
      </div>
      <div className="midbut">
        <Link to={`/PDFprintdata?gmail=${localStorage.getItem("gmail")}`}> 
        <button type="button" class="btn btn-success"><VscIcons.VscFilePdf/> File PDF</button>
        </Link>
        </div>
      </TabPanel>
    </Box>
    </div>
    </div>
  );
}