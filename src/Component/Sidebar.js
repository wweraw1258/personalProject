import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
      <div>
          
    <div
      style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}
    >
        
      <CDBSidebar textColor="#fff" backgroundColor="#464646">
        <div style={{textAlign:'left'}}>
          <CDBSidebarHeader prefix={<img src='https://s359.kapook.com/pagebuilder/a68d7bd1-11bb-4f1c-87ab-fe1e5a1b5648.jpg' style={{width: '45px', height: '45px',borderRadius:'22.5px'}}/>}>        
          <a href="/" className="text-decoration-none" style={{ color: 'inherit'}}>ชื่อ-นามสกุล</a>    
        </CDBSidebarHeader >
        </div>
        

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="lock"><a style={{marginLeft:'5px'}}>กำหนดสิทธิ์การใช้งาน</a></CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/123" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="table"><a style={{marginLeft:'5px'}}>แก้ไขข้อมูลบุคลากร</a></CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/456" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user"><a style={{marginLeft:'5px'}}>จัดการข้อมูลบุคลากร</a></CDBSidebarMenuItem>
            </NavLink>   
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{color: 'inherit' }} >
            <CDBSidebarMenu>
                <NavLink exact to="/profile" activeClassName="activeClicked">
                  <CDBSidebarMenuItem icon="power-off"> <a style={{marginLeft:'5px'}}>ออกจากระบบ</a></CDBSidebarMenuItem>
               </NavLink>   
            </CDBSidebarMenu>
            
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
    </div>
  );
};

export default Sidebar;