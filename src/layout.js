import { Layout_Design } from "../library/layout-design.js";
import { onClick } from "../library/Hook.js";
import { changePage } from "../library/router.js";
import { State } from "../library/state.js";
import { home_btn,prayers_btn,tisbih_btn } from "./translate.js";

export function navbar(){
    return(
        `
        <button class="btn" ${onClick(()=>{changePage("#/")})}>
            <div class="icon-wrapper">
                <i class="fa-solid fa-house" style="color: rgb(255, 255, 255); font-size:1.8rem"></i>
            </div>
            <span class="btn-text">${home_btn.get()}</span>
        </button>
        <button class="btn" ${onClick(()=>{changePage("#/tisbih")})}>
            <div class="icon-wrapper">
                <img class="tisbih-icon" src="src/asst/tisbih.jpg"/>
            </div>
            <span class="btn-text">${tisbih_btn.get()}</span>
        </button>
        <button class="btn" ${onClick(()=>{changePage("#/prayers")})}>
            <div class="icon-wrapper">
                <img class="prayer-icon" src="src/asst/PrayerIcon.png"/>
            </div>
            <span class="btn-text">${prayers_btn.get()}</span>
        </button>
        `
    )
}

const layout = Layout_Design("DownNavBar");
layout.Style(
    `
    display: flex;
    justify-content: space-around;
    align-items: flex-end; /* لضمان محاذاة الأزرار من الأسفل */
    background: #060c30;
    width: 100%;
    height: 80px; /* تحديد ارتفاع مناسب للشريط بالكامل */
    padding-bottom: 10px;
    box-sizing: border-box;
    direction: rtl;
    `
);
layout.Set(navbar)