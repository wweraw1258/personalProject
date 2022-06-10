import React, { useRef, useEffect, useState, useContext } from 'react';
import axios from "axios";
import { api } from "../Component/api";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { render } from 'react-dom';
import { useReactToPrint } from 'react-to-print';
import { Container, Col, Row } from "react-bootstrap";
import './PrintUI.css';
import { AuthContext } from '../App';
import Swal from "sweetalert2";

const PDFprint = () => {
    const mouth = [{"Jan":"มกราคม","Feb":"กุมภาพันธ์","Mar":"มีนาคม","Apr":"เมษายน","May":"พฤษภาคม","Jun":"มิถุนายน","Jul":"กรกฎาคม","Aug":"สิงหาคม","Sep":"กันยายน","Oct":"ตุลาคม","Nov":"พฤศจิกายน","Dec":"ธันวาคม"}];
    const { Checkx } = useContext(AuthContext)
    const location = useLocation()
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    let navigate = useNavigate();
    const [photo, setPhoto] = useState("https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png")
    const [searchParams, setSearchParams] = useSearchParams()
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

    const Error = async () => {
        Swal.fire({
            icon: 'error',
            title: 'เกิดข้อพลาด',
            text: 'เกิดข้อผิดพลาด กรุณาเข้าสู่ระบบอีกครั้ง',
        }).then(() => {

            localStorage.clear()
        })
    }

    const getData = async () => {

        try {
            var token = await localStorage.getItem("accessToken")
            const res = await axios.post(`${api}/getprofilefinal`, { accesstoken: token, gmail: searchParams.get("gmail") })

            if (res.data.state == "yes") {
                console.log(res.data)
                setPerinfor(res.data.personal_information[0])

                try {
                    if(res.data.personal_information[0].รูปภาพ && res.data.personal_information[0].รูปภาพ!="null")
                    setPhoto(`${api}/profile/${searchParams.get("gmail")}/${res.data.personal_information[0].รูปภาพ}`)
                }
                catch (e) {
                    setPhoto("https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png")
                }

                if (res.data.address.length != 0) {
                    if (res.data.address.ประเภท == "ตามทะเบียนบ้าน") {
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
                setEmail(res.data.personal_information[0].อีเมล)
                //setEmail2(res.data.positon_level)

            } else {
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
            if (x.state == "yes") {
                if (searchParams.get("gmail")) {
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
            {Perinfor ? <>

                <div ref={componentRef}>
                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>ข้อมูลส่วนตัว</h5>
                        </div>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                <Row>
                                    <Col style={{ marginTop: '20px' }}>
                                        <div style={{ marginLeft: '30%' }} className="imguserpdf">

                                            <img src={photo} />


                                        </div>
                                    </Col>
                                    <Col style={{ marginTop: '20px' }}>
                                    {Perinfor ? <p>ชื่อ-นามสกุล (ภาษาไทย): {Perinfor.คำนำหน้าไทย} {Perinfor.ชื่อจริงไทย} {Perinfor.นามสกุลไทย} </p> :null}
                                    {Perinfor ? <p>ชื่อ-นามสกุล (ภาษาอังกฤษ): {Perinfor.คำนำหน้าอังกฤษ} {Perinfor.ชื่อจริงอังกฤษ} {Perinfor.นามสกุลอังกฤษ} </p> :null}
                                    {Perinfor ? <p>เลขบัตรประจำตัวประชาชน: {Perinfor.เลขบัตรประชาชน}</p> :null}
                                    {Perinfor ? <p>เบอร์โทรศัพท์: {Perinfor.เบอร์โทรศัพท์}</p> :null}
                                    {Perinfor ? <p>Gmail: {Perinfor.gmail}</p> :null}
                                    {Perinfor ? <p>Email: {Email}</p> :null}

                                    
                                    </Col>
                                </Row>
                            </Container>

                            <Container style={{ marginTop: '50px' }}>
                                <Row>
                                    <Col xs={3} md={2}>
                                    {Perinfor ? <p>วัน/เดือน/ปี เกิด: {Perinfor.วันเกิด}</p>:null}
                                    
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {Perinfor ? <p>เลขหนังสือเดินทาง: {Perinfor.พาสปอร์ต}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {Perinfor ? <p>เพศ: {Perinfor.เพศ}</p>:null}
                                    </Col>
                                    <Col xs={3} md={2}>
                                        {Perinfor ? <p>หมู่เลือด: {Perinfor.หมู่เลือด}</p>:null}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={3} md={2}>
                                    {Perinfor ? <p>สถานะภาพสมรส: {Perinfor.สถานะสมรส}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {Perinfor ? <p>สัญชาติ: {Perinfor.สัญชาติ}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {Perinfor ? <p>เชื้อชาติ: {Perinfor.เชื้อชาติ}</p>:null}
                                    </Col>
                                    <Col xs={3} md={2}>
                                        {Perinfor ? <p>ศาสนา: {Perinfor.ศาสนา}</p>:null}
                                    </Col>

                                </Row>

                                <Row>
                                    <Col xs={3} md={3}>
                                    {Perinfor ? <p>จังหวัดที่เกิด: {Perinfor.จังหวัดที่เกิด}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {Perinfor ? <p>ประเทศที่เกิด: {Perinfor.ประเทศที่เกิด}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {Perinfor ? <p>รหัสไปรษณีย์: {Perinfor.รหัสไปรษณีย์}</p>:null}
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ที่อยู่ปัจจุบัน</h5>

                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                <Row style={{ marginTop: '10px' }}>
                                    <Col xs={6} md={6}>
                                    {AddressNow ?  <p>ที่อยู่: {AddressNow.บ้านเลขที่}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {AddressNow ? <p>ตรอก/ซอย: {AddressNow["ตรอก/ซอย"]}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {AddressNow ? <p>ถนน: {AddressNow.ถนน}</p>:null}
                                    </Col>

                                </Row>
                                <Row>
                                    <Col xs={3} md={3}>
                                    {AddressNow ? <p>ตำบล: {AddressNow.ตำบล}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                       {AddressNow ?  <p>อำเภอ: {AddressNow["อำเภอ/เขต"]}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {AddressNow ? <p>จังหวัด: {AddressNow.จังหวัด}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {AddressNow ? <p>รหัสไปรษณีย์: {AddressNow.รหัสไปรษณีย์}</p>:null}
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ที่อยู่ตามทะเบียนบ้าน</h5>

                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                <Row style={{ marginTop: '10px' }}>
                                    <Col xs={6} md={6}>
                                    {AddressRegis ?  <p>ที่อยู่: {AddressRegis.บ้านเลขที่}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {AddressRegis ? <p>ตรอก/ซอย: {AddressRegis["ตรอก/ซอย"]}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {AddressRegis ? <p>ถนน: {AddressRegis.ถนน}</p>:null}
                                    </Col>

                                </Row>
                                <Row>
                                    <Col xs={3} md={3}>
                                    {AddressRegis ?  <p>ตำบล: {AddressRegis.ตำบล}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {AddressRegis ? <p>อำเภอ: {AddressRegis["อำเภอ/เขต"]}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                        {AddressRegis ? <p>จังหวัด: {AddressRegis.จังหวัด}</p>:null}
                                    </Col>
                                    <Col xs={3} md={3}>
                                       {AddressRegis ?  <p>รหัสไปรษณีย์: {AddressRegis.รหัสไปรษณีย์}</p>:null}
                                    </Col>
                                </Row>
                            </Container>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ประวัติข้อมูลการศึกษา</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {Study != [] ? Study.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '10px' }}>
                                                <p>ระดับการศึกษา: {valuex.ระดับการศึกษา}</p>
                                            </Row>
                                            <Row>
                                                <p>ชื่อวุฒิ: {valuex.ชื่อปริญญา}</p>
                                            </Row>
                                            <Row>
                                                <p>ชื่อสาขา: {valuex.สาขา}</p>
                                            </Row>
                                            {/* <Row>
                <p>วันอนุมัติปริญญา: {valuex.วันอนุมัติปริญญา}</p>
        </Row>
        <Row>
                <p>วันปรับวุฒิการศึกษา: {valuex.วันปรับวุฒิการศึกษา}</p>
        </Row>
        <Row>
                <p>หมายเหตุ: {valuex.หมายเหตุ}</p>
        </Row> */}
                                        </>
                                    )
                                }) : null}
                            </Container>

                        </div>


                    </div>


                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>ข้อมูลตำแหน่งงาน</h5>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>การบรรจุ</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                <Row style={{ marginTop: '20px' }}>
                                {EmploymentOrder ? <p>ประเภทการบรรจุ: {EmploymentOrder.ประเภทการบรรจุ}</p>:null}
                                </Row>

                                <Row>
                                    {EmploymentOrder ? <p>คำสั่งบรรจุ: {EmploymentOrder.คำสั่งบรรจุ}</p>:null}
                                </Row>

                                <Row>
                                    <Col xs={6}>
                                    {EmploymentOrder ? <p>คำสั่งเลขที่: {EmploymentOrder.เลขที่คำสั่ง}</p>:null}
                                    </Col>
                                    <Col xs={6}>
                                        {EmploymentOrder ? <p>คำสั่งลงวันที่: {EmploymentOrder.คำสั่งลงวันที่}</p>:null}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6}>
                                    {EmploymentOrder ? <p>เริ่มจ้าง/บรรจุ เมื่อ: {EmploymentOrder["เริ่มจ้าง/บรรจุ"]}</p>:null}
                                    </Col>
                                    <Col xs={6}>
                                        {EmploymentOrder ? <p>ระดับที่เริ่มจ้าง/บรรจุ: {EmploymentOrder["ระดับที่เริ่มจ้าง/บรรจุ"]}</p>:null}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={6}>
                                    {EmploymentOrder ? <p>รับโอน เมื่อ: {EmploymentOrder.รับโอน}</p>:null}
                                    </Col>
                                    <Col xs={6}>
                                        {EmploymentOrder ? <p>คำสั่งโอนเลขที่: {EmploymentOrder.คำสั่งโอนเลขที่}</p>:null}
                                    </Col>
                                </Row>

                                <Row>
                                    {EmploymentOrder ? <p>ระดับที่โอน: {EmploymentOrder.ระดับที่โอน}</p>:null}
                                </Row>

                                <Row>
                                    {EmploymentOrder ? <p>หมายเหตุของการบรรจุ/แหล่งเงิน:{EmploymentOrder["หมายเหตุของการบรรจุ/แหล่งเงิน"]}</p>:null}
                                </Row>
                            </Container>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ข้อมูลตำแหน่ง</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>

                            <Container>
                                <Row style={{ marginTop: '20px' }}>
                                {Position ? <p>อัตราเลขที่: {Position.อัตราเลขที่}</p>:null}
                                </Row>
                                <Row>
                                    <Col>
                                    {Position ? <p>ตำแหน่ง: {Position.ตำแหน่ง}</p>:null}
                                    </Col>
                                    <Col>
                                        {Position ? <p>ระดับ: {Position.ระดับ}</p>:null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    {Position ? <p>ปฏิบัติงานที่: {Position.ปฏิบัติงานที่}</p>:null}
                                    </Col>
                                    <Col>
                                        {Position ? <p>ภาควิชา/ฝ่าย: {Position["ภาควิชา/ฝ่าย"]}</p>:null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    {Position ? <p>คณะ/สำนัก/สถาบัน: {Position["คณะ/สำนัก/สถาบัน"]}</p>:null}
                                    </Col>
                                    <Col>
                                        {Position ? <p>วิทยาเขต: {Position.วิทยาเขต}</p>:null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    {Position ? <p>เบอร์โทรศัพท์ที่ทำงาน: {Position.เบอร์โทรศัพท์ที่ทำงาน}</p>:null}
                                    </Col>
                                    <Col>
                                        {Position ? <p>เบอร์ต่อ: {Position.เบอร์ต่อ}</p>:null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    {Position ? <p>เบอร์ภายใน: {Position.เบอร์ภายใน}</p>:null}
                                    </Col>
                                    <Col>
                                        {Position ? <p>เบอร์ต่อ: {Position.เบอร์ต่อภายใน}</p>:null}
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                    {Position ? <p>โทรสาร: {Position.โทรสาร}</p>:null}
                                    </Col>
                                    <Col>
                                        {Position ? <p>เบอร์ต่อ: {Position.เบอร์ต่อโทรสาร}</p>:null}
                                    </Col>
                                </Row>
                            </Container>

                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>วุฒิการศึกษาตามอัตรา</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>

                                <Row style={{ marginTop: '20px' }}>
                                {Educational ? <p>วุฒิการศึกษาตามอัตรา: {Educational.วุฒิการศึกษาตามอัตรา}</p>:null}
                                </Row>

                                <Row>
                                    <Col>
                                    {Educational ? <p>วุฒิพิเศษ: {Educational.วุฒิพิเศษ}</p>:null}
                                    </Col>
                                    <Col>
                                        {Educational ? <p>วุฒิสูงสุดที่จบ: {Educational.วุฒิสูงสุดที่จบ}</p>:null}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                    {Educational ? <p>ชื่อปริญญาสูงสุด: {Educational.ชื่อปริญญาสูงสุด}</p>:null}
                                    </Col>
                                    <Col>
                                        {Educational ? <p>ชื่อปริญญาสูงสุด (ย่อ): {Educational["ชื่อปริญญาสูงสุด(ย่อ)"]}</p>:null}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                    {Educational ? <p>ชื่อปริญญาสูงสุด (ภาษาอังกฤษ): {Educational["ชื่อปริญญาสูงสุด(อังกฤษ)"]}</p>:null}
                                    </Col>
                                    <Col>
                                        {Educational ? <p>ชื่อปริญญาสูงสุด (ย่อภาษาอังกฤษ): {Educational["ชื่อปริญญาสูงสุด(ย่ออังกฤษ)"]}</p>:null}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                    {Educational ? <p>ชื่อสาขา: {Educational.ชื่อสาขา}</p>:null}
                                    </Col>
                                    <Col>
                                        {Educational ? <p>ชื่อสาขา (ภาษาอังกฤษ): {Educational["ชื่อสาขา(อังกฤษ)"]}</p>:null}
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                    {Educational ? <p>ชื่อสถานศึกษา: {Educational.ชื่อสถานศึกษา}</p>:null}
                                    </Col>
                                    <Col>
                                        {Educational ? <p>ชื่อสถานศึกษา (ภาษาอังกฤษ): {Educational["ชื่อสถานศึกษา(อังกฤษ)"]}</p>:null}
                                    </Col>
                                </Row>

                                <Row>
                                    {Educational ? <p>ประเทศที่จบ: {Educational.ประเทศที่จบ}</p>:null}
                                </Row>
                            </Container>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>การจ้างต่อ/ขยายเวลาราชการ</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {EmploymentAppoval != [] ? EmploymentAppoval.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>คำสั่งจ้างต่อ: {valuex.คำสั่งจ้างต่อ}</p>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>คำสั่งเลขที่: {valuex.คำสั่งเลขที่}</p>
                                                </Col>
                                                <Col>
                                                    <p>คำสั่งลงวันที่: {valuex.คำสั่งลงวันที่}</p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>เริ่มจ้าง เมื่อ: {valuex.เริ่มจ้าง}</p>
                                                </Col>
                                                <Col>
                                                    <p>สิ้นสุดการจ้าง เมื่อ: {valuex.สิ้นสุดการจ้าง}</p>
                                                </Col>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>
                        </div>

                    </div>

                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>เครื่องราชอิสริยาภรณ์</h5>
                        </div>

                        {/*if repeat start here*/}
                        <div className='borderbox' style={{ marginTop: '20px' }}>

                            <Container>
                                {Insignia != [] ? Insignia.map((valuex, i) => {
                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>วันที่รับพระราชทาน: {valuex.วันที่รับ}</p>
                                            </Row>

                                            <Row>
                                                <p>ชื่อเครื่องราชอิสริยาภรณ์: {valuex.ชื่อเครื่องราชอิสริยาภรณ์}</p>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>ตำแหน่ง: {valuex.ตำแหน่ง}</p>
                                                </Col>
                                                <Col>
                                                    <p>ระดับ: {valuex.ระดับ}</p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <p>วันที่เลื่อนระดับ: {valuex.วันที่เลื่อนระดับ}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>

                        </div>
                        {/*if repeat start here*/}
                    </div>

                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>งานสอนและสาขาที่สนใจ</h5>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ด้านงานสอน</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {Teaching != [] ? Teaching.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>ระดับการสอน: {valuex.ระดับ}</p>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>รหัสรายวิชา: {valuex.รหัสวิชา}</p>
                                                </Col>
                                                {/* <Col>
            <p>ชื่อรายวิชา: {Teaching.ชื่อรายวิชา}</p>
        </Col>  */}
                                            </Row>

                                            <Row>
                                                <p>หมายเหตุ: {valuex.หมายเหตุ}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>สาขาที่เชี่ยวชาญและสนใจ</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {Interested != [] ? Interested.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>ชื่อสาขาที่เขี่ยวชาญและสนใจ: {valuex.idความเชี่ยวชาญ}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>รางวัลที่ได้รับ</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {Reward != [] ? Reward.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>ปีของผลงาน: {valuex.ปี}</p>
                                            </Row>
                                            <Row>
                                                <p>ผลงานรางวัลที่ได้รับ: {valuex.รายละเอียด}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>
                        </div>


                    </div>

                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>ผลงาน</h5>
                        </div>

                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {Performance != [] ? Performance.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>ปีของผลงาน: {valuex.ประเภท}</p>
                                            </Row>

                                            <Row>
                                                <p>ประเภท: {valuex.ปี}</p>
                                            </Row>

                                            <Row>
                                                <p>ชื่อผลงาน: {valuex.รายละเอียด}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>

                        </div>

                    </div>

                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>ประวัติการเลื่อนขั้นเงินเดือน</h5>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ประวัติการเลื่อนขั้นเงินเดือน/ค่าจ้าง/ค่าตอบแทน</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {Salary != [] ? Salary.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>เงินเดือน: {valuex.เงินเดือน}</p>
                                            </Row>

                                            <Row>
                                                <p>วันที่เลื่อนระดับ: {valuex.วันที่เลื่อนขั้น}</p>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>เปอร์เซ็นต์(%): {valuex.ร้อยละ}</p>
                                                </Col>
                                                <Col>
                                                    <p>เงินพิเศษ: {valuex.เงินพิเศษ}</p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <p>หมายเหตุ: {valuex.หมายเหตุ}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>

                        </div>

                    </div>

                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>ตำแหน่งทางการบริหาร</h5>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ตำแหน่งทางการบริหาร</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {Administrative != [] ? Administrative.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>ชื่อตำแหน่ง: {valuex.ชื่อตำแหน่ง}</p>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>วันที่เริ่มดำรงตำแหน่ง: {valuex.วันเริ่มดำรงตำแหน่ง}</p>
                                                </Col>
                                                <Col>
                                                    <p>วันที่สิ้นสุด: {valuex.วันสิ้นสุด}</p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <p>หมายเหตุ: {valuex.หมายเหตุ}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>

                        </div>

                    </div>

                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>ประวัติการขอตำแหน่งทางวิชาการ</h5>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ประวัติการขอตำแหน่งทางวิชาการ</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {PositionAcademicReqHis != [] ? PositionAcademicReqHis.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>ชื่อตำแหน่งที่ขอ: {valuex.ชื่อตำแหน่ง}</p>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>วันที่เริ่มขอ: {valuex.วันที่เริ่มขอ}</p>
                                                </Col>
                                                <Col>
                                                    <p>วันที่ได้รับ: {valuex.วันที่ได้รับ}</p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <p>เงินพิเศษประจำตำแหน่ง: {valuex.เงินพิเศษประจำตำแหน่ง}</p>
                                            </Row>

                                            <Row>
                                                <p>หมายเหตุ: {valuex.หมายเหตุ}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>

                        </div>

                    </div>

                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>ข้อมูลการลาศึกษาต่อ</h5>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ข้อมูลการลาศึกษาต่อ</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {StudyLeave != [] ? StudyLeave.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>ระดับการศึกษาที่ลา: {valuex.ระดับการศึกษาที่ลา}</p>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>วันที่เริ่มศึกษา: {valuex.วันที่เริ่มศึกษา}</p>
                                                </Col>
                                                <Col>
                                                    <p>วันที่คาดว่าจะจบการศึกษา: {valuex.วันที่คาดว่าจะจบการศึกษา}</p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <p>หลักสูตรที่ศึกษา: {valuex.หลักสูตรที่ศึกษา}</p>
                                            </Row>

                                            <Row>
                                                <p>มหาวิทยาลัยที่ศึกษา: {valuex.มหาวิทยาลัยที่ศึกษา}</p>
                                            </Row>

                                            <Row>
                                                <p>ค่าใช้จ่าย: {valuex["ทุน/เงินส่วนตัว"]}</p>
                                            </Row>

                                            <Row>
                                                <p>ประเทศ: {valuex.ประเทศ}</p>
                                            </Row>

                                            <Row>
                                                <p>หมายเหตุ: {valuex.หมายเหตุ}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>

                        </div>

                    </div>

                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>ข้อมูลไปราชการและการอบรม</h5>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ข้อมูลไปราชการและการอบรม</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {Certificate != [] ? Certificate.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>ชื่อกิจกรรมราชการที่ไป: {valuex.ชื่อกิจกรรมราชการที่ไป}</p>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>วันเดินทางไป: {valuex.วันเดินทางไป}</p>
                                                </Col>
                                                <Col>
                                                    <p>วันเดินทางกลับ: {valuex.วันเดินทางกลับ}</p>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <p>งบประมาณ: {valuex.งบประมาณ}</p>
                                            </Row>

                                            <Row>
                                                <p>สถานที่ไป: {valuex.สถานที่ไป}</p>
                                            </Row>

                                            <Row>
                                                <p>หน่วยงานกิจกรรม: {valuex.หน่วยงานกิจกรรม}</p>
                                            </Row>


                                        </>
                                    )
                                }) : null}
                            </Container>
                        </div>

                    </div>

                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>ข้อมูลการลา</h5>
                        </div>

                        <h5 style={{ marginTop: '20px', fontWeight: 'bold' }}>ข้อมูลประวัติการลา</h5>
                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {Leave != [] ? Leave.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>ประเภทการลา: {valuex.ประเภทการลา}</p>
                                            </Row>

                                            <Row>
                                                <p>เหตุผลที่ลา: {valuex.เหตุผลการลา}</p>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <p>วันที่เริ่ม: {valuex.วันที่เริ่ม}</p>
                                                </Col>
                                                <Col>
                                                    <p>วันสิ้นสุด: {valuex.วันที่สิ้นสุด}</p>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <p>หมายเหตุ: {valuex.note}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>

                        </div>

                    </div>

                    {/*   <div className='break'>
  <div className="title">
        <h5 style={{ marginTop:'40px', fontWeight: 'bold'}}>ไฟล์เอกสารประจำตัว</h5>
  </div>

    <div className='borderbox' style={{marginTop:'20px'}}>
    <Container>
    {Module != [] ? Module.map((valuex, i) => {

return (
  <>
    <Row style={{marginTop:'20px'}}>
            <p>ชื่อเรื่องเอกสาร: {valuex.ชื่อเอกสาร}</p>       
    </Row>

    <Row>
            <p>วันที่เก็บ: {valuex.วันที่เก็บ}</p>
    </Row>

    <Row>
            <p>หมายเหตุ: {valuex.หมายเหตุ}</p>
    </Row>
    </>
                  )
                }) : null}
    </Container>
        
    </div>

  </div> */}


                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>แผนพัฒนาบุคคล</h5>
                        </div>

                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                                {Development != [] ? Development.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>จุดเด่น: {valuex.จุดเด่น}</p>
                                            </Row>

                                            <Row>
                                                <p>จุดด้อย: {valuex.จุดด้อย}</p>
                                            </Row>

                                            <Row>
                                                <p>การปรับปรุง: {valuex.การปรับปรุง}</p>
                                            </Row>

                                            <Row>
                                                <p>ระยะเวลา: {valuex.ระยะเวลา}</p>
                                            </Row>

                                            <Row>
                                                <p>ผลลัพธ์: {valuex.ผลลัพธ์}</p>
                                            </Row>
                                            <Row>
                                                <p>หมายเหตุ: {valuex.หมายเหตุ}</p>
                                            </Row>
                                        </>
                                    )
                                }) : null}
                            </Container>

                        </div>

                    </div>

                    <div className='break'>
                        <div className="title">
                            <h5 style={{ marginTop: '40px', fontWeight: 'bold' }}>ข้อมูลอื่นๆ</h5>
                        </div>

                        <div className='borderbox' style={{ marginTop: '20px' }}>
                            <Container>
                             {otherData != [] ? otherData.map((valuex, i) => {

                                    return (
                                        <>
                                            <Row style={{ marginTop: '20px' }}>
                                                <p>หัวข้อ: {valuex.หัวข้อ}</p>
                                            </Row>

                                            <Row>
                                                <p>วัน/เดือน/ปี: {valuex.วันที่}</p>
                                            </Row>
                                            <Row>
                                                <p>รายละเอียด: {valuex.รายละเอียด}</p>
                                            </Row>
                                            
                                        </>
                                    )
                                }) : null}
                            </Container>

                        </div>

                    </div>

                </div>

            </>
                : null}
            <button style={{
                backgroundColor: 'red',
                color: 'White',
                fontWeight: 'bold',
                fontsize: '20px',
                padding: '10px',
                borderRadius: '5px',
                margin: '10px',
                cursor: 'pointer'
            }}
                onClick={handlePrint}>Export to PDF</button>
        </div>
    );

};
export default PDFprint
