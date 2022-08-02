import {navtop,main_navbaar} from "../components/navbaar.js"
let navtopelimet = document.getElementById("top_find_store_div").innerHTML = navtop();
let navbaarelimet = document.getElementById("navbaar_div");
navbaarelimet.innerHTML = main_navbaar();
//signup eliment
let registerEliment = document.getElementById("mainregisteration_div");
let register_first_nameEliment = document.getElementById("register_first_name");
let register_last_nameEliment = document.getElementById("register_last_name");
let register_email_eliment = document.getElementById("register_email");
let register_mobile_elimet = document.getElementById("register_mobile");
let signupotp_div = document.querySelector(".signupotp")
let register_otp_elimet = document.getElementById("register_otp");
let sighnupOtpSubmitButton_eliment = document.getElementById("sighnupOtpSubmitButton");
let signupotpsned_registerEliment = document.getElementById("signupotpsned");
let register_city_nameEliment = document.getElementById("register_city_name");

//login eliment
let input_numberElement = document.getElementById("login_signup_input_number");
let login_diveEliment = document.getElementById("mainsighun_llogindiv");
let login_otp_elimet = document.getElementById("login_otp_button_div_input");
let login_otp_submit_btn = document.getElementById("login_otp_button_div");
let check_login_availble_button_elimet = document.getElementById("check_login_availble_button");
//api url

document.getElementById("register_pincode").style.display = "none"
let url = `http://localhost:3000/profile`

const getData = async()=>{
    try {
       let res = await fetch(url);
       let data = await res.json(); 
       return data;
    } catch (error) {
        console.log(error);
    }
}



//login all function
const matchOtp = (number,obj)=>{
let userOtpInput = login_otp_elimet.value;
if(number==userOtpInput){
    alert("login succsessfull")
    localStorage.setItem("usersData",JSON.stringify(obj));
}
else{
    alert("wrong otp");
}
}
const goto_otp_verification = (ele)=>{
   let ran_number = Math.floor(Math.random()*9999)+1000;
   alert(ran_number);
   login_otp_elimet.style.display = "block"
   login_otp_submit_btn.style.display = "block"
   input_numberElement.style.display = "none"
   check_login_availble_button_elimet.style.display = "none"
   matchOtp(ran_number,ele);
}
// register user functions
const postData_toserver = async(obj)=>{

   try {
     let res = await fetch(url,{
        method:"POST",
        body:JSON.stringify(obj),
        headers:{'content-type': 'application/json',}
     })
     alert("signup succesfull");
     localStorage.setItem("usersData",JSON.stringify(obj));
   } catch (error) {
    console.log(error)
   }
}
const match_otp_both = (obj,ran_number)=>{
    let userOtp = register_otp_elimet.value;
    if(ran_number==userOtp){
       postData_toserver(obj);
    }else{
        alert("wrong otp Enterd")
    }
}
const Go_otp_varification = (obj)=>{
    let ran_number = Math.floor(Math.random()*9999)+1000;
    alert(`Your otp is : ${ran_number}`);
    signupotp_div.style.display = "block";
    sighnupOtpSubmitButton_eliment.style.display = "block"
    signupotpsned_registerEliment.style.display = "none";
    register_otp_elimet.style.display = "block"
    sighnupOtpSubmitButton_eliment.addEventListener("click",()=>{
        match_otp_both(obj,ran_number);
    })
}
const getData_and_saveToserver = (number)=>{
   let name = `${register_first_nameEliment.value} ${register_last_nameEliment}`
   let email = register_email_eliment.value;
   let city = register_city_nameEliment.value;
   if(name!=""&&email!=""){
     let obj = {
        name:name,
        email:email,
        mobile:number,
        city:city,
        order:[]
     }
     Go_otp_varification(obj);
   }
   else{
    alert("Fill All details First");
   }
}
const Go_to_register_page = (number)=>{
    registerEliment.style.display = "block";
    login_diveEliment.style.display = "none"
    register_mobile_elimet.value = number;
    signupotpsned_registerEliment.addEventListener("click",()=>{
        getData_and_saveToserver(number);
    })
}
const checkDatabase = (number,dataarr)=>{
    let check = true;
    dataarr.forEach((element) => {
        if(element.mobile==number){
            check = false;
            goto_otp_verification(element);
        }
    });
    if(check==true){
        Go_to_register_page(number);
    }
    
}
const checkToLoginServer = async()=>{
    try {
        let input_number = input_numberElement.value;
        if(input_number.length==10){
            let data = await getData();
            checkDatabase(input_number,data);
        }else{
            alert("wrong mobile number")
        }
    } catch (error) {
        console.log(error);
    }
}
check_login_availble_button_elimet.addEventListener("click",checkToLoginServer)