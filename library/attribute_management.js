import { pushEvent } from "./router.js";

window.AppEvents = new Map(); 

export function onClickAttribute() {
    const elements = document.querySelectorAll("[on-click]");
    
    elements.forEach(element => {
        const eventId = element.getAttribute("on-click");
        const realFunction = window.AppEvents.get(eventId);
        
        if (realFunction) {
            pushEvent({
                element: element,
                type: "click",
                func: realFunction
            });
        }
    });
}

export function getElementByAttr(attr, attrValue) {
    return new Promise((resolve) => {
        const cleanValue = attrValue.includes('=') ? attrValue.split('=')[1] : attrValue;

        const findElement = () => {
            const els = document.querySelectorAll("[" + attr + "]");
            const foundElement = Array.from(els).find(el => el.getAttribute(attr) === cleanValue);
            resolve(foundElement || null); 
        };

        if (document.readyState === "loading") {
            window.addEventListener('DOMContentLoaded', findElement);
        } else {
            findElement();
        }
    });
}