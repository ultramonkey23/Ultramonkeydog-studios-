(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();function B(t){let e=2166136261;for(let s=0;s<t.length;s++)e^=t.charCodeAt(s),e=Math.imul(e,16777619)>>>0;return e>>>0}function A(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let s=e;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}}function y(t,e){return Math.floor(t()*e)}function Ie(t){return y(t,3)-1}const C={mongrel:{id:"mongrel",name:"Mongrel",blurb:"Ninety percent street, ten percent something else.",base:{grit:13,fang:5,flea:4},trait:"Scrappy — first hit each bout deals 2 less."},bonehound:{id:"bonehound",name:"Bonehound",blurb:"Already died once. Filed a complaint.",base:{grit:11,fang:5,flea:4},trait:"Undead — starts each bout with SHIELD 3."},grem:{id:"grem",name:"Grem",blurb:"Small, loud, legally a hazard.",base:{grit:10,fang:5,flea:4},trait:"Volatile — +2 FANG while below half GRIT."},cur:{id:"cur",name:"Cur",blurb:"Bites first, negotiates never.",base:{grit:12,fang:4,flea:4},trait:"Bleeder — its attacks apply BLEED 1."},brute:{id:"brute",name:"Brute",blurb:"Solves problems by becoming a larger problem.",base:{grit:19,fang:7,flea:3},trait:"Heavy — takes 2 less from barrage tricks."},pupp:{id:"pupp",name:"Pupp",blurb:"Fast enough to regret everything later.",base:{grit:10,fang:5,flea:7},trait:"Quick — acts first on any tick tie."}};function k(t,e,s,n,r,a=[]){return{id:t,name:e,text:s,target:n,effects:r,tags:a}}const x={snap:k("snap","Snap","Front enemy takes FANG damage.","enemyFront",[{kind:"damage",power:0,fromFang:!0}]),maul:k("maul","Maul","Front enemy takes FANG + 2.","enemyFront",[{kind:"damage",power:2,fromFang:!0}]),backbite:k("backbite","Back Bite","Back enemy takes FANG - 1.","enemyBack",[{kind:"damage",power:-1,fromFang:!0}]),flurry:k("flurry","Flurry","Front enemy takes two hits of FANG - 2.","enemyFront",[{kind:"damage",power:-2,fromFang:!0},{kind:"damage",power:-2,fromFang:!0}]),fleabite:k("fleabite","Flea Bite","Front enemy takes 1 and gains BLEED 2.","enemyFront",[{kind:"damage",power:1},{kind:"apply",power:2,status:"bleed"}]),tickharvest:k("tickharvest","Tick Harvest","Front enemy takes FANG + 2 per BLEED on it.","enemyFront",[{kind:"damage",power:0,fromFang:!0},{kind:"damage",power:2,perBleedOnTarget:!0}],["blood"]),bonecrack:k("bonecrack","Bone Crack","Front enemy takes FANG and gains MARKED 1.","enemyFront",[{kind:"damage",power:0,fromFang:!0},{kind:"apply",power:1,status:"marked"}]),spite:k("spite","Spite","Front enemy takes FANG + half your missing GRIT.","enemyFront",[{kind:"damage",power:0,fromFang:!0,perOwnMissingGrit:!0}],["spite"]),howl:k("howl","Howl","All allies gain RAGE 1.","allAllies",[{kind:"apply",power:1,status:"rage"}],["pack"]),cower:k("cower","Cower","Gain SHIELD 3.","self",[{kind:"shield",power:3}]),boneshield:k("boneshield","Bone Shield","Lowest-GRIT ally gains SHIELD 4.","allyLow",[{kind:"shield",power:4}]),secondwind:k("secondwind","Second Wind","Heal 5.","self",[{kind:"heal",power:5}],["blood"]),lickwounds:k("lickwounds","Lick Wounds","Lowest-GRIT ally heals 4.","allyLow",[{kind:"heal",power:4}],["blood"]),whiffle:k("whiffle","Whiffle Barrage","All enemies take 3.","allEnemies",[{kind:"damageAll",power:3}],["barrage"]),packpounce:k("packpounce","Pack Pounce","Front enemy takes FANG + 2 per other living ally.","enemyFront",[{kind:"damage",power:0,fromFang:!0,perOtherAlly:!0}],["pack"]),playdead:k("playdead","Play Dead","Gain DODGE 1.","self",[{kind:"apply",power:1,status:"dodge"}]),countersnarl:k("countersnarl","Counter Snarl","Gain SHIELD 2 and RAGE 1.","self",[{kind:"shield",power:2},{kind:"apply",power:1,status:"rage"}]),mudtoss:k("mudtoss","Mud Toss","Front enemy gains MARKED 2.","enemyFront",[{kind:"apply",power:2,status:"marked"}]),goad:k("goad","Goad","Front enemy gains RAGE 2 and COWER 2.","enemyFront",[{kind:"apply",power:2,status:"rage"},{kind:"apply",power:2,status:"cower"}]),shriek:k("shriek","Shriek","All enemies gain BLEED 1.","allEnemies",[{kind:"apply",power:1,status:"bleed"}],["barrage","blood"]),marrow:k("marrow","Marrow","Heal 3 and gain RAGE 1.","self",[{kind:"heal",power:3},{kind:"apply",power:1,status:"rage"}],["blood"]),sic:k("sic","Sic 'Em","Front enemy takes FANG + 1, +2 more if bleeding.","enemyFront",[{kind:"damage",power:1,fromFang:!0},{kind:"damage",power:2,perBleedOnTarget:!0}],["blood"]),rally:k("rally","Rally","All allies gain SHIELD 2.","allAllies",[{kind:"shield",power:2}],["pack"]),verdict:k("verdict","The Pit Decides","Front enemy takes FANG + 3; gain COWER 1.","enemyFront",[{kind:"damage",power:3,fromFang:!0},{kind:"apply",power:1,status:"cower"}]),goForTheEyes:k("goForTheEyes","Go For The Eyes","Front enemy takes 2 and gains COWER 1.","enemyFront",[{kind:"damage",power:2},{kind:"apply",power:1,status:"cower"}])},Ge=Object.keys(x),ae=4,H=3,oe=60;function He(...t){return B(t.join("|"))}const re=["#b4532a","#8a6f4e","#e8dcc4","#5c4632","#6b705c","#a3a388","#c98a4b","#7a5c3e"];function je(t){return{mongrel:"MNG",bonehound:"BNH",grem:"GRM",cur:"CUR",brute:"BRT",pupp:"PUP"}[t]}function ee(t,e=120){const s=He(t.name,t.strain,t.biteOrder.join(","),t.scars.length),n=re[Math.abs(s)%re.length],r=Math.abs(s>>3)%3,a=Math.abs(s>>6)%3,o=Math.abs(s>>9)%3,i=18+Math.abs(s>>12)%10,c=r===0?`<path d="M30 42 L38 12 L52 38 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>
         <path d="M90 42 L82 12 L68 38 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>`:r===1?`<path d="M28 40 Q12 20 24 58 Q34 52 34 42 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>
           <path d="M92 40 Q108 20 96 58 Q86 52 86 42 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>`:`<path d="M32 44 L28 18 L52 34 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>
           <path d="M88 44 L92 18 L68 34 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>`,g=o===0?`<circle cx="46" cy="56" r="5" fill="#e8dcc4" stroke="#120c08" stroke-width="2"/><circle cx="74" cy="56" r="5" fill="#e8dcc4" stroke="#120c08" stroke-width="2"/>
         <circle cx="47" cy="57" r="2" fill="#120c08"/><circle cx="75" cy="57" r="2" fill="#120c08"/>`:o===1?`<circle cx="46" cy="56" r="5" fill="#f5b83d" stroke="#120c08" stroke-width="2"/><circle cx="74" cy="56" r="5" fill="#f5b83d" stroke="#120c08" stroke-width="2"/>
           <circle cx="46" cy="56" r="2" fill="#120c08"/><circle cx="74" cy="56" r="2" fill="#120c08"/>`:`<path d="M40 54 L52 52" stroke="#120c08" stroke-width="4"/><path d="M68 52 L80 54" stroke="#120c08" stroke-width="4"/>
           <circle cx="46" cy="58" r="3" fill="#120c08"/><circle cx="74" cy="58" r="3" fill="#120c08"/>`,h=a===0?`<path d="M96 88 Q118 70 112 46" fill="none" stroke="${n}" stroke-width="9" stroke-linecap="round"/>`:a===1?`<path d="M96 88 Q112 82 118 92" fill="none" stroke="${n}" stroke-width="9" stroke-linecap="round"/>`:`<path d="M96 88 L114 58 L108 84 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>`,S=t.scars.slice(0,4).map((E,p)=>`<path d="M${34+p*14} ${86+p%2*6} l8 8 M${42+p*14} ${86+p%2*6} l-8 8" stroke="#e5484d" stroke-width="2.5" stroke-linecap="round"/>`).join("");return`<svg class="portrait" viewBox="0 0 130 120" width="${e}" height="${e*120/130}" xmlns="http://www.w3.org/2000/svg">
  <rect width="130" height="120" fill="#1c1410"/>
  ${h}
  <ellipse cx="65" cy="92" rx="38" ry="22" fill="${n}" stroke="#120c08" stroke-width="3"/>
  ${c}
  <circle cx="65" cy="58" r="30" fill="${n}" stroke="#120c08" stroke-width="3"/>
  ${g}
  <ellipse cx="65" cy="74" rx="${i/2}" ry="10" fill="#e8dcc4" stroke="#120c08" stroke-width="3"/>
  <ellipse cx="65" cy="68" rx="6" ry="4.5" fill="#120c08"/>
  <path d="M58 80 Q65 86 72 80" fill="none" stroke="#120c08" stroke-width="2.5" stroke-linecap="round"/>
  ${S}
  <rect x="2" y="2" width="34" height="15" fill="#120c08"/>
  <text x="6" y="13" font-family="monospace" font-size="10" fill="#f5b83d">${je(t.strain)}</text>
</svg>`}function De(t="#f5b83d",e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-3px">
  <circle cx="10" cy="13" r="5" fill="${t}" stroke="#120c08" stroke-width="1.5"/>
  <circle cx="4" cy="7" r="2.4" fill="${t}" stroke="#120c08" stroke-width="1.2"/>
  <circle cx="9" cy="4.5" r="2.4" fill="${t}" stroke="#120c08" stroke-width="1.2"/>
  <circle cx="14.5" cy="6" r="2.4" fill="${t}" stroke="#120c08" stroke-width="1.2"/>
</svg>`}function $e(t){const e=C[t.strain].base;let s=e.grit+t.grit,n=e.fang+t.fang,r=e.flea+t.flea;for(const a of t.scars)s+=a.dGrit,n+=a.dFang,r+=a.dFlea;return{grit:Math.max(4,s),fang:Math.max(1,n),flea:Math.max(1,r)}}function ie(t,e,s){const n=$e(t),r={bleed:0,shield:0,rage:0,cower:0,marked:0,dodge:0};return{dog:t,team:e,slot:s,hp:n.grit,maxHp:n.grit,fang:n.fang,flea:n.flea,statuses:r,trickIdx:0,scrappyUsed:!1,alive:!0}}function le(t){const e=t.filter(s=>s.alive);return e.sort((s,n)=>s.slot-n.slot),e[0]}function Ke(t){const e=t.filter(s=>s.alive);return e.sort((s,n)=>n.slot-s.slot),e[0]}function We(t){const e=t.filter(s=>s.alive);if(e.length!==0)return e.sort((s,n)=>s.hp-n.hp||s.slot-n.slot),e[0]}function L(t){return t.filter(e=>e.alive).length}function _e(t){const e={};for(const s of t.fighters)e[`${s.team}:${s.dog.name}`]=Math.max(0,s.hp);return e}function $(t,e,s,n={}){t.events.push({round:t.round,kind:e,text:s,hp:_e(t),...n})}function Qe(t){const e=t.dog.strain==="grem"&&t.hp<t.maxHp*.75?2:0;return t.fang+e+t.statuses.rage}function ce(t,e,s,n,r={}){if(!s.alive)return;if(s.statuses.dodge>0){s.statuses.dodge-=1,$(t,"status",`${s.dog.name} plays dead — the hit whiffs.`,{actor:e?.dog.name,target:s.dog.name});return}let a=n;if(e&&(a+=e.statuses.rage-e.statuses.cower),e&&e.dog.strain==="mongrel"&&!s.scrappyUsed&&(s.scrappyUsed=!0,a-=2,$(t,"status",`${s.dog.name} is scrappy — shrugs 2 off its first hit.`,{actor:e.dog.name,target:s.dog.name})),r.barrage&&s.dog.strain==="brute"&&(a-=2,$(t,"status",`${s.dog.name} is heavy — shrugs 2 off the barrage.`,{actor:e?.dog.name,target:s.dog.name})),a+=s.statuses.marked,a+=Ie(t.rng),a<0&&(a=0),s.statuses.shield>0){const o=Math.min(s.statuses.shield,a);s.statuses.shield-=o,a-=o,o>0&&$(t,"status",`${s.dog.name}'s shield eats ${o}.`,{actor:e?.dog.name,target:s.dog.name})}a>0&&(s.hp-=a,$(t,"hit",`${s.dog.name} takes ${a}.`,{actor:e?.dog.name,target:s.dog.name}),s.hp<=0&&(s.hp=0,s.alive=!1,$(t,"death",`${s.dog.name} goes down.`,{actor:e?.dog.name,target:s.dog.name})))}function j(t,e,s,n){const r=t.fighters.filter(o=>o.team!==e.team),a=t.fighters.filter(o=>o.team===e.team);switch(n.kind){case"damage":{if(!s)return;let o=n.power+(n.fromFang?Qe(e):0);n.perBleedOnTarget&&(o+=n.power*(s.statuses.bleed||0)),n.perOtherAlly&&(o+=n.power*a.filter(i=>i.alive&&i!==e).length*2),n.perOwnMissingGrit&&(o+=Math.floor((e.maxHp-e.hp)/2)),e.dog.strain==="cur"&&(s.statuses.bleed+=1,$(t,"status",`${s.dog.name} starts bleeding.`,{actor:e.dog.name,target:s.dog.name})),ce(t,e,s,o);break}case"damageAll":{for(const o of r)o.alive&&ce(t,e,o,n.power,{barrage:!0});break}case"heal":{const o=s??e;if(!o.alive)return;o.hp=Math.min(o.maxHp,o.hp+n.power),$(t,"heal",`${o.dog.name} recovers ${n.power}.`,{actor:e.dog.name,target:o.dog.name});break}case"shield":{const o=s??e;if(!o.alive)return;o.statuses.shield+=n.power,$(t,"status",`${o.dog.name} gains SHIELD ${n.power}.`,{actor:e.dog.name,target:o.dog.name});break}case"apply":{if(n.status===void 0||!s||!s.alive)return;s.statuses[n.status]+=n.power,$(t,"status",`${s.dog.name} gains ${n.status.toUpperCase()} ${n.power}.`,{actor:e.dog.name,target:s.dog.name});break}}}function Ue(t,e,s){const n=s[e.team===0?1:0],r=s[e.team],a=e.dog.biteOrder,o=a.length>0?a[e.trickIdx%a.length]:"snap";e.trickIdx+=1;const i=x[o]??x.snap;$(t,"trick",`${e.dog.name} plays ${i.name}.`,{actor:e.dog.name});let c;switch(i.target){case"enemyFront":c=le(n);break;case"enemyBack":c=Ke(n);break;case"enemyAny":c=le(n);break;case"allEnemies":c=void 0;break;case"self":c=e;break;case"allyLow":c=We(r)??e;break;case"allAllies":c=void 0;break}for(const g of i.effects)if(i.target==="allEnemies"&&(g.kind==="damageAll"||g.kind==="apply"))if(g.kind==="damageAll")j(t,e,void 0,g);else for(const h of n)h.alive&&j(t,e,h,g);else if(i.target==="allAllies")for(const h of r)h.alive&&j(t,e,h,g);else j(t,e,c,g)}function Ze(t,e){if(e.statuses.bleed>0){const s=e.statuses.bleed;e.hp-=s,$(t,"hit",`${e.dog.name} bleeds for ${s}.`,{actor:e.dog.name,target:e.dog.name}),e.hp<=0&&(e.hp=0,e.alive=!1,$(t,"death",`${e.dog.name} bleeds out.`,{target:e.dog.name}))}}function te(t,e,s){const n=t.slice(0,H),r=e.slice(0,H),a=[...n.map((p,b)=>ie(p,0,b)),...r.map((p,b)=>ie(p,1,b))],o=[a.slice(0,n.length),a.slice(n.length)],i={fighters:a,events:[],rng:A(s>>>0),round:0};$(i,"start","The Pit locks the gate. Bout starts.",{actor:void 0});for(const p of a)p.dog.strain==="bonehound"&&(p.statuses.shield+=3,$(i,"status",`${p.dog.name} rattles to life with SHIELD 3.`,{actor:p.dog.name,target:p.dog.name}));for(;i.round<oe;){i.round+=1;const p=a.filter(m=>m.alive).sort((m,F)=>F.flea-m.flea||(m.dog.strain==="pupp"?-1:0)-(F.dog.strain==="pupp"?-1:0)||m.slot-F.slot||(m.team===0?-1:1));for(const m of p){if(!m.alive||(Ze(i,m),!m.alive))continue;Ue(i,m,o);const F=L(o[0]),T=L(o[1]);if(F===0||T===0)break}const b=L(o[0]),f=L(o[1]);if(b===0||f===0)break}let c=-1;const g=L(o[0]),h=L(o[1]);if(g>0&&h===0)c=0;else if(h>0&&g===0)c=1;else if(i.round>=oe){const p=m=>m.reduce((F,T)=>F+T.hp/Math.max(1,T.maxHp),0),b=p(o[0]),f=p(o[1]);c=b>f?0:f>b?1:-1,$(i,"end",`The Pit runs out of patience — judges' decision: ${c===-1?"draw":c===0?"team A":"team B"}.`)}$(i,"end",c===0?"Team A takes the bout.":c===1?"Team B takes the bout.":"The bout is a draw.");const S=[o[0].reduce((p,b)=>p+Math.max(0,b.hp),0),o[1].reduce((p,b)=>p+Math.max(0,b.hp),0)],E=a.filter(p=>p.alive).map(p=>({team:p.team,name:p.dog.name,hp:p.hp,maxHp:p.maxHp}));return{winner:c,rounds:i.round,events:i.events,logHash:Ve(i.events),survivorHp:S,survivors:E}}function Ve(t){const e=t.map(n=>`${n.round}|${n.kind}|${n.actor??""}|${n.target??""}|${n.text}`).join(`
`);let s=2166136261;for(let n=0;n<e.length;n++)s^=e.charCodeAt(n),s=Math.imul(s,16777619)>>>0;return s.toString(16).padStart(8,"0")}function Se(t){const e=[];t.length===0&&e.push("kennel is empty"),t.length>ae&&e.push(`kennel exceeds ${ae} dogs`);const s=new Set;for(const n of t){s.has(n.id)&&e.push(`duplicate dog id ${n.id}`),s.add(n.id),n.strain in C||e.push(`unknown strain ${n.strain}`);for(const a of n.biteOrder)a in x||e.push(`unknown trick ${a}`);n.biteOrder.length===0&&e.push(`${n.name} has an empty bite order`),$e(n).grit<4&&e.push(`${n.name} has no grit left`)}return{ok:e.length===0,errors:e}}const R="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";function Je(t){let e="";for(let s=0;s<t.length;s+=3){const n=t[s],r=s+1<t.length?t[s+1]:void 0,a=s+2<t.length?t[s+2]:void 0;if(e+=R[n>>2],e+=R[(n&3)<<4|(r??0)>>4],r===void 0||(e+=R[(r&15)<<2|(a??0)>>6],a===void 0))break;e+=R[a&63]}return e}function ze(t){const e=t.replace(/[^A-Za-z0-9\-_]/g,""),s=new Map;for(let r=0;r<R.length;r++)s.set(R[r],r);const n=[];for(let r=0;r<e.length;r+=4){const a=s.get(e[r])??0,o=s.get(e[r+1])??0,i=r+2<e.length?s.get(e[r+2]):void 0,c=r+3<e.length?s.get(e[r+3]):void 0;if(n.push(a<<2|o>>4),i===void 0||(n.push((o&15)<<4|i>>2),c===void 0))break;n.push((i&3)<<6|c)}return n}function xe(t){const e=[];for(let s=0;s<t.length;s++){let n=t.charCodeAt(s);n<128?e.push(n):n<2048?e.push(192|n>>6,128|n&63):e.push(224|n>>12,128|n>>6&63,128|n&63)}return Je(e)}function Fe(t){const e=ze(t);let s="";for(let n=0;n<e.length;n++){const r=e[n];r<128?s+=String.fromCharCode(r):r<224?s+=String.fromCharCode((r&31)<<6|e[++n]&63):s+=String.fromCharCode((r&15)<<12|(e[++n]&63)<<6|e[++n]&63)}return s}function Me(t){return`${t}.${B(t).toString(16)}`}function Ee(t){const e=t.lastIndexOf(".");if(e<0)return{ok:!1,payload:""};const s=t.slice(0,e),n=t.slice(e+1);return{ok:B(s).toString(16)===n,payload:s}}function I(t){const e=Se(t.dogs);if(!e.ok)throw new Error(`refusing to encode invalid kennel: ${e.errors.join("; ")}`);return xe(Me(JSON.stringify(t)))}function q(t){try{const{ok:e,payload:s}=Ee(Fe(t.trim()));if(!e)return{ok:!1,error:"checksum failed — the Pit does not accept tampered codes"};const n=JSON.parse(s);if(n.v!==1)return{ok:!1,error:"unknown code version"};const r=Se(n.dogs);return r.ok?{ok:!0,kennel:n}:{ok:!1,error:r.errors.join("; ")}}catch{return{ok:!1,error:"not a kennel code"}}}function qe(t,e,s){return B(`${t}|${e}|${s}`)}function Te(t,e,s){const n=I(t),r=I(e),a=qe(n,r,s),o=te(t.dogs,e.dogs,a),i=`${t.name} vs ${e.name}: ${o.winner===-1?"draw":o.winner===0?t.name:e.name} in ${o.rounds} rounds (${o.logHash})`,c={v:1,seed:a,a:n,b:r,winner:o.winner,rounds:o.rounds,logHash:o.logHash,summary:i};return{result:o,packet:c,codeA:n,codeB:r}}function Ce(t){return xe(Me(JSON.stringify(t)))}function Ye(t){try{const{ok:e,payload:s}=Ee(Fe(t.trim()));if(!e)return{ok:!1,error:"checksum failed — forged verdicts smell like that"};const n=JSON.parse(s);return n.v!==1?{ok:!1,error:"unknown packet version"}:{ok:!0,packet:n}}catch{return{ok:!1,error:"not a verdict packet"}}}function Xe(t){const e=Ye(t);if(!e.ok||!e.packet)return{ok:!1,error:e.error};const s=e.packet,n=q(s.a),r=q(s.b);if(!n.ok||!n.kennel||!r.ok||!r.kennel)return{ok:!1,error:"packet references a kennel that will not decode"};const a=te(n.kennel.dogs,r.kennel.dogs,s.seed);return a.logHash!==s.logHash?{ok:!1,error:`replay hash mismatch: claimed ${s.logHash}, replayed ${a.logHash}`,replayedHash:a.logHash}:a.winner!==s.winner?{ok:!1,error:"replayed winner disagrees with the packet"}:{ok:!0,verdict:s,replayedHash:a.logHash}}const de=["aggressive","defensive","trickster","pack","feral"],et={aggressive:["maul","snap","flurry","sic","packpounce","fleabite","tickharvest"],defensive:["bonecrack","cower","verdict","countersnarl","snap","rally","secondwind"],trickster:["mudtoss","goad","goForTheEyes","fleabite","tickharvest","shriek","playdead"],pack:["whiffle","howl","packpounce","rally","snap","shriek","lickwounds"],feral:["spite","marrow","backbite","fleabite","maul","cower"]},tt={aggressive:{grit:0,fang:1,flea:1},defensive:{grit:5,fang:3,flea:2},trickster:{grit:3,fang:4,flea:5},pack:{grit:3,fang:4,flea:4},feral:{grit:1,fang:1,flea:2}},nt=["mongrel","bonehound","grem","cur","brute","pupp"],st=["Gnash","Rip","Snarl","Vex","Mange","Brut","Cinder","Howl","Gore","Rust","Bolt","Wheeze","Knuckle","Saint","Doctor","Comrade"],at=["tooth","muzzle","leg","hound","cur","terrier","jaws","paws","tail","barker","bucket","widow","junior","the-third"],ue=["The Rust Yard","Sewer Saints","Gnash Estate","The Whiffle Club","Bucket Kennels","The Bone Trust","Widow's Mange","The Scrap Choir","Saint Gnash's Home","Comrade Cur's Pack"],pe=["Bite first. File later.","We keep the receipts.","Loyalty is a muzzle made of paperwork.","Every dog has its day in court.","Lose small. Scar big.","The Pit decides.","Chewed up, spit out, promoted.","We came for the scrap and stayed for spite."];function P(t,e){return e[y(t,e.length)]}function ot(t,e,s,n){const r=P(t,nt),a=tt[e],i=(8+Math.round(s*4)+(n===0?2:0))/10,c=et[e],g=2+y(t,3),h=[];for(;h.length<g;){const S=y(t,3)===0?P(t,Ge):P(t,c);h.includes(S)||h.push(S)}return{id:`ghost-${e}-${n}-${y(t,1<<20)}`,name:`${P(t,st)} ${P(t,at)}`,strain:r,grit:Math.round(a.grit*i),fang:Math.round(a.fang*i),flea:Math.round(a.flea*i),biteOrder:h,scars:[]}}function rt(t,e,s=0){const n=A((t^e*2654435761)>>>0),r=de[y(n,de.length)],a=Math.min(.95,.25+n()*.6+Math.max(0,s)*.05),o=3+y(n,2),i=[];for(let c=0;c<o;c++)i.push(ot(n,r,a,c));return{id:`ghost-${e}-${t.toString(16)}`,name:P(n,ue),motto:P(n,pe),personality:r,skill:a,kennel:{v:1,name:P(n,ue),motto:P(n,pe),dogs:i}}}function it(t,e,s=0){const n=[];for(let r=0;r<e;r++)n.push(rt(t,r,s));return n}const O=["Sewer Division","Bone Bracket","Crown Pit"],W=8,Be=8,he=[{id:"chipped-fang",name:"Chipped Fang",text:"Bit something it shouldn't have.",dGrit:0,dFang:-1,dFlea:0},{id:"limp",name:"Limp",text:"Old knee, new problems.",dGrit:0,dFang:0,dFlea:-1},{id:"scar-tissue",name:"Scar Tissue",text:"Thicker for it.",dGrit:2,dFang:0,dFlea:0},{id:"missing-ear",name:"Missing Ear",text:"Hears the Pit better anyway.",dGrit:-2,dFang:0,dFlea:0},{id:"renown",name:"Renown",text:"The crowd knows the name now.",dGrit:0,dFang:1,dFlea:0},{id:"battle-sense",name:"Battle Sense",text:"Reads the bite order before it lands.",dGrit:0,dFang:0,dFlea:1}];function Y(t){return{v:1,name:t.name,motto:t.motto,dogs:t.dogs.map(e=>({...e,biteOrder:[...e.biteOrder],scars:e.scars.map(s=>({...s}))}))}}function lt(t){const e=A(t>>>0),s=Array.from({length:Be},(n,r)=>r);for(let n=s.length-1;n>0;n--){const r=y(e,n+1);[s[n],s[r]]=[s[r],s[n]]}return s}function Pe(t,e,s,n,r=0){return{v:1,season:n,division:Math.max(0,Math.min(O.length-1,s)),seed:e>>>0,week:0,player:Y(t),ghosts:it(e,Be,Math.max(0,n-1+s)),schedule:lt(e),playerResults:[],ghostResults:[],scrap:r,done:!1}}function ge(t,e,s,n){return B(`${t.seed}|${e}|${s}|${n}`)}function D(t,e,s){const n=[];for(const r of t){const a=e?.3:.55;if(s()<a){const o=e?he.filter(c=>c.dGrit>=0&&c.dFang>=0&&c.dFlea>=0):he,i=o[y(s,o.length)];r.scars=[...r.scars,i],n.push({dog:r.name,scar:i})}}return n}function ct(t){if(t.done)throw new Error("season is over — start the next one");const e={...t,player:Y(t.player),ghosts:t.ghosts.map(f=>({...f,kennel:Y(f.kennel)})),playerResults:[...t.playerResults],ghostResults:[...t.ghostResults]},s=e.week,n=e.schedule[s],r=e.ghosts[n],{result:a,packet:o}=Te(e.player,r.kennel,e.seed+s),i=Ce(o),c=a.winner===0,g=c?30:a.winner===-1?15:8;e.scrap+=g,e.playerResults.push({week:s,opponentId:r.id,opponentName:r.kennel.name,playerIsTeamA:!0,winner:a.winner===0?0:a.winner===1?1:-1,rounds:a.rounds,logHash:a.logHash,seed:o.seed,packetCode:i,scrapEarned:g});const h=A(o.seed),S=D(e.player.dogs,c,h);D(r.kennel.dogs,!c&&a.winner!==-1,h);const E=e.ghosts.map(f=>f.id),p=A(ge(e,s,"pair","up")),b=[...E];for(let f=b.length-1;f>0;f--){const m=y(p,f+1);[b[f],b[m]]=[b[m],b[f]]}for(let f=0;f+1<b.length;f+=2){const m=e.ghosts.find(z=>z.id===b[f]),F=e.ghosts.find(z=>z.id===b[f+1]);if(!m||!F)continue;const T=te(m.kennel.dogs.slice(0,3),F.kennel.dogs.slice(0,3),ge(e,s,m.id,F.id));e.ghostResults.push({week:s,a:m.id,b:F.id,winner:T.winner===-1?"draw":T.winner===0?m.id:F.id});const se=A(T.logHash?B(T.logHash):1);D(m.kennel.dogs,T.winner===0,se),D(F.kennel.dogs,T.winner===1,se)}return e.week+=1,e.week>=W&&(e.done=!0),{state:e,result:a,packet:o,packetCode:i,scarred:S}}function Ne(t){const e=new Map,s=(r,a,o)=>(e.has(r)||e.set(r,{id:r,name:a,isPlayer:o,played:0,wins:0,draws:0,losses:0,points:0}),e.get(r)),n=s("player",t.player.name,!0);for(const r of t.ghosts)s(r.id,r.kennel.name,!1);for(const r of t.playerResults){const a=s(r.opponentId,r.opponentName,!1);n.played+=1,a.played+=1,r.winner===0?(n.wins+=1,n.points+=3,a.losses+=1):r.winner===1?(a.wins+=1,a.points+=3,n.losses+=1):(n.draws+=1,a.draws+=1,n.points+=1,a.points+=1)}for(const r of t.ghostResults){const a=s(r.a,t.ghosts.find(i=>i.id===r.a)?.kennel.name??r.a,!1),o=s(r.b,t.ghosts.find(i=>i.id===r.b)?.kennel.name??r.b,!1);a.played+=1,o.played+=1,r.winner==="draw"?(a.draws+=1,o.draws+=1,a.points+=1,o.points+=1):r.winner===a.id?(a.wins+=1,a.points+=3,o.losses+=1):(o.wins+=1,o.points+=3,a.losses+=1)}return[...e.values()].sort((r,a)=>a.points-r.points||a.wins-r.wins||Number(a.isPlayer)-Number(r.isPlayer))}function dt(t){const e=Ne(t),s=e.findIndex(i=>i.isPlayer)+1,n=s<=2&&t.division<O.length-1,r=s>=e.length-1&&t.division>0,a=Math.max(20,120-s*12),o={...t,division:Math.max(0,Math.min(O.length-1,t.division+(n?1:r?-1:0))),scrap:t.scrap+a};return{state:o,finalTable:e,playerRank:s,promoted:n,relegated:r,scrapPayout:a,summary:`${o.player.name} finishes #${s} in ${O[t.division]} — ${n?"promoted":r?"relegated":"holds the line"}.`}}function ut(t){return Pe(t.player,B(`season|${t.season+1}|${t.seed}`),t.division,t.season+1,t.scrap)}const _=40,Q=25,me=["Nubbins","Duchess","Big Sad","Officer Grime","Teeth","Little Riot","Baron Mange","Pockets","Saint Vitus","Cricket","Moms","Duke Flea","Bones","Feral Beth","Gasket","Wobbles"],fe=["mongrel","bonehound","grem","cur","brute","pupp"];function Ae(t,e=0){const s=A(t>>>0),n=[],r=Math.min(6,Math.max(0,e));for(let i=0;i<3;i++){const c=fe[y(s,fe.length)],g=7+y(s,5)+r,h=1+y(s,Math.max(1,g-2)),S=1+y(s,Math.max(1,g-h)),E=Math.max(1,g-h-S),p=2+y(s,3),b=Object.keys(x),f=[];for(;f.length<p;){const m=b[y(s,b.length)];f.includes(m)||f.push(m)}n.push({id:`pound-${t}-${i}`,name:me[(t+i*7)%me.length],strain:c,grit:h,fang:S,flea:E,biteOrder:f,scars:[]})}const a=Object.keys(x),o=[];for(;o.length<3;){const i=a[y(s,a.length)];o.includes(i)||o.push(i)}return{seed:t>>>0,dogs:n,tricks:o}}function pt(t,e){return e in x?t.biteOrder.includes(e)?{ok:!1,error:"already knows it"}:t.biteOrder.length>=4?{ok:!1,error:"bite order is full"}:(t.biteOrder.push(e),{ok:!0}):{ok:!1,error:"the Pit has no such trick"}}function ke(t,e,s){const n=t.biteOrder.length;if(!Number.isInteger(e)||e<0||e>=n)return{ok:!1,error:"no such trick"};const r=s==="up"?e-1:e+1;if(r<0||r>=n)return{ok:!1,error:s==="up"?"already at the top of the order":"already at the bottom of the order"};const a=t.biteOrder;return[a[e],a[r]]=[a[r],a[e]],{ok:!0}}function ht(t,e){const s=t.biteOrder.length;return!Number.isInteger(e)||e<0||e>=s?{ok:!1,error:"no such trick"}:s<=1?{ok:!1,error:"every dog needs at least one trick"}:(t.biteOrder.splice(e,1),{ok:!0})}const U=5,Oe="muttpit.save.v1",ne=document.getElementById("app");let l=gt(),M=l?"kennel":"title",d=null,Z="",N=null;const V={oppCode:"",oppPacket:""};function gt(){try{const t=localStorage.getItem(Oe);if(!t)return null;const e=JSON.parse(t);return e.v===1?e:null}catch{return null}}function w(){l&&localStorage.setItem(Oe,JSON.stringify(l))}function u(t){return t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function v(t){Z=t}const be=['Quig: "The monkeydog built the Pit. The Pit keeps the receipts."','Quig: "A real Muttpit is worth more than a fake Batomon."','Quig: "Scars are just stats the Pit signed."','Quig: "Mail your kennel. Let the verdict travel."','Quig: "What is not finished, the Pit will tell you."','Quig: "Every dog is a build. Never a vibe."'];function mt(){const t=(l?.boutCounter??0)%be.length;return be[t]}function ft(){return{v:1,name:"Bucket Kennels",motto:"Lose small. Scar big.",dogs:[K("Big Sad","brute",2,3,1,["maul","cower","snap"]),K("Nubbins","grem",1,4,3,["flurry","mudtoss"]),K("Pockets","cur",2,2,2,["fleabite","sic","snap"]),K("Wobbles","mongrel",3,2,3,["packpounce","howl"])]}}function K(t,e,s,n,r,a){return{id:`${t.toLowerCase().replace(/\W+/g,"-")}-${B(t+e)%9973}`,name:t,strain:e,grit:s,fang:n,flea:r,biteOrder:a,scars:[]}}function kt(){l={v:1,kennel:ft(),scrap:150,division:0,season:1,seasonState:null,lastClose:null,mail:[],poundSeed:1,boutCounter:0},w(),M="kennel",v("Career opened. The Pound is already open.")}function ve(t,e,s,n,r,a,o=[],i){d={result:t,teamNames:e,teams:s,idx:0,playing:!0,timer:null,packetCode:n,label:r,returnScreen:a,scarred:o,record:i},M="bout",l&&(l.boutCounter+=1,w()),bt()}function bt(){d?.timer&&window.clearInterval(d.timer),d.timer=window.setInterval(()=>{if(d&&d.playing){if(d.idx>=d.result.events.length){X();return}d.idx+=1,J()}},340)}function X(){if(d){if(d.playing=!1,d.timer&&window.clearInterval(d.timer),d.timer=null,d.record&&l){const t=d.result.winner===0;l.mail.unshift({kind:d.record.kind,label:d.record.label,code:d.packetCode,ok:t||d.result.winner===-1,note:`verdict: ${t?"your kennel":d.teamNames[1]} took it — log ${d.result.logHash}`}),l.mail=l.mail.slice(0,30),w()}J()}}function we(t,e,s,n){if(t<=0)return n;const r=d.result.events[Math.min(t,d.result.events.length)-1],a=`${e}:${s}`;return r?.hp&&a in r.hp?r.hp[a]:n}function J(){const t=M==="title"?G():M==="kennel"?vt():M==="pound"?wt():M==="league"?yt():M==="mailbox"?$t():St(),e=M==="title"||M==="bout"?"":`<div class="navbar">
      <button class="btn small secondary" data-act="goto" data-screen="kennel">Kennel</button>
      <button class="btn small secondary" data-act="goto" data-screen="pound">Pound</button>
      <button class="btn small secondary" data-act="goto" data-screen="league">Bone Bracket</button>
      <button class="btn small secondary" data-act="goto" data-screen="mailbox">Mailbox</button>
      <span style="flex:1"></span>
      <span class="scrap-counter">${l?.scrap??0} SCRAP</span>
    </div>`;ne.innerHTML=`
    ${e}
    ${Z?`<div class="panel rust"><b>${u(Z)}</b> <button class="btn small" data-act="dismiss">ok</button></div>`:""}
    ${t}
    <div class="quig">${u(mt())} <span style="opacity:.6">v0.1 — what is not finished, the Pit will tell you.</span></div>
  `}function G(){return`
    <h1 class="title-logo display">MUTTPIT</h1>
    <div class="title-sub">async scrap-league auto-battler · draft · mail · verdict</div>
    <div class="panel bone">
      <p><b>Draft mongrels, write their bite order, mail your kennel into the Pit —
      every verdict keeps its receipts.</b></p>
      <p style="margin-top:8px">Built for Ultramonkeydog Studios.
      Non-live PvP by kennel codes and auditable verdict packets. Leagues are real seasons with scars.</p>
      <div class="btnrow">
        ${l?`<button class="btn lime" data-act="continue">Continue — ${u(l.kennel.name)}</button>`:""}
        <button class="btn" data-act="new-game">New Kennel</button>
      </div>
    </div>
    <div class="panel">
      <span class="tag violet">how it works</span>
      <p style="margin-top:8px">1. Your kennel holds up to 4 dogs; the first ${H} fight the Bout.
      2. Each dog carries a bite order of tricks played cyclically.
      3. Bouts resolve deterministically from a seed — the log hash is the receipt.
      4. Play the 8-week Bone Bracket against ghost kennels, or mail codes to a human.</p>
    </div>`}function Le(t){return["front","mid","back"][t]??"bench"}function vt(){if(!l)return G();const t=l.kennel,e=t.dogs.map((s,n)=>{const r=C[s.strain],a=u(Le(n)),o=s.biteOrder.length;return`
      <div class="dogcard">
        ${ee(s,220)}
        <div class="name display">${u(s.name)} <span class="tag lime">${a}</span></div>
        <div class="mono-sm">${u(r.name)} — ${u(r.trait)}</div>
        <div class="stats">
          <span class="chip grit">GRIT ${r.base.grit+s.grit+s.scars.reduce((i,c)=>i+c.dGrit,0)}</span>
          <span class="chip fang">FANG ${r.base.fang+s.fang+s.scars.reduce((i,c)=>i+c.dFang,0)}</span>
          <span class="chip flea">FLEA ${r.base.flea+s.flea+s.scars.reduce((i,c)=>i+c.dFlea,0)}</span>
        </div>
        <div class="order-list">${s.biteOrder.map((i,c)=>`
          <div class="order-row">
            <span class="chip trick" title="${u(x[i]?.text??i)}">${c+1}. ${u(x[i]?.name??i)}</span>
            <button class="btn small secondary" data-act="trick-up" data-i="${n}" data-j="${c}" ${c===0?"disabled":""}>↑</button>
            <button class="btn small secondary" data-act="trick-down" data-i="${n}" data-j="${c}" ${c===o-1?"disabled":""}>↓</button>
            <button class="btn small danger" data-act="trick-remove" data-i="${n}" data-j="${c}">×</button>
          </div>
        `).join("")}</div>
        ${s.scars.length?`<div class="scarline">scars: ${s.scars.map(i=>u(i.name)).join(", ")}</div>`:""}
        <div class="btnrow">
          <button class="btn small secondary" data-act="dog-up" data-i="${n}" ${n===0?"disabled":""}>↑</button>
          <button class="btn small secondary" data-act="dog-down" data-i="${n}" ${n===t.dogs.length-1?"disabled":""}>↓</button>
          <button class="btn small danger" data-act="dog-release" data-i="${n}">release</button>
        </div>
      </div>`}).join("");return`
    <div class="panel gold">
      <h2>${u(t.name)} ${De("#120c08")}</h2>
      <p>"${u(t.motto)}"</p>
      <div class="btnrow">
        <button class="btn small secondary" data-act="rename">rename</button>
        <span class="tag cyan">${u(O[l.division])}</span>
        <span class="tag pink">season ${l.season}</span>
      </div>
    </div>
    <div class="doggrid">${e}</div>
    <div class="panel">
      <span class="tag violet">the pit says</span>
      <p style="margin-top:8px">Lineup is the first ${H} dogs — front is slot 0, back is slot ${H-1}, beyond is bench. Move dogs with ↑↓, write each bite order with ↑↓×.
      The Pound sells fresh mongrels and trick lessons. The Bone Bracket starts when you say so.</p>
    </div>`}function Re(t){return t.season-1+t.division}function wt(){if(!l)return G();const t=l,e=Ae(l.poundSeed,Re(l)),s=N!==null?`<div class="panel bone">
          <b>Teach a trick — pick the dog</b>
          <div class="btnrow">
            ${l.kennel.dogs.map((n,r)=>`
              <button class="btn small ${Number(N)===r?"lime":"secondary"}" data-act="teach-pick" data-i="${r}">${u(n.name)} <span class="mono-sm">(${u(Le(r))})</span></button>
            `).join("")}
          </div>
          <p class="mono-sm">teaching ${u(l.kennel.dogs[Number(N)]?.name??"?")} this turn.</p>
          <div class="btnrow">
            ${e.tricks.map(n=>{const r=x[n];return`<button class="btn small violet" data-act="teach" data-trick="${n}">${u(r.name)} — ${Q} scrap</button>`}).join("")}
            <button class="btn small secondary" data-act="teach-cancel">cancel</button>
          </div>
          <p class="mono-sm">the Pound stocks ${e.tricks.map(n=>u(x[n].name)).join(", ")} this week.</p>
        </div>`:"";return`
    <div class="panel rust">
      <h2>The Pound</h2>
      <p>Scrap in, mongrels out. Offers roll with the week (seed ${e.seed}).</p>
    </div>
    ${s}
    <h3 style="margin:10px 0">Dogs — ${_} scrap</h3>
    <div class="doggrid">
      ${e.dogs.map((n,r)=>`
        <div class="dogcard">
          ${ee(n,200)}
          <div class="name display">${u(n.name)}</div>
          <div class="mono-sm">${u(C[n.strain].name)} — ${u(C[n.strain].trait)}</div>
          <div class="stats">
            <span class="chip grit">GRIT ${C[n.strain].base.grit+n.grit}</span>
            <span class="chip fang">FANG ${C[n.strain].base.fang+n.fang}</span>
            <span class="chip flea">FLEA ${C[n.strain].base.flea+n.flea}</span>
          </div>
          <div class="order-list">${n.biteOrder.map(a=>`<span class="chip trick">${u(x[a].name)}</span>`).join("")}</div>
          <div class="btnrow">
            <button class="btn small lime" data-act="buy-dog" data-i="${r}" ${t.kennel.dogs.length>=4?"disabled":""}>buy — ${_}</button>
          </div>
        </div>`).join("")}
    </div>
    <h3 style="margin:10px 0">Trick lessons — ${Q} scrap</h3>
    <div class="panel">
      ${e.tricks.map(n=>`<div><b>${u(x[n].name)}</b> — ${u(x[n].text)}</div>`).join("")}
      <div class="btnrow">
        <button class="btn violet" data-act="teach-start">teach one</button>
        <button class="btn secondary" data-act="pound-rotate" ${t.scrap<U?"disabled":""}>Rattle the cage — ${U} scrap</button>
      </div>
    </div>`}function yt(){if(!l)return G();const t=l.seasonState;if(!t)return`
      <div class="panel gold">
        <h2>Bone Bracket — ${u(O[l.division])}</h2>
        <p>8 weeks. Ghost kennels with their own schedules, scars, and standings.
        Win, and the Pit pays scrap. Top two climb divisions; bottom two fall.</p>
        <div class="btnrow">
          <button class="btn lime" data-act="season-start">Start Season ${l.season}</button>
        </div>
      </div>`;const s=Ne(t).map(o=>`<tr class="${o.isPlayer?"me":""}">
      <td>${u(o.name)}</td><td>${o.played}</td><td>${o.wins}</td><td>${o.draws}</td><td>${o.losses}</td><td><b>${o.points}</b></td>
    </tr>`).join(""),n=t.playerResults.slice().reverse().map(o=>`<div class="mail-entry ${o.winner===0?"sent":o.winner===1?"bad":""}">
      <b>W${o.week+1}</b> vs ${u(o.opponentName)} —
      ${o.winner===0?'<span class="ok">WIN</span>':o.winner===1?'<span class="err">LOSS</span>':"DRAW"}
      (${o.rounds} rounds, log ${u(o.logHash)}, +${o.scrapEarned} scrap)
      <div class="mono-sm">${u(o.packetCode.slice(0,96))}…</div>
    </div>`).join(""),r=t.week<W?t.ghosts[t.schedule[t.week]]:null,a=t.done?`<div class="verdict-banner ${l.lastClose&&l.lastClose.relegated?"lost":""}">
        <div class="display">${l.lastClose?u(l.lastClose.summary):"Season complete"}</div>
        <div class="btnrow" style="justify-content:center">
          <button class="btn lime" data-act="season-close">Claim results &amp; roll next season</button>
        </div>
      </div>`:"";return`
    <div class="panel gold">
      <h2>Bone Bracket — ${u(O[t.division])} · Season ${t.season}</h2>
      <p>Week ${Math.min(t.week+1,W)} of ${W} · your scrap: <b>${t.scrap}</b></p>
      ${r?`<div class="btnrow"><button class="btn lime" data-act="season-play">Play Week ${t.week+1} vs ${u(r.kennel.name)}</button></div>`:""}
    </div>
    ${a}
    <div class="panel">
      <h3>Standings</h3>
      <div class="table-scroll">
      <table>
        <tr><th>kennel</th><th>P</th><th>W</th><th>D</th><th>L</th><th>pts</th></tr>
        ${s}
      </table>
      </div>
    </div>
    <div class="panel">
      <h3>Season receipts</h3>
      ${n||'<p class="mono-sm">no bouts yet — the schedule is waiting.</p>'}
    </div>`}function $t(){if(!l)return G();const t=I(l.kennel),e=l.mail.map(s=>`<div class="mail-entry ${s.ok?"sent":"bad"}">
        <b>${u(s.label)}</b> ${s.ok?'<span class="ok">✓</span>':'<span class="err">✗</span>'}
        <div>${u(s.note)}</div>
        <div class="mono-sm">${u(s.code.slice(0,110))}…</div>
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
      <textarea id="opp-code" rows="4" placeholder="paste their kennel code here">${u(V.oppCode)}</textarea>
      <div class="btnrow"><button class="btn lime" data-act="challenge">fight it (deterministic bout)</button></div>
    </div>
    <div class="panel">
      <h3>Audit a Verdict Packet</h3>
      <textarea id="opp-packet" rows="4" placeholder="paste a verdict packet here — the Pit re-derives it">${u(V.oppPacket)}</textarea>
      <div class="btnrow"><button class="btn violet" data-act="audit">re-derive the verdict</button></div>
    </div>
    <div class="panel">
      <h3>Pit log</h3>
      ${e||'<p class="mono-sm">empty — mail something.</p>'}
    </div>`}function St(){if(!d)return G();const t=d.result.events[Math.max(0,d.idx-1)],e=d.idx>=d.result.events.length,s=d.result.winner,n=(i,c,g)=>{const h=we(d.idx,i,c.name,C[c.strain].base.grit+c.grit),S=C[c.strain].base.grit+c.grit,E=Math.max(0,Math.min(100,h/S*100));return`
      <div class="fighter ${i===1?"enemy":""} ${g?"dead":""}">
        ${ee(c,64)}
        <div style="flex:1">
          <b>${u(c.name)}</b>
          <div class="hpbar"><div class="fill ${E<30?"low":""}" style="width:${E}%"></div></div>
          <div class="mono-sm">${h}/${S} grit</div>
        </div>
      </div>`},r=i=>`
    <div class="team-col">
      <h3>${u(d.teamNames[i])}</h3>
      ${d.teams[i].map(c=>n(i,c,we(d.idx,i,c.name,0)<=0&&d.idx>0)).join("")}
    </div>`,a=d.result.events.slice(0,d.idx).map((i,c,g)=>{const h=g[c-1],S=!h||h.round!==i.round?[`<div class="line hot">— ROUND ${i.round} —</div>`]:[],E=i.kind==="death"?"bad":i.kind==="heal"?"good":c===g.length-1?"hot":"";return[...S,`<div class="line ${E}">[${i.round}] ${u(i.text)}</div>`]}).flat().join(""),o=e?`<div class="verdict-banner ${s===1?"lost":s===-1?"draw":""}">
        <div class="display">${s===-1?"Draw":u(s===0?d.teamNames[0]:d.teamNames[1])} takes it</div>
        <p>${d.result.rounds} rounds · log ${u(d.result.logHash)}</p>
        ${d.scarred.length?`<p class="scarline">scars: ${d.scarred.map(i=>`${u(i.dog)} → ${u(i.scar.name)}`).join(", ")}</p>`:""}
        <div class="btnrow" style="justify-content:center">
          <button class="btn cyan" data-act="copy-packet">copy verdict packet</button>
          <button class="btn" data-act="bout-exit">back</button>
        </div>
      </div>`:"";return`
    <div class="panel gold"><h2>${u(d.label)}</h2>
      <p class="mono-sm">round ${t?.round??0} · deterministic replay · every verdict keeps its receipts</p></div>
    <div class="battle-stage">
      ${r(0)}
      <div class="center-col">
        <div class="trick-flash">${u(t?t.text.slice(0,60):"The Pit locks the gate.")}</div>
        <div class="btnrow" style="justify-content:center">
          <button class="btn small ${d.playing?"danger":"lime"}" data-act="bout-toggle">${d.playing?"pause":"play"}</button>
          <button class="btn small secondary" data-act="bout-step">step</button>
          <button class="btn small secondary" data-act="bout-skip">skip</button>
        </div>
        <div class="ticker" id="ticker">${a}</div>
      </div>
      ${r(1)}
    </div>
    ${o}`}ne.addEventListener("input",t=>{const e=t.target;e instanceof HTMLTextAreaElement&&e.id==="opp-code"&&(V.oppCode=e.value),e instanceof HTMLTextAreaElement&&e.id==="opp-packet"&&(V.oppPacket=e.value)});ne.addEventListener("click",t=>{const e=t.target.closest("[data-act]");if((!e||!l)&&!e)return;const s=e.dataset.act,n=Number(e.dataset.i??"-1");switch(s){case"dismiss":Z="";break;case"new-game":(!l||confirm("Start a new kennel? This replaces your current career."))&&kt();break;case"continue":M="kennel";break;case"goto":M=e.dataset.screen;break;case"rename":{const a=prompt("Kennel name",l.kennel.name),o=prompt("Kennel motto",l.kennel.motto);a&&(l.kennel.name=a.slice(0,40)),o&&(l.kennel.motto=o.slice(0,80)),w();break}case"dog-up":if(n>0){const a=l.kennel.dogs;[a[n-1],a[n]]=[a[n],a[n-1]],w()}break;case"dog-down":if(n<l.kennel.dogs.length-1){const a=l.kennel.dogs;[a[n+1],a[n]]=[a[n],a[n+1]],w()}break;case"dog-release":l.kennel.dogs.length>1&&confirm(`Release ${l.kennel.dogs[n].name} into the night?`)&&(l.kennel.dogs.splice(n,1),w());break;case"buy-dog":{const o=Ae(l.poundSeed,Re(l)).dogs[n];if(!o)break;l.scrap<_?v("Not enough scrap. The Pound does not do credit."):l.kennel.dogs.length>=4?v("Kennel is full — release a dog first."):(l.scrap-=_,l.kennel.dogs.push({...o,id:`${o.id}-${l.boutCounter}`}),w(),v(`${o.name} joins the kennel.`));break}case"pound-rotate":l.scrap<U?v("Not enough scrap to rattle the cage."):(l.scrap-=U,l.poundSeed+=1,w(),v("The cage rattles — new dogs and tricks."));break;case"teach-start":N="0";break;case"teach-cancel":N=null;break;case"teach":{const a=Number(N??"0"),o=l.kennel.dogs[a],i=e.dataset.trick;if(!o)break;if(l.scrap<Q)v("Not enough scrap for a lesson.");else{const c=pt(o,i);c.ok?(l.scrap-=Q,w(),v(`${o.name} learned ${x[i].name}.`),N=null):v(c.error??"the trick will not stick")}break}case"teach-pick":n>=0&&n<l.kennel.dogs.length&&(N=String(n));break;case"trick-up":{if(n<0||n>=l.kennel.dogs.length)break;const a=l.kennel.dogs[n],o=Number(e.dataset.j??"-1"),i=ke(a,o,"up");i.ok?w():v(i.error??"the trick will not move");break}case"trick-down":{if(n<0||n>=l.kennel.dogs.length)break;const a=l.kennel.dogs[n],o=Number(e.dataset.j??"-1"),i=ke(a,o,"down");i.ok?w():v(i.error??"the trick will not move");break}case"trick-remove":{if(n<0||n>=l.kennel.dogs.length)break;const a=l.kennel.dogs[n],o=Number(e.dataset.j??"-1"),i=a.biteOrder[o],c=ht(a,o);c.ok?(w(),v(`${a.name} forgot ${x[i]?.name??"a trick"} — slot opens.`)):v(c.error??"the trick will not budge");break}case"season-start":{l.seasonState=Pe(l.kennel,B(`muttpit|${l.season}|${l.boutCounter}`),l.division,l.season,l.scrap),l.lastClose=null,w();break}case"season-play":{const a=l.seasonState;if(!a||a.done)break;const o=ct(a);l.seasonState=o.state,l.scrap=o.state.scrap,w();const i=o.state.playerResults[o.state.playerResults.length-1];ve(o.result,[a.player.name,i.opponentName],[a.player.dogs.slice(0,3),a.ghosts.find(c=>c.id===i.opponentId)?.kennel.dogs.slice(0,3)??[]],o.packetCode,`Bone Bracket — Week ${i.week+1} vs ${i.opponentName}`,"league",o.scarred);break}case"season-close":{const a=l.seasonState;if(!a||!a.done)break;const o=dt(a);l.lastClose=o,l.scrap=o.state.scrap,l.division=o.state.division,l.season+=1,l.seasonState=ut(o.state),w(),v(o.summary);break}case"challenge":{const a=document.getElementById("opp-code"),o=q(a?.value??"");if(!o.ok||!o.kennel){v(o.error??"that code will not decode");break}const i=B(`${I(l.kennel)}|${I(o.kennel)}|${l.boutCounter}`),{result:c,packet:g}=Te(l.kennel,o.kennel,i),h=Ce(g);ve(c,[l.kennel.name,o.kennel.name],[l.kennel.dogs.slice(0,3),o.kennel.dogs.slice(0,3)],h,`Mailed challenge vs ${o.kennel.name}`,"mailbox",[],{kind:"challenge",label:`challenge vs ${o.kennel.name}`});break}case"audit":{const a=document.getElementById("opp-packet"),o=Xe(a?.value??"");if(o.ok&&o.verdict){const i=o.verdict;l.mail.unshift({kind:"audit",label:"verdict audit",code:a.value.trim(),ok:!0,note:`re-derived clean: log ${o.replayedHash} — winner declared, receipts intact`}),v(`Audit CLEAN — replayed log ${o.replayedHash} matches the packet (winner recorded, ${i.rounds} rounds).`)}else l.mail.unshift({kind:"audit",label:"verdict audit",code:(a?.value??"").trim().slice(0,400),ok:!1,note:o.error??"audit failed"}),v(`Audit REJECTED — ${o.error??"unknown"}`);l.mail=l.mail.slice(0,30),w();break}case"copy-code":{const a=document.getElementById("my-code");ye(a?.value??""),v("Kennel code copied. Mail it to someone with a kennel.");break}case"copy-packet":ye(d?.packetCode??""),v("Verdict packet copied. Anyone can audit it.");break;case"bout-toggle":if(d){if(d.idx>=d.result.events.length)break;d.playing=!d.playing}break;case"bout-step":d&&d.idx<d.result.events.length?(d.playing=!1,d.idx+=1):d&&X();break;case"bout-skip":d&&(d.idx=d.result.events.length,X());break;case"bout-exit":d?.timer&&window.clearInterval(d.timer),M=d?.returnScreen??"kennel",d=null;break}J();const r=document.getElementById("ticker");r&&(r.scrollTop=r.scrollHeight)});async function ye(t){try{await navigator.clipboard.writeText(t)}catch{const e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}window.__muttpit={version:1,screen:()=>M,kennelCode:()=>l?I(l.kennel):"",lastPacket:()=>d?.packetCode??"",setOppCode:t=>{const e=document.getElementById("opp-code");e&&(e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})))},setOppPacket:t=>{const e=document.getElementById("opp-packet");e&&(e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})))}};J();
