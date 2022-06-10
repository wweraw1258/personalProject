import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { api } from "../../Component/api";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Container, Col, Row, TabContainer } from "react-bootstrap";
import './GuestView.css';
import Swal from "sweetalert2";
import { AuthContext } from "../../App";
const GuestView = () => {

    let navigate = useNavigate();
    const location = useLocation()
    const mouth = [{"Jan":"มกราคม","Feb":"กุมภาพันธ์","Mar":"มีนาคม","Apr":"เมษายน","May":"พฤษภาคม","Jun":"มิถุนายน","Jul":"กรกฎาคม","Aug":"สิงหาคม","Sep":"กันยายน","Oct":"ตุลาคม","Nov":"พฤศจิกายน","Dec":"ธันวาคม"}];
    const [Perinfor, setPerinfor] = useState([]);
    const [Interested, setInterested] = useState([]);
    const [Study, setStudy] = useState([]);
    const [Teaching, setTeaching] = useState([]);
    const [Performance, setPerformance] = useState([]);
    const [Reward, setReward] = useState([]);
    const [Position, setPosition] = useState([]);
    const [Insignia, setInsignia] = useState([]);
    const [Administrative, setAdministrative] = useState([]);
    const [Email2, setEmail2] = useState([]);
    const [stateDownload,setStateDownload] = useState(false)
    let {gmail}  = useParams()


    const getGuest = async () => { 
        try {
           
            var token = await localStorage.getItem("accessToken")
            const res = await axios.post(`${api}/getprofilePublic`, { accesstoken: token, gmail:gmail})  
            console.log(res.data)   
            if (res.data.state == "yes") {
                if(res.data.personal_information.length!=0){
                    setPerinfor(res.data.personal_information)
                    setInterested(res.data.personal_skill)
                    setStudy(res.data.education_his)
                    setTeaching(res.data.teaching)
                    setPerformance(res.data.work)
                    setReward(res.data.reward)
                    setPosition(res.data.position_level[0])
                    setInsignia(res.data.insignia) 
                    setAdministrative(res.data.menagement_position)
                    setEmail2(res.data.personal_information[0].อีเมล.split(","))
                 setStateDownload(true)
                }else{
                    Swal.fire(
                        'เกิดข้อผิดพลาด',
                        'ไม่พบข้อมูลบุคลากร',
                        'error'
                      ).then(()=>{
                          navigate("/")
                      })

                }
                
               

            }else{
                Swal.fire(
                    'เกิดข้อผิดพลาด',
                    'ไม่พบข้อมูลบุคลากร',
                    'error'
                  ).then(()=>{
                    navigate("/")
                })
            }
        } catch (e) {
         
            Swal.fire(
                'เกิดข้อผิดพลาด',
                'ไม่พบข้อมูลบุคลากร',
                'error'
              ).then(()=>{
                navigate("/")
            })
          
        }

    }
    useEffect(() => { 
           getGuest()
    }, [])





    return (



        <div className="boxguest">

        {stateDownload?
    
            <>
                <div className="guestform">

                    <div className="guestimg" style={{ marginTop: '20px' }}>
                    {Perinfor[0].รูปภาพ && Perinfor[0].รูปภาพ != "null"
                                    ?
                                    <img className="imgx" src={`${api}/profile/${Perinfor[0].gmail}/${Perinfor[0].รูปภาพ}`} alt="" />
                                    :
                                    <img className="imgx" src={"https://www.finearts.cmu.ac.th/wp-content/uploads/2021/07/blank-profile-picture-973460_1280-1.png"} alt="" />
                                  }
                    </div>


                    <div className="hilighttext" style={{ marginTop: '20px' }}>
                        <p>{Perinfor[0].คำนำหน้าไทย} {Perinfor[0].ชื่อจริงไทย} {Perinfor[0].นามสกุลไทย}</p>
                        <p>{Perinfor[0].คำนำหน้าอังกฤษ} {Perinfor[0].ชื่อจริงอังกฤษ} {Perinfor[0].นามสกุลอังกฤษ}</p>
                        <p></p>
                    </div>



                </div>

                <div className="guestformv2" style={{ marginTop: '10px' }}>

                    <div className="hilighttext">
                        <p>งานสอนและสาขาที่สนใจ</p>
                    </div>

                    <p style={{ marginLeft: '10px', fontSize: '17px', fontWeight: 'bold' }}>ด้านงานสอน</p>


                    <Container style={{ fontSize: '16px', marginLeft: '10px' }}>
                        {Teaching != [] ? Teaching.map((valuex, i) => {

                            return (
                                <>

                                    <Row style={{ marginTop: '20px' }}>
                                        <p>ระดับการสอน: {valuex.ระดับ} </p>
                                    </Row>

                                    <Row>
                                        <Col>
                                         <p>รหัสรายวิชา: {valuex.รหัสวิชา}</p> 
                                        </Col>
                                        <Col>
                                        <p>ชื่อรายวิชา: {valuex.ชื่อไทย} ({valuex.ชื่ออังกฤษ})</p> 
                                        </Col>
                                    </Row>
                                </>
                            )
                        }) : null}

                    </Container>

                    <p style={{ marginLeft: '10px', fontSize: '17px', fontWeight: 'bold' }}>สาขาที่เชี่ยวชาญและสนใจ</p>
                    <Container style={{ marginLeft: '10px', fontSize: '16px' }}>
                        {Interested != [] ? Interested.map((valuex, i) => {

                            return (
                                <>

                                    <Row style={{ marginTop: '20px' }}>
                                       <p>ชื่อสาขาที่เขี่ยวชาญและสนใจ: {valuex.ชื่อไทย} ({valuex.ชื่ออังกฤษ})</p>
                                    </Row>
                                </>
                            )
                        }) : null}

                    </Container>


                    <div className="hilighttext">
                        <p>ผลงาน</p>
                    </div>
                    <p style={{ marginLeft: '10px', fontSize: '17px', fontWeight: 'bold' }}>ผลงาน</p>
                    <Container style={{ marginLeft: '10px', fontSize: '16px' }}>
                        {Performance != [] ? Performance.map((valuex, i) => {

                            return (
                                <>

                                    <Row style={{ marginTop: '20px' }}>
                                        <p>ประเภท: {valuex.ประเภท}</p>
                                    </Row>
                                    <Row>
                                      <p>ปีของผลงาน: {valuex.ปี}</p>
                                    </Row>
                                    <Row>
                                       <p>ชื่อผลงาน: {valuex.รายละเอียด}</p>
                                    </Row>
                                </>
                            )
                        }) : null}
                    </Container>

                    <p style={{ marginLeft: '10px', fontSize: '17px', fontWeight: 'bold' }}>รางวัล</p>
                    <Container style={{ marginLeft: '10px', fontSize: '16px' }}>
                        {Reward != [] ? Reward.map((valuex, i) => {

                            return (
                                <>
                                    <Row style={{ marginTop: '20px' }}>
                                    <p>ปีของผลงาน: {valuex.ปี}</p> 
                                    </Row>
                                    <Row style={{ marginTop: '20px' }}>
                                   <p>ผลงานรางวัลที่ได้รับ: {valuex.รายละเอียด}</p>
                                    </Row>
                                </>
                            )
                        }) : null}
                    </Container>
                </div>

                <div className="guestformv2" style={{ marginTop: '10px' }}>

                    <div className="hilighttext">
                        <p>ประวัติข้อมูลการศึกษา</p>
                    </div>
                    <Container style={{ marginLeft: '10px', fontSize: '16px' }}>
                        {Study != [] ? Study.map((valuex, i) => {

                            return (
                                <>
                                    <Row style={{ marginTop: '20px' }}>
                                        <Col>
                                         <p>ระดับการศึกษา: {valuex.ระดับการศึกษา}</p> 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                         <p>ชื่อวุฒิ: {valuex.ชื่อปริญญา}</p> 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                       <p>ชื่อสาขา: {valuex.สาขา}</p>
                                        </Col>
                                    </Row>
                                </>
                            )
                        }) : null}

                    </Container>


                </div>

                <div className="guestformv2" style={{ marginTop: '10px' }}>
                    <div className="hilighttext">
                        <p>ข้อมูลตำแหน่ง</p>
                    </div>
                    <p style={{ marginLeft: '10px', fontSize: '17px', fontWeight: 'bold' }}>ตำแหน่ง</p>
                    <Container style={{ marginLeft: '10px', fontSize: '16px' }}>

                        <Row style={{ marginTop: '20px' }}>
                        { Position ? <p>อัตราเลขที่: {Position.อัตราเลขที่}</p> : null }
                        </Row>
                        <Row>
                            <Col>
                            { Position ? <p>ตำแหน่ง: {Position.ตำแหน่ง}</p> : null }
                            </Col>
                            <Col>
                            { Position ? <p>ระดับ: {Position.ระดับ}</p> : null }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            { Position ? <p>ปฏิบัติงานที่: {Position.ปฏิบัติงานที่}</p> : null }
                            </Col>
                            <Col>
                            { Position ? <p>ภาควิชา/ฝ่าย: {Position["ภาควิชา/ฝ่าย"]}</p> : null } 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            { Position ? <p>คณะ/สำนัก/สถาบัน: {Position["คณะ/สำนัก/สถาบัน"]}</p> : null } 
                            </Col>
                            <Col>
                            { Position ? <p>วิทยาเขต: {Position.วิทยาเขต}</p> : null } 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            { Position ? <p>เบอร์โทรศัพท์ที่ทำงาน: {Position.เบอร์โทรศัพท์ที่ทำงาน}</p> : null } 
                            </Col>
                            <Col>
                            { Position ? <p>เบอร์ต่อ: {Position.เบอร์ต่อ}</p> : null } 
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            { Position ? <p>เบอร์ภายใน: {Position.เบอร์ภายใน}</p> : null }
                            </Col>
                            <Col>
                            { Position ? <p>เบอร์ต่อ: {Position.เบอร์ต่อภายใน}</p> : null }
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                            { Position ? <p>โทรสาร: {Position.โทรสาร}</p> : null }
                            </Col>
                        </Row>
                        <Row>
                        { Position ?    
                        <>
                        <p>E-mail: </p>
                            {Email2 != [] ? Email2.map((valuex, i) => {

                                return (
                                    <>
                                        <p >{Email2.gmail}</p>
                                    </>
                                )
                            }) : null}
                            </>
                            : null }
                        </Row>
                    </Container>
                    <p style={{ marginLeft: '10px', fontSize: '17px', fontWeight: 'bold' }}>ตำแหน่งบริหาร</p>
                    <Container style={{ marginLeft: '10px', fontSize: '16px' }}>
                        {Administrative != [] ? Administrative.map((valuex, i) => {

                            return (
                                <>
                                    <Row style={{ marginTop: '20px' }}>
                                       <p>ชื่อตำแหน่ง: {valuex.ชื่อตำแหน่ง}</p> 
                                    </Row>

                                    <Row>
                                        <Col>
                                        <p>วันที่เริ่มดำรงตำแหน่ง: {valuex.วันเริ่มดำรงตำแหน่ง.split(" ")[0]}  {mouth[0][valuex.วันเริ่มดำรงตำแหน่ง.split(" ")[1]]} {parseInt(valuex.วันเริ่มดำรงตำแหน่ง.split(" ")[2])+543}</p> 
                                        </Col>
                                        <Col>
                                        <p>วันที่สิ้นสุด: {valuex.วันสิ้นสุด.split(" ")[0]}  {mouth[0][valuex.วันสิ้นสุด.split(" ")[1]]} {parseInt(valuex.วันสิ้นสุด.split(" ")[2])+543}</p> 
                                        </Col>
                                    </Row>
                                </>
                            )
                        }) : null}
                    </Container>

                </div>

                <div className="guestformv2" style={{ marginTop: '10px' }}>

                    <div className="hilighttext">
                        <p>เครื่องราชอิสริยาภรณ์</p>
                    </div>
                    <Container style={{ marginLeft: '10px', fontSize: '16px' }}>
                        {Insignia != [] ? Insignia.map((valuex, i) => {
                            return (
                                <>
                                    <Row style={{ marginTop: '20px' }}>
                                    <p>วันที่รับพระราชทาน: {valuex.วันที่รับ.split(" ")[0]}  {mouth[0][valuex.วันที่รับ.split(" ")[1]]} {parseInt(valuex.วันที่รับ.split(" ")[2])+543}</p> 
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
                                   <p>วันที่เลื่อนระดับ: {valuex.วันที่เลื่อนระดับ.split(" ")[0]}  {mouth[0][valuex.วันที่เลื่อนระดับ.split(" ")[1]]} {parseInt(valuex.วันที่เลื่อนระดับ.split(" ")[2])+543}</p> 
                                    </Row>
                                </>
                            )
                        }) : null}
                    </Container>
                </div>

            </>
            :
            null}



    </div>
    )

}
export default GuestView
