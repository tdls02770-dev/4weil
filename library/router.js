import { onClickAttribute } from "./attribute_management.js";
import { loader_page } from "./loader-page.js";

function Render(page_code){
    let page = document.getElementById("SPA");
    if (page) page.innerHTML = page_code;
}

export let allElements = null;

// تفريغ الأحداث القديمة بأمان
function clear_events(table){
    if (!table || table.length === 0) return;
    
    table.forEach(({element, type, func}) => {
        const el = typeof element === 'string' ? document.getElementById(element) : element;
        if (el && typeof el.removeEventListener === 'function') {
            el.removeEventListener(type, func);
        }
    });
}

// جدولة الأحداث الجديدة
function events_scheduling(table){
    if (!table) return;
    
    table.forEach(({element, type, func}) => {
        const el = typeof element === 'string' ? document.getElementById(element) : element;
        if (el) {
            el.removeEventListener(type, func); // منع التكرار
            el.addEventListener(type, func);
        }
    });
}

let events_table = [];

export function pushEvent({element, type, func}){
    events_table.push({element, type, func});
}

export function Router(routes) {
    const handle_route = () => {
        loader_page(); 
        
        // 1. مسح الأحداث القديمة فوراً قبل الانتقال
        clear_events(events_table);
        events_table = []; // تصفير المصفوفة هنا مباشرة منعاً لأي تعارض وقت الانتظار
        
        allElements = null; 

        setTimeout(() => {
            const path = window.location.hash || "#/";
            const page = document.getElementById("SPA");
            
            if (!page) return;
            page.classList.remove("fade-in");

            if (routes[path]) {
                // 2. بناء الصفحة الجديدة (هنا المكونات ستضيف أحداثها الجديدة عبر pushEvent)
                let page_code = routes[path]();
                Render(page_code);
                
                allElements = [...page.getElementsByTagName('*')];
                
                onClickAttribute();
                
                // 3. تشغيل الأحداث الجديدة التي تم جمعها أثناء الـ Render
                events_scheduling(events_table);
                
                queueMicrotask(() => {
                    const loaderEl = document.querySelector('.loader');
                    if (loaderEl) loaderEl.remove(); 
                    page.classList.add("fade-in");
                });
            } else {
                Render("<h1>404 | Page Not Found</h1>");
            }
        }, 500);
    }
    
    window.addEventListener("hashchange", handle_route);
    document.readyState === "complete" || document.readyState === "interactive" 
        ? handle_route() 
        : window.addEventListener('DOMContentLoaded', handle_route);
}

export function changePage(hash_url) {
    if (window.location.hash !== hash_url) {
        window.location.hash = hash_url;
    }
}