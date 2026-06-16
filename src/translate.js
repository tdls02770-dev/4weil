import { State } from "../library/state.js";

export const title_topnav = State("أذكار الصباح والمساء");
export const title_daycard = State("أذكار الصباح")
export const title_nightcard = State("أذكار المساء")

export const home_btn = State("الرئيسي")
export const tisbih_btn = State("تسبيح")
export const prayers_btn = State("الصلوات")

export const start_read_btn = State("ابدأ القراءة")
export const start_read_btn1 = State("ابدأ القراءة")

export const day_desc = State("6:15 AM • ابدأ يومك ببركة")
export const night_desc = State("6:30 PM • اختم يومك بسكينة")
export const auto = State("تلقائيا")

export const fajr = State("الفجر")
export const Dhuhr = State("الظهر")
export const Asr = State("العصر")
export const Maghrib = State("المغرب")
export const Isha = State("العشاء")

export const timeleft = State("المتبقي على صلاة ")
export function lang() {
    return new Promise((resolve) => {
        // 1. تحقق إذا كان العنصر موجوداً بالفعل من البداية
        const input = document.getElementById("lang");
        if (input) {
            const value = input.checked ? "EN" : "AR";
            resolve(value);
            return;
        }

        // 2. إذا لم يكن موجوداً، نراقب الصفحة حتى يظهر
        const observer = new MutationObserver((mutations, obs) => {
            const targetInput = document.getElementById("lang");
            if (targetInput) {
                const value = targetInput.checked ? "EN" : "AR";
                obs.disconnect(); // أوقف المراقبة بعد إيجاد العنصر
                resolve(value);   // أرجع القيمة
            }
        });

        // ابدأ مراقبة كامل الصفحة (body) بحثاً عن التغييرات
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}
export function SwitchLang(){
    var input = document.getElementById("lang");
    var value = input.checked ? "EN" : "AR"
    if(value == "EN"){
        document.getElementById("Madhkar-card").style.direction = "ltr"
        document.getElementById("Nadhkar-card").style.direction = "ltr"
        fajr.set("Fajr")
        Dhuhr.set("Dhuhr")
        Asr.set("Asr")
        Maghrib.set("Maghrib")
        Isha.set("Isha")
        timeleft.set("The rest is up to prayer")
        title_topnav.set("Day & Night Adhkar")
        title_daycard.set("Day Adhkar")
        title_nightcard.set("Night Adhkar")
        auto.set("auto")

        home_btn.set("Home")
        prayers_btn.set("Prayers")
        tisbih_btn.set("Tisbih")
        start_read_btn.set("Start Read")
        start_read_btn1.set("Start Read")
        day_desc.set("Start your day with blessings • 6:15")
        night_desc.set("End your day with blessings • 6:30")
    }else if(value == "AR"){
        document.getElementById("Madhkar-card").style.direction = "rtl"
        document.getElementById("Nadhkar-card").style.direction = "rtl"
        document.getElementById("prayer-card").style.direction = "rtl"
        title_topnav.reset()
        title_daycard.reset()
        title_nightcard.reset()

        home_btn.reset()
        prayers_btn.reset()
        tisbih_btn.reset()
        start_read_btn.reset()
        start_read_btn1.reset()
        day_desc.reset()
        night_desc.reset()
        auto.reset()
        fajr.reset()
        Dhuhr.reset()
        Asr.reset()
        Maghrib.reset()
        Isha.reset()
        timeleft.reset()
    }
}
