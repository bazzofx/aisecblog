
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="08d9144b-48cb-5216-a286-14cb011e75a9")}catch(e){}}();
function e({eventStartsAt:e,eventEndsAt:t,status:n}){if(n===`ended`||n===`cancelled`)return!1;if(n===`live`)return!0;if(!e)return!1;let r=Date.now(),i=new Date(e).getTime(),a=t?new Date(t).getTime():i+144e5;return r>=i-6e5&&r<=a}function t({eventStartsAt:e,status:t}){return t===`ended`||t===`cancelled`||t===`live`||!e?!1:Date.now()<new Date(e).getTime()-6e5}function n({eventEndsAt:e,status:t}){return t===`ended`||t===`cancelled`?!0:e?Date.now()>new Date(e).getTime():!1}export{n,e as r,t};
//# sourceMappingURL=isWebinarJoinable--uPyT2_8.js.map
//# debugId=08d9144b-48cb-5216-a286-14cb011e75a9
