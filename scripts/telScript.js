import {telgetData} from '../components/telgetData.js';
import { footer } from "../components/footer.js";
import {main_navbaar,NEW_NAVTOP} from "../components/navbaar.js"
let navtopelimet = document.getElementById("top_find_store_div").innerHTML = NEW_NAVTOP();
let navbaarelimet = document.getElementById("navbaar_div");
navbaarelimet.innerHTML = main_navbaar();
let hp13=document.querySelector("#hp13");
hp13.innerHTML="";
hp13.innerHTML=footer();


let product = JSON.parse(localStorage.getItem('product'));

let url = `https://reliance-create.herokuapp.com/${product.productKey}?&id=${product.productId}`


let fetchData = async() =>{
    try {
        let data = await telgetData(url);
          displayProduct(data[0]);
    } catch (error) {
        console.log(error);
    }
}

const displayProduct=(product)=>{
    let imgDiv=document.getElementById("bigImage")
    let imgTag=document.createElement("img")
    imgTag.src=product.imglink;
    imgDiv.append(imgTag)


    let smallImg1 = document.getElementById("threeImages")
    let imgTag1 = document.createElement("img");
    imgTag1.src=product.img1;
    imgTag1.addEventListener('click',()=>{
        imgTag.src = product.img1;
    });

    let imgTag2 = document.createElement("img");
    imgTag2.src=product.img2;
    imgTag2.className = "imgsub";
    imgTag2.addEventListener('click',()=>{
        imgTag.src = product.img2;
    });

    let imgTag3 = document.createElement("img");
    imgTag3.src=product.img3;
    imgTag3.addEventListener('click',()=>{
        imgTag.src = product.img3;
    });
    imgTag3.className = "imgsub";
    smallImg1.append(imgTag1,imgTag2,imgTag3)

    let nameDiv=document.getElementById("productName")
    let nameTag=document.createElement("p")
    nameTag.textContent=product.name;
    nameDiv.append(nameTag)

    document.getElementById("deal").innerText =product.dealpricex;

    document.getElementById("offer").innerText = product.MRPx;

    document.getElementById("mrp").innerText =product.MRPx;
}
let cartBtn=document.getElementById("addToCartDetail")
cartBtn.addEventListener("click",addToCart)
function addToCartarr(product,key){
    let cartProductArr=JSON.parse(localStorage.getItem("Cart"))||[];
      product.productKey  = key
     if(cartProductArr.length!=0){
     let flag="newProduct"
     for(let i=0;i<cartProductArr.length;i++) {
        if(cartProductArr[i].name==product.name){
           cartProductArr[i].itemCount++;
           flag="oldProduct";
            break;
        }
     }
     if(flag=="newProduct"){
        product.itemCount=1
        cartProductArr.push(product)
     }
    }
    else if(cartProductArr.length==0){
     product.itemCount=1
     cartProductArr.push(product)
    }
    localStorage.setItem("Cart",JSON.stringify(cartProductArr));
    location.href="cart.html";
  }
async function addToCart(){
    let url = `https://reliance-create.herokuapp.com/${product.productKey}?&id=${product.productId}`
    let data = await telgetData(url);
     addToCartarr(data[0],product.productKey);
}


// image iteration

let images = document.querySelectorAll(".imgsub");
console.log(images)
for(let i=0; i<images.length; i++){
    images[i].addEventListener("click",function(){
        document.querySelector(".imgsub").src=images[i].src;
    })
}

window.addEventListener('load',fetchData);