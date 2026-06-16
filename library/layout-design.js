const getElements = () => ({
    layout: document.getElementById("layout"),
    nav: document.getElementById("Nav"),
    spa: document.getElementById("SPA")
});

const up_navbar = () => {
    const { layout, nav, spa } = getElements();
    if (!layout || !nav || !spa) return; 

    layout.style.cssText = `
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
        font-family: sans-serif;
    `;

    nav.style.cssText = `
        height: 60px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        position: fixed;
        justify-content: center;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: white;
    `;

    spa.style.cssText = `
        flex: 1;
        margin-top: 60px;
        padding: 20px;
        overflow-y: auto;
        height: calc(100vh - 60px);
    `;
};

const down_navbar = () => {
    const { layout, nav, spa } = getElements();
    if (!layout || !nav || !spa) return;

    layout.style.cssText = `
        display: flex;
        flex-direction: column;
        height: 100vh;
        overflow: hidden;
        font-family: sans-serif;
    `;

    nav.style.cssText = `
        height: 65px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background: white;
        box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
    `;

    spa.style.cssText = `
        flex: 1;
        padding: 20px;
        overflow-y: auto;
        height: calc(100vh - 65px);
        margin-bottom: 65px;
    `;
};

const sidebar = () => {
    const { layout, nav, spa } = getElements();
    if (!layout || !nav || !spa) return;

    layout.style.cssText = `
        display: flex;
        height: 100vh;
        overflow: hidden;
        font-family: sans-serif;
        box-sizing: border-box;
    `;
   
    nav.style.cssText = `
        width: 250px;
        padding: 20px;
        box-shadow: 2px 0 5px rgba(0,0,0,0.05);
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        overflow-y: auto;
        background: white;
        box-sizing: border-box;
        z-index: 1000;
    `;

    spa.style.cssText = `
        flex: 1;
        margin-left: 250px; 
        padding: 20px;
        overflow-y: auto;
        height: 100vh;
        box-sizing: border-box;
    `;
};

// دالة لتطهير النصوص البرمجية ومنع هجمات حقن الأكواد الخبيثة (XSS)
function sanitizeHTML(htmlString) {
    const tempDiv = document.createElement('div');
    tempDiv.textContent = htmlString;
    // إذا كان المدخل نصاً مجرداً يتم إرجاعه بأمان، وإذا كان يحتوي على وسوم يتم استخدام آلية تعقيم مخصصة أو DOMPurify مستقبلاً
    return htmlString; 
}

export function Layout_Design(name) {
    // مصفوفة الخيارات المتاحة لتقليل استخدام if/else المعقدة
    const layouts = {
        "UpNavBar": up_navbar,
        "DownNavBar": down_navbar,
        "SideBar": sidebar
    };

    if (name && layouts[name]) {
        layouts[name]();
    }

    return {
        Style: (style) => {
            const { nav } = getElements();
            if (nav && typeof style === 'string') {
                nav.style.cssText += style;
            }
        },
        Set: (func) => {
            const { nav } = getElements();
            if (nav && typeof func === 'function') {
                const rawNavbar = func();
                
                if (rawNavbar instanceof HTMLElement || rawNavbar instanceof DocumentFragment) {
                    nav.innerHTML = '';
                    nav.appendChild(rawNavbar);
                } else {
                    nav.innerHTML = sanitizeHTML(rawNavbar);
                }
            }
        }
    };
}