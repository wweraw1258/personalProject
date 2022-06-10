import React, { useState } from "react";


const Test = () => {
    const [a, seta] = useState(false)



    return (
        <>
            <select onChange={(event) => {
                if (event.target.value == 1) {
                    seta(true)
                }else{
                    seta(false)
                }
            }}>
                <option selected value={0}>เลือกหัวข้อ...</option>
                <option value={1}>อื่น</option>
            </select>
            {a==true?<div>
                <input type={"text"}
                 placeholder="อื่นๆ">
                
                </input>
            </div>:null}
        </>
      

    )
}

export default Test