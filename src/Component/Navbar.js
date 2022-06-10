import React from "react";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as FiIcons from "react-icons/fi";
import { Button } from 'reactstrap';
import "./Navbar.css"
import { BrowserRouter as Router, Routes, Route, } from "react-router-dom";

const Navbar = () => {
    return(
        <div>
           <input type="checkbox" id="check"/>
           
            <div className="navbar">
               <label for="check">
                   <i class="fas fa-bars" id="sidebar_btn"></i>
               </label>
                <a>
                   <img src="https://sps.kps.ku.ac.th/t/images/PIC-LOGO/logo.png" className="img"/>
                   <a className="text">ระบบบริหารงานข้อมูลบุคลากร</a>
                   </a>
                   <Button outline color="danger" ><AiIcons.AiOutlinePoweroff/></Button>{' '}
            </div>

            <div className="mobile_nav">
               <input type="checkbox" id="check2"/>
                <div className="nav_bar">
                    <img src="https://www.perfectcompanion.com/wp-content/uploads/2020/10/image1.jpg" class="mobile_profile_img" alt=""/>
                    <label for="check2">
                        <i class="fa fa-bars nav_btn"></i>
                    </label>
                </div>
                <div className="mobile_nav_items">
                    <a href="/"><i><AiIcons.AiFillLock/></i> <samp>การกำหนดสิทธิ์การใช้งาน</samp></a>
                    <a href="/123"><i><AiIcons.AiFillDatabase/></i> <samp>กรอกข้อมูลเพิ่มเติม</samp></a>
                    <a href="/456"><i><AiIcons.AiFillEdit/></i> <samp>แก้ไขข้อมูลบุคลากร</samp></a>
                    <a href="/789"><i><AiIcons.AiFillDelete/></i> <samp>จัดการข้อมูลบุคลากร</samp></a>
                </div>
            </div>

            <div className="sidebar">
                <div className="profile_info">
                        <img src="https://www.perfectcompanion.com/wp-content/uploads/2020/10/image1.jpg" class="profile" alt=""/>
                        <h4>Wannaporn PAN</h4>
                        <h5>Wannaporn.pan@ku.th</h5>
                </div>
                <div>
                    <a href="/"><i><AiIcons.AiFillLock/></i> <samp>การกำหนดสิทธิ์การใช้งาน</samp></a>
                    <a href="/123"><i><AiIcons.AiFillDatabase/></i> <samp>กรอกข้อมูลเพิ่มเติม</samp></a>
                    <a href="/456"><i><AiIcons.AiFillEdit/></i> <samp>แก้ไขข้อมูลบุคลากร</samp></a>
                    <a href="/789"><i><AiIcons.AiFillDelete/></i> <samp>จัดการข้อมูลบุคลากร</samp></a>
                </div>
            </div>
            <div className="content">
            <Routes>
            
             </Routes>
            </div>
        </div>
    )
}
export default Navbar