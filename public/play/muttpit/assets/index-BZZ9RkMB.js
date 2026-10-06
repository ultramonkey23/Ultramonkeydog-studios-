(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(a){if(a.ep)return;a.ep=!0;const o=s(a);fetch(a.href,o)}})();function C(t){let e=2166136261;for(let s=0;s<t.length;s++)e^=t.charCodeAt(s),e=Math.imul(e,16777619)>>>0;return e>>>0}function A(t){let e=t>>>0;return()=>{e=e+1831565813>>>0;let s=e;return s=Math.imul(s^s>>>15,s|1),s^=s+Math.imul(s^s>>>7,s|61),((s^s>>>14)>>>0)/4294967296}}function x(t,e){return Math.floor(t()*e)}function Ke(t){return x(t,3)-1}const T={mongrel:{id:"mongrel",name:"Mongrel",blurb:"Ninety percent street, ten percent something else.",base:{grit:13,fang:5,flea:4},trait:"Scrappy — first hit each bout deals 2 less."},bonehound:{id:"bonehound",name:"Bonehound",blurb:"Already died once. Filed a complaint.",base:{grit:11,fang:5,flea:4},trait:"Undead — starts each bout with SHIELD 3."},grem:{id:"grem",name:"Grem",blurb:"Small, loud, legally a hazard.",base:{grit:10,fang:5,flea:4},trait:"Volatile — +2 FANG while below half GRIT."},cur:{id:"cur",name:"Cur",blurb:"Bites first, negotiates never.",base:{grit:12,fang:4,flea:4},trait:"Bleeder — its attacks apply BLEED 1."},brute:{id:"brute",name:"Brute",blurb:"Solves problems by becoming a larger problem.",base:{grit:19,fang:7,flea:3},trait:"Heavy — takes 2 less from barrage tricks."},pupp:{id:"pupp",name:"Pupp",blurb:"Fast enough to regret everything later.",base:{grit:10,fang:5,flea:7},trait:"Quick — acts first on any tick tie."}};function b(t,e,s,n,a,o=[]){return{id:t,name:e,text:s,target:n,effects:a,tags:o}}const v={snap:b("snap","Snap","Front enemy takes FANG damage.","enemyFront",[{kind:"damage",power:0,fromFang:!0}]),maul:b("maul","Maul","Front enemy takes FANG + 2.","enemyFront",[{kind:"damage",power:2,fromFang:!0}]),backbite:b("backbite","Back Bite","Back enemy takes FANG - 1.","enemyBack",[{kind:"damage",power:-1,fromFang:!0}]),flurry:b("flurry","Flurry","Front enemy takes two hits of FANG - 2.","enemyFront",[{kind:"damage",power:-2,fromFang:!0},{kind:"damage",power:-2,fromFang:!0}]),fleabite:b("fleabite","Flea Bite","Front enemy takes 1 and gains BLEED 2.","enemyFront",[{kind:"damage",power:1},{kind:"apply",power:2,status:"bleed"}]),tickharvest:b("tickharvest","Tick Harvest","Front enemy takes FANG + 2 per BLEED on it.","enemyFront",[{kind:"damage",power:0,fromFang:!0},{kind:"damage",power:2,perBleedOnTarget:!0}],["blood"]),bonecrack:b("bonecrack","Bone Crack","Front enemy takes FANG and gains MARKED 1.","enemyFront",[{kind:"damage",power:0,fromFang:!0},{kind:"apply",power:1,status:"marked"}]),spite:b("spite","Spite","Front enemy takes FANG + half your missing GRIT.","enemyFront",[{kind:"damage",power:0,fromFang:!0,perOwnMissingGrit:!0}],["spite"]),howl:b("howl","Howl","All allies gain RAGE 1.","allAllies",[{kind:"apply",power:1,status:"rage"}],["pack"]),cower:b("cower","Cower","Gain SHIELD 3.","self",[{kind:"shield",power:3}]),boneshield:b("boneshield","Bone Shield","Lowest-GRIT ally gains SHIELD 4.","allyLow",[{kind:"shield",power:4}]),secondwind:b("secondwind","Second Wind","Heal 5.","self",[{kind:"heal",power:5}],["blood"]),lickwounds:b("lickwounds","Lick Wounds","Lowest-GRIT ally heals 4.","allyLow",[{kind:"heal",power:4}],["blood"]),whiffle:b("whiffle","Whiffle Barrage","All enemies take 3.","allEnemies",[{kind:"damageAll",power:3}],["barrage"]),packpounce:b("packpounce","Pack Pounce","Front enemy takes FANG + 2 per other living ally.","enemyFront",[{kind:"damage",power:0,fromFang:!0,perOtherAlly:!0}],["pack"]),playdead:b("playdead","Play Dead","Gain DODGE 1.","self",[{kind:"apply",power:1,status:"dodge"}]),countersnarl:b("countersnarl","Counter Snarl","Gain SHIELD 2 and RAGE 1.","self",[{kind:"shield",power:2},{kind:"apply",power:1,status:"rage"}]),mudtoss:b("mudtoss","Mud Toss","Front enemy gains MARKED 2.","enemyFront",[{kind:"apply",power:2,status:"marked"}]),goad:b("goad","Goad","Front enemy gains RAGE 2 and COWER 2.","enemyFront",[{kind:"apply",power:2,status:"rage"},{kind:"apply",power:2,status:"cower"}]),shriek:b("shriek","Shriek","All enemies gain BLEED 1.","allEnemies",[{kind:"apply",power:1,status:"bleed"}],["barrage","blood"]),marrow:b("marrow","Marrow","Heal 3 and gain RAGE 1.","self",[{kind:"heal",power:3},{kind:"apply",power:1,status:"rage"}],["blood"]),sic:b("sic","Sic 'Em","Front enemy takes FANG + 1, +2 more if bleeding.","enemyFront",[{kind:"damage",power:1,fromFang:!0},{kind:"damage",power:2,perBleedOnTarget:!0}],["blood"]),rally:b("rally","Rally","All allies gain SHIELD 2.","allAllies",[{kind:"shield",power:2}],["pack"]),verdict:b("verdict","The Pit Decides","Front enemy takes FANG + 3; gain COWER 1.","enemyFront",[{kind:"damage",power:3,fromFang:!0},{kind:"apply",power:1,status:"cower"}]),goForTheEyes:b("goForTheEyes","Go For The Eyes","Front enemy takes 2 and gains COWER 1.","enemyFront",[{kind:"damage",power:2},{kind:"apply",power:1,status:"cower"}])},We=Object.keys(v),ie=4,q=3,le=60;function _e(...t){return C(t.join("|"))}const ce=["#b4532a","#8a6f4e","#e8dcc4","#5c4632","#6b705c","#a3a388","#c98a4b","#7a5c3e"];function Ue(t){return{mongrel:"MNG",bonehound:"BNH",grem:"GRM",cur:"CUR",brute:"BRT",pupp:"PUP"}[t]}function Y(t,e=120){const s=_e(t.name,t.strain,t.biteOrder.join(","),t.scars.length),n=ce[Math.abs(s)%ce.length],a=Math.abs(s>>3)%3,o=Math.abs(s>>6)%3,r=Math.abs(s>>9)%3,i=18+Math.abs(s>>12)%10,d={mongrel:{bodyRx:38,bodyRy:22,bodyCy:92,headRx:30,headRy:30,headCy:58},bonehound:{bodyRx:34,bodyRy:20,bodyCy:93,headRx:25,headRy:31,headCy:57},grem:{bodyRx:32,bodyRy:18,bodyCy:94,headRx:28,headRy:24,headCy:62},cur:{bodyRx:34,bodyRy:19,bodyCy:93,headRx:25,headRy:29,headCy:58},brute:{bodyRx:44,bodyRy:27,bodyCy:91,headRx:35,headRy:32,headCy:58},pupp:{bodyRx:29,bodyRy:17,bodyCy:95,headRx:24,headRy:25,headCy:61}}[t.strain],k=t.strain==="bonehound"?`<path d="M47 87 v18 M58 84 v23 M69 84 v23 M80 87 v18" stroke="#e8dcc4" stroke-width="3" opacity=".8"/>
         <path d="M49 42 q16 -14 32 0" fill="none" stroke="#e8dcc4" stroke-width="4" opacity=".65"/>`:t.strain==="grem"?`<path d="M48 43 l8 7 -6 7 10 7 -6 8" fill="none" stroke="#f5b83d" stroke-width="3" stroke-linecap="square"/>
           <path d="M86 38 l8 10 -9 -2 6 10" fill="none" stroke="#e5484d" stroke-width="3"/>`:t.strain==="cur"?`<path d="M37 45 l18 -8 M81 41 l12 8" stroke="#120c08" stroke-width="4"/>
             <path d="M82 76 l12 7" stroke="#e5484d" stroke-width="3"/>`:t.strain==="brute"?`<path d="M31 52 q34 -18 68 0" fill="none" stroke="#120c08" stroke-width="7"/>
               <path d="M34 91 h62" stroke="#120c08" stroke-width="5" opacity=".55"/>`:t.strain==="pupp"?`<path d="M54 40 q11 -8 22 0" fill="none" stroke="#e8dcc4" stroke-width="4"/>
                 <circle cx="91" cy="91" r="4" fill="#f5b83d" stroke="#120c08" stroke-width="2"/>`:'<path d="M38 84 q12 8 24 0" fill="none" stroke="#e8dcc4" stroke-width="3" opacity=".65"/>',m=a===0?`<path d="M30 42 L38 12 L52 38 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>
         <path d="M90 42 L82 12 L68 38 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>`:a===1?`<path d="M28 40 Q12 20 24 58 Q34 52 34 42 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>
           <path d="M92 40 Q108 20 96 58 Q86 52 86 42 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>`:`<path d="M32 44 L28 18 L52 34 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>
           <path d="M88 44 L92 18 L68 34 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>`,F=r===0?`<circle cx="46" cy="56" r="5" fill="#e8dcc4" stroke="#120c08" stroke-width="2"/><circle cx="74" cy="56" r="5" fill="#e8dcc4" stroke="#120c08" stroke-width="2"/>
         <circle cx="47" cy="57" r="2" fill="#120c08"/><circle cx="75" cy="57" r="2" fill="#120c08"/>`:r===1?`<circle cx="46" cy="56" r="5" fill="#f5b83d" stroke="#120c08" stroke-width="2"/><circle cx="74" cy="56" r="5" fill="#f5b83d" stroke="#120c08" stroke-width="2"/>
           <circle cx="46" cy="56" r="2" fill="#120c08"/><circle cx="74" cy="56" r="2" fill="#120c08"/>`:`<path d="M40 54 L52 52" stroke="#120c08" stroke-width="4"/><path d="M68 52 L80 54" stroke="#120c08" stroke-width="4"/>
           <circle cx="46" cy="58" r="3" fill="#120c08"/><circle cx="74" cy="58" r="3" fill="#120c08"/>`,B=o===0?`<path d="M96 88 Q118 70 112 46" fill="none" stroke="${n}" stroke-width="9" stroke-linecap="round"/>`:o===1?`<path d="M96 88 Q112 82 118 92" fill="none" stroke="${n}" stroke-width="9" stroke-linecap="round"/>`:`<path d="M96 88 L114 58 L108 84 Z" fill="${n}" stroke="#120c08" stroke-width="3"/>`,p=t.scars.slice(0,4).map((g,h)=>`<path d="M${34+h*14} ${86+h%2*6} l8 8 M${42+h*14} ${86+h%2*6} l-8 8" stroke="#e5484d" stroke-width="2.5" stroke-linecap="round"/>`).join("");return`<svg class="portrait strain-${t.strain}" role="img" aria-label="${T[t.strain].name} portrait of ${t.name}" viewBox="0 0 130 120" width="${e}" height="${e*120/130}" xmlns="http://www.w3.org/2000/svg">
  <rect width="130" height="120" fill="#1c1410"/>
  ${B}
  <ellipse cx="65" cy="${d.bodyCy}" rx="${d.bodyRx}" ry="${d.bodyRy}" fill="${n}" stroke="#120c08" stroke-width="3"/>
  ${m}
  <ellipse cx="65" cy="${d.headCy}" rx="${d.headRx}" ry="${d.headRy}" fill="${n}" stroke="#120c08" stroke-width="3"/>
  ${F}
  ${k}
  <ellipse cx="65" cy="74" rx="${i/2}" ry="10" fill="#e8dcc4" stroke="#120c08" stroke-width="3"/>
  <ellipse cx="65" cy="68" rx="6" ry="4.5" fill="#120c08"/>
  <path d="M58 80 Q65 86 72 80" fill="none" stroke="#120c08" stroke-width="2.5" stroke-linecap="round"/>
  ${p}
  <rect x="2" y="2" width="34" height="15" fill="#120c08"/>
  <text x="6" y="13" font-family="monospace" font-size="10" fill="#f5b83d">${Ue(t.strain)}</text>
</svg>`}function Qe(t="#f5b83d",e=18){return`<svg width="${e}" height="${e}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" style="vertical-align:-3px">
  <circle cx="10" cy="13" r="5" fill="${t}" stroke="#120c08" stroke-width="1.5"/>
  <circle cx="4" cy="7" r="2.4" fill="${t}" stroke="#120c08" stroke-width="1.2"/>
  <circle cx="9" cy="4.5" r="2.4" fill="${t}" stroke="#120c08" stroke-width="1.2"/>
  <circle cx="14.5" cy="6" r="2.4" fill="${t}" stroke="#120c08" stroke-width="1.2"/>
</svg>`}function de(t,e){for(const s of[0,1]){const n=t[s].findIndex(a=>a.name===e);if(n>=0)return{team:s,slot:n}}return null}function qe(t){const e=t.match(/takes (\d+)/);return e?Number(e[1]):null}function Ze(t,e){const s=t.actor?de(e,t.actor):null,n=t.target?de(e,t.target):null;let a="none";return t.kind==="trick"?a="trick":t.kind==="death"?a="death":t.kind==="heal"?a="heal":t.kind==="status"?/plays dead/.test(t.text)?a="dodge":/shield eats/.test(t.text)?a="shield":a="status":t.kind==="hit"&&(a="hit"),{kind:a,damage:qe(t.text),actor:s,target:n}}function ue(t,e){if(!e)return 400;let s=340;switch(e.kind){case"trick":s=480;break;case"hit":s=220;break;case"death":s=950;break;case"status":s=360;break;case"heal":s=360;break;case"start":s=400;break;case"end":s=520;break;default:s=340}return t&&e&&e.round!==t.round&&(s+=520),s}function Re(t){const e=T[t.strain].base;let s=e.grit+t.grit,n=e.fang+t.fang,a=e.flea+t.flea;for(const o of t.scars)s+=o.dGrit,n+=o.dFang,a+=o.dFlea;return{grit:Math.max(4,s),fang:Math.max(1,n),flea:Math.max(1,a)}}function pe(t,e,s){const n=Re(t),a={bleed:0,shield:0,rage:0,cower:0,marked:0,dodge:0};return{dog:t,team:e,slot:s,hp:n.grit,maxHp:n.grit,fang:n.fang,flea:n.flea,statuses:a,trickIdx:0,scrappyUsed:!1,alive:!0}}function he(t){const e=t.filter(s=>s.alive);return e.sort((s,n)=>s.slot-n.slot),e[0]}function Ve(t){const e=t.filter(s=>s.alive);return e.sort((s,n)=>n.slot-s.slot),e[0]}function Je(t){const e=t.filter(s=>s.alive);if(e.length!==0)return e.sort((s,n)=>s.hp-n.hp||s.slot-n.slot),e[0]}function P(t){return t.filter(e=>e.alive).length}function ze(t){const e={};for(const s of t.fighters)e[`${s.team}:${s.dog.name}`]=Math.max(0,s.hp);return e}function S(t,e,s,n={}){t.events.push({round:t.round,kind:e,text:s,hp:ze(t),...n})}function Xe(t){const e=t.dog.strain==="grem"&&t.hp<t.maxHp*.75?2:0;return t.fang+e+t.statuses.rage}function ge(t,e,s,n,a={}){if(!s.alive)return;if(s.statuses.dodge>0){s.statuses.dodge-=1,S(t,"status",`${s.dog.name} plays dead — the hit whiffs.`,{actor:e?.dog.name,target:s.dog.name});return}let o=n;if(e&&(o+=e.statuses.rage-e.statuses.cower),e&&e.dog.strain==="mongrel"&&!s.scrappyUsed&&(s.scrappyUsed=!0,o-=2,S(t,"status",`${s.dog.name} is scrappy — shrugs 2 off its first hit.`,{actor:e.dog.name,target:s.dog.name})),a.barrage&&s.dog.strain==="brute"&&(o-=2,S(t,"status",`${s.dog.name} is heavy — shrugs 2 off the barrage.`,{actor:e?.dog.name,target:s.dog.name})),o+=s.statuses.marked,o+=Ke(t.rng),o<0&&(o=0),s.statuses.shield>0){const r=Math.min(s.statuses.shield,o);s.statuses.shield-=r,o-=r,r>0&&S(t,"status",`${s.dog.name}'s shield eats ${r}.`,{actor:e?.dog.name,target:s.dog.name})}o>0&&(s.hp-=o,S(t,"hit",`${s.dog.name} takes ${o}.`,{actor:e?.dog.name,target:s.dog.name}),s.hp<=0&&(s.hp=0,s.alive=!1,S(t,"death",`${s.dog.name} goes down.`,{actor:e?.dog.name,target:s.dog.name})))}function W(t,e,s,n){const a=t.fighters.filter(r=>r.team!==e.team),o=t.fighters.filter(r=>r.team===e.team);switch(n.kind){case"damage":{if(!s)return;let r=n.power+(n.fromFang?Xe(e):0);n.perBleedOnTarget&&(r+=n.power*(s.statuses.bleed||0)),n.perOtherAlly&&(r+=n.power*o.filter(i=>i.alive&&i!==e).length*2),n.perOwnMissingGrit&&(r+=Math.floor((e.maxHp-e.hp)/2)),e.dog.strain==="cur"&&(s.statuses.bleed+=1,S(t,"status",`${s.dog.name} starts bleeding.`,{actor:e.dog.name,target:s.dog.name})),ge(t,e,s,r);break}case"damageAll":{for(const r of a)r.alive&&ge(t,e,r,n.power,{barrage:!0});break}case"heal":{const r=s??e;if(!r.alive)return;r.hp=Math.min(r.maxHp,r.hp+n.power),S(t,"heal",`${r.dog.name} recovers ${n.power}.`,{actor:e.dog.name,target:r.dog.name});break}case"shield":{const r=s??e;if(!r.alive)return;r.statuses.shield+=n.power,S(t,"status",`${r.dog.name} gains SHIELD ${n.power}.`,{actor:e.dog.name,target:r.dog.name});break}case"apply":{if(n.status===void 0||!s||!s.alive)return;s.statuses[n.status]+=n.power,S(t,"status",`${s.dog.name} gains ${n.status.toUpperCase()} ${n.power}.`,{actor:e.dog.name,target:s.dog.name});break}}}function Ye(t,e,s){const n=s[e.team===0?1:0],a=s[e.team],o=e.dog.biteOrder,r=o.length>0?o[e.trickIdx%o.length]:"snap";e.trickIdx+=1;const i=v[r]??v.snap;S(t,"trick",`${e.dog.name} plays ${i.name}.`,{actor:e.dog.name});let d;switch(i.target){case"enemyFront":d=he(n);break;case"enemyBack":d=Ve(n);break;case"enemyAny":d=he(n);break;case"allEnemies":d=void 0;break;case"self":d=e;break;case"allyLow":d=Je(a)??e;break;case"allAllies":d=void 0;break}for(const k of i.effects)if(i.target==="allEnemies"&&(k.kind==="damageAll"||k.kind==="apply"))if(k.kind==="damageAll")W(t,e,void 0,k);else for(const m of n)m.alive&&W(t,e,m,k);else if(i.target==="allAllies")for(const m of a)m.alive&&W(t,e,m,k);else W(t,e,d,k)}function et(t,e){if(e.statuses.bleed>0){const s=e.statuses.bleed;e.hp-=s,S(t,"hit",`${e.dog.name} bleeds for ${s}.`,{actor:e.dog.name,target:e.dog.name}),e.hp<=0&&(e.hp=0,e.alive=!1,S(t,"death",`${e.dog.name} bleeds out.`,{target:e.dog.name}))}}function ae(t,e,s){const n=t.slice(0,q),a=e.slice(0,q),o=[...n.map((p,g)=>pe(p,0,g)),...a.map((p,g)=>pe(p,1,g))],r=[o.slice(0,n.length),o.slice(n.length)],i={fighters:o,events:[],rng:A(s>>>0),round:0};S(i,"start","The Pit locks the gate. Bout starts.",{actor:void 0});for(const p of o)p.dog.strain==="bonehound"&&(p.statuses.shield+=3,S(i,"status",`${p.dog.name} rattles to life with SHIELD 3.`,{actor:p.dog.name,target:p.dog.name}));for(;i.round<le;){i.round+=1;const p=o.filter(f=>f.alive).sort((f,y)=>y.flea-f.flea||(f.dog.strain==="pupp"?-1:0)-(y.dog.strain==="pupp"?-1:0)||f.slot-y.slot||(f.team===0?-1:1));for(const f of p){if(!f.alive||(et(i,f),!f.alive))continue;Ye(i,f,r);const y=P(r[0]),M=P(r[1]);if(y===0||M===0)break}const g=P(r[0]),h=P(r[1]);if(g===0||h===0)break}let d=-1;const k=P(r[0]),m=P(r[1]);if(k>0&&m===0)d=0;else if(m>0&&k===0)d=1;else if(i.round>=le){const p=f=>f.reduce((y,M)=>y+M.hp/Math.max(1,M.maxHp),0),g=p(r[0]),h=p(r[1]);d=g>h?0:h>g?1:-1,S(i,"end",`The Pit runs out of patience — judges' decision: ${d===-1?"draw":d===0?"team A":"team B"}.`)}S(i,"end",d===0?"Team A takes the bout.":d===1?"Team B takes the bout.":"The bout is a draw.");const F=[r[0].reduce((p,g)=>p+Math.max(0,g.hp),0),r[1].reduce((p,g)=>p+Math.max(0,g.hp),0)],B=o.filter(p=>p.alive).map(p=>({team:p.team,name:p.dog.name,hp:p.hp,maxHp:p.maxHp}));return{winner:d,rounds:i.round,events:i.events,logHash:tt(i.events),survivorHp:F,survivors:B}}function tt(t){const e=t.map(n=>`${n.round}|${n.kind}|${n.actor??""}|${n.target??""}|${n.text}`).join(`
`);let s=2166136261;for(let n=0;n<e.length;n++)s^=e.charCodeAt(n),s=Math.imul(s,16777619)>>>0;return s.toString(16).padStart(8,"0")}function Te(t){const e=[];t.length===0&&e.push("kennel is empty"),t.length>ie&&e.push(`kennel exceeds ${ie} dogs`);const s=new Set;for(const n of t){s.has(n.id)&&e.push(`duplicate dog id ${n.id}`),s.add(n.id),n.strain in T||e.push(`unknown strain ${n.strain}`);for(const o of n.biteOrder)o in v||e.push(`unknown trick ${o}`);n.biteOrder.length===0&&e.push(`${n.name} has an empty bite order`),Re(n).grit<4&&e.push(`${n.name} has no grit left`)}return{ok:e.length===0,errors:e}}const I="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";function nt(t){let e="";for(let s=0;s<t.length;s+=3){const n=t[s],a=s+1<t.length?t[s+1]:void 0,o=s+2<t.length?t[s+2]:void 0;if(e+=I[n>>2],e+=I[(n&3)<<4|(a??0)>>4],a===void 0||(e+=I[(a&15)<<2|(o??0)>>6],o===void 0))break;e+=I[o&63]}return e}function st(t){const e=t.replace(/[^A-Za-z0-9\-_]/g,""),s=new Map;for(let a=0;a<I.length;a++)s.set(I[a],a);const n=[];for(let a=0;a<e.length;a+=4){const o=s.get(e[a])??0,r=s.get(e[a+1])??0,i=a+2<e.length?s.get(e[a+2]):void 0,d=a+3<e.length?s.get(e[a+3]):void 0;if(n.push(o<<2|r>>4),i===void 0||(n.push((r&15)<<4|i>>2),d===void 0))break;n.push((i&3)<<6|d)}return n}function Ee(t){const e=[];for(let s=0;s<t.length;s++){let n=t.charCodeAt(s);n<128?e.push(n):n<2048?e.push(192|n>>6,128|n&63):e.push(224|n>>12,128|n>>6&63,128|n&63)}return nt(e)}function Ce(t){const e=st(t);let s="";for(let n=0;n<e.length;n++){const a=e[n];a<128?s+=String.fromCharCode(a):a<224?s+=String.fromCharCode((a&31)<<6|e[++n]&63):s+=String.fromCharCode((a&15)<<12|(e[++n]&63)<<6|e[++n]&63)}return s}function Be(t){return`${t}.${C(t).toString(16)}`}function Ne(t){const e=t.lastIndexOf(".");if(e<0)return{ok:!1,payload:""};const s=t.slice(0,e),n=t.slice(e+1);return{ok:C(s).toString(16)===n,payload:s}}function H(t){const e=Te(t.dogs);if(!e.ok)throw new Error(`refusing to encode invalid kennel: ${e.errors.join("; ")}`);return Ee(Be(JSON.stringify(t)))}function ne(t){try{const{ok:e,payload:s}=Ne(Ce(t.trim()));if(!e)return{ok:!1,error:"checksum failed — the Pit does not accept tampered codes"};const n=JSON.parse(s);if(n.v!==1)return{ok:!1,error:"unknown code version"};const a=Te(n.dogs);return a.ok?{ok:!0,kennel:n}:{ok:!1,error:a.errors.join("; ")}}catch{return{ok:!1,error:"not a kennel code"}}}function at(t,e,s){return C(`${t}|${e}|${s}`)}function Oe(t,e,s){const n=H(t),a=H(e),o=at(n,a,s),r=ae(t.dogs,e.dogs,o),i=`${t.name} vs ${e.name}: ${r.winner===-1?"draw":r.winner===0?t.name:e.name} in ${r.rounds} rounds (${r.logHash})`,d={v:1,seed:o,a:n,b:a,winner:r.winner,rounds:r.rounds,logHash:r.logHash,summary:i};return{result:r,packet:d,codeA:n,codeB:a}}function Ae(t){return Ee(Be(JSON.stringify(t)))}function ot(t){try{const{ok:e,payload:s}=Ne(Ce(t.trim()));if(!e)return{ok:!1,error:"checksum failed — forged verdicts smell like that"};const n=JSON.parse(s);return n.v!==1?{ok:!1,error:"unknown packet version"}:{ok:!0,packet:n}}catch{return{ok:!1,error:"not a verdict packet"}}}function rt(t){const e=ot(t);if(!e.ok||!e.packet)return{ok:!1,error:e.error};const s=e.packet,n=ne(s.a),a=ne(s.b);if(!n.ok||!n.kennel||!a.ok||!a.kennel)return{ok:!1,error:"packet references a kennel that will not decode"};const o=ae(n.kennel.dogs,a.kennel.dogs,s.seed);return o.logHash!==s.logHash?{ok:!1,error:`replay hash mismatch: claimed ${s.logHash}, replayed ${o.logHash}`,replayedHash:o.logHash}:o.winner!==s.winner?{ok:!1,error:"replayed winner disagrees with the packet"}:{ok:!0,verdict:s,replayedHash:o.logHash}}const fe=["aggressive","defensive","trickster","pack","feral"],it={aggressive:["maul","snap","flurry","sic","packpounce","fleabite","tickharvest"],defensive:["bonecrack","cower","verdict","countersnarl","snap","rally","secondwind"],trickster:["mudtoss","goad","goForTheEyes","fleabite","tickharvest","shriek","playdead"],pack:["whiffle","howl","packpounce","rally","snap","shriek","lickwounds"],feral:["spite","marrow","backbite","fleabite","maul","cower"]},lt={aggressive:{grit:0,fang:1,flea:1},defensive:{grit:5,fang:3,flea:2},trickster:{grit:3,fang:4,flea:5},pack:{grit:3,fang:4,flea:4},feral:{grit:1,fang:1,flea:2}},ct=["mongrel","bonehound","grem","cur","brute","pupp"],dt=["Gnash","Rip","Snarl","Vex","Mange","Brut","Cinder","Howl","Gore","Rust","Bolt","Wheeze","Knuckle","Saint","Doctor","Comrade"],ut=["tooth","muzzle","leg","hound","cur","terrier","jaws","paws","tail","barker","bucket","widow","junior","the-third"],ke=["The Rust Yard","Sewer Saints","Gnash Estate","The Whiffle Club","Bucket Kennels","The Bone Trust","Widow's Mange","The Scrap Choir","Saint Gnash's Home","Comrade Cur's Pack"],me=["Bite first. File later.","We keep the receipts.","Loyalty is a muzzle made of paperwork.","Every dog has its day in court.","Lose small. Scar big.","The Pit decides.","Chewed up, spit out, promoted.","We came for the scrap and stayed for spite."];function N(t,e){return e[x(t,e.length)]}function pt(t,e,s,n){const a=N(t,ct),o=lt[e],i=(8+Math.round(s*4)+(n===0?2:0))/10,d=it[e],k=2+x(t,3),m=[];for(;m.length<k;){const F=x(t,3)===0?N(t,We):N(t,d);m.includes(F)||m.push(F)}return{id:`ghost-${e}-${n}-${x(t,1<<20)}`,name:`${N(t,dt)} ${N(t,ut)}`,strain:a,grit:Math.round(o.grit*i),fang:Math.round(o.fang*i),flea:Math.round(o.flea*i),biteOrder:m,scars:[]}}function ht(t,e,s=0){const n=A((t^e*2654435761)>>>0),a=fe[x(n,fe.length)],o=Math.min(.95,.25+n()*.6+Math.max(0,s)*.05),r=3+x(n,2),i=[];for(let d=0;d<r;d++)i.push(pt(n,a,o,d));return{id:`ghost-${e}-${t.toString(16)}`,name:N(n,ke),motto:N(n,me),personality:a,skill:o,kennel:{v:1,name:N(n,ke),motto:N(n,me),dogs:i}}}function gt(t,e,s=0){const n=[];for(let a=0;a<e;a++)n.push(ht(t,a,s));return n}const L=["Sewer Division","Bone Bracket","Crown Pit"],Q=8,Le=8,be=[{id:"chipped-fang",name:"Chipped Fang",text:"Bit something it shouldn't have.",dGrit:0,dFang:-1,dFlea:0},{id:"limp",name:"Limp",text:"Old knee, new problems.",dGrit:0,dFang:0,dFlea:-1},{id:"scar-tissue",name:"Scar Tissue",text:"Thicker for it.",dGrit:2,dFang:0,dFlea:0},{id:"missing-ear",name:"Missing Ear",text:"Hears the Pit better anyway.",dGrit:-2,dFang:0,dFlea:0},{id:"renown",name:"Renown",text:"The crowd knows the name now.",dGrit:0,dFang:1,dFlea:0},{id:"battle-sense",name:"Battle Sense",text:"Reads the bite order before it lands.",dGrit:0,dFang:0,dFlea:1}];function se(t){return{v:1,name:t.name,motto:t.motto,dogs:t.dogs.map(e=>({...e,biteOrder:[...e.biteOrder],scars:e.scars.map(s=>({...s}))}))}}function ft(t){const e=A(t>>>0),s=Array.from({length:Le},(n,a)=>a);for(let n=s.length-1;n>0;n--){const a=x(e,n+1);[s[n],s[a]]=[s[a],s[n]]}return s}function Pe(t,e,s,n,a=0){return{v:1,season:n,division:Math.max(0,Math.min(L.length-1,s)),seed:e>>>0,week:0,player:se(t),ghosts:gt(e,Le,Math.max(0,n-1+s)),schedule:ft(e),playerResults:[],ghostResults:[],scrap:a,done:!1}}function ve(t,e,s,n){return C(`${t.seed}|${e}|${s}|${n}`)}function _(t,e,s){const n=[];for(const a of t){const o=e?.3:.55;if(s()<o){const r=e?be.filter(d=>d.dGrit>=0&&d.dFang>=0&&d.dFlea>=0):be,i=r[x(s,r.length)];a.scars=[...a.scars,i],n.push({dog:a.name,scar:i})}}return n}function kt(t){if(t.done)throw new Error("season is over — start the next one");const e={...t,player:se(t.player),ghosts:t.ghosts.map(h=>({...h,kennel:se(h.kennel)})),playerResults:[...t.playerResults],ghostResults:[...t.ghostResults]},s=e.week,n=e.schedule[s],a=e.ghosts[n],{result:o,packet:r}=Oe(e.player,a.kennel,e.seed+s),i=Ae(r),d=o.winner===0,k=d?30:o.winner===-1?15:8;e.scrap+=k,e.playerResults.push({week:s,opponentId:a.id,opponentName:a.kennel.name,playerIsTeamA:!0,winner:o.winner===0?0:o.winner===1?1:-1,rounds:o.rounds,logHash:o.logHash,seed:r.seed,packetCode:i,scrapEarned:k});const m=A(r.seed),F=_(e.player.dogs,d,m);_(a.kennel.dogs,!d&&o.winner!==-1,m);const B=e.ghosts.map(h=>h.id),p=A(ve(e,s,"pair","up")),g=[...B];for(let h=g.length-1;h>0;h--){const f=x(p,h+1);[g[h],g[f]]=[g[f],g[h]]}for(let h=0;h+1<g.length;h+=2){const f=e.ghosts.find(E=>E.id===g[h]),y=e.ghosts.find(E=>E.id===g[h+1]);if(!f||!y)continue;const M=ae(f.kennel.dogs.slice(0,3),y.kennel.dogs.slice(0,3),ve(e,s,f.id,y.id));e.ghostResults.push({week:s,a:f.id,b:y.id,winner:M.winner===-1?"draw":M.winner===0?f.id:y.id});const K=A(M.logHash?C(M.logHash):1);_(f.kennel.dogs,M.winner===0,K),_(y.kennel.dogs,M.winner===1,K)}return e.week+=1,e.week>=Q&&(e.done=!0),{state:e,result:o,packet:r,packetCode:i,scarred:F}}function Ie(t){const e=new Map,s=(a,o,r)=>(e.has(a)||e.set(a,{id:a,name:o,isPlayer:r,played:0,wins:0,draws:0,losses:0,points:0}),e.get(a)),n=s("player",t.player.name,!0);for(const a of t.ghosts)s(a.id,a.kennel.name,!1);for(const a of t.playerResults){const o=s(a.opponentId,a.opponentName,!1);n.played+=1,o.played+=1,a.winner===0?(n.wins+=1,n.points+=3,o.losses+=1):a.winner===1?(o.wins+=1,o.points+=3,n.losses+=1):(n.draws+=1,o.draws+=1,n.points+=1,o.points+=1)}for(const a of t.ghostResults){const o=s(a.a,t.ghosts.find(i=>i.id===a.a)?.kennel.name??a.a,!1),r=s(a.b,t.ghosts.find(i=>i.id===a.b)?.kennel.name??a.b,!1);o.played+=1,r.played+=1,a.winner==="draw"?(o.draws+=1,r.draws+=1,o.points+=1,r.points+=1):a.winner===o.id?(o.wins+=1,o.points+=3,r.losses+=1):(r.wins+=1,r.points+=3,o.losses+=1)}return[...e.values()].sort((a,o)=>o.points-a.points||o.wins-a.wins||Number(o.isPlayer)-Number(a.isPlayer))}function mt(t){const e=Ie(t),s=e.findIndex(i=>i.isPlayer)+1,n=s<=2&&t.division<L.length-1,a=s>=e.length-1&&t.division>0,o=Math.max(20,120-s*12),r={...t,division:Math.max(0,Math.min(L.length-1,t.division+(n?1:a?-1:0))),scrap:t.scrap+o};return{state:r,finalTable:e,playerRank:s,promoted:n,relegated:a,scrapPayout:o,summary:`${r.player.name} finishes #${s} in ${L[t.division]} — ${n?"promoted":a?"relegated":"holds the line"}.`}}function bt(t){return Pe(t.player,C(`season|${t.season+1}|${t.seed}`),t.division,t.season+1,t.scrap)}const Z=40,V=25,ye=["Nubbins","Duchess","Big Sad","Officer Grime","Teeth","Little Riot","Baron Mange","Pockets","Saint Vitus","Cricket","Moms","Duke Flea","Bones","Feral Beth","Gasket","Wobbles"],we=["mongrel","bonehound","grem","cur","brute","pupp"];function Ge(t,e=0){const s=A(t>>>0),n=[],a=Math.min(6,Math.max(0,e));for(let i=0;i<3;i++){const d=we[x(s,we.length)],k=7+x(s,5)+a,m=1+x(s,Math.max(1,k-2)),F=1+x(s,Math.max(1,k-m)),B=Math.max(1,k-m-F),p=2+x(s,3),g=Object.keys(v),h=[];for(;h.length<p;){const f=g[x(s,g.length)];h.includes(f)||h.push(f)}n.push({id:`pound-${t}-${i}`,name:ye[(t+i*7)%ye.length],strain:d,grit:m,fang:F,flea:B,biteOrder:h,scars:[]})}const o=Object.keys(v),r=[];for(;r.length<3;){const i=o[x(s,o.length)];r.includes(i)||r.push(i)}return{seed:t>>>0,dogs:n,tricks:r}}function vt(t,e){return e in v?t.biteOrder.includes(e)?{ok:!1,error:"already knows it"}:t.biteOrder.length>=4?{ok:!1,error:"bite order is full"}:(t.biteOrder.push(e),{ok:!0}):{ok:!1,error:"the Pit has no such trick"}}function $e(t,e,s){const n=t.biteOrder.length;if(!Number.isInteger(e)||e<0||e>=n)return{ok:!1,error:"no such trick"};const a=s==="up"?e-1:e+1;if(a<0||a>=n)return{ok:!1,error:s==="up"?"already at the top of the order":"already at the bottom of the order"};const o=t.biteOrder;return[o[e],o[a]]=[o[a],o[e]],{ok:!0}}function yt(t,e){const s=t.biteOrder.length;return!Number.isInteger(e)||e<0||e>=s?{ok:!1,error:"no such trick"}:s<=1?{ok:!1,error:"every dog needs at least one trick"}:(t.biteOrder.splice(e,1),{ok:!0})}const J=5,He="muttpit.save.v1",oe=document.getElementById("app");let l=wt(),R=l?"kennel":"title",c=null,G=0,z="",O=null;const X={oppCode:"",oppPacket:""};function wt(){try{const t=localStorage.getItem(He);if(!t)return null;const e=JSON.parse(t);return e.v===1?e:null}catch{return null}}function $(){l&&localStorage.setItem(He,JSON.stringify(l))}function u(t){return t.replace(/[&<>"']/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[e])}function w(t){z=t}const xe=['Quig: "The monkeydog built the Pit. The Pit keeps the receipts."','Quig: "A real Muttpit is worth more than a fake Batomon."','Quig: "Scars are just stats the Pit signed."','Quig: "Mail your kennel. Let the verdict travel."','Quig: "What is not finished, the Pit will tell you."','Quig: "Every dog is a build. Never a vibe."'];function $t(){const t=(l?.boutCounter??0)%xe.length;return xe[t]}function xt(){return{v:1,name:"Bucket Kennels",motto:"Lose small. Scar big.",dogs:[U("Big Sad","brute",2,3,1,["maul","cower","snap"]),U("Nubbins","grem",1,4,3,["flurry","mudtoss"]),U("Pockets","cur",2,2,2,["fleabite","sic","snap"]),U("Wobbles","mongrel",3,2,3,["packpounce","howl"])]}}function U(t,e,s,n,a,o){return{id:`${t.toLowerCase().replace(/\W+/g,"-")}-${C(t+e)%9973}`,name:t,strain:e,grit:s,fang:n,flea:a,biteOrder:o,scars:[]}}function St(){l={v:1,kennel:xt(),scrap:150,division:0,season:1,seasonState:null,lastClose:null,mail:[],poundSeed:1,boutCounter:0},$(),R="kennel",w("Career opened. The Pound is already open.")}function Se(t,e,s,n,a,o,r=[],i){c={result:t,teamNames:e,teams:s,idx:0,playing:!0,timer:null,packetCode:n,label:a,returnScreen:o,scarred:r,record:i},R="bout",l&&(l.boutCounter+=1,$()),je()}function je(){c?.timer&&window.clearTimeout(c.timer),G++;const t=G,e=()=>{if(!c||t!==G||!c.playing)return;if(c.idx>=c.result.events.length){D();return}if(c.idx+=1,ee(),c.idx>=c.result.events.length){D();return}const n=c.result.events[c.idx-1],a=c.result.events[c.idx];c.timer=window.setTimeout(e,ue(n,a))};if(!c)return;if(c.idx>=c.result.events.length){D();return}const s=c.result.events[c.idx];c.timer=window.setTimeout(e,ue(null,s))}function D(){if(c){if(c.playing=!1,c.timer&&window.clearTimeout(c.timer),c.timer=null,c.record&&l){const t=c.result.winner===0;l.mail.unshift({kind:c.record.kind,label:c.record.label,code:c.packetCode,ok:t||c.result.winner===-1,note:`verdict: ${t?"your kennel":c.teamNames[1]} took it — log ${c.result.logHash}`}),l.mail=l.mail.slice(0,30),$()}ee()}}function Me(t,e,s,n){if(t<=0)return n;const a=c.result.events[Math.min(t,c.result.events.length)-1],o=`${e}:${s}`;return a?.hp&&o in a.hp?a.hp[o]:n}function ee(){const t=R==="title"?j():R==="kennel"?Mt():R==="pound"?Ft():R==="league"?Rt():R==="mailbox"?Tt():Et(),e=R==="title"||R==="bout"?"":`<div class="navbar">
      <button class="btn small secondary" data-act="goto" data-screen="kennel">Kennel</button>
      <button class="btn small secondary" data-act="goto" data-screen="pound">Pound</button>
      <button class="btn small secondary" data-act="goto" data-screen="league">Bone Bracket</button>
      <button class="btn small secondary" data-act="goto" data-screen="mailbox">Mailbox</button>
      <span style="flex:1"></span>
      <span class="scrap-counter">${l?.scrap??0} SCRAP</span>
    </div>`;oe.innerHTML=`
    ${e}
    ${z?`<div class="panel rust"><b>${u(z)}</b> <button class="btn small" data-act="dismiss">ok</button></div>`:""}
    ${t}
    <div class="quig">${u($t())} <span style="opacity:.6">v0.1 · every build leaves a receipt.</span></div>
  `}function j(){return`
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
      <div class="how-grid">
        <div><b>1 · BUILD</b><span>Keep up to 4 dogs. The first ${q} fight; front takes most direct pressure.</span></div>
        <div><b>2 · WRITE</b><span>Each dog follows a Bite Order. Reorder tricks to change what happens before the fight starts.</span></div>
        <div><b>3 · FIGHT</b><span>Bouts auto-resolve from exact builds. Watch the sequence, then adapt instead of clicking attacks.</span></div>
        <div><b>4 · CLIMB</b><span>Survive 8-week Bone Brackets, earn scars and scrap, or mail a kennel code to another player.</span></div>
      </div>
    </div>`}function re(t){return["front","mid","back"][t]??"bench"}function Mt(){if(!l)return j();const t=l.kennel,e=t.dogs.map((s,n)=>{const a=T[s.strain],o=u(re(n)),r=s.biteOrder.length;return`
      <div class="dogcard">
        ${Y(s,220)}
        <div class="name display">${u(s.name)} <span class="tag lime">${o}</span></div>
        <div class="mono-sm trait-line">${u(a.name)} — ${u(a.trait)}</div>
        <div class="stats">
          <span class="chip grit">GRIT ${a.base.grit+s.grit+s.scars.reduce((i,d)=>i+d.dGrit,0)}</span>
          <span class="chip fang">FANG ${a.base.fang+s.fang+s.scars.reduce((i,d)=>i+d.dFang,0)}</span>
          <span class="chip flea">FLEA ${a.base.flea+s.flea+s.scars.reduce((i,d)=>i+d.dFlea,0)}</span>
        </div>
        <div class="bite-label"><span>BITE ORDER</span><small>plays left → right, then loops ↻</small></div>
        <div class="order-editor">${s.biteOrder.map((i,d)=>`
          <div class="order-row">
            <span class="trick-chip"><span class="trick-step">${d+1}</span>${u(v[i]?.name??i)}</span>
            <button class="btn small secondary" data-act="trick-up" data-i="${n}" data-j="${d}" ${d===0?"disabled":""} aria-label="Move ${u(v[i]?.name??i)} earlier">↑</button>
            <button class="btn small secondary" data-act="trick-down" data-i="${n}" data-j="${d}" ${d===r-1?"disabled":""} aria-label="Move ${u(v[i]?.name??i)} later">↓</button>
            <button class="btn small danger" data-act="trick-remove" data-i="${n}" data-j="${d}" aria-label="Remove ${u(v[i]?.name??i)}">×</button>
            <span class="trick-help">${u(v[i]?.text??i)}</span>
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
      <h2>${u(t.name)} ${Qe("#120c08")}</h2>
      <p>"${u(t.motto)}"</p>
      <div class="btnrow">
        <button class="btn small secondary" data-act="rename">rename</button>
        <span class="tag cyan">${u(L[l.division])}</span>
        <span class="tag pink">season ${l.season}</span>
      </div>
      <div class="stat-key" aria-label="Stat meanings">
        <span><b>GRIT</b> life</span>
        <span><b>FANG</b> damage</span>
        <span><b>FLEA</b> speed</span>
      </div>
    </div>
    <div class="doggrid">${e}</div>
    <div class="panel">
      <span class="tag violet">the pit says</span>
      <p style="margin-top:8px"><b>Front takes most direct pressure.</b> Mid and back follow; the fourth dog is your bench. Move dogs to change position and use ↑↓ to rewrite each Bite Order. Scout the next Bone Bracket opponent before committing the week.</p>
    </div>`}function De(t){return t.season-1+t.division}function Ft(){if(!l)return j();const t=l,e=Ge(l.poundSeed,De(l)),s=O!==null?`<div class="panel bone">
          <b>Teach a trick — pick the dog</b>
          <div class="btnrow">
            ${l.kennel.dogs.map((n,a)=>`
              <button class="btn small ${Number(O)===a?"lime":"secondary"}" data-act="teach-pick" data-i="${a}">${u(n.name)} <span class="mono-sm">(${u(re(a))})</span></button>
            `).join("")}
          </div>
          <p class="mono-sm">teaching ${u(l.kennel.dogs[Number(O)]?.name??"?")} this turn.</p>
          <div class="btnrow">
            ${e.tricks.map(n=>{const a=v[n];return`<button class="btn small violet" data-act="teach" data-trick="${n}">${u(a.name)} — ${V} scrap</button>`}).join("")}
            <button class="btn small secondary" data-act="teach-cancel">cancel</button>
          </div>
          <p class="mono-sm">the Pound stocks ${e.tricks.map(n=>u(v[n].name)).join(", ")} this week.</p>
        </div>`:"";return`
    <div class="panel rust">
      <h2>The Pound</h2>
      <p>Scrap in, mongrels out. Offers roll with the week (seed ${e.seed}).</p>
    </div>
    ${s}
    <h3 style="margin:10px 0">Dogs — ${Z} scrap</h3>
    <div class="doggrid">
      ${e.dogs.map((n,a)=>`
        <div class="dogcard">
          ${Y(n,200)}
          <div class="name display">${u(n.name)}</div>
          <div class="mono-sm">${u(T[n.strain].name)} — ${u(T[n.strain].trait)}</div>
          <div class="stats">
            <span class="chip grit">GRIT ${T[n.strain].base.grit+n.grit}</span>
            <span class="chip fang">FANG ${T[n.strain].base.fang+n.fang}</span>
            <span class="chip flea">FLEA ${T[n.strain].base.flea+n.flea}</span>
          </div>
          <div class="order-list">${n.biteOrder.map(o=>`<span class="chip trick">${u(v[o].name)}</span>`).join("")}</div>
          <div class="btnrow">
            <button class="btn small lime" data-act="buy-dog" data-i="${a}" ${t.kennel.dogs.length>=4?"disabled":""}>buy — ${Z}</button>
          </div>
        </div>`).join("")}
    </div>
    <h3 style="margin:10px 0">Trick lessons — ${V} scrap</h3>
    <div class="panel">
      ${e.tricks.map(n=>`<div><b>${u(v[n].name)}</b> — ${u(v[n].text)}</div>`).join("")}
      <div class="btnrow">
        <button class="btn violet" data-act="teach-start">teach one</button>
        <button class="btn secondary" data-act="pound-rotate" ${t.scrap<J?"disabled":""}>Rattle the cage — ${J} scrap</button>
      </div>
    </div>`}function Rt(){if(!l)return j();const t=l.seasonState;if(!t)return`
      <div class="panel gold">
        <h2>Bone Bracket — ${u(L[l.division])}</h2>
        <p>8 weeks. Ghost kennels with their own schedules, scars, and standings.
        Win, and the Pit pays scrap. Top two climb divisions; bottom two fall.</p>
        <div class="btnrow">
          <button class="btn lime" data-act="season-start">Start Season ${l.season}</button>
        </div>
      </div>`;const s=Ie(t).map(i=>`<tr class="${i.isPlayer?"me":""}">
      <td>${u(i.name)}</td><td>${i.played}</td><td>${i.wins}</td><td>${i.draws}</td><td>${i.losses}</td><td><b>${i.points}</b></td>
    </tr>`).join(""),n=t.playerResults.slice().reverse().map(i=>`<div class="mail-entry ${i.winner===0?"sent":i.winner===1?"bad":""}">
      <b>W${i.week+1}</b> vs ${u(i.opponentName)} —
      ${i.winner===0?'<span class="ok">WIN</span>':i.winner===1?'<span class="err">LOSS</span>':"DRAW"}
      (${i.rounds} rounds, log ${u(i.logHash)}, +${i.scrapEarned} scrap)
      <div class="mono-sm">${u(i.packetCode.slice(0,96))}…</div>
    </div>`).join(""),a=t.week<Q?t.ghosts[t.schedule[t.week]]:null,o=a?`<div class="panel scout-panel">
        <div class="scout-head">
          <div><span class="tag pink">next in the pit</span><h3>${u(a.kennel.name)}</h3><p>"${u(a.kennel.motto)}"</p></div>
          <span class="tag violet">${u(a.personality)} pack</span>
        </div>
        <p class="scout-callout">Scout the exact build, then tune your lineup and Bite Orders before committing the week.</p>
        <div class="scout-grid">
          ${a.kennel.dogs.slice(0,q).map((i,d)=>{const k=T[i.strain];return`<div class="scout-dog">
              ${Y(i,88)}
              <div class="scout-copy">
                <b>${u(re(d))} · ${u(i.name)}</b>
                <div class="trait-line">${u(k.name)} — ${u(k.trait)}</div>
                <div class="stats"><span class="chip grit">GRIT ${k.base.grit+i.grit}</span><span class="chip fang">FANG ${k.base.fang+i.fang}</span><span class="chip flea">FLEA ${k.base.flea+i.flea}</span></div>
                <div class="scout-order">${i.biteOrder.map((m,F)=>`<span><b>${F+1}</b> ${u(v[m]?.name??m)}</span>`).join("")}</div>
              </div>
            </div>`}).join("")}
        </div>
        <div class="btnrow"><button class="btn secondary" data-act="goto" data-screen="kennel">Tune kennel</button><button class="btn lime" data-act="season-play">Fight week ${t.week+1}</button></div>
      </div>`:"",r=t.done?`<div class="verdict-banner ${l.lastClose&&l.lastClose.relegated?"lost":""}">
        <div class="display">${l.lastClose?u(l.lastClose.summary):"Season complete"}</div>
        <div class="btnrow" style="justify-content:center">
          <button class="btn lime" data-act="season-close">Claim results &amp; roll next season</button>
        </div>
      </div>`:"";return`
    <div class="panel gold">
      <h2>Bone Bracket — ${u(L[t.division])} · Season ${t.season}</h2>
      <p>Week ${Math.min(t.week+1,Q)} of ${Q} · your scrap: <b>${t.scrap}</b></p>
      ${a?`<p>Next: <b>${u(a.kennel.name)}</b> — scout the pack below before you lock the week.</p>`:""}
    </div>
    ${o}
    ${r}
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
    </div>`}function Tt(){if(!l)return j();const t=H(l.kennel),e=l.mail.map(s=>`<div class="mail-entry ${s.ok?"sent":"bad"}">
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
      <textarea id="opp-code" rows="4" placeholder="paste their kennel code here">${u(X.oppCode)}</textarea>
      <div class="btnrow"><button class="btn lime" data-act="challenge">fight it (deterministic bout)</button></div>
    </div>
    <div class="panel">
      <h3>Audit a Verdict Packet</h3>
      <textarea id="opp-packet" rows="4" placeholder="paste a verdict packet here — the Pit re-derives it">${u(X.oppPacket)}</textarea>
      <div class="btnrow"><button class="btn violet" data-act="audit">re-derive the verdict</button></div>
    </div>
    <div class="panel">
      <h3>Pit log</h3>
      ${e||'<p class="mono-sm">empty — mail something.</p>'}
    </div>`}function Et(){if(!c)return j();const t=c.result.events[Math.max(0,c.idx-1)],e=c.idx>=c.result.events.length,s=c.result.winner,n=t?Ze(t,c.teams):null,a=c.idx>1?c.result.events[c.idx-2]:null,o=!!t&&!!a&&t.round!==a.round,r=(p,g,h)=>{const f=Me(c.idx,p,h.name,T[h.strain].base.grit+h.grit),y=T[h.strain].base.grit+h.grit,M=Math.max(0,Math.min(100,f/y*100)),K=Me(c.idx,p,h.name,0)<=0&&c.idx>0;let E=`fighter ${p===1?"enemy":""} ${K?"dead":""}`,te="";return n&&(n.actor&&n.actor.team===p&&n.actor.slot===g&&(E+=p===0?" lunge-right":" lunge-left"),n.target&&n.target.team===p&&n.target.slot===g&&(n.kind==="death"?E+=" ko":n.kind==="dodge"?E+=" dodge":n.kind==="shield"?E+=" shield":n.kind==="hit"?(E+=" hit-flash shake",te=`<span class="dmg-num">-${n.damage??0}</span>`):n.kind==="heal"&&(E+=" heal-flash",te=`<span class="heal-num">+${n.damage??0}</span>`))),`
      <div class="${E.trim()}" id="fighter-${p}-${g}">
        ${Y(h,72)}
        <div style="flex:1">
          <b>${u(h.name)}</b>
          <div class="hpbar"><div class="fill ${M<30?"low":""}" style="width:${M}%"></div></div>
          <div class="mono-sm">${f}/${y} grit</div>
        </div>
        ${te}
      </div>`},i=p=>{const g=c.teams[p].map((h,f)=>r(p,f,h));return p===0&&g.reverse(),`<div class="fight-row ${p===1?"right":"left"}">${g.join("")}</div>`},d=c.result.events.slice(0,c.idx).map((p,g,h)=>{const f=h[g-1],y=!f||f.round!==p.round?[`<div class="line hot">— ROUND ${p.round} —</div>`]:[],M=p.kind==="death"?"bad":p.kind==="heal"?"good":g===h.length-1?"hot":"";return[...y,`<div class="line ${M}">[${p.round}] ${u(p.text)}</div>`]}).flat().join(""),k=n&&n.kind==="trick"&&t?t.text.match(/plays (.+?)\./)?.[1]??"":"",m=n&&n.kind==="trick"&&k?`<div class="trick-splash">${u(k)}</div>`:"",F=o?`<div class="round-banner">ROUND ${t.round}</div>`:"",B=e?`<div class="verdict-banner slam ${s===1?"lost":s===-1?"draw":""}">
        <div class="display">${s===-1?"Draw":u(s===0?c.teamNames[0]:c.teamNames[1])} takes it</div>
        <p>${c.result.rounds} rounds · log ${u(c.result.logHash)}</p>
        ${c.scarred.length?`<p class="scarline">scars: ${c.scarred.map(p=>`${u(p.dog)} → ${u(p.scar.name)}`).join(", ")}</p>`:""}
        <div class="btnrow" style="justify-content:center">
          <button class="btn cyan" data-act="copy-packet">copy verdict packet</button>
          <button class="btn" data-act="bout-exit">back</button>
        </div>
      </div>`:"";return`
    <div class="panel gold"><h2>${u(c.label)}</h2>
      <p class="mono-sm">round ${t?.round??0} · deterministic replay · every verdict keeps its receipts</p></div>
    <div class="battle-stage">
      ${i(0)}
      <div class="center-col">
        <div class="stage-center">
          ${F}
          ${m}
          <div class="trick-flash">${u(t?t.text.slice(0,60):"The Pit locks the gate.")}</div>
        </div>
        <div class="btnrow" style="justify-content:center">
          <button class="btn small ${c.playing?"danger":"lime"}" data-act="bout-toggle">${c.playing?"pause":"play"}</button>
          <button class="btn small secondary" data-act="bout-step">step</button>
          <button class="btn small secondary" data-act="bout-skip">skip</button>
        </div>
        <div class="ticker" id="ticker">${d}</div>
      </div>
      ${i(1)}
    </div>
    ${B}`}oe.addEventListener("input",t=>{const e=t.target;e instanceof HTMLTextAreaElement&&e.id==="opp-code"&&(X.oppCode=e.value),e instanceof HTMLTextAreaElement&&e.id==="opp-packet"&&(X.oppPacket=e.value)});oe.addEventListener("click",t=>{const e=t.target.closest("[data-act]");if((!e||!l)&&!e)return;const s=e.dataset.act,n=Number(e.dataset.i??"-1");switch(s){case"dismiss":z="";break;case"new-game":(!l||confirm("Start a new kennel? This replaces your current career."))&&St();break;case"continue":R="kennel";break;case"goto":R=e.dataset.screen;break;case"rename":{const o=prompt("Kennel name",l.kennel.name),r=prompt("Kennel motto",l.kennel.motto);o&&(l.kennel.name=o.slice(0,40)),r&&(l.kennel.motto=r.slice(0,80)),$();break}case"dog-up":if(n>0){const o=l.kennel.dogs;[o[n-1],o[n]]=[o[n],o[n-1]],$()}break;case"dog-down":if(n<l.kennel.dogs.length-1){const o=l.kennel.dogs;[o[n+1],o[n]]=[o[n],o[n+1]],$()}break;case"dog-release":l.kennel.dogs.length>1&&confirm(`Release ${l.kennel.dogs[n].name} into the night?`)&&(l.kennel.dogs.splice(n,1),$());break;case"buy-dog":{const r=Ge(l.poundSeed,De(l)).dogs[n];if(!r)break;l.scrap<Z?w("Not enough scrap. The Pound does not do credit."):l.kennel.dogs.length>=4?w("Kennel is full — release a dog first."):(l.scrap-=Z,l.kennel.dogs.push({...r,id:`${r.id}-${l.boutCounter}`}),$(),w(`${r.name} joins the kennel.`));break}case"pound-rotate":l.scrap<J?w("Not enough scrap to rattle the cage."):(l.scrap-=J,l.poundSeed+=1,$(),w("The cage rattles — new dogs and tricks."));break;case"teach-start":O="0";break;case"teach-cancel":O=null;break;case"teach":{const o=Number(O??"0"),r=l.kennel.dogs[o],i=e.dataset.trick;if(!r)break;if(l.scrap<V)w("Not enough scrap for a lesson.");else{const d=vt(r,i);d.ok?(l.scrap-=V,$(),w(`${r.name} learned ${v[i].name}.`),O=null):w(d.error??"the trick will not stick")}break}case"teach-pick":n>=0&&n<l.kennel.dogs.length&&(O=String(n));break;case"trick-up":{if(n<0||n>=l.kennel.dogs.length)break;const o=l.kennel.dogs[n],r=Number(e.dataset.j??"-1"),i=$e(o,r,"up");i.ok?$():w(i.error??"the trick will not move");break}case"trick-down":{if(n<0||n>=l.kennel.dogs.length)break;const o=l.kennel.dogs[n],r=Number(e.dataset.j??"-1"),i=$e(o,r,"down");i.ok?$():w(i.error??"the trick will not move");break}case"trick-remove":{if(n<0||n>=l.kennel.dogs.length)break;const o=l.kennel.dogs[n],r=Number(e.dataset.j??"-1"),i=o.biteOrder[r],d=yt(o,r);d.ok?($(),w(`${o.name} forgot ${v[i]?.name??"a trick"} — slot opens.`)):w(d.error??"the trick will not budge");break}case"season-start":{l.seasonState=Pe(l.kennel,C(`muttpit|${l.season}|${l.boutCounter}`),l.division,l.season,l.scrap),l.lastClose=null,$();break}case"season-play":{const o=l.seasonState;if(!o||o.done)break;const r=kt(o);l.seasonState=r.state,l.scrap=r.state.scrap,$();const i=r.state.playerResults[r.state.playerResults.length-1];Se(r.result,[o.player.name,i.opponentName],[o.player.dogs.slice(0,3),o.ghosts.find(d=>d.id===i.opponentId)?.kennel.dogs.slice(0,3)??[]],r.packetCode,`Bone Bracket — Week ${i.week+1} vs ${i.opponentName}`,"league",r.scarred);break}case"season-close":{const o=l.seasonState;if(!o||!o.done)break;const r=mt(o);l.lastClose=r,l.scrap=r.state.scrap,l.division=r.state.division,l.season+=1,l.seasonState=bt(r.state),$(),w(r.summary);break}case"challenge":{const o=document.getElementById("opp-code"),r=ne(o?.value??"");if(!r.ok||!r.kennel){w(r.error??"that code will not decode");break}const i=C(`${H(l.kennel)}|${H(r.kennel)}|${l.boutCounter}`),{result:d,packet:k}=Oe(l.kennel,r.kennel,i),m=Ae(k);Se(d,[l.kennel.name,r.kennel.name],[l.kennel.dogs.slice(0,3),r.kennel.dogs.slice(0,3)],m,`Mailed challenge vs ${r.kennel.name}`,"mailbox",[],{kind:"challenge",label:`challenge vs ${r.kennel.name}`});break}case"audit":{const o=document.getElementById("opp-packet"),r=rt(o?.value??"");if(r.ok&&r.verdict){const i=r.verdict;l.mail.unshift({kind:"audit",label:"verdict audit",code:o.value.trim(),ok:!0,note:`re-derived clean: log ${r.replayedHash} — winner declared, receipts intact`}),w(`Audit CLEAN — replayed log ${r.replayedHash} matches the packet (winner recorded, ${i.rounds} rounds).`)}else l.mail.unshift({kind:"audit",label:"verdict audit",code:(o?.value??"").trim().slice(0,400),ok:!1,note:r.error??"audit failed"}),w(`Audit REJECTED — ${r.error??"unknown"}`);l.mail=l.mail.slice(0,30),$();break}case"copy-code":{const o=document.getElementById("my-code");Fe(o?.value??""),w("Kennel code copied. Mail it to someone with a kennel.");break}case"copy-packet":Fe(c?.packetCode??""),w("Verdict packet copied. Anyone can audit it.");break;case"bout-toggle":if(c){if(c.idx>=c.result.events.length)break;c.playing=!c.playing,G++,c.timer&&window.clearTimeout(c.timer),c.playing&&je()}break;case"bout-step":G++,c?.timer&&window.clearTimeout(c.timer),c&&c.idx<c.result.events.length?(c.playing=!1,c.idx+=1):c&&D();break;case"bout-skip":G++,c?.timer&&window.clearTimeout(c.timer),c&&(c.idx=c.result.events.length,D());break;case"bout-exit":c?.timer&&window.clearInterval(c.timer),R=c?.returnScreen??"kennel",c=null;break}ee();const a=document.getElementById("ticker");a&&(a.scrollTop=a.scrollHeight)});async function Fe(t){try{await navigator.clipboard.writeText(t)}catch{const e=document.createElement("textarea");e.value=t,document.body.appendChild(e),e.select(),document.execCommand("copy"),e.remove()}}window.__muttpit={version:1,screen:()=>R,kennelCode:()=>l?H(l.kennel):"",lastPacket:()=>c?.packetCode??"",setOppCode:t=>{const e=document.getElementById("opp-code");e&&(e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})))},setOppPacket:t=>{const e=document.getElementById("opp-packet");e&&(e.value=t,e.dispatchEvent(new Event("input",{bubbles:!0})))}};ee();
