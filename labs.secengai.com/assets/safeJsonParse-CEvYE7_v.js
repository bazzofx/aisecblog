
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="c52a753a-e891-5de6-a361-308c720b71e6")}catch(e){}}();
async function e(e){try{return await e.json()}catch(e){if(e instanceof SyntaxError){let t=e.message.toLowerCase();if(t.includes(`<!doctype`)||t.includes(`<html`)||t.includes(`unexpected token '<'`))throw Error(`RefreshPageError`)}throw e}}export{e as t};
//# sourceMappingURL=safeJsonParse-CEvYE7_v.js.map
//# debugId=c52a753a-e891-5de6-a361-308c720b71e6
