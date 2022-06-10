import axios from "axios";
import React from "react";
import { api } from "./api";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'

const Combo = ({ status,gmail }) => {
  let navigate = useNavigate();
  var stateName = ["user", "hr", "none"]
async function change(event){
  const token = localStorage.getItem("accessToken")

if(event.target.value=="user"){
  var newStatus = 2
}else if(event.target.value=="hr"){
  var newStatus = 3
}else{
  var newStatus = 1
}
try{
const res = await axios.post(`${api}/admin/changeStatus`,{accesstoken:token,Status:event.target.value,gmail:gmail})

   if(res.data.state=="yes"){
    Swal.fire({
      icon: 'success',
      title: 'เรียบร้อย',
      timer: 1500
  }).then(() => {
    window.location.reload(false);
  })

   }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'เกิดข้อผิดพลาด',

  })
   }
   
  }

catch(e){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'เกิดข้อผิดพลาด',

})
}
 }

  return (
    <div>
      <select id="selectBox" class="form-select form-select-sm" aria-label=".form-select-sm example" style={{ width: '150px' }} onChange={change} >
     


        {stateName.map((valuex, i) => {


          if (valuex != status) {
            return (
              <>
                {
                  <option value={valuex}>{valuex}</option>}

              </>
            )

          } else {
            return (
              <option selected value={valuex}>{status}</option>
            )

          }
        })}

      </select>
    </div>
  )
}
export default Combo