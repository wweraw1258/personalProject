import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom'
import { api } from "../../Component/api";
import "../editAdmin.css"
import * as AiIcons from 'react-icons/ai';
import { Button, Form } from 'reactstrap';
import Logout from "../../Component/Logout";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from '../../App'

const EditByUser = () => {
    let navigate = useNavigate();
    const { Checkx, Error,revokeToken } = useContext(AuthContext);
    const location = useLocation()
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
    const [photoName, setPhotoName] = useState(null);
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
  

    const [idInterest, setIdInterest] = useState([])
    const [idTeaching, setIdTeaching] = useState([])
    const [idWork, setIdWork] = useState([])
    const [idReward, setIdReward] = useState([])
    const [id_addressNow, setId_addressNow] = useState([])
    const [id_addressRegis, setId_addressRegis] = useState([])

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
    const [Interested, setInterested] = useState([])
    const [Teaching, setTeaching] = useState([])
    const [Article, setArticle] = useState([])
    const [Reward, setReward] = useState([])


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
        if(Email.length!=1){
        const value = [...Email];
        value.pop()
        if (value.length >= 0) {
            setEmail(value)
        }}
    }
   

    const pushMoreReward = () => {
        if (Reward.length >= 0) {
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


    const removeReward = (i) => {
        if (i > idReward.length) {
            const value = [...Reward];
            value.pop()
            if (value.length >= 0) {
                setReward(value)
            }

        }


    }

    const pushMoreArticle = () => {
        if (Article.length >= 0) {
            setArticle([...Article, {
                "form":
                    <>
                        <div className="rama-x">
                            <p>ประเภท</p>
                        </div>
                        <select class="form-select form-select" aria-label=".form-select-sm example" id={"workType" + Article.length}>
                            <option selected value={""}>โปรดระบุ...</option>
                            {dataSelect ?
                                dataSelect.work_type.map((value, i) => {
                                    return (
                                        <option value={value.id}>{value.ประเภทผลงาน}</option>
                                    )
                                })
                                : null}

                        </select>


                        <div className="rama-x">
                            <p>ปีของผลงาน</p>
                        </div>
                        <div class="mb-3">
                            <input type="number" min="1900" max="2099" step="1" id={"workYear" + Article.length} />
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

    const removeArticle = (i) => {
        if (i > idWork.length) {
            const value = [...Article];
            value.pop()
            if (value.length >= 0) {
                setArticle(value)
            }
        }
    }


    const pushMoreTeaching = () => {
        if (Teaching.length >= 0) {
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


    const removeTeaching = (i) => {
        if (i > idTeaching.length) {
            const value = [...Teaching];
            value.pop()
            if (value.length >= 0) {
                setTeaching(value)
            }
        }
    }

 
    const pushMoreInterested = () => {
        var skillValue = "interest" + Interested.length

        console.log(dataSelect.skill_list)
        setInterested([...Interested, {
            "form":
                <div>
                    <div className="rama-x">
                        <p>ชื่อสาขาที่เขี่ยวชาญและสนใจ</p>
                        <p style={{ "display": "none" }} >none</p>
                    </div>
                    <select class="form-select form-select" aria-label=".form-select-sm example" id={"interest" +Interested.length}>
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
        }
        ])

    }


    const removeInterested = (i) => {
        if (i > idInterest.length) {
            const value = [...Interested];
            value.pop()
            if (value.length >= 0) {
                setInterested(value)
            }
        }
    }

    const getSelectChoice = async () => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            try {
                const res = await axios.post(`${api}/selectChoice`, { accesstoken: token })
                if (res.data.state == "yes") {

                    setInterested([{
                        "form":
                            <>

                                <div className="rama-x">
                                    <p>ชื่อสาขาที่เขี่ยวชาญและสนใจ</p>

                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id="interest0">
                                    <option selected value={""}>โปรดระบุ....</option>
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
                 
                    setArticle([{
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ประเภท</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id="workType0">
                                    <option selected value={""}>โปรดระบุ...</option>
                                    {res.data ?
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
                                    <input type="number" min="1900" max="2099" step="1" id="workYear0" />
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
                                    <input type="number" min="1900" max="2099" step="1" id="rewardYear0" />
                                </div>

                                <div class="mb-3">
                                    <textarea class="form-control" placeholder="ชื่อรางวัล/ชื่อหัวข้อที่ได้รับรางวัล/ชื่อระดับการแข่งขัน/ปีที่ได้รับ" id="rewardDetail0"></textarea>
                                </div>
                            </>
                        , "value": 0
                    }
                    ])

                    setDataSelect(res.data)
                } else {
                    Error()
                    navigate("/")
                }
            }
            catch (e) {

                Error()
                navigate("/")

            }
        } else {
            Error()
            navigate("/")
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
                    setTimeout(
                        () => getUser(res.data),
                        800
                    );



                } else {
                    Error()
                    navigate("/")
                }
            }
            catch (e) {

                Error()
                navigate("/")

            }
        } else {
            Error()
            navigate("/")
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


        address_now.append("id", id_addressNow)
        address_now.append("บ้านเลขที่", document.getElementById("B1").value)
        address_now.append("ประเภท", "ปัจจุบัน")
        address_now.append("ตรอก/ซอย", document.getElementById("B2").value)
        address_now.append("ถนน", document.getElementById("B3").value)
        address_now.append("จังหวัด", document.getElementById("B4").value)
        address_now.append("อำเภอ/เขต", document.getElementById("B5").value)
        address_now.append("ตำบล", document.getElementById("B6").value)
        address_now.append("รหัสไปรษณีย์", document.getElementById("B7").value)



        address_regis.append("id", id_addressRegis)
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
            console.log(idInterest)
            var interText = "interest" + i
            if (i < idInterest.length) {
                personal_skill.append(i, JSON.stringify({
                    "id": idInterest[i],
                    "idความเชี่ยวชาญ": document.getElementById(interText).value
                }))
            } else {
                personal_skill.append(i, JSON.stringify({
                    "id": null,
                    "idความเชี่ยวชาญ": document.getElementById(interText).value
                }))
            }
        })

        let teaching = new FormData()

        Teaching.map((value, i) => {

            if (i < idTeaching.length) {

                teaching.append(i, JSON.stringify({
                    "id": idTeaching[i],
                    "รหัสวิชา": document.getElementById("teachingSubject" + i).value,
                    "ระดับ": document.getElementById("teachingRank" + i).value,
                    "หมายเหตุ": document.getElementById("teachingNote" + i).value,
                }))

            } else {
                teaching.append(i, JSON.stringify({
                    "id": null,
                    "รหัสวิชา": document.getElementById("teachingSubject" + i).value,
                    "ระดับ": document.getElementById("teachingRank" + i).value,
                    "หมายเหตุ": document.getElementById("teachingNote" + i).value,
                }))
            }
        })


        let work = new FormData()

        Article.map((value, i) => {
            if (i < idWork.length) {
                work.append(i, JSON.stringify({
                    "id": idWork[i],
                    "ประเภท": document.getElementById("workType" + i).value,
                    "ปี": document.getElementById("workYear" + i).value,
                    "รายละเอียด": document.getElementById("workDetail" + i).value,
                }))

            } else {
                work.append(i, JSON.stringify({
                    "id": null,
                    "ประเภท": document.getElementById("workType" + i).value,
                    "ปี": document.getElementById("workYear" + i).value,
                    "รายละเอียด": document.getElementById("workDetail" + i).value,
                }))

            }
        })

        let reward = new FormData()
        console.log(Reward)
        console.log(idReward)
        Reward.map((value, i) => {

            if (i < idReward.length) {
                reward.append(i, JSON.stringify({
                    "id": idReward[i],
                    "ปี": document.getElementById("rewardYear" + i).value,
                    "รายละเอียด": document.getElementById("rewardDetail" + i).value,
                }))

            } else {
                reward.append(i, JSON.stringify({
                    "id": null,
                    "ปี": document.getElementById("rewardYear" + i).value,
                    "รายละเอียด": document.getElementById("rewardDetail" + i).value,
                }))
            }
        })





        try {
            personal_infromation.append("รูปภาพ", dataPhoto.name)
            alldata.append("profile", dataPhoto)
        } catch (e) {
            personal_infromation.append("รูปภาพ", photoName)
        }

        alldata.append("personal_infromation", JSON.stringify(Object.fromEntries(personal_infromation)))
        alldata.append("address_now", JSON.stringify(Object.fromEntries(address_now)))
        alldata.append("address_regis", JSON.stringify(Object.fromEntries(address_regis)))
        alldata.append("personal_skill", JSON.stringify(Object.fromEntries(personal_skill)))

        alldata.append("teaching", JSON.stringify(Object.fromEntries(teaching)))
        alldata.append("work", JSON.stringify(Object.fromEntries(work)))
        alldata.append("reward", JSON.stringify(Object.fromEntries(reward)))



        function hasWhiteSpace(s) {
            return (/\s/).test(s);
        }


        try {
            var test = hasWhiteSpace(document.getElementById("A20").value)
            var token = localStorage.getItem("accessToken")
            if (!test || !token) {
                const res = await axios.post(`${api}/editbyuser/${token}`, alldata)
                if (res.data.state == "yes") {
                    Swal.fire({
                        icon: 'success',
                        title: res.data.message,
                        timer: 1500
                    }).then(() => {
                        navigate("/ShowdataUser")
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
                    text: "ตรวจสอบ gmail",
                })
            }
        }
        catch (e) {
            Error()
            navigate("/")
        }


    }

    const getUser = async (data) => {

        try {
            var token = await localStorage.getItem("accessToken")
            const res = await axios.post(`${api}/getprofile`, { accesstoken: token, gmail: localStorage.getItem("gmail") })
            var temp_id = []

            if (res.data.state == "yes") {
                setPhotoName(res.data.personal_information[0].รูปภาพ)
                if (res.data.personal_information[0].รูปภาพ) {
                    setPhoto(`${api}/profile/${res.data.personal_information[0].gmail}/${res.data.personal_information[0].รูปภาพ}`)
                }
                document.getElementById("A2").value = res.data.personal_information[0].ชื่อจริงไทย
                document.getElementById("A3").value = res.data.personal_information[0].นามสกุลไทย
                document.getElementById("A4").value = res.data.personal_information[0].คำนำหน้าอังกฤษ
                document.getElementById("A5").value = res.data.personal_information[0].ชื่อจริงอังกฤษ
                document.getElementById("A6").value = res.data.personal_information[0].นามสกุลอังกฤษ
                document.getElementById("A7").value = res.data.personal_information[0].เลขบัตรประชาชน
                document.getElementById("A8").value = res.data.personal_information[0].พาสปอร์ต

                document.getElementById("A9").value = res.data.personal_information[0].วันเกิด.split("T")[0]
                document.getElementById("A10").value = res.data.personal_information[0].เพศ
                document.getElementById("A11").value = res.data.personal_information[0].หมู่เลือด
                document.getElementById("A12").value = res.data.personal_information[0].สถานะสมรส
                document.getElementById("A13").value = res.data.personal_information[0].สัญชาติ
                document.getElementById("A14").value = res.data.personal_information[0].เชื้อชาติ
                document.getElementById("A15").value = res.data.personal_information[0].ศาสนา
                document.getElementById("A16").value = res.data.personal_information[0].จังหวัดที่เกิด
                document.getElementById("A17").value = res.data.personal_information[0].ประเทศที่เกิด
                document.getElementById("A18").value = res.data.personal_information[0].รหัสไปรษณีย์
                document.getElementById("A19").value = res.data.personal_information[0].เบอร์โทรศัพท์
                document.getElementById("A1").value = res.data.personal_information[0].คำนำหน้าไทย
                document.getElementById("A20").value = res.data.personal_information[0].gmail

                res.data.personal_information[0].อีเมล.split(",").map((val, i) => {
                    if (i == 0) {
                        document.getElementById("email0").value = val
                    } else {
                        pushMoreEmail()
                        document.getElementById("email" + i).value = val
                    }
                })

                //ที่อยู่
                if (res.data.address.length != 0) {
                    if (res.data.address[0].ประเภท == "ปัจจุบัน") {
                        setId_addressNow(res.data.address[0].id)
                        var xas = []
                        data.district.map((value, i) => {
                            if (value.province_id == res.data.address[0].จังหวัด) {
                                xas.push(value)
                            }
                        })
                        setAmphoeTempList(xas)
                        var temp = []
                        const newdata = data.subdistrict.filter((item) => {
                            if (res.data.address[0]["อำเภอ/เขต"] == item.amphure_id) {
                                temp.push(item)
                            }
                        })
                        setSubdistrictListTemp(temp)
                        document.getElementById("B1").value = res.data.address[0].บ้านเลขที่
                        document.getElementById("B2").value = res.data.address[0]["ตรอก/ซอย"]
                        document.getElementById("B3").value = res.data.address[0].ถนน
                        document.getElementById("B4").value = res.data.address[0].จังหวัด
                        document.getElementById("B5").value = res.data.address[0]["อำเภอ/เขต"]
                        document.getElementById("B6").value = res.data.address[0].ตำบล
                        document.getElementById("B7").value = res.data.address[0].รหัสไปรษณีย์
                    } else {
                        setId_addressNow(res.data.address[1].id)
                        var xas = []
                        data.district.map((value, i) => {
                            if (value.province_id == res.data.address[1].จังหวัด) {
                                xas.push(value)
                            }
                        })
                        setAmphoeTempList(xas)
                        var temp = []
                        const newdata = data.subdistrict.filter((item) => {
                            if (res.data.address[1]["อำเภอ/เขต"] == item.amphure_id) {
                                temp.push(item)
                            }
                        })
                        setSubdistrictListTemp(temp)
                        document.getElementById("B1").value = res.data.address[1].บ้านเลขที่
                        document.getElementById("B2").value = res.data.address[1]["ตรอก/ซอย"]
                        document.getElementById("B3").value = res.data.address[1].ถนน
                        document.getElementById("B4").value = res.data.address[1].จังหวัด
                        document.getElementById("B5").value = res.data.address[1]["อำเภอ/เขต"]
                        document.getElementById("B6").value = res.data.address[1].ตำบล
                        document.getElementById("B7").value = res.data.address[1].รหัสไปรษณีย์
                    }
                    if (res.data.address[0].ประเภท == "ตามทะเบียนบ้าน") {
                        setId_addressRegis(res.data.address[0].id)
                        var xas = []
                        data.district.map((value, i) => {
                            if (res.data.address[0].จังหวัด == value.province_id) {
                                xas.push(value)
                            }
                        })
                        setAmphoeTempList1(xas)
                        var temp = []
                        const newdata = data.subdistrict.filter((item) => {
                            if (res.data.address[0]["อำเภอ/เขต"] == item.amphure_id) {
                                temp.push(item)
                            }
                        })
                        setSubdistrictListTemp1(temp)
                        setAddressRegis(res.data.address[0].บ้านเลขที่)
                        setAlleyRigis(res.data.address[0]["ตรอก/ซอย"])
                        setRoadRegis(res.data.address[0].ถนน)
                        setProvinceRegis(res.data.address[0].จังหวัด)
                        setDistrictRegis(res.data.address[0]["อำเภอ/เขต"])
                        setSubdistrictRegis(res.data.address[0].ตำบล)
                        setZipcodeRegis(res.data.address[0].รหัสไปรษณีย์)
                    } else {
                        setId_addressRegis(res.data.address[1].id)
                        var xas = []
                        data.district.map((value, i) => {
                            if (res.data.address[1].จังหวัด == value.province_id) {

                                xas.push(value)
                            }
                        })
                        setAmphoeTempList1(xas)
                        var temp = []
                        const newdata = data.subdistrict.filter((item) => {
                            if (res.data.address[1]["อำเภอ/เขต"] == item.amphure_id) {
                                temp.push(item)
                            }
                        })
                        setSubdistrictListTemp1(temp)
                        setAddressRegis(res.data.address[1].บ้านเลขที่)
                        setAlleyRigis(res.data.address[1]["ตรอก/ซอย"])
                        setRoadRegis(res.data.address[1].ถนน)
                        setProvinceRegis(res.data.address[1].จังหวัด)
                        setDistrictRegis(res.data.address[1]["อำเภอ/เขต"])
                        setSubdistrictRegis(res.data.address[1].ตำบล)
                        setZipcodeRegis(res.data.address[1].รหัสไปรษณีย์)
                    }
                }


                //ความสนใจ
                temp_id = []
                console.log("ความสนใจ" + temp_id.length)
                var temp_personal_skill = []
                res.data.personal_skill.map((val, i) => {
                    temp_id.push(val.id)
                    temp_personal_skill.push({
                        "form":
                            <div>
                                <div className="rama-x">
                                    <p>ชื่อสาขาที่เขี่ยวชาญและสนใจ</p>
                                    <p style={{ "display": "none" }} >none</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id={"interest" + i}>
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
                    })
                })
                if (temp_personal_skill) {
                    setInterested(temp_personal_skill)
                }
                setIdInterest(temp_id)
                console.log("ความสนใจหลัง" + temp_id.length)
                res.data.personal_skill.map((val, i) => {
                    document.getElementById("interest" + i).value = val.idความเชี่ยวชาญ
                })



                //งานสอน
                temp_id = []
                var temp_teaching = []
                res.data.teaching.map((val, i) => {
                    temp_id.push(val.id)
                    temp_teaching.push({
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ระดับการสอน</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id={"teachingRank" + i}>
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
                                <select class="form-select form-select" aria-label=".form-select-sm example" id={"teachingSubject" + i}>
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
                                <input type="text" class="form-control" placeholder="หมายเหตุ" id={"teachingNote" + i} />
                            </>
                        , "value": 0
                    })
                })
                if (temp_teaching) {
                    setTeaching(temp_teaching)
                }
                setIdTeaching(temp_id)
                res.data.teaching.map((val, i) => {
                    document.getElementById("teachingSubject" + i).value = val.รหัสวิชา
                    document.getElementById("teachingRank" + i).value = val.ระดับ
                    document.getElementById("teachingNote" + i).value = val.หมายเหตุ
                })


                //ผลงาน
                temp_id = []
                var temp_work = []
                res.data.work.map((val, i) => {
                    temp_id.push(val.id)
                    temp_work.push({
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ประเภท</p>
                                </div>
                                <select class="form-select form-select" aria-label=".form-select-sm example" id={"workType" + i}>
                                    <option selected value={""}>โปรดระบุ...</option>
                                    {dataSelect ?
                                        dataSelect.work_type.map((value, i) => {

                                            return (
                                                <option value={value.id}>{value.ประเภทผลงาน}</option>
                                            )
                                        })
                                        : null}

                                </select>


                                <div className="rama-x">
                                    <p>ปีของผลงาน</p>
                                </div>
                                <div class="mb-3">
                                    <input type="number" min="1900" max="2099" step="1" id={"workYear" + i} />
                                </div>

                                <div className="rama-x">
                                    <p>รายละเอียด</p>
                                </div>
                                <div class="mb-3">
                                    <input type="text" class="form-control" placeholder="รายละเอียดผลงาน" id={"workDetail" + i} />
                                </div>
                            </>
                        , "value": 0
                    })
                })
                setArticle(temp_work)
                setIdWork(temp_id)
                res.data.work.map((val, i) => {
                    document.getElementById("workType" + i).value = val.ประเภท
                    document.getElementById("workYear" + i).value = val.ปี
                    document.getElementById("workDetail" + i).value = val.รายละเอียด
                })

                //รางวัล
                temp_id = []
                var temp_reward = []
                res.data.reward.map((val, i) => {
                    temp_id.push(val.id)
                    temp_reward.push({
                        "form":
                            <>
                                <div className="rama-x">
                                    <p>ปีของผลงาน</p>

                                </div>
                                <div class="mb-3">
                                    <input type="number" class="form-control" min="1900" max="2099" step="1" id={"rewardYear" + i} />
                                </div>

                                <div class="mb-3">
                                    <textarea class="form-control" placeholder="ชื่อรางวัล/ชื่อหัวข้อที่ได้รับรางวัล/ชื่อระดับการแข่งขัน/ปีที่ได้รับ" id={"rewardDetail" + i}></textarea>
                                </div>
                            </>
                        , "value": 0
                    })
                })

                setReward(temp_reward)

                setIdReward(temp_id)
                res.data.reward.map((val, i) => {
                    document.getElementById("rewardYear" + i).value = val.ปี
                    document.getElementById("rewardDetail" + i).value = val.รายละเอียด
                })




            } else {
                Error()
                navigate("/")
            }
        } catch (e) {
            Error()
            navigate("/")
        }
    }

    const start = () => {
        if (localStorage.getItem("gmail")) {
            getSelectChoice()

        } else {
            Error()
            navigate("/")
        }
        return true;

    }


    useEffect(async () => {
        const x = await Checkx()
        try {
            if (x.state == "yes" && x.data == "user") {
                start()
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



    useEffect(async () => {
        const x = await Checkx()
        try {
            if (x.state == "yes" && x.data == "user") {
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
    }, [dataSelect])

    const deleteData = async (id, db) => {
        Swal.fire({
            title: 'แน่ใจ?',
            text: "โปรดตรวจสอบข้อมูลที่ต้องการจะลบ",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก'
        }).then(async (result) => {
            if (result.isConfirmed) {

                try {
                    var token = localStorage.getItem("accessToken")
                    const res = await axios.post(`${api}/deleteData`, { accesstoken: token, id: id, db: db })
                    if (res.data.state == "yes") {
                        Swal.fire(
                            'ลบแล้ว!',
                            `เรียบร้อย`,
                            'success'
                        ).then(() => { start() })

                    } else {
                        Error()
                        navigate("/")

                    }
                } catch (e) {
                    Error()
                    navigate("/")
                }



            }
        })

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
                    <h4 >สถานะ : Hr </h4>
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
                    <img src={localStorage.getItem("Profile")} class="mobile_profile_img" alt="" />
                    <label for="check2">
                        <i class="fa fa-bars nav_btn"></i>
                    </label>
                </div>
                <div className="mobile_nav_items">
                    <a href="/personal/ShowDataUser"><i><AiIcons.AiFillLock /></i> <samp>ข้อมูลส่วนตัว</samp></a>
                    <a href="/personal/EditbyUser"><i><AiIcons.AiFillEdit /></i> <samp>แก้ไขข้อมูลส่วนตัว</samp></a>
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
                                                        <option selected >โปรดระบุ...</option>

                                                        {dataSelect ? dataSelect.title_name.map((valuex, i) => {

                                                            return (
                                                                <>
                                                                    {<option value={valuex.id}>{valuex.คำนำหน้าเต็ม}</option>}
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
                                            <input class="form-control" placeholder="Gmail" id="A20" readOnly/>
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
                                    <input class="form-control" placeholder="เบอร์โทรศัพท์" value={zipcodeRegis} onChange={(event) => { setZipcodeRegis(event.target.value) }} />
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
                                            {
                                                i < idInterest.length ? <button onClick={() => {
                                                    deleteData(idInterest[i], "personal_skill")
                                                }} class="btn btn-secondary">ลบ</button> : null
                                            }
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreInterested()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeInterested(Interested.length)} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด สาขาที่เชี่ยวชาญและสนใจ</p>
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
                                            {i < idTeaching.length ? <button onClick={() => {
                                                deleteData(idTeaching[i], "teaching")
                                            }} class="btn btn-secondary">ลบ</button> : null
                                            }
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreTeaching()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeTeaching(Teaching.length)} > ลด</button>
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
                                            {i < idWork.length ? <button onClick={() => {
                                                deleteData(idWork[i], "work")
                                            }} class="btn btn-secondary">ลบ</button> : null
                                            }
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreArticle()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeArticle(Article.length)} > ลด</button>
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
                                            {i < idReward.length ? <button onClick={() => {
                                                deleteData(idReward[i], "reward")
                                            }} class="btn btn-secondary">ลบ</button> : null}
                                            {valuex.form}
                                        </div>
                                    </>
                                )
                            }) : null}
                            <div className="midbut">
                                <button class="btn btn-outline-success" onClick={() => pushMoreReward()} > เพิ่ม</button>
                                <button class="btn btn-outline-danger" onClick={() => removeReward(Reward.length)} > ลด</button>
                                <p style={{ fontSize: '12px' }}>เพิ่ม/ลด รางวัลที่ได้รับ</p>
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
export default EditByUser