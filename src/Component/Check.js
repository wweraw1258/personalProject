import React from "react";
import axios from "axios";
import { api } from "./api";
const Check = ({status,gmail}) => {
 
  if(status==1){
    var nameStatus ="เปิด"
    var none = "ปิด"
  }else {
    var nameStatus ="ปิด"
    var none = "เปิด"
  }


  async function change(event){

    const token = localStorage.getItem("accessToken")
    if(event.target.value=="เปิด"){
      var newStatus = 1
    }else {
      var newStatus = 0}
    
    try{
      const res = await axios.post(`${api}/admin/changeShow` ,{accesstoken:token,gmail:gmail,showpublic:newStatus})
         alert(res.data.state)  
        }
        catch(e){
          alert("เกิดข้อผิดพลาด")
        }
  }
  
  

 

  




    return(
        <div>
          <select class="form-select form-select-sm" aria-label=".form-select-sm example" style={{width:'150px'}} onChange={change}>
             <option selected value={nameStatus}>{nameStatus}</option>
             <option value={none}>{none}</option>
            
          </select>
        </div>
    )
}

export default Check