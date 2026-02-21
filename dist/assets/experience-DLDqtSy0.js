import{r as i,j as e,S as o,e as h}from"./index-GO2bW8Be.js";/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=a=>a.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),u=a=>a.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,r,t)=>t?t.toUpperCase():r.toLowerCase()),m=a=>{const s=u(a);return s.charAt(0).toUpperCase()+s.slice(1)},p=(...a)=>a.filter((s,r,t)=>!!s&&s.trim()!==""&&t.indexOf(s)===r).join(" ").trim(),g=a=>{for(const s in a)if(s.startsWith("aria-")||s==="role"||s==="title")return!0};/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var k={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w=i.forwardRef(({color:a="currentColor",size:s=24,strokeWidth:r=2,absoluteStrokeWidth:t,className:n="",children:c,iconNode:x,...d},j)=>i.createElement("svg",{ref:j,...k,width:s,height:s,stroke:a,strokeWidth:t?Number(r)*24/Number(s):r,className:p("lucide",n),...!c&&!g(d)&&{"aria-hidden":"true"},...d},[...x.map(([N,y])=>i.createElement(N,y)),...Array.isArray(c)?c:[c]]));/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=(a,s)=>{const r=i.forwardRef(({className:t,...n},c)=>i.createElement(w,{ref:c,iconNode:s,className:p(`lucide-${v(m(a))}`,`lucide-${a}`,t),...n}));return r.displayName=m(a),r};/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],C=l("briefcase",f);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const b=[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]],$=l("calendar",b);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]],_=l("map-pin",M);/**
 * @license lucide-react v0.539.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],E=l("sparkles",A),L=i.memo(function(){return e.jsx("section",{id:"experience",className:"section experience",children:e.jsxs("div",{className:"container",children:[e.jsx(o,{children:e.jsxs("div",{className:"story-intro",children:[e.jsxs("div",{className:"intro-badge",children:[e.jsx(E,{size:16}),e.jsx("span",{children:"My Journey"})]}),e.jsx("h2",{className:"section-title",children:"The Story So Far"}),e.jsx("p",{className:"story-description",children:"From sales floors to tech leadership, here's the journey that shaped me into the developer I am today. Each chapter brought new lessons, challenges, and growth."})]})}),e.jsx("div",{className:"story-timeline",children:h.map((s,r)=>e.jsx(o,{delay:r*100,direction:"up",distance:30,children:e.jsxs("div",{className:"story-chapter",children:[e.jsxs("div",{className:"chapter-marker",children:[e.jsx("div",{className:"chapter-line"}),e.jsxs("div",{className:"chapter-number",children:[e.jsx("span",{className:"chapter-text",children:"Chapter"}),e.jsx("span",{className:"chapter-index",children:String(r+1).padStart(2,"0")})]}),e.jsx("div",{className:`chapter-dot ${s.current?"current":""}`,children:s.current&&e.jsx("div",{className:"pulse-ring"})})]}),e.jsxs("div",{className:"story-card",children:[s.current&&e.jsxs("div",{className:"current-label",children:[e.jsx("span",{className:"pulse-indicator"}),"Currently Writing This Chapter"]}),e.jsx("div",{className:"story-header",children:e.jsxs("div",{className:"company-badge",children:[e.jsx("div",{className:"badge-icon",children:e.jsx(C,{size:20})}),e.jsxs("div",{className:"badge-content",children:[e.jsx("h3",{className:"role-title",children:s.role}),e.jsx("h4",{className:"company-name",children:s.company})]})]})}),e.jsxs("div",{className:"story-meta",children:[e.jsxs("div",{className:"meta-item",children:[e.jsx($,{size:14,className:"meta-icon"}),e.jsx("span",{children:s.duration})]}),e.jsx("div",{className:"meta-divider",children:"•"}),e.jsxs("div",{className:"meta-item",children:[e.jsx(_,{size:14,className:"meta-icon"}),e.jsx("span",{children:s.location})]})]}),e.jsx("div",{className:"story-content",children:s.achievements.map((t,n)=>e.jsxs("div",{className:"story-paragraph",children:[e.jsx("div",{className:"paragraph-marker",children:e.jsx("div",{className:"marker-dot"})}),e.jsx("p",{className:"paragraph-text",children:t})]},n))}),r<h.length-1&&e.jsxs("div",{className:"chapter-transition",children:[e.jsx("div",{className:"transition-line"}),e.jsx("span",{className:"transition-text",children:"And then..."}),e.jsx("div",{className:"transition-line"})]})]})]})},`${s.company}-${s.role}-${r}`))}),e.jsx(o,{delay:300,children:e.jsxs("div",{className:"story-ending",children:[e.jsxs("div",{className:"ending-decoration",children:[e.jsx("div",{className:"ending-dot"}),e.jsx("div",{className:"ending-line"})]}),e.jsxs("p",{className:"ending-text",children:["The story continues... What's the next chapter?",e.jsx("span",{className:"ending-highlight",children:" Let's write it together."})]})]})})]})})});export{L as default};
