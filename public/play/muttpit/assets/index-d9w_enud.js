(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();function B(t){let e=2166136261;for(let n=0;n<t.length;n++)e^=t.charCodeAt(n),e=Math.imul(e,16777619)>>>0;return e>>>0}function A(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let n=e;return n=Math.imul(n^n>>>15,n|1),n^=n+Math.imul(n^n>>>7,n|61),((n^n>>>14)>>>0)/4294967296}}function v(t,e){return Math.floor(t()*e)}function Le(t){return v(t,3)-1}const C={mongrel:{id:"mongrel",name:"Mongrel",blurb:"Ninety percent street, ten percent something else.",base:{grit:13,fang:5,flea:4},trait:"Scrappy — first hit each bout deals 2 less."},bonehound:{id:"bonehound",name:"Bonehound",blurb:"Already died once. Filed a complaint.",base:{grit:12,fang:6,flea:3},trait:"Undead — starts each bout with SHIELD 3."},grem:{id:"grem",name:"Grem",blurb:"Small, loud, legally a hazard.",base:{grit:9,fang:5,flea:4},trait:"Volatile — +2 FANG while below half GRIT."},cur:{id:"cur",name:"Cur",blurb:"Bites first, negotiates never.",base:{grit:12,fang:4,flea:4},trait:"Bleeder — its attacks apply BLEED 1."},brute:{id:"brute",name:"Brute",blurb:"Solves problems by becoming a larger problem.",base:{grit:19,fang:7,flea:3},trait:"Heavy — takes 2 less from barrage tricks."},pupp:{id:"pupp",name:"Pupp",blurb:"Fast enough to regret everything later.",base:{grit:9,fang:5,flea:7},trait:"Quick — acts first on any tick tie."}};function m(t,e,n,s,r,a=[]){return{id:t,name:e,text:n,target:s,effects:r,tags:a}}const $={snap:m("snap","Snap","Front enemy takes FANG damage.","enemyFront",[{kind:"damage",power:0,fromFang:!0}]),maul:m("maul","Maul","Front enemy takes FANG + 2.","enemyFront",[{kind:"damage",power:2,fromFang:!0}]),backbite:m("backbite","Back Bite","Back enemy takes FANG - 1.","enemyBack",[{kind:"damage",power:-1,fromFang:!0}]),flurry:m("flurry","Flurry","Front enemy takes two hits of FANG - 2.","enemyFront",[{kind:"damage",power:-2,fromFang:!0},{kind:"damage",power:-2,fromFang:!0}]),fleabite:m("fleabite","Flea Bite","Front enemy takes 1 and gains BLEED 2.","enemyFront",[{kind:"damage",power:1},{kind:"apply",power:2,status:"bleed"}]),tickharvest:m("tickharvest","Tick Harvest","Front enemy takes FANG + 2 per BLEED on it.","enemyFront",[{kind:"damage",power:0,fromFang:!0},{kind:"damage",power:2,perBleedOnTarget:!0}],["blood"]),bonecrack:m("bonecrack","Bone Crack","Front enemy takes FANG and gains MARKED 1.","enemyFront",[{kind:"damage",power:0,fromFang:!0},{kind:"apply",power:1,status:"marked"}]),spite:m("spite","Spite","Front enemy takes FANG + half your missing GRIT.","enemyFront",[{kind:"damage",power:0,fromFang:!0,perOwnMissingGrit:!0}],["spite"]),howl:m("howl","Howl","All allies gain RAGE 1.","allAllies",[{kind:"apply",power:1,status:"rage"}],["pack"]),cower:m("cower","Cower","Gain SHIELD 3.","self",[{kind:"shield",power:3}]),boneshield:m("boneshield","Bone Shield","Lowest-GRIT ally gains SHIELD 4.","allyLow",[{kind:"shield",power:4}]),secondwind:m("secondwind","Second Wind","Heal 5.","self",[{kind:"heal",power:5}],["blood"]),lickwounds:m("lickwounds","Lick Wounds","Lowest-GRIT ally heals 4.","allyLow",[{kind:"heal",power:4}],["blood"]),whiffle:m("whiffle","Whiffle Barrage","All enemies take 3.","allEnemies",[{kind:"damageAll",power:3}],["barrage"]),packpounce:m("packpounce","Pack Pounce","Front enemy takes FANG + 2 per other living ally.","enemyFront",[{kind:"damage",power:0,fromFang:!0,perOtherAlly:!0}],["pack"]),playdead:m("playdead","Play Dead","Gain DODGE 1.","self",[{kind:"apply",power:1,status:"dodge"}]),countersnarl:m("countersnarl","Counter Snarl","Gain SHIELD 2 and RAGE 1.","self",[{kind:"shield",power:2},{kind:"apply",power:1,status:"rage"}]),mudtoss:m("mudtoss","Mud Toss","Front enemy gains MARKED 2.","enemyFront",[{kind:"apply",power:2,status:"marked"}]),goad:m("goad","Goad","Front enemy gains RAGE 2 and COWER 2.","enemyFront",[{kind:"apply",power:2,status:"rage"},{kind:"apply",power:2,status:"cower"}]),shriek:m("shriek","Shriek","All enemies gain BLEED 1.","allEnemies",[{kind:"apply",power:1,status:"bleed"}],["barrage","blood"]),marrow:m("marrow","Marrow","Heal 3 and gain RAGE 1.","self",[{kind:"heal",power:3},{kind:"apply",power:1,status:"rage"}],["blood"]),sic:m("sic","Sic 'Em","Front enemy takes FANG + 1, +2 more if bleeding.","enemyFront",[{kind:"damage",power:1,fromFang:!0},{kind:"damage",power:2,perBleedOnTarget:!0}],["blood"]),rally:m("rally","Rally","All allies gain SHIELD 2.","allAllies",[{kind:"shield",power:2}],["pack"]),verdict:m("verdict","The Pit Decides","Front enemy takes FANG + 3; gain COWER 1.","enemyFront",[{kind:"damage",power:3,fromFang:!0},{kind:"apply",power:1,status:"cower"}]),goForTheEyes:m("goForTheEyes","Go For The Eyes","Front enemy takes 2 and gains COWER 1.","enemyFront",[{kind:"damage",power:2},{kind:"apply",power:1,status:"cower"}])},Ne=Object.keys($),se=4,H=3,ae=60;function Oe(...t){return B(t.join("|"))}const oe=["#b4532a","#8a6f4e","#e8dcc4","#5c4632","#6b705c","#a3a388","#c98a4b","#7a5c3e"];function Ie(t){return{mongrel:"MNG",bonehound:"BNH",grem:"GRM",cur:"CUR",brute:"BRT",pupp:"PUP"}[t]}function X(t,e=120){const n=Oe(t.name,t.strain,t.biteOrder.join(","),t.scars.length),s=oe[Math.abs(n)%oe.length],r=Math.abs(n>>3)%3,a=Math.abs(n>>6)%3,o=Math.abs(n>>9)%3,l=18+Math.abs(n>>12)%10,d=r===0?`<path d="M30 42 L38 12 L52 38 Z" fill="${s}" stroke="#120c08" stroke-width="3"/>
         <path d="M90 42 L82 12 L68 38 Z" fill="${s}" stroke="#120c08" stroke-width="3"/>`:r===1?`<path d="M28 40 Q12 20 24 58 Q34 52 34 42 Z" fill="${s}" stroke="#120c08" stroke-width="3"/>
           <path d="M92 40 Q108 20 96 58 Q86 52 86 42 Z" fill="${s}" stroke="#120c08" stroke-width="3"/>`:`<path d="M32 44 L28 18 L52 34 Z" fill="${s}" stroke="#120c08" stroke-width="3"/>
           <path d="M88 44 L92 18 L68 34 Z" fill="${s}" stroke="#120c08" stroke-width="3"/>`,h=o===0?`<circle cx="46" cy="56" r="5" fill="#e8dcc4" stroke="#120c08" stroke-width="2"/><circle cx="74" cy="56" r="5" fill="#e8dcc4" stroke="#120c08" stroke-width="2"/>
         <circle cx="47" cy="57" r="2" fill="#120c08"/><circle cx="75" cy="57" r="2" fill="#120c08"/>`:o===1?`<circle cx="46" cy="56" r="5" fill="#f5b83d" stroke="#120c08" stroke-width="2"/><circle cx="74" cy="56" r="5" fill="#f5b83d" stroke="#120c08" stroke-width="2"/>
           <circle cx="46" cy="56" r="2" fill="#120c08"/><circle cx="74" cy="56" r="2" fill="#120c08"/>`:`<path d="M40 54 L52 52" stroke="#120c08" stroke-width="4"/><path d="M68 52 L80 54" stroke="#120c08" stroke-width="4"/>
           <circle cx="46" cy="58" r="3" fill="#120c08"/><circle cx="74" cy="58" r="3" fill="#120c08"/>`,g=a===0?`<path d="M96 88 Q118 70 112 46" fill="none" stroke="${s}" stroke-width="9" stroke-linecap="round"/>`:a===1?`<path d="M96 88 Q112 82 118 92" fill="none" stroke="${s}" stroke-width="9" stroke-linecap="round"/>`:`<path d="M96 88 L114 58 L108 84 Z" fill="${s}" stroke="#120c08" stroke-width="3"/>`,F=t.scars.slice(0,4).map((T,p)=>`<path d="M${34+p*14} ${86+p%2*6} l8 8 M${42+p*14} ${86+p%2*6} l-8 8" stroke="#e5484d" stroke-width="2.5" stroke-linecap="round"/>`).join("");return`<svg class="portrait" viewBox="0 0 130 120" width="${e}" height="${e*120/130}" xmlns="http://www.w3.org/2000/svg">
  <rect width="130" height="120" fill="#1c1410"/>
  ${g}
  <ellipse cx="65" cy="92" rx="38" ry="22" fill="${s}" stroke="#120c08" stroke-width="3"/>
  ${d}
  <circle cx="65" cy="58" r="30" fill="${s}" stroke="#120c08" stroke-width="3"/>
  ${h}
  <ellipse cx="65" cy="74" rx="${l/2}" ry="10" fill="#e8dcc4" stroke="#120c08" stroke-width="3"/>
  <ellipse cx="65" cy="68" rx="6" ry="4.5" fill="#120c08"/>
  <path d="M58 80 Q65 86 72 80" fill="none" stroke="#120c08" stroke-width="2.5" stroke-linecap="round"/>
  ${F}
  <rect x="2" y="2" width="34" height="15" fill="#120c08"/>
  <text x="6" y="13" font-family="monospace" font-size="10" fill="#f5b83d">${Ie(t.strain)}</text>
</svg>`}function Re(t="#f5b83d",e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-3px">
  <circle cx="10" cy="13" r="5" fill="${t}" stroke="#120c08" stroke-width="1.5"/>
  <circle cx="4" cy="7" r="2.4" fill="${t}" stroke="#120c08" stroke-width="1.2"/>
  <circle cx="9" cy="4.5" r="2.4" fill="${t}" stroke="#120c08" stroke-width="1.2"/>
  <circle cx="14.5" cy="6" r="2.4" fill="${t}" stroke="#120c08" stroke-width="1.2"/>
</svg>`}function ye(t){const e=C[t.strain].base;let n=e.grit+t.grit,s=e.fang+t.fang,r=e.flea+t.flea;for(const a of t.scars)n+=a.dGrit,s+=a.dFang,r+=a.dFlea;return{grit:Math.max(4,n),fang:Math.max(1,s),flea:Math.max(1,r)}}function re(t,e,n){const s=ye(t),r={bleed:0,shield:0,rage:0,cower:0,marked:0,dodge:0};return{dog:t,team:e,slot:n,hp:s.grit,maxHp:s.grit,fang:s.fang,flea:s.flea,statuses:r,trickIdx:0,scrappyUsed:!1,alive:!0}}function ie(t){const e=t.filter(n=>n.alive);return e.sort((n,s)=>n.slot-s.slot),e[0]}function Ge(t){const e=t.filter(n=>n.alive);return e.sort((n,s)=>s.slot-n.slot),e[0]}function He(t){const e=t.filter(n=>n.alive);if(e.length!==0)return e.sort((n,s)=>n.hp-s.hp||n.slot-s.slot),e[0]}function N(t){return t.filter(e=>e.alive).length}function je(t){const e={};for(const n of t.fighters)e[`${n.team}:${n.dog.name}`]=Math.max(0,n.hp);return e}function y(t,e,n,s={}){t.events.push({round:t.round,kind:e,text:n,hp:je(t),...s})}function De(t){const e=t.dog.strain==="grem"&&t.hp<t.maxHp/2?2:0;return t.fang+e+t.statuses.rage}function le(t,e,n,s,r={}){if(!n.alive)return;if(n.statuses.dodge>0){n.statuses.dodge-=1,y(t,"status",`${n.dog.name} plays dead — the hit whiffs.`,{actor:e?.dog.name,target:n.dog.name});return}let a=s;if(e&&(a+=e.statuses.rage-e.statuses.cower),e&&e.dog.strain==="mongrel"&&!n.scrappyUsed&&(n.scrappyUsed=!0,a-=2,y(t,"status",`${n.dog.name} is scrappy — shrugs 2 off its first hit.`,{actor:e.dog.name,target:n.dog.name})),r.barrage&&n.dog.strain==="brute"&&(a-=2,y(t,"status",`${n.dog.name} is heavy — shrugs 2 off the barrage.`,{actor:e?.dog.name,target:n.dog.name})),a+=n.statuses.marked,a+=Le(t.rng),a<0&&(a=0),n.statuses.shield>0){const o=Math.min(n.statuses.shield,a);n.statuses.shield-=o,a-=o,o>0&&y(t,"status",`${n.dog.name}'s shield eats ${o}.`,{actor:e?.dog.name,target:n.dog.name})}a>0&&(n.hp-=a,y(t,"hit",`${n.dog.name} takes ${a}.`,{actor:e?.dog.name,target:n.dog.name}),n.hp<=0&&(n.hp=0,n.alive=!1,y(t,"death",`${n.dog.name} goes down.`,{actor:e?.dog.name,target:n.dog.name})))}function j(t,e,n,s){const r=t.fighters.filter(o=>o.team!==e.team),a=t.fighters.filter(o=>o.team===e.team);switch(s.kind){case"damage":{if(!n)return;let o=s.power+(s.fromFang?De(e):0);s.perBleedOnTarget&&(o+=s.power*(n.statuses.bleed||0)),s.perOtherAlly&&(o+=s.power*a.filter(l=>l.alive&&l!==e).length*2),s.perOwnMissingGrit&&(o+=Math.floor((e.maxHp-e.hp)/2)),e.dog.strain==="cur"&&(n.statuses.bleed+=1,y(t,"status",`${n.dog.name} starts bleeding.`,{actor:e.dog.name,target:n.dog.name})),le(t,e,n,o);break}case"damageAll":{for(const o of r)o.alive&&le(t,e,o,s.power,{barrage:!0});break}case"heal":{const o=n??e;if(!o.alive)return;o.hp=Math.min(o.maxHp,o.hp+s.power),y(t,"heal",`${o.dog.name} recovers ${s.power}.`,{actor:e.dog.name,target:o.dog.name});break}case"shield":{const o=n??e;if(!o.alive)return;o.statuses.shield+=s.power,y(t,"status",`${o.dog.name} gains SHIELD ${s.power}.`,{actor:e.dog.name,target:o.dog.name});break}case"apply":{if(s.status===void 0||!n||!n.alive)return;n.statuses[s.status]+=s.power,y(t,"status",`${n.dog.name} gains ${s.status.toUpperCase()} ${s.power}.`,{actor:e.dog.name,target:n.dog.name});break}}}function Ke(t,e,n){const s=n[e.team===0?1:0],r=n[e.team],a=e.dog.biteOrder,o=a.length>0?a[e.trickIdx%a.length]:"snap";e.trickIdx+=1;const l=$[o]??$.snap;y(t,"trick",`${e.dog.name} plays ${l.name}.`,{actor:e.dog.name});let d;switch(l.target){case"enemyFront":d=ie(s);break;case"enemyBack":d=Ge(s);break;case"enemyAny":d=ie(s);break;case"allEnemies":d=void 0;break;case"self":d=e;break;case"allyLow":d=He(r)??e;break;case"allAllies":d=void 0;break}for(const h of l.effects)if(l.target==="allEnemies"&&(h.kind==="damageAll"||h.kind==="apply"))if(h.kind==="damageAll")j(t,e,void 0,h);else for(const g of s)g.alive&&j(t,e,g,h);else if(l.target==="allAllies")for(const g of r)g.alive&&j(t,e,g,h);else j(t,e,d,h)}function We(t,e){if(e.statuses.bleed>0){const n=e.statuses.bleed;e.hp-=n,y(t,"hit",`${e.dog.name} bleeds for ${n}.`,{actor:e.dog.name,target:e.dog.name}),e.hp<=0&&(e.hp=0,e.alive=!1,y(t,"death",`${e.dog.name} bleeds out.`,{target:e.dog.name}))}}function ee(t,e,n){const s=t.slice(0,H),r=e.slice(0,H),a=[...s.map((p,f)=>re(p,0,f)),...r.map((p,f)=>re(p,1,f))],o=[a.slice(0,s.length),a.slice(s.length)],l={fighters:a,events:[],rng:A(n>>>0),round:0};y(l,"start","The Pit locks the gate. Bout starts.",{actor:void 0});for(const p of a)p.dog.strain==="bonehound"&&(p.statuses.shield+=3,y(l,"status",`${p.dog.name} rattles to life with SHIELD 3.`,{actor:p.dog.name,target:p.dog.name}));for(;l.round<ae;){l.round+=1;const p=a.filter(k=>k.alive).sort((k,S)=>S.flea-k.flea||(k.dog.strain==="pupp"?-1:0)-(S.dog.strain==="pupp"?-1:0)||k.slot-S.slot||(k.team===0?-1:1));for(const k of p){if(!k.alive||(We(l,k),!k.alive))continue;Ke(l,k,o);const S=N(o[0]),M=N(o[1]);if(S===0||M===0)break}const f=N(o[0]),b=N(o[1]);if(f===0||b===0)break}let d=-1;const h=N(o[0]),g=N(o[1]);if(h>0&&g===0)d=0;else if(g>0&&h===0)d=1;else if(l.round>=ae){const p=k=>k.reduce((S,M)=>S+M.hp/Math.max(1,M.maxHp),0),f=p(o[0]),b=p(o[1]);d=f>b?0:b>f?1:-1,y(l,"end",`The Pit runs out of patience — judges' decision: ${d===-1?"draw":d===0?"team A":"team B"}.`)}y(l,"end",d===0?"Team A takes the bout.":d===1?"Team B takes the bout.":"The bout is a draw.");const F=[o[0].reduce((p,f)=>p+Math.max(0,f.hp),0),o[1].reduce((p,f)=>p+Math.max(0,f.hp),0)],T=a.filter(p=>p.alive).map(p=>({team:p.team,name:p.dog.name,hp:p.hp,maxHp:p.maxHp}));return{winner:d,rounds:l.round,events:l.events,logHash:_e(l.events),survivorHp:F,survivors:T}}function _e(t){const e=t.map(s=>`${s.round}|${s.kind}|${s.actor??""}|${s.target??""}|${s.text}`).join(`
`);let n=2166136261;for(let s=0;s<e.length;s++)n^=e.charCodeAt(s),n=Math.imul(n,16777619)>>>0;return n.toString(16).padStart(8,"0")}function we(t){const e=[];t.length===0&&e.push("kennel is empty"),t.length>se&&e.push(`kennel exceeds ${se} dogs`);const n=new Set;for(const s of t){n.has(s.id)&&e.push(`duplicate dog id ${s.id}`),n.add(s.id),s.strain in C||e.push(`unknown strain ${s.strain}`);for(const a of s.biteOrder)a in $||e.push(`unknown trick ${a}`);s.biteOrder.length===0&&e.push(`${s.name} has an empty bite order`),ye(s).grit<4&&e.push(`${s.name} has no grit left`)}return{ok:e.length===0,errors:e}}const O="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";function Qe(t){let e="";for(let n=0;n<t.length;n+=3){const s=t[n],r=n+1<t.length?t[n+1]:void 0,a=n+2<t.length?t[n+2]:void 0;if(e+=O[s>>2],e+=O[(s&3)<<4|(r??0)>>4],r===void 0||(e+=O[(r&15)<<2|(a??0)>>6],a===void 0))break;e+=O[a&63]}return e}function Ue(t){const e=t.replace(/[^A-Za-z0-9\-_]/g,""),n=new Map;for(let r=0;r<O.length;r++)n.set(O[r],r);const s=[];for(let r=0;r<e.length;r+=4){const a=n.get(e[r])??0,o=n.get(e[r+1])??0,l=r+2<e.length?n.get(e[r+2]):void 0,d=r+3<e.length?n.get(e[r+3]):void 0;if(s.push(a<<2|o>>4),l===void 0||(s.push((o&15)<<4|l>>2),d===void 0))break;s.push((l&3)<<6|d)}return s}function $e(t){const e=[];for(let n=0;n<t.length;n++){let s=t.charCodeAt(n);s<128?e.push(s):s<2048?e.push(192|s>>6,128|s&63):e.push(224|s>>12,128|s>>6&63,128|s&63)}return Qe(e)}function Se(t){const e=Ue(t);let n="";for(let s=0;s<e.length;s++){const r=e[s];r<128?n+=String.fromCharCode(r):r<224?n+=String.fromCharCode((r&31)<<6|e[++s]&63):n+=String.fromCharCode((r&15)<<12|(e[++s]&63)<<6|e[++s]&63)}return n}function xe(t){return`${t}.${B(t).toString(16)}`}function Fe(t){const e=t.lastIndexOf(".");if(e<0)return{ok:!1,payload:""};const n=t.slice(0,e),s=t.slice(e+1);return{ok:B(n).toString(16)===s,payload:n}}function R(t){const e=we(t.dogs);if(!e.ok)throw new Error(`refusing to encode invalid kennel: ${e.errors.join("; ")}`);return $e(xe(JSON.stringify(t)))}function z(t){try{const{ok:e,payload:n}=Fe(Se(t.trim()));if(!e)return{ok:!1,error:"checksum failed — the Pit does not accept tampered codes"};const s=JSON.parse(n);if(s.v!==1)return{ok:!1,error:"unknown code version"};const r=we(s.dogs);return r.ok?{ok:!0,kennel:s}:{ok:!1,error:r.errors.join("; ")}}catch{return{ok:!1,error:"not a kennel code"}}}function Ze(t,e,n){return B(`${t}|${e}|${n}`)}function Ee(t,e,n){const s=R(t),r=R(e),a=Ze(s,r,n),o=ee(t.dogs,e.dogs,a),l=`${t.name} vs ${e.name}: ${o.winner===-1?"draw":o.winner===0?t.name:e.name} in ${o.rounds} rounds (${o.logHash})`,d={v:1,seed:a,a:s,b:r,winner:o.winner,rounds:o.rounds,logHash:o.logHash,summary:l};return{result:o,packet:d,codeA:s,codeB:r}}function Me(t){return $e(xe(JSON.stringify(t)))}function Ve(t){try{const{ok:e,payload:n}=Fe(Se(t.trim()));if(!e)return{ok:!1,error:"checksum failed — forged verdicts smell like that"};const s=JSON.parse(n);return s.v!==1?{ok:!1,error:"unknown packet version"}:{ok:!0,packet:s}}catch{return{ok:!1,error:"not a verdict packet"}}}function Je(t){const e=Ve(t);if(!e.ok||!e.packet)return{ok:!1,error:e.error};const n=e.packet,s=z(n.a),r=z(n.b);if(!s.ok||!s.kennel||!r.ok||!r.kennel)return{ok:!1,error:"packet references a kennel that will not decode"};const a=ee(s.kennel.dogs,r.kennel.dogs,n.seed);return a.logHash!==n.logHash?{ok:!1,error:`replay hash mismatch: claimed ${n.logHash}, replayed ${a.logHash}`,replayedHash:a.logHash}:a.winner!==n.winner?{ok:!1,error:"replayed winner disagrees with the packet"}:{ok:!0,verdict:n,replayedHash:a.logHash}}const ce=["aggressive","defensive","trickster","pack","feral"],ze={aggressive:["maul","snap","flurry","verdict","sic","packpounce","goForTheEyes"],defensive:["cower","boneshield","rally","countersnarl","lickwounds","secondwind","snap"],trickster:["mudtoss","goad","goForTheEyes","fleabite","tickharvest","shriek","playdead"],pack:["howl","packpounce","rally","lickwounds","snap","shriek"],feral:["spite","marrow","backbite","fleabite","sic","maul"]},qe={aggressive:{grit:1,fang:6,flea:3},defensive:{grit:6,fang:2,flea:2},trickster:{grit:2,fang:3,flea:5},pack:{grit:3,fang:4,flea:3},feral:{grit:5,fang:4,flea:1}},Ye=["mongrel","bonehound","grem","cur","brute","pupp"],Xe=["Gnash","Rip","Snarl","Vex","Mange","Brut","Cinder","Howl","Gore","Rust","Bolt","Wheeze","Knuckle","Saint","Doctor","Comrade"],et=["tooth","muzzle","leg","hound","cur","terrier","jaws","paws","tail","barker","bucket","widow","junior","the-third"],de=["The Rust Yard","Sewer Saints","Gnash Estate","The Whiffle Club","Bucket Kennels","The Bone Trust","Widow's Mange","The Scrap Choir","Saint Gnash's Home","Comrade Cur's Pack"],ue=["Bite first. File later.","We keep the receipts.","Loyalty is a muzzle made of paperwork.","Every dog has its day in court.","Lose small. Scar big.","The Pit decides.","Chewed up, spit out, promoted.","We came for the scrap and stayed for spite."];function P(t,e){return e[v(t,e.length)]}function tt(t,e,n,s){const r=P(t,Ye),a=qe[e],l=(8+Math.round(n*4)+(s===0?2:0))/10,d=ze[e],h=2+v(t,3),g=[];for(;g.length<h;){const F=v(t,3)===0?P(t,Ne):P(t,d);g.includes(F)||g.push(F)}return{id:`ghost-${e}-${s}-${v(t,1<<20)}`,name:`${P(t,Xe)} ${P(t,et)}`,strain:r,grit:Math.round(a.grit*l),fang:Math.round(a.fang*l),flea:Math.round(a.flea*l),biteOrder:g,scars:[]}}function nt(t,e){const n=A((t^e*2654435761)>>>0),s=ce[v(n,ce.length)],r=.25+n()*.6,a=3+v(n,2),o=[];for(let l=0;l<a;l++)o.push(tt(n,s,r,l));return{id:`ghost-${e}-${t.toString(16)}`,name:P(n,de),motto:P(n,ue),personality:s,skill:r,kennel:{v:1,name:P(n,de),motto:P(n,ue),dogs:o}}}function st(t,e){const n=[];for(let s=0;s<e;s++)n.push(nt(t,s));return n}const L=["Sewer Division","Bone Bracket","Crown Pit"],W=8,Te=8,pe=[{id:"chipped-fang",name:"Chipped Fang",text:"Bit something it shouldn't have.",dGrit:0,dFang:-1,dFlea:0},{id:"limp",name:"Limp",text:"Old knee, new problems.",dGrit:0,dFang:0,dFlea:-1},{id:"scar-tissue",name:"Scar Tissue",text:"Thicker for it.",dGrit:2,dFang:0,dFlea:0},{id:"missing-ear",name:"Missing Ear",text:"Hears the Pit better anyway.",dGrit:-2,dFang:0,dFlea:0},{id:"renown",name:"Renown",text:"The crowd knows the name now.",dGrit:0,dFang:1,dFlea:0},{id:"battle-sense",name:"Battle Sense",text:"Reads the bite order before it lands.",dGrit:0,dFang:0,dFlea:1}];function q(t){return{v:1,name:t.name,motto:t.motto,dogs:t.dogs.map(e=>({...e,biteOrder:[...e.biteOrder],scars:e.scars.map(n=>({...n}))}))}}function at(t){const e=A(t>>>0),n=Array.from({length:Te},(s,r)=>r);for(let s=n.length-1;s>0;s--){const r=v(e,s+1);[n[s],n[r]]=[n[r],n[s]]}return n}function Ce(t,e,n,s,r=0){return{v:1,season:s,division:Math.max(0,Math.min(L.length-1,n)),seed:e>>>0,week:0,player:q(t),ghosts:st(e,Te),schedule:at(e),playerResults:[],ghostResults:[],scrap:r,done:!1}}function he(t,e,n,s){return B(`${t.seed}|${e}|${n}|${s}`)}function D(t,e,n){const s=[];for(const r of t){const a=e?.3:.55;if(n()<a){const o=e?pe.filter(d=>d.dGrit>=0&&d.dFang>=0&&d.dFlea>=0):pe,l=o[v(n,o.length)];r.scars=[...r.scars,l],s.push({dog:r.name,scar:l})}}return s}function ot(t){if(t.done)throw new Error("season is over — start the next one");const e={...t,player:q(t.player),ghosts:t.ghosts.map(b=>({...b,kennel:q(b.kennel)})),playerResults:[...t.playerResults],ghostResults:[...t.ghostResults]},n=e.week,s=e.schedule[n],r=e.ghosts[s],{result:a,packet:o}=Ee(e.player,r.kennel,e.seed+n),l=Me(o),d=a.winner===0,h=d?30:a.winner===-1?15:8;e.scrap+=h,e.playerResults.push({week:n,opponentId:r.id,opponentName:r.kennel.name,playerIsTeamA:!0,winner:a.winner===0?0:a.winner===1?1:-1,rounds:a.rounds,logHash:a.logHash,seed:o.seed,packetCode:l,scrapEarned:h});const g=A(o.seed),F=D(e.player.dogs,d,g);D(r.kennel.dogs,!d&&a.winner!==-1,g);const T=e.ghosts.map(b=>b.id),p=A(he(e,n,"pair","up")),f=[...T];for(let b=f.length-1;b>0;b--){const k=v(p,b+1);[f[b],f[k]]=[f[k],f[b]]}for(let b=0;b+1<f.length;b+=2){const k=e.ghosts.find(J=>J.id===f[b]),S=e.ghosts.find(J=>J.id===f[b+1]);if(!k||!S)continue;const M=ee(k.kennel.dogs.slice(0,3),S.kennel.dogs.slice(0,3),he(e,n,k.id,S.id));e.ghostResults.push({week:n,a:k.id,b:S.id,winner:M.winner===-1?"draw":M.winner===0?k.id:S.id});const ne=A(M.logHash?B(M.logHash):1);D(k.kennel.dogs,M.winner===0,ne),D(S.kennel.dogs,M.winner===1,ne)}return e.week+=1,e.week>=W&&(e.done=!0),{state:e,result:a,packet:o,packetCode:l,scarred:F}}function Be(t){const e=new Map,n=(r,a,o)=>(e.has(r)||e.set(r,{id:r,name:a,isPlayer:o,played:0,wins:0,draws:0,losses:0,points:0}),e.get(r)),s=n("player",t.player.name,!0);for(const r of t.ghosts)n(r.id,r.kennel.name,!1);for(const r of t.playerResults){const a=n(r.opponentId,r.opponentName,!1);s.played+=1,a.played+=1,r.winner===0?(s.wins+=1,s.points+=3,a.losses+=1):r.winner===1?(a.wins+=1,a.points+=3,s.losses+=1):(s.draws+=1,a.draws+=1,s.points+=1,a.points+=1)}for(const r of t.ghostResults){const a=n(r.a,t.ghosts.find(l=>l.id===r.a)?.kennel.name??r.a,!1),o=n(r.b,t.ghosts.find(l=>l.id===r.b)?.kennel.name??r.b,!1);r.winner==="draw"?(a.draws+=1,o.draws+=1,a.points+=1,o.points+=1):r.winner===a.id?(a.wins+=1,a.points+=3,o.losses+=1):(o.wins+=1,o.points+=3,a.losses+=1)}return[...e.values()].sort((r,a)=>a.points-r.points||a.wins-r.wins||Number(a.isPlayer)-Number(r.isPlayer))}function rt(t){const e=Be(t),n=e.findIndex(l=>l.isPlayer)+1,s=n<=2&&t.division<L.length-1,r=n>=e.length-1&&t.division>0,a=Math.max(20,120-n*12),o={...t,division:Math.max(0,Math.min(L.length-1,t.division+(s?1:r?-1:0))),scrap:t.scrap+a};return{state:o,finalTable:e,playerRank:n,promoted:s,relegated:r,scrapPayout:a,summary:`${o.player.name} finishes #${n} in ${L[t.division]} — ${s?"promoted":r?"relegated":"holds the line"}.`}}function it(t){return Ce(t.player,B(`season|${t.season+1}|${t.seed}`),t.division,t.season+1,t.scrap)}const _=40,Q=25,ge=["Nubbins","Duchess","Big Sad","Officer Grime","Teeth","Little Riot","Baron Mange","Pockets","Saint Vitus","Cricket","Moms","Duke Flea","Bones","Feral Beth","Gasket","Wobbles"],me=["mongrel","bonehound","grem","cur","brute","pupp"];function Pe(t){const e=A(t>>>0),n=[];for(let a=0;a<3;a++){const o=me[v(e,me.length)],l=7+v(e,5),d=1+v(e,Math.max(1,l-2)),h=1+v(e,Math.max(1,l-d)),g=Math.max(1,l-d-h),F=2+v(e,3),T=Object.keys($),p=[];for(;p.length<F;){const f=T[v(e,T.length)];p.includes(f)||p.push(f)}n.push({id:`pound-${t}-${a}`,name:ge[(t+a*7)%ge.length],strain:o,grit:d,fang:h,flea:g,biteOrder:p,scars:[]})}const s=Object.keys($),r=[];for(;r.length<3;){const a=s[v(e,s.length)];r.includes(a)||r.push(a)}return{seed:t>>>0,dogs:n,tricks:r}}function lt(t,e){return e in $?t.biteOrder.includes(e)?{ok:!1,error:"already knows it"}:t.biteOrder.length>=4?{ok:!1,error:"bite order is full"}:(t.biteOrder.push(e),{ok:!0}):{ok:!1,error:"the Pit has no such trick"}}const Ae="muttpit.save.v1",te=document.getElementById("app");let i=ct(),E=i?"kennel":"title",c=null,U="",I=null;const Z={oppCode:"",oppPacket:""};function ct(){try{const t=localStorage.getItem(Ae);if(!t)return null;const e=JSON.parse(t);return e.v===1?e:null}catch{return null}}function x(){i&&localStorage.setItem(Ae,JSON.stringify(i))}function u(t){return t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function w(t){U=t}const fe=['Quig: "The monkeydog built the Pit. The Pit keeps the receipts."','Quig: "A real Muttpit is worth more than a fake Batomon."','Quig: "Scars are just stats the Pit signed."','Quig: "Mail your kennel. Let the verdict travel."','Quig: "What is not finished, the Pit will tell you."','Quig: "Every dog is a build. Never a vibe."'];function dt(){const t=(i?.boutCounter??0)%fe.length;return fe[t]}function ut(){return{v:1,name:"Bucket Kennels",motto:"Lose small. Scar big.",dogs:[K("Big Sad","brute",2,3,1,["maul","cower","snap"]),K("Nubbins","grem",1,4,3,["flurry","mudtoss"]),K("Pockets","cur",2,2,2,["fleabite","sic","snap"]),K("Wobbles","mongrel",3,2,3,["packpounce","howl"])]}}function K(t,e,n,s,r,a){return{id:`${t.toLowerCase().replace(/\W+/g,"-")}-${B(t+e)%9973}`,name:t,strain:e,grit:n,fang:s,flea:r,biteOrder:a,scars:[]}}function pt(){i={v:1,kennel:ut(),scrap:150,division:0,season:1,seasonState:null,lastClose:null,mail:[],poundSeed:1,boutCounter:0},x(),E="kennel",w("Career opened. The Pound is already open.")}function ke(t,e,n,s,r,a,o=[],l){c={result:t,teamNames:e,teams:n,idx:0,playing:!0,timer:null,packetCode:s,label:r,returnScreen:a,scarred:o,record:l},E="bout",i&&(i.boutCounter+=1,x()),ht()}function ht(){c?.timer&&window.clearInterval(c.timer),c.timer=window.setInterval(()=>{if(c&&c.playing){if(c.idx>=c.result.events.length){Y();return}c.idx+=1,V()}},340)}function Y(){if(c){if(c.playing=!1,c.timer&&window.clearInterval(c.timer),c.timer=null,c.record&&i){const t=c.result.winner===0;i.mail.unshift({kind:c.record.kind,label:c.record.label,code:c.packetCode,ok:t||c.result.winner===-1,note:`verdict: ${t?"your kennel":c.teamNames[1]} took it — log ${c.result.logHash}`}),i.mail=i.mail.slice(0,30),x()}V()}}function be(t,e,n,s){if(t<=0)return s;const r=c.result.events[Math.min(t,c.result.events.length)-1],a=`${e}:${n}`;return r?.hp&&a in r.hp?r.hp[a]:s}function V(){const t=E==="title"?G():E==="kennel"?gt():E==="pound"?mt():E==="league"?ft():E==="mailbox"?kt():bt(),e=E==="title"||E==="bout"?"":`<div class="navbar">
      <button class="btn small secondary" data-act="goto" data-screen="kennel">Kennel</button>
      <button class="btn small secondary" data-act="goto" data-screen="pound">Pound</button>
      <button class="btn small secondary" data-act="goto" data-screen="league">Bone Bracket</button>
      <button class="btn small secondary" data-act="goto" data-screen="mailbox">Mailbox</button>
      <span style="flex:1"></span>
      <span class="scrap-counter">${i?.scrap??0} SCRAP</span>
    </div>`;te.innerHTML=`
    ${e}
    ${U?`<div class="panel rust"><b>${u(U)}</b> <button class="btn small" data-act="dismiss">ok</button></div>`:""}
    ${t}
    <div class="quig">${u(dt())} <span style="opacity:.6">v0.1 — what is not finished, the Pit will tell you.</span></div>
  `}function G(){return`
    <h1 class="title-logo display">MUTTPIT</h1>
    <div class="title-sub">async scrap-league auto-battler · draft · mail · verdict</div>
    <div class="panel bone">
      <p><b>Draft mongrels, write their bite order, mail your kennel into the Pit —
      every verdict keeps its receipts.</b></p>
      <p style="margin-top:8px">Built for Ultramonkeydog Studios.
      Non-live PvP by kennel codes and auditable verdict packets. Leagues are real seasons with scars.</p>
      <div class="btnrow">
        ${i?`<button class="btn lime" data-act="continue">Continue — ${u(i.kennel.name)}</button>`:""}
        <button class="btn" data-act="new-game">New Kennel</button>
      </div>
    </div>
    <div class="panel">
      <span class="tag violet">how it works</span>
      <p style="margin-top:8px">1. Your kennel holds up to 4 dogs; the first ${H} fight the Bout.
      2. Each dog carries a bite order of tricks played cyclically.
      3. Bouts resolve deterministically from a seed — the log hash is the receipt.
      4. Play the 8-week Bone Bracket against ghost kennels, or mail codes to a human.</p>
    </div>`}function gt(){if(!i)return G();const t=i.kennel,e=t.dogs.map((n,s)=>{const r=C[n.strain];return`
      <div class="dogcard">
        ${X(n,220)}
        <div class="name display">${u(n.name)} ${s<H?'<span class="tag lime">lineup</span>':'<span class="tag">bench</span>'}</div>
        <div class="mono-sm">${u(r.name)} — ${u(r.trait)}</div>
        <div class="stats">
          <span class="chip grit">GRIT ${r.base.grit+n.grit+n.scars.reduce((a,o)=>a+o.dGrit,0)}</span>
          <span class="chip fang">FANG ${r.base.fang+n.fang+n.scars.reduce((a,o)=>a+o.dFang,0)}</span>
          <span class="chip flea">FLEA ${r.base.flea+n.flea+n.scars.reduce((a,o)=>a+o.dFlea,0)}</span>
        </div>
        <div class="order-list">${n.biteOrder.map((a,o)=>`<span class="chip trick" title="${u($[a]?.text??a)}">${o+1}. ${u($[a]?.name??a)}</span>`).join("")}</div>
        ${n.scars.length?`<div class="scarline">scars: ${n.scars.map(a=>u(a.name)).join(", ")}</div>`:""}
        <div class="btnrow">
          <button class="btn small secondary" data-act="dog-up" data-i="${s}" ${s===0?"disabled":""}>↑</button>
          <button class="btn small secondary" data-act="dog-down" data-i="${s}" ${s===t.dogs.length-1?"disabled":""}>↓</button>
          <button class="btn small danger" data-act="dog-release" data-i="${s}">release</button>
        </div>
      </div>`}).join("");return`
    <div class="panel gold">
      <h2>${u(t.name)} ${Re("#120c08")}</h2>
      <p>"${u(t.motto)}"</p>
      <div class="btnrow">
        <button class="btn small secondary" data-act="rename">rename</button>
        <span class="tag cyan">${u(L[i.division])}</span>
        <span class="tag pink">season ${i.season}</span>
      </div>
    </div>
    <div class="doggrid">${e}</div>
    <div class="panel">
      <span class="tag violet">the pit says</span>
      <p style="margin-top:8px">Lineup is the first ${H} dogs — order is destiny. Move dogs with ↑↓.
      The Pound sells fresh mongrels and trick lessons. The Bone Bracket starts when you say so.</p>
    </div>`}function mt(){if(!i)return G();const t=i,e=Pe(i.poundSeed),n=I!==null?`<div class="panel bone">
          <b>Teach a trick to ${u(i.kennel.dogs[Number(I)]?.name??"?")}</b>
          <div class="btnrow">
            ${e.tricks.map(s=>{const r=$[s];return`<button class="btn small violet" data-act="teach" data-trick="${s}">${u(r.name)} — ${Q} scrap</button>`}).join("")}
            <button class="btn small secondary" data-act="teach-cancel">cancel</button>
          </div>
          <p class="mono-sm">lessons also available from any dog card later — the Pound stocks ${e.tricks.map(s=>u($[s].name)).join(", ")} this week.</p>
        </div>`:"";return`
    <div class="panel rust">
      <h2>The Pound</h2>
      <p>Scrap in, mongrels out. Offers roll with the week (seed ${e.seed}).</p>
    </div>
    ${n}
    <h3 style="margin:10px 0">Dogs — ${_} scrap</h3>
    <div class="doggrid">
      ${e.dogs.map((s,r)=>`
        <div class="dogcard">
          ${X(s,200)}
          <div class="name display">${u(s.name)}</div>
          <div class="mono-sm">${u(C[s.strain].name)} — ${u(C[s.strain].trait)}</div>
          <div class="stats">
            <span class="chip grit">GRIT ${C[s.strain].base.grit+s.grit}</span>
            <span class="chip fang">FANG ${C[s.strain].base.fang+s.fang}</span>
            <span class="chip flea">FLEA ${C[s.strain].base.flea+s.flea}</span>
          </div>
          <div class="order-list">${s.biteOrder.map(a=>`<span class="chip trick">${u($[a].name)}</span>`).join("")}</div>
          <div class="btnrow">
            <button class="btn small lime" data-act="buy-dog" data-i="${r}" ${t.kennel.dogs.length>=4?"disabled":""}>buy — ${_}</button>
          </div>
        </div>`).join("")}
    </div>
    <h3 style="margin:10px 0">Trick lessons — ${Q} scrap</h3>
    <div class="panel">
      ${e.tricks.map(s=>`<div><b>${u($[s].name)}</b> — ${u($[s].text)}</div>`).join("")}
      <div class="btnrow">
        <button class="btn violet" data-act="teach-start">teach one</button>
        <button class="btn secondary" data-act="pound-refresh">shake the cage (new offers — 10 scrap)</button>
      </div>
    </div>`}function ft(){if(!i)return G();const t=i.seasonState;if(!t)return`
      <div class="panel gold">
        <h2>Bone Bracket — ${u(L[i.division])}</h2>
        <p>8 weeks. Ghost kennels with their own schedules, scars, and standings.
        Win, and the Pit pays scrap. Top two climb divisions; bottom two fall.</p>
        <div class="btnrow">
          <button class="btn lime" data-act="season-start">Start Season ${i.season}</button>
        </div>
      </div>`;const n=Be(t).map(o=>`<tr class="${o.isPlayer?"me":""}">
      <td>${u(o.name)}</td><td>${o.played}</td><td>${o.wins}</td><td>${o.draws}</td><td>${o.losses}</td><td><b>${o.points}</b></td>
    </tr>`).join(""),s=t.playerResults.slice().reverse().map(o=>`<div class="mail-entry ${o.winner===0?"sent":o.winner===1?"bad":""}">
      <b>W${o.week+1}</b> vs ${u(o.opponentName)} —
      ${o.winner===0?'<span class="ok">WIN</span>':o.winner===1?'<span class="err">LOSS</span>':"DRAW"}
      (${o.rounds} rounds, log ${u(o.logHash)}, +${o.scrapEarned} scrap)
      <div class="mono-sm">${u(o.packetCode.slice(0,96))}…</div>
    </div>`).join(""),r=t.week<W?t.ghosts[t.schedule[t.week]]:null,a=t.done?`<div class="verdict-banner ${i.lastClose&&i.lastClose.relegated?"lost":""}">
        <div class="display">${i.lastClose?u(i.lastClose.summary):"Season complete"}</div>
        <div class="btnrow" style="justify-content:center">
          <button class="btn lime" data-act="season-close">Claim results &amp; roll next season</button>
        </div>
      </div>`:"";return`
    <div class="panel gold">
      <h2>Bone Bracket — ${u(L[t.division])} · Season ${t.season}</h2>
      <p>Week ${Math.min(t.week+1,W)} of ${W} · your scrap: <b>${t.scrap}</b></p>
      ${r?`<div class="btnrow"><button class="btn lime" data-act="season-play">Play Week ${t.week+1} vs ${u(r.kennel.name)}</button></div>`:""}
    </div>
    ${a}
    <div class="panel">
      <h3>Standings</h3>
      <table>
        <tr><th>kennel</th><th>P</th><th>W</th><th>D</th><th>L</th><th>pts</th></tr>
        ${n}
      </table>
    </div>
    <div class="panel">
      <h3>Season receipts</h3>
      ${s||'<p class="mono-sm">no bouts yet — the schedule is waiting.</p>'}
    </div>`}function kt(){if(!i)return G();const t=R(i.kennel),e=i.mail.map(n=>`<div class="mail-entry ${n.ok?"sent":"bad"}">
        <b>${u(n.label)}</b> ${n.ok?'<span class="ok">✓</span>':'<span class="err">✗</span>'}
        <div>${u(n.note)}</div>
        <div class="mono-sm">${u(n.code.slice(0,110))}…</div>
      </div>`).join("");return`
    <div class="panel gold">
      <h2>Mailbox — play-by-mail PvP</h2>
      <p>No server. No lies. Send your <b>Kennel Code</b>; they mail back a <b>Verdict Packet</b>
      that anyone can audit — it re-derives from its own claims.</p>
    </div>
    <div class="panel">
      <h3>Your Kennel Code</h3>
      <textarea id="my-code" rows="4" readonly>${u(t)}</textarea>
      <div class="btnrow"><button class="btn cyan" data-act="copy-code">copy code</button></div>
    </div>
    <div class="panel">
      <h3>Challenge a mailed kennel</h3>
      <textarea id="opp-code" rows="4" placeholder="paste their kennel code here">${u(Z.oppCode)}</textarea>
      <div class="btnrow"><button class="btn lime" data-act="challenge">fight it (deterministic bout)</button></div>
    </div>
    <div class="panel">
      <h3>Audit a Verdict Packet</h3>
      <textarea id="opp-packet" rows="4" placeholder="paste a verdict packet here — the Pit re-derives it">${u(Z.oppPacket)}</textarea>
      <div class="btnrow"><button class="btn violet" data-act="audit">re-derive the verdict</button></div>
    </div>
    <div class="panel">
      <h3>Pit log</h3>
      ${e||'<p class="mono-sm">empty — mail something.</p>'}
    </div>`}function bt(){if(!c)return G();const t=c.result.events[Math.max(0,c.idx-1)],e=c.idx>=c.result.events.length,n=c.result.winner,s=(l,d,h)=>{const g=be(c.idx,l,d.name,C[d.strain].base.grit+d.grit),F=C[d.strain].base.grit+d.grit,T=Math.max(0,Math.min(100,g/F*100));return`
      <div class="fighter ${l===1?"enemy":""} ${h?"dead":""}">
        ${X(d,64)}
        <div style="flex:1">
          <b>${u(d.name)}</b>
          <div class="hpbar"><div class="fill ${T<30?"low":""}" style="width:${T}%"></div></div>
          <div class="mono-sm">${g}/${F} grit</div>
        </div>
      </div>`},r=l=>`
    <div class="team-col">
      <h3>${u(c.teamNames[l])}</h3>
      ${c.teams[l].map(d=>s(l,d,be(c.idx,l,d.name,0)<=0&&c.idx>0)).join("")}
    </div>`,a=c.result.events.slice(0,c.idx).map((l,d,h)=>`<div class="line ${l.kind==="death"?"bad":l.kind==="heal"?"good":d===h.length-1?"hot":""}">[${l.round}] ${u(l.text)}</div>`).join(""),o=e?`<div class="verdict-banner ${n===1?"lost":n===-1?"draw":""}">
        <div class="display">${n===-1?"Draw":u(n===0?c.teamNames[0]:c.teamNames[1])} takes it</div>
        <p>${c.result.rounds} rounds · log ${u(c.result.logHash)}</p>
        ${c.scarred.length?`<p class="scarline">scars: ${c.scarred.map(l=>`${u(l.dog)} → ${u(l.scar.name)}`).join(", ")}</p>`:""}
        <div class="btnrow" style="justify-content:center">
          <button class="btn cyan" data-act="copy-packet">copy verdict packet</button>
          <button class="btn" data-act="bout-exit">back</button>
        </div>
      </div>`:"";return`
    <div class="panel gold"><h2>${u(c.label)}</h2>
      <p class="mono-sm">round ${t?.round??0} · deterministic replay · every verdict keeps its receipts</p></div>
    <div class="battle-stage">
      ${r(0)}
      <div class="center-col">
        <div class="trick-flash">${u(t?t.text.slice(0,60):"The Pit locks the gate.")}</div>
        <div class="btnrow" style="justify-content:center">
          <button class="btn small ${c.playing?"danger":"lime"}" data-act="bout-toggle">${c.playing?"pause":"play"}</button>
          <button class="btn small secondary" data-act="bout-step">step</button>
          <button class="btn small secondary" data-act="bout-skip">skip</button>
        </div>
        <div class="ticker" id="ticker">${a}</div>
      </div>
      ${r(1)}
    </div>
    ${o}`}te.addEventListener("input",t=>{const e=t.target;e instanceof HTMLTextAreaElement&&e.id==="opp-code"&&(Z.oppCode=e.value),e instanceof HTMLTextAreaElement&&e.id==="opp-packet"&&(Z.oppPacket=e.value)});te.addEventListener("click",t=>{const e=t.target.closest("[data-act]");if((!e||!i)&&!e)return;const n=e.dataset.act,s=Number(e.dataset.i??"-1");switch(n){case"dismiss":U="";break;case"new-game":(!i||confirm("Start a new kennel? This replaces your current career."))&&pt();break;case"continue":E="kennel";break;case"goto":E=e.dataset.screen;break;case"rename":{const a=prompt("Kennel name",i.kennel.name),o=prompt("Kennel motto",i.kennel.motto);a&&(i.kennel.name=a.slice(0,40)),o&&(i.kennel.motto=o.slice(0,80)),x();break}case"dog-up":if(s>0){const a=i.kennel.dogs;[a[s-1],a[s]]=[a[s],a[s-1]],x()}break;case"dog-down":if(s<i.kennel.dogs.length-1){const a=i.kennel.dogs;[a[s+1],a[s]]=[a[s],a[s+1]],x()}break;case"dog-release":i.kennel.dogs.length>1&&confirm(`Release ${i.kennel.dogs[s].name} into the night?`)&&(i.kennel.dogs.splice(s,1),x());break;case"buy-dog":{const o=Pe(i.poundSeed).dogs[s];if(!o)break;i.scrap<_?w("Not enough scrap. The Pound does not do credit."):i.kennel.dogs.length>=4?w("Kennel is full — release a dog first."):(i.scrap-=_,i.kennel.dogs.push({...o,id:`${o.id}-${i.boutCounter}`}),x(),w(`${o.name} joins the kennel.`));break}case"pound-refresh":i.scrap<10?w("The cage costs 10 scrap to shake."):(i.scrap-=10,i.poundSeed+=1,x(),w("New offers."));break;case"teach-start":I="0";break;case"teach-cancel":I=null;break;case"teach":{const a=Number(I??"0"),o=i.kennel.dogs[a],l=e.dataset.trick;if(!o)break;if(i.scrap<Q)w("Not enough scrap for a lesson.");else{const d=lt(o,l);d.ok?(i.scrap-=Q,x(),w(`${o.name} learned ${$[l].name}.`),I=null):w(d.error??"the trick will not stick")}break}case"season-start":{i.seasonState=Ce(i.kennel,B(`muttpit|${i.season}|${i.boutCounter}`),i.division,i.season,i.scrap),i.lastClose=null,x();break}case"season-play":{const a=i.seasonState;if(!a||a.done)break;const o=ot(a);i.seasonState=o.state,i.scrap=o.state.scrap,x();const l=o.state.playerResults[o.state.playerResults.length-1];ke(o.result,[a.player.name,l.opponentName],[a.player.dogs.slice(0,3),a.ghosts.find(d=>d.id===l.opponentId)?.kennel.dogs.slice(0,3)??[]],o.packetCode,`Bone Bracket — Week ${l.week+1} vs ${l.opponentName}`,"league",o.scarred);break}case"season-close":{const a=i.seasonState;if(!a||!a.done)break;const o=rt(a);i.lastClose=o,i.scrap=o.state.scrap,i.division=o.state.division,i.season+=1,i.seasonState=it(o.state),x(),w(o.summary);break}case"challenge":{const a=document.getElementById("opp-code"),o=z(a?.value??"");if(!o.ok||!o.kennel){w(o.error??"that code will not decode");break}const l=B(`${R(i.kennel)}|${R(o.kennel)}|${i.boutCounter}`),{result:d,packet:h}=Ee(i.kennel,o.kennel,l),g=Me(h);ke(d,[i.kennel.name,o.kennel.name],[i.kennel.dogs.slice(0,3),o.kennel.dogs.slice(0,3)],g,`Mailed challenge vs ${o.kennel.name}`,"mailbox",[],{kind:"challenge",label:`challenge vs ${o.kennel.name}`});break}case"audit":{const a=document.getElementById("opp-packet"),o=Je(a?.value??"");if(o.ok&&o.verdict){const l=o.verdict;i.mail.unshift({kind:"audit",label:"verdict audit",code:a.value.trim(),ok:!0,note:`re-derived clean: log ${o.replayedHash} — winner declared, receipts intact`}),w(`Audit CLEAN — replayed log ${o.replayedHash} matches the packet (winner recorded, ${l.rounds} rounds).`)}else i.mail.unshift({kind:"audit",label:"verdict audit",code:(a?.value??"").trim().slice(0,400),ok:!1,note:o.error??"audit failed"}),w(`Audit REJECTED — ${o.error??"unknown"}`);i.mail=i.mail.slice(0,30),x();break}case"copy-code":{const a=document.getElementById("my-code");ve(a?.value??""),w("Kennel code copied. Mail it to someone with a kennel.");break}case"copy-packet":ve(c?.packetCode??""),w("Verdict packet copied. Anyone can audit it.");break;case"bout-toggle":if(c){if(c.idx>=c.result.events.length)break;c.playing=!c.playing}break;case"bout-step":c&&c.idx<c.result.events.length?(c.playing=!1,c.idx+=1):c&&Y();break;case"bout-skip":c&&(c.idx=c.result.events.length,Y());break;case"bout-exit":c?.timer&&window.clearInterval(c.timer),E=c?.returnScreen??"kennel",c=null;break}V();const r=document.getElementById("ticker");r&&(r.scrollTop=r.scrollHeight)});async function ve(t){try{await navigator.clipboard.writeText(t)}catch{const e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}window.__muttpit={version:1,screen:()=>E,kennelCode:()=>i?R(i.kennel):"",lastPacket:()=>c?.packetCode??"",setOppCode:t=>{const e=document.getElementById("opp-code");e&&(e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})))},setOppPacket:t=>{const e=document.getElementById("opp-packet");e&&(e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})))}};V();
