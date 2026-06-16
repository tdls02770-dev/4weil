import { getNightAdhkar } from "./AdhkarJson.js";
import { State } from "../library/state.js";
import { onClick } from "../library/Hook.js";

export function NightAdhkar() {
    return `
        <div class="night-adhkar">
            ${getNightAdhkar().map(item => {
                const count = State(item.count)
                return`
                <div class="adhkar-night">
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