import { State } from "../library/state.js";
import { onClick } from "../library/Hook.js";
import { auto } from "./translate.js"

export function Tisbih(){
    const counter = State(0);
    const add = ()=>{
        counter.set(counter.value() + 1)
    }
    const auto_clicker = ()=>{
        setInterval(()=>{
            if(counter.value() == 100){
                alert("100")
            }
            add()
            
        },1500)
    }
    return`
    <div class="page1">
        <div class="tisbih">
            <button class="main_btn" ${onClick(add)}>
                ${counter.get()}
            </button>
            <button class="auto-btn" ${onClick(()=>{auto_clicker()})}>${auto.get()}</button>
        </div>
    </div>
    `
}