import { getElementByAttr } from "./attribute_management.js";
import { loader_page } from "./loader-page.js";
const states_table = [];

async function state_machine(uid, update) {
    const waitForElement = () => {
        return new Promise((resolve) => {
            const checkExist = setInterval(async () => {
                const el = await getElementByAttr("state", uid);
                if (el) {
                    clearInterval(checkExist);
                    resolve(el); 
                }
            }, 20)
        });
    };

    const el = await waitForElement();

    if (Array.isArray(update)) {
        el.innerHTML = update.map(task => `<li>${String(task).trim()}</li>`).join('');
    } else {
        el.textContent = update;
    }
}


async function find_element(uid) {

    await new Promise(resolve => setTimeout(resolve, 0));

    return [...document.querySelectorAll("*")]
        .find(el =>
            el.children.length === 0 &&
            el.textContent.trim() === uid
        );
}

export function State(default_value) {
    let value = default_value;
    
    const uid = crypto.randomUUID();
    states_table.push(uid);
    
    return {
        get: () => {
            queueMicrotask(async () => {
                const element = await find_element(uid);
                if (element) {
                    element.setAttribute("state", uid);
                    if (Array.isArray(default_value)) {
                        element.innerHTML = default_value.map(el => `<li>${String(el).trim()}</li>`).join('');
                    } else {
                        element.innerHTML = default_value;
                    }
                    
                }
            }); 
            
            return uid; 
        },
        value: () => { return value; },
        set: (new_value) => {
            value = new_value;
            state_machine(uid, value); 
        },
        reset: ()=>{
            state_machine(uid,default_value)
        }
    };
}