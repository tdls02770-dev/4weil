import { State } from "../library/state.js";
import { pushEvent,changePage } from "../library/router.js";
import { onClick } from "../library/Hook.js";
import { 
    title_topnav,title_daycard,title_nightcard,home_btn,tisbih_btn,prayers_btn,
    start_read_btn,start_read_btn1,day_desc,night_desc,SwitchLang
 } from "./translate.js";


export function Home() {
    pushEvent({
        element:"lang",
        type:"change",
        func:SwitchLang
    })
    return `
        <div class="topnav">
            <button class="topnav-btn">
                <img src="src/asst/topnav-icon.jpg" alt="logo" />
            </button>

            <h1>${title_topnav.get()}</h1>

            <label class="ui-switch">
                <input type="checkbox" id="lang">
                <div class="slider">
                    <div class="circle"></div>
                </div>
            </label>
        </div>
        
        <div class="thikr-sun" id="Madhkar-card">
            <div class="headers">
                <img class="sun-img" src="src/asst/sun.png" alt="sun" />
                <h1>${title_daycard.get()}</h1>
            </div>

            <h3>${day_desc.get()}</h3>

            <button ${onClick(()=>{changePage("#/dayadhkar")})} class="start-read-sun-btn">
                <i class="fa-solid fa-sun"></i>
                <h2>${start_read_btn.get()}</h2>
            </button>
        </div>

        <div class="thikr-moon" id="Nadhkar-card">
            <div class="headers">
                <img class="moon-img" src="src/asst/moon.png" alt="moon" />
                <h1 style="color:white;">${title_nightcard.get()}</h1>
            </div>

            <h3 style="color:white;">${night_desc.get()}</h3>

            <button class="start-read-moon-btn" ${onClick(()=>{changePage("#/nightadhkar")})}>
                <i class="fa-solid fa-moon" style="color:#1d3950"></i>
                <h2 style="color:#1d3950">${start_read_btn1.get()}</h2>
            </button>
        </div>
    `;
}
