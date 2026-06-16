import { getMorningAdhkar } from "./AdhkarJson.js";
import { State } from "../library/state.js";
import { onClick } from "../library/Hook.js";

export function DayAdhkar() {
    return `
        <div class="morning-adhkar">
            ${getMorningAdhkar().map(item => {
                const count = State(item.count)
                return`
                <div class="adhkar-morning">
                    <p>${item.content}</p>
                    <button ${onClick(()=>{
                        if(count.value() == " - "){
                            return ;
                        }else{
                            var now = Number(count.value()) - 1
                            if(now <= 0){
                                count.set(" - ")
                                return ;
                            }else{
                                count.set(now)
                            }
                        }
                    })}>${count.get()}</button>
                </div>
            `}).join("")}
        </div>
    `;
}