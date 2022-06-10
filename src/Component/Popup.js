import React from "react";
import '../Pages/InfoPopup.js'

function Popup(props) {
    return(props.trigger) ?(
        <div style="popup">
            <div className="popup-inner">
                <button className="close-btn" onClick={()=> props.setTrigger(false)} >ปิด</button>
                { props.children }
            </div>
        </div>
    ) : "";
}
export default Popup
