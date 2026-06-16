import { Router,changePage,pushEvent } from "../library/router.js";
import { Home } from "./Home.js";
import { DayAdhkar } from "./DayAdhkarPage.js"
import { NightAdhkar} from "./NightAdhkarPage.js"
import { Tisbih } from "./tisbihPage.js"
import { PrayersTime } from "./PrayersPage.js";
import { navbar } from "./layout.js";
import { State } from "../library/state.js";

navbar()

const routes = {
    "#/": Home,
    "#/home": Home,
    "#/dayadhkar": DayAdhkar,
    "#/nightadhkar": NightAdhkar,
    "#/tisbih": Tisbih,
    
    // الحل هنا:
    "#/prayers": function() {
        // 1. استدعاء الدالة لجلب الـ HTML
        PrayersTime().then(html => {
            // 2. ابحث عن حاوية الصفحة في مشروعك (مثلاً عنصر يحمل id="app" أو دالة المسؤول عن العرض)
            const app = document.getElementById("SPA"); 
            if (app) {
                app.innerHTML = html;
            }
        });

        // 3. نرجع نص فارغ مؤقتاً للـ Router حتى لا يطبع [object Promise]
        return ""; 
    },
}

Router(routes);