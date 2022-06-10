

const Logout =()=>{
    const token = localStorage.getItem("accesstoken")
    alert(token)
    if(token){
        localStorage.clear("accesstoken")
    }
    
}

export default Logout