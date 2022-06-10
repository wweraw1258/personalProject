import React, { useEffect, useState, useContext } from "react";
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from "react-icons/fi";
import { Button } from 'reactstrap';
import axios from "axios";
import { api } from "../../Component/api";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../App'
const AddData = () => {

    const [dbname, setDbName] = useState("")
    const [newValue, setNewValue] = useState([])
    const [dataSelect,setDataSelect] = useState(null)
    const [stateSelect, setStateSelect] = useState(0)
    const [header, setHeader] = useState(null)
    const [theader, setTHeader] = useState([])
    const [data, setData] = useState([])
    const { Checkx,Error,revokeToken } = useContext(AuthContext);
    let navigate = useNavigate();
    const [editValue, setEditValue] = useState([])


    const getalltag = async (id) => {
        setTHeader([])
        setData([])
        setNewValue([])
        const token = localStorage.getItem("accessToken")
        if (id == 1) {
            setDbName("education_level_list")
            var db = "education_level_list"
        } else if (id == 2) {
            setDbName("position_academic_list")
            var db = "position_academic_list"
        } else if (id == 3) {
            setDbName("menagement_position_list")
            var db = "menagement_position_list"
        } else if (id == 4) {
            setDbName("subject")
            var db = "subject"
        } else if (id == 5) {
            setDbName("leave_type")
            var db = "leave_type"
        } else if (id == 6) {
            setDbName("skill_list")
            var db = "skill_list"
        } else if (id == 7) {
            setDbName("work_type")
            var db = "work_type"
        } else if (id == 8) {
            setDbName("title_name")
            var db = "title_name"
        }
        else {
            var db = "unknow"
        }
        if (token && db != "unknow") {
            try {
                const res = await axios.post(`${api}/getDefaultData`, { accesstoken: token, db: db })
                if (res.data.state == "yes") {
                    setHeader(Object.keys(res.data.data[0]))
                    setData(res.data.data)
                    Object.keys(res.data.data).map((value, i) => {
                        if (value != "id")
                            newValue.push(null)

                    })

                } else {

                    (res.data.data).map((value) => {
                        console.log(value.COLUMN_NAME)
                        theader.push(value.COLUMN_NAME)
                    })

                    setHeader(theader)
                }




            }
            catch (e) {
                Error()
                navigate("/")
            }
        }
        else {

        }
    }


    useEffect(async () => {
        const x = await Checkx()
        try {
          if (x.state == "yes" && x.data == "admin") {
            getalltag() 
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

    const deleteTag = async (idValue) => {
        Swal.fire({
            title: 'แน่ใจ?',
            text: "คุณจะไม่สามารถกู้คืนข้อมูลได้!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ใช่, ฉันต้องการลบ!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const token = localStorage.getItem("accessToken")
                if (token) {
                    try {
                        const res = await axios.post(`${api}/deleteTag`, { accesstoken: token, dbName: dbname, idValue: idValue })
                        if (res.data.state == "yes") {

                            Swal.fire(
                                'เรียบร้อย',
                                'ลบข้อความเรียบร้อย',
                                'success'
                            ).then(() => { getalltag(stateSelect) })

                        }
                        else {

                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'เกิดข้อผิดพลาด',

                            })

                        }
                    }
                    catch (e) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'เกิดข้อผิดพลาด',

                        })
                    }
                }
                else {

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'เกิดข้อผิดพลาด',
                    })
                }
            }
        })
    }


    const editTag = async (idValue) => {
        var x = ''
        var temp_data = []    
        header.map((value, i) => {         
            if (value != "id" && value!="language")
            
            x = x + '<p style="font-family:verdana;padding:20px" >' + value + '</p>' + '<input id="' + value + '"class="swal2-input"  value= ' +'"' + idValue[value] + '"/>'
        })    
        Swal.fire({
            showCancelButton: true,
            html: x,
            preConfirm: () => {        
                header.map((value, i) => {
                    if (value == "id" || value=="language") { 
                        temp_data.push(idValue[value])
                    } else {
                        temp_data.push(document.getElementById(value).value)
                        if (!document.getElementById(value).value) {
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'เกิดข้อผิดพลาด',
                            })
                        }
                    }

                })
            }
        }).then(async (result) => {
            console.log(temp_data)
            if (result.isConfirmed) {
                try {
                    var token = localStorage.getItem("accessToken")
                 
                    const res = await axios.post(`${api}/editTag`, { accesstoken: token, db: dbname, data: temp_data })
                    if (res.data.state == "yes") {
                        Swal.fire(
                            'เรียบร้อย',
                            'แก้ไขข้อความเรียบร้อย',
                            'success'
                        ).then(() => { getalltag(stateSelect) })

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'เกิดข้อผิดพลาด',

                        })
                    }
                } catch (e) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'เกิดข้อผิดพลาด',

                    })
                }

            }
        })
    }




    const addTag = async () => {
        if (newValue.length == 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'กรุณาใส่ข้อความ',
            })
        } else {

            const token = localStorage.getItem("accessToken")
            if (token) {
                try {
                    const res = await axios.post(`${api}/addTag`, { accesstoken: token, newValue: newValue, dbName: dbname })
                    if (res.data.state == "yes") {

                        Swal.fire(
                            'เรียบร้อย',
                            'เพิ่มข้อความเรียบร้อย',
                            'success'
                        ).then(() => { getalltag(stateSelect) })
                    }
                    else {

                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'เกิดข้อผิดพลาด',

                        })

                    }
                }
                catch (e) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'เกิดข้อผิดพลาด',

                    })
                }
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'เกิดข้อผิดพลาด',

                })
            }
        }

    }



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
             <a href="/personal/AddUser"><i><AiIcons.AiOutlineUsergroupAdd /></i> <samp>เพิ่มบุคลากร</samp></a>
            <a href="/personal/AddData"><i><AiIcons.AiFillEdit /></i> <samp>กรอกข้อมูลเพิ่มเติม</samp></a>
            <a href="/personal/openServer"><i><AiIcons.AiFillExclamationCircle /></i> <samp>สถานะระบบ</samp></a>
                </div>
            </div>




            <div className="content">
                <p class="fs-3">กรอกข้อมูลเพิ่มเติม</p>
                <select class="form-select" aria-label=".form-select-lg example" onChange={(event) => {
                    setStateSelect(event.target.value)
                    getalltag(event.target.value);
                }}>
                    <option selected value={0}>เลือกหัวข้อ...</option>
                    <option value={1} href="#">ระดับการศึกษา</option>
                    <option value={2} href="#">ตำแหน่งทางวิชาการ</option>
                    <option value={3} href="#">ตำแหน่งบริหาร</option>
                    <option value={4} href="#">รายชื่อวิชา</option>
                    <option value={5} href="#">ประเภทการลา</option>
                    <option value={6} href="#">ความเชี่ยวชาญ</option>
                    <option value={7} href="#">ประเภทของผลงาน</option>
                    <option value={8} href="#">คำนำหน้า</option>
                </select>


                <p class="fs-5" style={{ marginTop: '10px' }}>แสดงข้อมูล</p>
                <div class="table-responsive">
                    <table class="table table-striped table-hover table-info">
                        <thead>

                            <tr>
                                {header ?

                                    header.map((value, i) => {
                                        if(value!="id"){
                                        return (

                                            <th scope="col">{value}</th>



                                        )}
                                    })
                                    : null}
                                <th scope="col">แก้ไขข้อมูล</th>
                            </tr>
                        </thead>
                        {data ?

                            <tbody>


                                {data.map((value, i) => {

                                    
                                    
                                    var kk = []
                                    for (const x in value) {
                                        if( x != "id")
                                        kk.push(value[x])
                                    }

                                    console.log(kk)
                                    return (
                                        <tr>
                                           

                                            {kk.map((text, i) => {
                                         
                                              
                                                    return (

                                                        <td >
                                                            {text}
                                                        </td>
                                                    )
                                                
                                            })}





                                            <td >

                                                <button class="btn btn-outline" onClick={() => { editTag(value) }} >
                                                    <AiIcons.AiFillEdit />
                                                </button>


                                                <button class="btn btn-outline" onClick={() => { deleteTag(value[header[0]]) }} >
                                                    <AiIcons.AiFillDelete />
                                                </button>
                                            </td>
                                        </tr>

                                    )
                                })}




                            </tbody> : null}



                    </table>
                </div>

                <p class="fs-5">กรอกข้อมูล</p>


                {header ?

                    header.map((value, i) => {
                        if (value != "id") {

                            if (value == "language") {
                                return (
                                    <select class="form-select" aria-label=".form-select-lg example" onChange={(event) => newValue[i] = (event.target.value)}>
                                        <option selected value={0}>เลือกภาษา</option>
                                        <option value={"TH"} href="#">TH</option>
                                        <option value={"ENG"} href="#">ENG</option>
                                    </select>

                                )

                            }
                            else {

                                return (
                                    <>
                                        <div>{value}</div>
                                        <input type="text" class="form-control" placeholder={value} aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(event) => newValue[i] = (event.target.value)} />
                                    </>


                                )
                            }


                        }
                    })
                    : null}





                <button onClick={() => { addTag(newValue) }} class="btn btn-success" type="button" id="button-addon2">เพิ่ม</button>
            </div>

        </div >
    )
}


export default AddData