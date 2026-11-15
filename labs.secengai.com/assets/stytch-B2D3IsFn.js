
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="136d105b-5fb6-5ce9-ace7-26664e70149f")}catch(e){}}();
import{t as e}from"./utils-CjUr88hv.js";var t=()=>{let t=e();return!!t&&t.VITE_STYTCH_DEVICE_FINGERPRINTING_ENABLED===`true`},n=async()=>{if(!t())return;let n=e(),r=n.VITE_STYTCH_PUBLIC_TOKEN;if(!r||typeof window.GetTelemetryID!=`function`)return;let i=n.VITE_STYTCH_SUBMIT_URL;try{return await window.GetTelemetryID(i?{publicToken:r,submitURL:i}:{publicToken:r})}catch{return}};export{t as n,n as t};
//# sourceMappingURL=stytch-B2D3IsFn.js.map
//# debugId=136d105b-5fb6-5ce9-ace7-26664e70149f
