export function onClick(func) {
    const id = crypto.randomUUID();
    window.AppEvents.set(id, func);
    return `on-click="${id}"`; 
}

export function SnapShoot_Input(id){
    return{
        get:()=>{return document.getElementById(id).value},
        set:(update)=>{document.getElementById(id).value = update},
    }
}