
!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e5be80a4-bad4-591c-87a3-974ef6e76922")}catch(e){}}();
var e=(e,{url:t,publication:n})=>{let r=[e.twitter_handle?`https://x.com/${e.twitter_handle}`:null,e.facebook_url,e.instagram_url,e.linkedin_url,e.tiktok_url,e.youtube_url,e.discord_url,e.bluesky_url,e.threads_url].filter(e=>!!e);return{"@type":`Person`,name:e.name||``,url:t||void 0,description:e.bio||void 0,image:e.profile_picture?.url?{"@type":`ImageObject`,contentUrl:e.profile_picture.url,thumbnailUrl:e.profile_picture.thumb?.url}:void 0,sameAs:r.length?r:void 0,worksFor:n?.name?{"@type":`Organization`,name:n.name,url:n.url||void 0}:void 0}};export{e as t};
//# sourceMappingURL=getPersonSchema-CEshrChK.js.map
//# debugId=e5be80a4-bad4-591c-87a3-974ef6e76922
