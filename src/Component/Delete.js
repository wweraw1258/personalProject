import React from "react";
import {useState} from 'react';
import Popup from "./Popup";
import * as ImIcons from 'react-icons/im';
import Swal from "sweetalert2";
import axios from "axios";
import { api } from "./api";

const Delete =({gmail})=>{
    const [buttonPopup, setButtonPopup] = useState(false);
    const [buttonPopup2, setButtonPopup2] = useState(false);
    const Deletefunc = async()=>{
        const token = localStorage.getItem("accessToken")
        try{
        const res = await axios.post(`${api}/admin/deleteUser`,{accesstoken:token,gmail:gmail})
        if(res.data.state=="yes"){
            
            Swal.fire(
                'เรียบร้อย!',
                'ข้อมูลถูกลบเรียบร้อยแล้ว.',
                'success'
              ).then(()=>{window.location.reload();})
            
        }
        else{
           
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'เกิดข้อผิดพลาด',
               
              })

        }

    }catch(e){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'เกิดข้อผิดพลาด',
           
          })
    }
    }
    return(
        <div>
            <main>
                 <i onClick={()=> Swal.fire({
  title: 'แน่ใจ?',
  text: "คุณจะไม่สามารถกู้คืนข้อมูลได้!",
  icon: 'warning',
  showCancelButton: true,
  confirmButtonColor: '#3085d6',
  cancelButtonColor: '#d33',
  confirmButtonText: 'ใช่, ฉันต้องการลบ!'
}).then((result) => {

  if (result.isConfirmed) {
    Deletefunc()
  } 
})} variant="secondary"  className="coloricon3">
                <ImIcons.ImBin/></i>
            </main>
            {/* <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                <h3 className="bbb"><img src="https://images.vexels.com/media/users/3/223479/isolated/preview/8ecc75c9d0cf6d942cce96e196d4953f-trash-bin-icon-flat.png" className="icon"/>
                <h3 className="bbb">คุณต้องการจะลบข้อมูลใช่หรือไม่?</h3>
                <button onClick={()=> setButtonPopup2(true)} class="btn btn-success"> ตกลง </button>
                <button onClick={()=> setButtonPopup2(false)} class="btn btn-danger"> ยกเลิก </button>
                </h3>
            </Popup>
            <Popup trigger={buttonPopup2} setTrigger={setButtonPopup2}>
                <h3 className="bbb"><img src="https://images.vexels.com/media/users/3/223479/isolated/preview/8ecc75c9d0cf6d942cce96e196d4953f-trash-bin-icon-flat.png" className="icon"/>
                <h3 className="bbb">ลบข้อมูลเรียบร้อยแล้ว</h3>
                </h3>
        </Popup> */}

        </div>
    )
}
export default Delete