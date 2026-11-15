
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e46d430a-5e4e-54af-a4a4-5f9c2ca6c22e")}catch(e){}}();
import{Pn as e}from"./root-vendor-Cuz7G2PJ.js";function t(t,n=0,r={}){typeof r!=`object`&&(r={});let{leading:i=!1,trailing:a=!0,maxWait:o}=r,s=[,,];i&&(s[0]=`leading`),a&&(s[1]=`trailing`);let c,l=null,u=e(function(...e){c=t.apply(this,e),l=null},n,{edges:s}),d=function(...e){return o!=null&&(l===null&&(l=Date.now()),Date.now()-l>=o)?(c=t.apply(this,e),l=Date.now(),u.cancel(),u.schedule(),c):(u.apply(this,e),c)};return d.cancel=u.cancel,d.flush=()=>(u.flush(),c),d}export{t};
//# sourceMappingURL=debounce-C3Skh1sV.js.map
//# debugId=e46d430a-5e4e-54af-a4a4-5f9c2ca6c22e
