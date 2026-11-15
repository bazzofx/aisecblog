
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3d5c7408-dd4c-5ba9-9a90-fd719ab8b5de")}catch(e){}}();
import{o as e}from"./rolldown-runtime-BCiCTKAo.js";import{Ui as t,yn as n}from"./root-vendor-Cuz7G2PJ.js";import{t as r}from"./toast-ZrwQjSUv.js";var i=e(t(),1),a=function(e){return e.SUCCESS=`success`,e.ERROR=`error`,e}({}),o=(e,t)=>{(0,i.useEffect)(()=>{if(e){let{status:i,title:a,message:o,id:s}=e,c=`${a?`${a}\n`:``}${o}`,l=n({id:s},e=>e!==void 0);i===`error`?r.error(c,l):(r.success(c,l),t&&t())}},[e])};export{o as n,a as t};
//# sourceMappingURL=useToast-CoSHVlTE.js.map
//# debugId=3d5c7408-dd4c-5ba9-9a90-fd719ab8b5de
