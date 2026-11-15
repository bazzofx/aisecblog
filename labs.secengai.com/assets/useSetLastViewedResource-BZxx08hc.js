
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="6f48a50a-2457-59ed-84ef-1ef8978c978c")}catch(e){}}();
import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import{Mi as t,Ni as n,Oi as r,Ui as i}from"./root-vendor-Cuz7G2PJ.js";var a=e(i(),1),o=({guid:e,setCookie:i,cookiesSet:o,skip:s=!1})=>{let[c,l]=r(),u=t(),d=n(),f=c.get(`last_resource_guid`)||e,p=u.hash!==``,m=c.toString();(0,a.useEffect)(()=>{if(!s&&o&&f){if(i({name:`last_resource_guid`,value:f,days:1}),c.delete(`last_resource_guid`),p){let e=new URLSearchParams(c),t=`${u.pathname}?${e.toString()}${u.hash}`;d(t,{replace:!0,state:{}})}else m!==c.toString()&&l(c,{replace:!0,preventScrollReset:!0})}},[o,f,s])};export{o as t};
//# sourceMappingURL=useSetLastViewedResource-BZxx08hc.js.map
//# debugId=6f48a50a-2457-59ed-84ef-1ef8978c978c
