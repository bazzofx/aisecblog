
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="980bf367-d794-57e2-be05-cf52ab8118f4")}catch(e){}}();
import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import{Ci as t,Ui as n}from"./root-vendor-Cuz7G2PJ.js";import{n as r,r as i}from"./metaPixel-C5_juuHq.js";var a=e(n(),1);function o(){let e=t(`root`)?.site;return r(e?.viewable_site_version?.settings?.meta_pixel_id||e?.publication?.facebook_pixel)}function s(e,t){let n=o(),r=(0,a.useRef)(t);r.current=t;let s=t!==null;(0,a.useEffect)(()=>{if(!n||!e||!s)return;let t=!1;return i(n,()=>{let e=r.current;!t&&e&&window.fbq&&(t=!0,window.fbq(`trackSingle`,n,`ViewContent`,e))})},[n,e,s])}export{s as t};
//# sourceMappingURL=useMetaViewContent-CEFOg5tV.js.map
//# debugId=980bf367-d794-57e2-be05-cf52ab8118f4
