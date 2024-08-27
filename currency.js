const BASE_URL ="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024.3.2/v1/currencies";


const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
const msg1=document.querySelector(".msg1");

for(let select of dropdowns){
    for(let currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected="selected";
        }
        else if(select.name === "to" && currCode==="INR"){
            newOption.selected="selected";

        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    });
}

const changeFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newPath=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newPath;
};

const updateExchangeRates=async ()=>{
    let amount= document.querySelector(".amount input");
    let amVal=amount.value;
    if(amVal==="" ||amVal<1){
        amount.value="1";
        amVal=1;
    }

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response= await fetch(URL); 
    let data=await response.json();
    let rate=data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    
    let finalAmount=amVal*rate;
    msg.innerText=`1 ${fromCurr.value} = ${rate} ${toCurr.value}`;
    msg1.innerText =`${amVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

};
btn.addEventListener("click",(evt)=>{
    evt.preventDefault();//no by default work will done by from its default behaivour is paused
    updateExchangeRates();
})

window.addEventListener("load",()=>{
    updateExchangeRates();
})