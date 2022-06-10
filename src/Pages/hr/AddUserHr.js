import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { api } from "../../Component/api";
import "../editAdmin.css"
import * as AiIcons from 'react-icons/ai';
import { Button, Form } from 'reactstrap';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

const AddUserHr = () => {
    const { Checkx, Error,revokeToken } = useContext(AuthContext);
    let navigate = useNavigate()
    var id = 0
    let alldata = new FormData()
    const [amphoeList, setAmphoeList] = useState([])
    const [amphoeTempList, setAmphoeTempList] = useState([])
    const [provinceList, setProvinceList] = useState([])
    const [subdistrictList, setSubdistrictList] = useState([])
    const [subdistrictListTemp, setSubdistrictListTemp] = useState([])

    const [amphoeTempList1, setAmphoeTempList1] = useState([])

    const [subdistrictListTemp1, setSubdistrictListTemp1] = useState([])


    const [dataSelect, setDataSelect] = useState(null)
    const [idcard, setIdcard] = useState("");


    const [tel, setTel] = useState("");

    const [photo, setPhoto] = useState("https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg");
    const [dataPhoto, setDataPhoto] = useState(null)

    //***********************************************************************************888
    const [addressRegis, setAddressRegis] = useState("")
    const [alleyRegis, setAlleyRigis] = useState("")
    const [roadRegis, setRoadRegis] = useState("")
    const [provinceRegis, setProvinceRegis] = useState("")
    const [districtRegis, setDistrictRegis] = useState("")
    const [subDistrictRegis, setSubdistrictRegis] = useState("")
    const [zipcodeRegis, setZipcodeRegis] = useState("")
  
    // ***********************************************************************************88







    const [Email, setEmail] = useState([{
        "form": <div>
            <div className="rama-x">
                <p>อีเมลอื่นๆ</p>
            </div>
            <input type="email" class="form-control" placeholder="อีเมล" id="email0" />
        </div>
        , "value": 0
        , "email": ""
    }
    ])

    const [Administrative, setAdministrative] = useState([])

    const [skill, setSkill] = useState([{
        "form":
            <select class="form-select form-select" aria-label=".form-select-sm example " id="skill0">
                <option selected value={0}>โปรดระบุ...</option>
                {dataSelect != null ? dataSelect.skill_list.map((valuex, i) => {

                    return (
                        <>
                            {<option value={valuex.id}>{valuex.ชื่อไทย}   {valuex.ชื่ออังกฤษ}</option>}
                        </>
                    )
                }) : null}


            </select>, "value": 0
    }
    ])



    const [certificate, setCertificate] = useState([])

    const [Salary, setSalary] = useState([])


    const [summit, setSummit] = useState([{
        "form":
            <><input type="file" class="form-control" />
                <div className="ramaya">
                    <select class="form-select form-select" aria-label=".form-select-sm example" >
                        <option selected value={0}>โปรดระบุ...</option>
                        {/* {skillList != null ? skillList.map((valuex, i) => {
                                return (
                                    <>
                                        {<option value={valuex.value}>{valuex.data}</option>}
                                    </>
                                )
                            }) : null}              */}


                    </select></div>
                <input type="date" class="form-control" /></>

        , "value": 0
    }
    ])


    const [Insignia, setInsignia] = useState([])

    const [Module, setModule] = useState([])

    const [LeavetoS, setLeavetoS] = useState([])

    const [Leave, setLeave] = useState([])

    const [Position, setPosition] = useState([])

    const [Develop, setDevelop] = useState([])

    const [appoval, setAppoval] = useState([])

    const [Interested, setInterested] = useState([])

    const [Study, setStudy] = useState([])

    const [Teaching, setTeaching] = useState([])

 

    const [Article, setArticle] = useState([])



  

    const [Reward, setReward] = useState([])
    const [otherData, setOtherData] = useState([])

    const reader = new FileReader();


    const setPhotox = (e) => {

        setDataPhoto(e.target.files[0])
        reader.onload = () => {
            if (reader.readyState === 2) {
                setPhoto(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])

    }
    const pushMoreEmail = () => {

        var textEmail = "email" + Email.length
        if (Email.length) {
            setEmail([...Email, {
                "form":

                    <div>
                        <input type="email" class="form-control" placeholder="อีเมล" id={textEmail} />
                    </div>
                , "value": Email.length + 1
                , "email": ""

            }])
        }
    }


    const removeEmail = () => {
        const value = [...Email];
        value.pop()
        if (value.length >= 1) {
            setEmail(value)
        }
    }


    const pushMoreReward = () => {
        if (Reward.length) {
            setReward([...Reward, {
                "form":
                    <>

                        <div className="rama-x">
                            <p>ปีของผลงาน</p>
                        </div>
                        <div class="mb-3">
                            <input type="number" class="form-control" min="1900" max="2099" step="1" id={"rewardYear" + Reward.length} />
                        </div>

                        <div class="mb-3">
                            <textarea class="form-control" placeholder="ชื่อรางวัล/ชื่อหัวข้อที่ได้รับรางวัล/ชื่อระดับการแข่งขัน/ปีที่ได้รับ" id={"rewardDetail" + Reward.length}></textarea>
                        </div>
                    </>
                , "value": 0
            }])
        }
    }


    const removeReward = () => {
        const value = [...Reward];
        value.pop()
        if (value.length >= 1) {
            setReward(value)
        }
    }



    const pushMoreOtherData = () => {
        if (otherData.length) {
            setOtherData([...otherData, {
                "form":
                    <>


                        <div className="rama-x">
                            <p>ข้อมูลอื่นๆ</p>
                        </div>


                        <div class="mb-3">
                            <p>หัวข้อ</p>
                            <textarea class="form-control" placeholder="ชื่อหัวข้อ" id={"otherName"+otherData.length}></textarea>
                        </div>

                        <div class="mb-3">
                            <p>วัน/เดือน/ปี</p>
                            <input class="form-control" type="date" min="1900" max="2099" step="1" id={"otherDate"+otherData.length} />
                        </div>

                        <div class="mb-3">
                            <p>รายละเอียด</p>
                            <textarea class="form-control" placeholder="รายละเอียด" id={"otherDetail"+otherData.length}></textarea>
                        </div>
                    </>
                , "value": 0
            }
        
        ])
        }
    }

    const removeOhterData= () => {
        const value = [...otherData];
        value.pop()
        if (value.length >= 1) {
            setOtherData(value)
        }
    }

    //แก้ด้วยการ fetch
    const pushMoreAdministrative = () => {
        if (Administrative.length) {
            setAdministrative([...Administrative, {
                "form":
                    <>
                        <div className="rama-x">

                            <p>ชื่อตำแหน่ง</p>
                        </div>
                        <select class="form-select form-select" aria-label=".form-select-sm example" id={"AdministName"+Administrative.length} >
                            <option selected value={""}>โปรดระบุ...</option>

                            {dataSelect != null ? dataSelect.menagement_position_list.map((valuex, i) => {

                                return (
                                    <>
                                        {<option value={valuex.id}>{valuex.ตำแหน่ง}</option>}
                                    </>
                                )

                            }) : null}


                        </select>
                        <div class="row">
                            <div class="col-md-6">
                                <div className="rama-x">
                                    <p>วันเริ่มดำรงตำแหน่ง</p>
                                </div>
                                <input type="date" class="form-control" id={"Administfirstday" + Administrative.length} />
                            </div>
                            <div class="col-md-6">
                                <div className="rama-x">
                                    <p>วันสิ้นสุด</p>
                                </div>
                                <input type="date" class="form-control" id={"Administlastday" + Administrative.length} />
                            </div>
                        </div>
                        <div className="rama-x">
                            <p>หมายเหตุ</p>
                        </div>
                        <textarea type="text" class="form-control" placeholder="หมายเหตุ" id={"Administnote" + Administrative.length} />
                    </>
                , "value": 0
            }])
        }
    }


    const removeAdministrative = () => {
        const value = [...Administrative];
        value.pop()
        if (value.length >= 1) {
            setAdministrative(value)
        }
    }


    const pushMoreArticle = () => {
        if (Article.length) {
            setArticle([...Article, {
                "form":
                    <>
                        <div className="rama-x">
                            <p>ประเภท</p>
                        </div>
                        <select class="form-select form-select" aria-label=".form-select-sm example" id={"workType" + Article.length}>
                            <option selected value={""}>โปรดระบุ...</option>
                            {dataSelect.work_type ?
                                dataSelect.work_type.map((value, i) => {
                                    return (
                                        <option selected value={value.id}>{value.ประเภทผลงาน}</option>
                                    )
                                })
                                : null}

                        </select>


                        <div className="rama-x">
                            <p>ปีของผลงาน</p>
                        </div>
                        <div class="mb-3">
                            <input class="form-control" type="number" min="1900" max="2099" step="1" id={"workYear" + Article.length} />
                        </div>

                        <div className="rama-x">
                            <p>รายละเอียด</p>
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control" placeholder="รายละเอียดผลงาน" id={"workDetail" + Article.length} />
                        </div>
                    </>
                , "value": 0
            }])
        }
    }


    const removeArticle = () => {
        const value = [...Article];
        value.pop()
        if (value.length >= 1) {
            setArticle(value)
        }
    }


    const pushMoreTeaching = () => {
        if (Teaching.length) {
            setTeaching([...Teaching, {
                "form":
                    <>
                        <div className="rama-x">
                            <p>ระดับการสอน</p>
                        </div>
                        <select class="form-select form-select" aria-label=".form-select-sm example" id={"teachingRank" + Teaching.length}>
                            <option selected value={""}>โปรดระบุ...</option>
                            {dataSelect != null ? dataSelect.education_level_list.map((valuex, i) => {

                                return (
                                    <>
                                        {<option value={valuex.id}>{valuex.ระดับการศึกษา}</option>}
                                    </>
                                )
                            }) : null}
                        </select>

                        <div className="rama-x">
                            <p>วิชา</p>
                        </div>
                        <select class="form-select form-select" aria-label=".form-select-sm example" id={"teachingSubject" + Teaching.length}>
                            <option selected value={""}>โปรดระบุ...</option>
                            {dataSelect != null ? dataSelect.subject.map((valuex, i) => {

                                return (
                                    <>
                                        {<option value={valuex.id}>{valuex.ชื่อไทย}   ({valuex.ชื่ออังกฤษ})</option>}
                                    </>
                                )
                            }) : null}
                        </select>


                        <div className="rama-x">
                            <p>หมายเหตุ</p>
                        </div>
                        <input type="text" class="form-control" placeholder="หมายเหตุ" id={"teachingNote" + Teaching.length} />
                    </>
                , "value": 0
            }
            ])
        }
    }


    const removeTeaching = () => {
        const value = [...Teaching];
        value.pop()
        if (value.length >= 1) {
            setTeaching(value)
        }
    }

    const pushMoreStudy = () => {
        if (Study.length) {

            setStudy([...Study, {
                "form":

                    <div>

                        <div className="rama-x">
                            <p>ระดับการศึกษา</p>
                        </div>
                        <select class="form-select form-select" aria-label=".form-select-sm example" id={"eduRank" + Study.length}>
                            <option selected value={""}>โปรดระบุ...</option>
                            {dataSelect != null ? dataSelect.education_level_list.map((valuex, i) => {

                                return (
                                    <>
                                        {<option value={valuex.id}>{valuex.ระดับการศึกษา}</option>}
                                    </>
                                )
                            }) : null}
                        </select>       <div className="rama-x">
                            <p>ชื่อปริญญา</p>
                        </div>
                        <input class="form-control" placeholder="ชื่อวุฒิ" id={"eduName" + Study.length} />

                        <div className="rama-x">
                            <p>สาขา</p>
                        </div>
                        <input class="form-control" placeholder="ชื่อวุฒิ" id={"eduBranch" + Study.length} />

                        <div className="rama-x">
                            <p>วันที่อนุมัติปริญญา</p>
                        </div>
                        <input class="form-control" type="date" id={"eduDateEnd" + Study.length} />

                        <div className="rama-x">
                            <p>วันที่ปรับวุฒิการศึกษา</p>
                        </div>
                        <input class="form-control" type="date" id={"eduDateChange" + Study.length} />


                        <div className="rama-x">
                            <p>หมายเหตุ</p>
                        </div>
                        <input type="text" class="form-control" id={"eduNote" + Study.length} />
                    </div>, "value": 0
            }])
        }
    }


    const removeStudy = () => {
        const value = [...Study];
        value.pop()
        if (value.length >= 1) {
            setStudy(value)
        }
    }

    const pushMoreInterested = () => {
        var skillValue = "interest" + skill.length
        if (Interested.length < dataSelect.skill_list.length) {
            setInterested([...Interested, {
                "form":

                    <div>

                        <div className="rama-x">
                            <p>ชื่อสาขาที่เขี่ยวชาญและสนใจ</p>
                        </div>
                        <select class="form-select form-select" aria-label=".form-select-sm example" id={"interest" + Interested.length}>
                            <option selected value={""}>โปรดระบุ...</option>
                            {dataSelect != null ? dataSelect.skill_list.map((valuex, i) => {

                                return (
                                    <>
                                        {<option value={valuex.id}>{valuex.ชื่อไทย}   {valuex.ชื่ออังกฤษ}</option>}
                                    </>
                                )
                            }) : null}
                        </select>

                    </div>, "value": 0
            }])
        }
    }


    const removeInterested = () => {
        const value = [...Interested];
        value.pop()
        if (value.length >= 1) {
            setInterested(value)
        }
    }

    const pushMoreDevelop = () => {
        if (Develop.length) {
            setDevelop([...Develop, {
                "form":

                    <div>

                        <div className="rama-x">
                            <p>จุดเด่น</p>
                        </div>
                        <input type="text" class="form-control" placeholder="จุดเด่น" id={"personnelPros" + Develop.length} />
                        <div className="rama-x">
                            <p>จุดด้อย</p>
                        </div>
                        <input type="text" class="form-control" placeholder="จุดด้อย" id={"personnelCons" + Develop.length} />
                        <div className="rama-x">
                            <p>การปรับปรุง</p>
                        </div>
                        <input type="text" class="form-control" placeholder="การปรับปรุง" id={"personnelImprove" + Develop.length} />
                        <div className="rama-x">
                            <p>ระยะเวลา</p>
                        </div>
                        <input class="form-control" placeholder="ระยะเวลา" id={"personnelDuration" + Develop.length} />
                        <div className="rama-x">
                            <p>ผลลัพธ์</p>
                        </div>
                        <input type="text" class="form-control" placeholder="ผลลัพธ์" id={"personnelResult" + Develop.length} />
                        <div className="rama-x">
                            <p>หมายเหตุ</p>
                        </div>
                        <textarea type="text" class="form-control" placeholder="หมายเหตุ" id={"personneldevNote" + Develop.length} />
                    </div>
                , "value": 0
            }])
        }
    }


    const removeDevelop = () => {
        const value = [...Develop];
        value.pop()
        if (value.length >= 1) {
            setDevelop(value)
        }
    }

    const pushMorePosition = () => {
        if (Position.length) {
            setPosition([...Position, {
                "form":

                    <div>

                        <div className="rama-x">
                            <p>ชื่อตำแหน่งที่ขอ</p>
                        </div>
                        <select class="form-select form-select" aria-label=".form-select-sm example" id={"posreqName" + Position.length}>
                            <option selected value={""}>โปรดระบุ...</option>
                            {dataSelect != null ? dataSelect.position_academic_list.map((valuex, i) => {

                                return (
                                    <>
                                        {<option value={valuex.id}>{valuex.ตำแหน่ง}</option>}
                                    </>
                                )
                            }) : null}
                        </select>
                        <div class="row">
                            <div class="col-md-6">
                                <div className="rama-x">
                                    <p>วันที่เริ่มขอ</p>
                                </div>
                                <input type="date" class="form-control" id={"posreqDate" + Position.length} />
                            </div>
                            <div class="col-md-6">
                                <div className="rama-x">
                                    <p>วันที่ได้รับ</p>
                                </div>
                                <input type="date" class="form-control" id={"posgetDate" + Position.length} />
                            </div>
                        </div>
                        <div className="rama-x">
                            <p>เงินพิเศษประจำตำแหน่ง</p>
                        </div>
                        <input class="form-control" placeholder="เงินพิเศษประจำตำแหน่ง" id={"posreqBonus" + Position.length} />
                        <div className="rama-x">
                            <p>หมายเหตุ</p>
                        </div>
                        <textarea type="text" class="form-control" placeholder="หมายเหตุ" id={"posreqNote" + Position.length} />
                    </div>
                , "value": 0
            }])
        }
    }


    const removePosition = () => {
        const value = [...Position];
        value.pop()
        if (value.length >= 1) {
            setPosition(value)
        }
    }

    const pushMoreLeave = () => {
        if (Leave.length) {
            setLeave([...Leave, {
                "form":
                    <div>
                        <div className="rama-x">
                            <p>ประเภทการลา</p>
                        </div>
                        <select class="form-select form-select" aria-label=".form-select-sm example" id={"LeaveType" + Leave.length}>
                            <option selected value={""}>โปรดระบุ...</option>
                            {dataSelect != null ? dataSelect.leave_type.map((valuex, i) => {

                                return (
                                    <>
                                        {<option value={valuex.id}>{valuex.ประเภทการลา}</option>}
                                    </>
                                )
                            }) : null}
                        </select>
                        <div className="rama-x">
                            <p>เหตุผลที่ลา</p>
                        </div>
                        <input type="text" class="form-control" placeholder="เหตุผลที่ลา" id={"LeaveReas" + Leave.length} />

                        <div class="row">
                            <div class="col-md-6">
                                <div className="rama-x">
                                    <p>วันที่เริ่ม</p>
                                </div>
                                <input type="date" class="form-control" id={"leaveStartDate" + Leave.length} />
                            </div>
                            <div class="col-md-6">
                                <div className="rama-x">
                                    <p>วันสิ้นสุด</p>
                                </div>
                                <input type="date" class="form-control" id={"leaveEndDate" + Leave.length} />
                            </div>
                        </div>
                        <div className="rama-x">
                            <p>หมายเหตุ</p>
                        </div>
                        <textarea type="text" class="form-control" placeholder="หมายเหตุ" id={"leavehisNote" + Leave.length} />
                    </div>
                , "value": 0
            }])
        }
    }


    const removeLeave = () => {
        const value = [...Leave];
        value.pop()
        if (value.length >= 1) {
            setLeave(value)
        }
    }

    const pushMoreLeavetoS = () => {
        if (LeavetoS.length) {
            setLeavetoS([...LeavetoS, {
                "form":

                    <div>

                        <div class="row">
                            <div class="col-md-4">
                                <div className="rama-x">
                                    <p>ระดับการศึกษาที่ลา</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id={"LeavetoSlevel" + LeavetoS.length}>
                                    <option selected value={""}>โปรดระบุ...</option>
                                    {dataSelect != null ? dataSelect.education_level_list.map((valuex, i) => {

                                        return (
                                            <>
                                                {<option value={valuex.id}>{valuex.ระดับการศึกษา}</option>}
                                            </>
                                        )
                                    }) : null}
                                </select>
                            </div>
                            <div class="col-md-4">
                                <div className="rama-x">
                                    <p>วันที่เริ่มศึกษา</p>
                                </div>
                                <input type="date" class="form-control" id={"LeavetoSfirstday" + LeavetoS.length} />
                            </div>
                            <div class="col-md-4">
                                <div className="rama-x">
                                    <p>วันที่คาดว่าจะจบการศึกษา</p>
                                </div>
                                <input type="date" class="form-control" id={"LeavetoSlastday" + LeavetoS.length} />
                            </div>
                        </div>
                        <div className="rama-x">
                            <p>หลักสูตรที่ศึกษา</p>
                        </div>
                        <input type="text" class="form-control" placeholder="หลักสูตรที่ศึกษา" id={"LeavetoScourse" + LeavetoS.length} />

                        <div className="rama-x">
                            <p>มหาวิทยาลัยที่ศึกษา</p>
                        </div>
                        <input type="text" class="form-control" placeholder="มหาวิทยาลัยที่ศึกษา" id={"LeavetoSUniver" + LeavetoS.length} />
                        <div className="rama-x">
                            <p>ค่าใช้จ่าย</p>
                        </div>
                        <select class="form-select form-select" aria-label=".form-select-sm example" id={"LeavetoSexpenses" + LeavetoS.length}>
                            <option selected value={""}>โปรดระบุ...</option>
                            <option value="เงินทุน">เงินทุน</option>
                            <option value="เงินส่วนตัว">เงินส่วนตัว</option>
                        </select>


                        <div className="rama-x">
                            <p>ประเทศ</p>
                        </div>
                        <input type="text" class="form-control" placeholder="ประเทศ" id={"LeavetoScountry" + LeavetoS.length} />
                        <div className="rama-x">
                            <p>หมายเหตุ</p>
                        </div>
                        <textarea type="text" class="form-control" placeholder="หมายเหตุ" id={"LeavetoSnote" + LeavetoS.length} />
                    </div>
                , "value": 0
            }])
        }
    }


    const removeLeavetoS = () => {
        const value = [...LeavetoS];
        value.pop()
        if (value.length >= 1) {
            setLeavetoS(value)
        }
    }

    const pushMoreModule = () => {
        if (Module.length) {
            setModule([...Module, {
                "form":

                    <div>

                        <div className="rama-x">
                            <p>เพิ่มไฟล์</p>
                        </div>
                        <input type="file" class="form-control" id={"personnal_file" + Module.length} />
                        <div class="row">
                            <div class="col">
                                <div className="rama-x">
                                    <p>ชื่อเรื่องเอกสาร</p>
                                </div>
                                <input type="text" class="form-control" placeholder="ชื่อเรื่องเอกสาร" id={"pefileName" + Module.length} />
                            </div>
                            <div class="col-md-3">
                                <div className="rama-x">
                                    <p>วันที่เก็บ</p>
                                </div>
                                <input type="date" class="form-control" id={"pefileDate" + Module.length} />
                            </div>
                        </div>
                        <div className="rama-x">
                            <p>หมายเหตุ</p>
                        </div>
                        <textarea type="text" class="form-control" placeholder="หมายเหตุ" id={"pefileNote" + Module.length} />
                    </div>
                , "value": 0
            }])
        }
    }


    const removeModule = () => {
        const value = [...Module];
        value.pop()
        if (value.length >= 1) {
            setModule(value)
        }
    }

    const pushMoreInsignia = () => {
        if (Insignia.length) {
            setInsignia([...Insignia, {
                "form":

                    <div>

                        <div class="row">
                            <div class="col-md-3">
                                <div className="rama-x">
                                    <p>วันที่รับพระราชทาน</p>
                                </div>
                                <input type="date" class="form-control" placeholder="วันที่รับพระราชทาน" id={"insigniaDate" + Insignia.length} />
                            </div>
                            <div class="col">
                                <div className="rama-x">
                                    <p>ชื่อเครื่องราชอิสริยาภรณ์</p>
                                </div>
                                <input class="form-control" placeholder="ชื่อเครื่องราชอิสริยาภรณ์" id={"insigniaName" + Insignia.length} />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4">
                                <div className="rama-x">
                                    <p>ตำแหน่ง</p>
                                </div>
                                <input class="form-control" placeholder="ตำแหน่ง" id={"insigniaPosition" + Insignia.length} />
                            </div>
                            <div class="col-md-4">
                                <div className="rama-x">
                                    <p>ระดับ</p>
                                </div>
                                <input class="form-control" placeholder="ระดับ" id={"insigniaLevel" + Insignia.length} />
                            </div>
                            <div class="col-md-4">
                                <div className="rama-x">
                                    <p>วันที่เลื่อนระดับ</p>
                                </div>
                                <input type="date" class="form-control" id={"insigniaDateChange" + Insignia.length} />
                            </div>
                        </div>
                    </div>
                , "value": 0
            }])
        }
    }


    const removeInsignia = () => {
        const value = [...Insignia];
        value.pop()
        if (value.length >= 1) {
            setInsignia(value)
        }
    }

    const pushMoreSalary = () => {
        if (Salary.length) {
            setSalary([...Salary, {
                "form":
                    <div >

                        <div className="rama-x">
                            <p>เงินเดือน</p>
                        </div>
                        <input class="form-control" placeholder="เงินเดือน" id={"salaryCount" + Salary.length} />
                        <div class="row">
                            <div class="col-md-4">
                                <div className="rama-x">
                                    <p>วันที่เลื่อนระดับ</p>
                                </div>
                                <input type="date" class="form-control" placeholder="วันที่เลื่อนระดับ" id={"salaryDateChange" + Salary.length} />
                            </div>
                            <div class="col-md-4">
                                <div className="rama-x">
                                    <p>เปอร์เซ็นต์(%)</p>
                                </div>
                                <input class="form-control" placeholder="ปอร์เซ็นต์(%)" id={"salaryPercent" + Salary.length} />
                            </div>
                            <div class="col-md-4">
                                <div className="rama-x">
                                    <p>เงินพิเศษ</p>
                                </div>
                                <input class="form-control" placeholder="เงินพิเศษ" id={"salaryBonus" + Salary.length} />
                            </div>
                        </div>
                        <div className="rama-x">
                            <p>หมายเหตุ</p>
                        </div>
                        <textarea class="form-control" placeholder="หมายเหตุ" id={"salaryNote" + Salary.length} />
                    </div>
                , "value": 0
            }])
        }
    }


    const removeSalary = () => {
        const value = [...Salary];
        value.pop()
        if (value.length >= 1) {
            setSalary(value)
        }
    }




    const pushMoreCer = () => {

        setCertificate([...certificate, {
            "form":
                <>  <div >

                    <div className="rama-x">
                        <p>ชื่อกิจกรรมราชการที่ไป</p>
                    </div>
                    <input type="text" class="form-control" placeholder="ชื่อกิจกรรมราชการที่ไป" id={"Cername" + certificate.length} />
                    <div class="row">
                        <div class="col-md-6">
                            <div className="rama-x">
                                <p>วันเดินทางไป</p>
                            </div>
                            <input type="date" class="form-control" id={"Cergo" + certificate.length} />
                        </div>
                        <div class="col-md-6">
                            <div className="rama-x">
                                <p>วันเดินทางกลับ</p>
                            </div>
                            <input type="date" class="form-control" id={"Cerback" + certificate.length} />
                        </div>
                    </div>
                    <div className="rama-x">
                        <p>งบประมาณ</p>
                    </div>
                    <input class="form-control" placeholder="งบประมาณ" id={"Cerbudget" + certificate.length} />
                    <div className="rama-x">
                        <p>สถานที่ไป</p>
                    </div>
                    <input type="text" class="form-control" placeholder="สถานที่ไป" id={"Cerlocation" + certificate.length} />
                    <div className="rama-x">
                        <p>หน่วยงานกิจกรรม</p>
                    </div>
                    <input type="text" class="form-control" placeholder="หน่วยงานกิจกรรม" id={"Cerunit" + certificate.length} />
                    <div className="rama-x">
                        <p>Certificate/ใบรับรอง</p>
                    </div>
                    <input type="file" class="form-control" id={"Cer" + certificate.length} />
                    <div className="rama-x">
                        <p>หมายเหตุ</p>
                    </div>
                    <textarea type="text" class="form-control" placeholder="หมายเหตุ" id={"Cernote" + certificate.length} />
                </div>
                </>

            , "value": 0
        }])
    }


    const removeCer = () => {
        const value = [...certificate];
        value.pop()
        if (value.length >= 1) {
            setCertificate(value)
        }
    }

    const pushMoreAppoval = () => {
        setAppoval([...appoval, {
            "form": <>
                <div class="row">
                    <div class="col">
                        <div className="rama-x">
                            <p>คำสั่งจ้างต่อ</p>
                        </div>
                        <textarea class="form-control" placeholder="คำสั่งจ้างต่อ" id={"appovalOrder" + appoval.length} />
                    </div>
                    <div class="col-md-2">
                        <div className="rama-x">
                            <p>คำสั่งเลขที่</p>
                        </div>
                        <input class="form-control" placeholder="คำสั่งเลขที่" id={"appovalNum" + appoval.length} />
                    </div>
                    <div class="col-md-3">
                        <div className="rama-x">
                            <p>คำสั่งลงวันที่</p>
                        </div>
                        <input type="date" class="form-control" id={"appovalDate" + appoval.length} />
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6">
                        <div className="rama-x">
                            <p>เริ่มจ้าง เมื่อ</p>
                        </div>
                        <input type="date" class="form-control" id={"appovalStart" + appoval.length} />
                    </div>
                    <div class="col-md-6">
                        <div className="rama-x">
                            <p>สิ้นสุดการจ้าง เมื่อ</p>
                        </div>
                        <input type="date" class="form-control" id={"appovalEnd" + appoval.length} />
                    </div>
                </div>
            </>
        }])

    }

    const removeAppoval = () => {
        const value = [...appoval];
        value.pop()
        if (value.length >= 1) {
            setAppoval(value)
        }
    }



    const getSelectChoice = async () => {

        const token = localStorage.getItem("accessToken")
        if (token) {
            try {

                const res = await axios.post(`${api}/selectChoice`, { accesstoken: token })
                console.log(res.data.menagement_position_list)
                // {res.data != null ? res.data.education_level_list.map((valuex, i) => {

                //     return (
                //         <>
                //             {<option value={valuex.id}>{valuex.ระดับการศึกษา}</option>}
                //         </>
                //     )
                // }) : null}
                if (res.data.state == "yes") {
                    setDataSelect(res.data)
                    setInterested([{
                        "form":
                            <>

                                <div className="rama-x">
                                    <p>ชื่อสาขาที่เขี่ยวชาญและสนใจ</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id="interest0">
                                    <option selected value={""}>โปรดระบุ...</option>
                                    {res.data != null ? res.data.skill_list.map((valuex, i) => {

                                        return (
                                            <>
                                                {<option value={valuex.id}>{valuex.ชื่อไทย}   {valuex.ชื่ออังกฤษ}</option>}
                                            </>
                                        )
                                    }) : null}
                                </select>

                            </>
                        , "value": 0
                    }
                    ])
                    setStudy([{
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ระดับการศึกษา</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id="eduRank0">
                                    <option selected value={""}>โปรดระบุ...</option>
                                    {res.data != null ? res.data.education_level_list.map((valuex, i) => {

                                        return (
                                            <>
                                                {<option value={valuex.id}>{valuex.ระดับการศึกษา}</option>}
                                            </>
                                        )
                                    }) : null}
                                </select>

                                <div className="rama-x">
                                    <p>ชื่อปริญญา</p>
                                </div>
                                <input class="form-control" placeholder="ชื่อวุฒิ" id={"eduName0"} />

                                <div className="rama-x">
                                    <p>สาขา</p>
                                </div>
                                <input class="form-control" placeholder="ชื่อวุฒิ" id={"eduBranch0"} />

                                <div className="rama-x">
                                    <p>วันที่อนุมัติปริญญา</p>
                                </div>
                                <input class="form-control" type="date" id={"eduDateEnd0"} />

                                <div className="rama-x">
                                    <p>วันที่ปรับวุฒิการศึกษา</p>
                                </div>
                                <input class="form-control" type="date" id={"eduDateChange0"} />


                                <div className="rama-x">
                                    <p>หมายเหตุ</p>
                                </div>
                                <input type="text" class="form-control" id={"eduNote0"} />
                            </>
                        , "value": 0
                    }
                    ])
                    setTeaching([{
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ระดับการสอน</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id={"teachingRank0"}>
                                    <option selected value={""}>โปรดระบุ...</option>
                                    {res.data != null ? res.data.education_level_list.map((valuex, i) => {

                                        return (
                                            <>
                                                {<option value={valuex.id}>{valuex.ระดับการศึกษา}</option>}
                                            </>
                                        )
                                    }) : null}
                                </select>

                                <div className="rama-x">
                                    <p>วิชา</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id={"teachingSubject0"}>
                                    <option selected value={""}>โปรดระบุ...</option>
                                    {res.data != null ? res.data.subject.map((valuex, i) => {

                                        return (
                                            <>
                                                {<option value={valuex.id}>{valuex.ชื่อไทย}   ({valuex.ชื่ออังกฤษ})</option>}
                                            </>
                                        )
                                    }) : null}
                                </select>


                                <div className="rama-x">
                                    <p>หมายเหตุ</p>
                                </div>
                                <input type="text" class="form-control" placeholder="หมายเหตุ" id={"teachingNote0"} />
                            </>
                        , "value": 0
                    }
                    ])
                    setLeavetoS([{
                        "form":
                            <>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div className="rama-x">
                                            <p>ระดับการศึกษาที่ลา</p>
                                        </div>
                                        <select class="form-select form-select" aria-label=".form-select-sm example" id="LeavetoSlevel0">
                                            <option selected value={""}>โปรดระบุ...</option>
                                            {res.data != null ? res.data.education_level_list.map((valuex, i) => {

                                                return (
                                                    <>
                                                        {<option value={valuex.id}>{valuex.ระดับการศึกษา}</option>}
                                                    </>
                                                )
                                            }) : null}
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <div className="rama-x">
                                            <p>วันที่เริ่มศึกษา</p>
                                        </div>
                                        <input type="date" class="form-control" id="LeavetoSfirstday0" />
                                    </div>
                                    <div class="col-md-4">
                                        <div className="rama-x">
                                            <p>วันที่คาดว่าจะจบการศึกษา</p>
                                        </div>
                                        <input type="date" class="form-control" id="LeavetoSlastday0" />
                                    </div>
                                </div>
                                <div className="rama-x">
                                    <p>หลักสูตรที่ศึกษา</p>
                                </div>
                                <input type="text" class="form-control" placeholder="หลักสูตรที่ศึกษา" id="LeavetoScourse0" />

                                <div className="rama-x">
                                    <p>มหาวิทยาลัยที่ศึกษา</p>
                                </div>
                                <input type="text" class="form-control" placeholder="มหาวิทยาลัยที่ศึกษา" id="LeavetoSUniver0" />
                                <div className="rama-x">
                                    <p>ค่าใช้จ่าย</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id="LeavetoSexpenses0">
                                    <option selected value={""}>โปรดระบุ...</option>
                                    <option value="เงินทุน">เงินทุน</option>
                                    <option value="เงินส่วนตัว">เงินส่วนตัว</option>
                                </select>


                                <div className="rama-x">
                                    <p>ประเทศ</p>
                                </div>
                                <input type="text" class="form-control" placeholder="ประเทศ" id="LeavetoScountry0" />
                                <div className="rama-x">
                                    <p>หมายเหตุ</p>
                                </div>
                                <textarea type="text" class="form-control" placeholder="หมายเหตุ" id="LeavetoSnote0" />
                            </>

                        , "value": 0
                    }
                    ])
                    setLeave([{
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ประเภทการลา</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id="LeaveType0">
                                    <option selected value={""}>โปรดระบุ...</option>
                                    {res.data != null ? res.data.leave_type.map((valuex, i) => {

                                        return (
                                            <>
                                                {<option value={valuex.id}>{valuex.ประเภทการลา}</option>}
                                            </>
                                        )
                                    }) : null}

                                </select>
                                <div className="rama-x">
                                    <p>เหตุผลที่ลา</p>
                                </div>
                                <input type="text" class="form-control" placeholder="เหตุผลที่ลา" id="LeaveReas0" />

                                <div class="row">
                                    <div class="col-md-6">
                                        <div className="rama-x">
                                            <p>วันที่เริ่ม</p>
                                        </div>
                                        <input type="date" class="form-control" id="leaveStartDate0" />
                                    </div>
                                    <div class="col-md-6">
                                        <div className="rama-x">
                                            <p>วันสิ้นสุด</p>
                                        </div>
                                        <input type="date" class="form-control" id="leaveEndDate0" />
                                    </div>
                                </div>
                                <div className="rama-x">
                                    <p>หมายเหตุ</p>
                                </div>
                                <textarea type="text" class="form-control" placeholder="หมายเหตุ" id="leavehisNote0" />
                            </>

                        , "value": 0
                    }
                    ])
                    setPosition([{
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ชื่อตำแหน่งที่ขอ</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id="posreqName0">
                                    <option selected value={""}>โปรดระบุ...</option>
                                    {res.data != null ? res.data.position_academic_list.map((valuex, i) => {

                                        return (
                                            <>
                                                {<option value={valuex.id}>{valuex.ตำแหน่ง}</option>}
                                            </>
                                        )
                                    }) : null}
                                </select>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div className="rama-x">
                                            <p>วันที่เริ่มขอ</p>
                                        </div>
                                        <input type="date" class="form-control" id="posreqDate0" />
                                    </div>
                                    <div class="col-md-6">
                                        <div className="rama-x">
                                            <p>วันที่ได้รับ</p>
                                        </div>
                                        <input type="date" class="form-control" id="posgetDate0" />
                                    </div>
                                </div>
                                <div className="rama-x">
                                    <p>เงินพิเศษประจำตำแหน่ง</p>
                                </div>
                                <input class="form-control" placeholder="เงินพิเศษประจำตำแหน่ง" id="posreqBonus0" />
                                <div className="rama-x">
                                    <p>หมายเหตุ</p>
                                </div>
                                <textarea type="text" class="form-control" placeholder="หมายเหตุ" id="posreqNote0" />
                            </>

                        , "value": 0
                    }
                    ])
                    setArticle([{
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ประเภท</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id="workType0">
                                    <option selected value={""}>โปรดระบุ...</option>
                                    {res.data.work_type ?
                                        res.data.work_type.map((value, i) => {
                                            return (
                                                <option selected value={value.id}>{value.ประเภทผลงาน}</option>
                                            )
                                        })
                                        : null}

                                </select>


                                <div className="rama-x">
                                    <p>ปีของผลงาน</p>
                                </div>
                                <div class="mb-3">
                                    <input class="form-control" type="number" min="1900" max="2099" step="1" id="workYear0" />
                                </div>

                                <div className="rama-x">
                                    <p>รายละเอียด</p>
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="รายละเอียดผลงาน" id={"workDetail0"} />
                                </div>
                            </>
                        , "value": 0
                    }
                    ])
                    setReward([{
                        "form":
                            <>


                                <div className="rama-x">
                                    <p>ปีของผลงาน</p>
                                </div>
                                <div class="mb-3">
                                    <input class="form-control" type="number" min="1900" max="2099" step="1" id="rewardYear0" />
                                </div>

                                <div class="mb-3">
                                    <textarea class="form-control" placeholder="ชื่อรางวัล/ชื่อหัวข้อที่ได้รับรางวัล/ชื่อระดับการแข่งขัน/ปีที่ได้รับ" id="rewardDetail0"></textarea>
                                </div>
                            </>
                        , "value": 0
                    }
                    ])
                    setSalary([{
                        "form":
                            <><div>

                                <div className="rama-x">
                                    <p>เงินเดือน</p>
                                </div>
                                <input class="form-control" placeholder="เงินเดือน" id="salaryCount0" />
                                <div class="row">
                                    <div class="col-md-4">
                                        <div className="rama-x">
                                            <p>วันที่เลื่อนระดับ</p>
                                        </div>
                                        <input type="date" class="form-control" placeholder="วันที่เลื่อนระดับ" id="salaryDateChange0" />
                                    </div>
                                    <div class="col-md-4">
                                        <div className="rama-x">
                                            <p>เปอร์เซ็นต์(%)</p>
                                        </div>
                                        <input class="form-control" placeholder="ปอร์เซ็นต์(%)" id="salaryPercent0" />
                                    </div>
                                    <div class="col-md-4">
                                        <div className="rama-x">
                                            <p>เงินพิเศษ</p>
                                        </div>
                                        <input class="form-control" placeholder="เงินพิเศษ" id="salaryBonus0" />
                                    </div>
                                </div>


                                <div className="rama-x">
                                    <p>หมายเหตุ</p>
                                </div>
                                <textarea class="form-control" placeholder="หมายเหตุ" id="salaryNote0" />
                            </div>
                            </>

                        , "value": 0
                    }
                    ])
                    setInsignia([{
                        "form":
                            <>
                                <div class="row">
                                    <div class="col-md-3">
                                        <div className="rama-x">
                                            <p>วันที่รับพระราชทาน</p>
                                        </div>
                                        <input type="date" class="form-control" placeholder="วันที่รับพระราชทาน" id="insigniaDate0" />
                                    </div>
                                    <div class="col">
                                        <div className="rama-x">
                                            <p>ชื่อเครื่องราชอิสริยาภรณ์</p>
                                        </div>
                                        <input class="form-control" placeholder="ชื่อเครื่องราชอิสริยาภรณ์" id="insigniaName0" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div className="rama-x">
                                            <p>ตำแหน่ง</p>
                                        </div>
                                        <input class="form-control" placeholder="ตำแหน่ง" id="insigniaPosition0" />
                                    </div>
                                    <div class="col-md-4">
                                        <div className="rama-x">
                                            <p>ระดับ</p>
                                        </div>
                                        <input class="form-control" placeholder="ระดับ" id="insigniaLevel0" />
                                    </div>
                                    <div class="col-md-4">
                                        <div className="rama-x">
                                            <p>วันที่เลื่อนระดับ</p>
                                        </div>
                                        <input type="date" class="form-control" id="insigniaDateChange0" />
                                    </div>
                                </div>
                            </>

                        , "value": 0
                    }
                    ])
                    setAppoval([{
                        "form":
                            <><div class="row">
                                <div class="col">
                                    <div className="rama-x">
                                        <p>คำสั่งจ้างต่อ</p>
                                    </div>
                                    <textarea class="form-control" placeholder="คำสั่งจ้างต่อ" id="appovalOrder0" />
                                </div>
                                <div class="col-md-2">
                                    <div className="rama-x">
                                        <p>คำสั่งเลขที่</p>
                                    </div>
                                    <input class="form-control" placeholder="คำสั่งเลขที่" id="appovalNum0" />
                                </div>
                                <div class="col-md-3">
                                    <div className="rama-x">
                                        <p>คำสั่งลงวันที่</p>
                                    </div>
                                    <input type="date" class="form-control" id="appovalDate0" />
                                </div>
                            </div><div class="row">
                                    <div class="col-md-6">
                                        <div className="rama-x">
                                            <p>เริ่มจ้าง เมื่อ</p>
                                        </div>
                                        <input type="date" class="form-control" id="appovalStart0" />
                                    </div>
                                    <div class="col-md-6">
                                        <div className="rama-x">
                                            <p>สิ้นสุดการจ้าง เมื่อ</p>
                                        </div>
                                        <input type="date" class="form-control" id="appovalEnd0" />
                                    </div>
                                </div></>
                    }])
                    setAdministrative([{
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ชื่อตำแหน่ง</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id="AdministName0" >
                                    <option selected value={""}>โปรดระบุ...</option>

                                    {res.data != null ? res.data.menagement_position_list.map((valuex, i) => {

                                        return (
                                            <>
                                                {<option value={valuex.id}>{valuex.ตำแหน่ง}</option>}
                                            </>
                                        )

                                    }) : null}


                                </select>
                                <div class="row">
                                    <div class="col-md-6">
                                        <div className="rama-x">
                                            <p>วันเริ่มดำรงตำแหน่ง</p>
                                        </div>
                                        <input type="date" class="form-control" id="Administfirstday0" />
                                    </div>
                                    <div class="col-md-6">
                                        <div className="rama-x">
                                            <p>วันสิ้นสุด</p>
                                        </div>
                                        <input type="date" class="form-control" id="Administlastday0" />
                                    </div>
                                </div>
                                <div className="rama-x">
                                    <p>หมายเหตุ</p>
                                </div>
                                <textarea type="text" class="form-control" placeholder="หมายเหตุ" id="Administnote0" />
                            </>
                    }])
                    setDevelop([{
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>จุดเด่น</p>
                                </div>
                                <input type="text" class="form-control" placeholder="จุดเด่น" id="personnelPros0" />
                                <div className="rama-x">
                                    <p>จุดด้อย</p>
                                </div>
                                <input type="text" class="form-control" placeholder="จุดด้อย" id="personnelCons0" />
                                <div className="rama-x">
                                    <p>การปรับปรุง</p>
                                </div>
                                <input type="text" class="form-control" placeholder="การปรับปรุง" id="personnelImprove0" />
                                <div className="rama-x">
                                    <p>ระยะเวลา</p>
                                </div>
                                <input class="form-control" placeholder="ระยะเวลา" id="personnelDuration0" />
                                <div className="rama-x">
                                    <p>ผลลัพธ์</p>
                                </div>
                                <input type="text" class="form-control" placeholder="ผลลัพธ์"  id="personnelResult0" />
                                <div className="rama-x">
                                    <p>หมายเหตุ</p>
                                </div>
                                <textarea type="text" class="form-control" placeholder="หมายเหตุ" id="personneldevNote0" />
                            </>

                        , "value": 0
                    }
                    ])
                    setCertificate([{
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ชื่อกิจกรรมราชการที่ไป</p>
                                </div>
                                <input type="text" class="form-control" placeholder="ชื่อกิจกรรมราชการที่ไป" id="Cername0" />

                                <div class="row">
                                    <div class="col-md-6">
                                        <div className="rama-x">
                                            <p>วันเดินทางไป</p>
                                        </div>
                                        <input type="date" class="form-control" id="Cergo0" />
                                    </div>
                                    <div class="col-md-6">
                                        <div className="rama-x">
                                            <p>วันเดินทางกลับ</p>
                                        </div>
                                        <input type="date" class="form-control" id="Cerback0" />
                                    </div>
                                </div>
                                <div className="rama-x">
                                    <p>งบประมาณ</p>
                                </div>
                                <input class="form-control" placeholder="งบประมาณ" id="Cerbudget0" />
                                <div className="rama-x">
                                    <p>สถานที่ไป</p>
                                </div>
                                <input type="text" class="form-control" placeholder="สถานที่ไป" id="Cerlocation0" />
                                <div className="rama-x">
                                    <p>หน่วยงานกิจกรรม</p>
                                </div>
                                <input type="text" class="form-control" placeholder="หน่วยงานกิจกรรม" id="Cerunit0" />
                                <div className="rama-x">
                                    <p>Certificate/ใบรับรอง</p>
                                </div>
                                <input type="file" class="form-control" id="Cer0" />
                                <div className="rama-x">
                                    <p>หมายเหตุ</p>
                                </div>
                                <textarea type="text" class="form-control" placeholder="หมายเหตุ" id="Cernote0" />
                            </>

                        , "value": 0
                    }
                    ])
                    setModule([{
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>เพิ่มไฟล์</p>
                                </div>
                                <input type="file" class="form-control" id="personnal_file0" />
                                <div class="row">
                                    <div class="col">
                                        <div className="rama-x">
                                            <p>ชื่อเรื่องเอกสาร</p>
                                        </div>
                                        <input type="text" class="form-control" placeholder="ชื่อเรื่องเอกสาร" id="pefileName0" />
                                    </div>
                                    <div class="col-md-3">
                                        <div className="rama-x">
                                            <p>วันที่เก็บ</p>
                                        </div>
                                        <input type="date" class="form-control" id="pefileDate0" />
                                    </div>
                                </div>
                                <div className="rama-x">
                                    <p>หมายเหตุ</p>
                                </div>
                                <textarea type="text" class="form-control" placeholder="หมายเหตุ" id="pefileNote0" />
                            </>

                        , "file": 0
                    }
                    ])
                    setOtherData([{
                        "form":
                            <>


                                <div className="rama-x">
                                    <p>ข้อมูลอื่นๆ</p>
                                </div>


                                <div class="mb-3">
                                    <p>หัวข้อ</p>
                                    <textarea class="form-control" placeholder="ชื่อหัวข้อ" id="otherName0"></textarea>
                                </div>

                                <div class="mb-3">
                                    <p>วัน/เดือน/ปี</p>
                                    <input class="form-control" type="date" min="1900" max="2099" step="1" id="otherDate0" />
                                </div>

                                <div class="mb-3">
                                    <p>รายละเอียด</p>
                                    <textarea class="form-control" placeholder="รายละเอียด" id="otherDetail0"></textarea>
                                </div>
                            </>
                        , "value": 0
                    }
                    ])
                }
            }
            catch (e) {

                alert(e)

            }
        } else {
            alert("No token")
        }
    }
    const getAddress = async () => {

        const token = localStorage.getItem("accessToken")
        if (token) {
            try {

                const res = await axios.post(`${api}/address`, { accesstoken: token })

                if (res.data.state == "yes") {

                    setProvinceList(res.data.provinces)
                    setAmphoeList(res.data.district)
                    setSubdistrictList(res.data.subdistrict)



                }
            }
            catch (e) {

                alert(e)

            }
        } else {
            alert("No token")
        }
    }



    const addUser = async () => {
      
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
        personal_infromation.append("gmail", document.getElementById("A20").value)
        var emailText = ""
        Email.map((value, i) => {
            var indexId = "email" + i
            if (i == 0) {
                emailText = emailText + document.getElementById(indexId).value
            } else {
                emailText = emailText + "," + document.getElementById(indexId).value
            }

        })
        personal_infromation.append("อีเมล", emailText)



        let address_now = new FormData();
        let address_regis = new FormData();
        address_now.append("บ้านเลขที่", document.getElementById("B1").value)
        address_now.append("ประเภท", "ปัจจุบัน")
        address_now.append("ตรอก/ซอย", document.getElementById("B2").value)
        address_now.append("ถนน", document.getElementById("B3").value)
        address_now.append("จังหวัด", document.getElementById("B4").value)
        address_now.append("อำเภอ/เขต", document.getElementById("B5").value)
        address_now.append("ตำบล", document.getElementById("B6").value)
        address_now.append("รหัสไปรษณีย์", document.getElementById("B7").value)

        address_regis.append("บ้านเลขที่", addressRegis)
        address_regis.append("ประเภท", "ตามทะเบียนบ้าน")
        address_regis.append("ตรอก/ซอย", alleyRegis)
        address_regis.append("ถนน", roadRegis)
        address_regis.append("จังหวัด", provinceRegis)
        address_regis.append("อำเภอ/เขต", districtRegis)
        address_regis.append("ตำบล", subDistrictRegis)
        address_regis.append("รหัสไปรษณีย์", zipcodeRegis)



        let personal_skill = new FormData()
        Interested.map((value, i) => {
        
            var interText = "interest" + i
                personal_skill.append(i, JSON.stringify({
                    "id": null,
                    "idความเชี่ยวชาญ": document.getElementById(interText).value
                }))
            
        })


        let education_his = new FormData()
        Study.map((value, i) => {

                education_his.append(i, JSON.stringify({
                    "id": null,
                    "ระดับการศึกษา": document.getElementById("eduRank" + i).value,
                    "ชื่อปริญญา": document.getElementById("eduName" + i).value,
                    "สาขา": document.getElementById("eduBranch" + i).value,
                    "วันอนุมัติปริญญา": document.getElementById("eduDateEnd" + i).value,
                    "วันปรับวุฒิการศึกษา": document.getElementById("eduDateChange" + i).value,
                    "หมายเหตุ": document.getElementById("eduNote" + i).value,
                }))
            
        })


        let teaching = new FormData()

        Teaching.map((value, i) => {

                teaching.append(i, JSON.stringify({
                    "id": null,
                    "รหัสวิชา": document.getElementById("teachingSubject" + i).value,
                    "ระดับ": document.getElementById("teachingRank" + i).value,
                    "หมายเหตุ": document.getElementById("teachingNote" + i).value,
                }))
            
        })


        let work = new FormData()

        Article.map((value, i) => {
    
                work.append(i, JSON.stringify({
                    "id": null,
                    "ประเภท": document.getElementById("workType" + i).value,
                    "ปี": document.getElementById("workYear" + i).value,
                    "รายละเอียด": document.getElementById("workDetail" + i).value,
                }))

            
        })

        let reward = new FormData()
       
        Reward.map((value, i) => {

                reward.append(i, JSON.stringify({
                    "id": null,
                    "ปี": document.getElementById("rewardYear" + i).value,
                    "รายละเอียด": document.getElementById("rewardDetail" + i).value,
                }))
            
        })

        let education_level = new FormData()
        education_level.append("วุฒิการศึกษาตามอัตรา", document.getElementById("C1").value)
        education_level.append("วุฒิพิเศษ", document.getElementById("C2").value)
        education_level.append("วุฒิสูงสุดที่จบ", document.getElementById("C3").value)
        education_level.append("ชื่อปริญญาสูงสุด", document.getElementById("C4").value)
        education_level.append("ชื่อปริญญาสูงสุด(ย่อ)", document.getElementById("C5").value)
        education_level.append("ชื่อปริญญาสูงสุด(อังกฤษ)", document.getElementById("C6").value)

        education_level.append("ชื่อปริญญาสูงสุด(ย่ออังกฤษ)", document.getElementById("C7").value)
        education_level.append("ชื่อสาขา", document.getElementById("C8").value)
        education_level.append("ชื่อสาขา(อังกฤษ)", document.getElementById("C9").value)
        education_level.append("ชื่อสถานศึกษา", document.getElementById("C10").value)
        education_level.append("ชื่อสถานศึกษา(อังกฤษ)", document.getElementById("C11").value)
        education_level.append("ประเทศที่จบ", document.getElementById("C12").value)




        //************************************************************************แบบไม่มีปุ่มเพิ่มเซ็ทข้อมูลแบบนี้ */
        let employment_order = new FormData()
        employment_order.append("เลขที่คำสั่ง", document.getElementById("E3").value)
        employment_order.append("ประเภทการบรรจุ", document.getElementById("E1").value)
        employment_order.append("คำสั่งลงวันที่", document.getElementById("E4").value)
        employment_order.append("คำสั่งบรรจุ", document.getElementById("E2").value)
        employment_order.append("เริ่มจ้าง/บรรจุ", document.getElementById("E5").value)
        employment_order.append("ระดับที่เริ่มจ้าง/บรรจุ", document.getElementById("E6").value)
        employment_order.append("รับโอน", document.getElementById("E7").value)
        employment_order.append("คำสั่งโอนเลขที่", document.getElementById("E8").value)
        employment_order.append("ระดับที่โอน", document.getElementById("E9").value)
        employment_order.append("หมายเหตุของการบรรจุ/แหล่งเงิน", document.getElementById("E10").value)
        //************************************************************************แบบไม่มีปุ่มเพิ่มเซ็ทข้อมูลแบบนี้ */

        let salary_his = new FormData()
        Salary.map((value, i) => {

                salary_his.append(i, JSON.stringify({
                    "id": null,
                    "เงินเดือน": document.getElementById("salaryCount" + i).value,
                    "วันที่เลื่อนขั้น": document.getElementById("salaryDateChange" + i).value,
                    "ร้อยละ": document.getElementById("salaryPercent" + i).value,
                    "เงินพิเศษ": document.getElementById("salaryBonus" + i).value,
                    "หมายเหตุ": document.getElementById("salaryNote" + i).value,
                }))

            

        })




        let insignia = new FormData()
        Insignia.map((value, i) => {

                insignia.append(i, JSON.stringify({
                    "id": null,
                    "วันที่รับ": document.getElementById("insigniaDate" + i).value,
                    "ชื่อเครื่องราชอิสริยาภรณ์": document.getElementById("insigniaName" + i).value,
                    "ตำแหน่ง": document.getElementById("insigniaPosition" + i).value,
                    "ระดับ": document.getElementById("insigniaLevel" + i).value,
                    "วันที่เลื่อนระดับ": document.getElementById("insigniaDateChange" + i).value,
                }))
            


        })


        //************************************************************************แบบมีปุ่มเพิ่มเซ็ทข้อมูลแบบนี้ */
        let employment_appoval = new FormData()

        appoval.map((value, i) => {

            console.log("kuydsffafd" + appoval.length)
          
                employment_appoval.append(i, JSON.stringify({
                    "id": null,
                    "คำสั่งจ้างต่อ": document.getElementById("appovalOrder" + i).value,
                    "คำสั่งเลขที่": document.getElementById("appovalNum" + i).value,
                    "คำสั่งลงวันที่": document.getElementById("appovalDate" + i).value,
                    "เริ่มจ้าง": document.getElementById("appovalStart" + i).value,
                    "สิ้นสุดการจ้าง": document.getElementById("appovalEnd" + i).value,
                }))
            
        })
        //************************************************************************แบบมีปุ่มเพิ่มเซ็ทข้อมูลแบบนี้ */

        //เริ่มใส่ตรงนี้

        let menagement_position = new FormData()
        Administrative.map((value, i) => {
      
                menagement_position.append(i, JSON.stringify({
                    "id": null,
                    "ชื่อตำแหน่ง": document.getElementById("AdministName" + i).value,
                    "วันเริ่มดำรงตำแหน่ง": document.getElementById("Administfirstday" + i).value,
                    "วันสิ้นสุด": document.getElementById("Administlastday" + i).value,
                    "หมายเหตุ": document.getElementById("Administnote" + i).value,
                }))

            


        })


        let study_leave = new FormData()
        LeavetoS.map((value, i) => {
         

                study_leave.append(i, JSON.stringify({
                    "id": null,
                    "ระดับการศึกษาที่ลา": document.getElementById("LeavetoSlevel" + i).value,
                    "วันที่เริ่มศึกษา": document.getElementById("LeavetoSfirstday" + i).value,
                    "วันที่คาดว่าจะจบการศึกษา": document.getElementById("LeavetoSlastday" + i).value,
                    "หลักสูตรที่ศึกษา": document.getElementById("LeavetoScourse" + i).value,
                    "มหาวิทยาลัยที่ศึกษา": document.getElementById("LeavetoSUniver" + i).value,
                    "ทุน/เงินส่วนตัว": document.getElementById("LeavetoSexpenses" + i).value,
                    "ประเทศ": document.getElementById("LeavetoScountry" + i).value,
                    "หมายเหตุ": document.getElementById("LeavetoSnote" + i).value,
                }))

            

        })

        //เว้นไว้ก่อน
        let affair_trianing = new FormData()
        certificate.map(async (value, i) => {
            var text = ""
            var temp_text = ""
            try {
                temp_text = "Cer" + "_name_" +Date.now()+"_"+ document.getElementById("Cername" + i).value+"."+document.getElementById("Cer" + i).files[0]["name"].split(".")[1]
                text = "Cer" + "_name_" +Date.now()+"_"+document.getElementById("Cername" + i).value
                alldata.append(text, document.getElementById("Cer" + i).files[0])
            } catch (e) {
            }
            
                affair_trianing.append(i, JSON.stringify({
                    "id":null,
                    "ชื่อกิจกรรมราชการที่ไป": document.getElementById("Cername" + i).value,
                    "วันเดินทางไป": document.getElementById("Cergo" + i).value,
                    "วันเดินทางกลับ": document.getElementById("Cerback" + i).value,
                    "งบประมาณ": document.getElementById("Cerbudget" + i).value,
                    "สถานที่ไป": document.getElementById("Cerlocation" + i).value,
                    "หน่วยงานกิจกรรม": document.getElementById("Cerunit" + i).value,
                    "ใบรับรอง": text,
                    "ชื่อในdb":temp_text,
                    "หมายเหตุ": document.getElementById("Cernote" + i).value,
                }))

            
        
        })
        let personnal_file = new FormData()
        Module.map((value, i) => {
            
            var text = ""
            var temp_text = ""
            try {
                temp_text = "personnal_file" + "_name_" +Date.now()+"_"+ document.getElementById("pefileName" + i).value+"."+document.getElementById("personnal_file" + i).files[0]["name"].split(".")[1]
                text = "personnal_file" + "_name_" +Date.now()+"_"+ document.getElementById("pefileName" + i).value
                alldata.append(text, document.getElementById("personnal_file" + i).files[0])
            } catch (e) {

            }

        
                personnal_file.append(i, JSON.stringify({ 
                    "id":null,   
                    "ชื่อในdb":temp_text,
                    "ชื่อเอกสาร": document.getElementById("pefileName" + i).value,
                    "วันที่เก็บ": document.getElementById("pefileDate" + i).value,
                    "หมายเหตุ": document.getElementById("pefileNote" + i).value,
                }))

            
        
        })





        let leave_his = new FormData()
        Leave.map((value, i) => {
   
                leave_his.append(i, JSON.stringify({
                    "id": null,
                    "ประเภทการลา": document.getElementById("LeaveType" + i).value,
                    "เหตุผลการลา": document.getElementById("LeaveReas" + i).value,
                    "วันที่เริ่ม": document.getElementById("leaveStartDate" + i).value,
                    "วันที่สิ้นสุด": document.getElementById("leaveEndDate" + i).value,
                    "note": document.getElementById("leavehisNote" + i).value,
                }))

            
        })


        let position_academic_req_his = new FormData()
        Position.map((value, i) => {
       
                position_academic_req_his.append(i, JSON.stringify({
                    "id": null,
                    "ชื่อตำแหน่ง": document.getElementById("posreqName" + i).value,
                    "วันที่เริ่มขอ": document.getElementById("posreqDate" + i).value,
                    "วันที่ได้รับ": document.getElementById("posgetDate" + i).value,
                    "เงินพิเศษประจำตำแหน่ง": document.getElementById("posreqBonus" + i).value,
                    "หมายเหตุ": document.getElementById("posreqNote" + i).value,
                }))
            
        })

        let personal_dev_plan = new FormData()
        Develop.map((value, i) => {
           
                personal_dev_plan.append(i, JSON.stringify({
                    "id": null,
                    "จุดเด่น": document.getElementById("personnelPros" + i).value,
                    "จุดด้อย": document.getElementById("personnelCons" + i).value,
                    "การปรับปรุง": document.getElementById("personnelImprove" + i).value,
                    "ระยะเวลา": document.getElementById("personnelDuration" + i).value,
                    "ผลลัพธ์": document.getElementById("personnelResult" + i).value,
                    "หมายเหตุ": document.getElementById("personneldevNote" + i).value,
                }))
            
        })


        let position_level = new FormData()
        position_level.append("อัตราเลขที่", document.getElementById("D1").value)
        position_level.append("ตำแหน่ง", document.getElementById("D2").value)
        position_level.append("ระดับ", document.getElementById("D3").value)
        position_level.append("ปฏิบัติงานที่", document.getElementById("D4").value)
        position_level.append("ภาควิชา/ฝ่าย", document.getElementById("D5").value)
        position_level.append("คณะ/สำนัก/สถาบัน", document.getElementById("D6").value)
        position_level.append("วิทยาเขต", document.getElementById("D7").value)
        position_level.append("เบอร์โทรศัพท์ที่ทำงาน", document.getElementById("D8").value)
        position_level.append("เบอร์ต่อ", document.getElementById("D9").value)
        position_level.append("เบอร์ภายใน", document.getElementById("D10").value)
        position_level.append("เบอร์ต่อภายใน", document.getElementById("D11").value)
        position_level.append("โทรสาร", document.getElementById("D12").value)
        position_level.append("เบอร์ต่อโทรสาร", document.getElementById("D13").value)

        let other_data = new FormData()
        otherData.map((value, i) => {
          
                other_data.append(i, JSON.stringify({
                    "id": null,
                    "หัวข้อ": document.getElementById("otherName" + i).value,
                    "วันที่": document.getElementById("otherDate" + i).value,
                    "รายละเอียด": document.getElementById("otherDetail" + i).value,
                }))

            

        })

        try {
            alert(dataPhoto.name)
            personal_infromation.append("รูปภาพ", dataPhoto.name)
            alldata.append("profile", dataPhoto)
        } catch (e) {

            personal_infromation.append("รูปภาพ", null)
        }

        alldata.append("personal_infromation", JSON.stringify(Object.fromEntries(personal_infromation)))
        alldata.append("position_level", JSON.stringify(Object.fromEntries(position_level)))
        alldata.append("address_now", JSON.stringify(Object.fromEntries(address_now)))
        alldata.append("address_regis", JSON.stringify(Object.fromEntries(address_regis)))
        alldata.append("personal_skill", JSON.stringify(Object.fromEntries(personal_skill)))
        alldata.append("education_his", JSON.stringify(Object.fromEntries(education_his)))
        alldata.append("teaching", JSON.stringify(Object.fromEntries(teaching)))
        alldata.append("work", JSON.stringify(Object.fromEntries(work)))
        alldata.append("reward", JSON.stringify(Object.fromEntries(reward)))
        alldata.append("education_level", JSON.stringify(Object.fromEntries(education_level)))
        alldata.append("employment_order", JSON.stringify(Object.fromEntries(employment_order)))
        alldata.append("salary_his", JSON.stringify(Object.fromEntries(salary_his)))
        alldata.append("insignia", JSON.stringify(Object.fromEntries(insignia)))
        alldata.append("employment_appoval", JSON.stringify(Object.fromEntries(employment_appoval)))
        alldata.append("menagement_position", JSON.stringify(Object.fromEntries(menagement_position)))
        alldata.append("study_leave", JSON.stringify(Object.fromEntries(study_leave)))
        alldata.append("affair_trianing", JSON.stringify(Object.fromEntries(affair_trianing)))
        alldata.append("personnal_file", JSON.stringify(Object.fromEntries(personnal_file)))
        alldata.append("leave_his", JSON.stringify(Object.fromEntries(leave_his)))
        alldata.append("position_academic_req_his", JSON.stringify(Object.fromEntries(position_academic_req_his)))
        alldata.append("personal_dev_plan", JSON.stringify(Object.fromEntries(personal_dev_plan)))
        alldata.append("other_data", JSON.stringify(Object.fromEntries(other_data)))


        function hasWhiteSpace(s) {
            return (/\s/).test(s);
        }

      
        try {
            var test = hasWhiteSpace(document.getElementById("A20").value)
            var token = localStorage.getItem("accessToken")
            if (!test || !token) {
                const res = await axios.post(`${api}/uploadFile/${token}`, alldata)
                if (res.data.state == "yes") {
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                        timer: 1500
                    }).then(() => {
                        navigate("/SearchDataHr")
                    })

                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'เกิดข้อพลาด',
                        text: res.data.message,
                    })
                }

            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'เกิดข้อพลาด',
                    text: "กรุณาตรวจสอบ Gmail",
                })
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
            if (x.state == "yes" && x.data == "hr") {
                getSelectChoice()
                getAddress()
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
                    <img src="https://www.perfectcompanion.com/wp-content/uploads/2020/10/image1.jpg" class="mobile_profile_img" alt="" />
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

            {dataSelect ?
                <div className="content">
                    <div className="app">


                        <div className="imgbox">
                            <p style={{ color: 'aquamarine', fontSize: '10px' }}>.</p>
                            <div class="profile-pic-wrapper">
                                <div class="pic-holder">

                                    <img src={photo} alt="new" />

                                    <label for="img" class="upload-file-block">
                                        <div class="text-center">
                                            <div class="mb-2">
                                                <i class="fa fa-camera fa-2x"></i>
                                            </div>
                                            <div class="text-uppercase">
                                                Update <br /> Profile Photo
                                            </div>
                                        </div>
                                    </label>
                                    <input type="file" id="img" accept="image/*" style={{ display: 'none' }} onChange={setPhotox} />
                                </div>
                            </div>

                            {/* 
                <div class="container">
                 <div class="picture-container">
                   <div class="picture">
                     <img 
                      src={photo}
                      alt="new"
                     />
                     <input type="file" class="form-control" id="img" accept="image/*" onChange={setPhotox} />
                   </div>
                    <button class="btn btn-secondary" style={{ borderRadius:'60%'}}><AiIcons.AiOutlinePlus/></button>

                 </div>
               </div> */}
                        </div>

                        <div className="infobox">
                            <div className="">


                                <div>


                                    <div>
                                        <div>
                                            <h3>ประวัติส่วนตัว</h3>
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

                                                        {dataSelect != null ? dataSelect.title_name.map((valuex, i) => {
                                                            if (valuex.language == "TH") {
                                                                return (
                                                                    <>
                                                                        {<option value={valuex.id}>{valuex.คำนำหน้าเต็ม}</option>}
                                                                    </>
                                                                )
                                                            }
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
                                                        {dataSelect != null ? dataSelect.title_name.map((valuex, i) => {
                                                            if (valuex.language == "ENG") {
                                                                return (
                                                                    <>
                                                                        {<option value={valuex.id}>{valuex.คำนำหน้าเต็ม}</option>}
                                                                    </>
                                                                )
                                                            }
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
                                                    <select class="form-select form-select" aria-label=".form-select-sm example" id="A16">
                                                        <option selected value={""}>โปรดระบุ...</option>
                                                        {provinceList ?
                                                            provinceList.map((value, i) => {
                                                                return (
                                                                    <option value={value.id} >{value.name_th}</option>
                                                                )
                                                            })
                                                            : null}
                                                    </select>
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
                                            <div className="rama-x">
                                                <p>Gmail (่จำเป็นต้องใส่)</p>
                                            </div>
                                            <input class="form-control" type="email" placeholder="Gmail" id="A20" />
                                        </div>


                                        {Email != [] ? Email.map((valuex, i) => {

                                            return (
                                                <>
                                                    {valuex.form}
                                                </>
                                            )
                                        }) : null}
                                        <div className="midbut">

                                            <button class="btn btn-outline-success" onClick={() => pushMoreEmail()} > เพิ่ม</button>
                                            <button class="btn btn-outline-danger" onClick={() => removeEmail()} > ลด</button>
                                            <p style={{ fontSize: '12px' }}>เพิ่ม/ลด Email</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* =====================================================================อันนี้ทำไว้ที่ต้องกรอกไว้ให้จัดหน้าที่หลังเองนะ ============================================================ */}



                            {/* ====================================================================================================================== */}

                        </div>

                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ที่อยู่ปัจจุบัน</h3>
                            <div className="rama-x">
                                <p>ที่อยู่</p>
                            </div>
                            <textarea class="form-control" placeholder="บ้านเลขที่/หมู่ที่/หมู่บ้าน" id="B1" />

                            <div class="row">
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>ตรอก/ซอย</p>
                                    </div>
                                    <input class="form-control" placeholder="ตรอก/ซอย" id="B2" />
                                </div>
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>ถนน</p>
                                    </div>
                                    <input class="form-control" placeholder="ถนน" id="B3" />
                                </div>
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>จังหวัด</p>
                                    </div>
                                    <select class="form-select form-select" aria-label=".form-select-sm example" id="B4" onChange={(event) => {
                                        {

                                            document.getElementById("B5").value = 0
                                            setAmphoeTempList([])
                                            setSubdistrictListTemp([])
                                            document.getElementById("B6").value = 0
                                            document.getElementById("B7").value = ""

                                            var xas = []
                                            amphoeList.map((value, i) => {
                                                if (value.province_id == event.target.value) {

                                                    xas.push(value)
                                                }
                                            })
                                            setAmphoeTempList(xas)
                                        }
                                    }}>
                                        <option selected value={0} >โปรดระบุ...</option>
                                        {provinceList ?
                                            provinceList.map((value, i) => {
                                                return (
                                                    <option value={value.id} >{value.name_th}</option>
                                                )
                                            })
                                            : null}
                                    </select>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>อำเภอ</p>
                                    </div>
                                    <select class="form-select form-select" id="B5" aria-label=".form-select-sm example" onChange={async (event) => {
                                        document.getElementById("B6").value = 0
                                        document.getElementById("B7").value = ""
                                        setSubdistrictListTemp([])

                                        id = parseInt(event.target.value)
                                        var temp = []
                                        const newdata = subdistrictList.filter((item) => {
                                            if (id == item.amphure_id) {
                                                temp.push(item)
                                            }



                                        })
                                        setSubdistrictListTemp(temp)

                                    }}>
                                        <option selected value={0}>โปรดระบุ...</option>
                                        {amphoeTempList ?
                                            amphoeTempList.map((value, i) => {



                                                return (
                                                    <option value={value.id}>{value.name_th}</option>
                                                )



                                            })
                                            : null}
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>ตำบล</p>
                                    </div>
                                    <select class="form-select form-select" aria-label=".form-select-sm example" id="B6" onChange={async (event) => {
                                        subdistrictList.map((value, i) => {
                                            if (value.id == event.target.value) {
                                                document.getElementById("B7").value = (value.zip_code)
                                            }
                                        })


                                    }}>
                                        <option selected value={0}>โปรดระบุ...</option>

                                        {subdistrictListTemp1 ?
                                            subdistrictListTemp.map((value, i) => {



                                                return (
                                                    <option value={value.id}>{value.name_th}</option>
                                                )



                                            })
                                            : null}
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>รหัสไปรษณีย์</p>
                                    </div>
                                    <input class="form-control" id="B7" />
                                </div>
                            </div>
                 
                            <div>

                            </div>

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ที่อยู่ตามทะเบียนบ้าน</h3>
                            <div className="rama-x">
                                <p>ที่อยู่</p>
                            </div>
                            <textarea class="form-control" placeholder="บ้านเลขที่/หมู่ที่/หมู่บ้าน" value={addressRegis} onChange={(event) => { setAddressRegis(event.target.value) }} />

                            <div class="row">
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>ตรอก/ซอย</p>
                                    </div>
                                    <input class="form-control" placeholder="ตรอก/ซอย" value={alleyRegis} onChange={(event) => { setAlleyRigis(event.target.value) }} />
                                </div>
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>ถนน</p>
                                    </div>
                                    <input class="form-control" placeholder="ถนน" value={roadRegis} onChange={(event) => { setRoadRegis(event.target.value) }} />
                                </div>
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>จังหวัด</p>
                                    </div>
                                    <select class="form-select form-select" aria-label=".form-select-sm example" value={provinceRegis} onChange={(event) => {
                                        {
                                            setAmphoeTempList1([])
                                            setSubdistrictListTemp1([])
                                            setDistrictRegis(0)
                                            setSubdistrictRegis(0)
                                            setZipcodeRegis("")
                                            var xas = []
                                            amphoeList.map((value, i) => {
                                                if (value.province_id == event.target.value) {

                                                    xas.push(value)
                                                }
                                            })
                                            setAmphoeTempList1(xas)
                                            setProvinceRegis(event.target.value)
                                        }
                                    }}>
                                        <option selected value={0} >โปรดระบุ...</option>
                                        {provinceList ?
                                            provinceList.map((value, i) => {
                                                return (
                                                    <option value={value.id} >{value.name_th}</option>
                                                )
                                            })
                                            : null}
                                    </select>
                                </div>

                            </div>

                            <div class="row">
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>อำเภอ</p>
                                    </div>
                                    <select class="form-select form-select" value={districtRegis} aria-label=".form-select-sm example" onChange={async (event) => {

                                        setSubdistrictListTemp1([])

                                        setSubdistrictRegis(0)
                                        setZipcodeRegis("")

                                        id = parseInt(event.target.value)
                                        var temp = []
                                        const newdata = subdistrictList.filter((item) => {
                                            if (id == item.amphure_id) {
                                                temp.push(item)
                                            }



                                        })
                                        setSubdistrictListTemp1(temp)
                                        setDistrictRegis(event.target.value)

                                    }}>
                                        <option selected value={0}>โปรดระบุ...</option>
                                        {amphoeTempList1 ?
                                            amphoeTempList1.map((value, i) => {



                                                return (
                                                    <option value={value.id}>{value.name_th}</option>
                                                )



                                            })
                                            : null}
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>ตำบล</p>
                                    </div>
                                    <select class="form-select form-select" aria-label=".form-select-sm example" value={subDistrictRegis} onChange={async (event) => {

                                        subdistrictList.map((value, i) => {
                                            if (value.id == event.target.value) {
                                                setZipcodeRegis(value.zip_code)
                                                setSubdistrictRegis(event.target.value)
                                            }
                                        })

                                    }}>
                                        <option selected value={0}>โปรดระบุ...</option>

                                        {subdistrictListTemp1 ?
                                            subdistrictListTemp1.map((value, i) => {



                                                return (
                                                    <option value={value.id}>{value.name_th}</option>
                                                )



                                            })
                                            : null}
                                    </select>
                                </div>
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>รหัสไปรษณีย์</p>
                                    </div>
                                    <input class="form-control" value={zipcodeRegis} onChange={(event) => { setZipcodeRegis(event.target.value) }} />
                                </div>
                            </div>
                          
                            <div className="midbut">
                                <button class="btn btn-secondary" onClick={() => {

                                    setAddressRegis(document.getElementById("B1").value)
                                    setAlleyRigis(document.getElementById("B2").value)
                                    setRoadRegis(document.getElementById("B3").value)
                                    setProvinceRegis(document.getElementById("B4").value)
                                    setDistrictRegis(document.getElementById("B5").value)
                                    setSubdistrictRegis(document.getElementById("B6").value)
                                    setZipcodeRegis(document.getElementById("B7").value)
                                 
                                    setAmphoeTempList1(amphoeTempList)
                                    setSubdistrictListTemp1(subdistrictListTemp)



                                }} >ที่อยู่เดียวกับที่อยู่ปัจจุบัน</button>
                            </div>

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>สาขาที่เชี่ยวชาญและสนใจ</h3>
                            {Interested != [] ? Interested.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreInterested()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeInterested()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด สาขาที่เชี่ยวชาญและสนใจ</p>
                            </div>
                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ประวัติข้อมูลการศึกษา</h3>
                            {Study != [] ? Study.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreStudy()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeStudy()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด ประวัติข้อมูลการศึกษา</p>
                            </div>
                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ด้านงานสอน</h3>
                            {Teaching != [] ? Teaching.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreTeaching()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeTeaching()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด ด้านงานสอน</p>
                            </div>
                        </div>

                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ผลงาน</h3>
                            {Article != [] ? Article.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreArticle()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeArticle()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด ผลงานด้านอื่นๆ</p>
                            </div>
                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>รางวัลที่ได้รับ</h3>
                            {Reward != [] ? Reward.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreReward()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeReward()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด รางวัลที่ได้รับ</p>
                            </div>
                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>วุฒิการศึกษาตามอัตรา</h3>
                            <div className="rama-x">
                                <p>วุฒิการศึกษาตามอัตรา</p>
                            </div>
                            <input class="form-control" placeholder="วุฒิการศึกษาตามอัตรา" id="C1" />
                            <div className="rama-x">
                                <p>วุฒิพิเศษ</p>
                            </div>
                            <input class="form-control" placeholder="วุฒิพิเศษ" id="C2" />
                            <div className="rama-x">
                                <p>วุฒิสูงสุดที่จบ</p>
                            </div>
                            <input class="form-control" placeholder="วุฒิสูงสุดที่จบ" id="C3" />
                            <div class="row">
                                <div class="col">
                                    <div className="rama-x">
                                        <p>ชื่อปริญญาสูงสุด</p>
                                    </div>
                                    <input class="form-control" placeholder="ชื่อปริญญาสูงสุด" id="C4" />
                                </div>
                                <div class="col-md-3">
                                    <div className="rama-x">
                                        <p>ชื่อปริญญาสูงสุด (ย่อ)</p>
                                    </div>
                                    <input class="form-control" placeholder="ชื่อปริญญาสูงสุด (ย่อ)" id="C5" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div className="rama-x">
                                        <p>ชื่อปริญญาสูงสุด (ภาษาอังกฤษ)</p>
                                    </div>
                                    <input class="form-control" placeholder="ชื่อปริญญาสูงสุด (ภาษาอังกฤษ)" id="C6" />
                                </div>
                                <div class="col-md-3">
                                    <div className="rama-x">
                                        <p>ชื่อปริญญาสูงสุด (ย่อภาษาอังกฤษ)</p>
                                    </div>
                                    <input class="form-control" placeholder="ชื่อปริญญาสูงสุด (ย่อภาษาอังกฤษ)" id="C7" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div className="rama-x">
                                        <p>ชื่อสาขา</p>
                                    </div>
                                    <input class="form-control" placeholder="ชื่อสาขา" id="C8" />
                                </div>
                                <div class="col-md-6">
                                    <div className="rama-x">
                                        <p>ชื่อสาขา (ภาษาอังกฤษ)</p>
                                    </div>
                                    <input class="form-control" placeholder="ชื่อสาขา (ภาษาอังกฤษ)" id="C9" />
                                </div>
                            </div>
                            <div className="rama-x">
                                <p>ชื่อสถานศึกษา</p>
                            </div>
                            <input class="form-control" placeholder="ชื่อสถานศึกษา" id="C10" />
                            <div className="rama-x">
                                <p>ชื่อสถานศึกษา (ภาษาอังกฤษ)</p>
                            </div>
                            <input class="form-control" placeholder="ชื่อสถานศึกษา (ภาษาอังกฤษ)" id="C11" />
                            <div className="rama-x">
                                <p>ประเทศที่จบ</p>
                            </div>
                            <input class="form-control" placeholder="ประเทศที่จบ" id="C12" />

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ข้อมูลตำแหน่ง</h3>
                            <div class="row">
                                <div class="col-md-2">
                                    <div className="rama-x">
                                        <p>อัตราเลขที่</p>
                                    </div>
                                    <input class="form-control" placeholder="อัตราเลขที่" id="D1" />
                                </div>
                                <div class="col-md-5">
                                    <div className="rama-x">
                                        <p>ตำแหน่ง</p>
                                    </div>
                                    <input class="form-control" placeholder="ตำแหน่ง" id="D2" />
                                </div>
                                <div class="col-md-5">
                                    <div className="rama-x">
                                        <p>ระดับ</p>
                                    </div>
                                    <input class="form-control" placeholder="ระดับ" id="D3" />
                                </div>
                            </div>
                            <div className="rama-x">
                                <p>ปฏิบัติงานที่</p>
                            </div>
                            <input class="form-control" placeholder="ปฏิบัติงานที่" id="D4" />

                            <div class="row">
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>ภาควิชา/ฝ่าย</p>
                                    </div>
                                    <input class="form-control" placeholder="ภาควิชา/ฝ่าย" id="D5" />
                                </div>
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>คณะ/สำนัก/สถาบัน</p>
                                    </div>
                                    <input class="form-control" placeholder="คณะ/สำนัก/สถาบัน" id="D6" />
                                </div>
                                <div class="col-md-4">
                                    <div className="rama-x">
                                        <p>วิทยาเขต</p>
                                    </div>
                                    <input class="form-control" placeholder="วิทยาเขต" id="D7" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div className="rama-x">
                                        <p>เบอร์โทรศัพท์ที่ทำงาน</p>
                                    </div>
                                    <input class="form-control" placeholder="เบอร์โทรศัพท์ที่ทำงาน" id="D8" />
                                    <div>
                                        {/* <p> <span className="errcheck">{tel.length != 10 && tel.length != 0 ? "กรุณากรอกให้ครบ 10 หลัก" : ""}</span></p> */}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div className="rama-x">
                                        <p>เบอร์ต่อ</p>
                                    </div>
                                    <input class="form-control" placeholder="เบอร์ต่อ" id="D9" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div className="rama-x">
                                        <p>เบอร์ภายใน</p>
                                    </div>
                                    <input class="form-control" placeholder="เบอร์ภายใน" id="D10" />
                                    <div>
                                        {/* <p> <span className="errcheck">{tel.length != 10 && tel.length != 0 ? "กรุณากรอกให้ครบ 10 หลัก" : ""}</span></p> */}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div className="rama-x">
                                        <p>เบอร์ต่อ</p>
                                    </div>
                                    <input class="form-control" placeholder="เบอร์ต่อ" id="D11" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <div className="rama-x">
                                        <p>โทรสาร</p>
                                    </div>
                                    <input class="form-control" placeholder="โทรสาร" id="D12" />
                                    <div>
                                        {/* <p> <span className="errcheck">{tel.length != 10 && tel.length != 0 ? "กรุณากรอกให้ครบ 10 หลัก" : ""}</span></p> */}
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div className="rama-x">
                                        <p>เบอร์ต่อ</p>
                                    </div>
                                    <input class="form-control" placeholder="เบอร์ต่อ" id="D13" />
                                </div>

                            </div>
                            <div className="rama-x">

                            </div>



                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>การบรรจุ</h3>
                            <div className="rama-x">
                                <p>ประเภทการบรรจุ</p>
                            </div>
                            <input class="form-control" placeholder="ประเภทการบรรจุ" id="E1" />
                            <div class="row">
                                <div class="col">
                                    <div className="rama-x">
                                        <p>คำสั่งบรรจุ</p>
                                    </div>
                                    <textarea class="form-control" placeholder="คำสั่งบรรจุ" id="E2" />
                                </div>
                                <div class="col-md-2">
                                    <div className="rama-x">
                                        <p>คำสั่งเลขที่</p>
                                    </div>
                                    <input class="form-control" placeholder="คำสั่งเลขที่" id="E3" />
                                </div>
                                <div class="col-md-3">
                                    <div className="rama-x">
                                        <p>คำสั่งลงวันที่</p>
                                    </div>
                                    <input type="date" class="form-control" placeholder="คำสั่งลงวันที่" id="E4" />

                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-3">
                                    <div className="rama-x">
                                        <p>เริ่มจ้าง/บรรจุ เมื่อ</p>
                                    </div>
                                    <input type="date" class="form-control" placeholder="เริ่มจ้าง/บรรจุ เมื่อ" id="E5" />
                                </div>
                                <div class="col">
                                    <div className="rama-x">
                                        <p>ระดับที่เริ่มจ้าง/บรรจุ</p>
                                    </div>
                                    <input class="form-control" placeholder="ระดับที่เริ่มจ้าง/บรรจุ" id="E6" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-3">
                                    <div className="rama-x">
                                        <p>รับโอน เมื่อ</p>
                                    </div>
                                    <input type="date" class="form-control" placeholder="รับโอน เมื่อ" id="E7" />
                                </div>
                                <div class="col-md-2">
                                    <div className="rama-x">
                                        <p>คำสั่งโอนเลขที่</p>
                                    </div>
                                    <input class="form-control" placeholder="คำสั่งโอนเลขที่" id="E8" />
                                </div>
                                <div class="col">
                                    <div className="rama-x">
                                        <p>ระดับที่โอน</p>
                                    </div>
                                    <input class="form-control" placeholder="ระดับที่โอน" id="E9" />
                                </div>
                            </div>
                            <div className="rama-x">
                                <p>หมายเหตุของการบรรจุ/แหล่งเงิน</p>
                            </div>
                            <textarea class="form-control" placeholder="หมายเหตุของการบรรจุ/แหล่งเงิน" id="E10" />

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ประวัติการเลื่อนขั้นเงินเดือน/ค่าจ้าง/ค่าตอบแทน</h3>
                            {Salary != [] ? Salary.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">

                                <button class="btn btn-outline-success" onClick={() => pushMoreSalary()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeSalary()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด ประวัติการเลื่อนขั้นเงินเดือน/ค่าจ้าง/ค่าตอบแทน</p>
                            </div>

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>เครื่องราชอิสริยาภรณ์</h3>
                            {Insignia != [] ? Insignia.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreInsignia()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeInsignia()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด เครื่องราชอิสริยาภรณ์</p>
                            </div>

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>การจ้างต่อ/ขยายเวลาราชการ</h3>

                            {appoval != [] ? appoval.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">

                                <button class="btn btn-outline-success" onClick={() => pushMoreAppoval()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeAppoval()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด การจ้างต่อ/ขยายเวลาราชการ</p>
                            </div>


                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ตำแหน่งทางการบริหาร</h3>
                            {Administrative != [] ? Administrative.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreAdministrative()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeAdministrative()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด ตำแหน่งทางการบริหาร</p>
                            </div>
                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>

                        <div className="infobox">
                            <h3>ข้อมูลการลาศึกษาต่อ</h3>
                            {LeavetoS != [] ? LeavetoS.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}

                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreLeavetoS()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeLeavetoS()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด ข้อมูลการลาศึกษาต่อ</p>
                            </div>

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ข้อมูลไปราชการและการอบรม</h3>
                            {certificate != [] ? certificate.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}

                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreCer()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeCer()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด ข้อมูลไปราชการและการอบรม</p>
                            </div>

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>Module เก็บไฟล์เอกสารประจำตัว</h3>
                            {Module != [] ? Module.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">

                                <button class="btn btn-outline-success" onClick={() => pushMoreModule()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeModule()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด Module เก็บไฟล์เอกสารประจำตัว</p>
                            </div>

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ข้อมูลการลา</h3>
                            {Leave != [] ? Leave.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">

                                <button class="btn btn-outline-success" onClick={() => pushMoreLeave()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeLeave()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด ข้อมูลการลา</p>
                            </div>

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>ประวัติการขอตำแหน่งทางวิชาการ</h3>
                            {Position != [] ? Position.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">

                                <button class="btn btn-outline-success" onClick={() => pushMorePosition()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removePosition()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด ประวัติการขอตำแหน่งทางวิชาการ</p>
                            </div>

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>
                        <div className="infobox">
                            <h3>แผนการพัฒนาบุคคล</h3>
                            {Develop != [] ? Develop.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">

                                <button class="btn btn-outline-success" onClick={() => pushMoreDevelop()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeDevelop()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด แผนการพัฒนาบุคคล</p>
                            </div>

                        </div>
                        <p style={{ color: "aquamarine" }} >/</p>

                        <div className="infobox">
                            <h3>ข้อมูลอื่นๆ</h3>
                            {otherData != [] ? otherData.map((valuex, i) => {

                                return (
                                    <>
                                        <div className="rama-o">
                                            <h5>{i + 1}.</h5>
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">

                                <button class="btn btn-outline-success" onClick={()=>pushMoreOtherData()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger"  onClick={()=>removeOhterData()} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด ข้อมูลอื่นๆ</p>
                            </div>

                        </div>

                        <div className="midbut">
                            <button class="btn btn-success" type="submit" onClick={() => { addUser() }}>บันทึก</button>
                        </div>




                    </div>
                </div>
                : null}
        </div>
    )
}
export default AddUserHr