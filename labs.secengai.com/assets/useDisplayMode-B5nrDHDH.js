
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="4342b702-c321-5c1f-87d9-28c92e216ddc")}catch(e){}}();
import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import{Ui as t}from"./root-vendor-Cuz7G2PJ.js";var n=e(t(),1);function r(){let[e,t]=(0,n.useState)(`browser tab`),r=()=>{window.matchMedia(`(display-mode: standalone)`).matches&&t(`standalone`)};return(0,n.useEffect)(()=>(e!==`standalone`&&window.matchMedia(`(display-mode: standalone)`).matches&&t(`standalone`),window.addEventListener(`DOMContentLoaded`,r),()=>{window.removeEventListener(`DOMContentLoaded`,r)}),[e]),e}export{r as t};
//# sourceMappingURL=useDisplayMode-B5nrDHDH.js.map
//# debugId=4342b702-c321-5c1f-87d9-28c92e216ddc
