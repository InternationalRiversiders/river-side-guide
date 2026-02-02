import { apiInitializer } from "discourse/lib/api";
import DiscourseURL from "discourse/lib/url";
// === Embedded driver.js (from dist/driver.js.iife.js) ===
const __driverGlobal = typeof window !== "undefined" ? window : globalThis;
if (!__driverGlobal.driver || !__driverGlobal.driver.js) {
  __driverGlobal.driver = __driverGlobal.driver || {};
  __driverGlobal.driver.js = function(F){"use strict";let z={},q;function V(e={}){z={animate:!0,allowClose:!0,overlayClickBehavior:"close",overlayOpacity:.7,smoothScroll:!1,disableActiveInteraction:!1,showProgress:!1,stagePadding:10,stageRadius:5,popoverOffset:10,showButtons:["next","previous","close"],disableButtons:[],overlayColor:"#000",...e}}function s(e){return e?z[e]:z}function le(e){q=e}function k(){return q}let A={};function N(e,o){A[e]=o}function T(e){var o;(o=A[e])==null||o.call(A)}function de(){A={}}function O(e,o,t,i){return(e/=i/2)<1?t/2*e*e+o:-t/2*(--e*(e-2)-1)+o}function K(e){const o='a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])';return e.flatMap(t=>{const i=t.matches(o),d=Array.from(t.querySelectorAll(o));return[...i?[t]:[],...d]}).filter(t=>getComputedStyle(t).pointerEvents!=="none"&&ve(t))}function Y(e){if(!e||ue(e))return;const o=s("smoothScroll"),t=e.offsetHeight>window.innerHeight;e.scrollIntoView({behavior:!o||pe(e)?"auto":"smooth",inline:"center",block:t?"start":"center"})}function pe(e){if(!e||!e.parentElement)return;const o=e.parentElement;return o.scrollHeight>o.clientHeight}function ue(e){const o=e.getBoundingClientRect();return o.top>=0&&o.left>=0&&o.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&o.right<=(window.innerWidth||document.documentElement.clientWidth)}function ve(e){return!!(e.offsetWidth||e.offsetHeight||e.getClientRects().length)}let D={};function S(e,o){D[e]=o}function l(e){return e?D[e]:D}function X(){D={}}function fe(e,o,t,i){let d=l("__activeStagePosition");const n=d||t.getBoundingClientRect(),f=i.getBoundingClientRect(),w=O(e,n.x,f.x-n.x,o),r=O(e,n.y,f.y-n.y,o),v=O(e,n.width,f.width-n.width,o),g=O(e,n.height,f.height-n.height,o);d={x:w,y:r,width:v,height:g},Q(d),S("__activeStagePosition",d)}function j(e){if(!e)return;const o=e.getBoundingClientRect(),t={x:o.x,y:o.y,width:o.width,height:o.height};S("__activeStagePosition",t),Q(t)}function he(){const e=l("__activeStagePosition"),o=l("__overlaySvg");if(!e)return;if(!o){console.warn("No stage svg found.");return}const t=window.innerWidth,i=window.innerHeight;o.setAttribute("viewBox",`0 0 ${t} ${i}`)}function ge(e){const o=we(e);document.body.appendChild(o),U(o,t=>{t.target.tagName==="path"&&T("overlayClick")}),S("__overlaySvg",o)}function Q(e){const o=l("__overlaySvg");if(!o){ge(e);return}const t=o.firstElementChild;if((t==null?void 0:t.tagName)!=="path")throw new Error("no path element found in stage svg");t.setAttribute("d",Z(e))}function we(e){const o=window.innerWidth,t=window.innerHeight,i=document.createElementNS("http://www.w3.org/2000/svg","svg");i.classList.add("driver-overlay","driver-overlay-animated"),i.setAttribute("viewBox",`0 0 ${o} ${t}`),i.setAttribute("xmlSpace","preserve"),i.setAttribute("xmlnsXlink","http://www.w3.org/1999/xlink"),i.setAttribute("version","1.1"),i.setAttribute("preserveAspectRatio","xMinYMin slice"),i.style.fillRule="evenodd",i.style.clipRule="evenodd",i.style.strokeLinejoin="round",i.style.strokeMiterlimit="2",i.style.zIndex="10000",i.style.position="fixed",i.style.top="0",i.style.left="0",i.style.width="100%",i.style.height="100%";const d=document.createElementNS("http://www.w3.org/2000/svg","path");return d.setAttribute("d",Z(e)),d.style.fill=s("overlayColor")||"rgb(0,0,0)",d.style.opacity=`${s("overlayOpacity")}`,d.style.pointerEvents="auto",d.style.cursor="auto",i.appendChild(d),i}function Z(e){const o=window.innerWidth,t=window.innerHeight,i=s("stagePadding")||0,d=s("stageRadius")||0,n=e.width+i*2,f=e.height+i*2,w=Math.min(d,n/2,f/2),r=Math.floor(Math.max(w,0)),v=e.x-i+r,g=e.y-i,y=n-r*2,a=f-r*2;return`M${o},0L0,0L0,${t}L${o},${t}L${o},0Z
    M${v},${g} h${y} a${r},${r} 0 0 1 ${r},${r} v${a} a${r},${r} 0 0 1 -${r},${r} h-${y} a${r},${r} 0 0 1 -${r},-${r} v-${a} a${r},${r} 0 0 1 ${r},-${r} z`}function me(){const e=l("__overlaySvg");e&&e.remove()}function ye(){const e=document.getElementById("driver-dummy-element");if(e)return e;let o=document.createElement("div");return o.id="driver-dummy-element",o.style.width="0",o.style.height="0",o.style.pointerEvents="none",o.style.opacity="0",o.style.position="fixed",o.style.top="50%",o.style.left="50%",document.body.appendChild(o),o}function G(e){const{element:o}=e;let t=typeof o=="function"?o():typeof o=="string"?document.querySelector(o):o;t||(t=ye()),xe(t,e)}function be(){const e=l("__activeElement"),o=l("__activeStep");e&&(j(e),he(),ne(e,o))}function xe(e,o){var C;const i=Date.now(),d=l("__activeStep"),n=l("__activeElement")||e,f=!n||n===e,w=e.id==="driver-dummy-element",r=n.id==="driver-dummy-element",v=s("animate"),g=o.onHighlightStarted||s("onHighlightStarted"),y=(o==null?void 0:o.onHighlighted)||s("onHighlighted"),a=(d==null?void 0:d.onDeselected)||s("onDeselected"),p=s(),c=l();!f&&a&&a(r?void 0:n,d,{config:p,state:c,driver:k()}),g&&g(w?void 0:e,o,{config:p,state:c,driver:k()});const u=!f&&v;let h=!1;_e(),S("previousStep",d),S("previousElement",n),S("activeStep",o),S("activeElement",e);const m=()=>{if(l("__transitionCallback")!==m)return;const x=Date.now()-i,E=400-x<=400/2;o.popover&&E&&!h&&u&&(ee(e,o),h=!0),s("animate")&&x<400?fe(x,400,n,e):(j(e),y&&y(w?void 0:e,o,{config:s(),state:l(),driver:k()}),S("__transitionCallback",void 0),S("__previousStep",d),S("__previousElement",n),S("__activeStep",o),S("__activeElement",e)),window.requestAnimationFrame(m)};S("__transitionCallback",m),window.requestAnimationFrame(m),Y(e),!u&&o.popover&&ee(e,o),n.classList.remove("driver-active-element","driver-no-interaction"),n.removeAttribute("aria-haspopup"),n.removeAttribute("aria-expanded"),n.removeAttribute("aria-controls"),((C=o.disableActiveInteraction)!=null?C:s("disableActiveInteraction"))&&e.classList.add("driver-no-interaction"),e.classList.add("driver-active-element"),e.setAttribute("aria-haspopup","dialog"),e.setAttribute("aria-expanded","true"),e.setAttribute("aria-controls","driver-popover-content")}function Ce(){var e;(e=document.getElementById("driver-dummy-element"))==null||e.remove(),document.querySelectorAll(".driver-active-element").forEach(o=>{o.classList.remove("driver-active-element","driver-no-interaction"),o.removeAttribute("aria-haspopup"),o.removeAttribute("aria-expanded"),o.removeAttribute("aria-controls")})}function H(){const e=l("__resizeTimeout");e&&window.cancelAnimationFrame(e),S("__resizeTimeout",window.requestAnimationFrame(be))}function Pe(e){var r;if(!l("isInitialized")||!(e.key==="Tab"||e.keyCode===9))return;const i=l("__activeElement"),d=(r=l("popover"))==null?void 0:r.wrapper,n=K([...d?[d]:[],...i?[i]:[]]),f=n[0],w=n[n.length-1];if(e.preventDefault(),e.shiftKey){const v=n[n.indexOf(document.activeElement)-1]||w;v==null||v.focus()}else{const v=n[n.indexOf(document.activeElement)+1]||f;v==null||v.focus()}}function J(e){var t;((t=s("allowKeyboardControl"))==null||t)&&(e.key==="Escape"?T("escapePress"):e.key==="ArrowRight"?T("arrowRightPress"):e.key==="ArrowLeft"&&T("arrowLeftPress"))}function U(e,o,t){const i=(n,f)=>{const w=n.target;e.contains(w)&&((!t||t(w))&&(n.preventDefault(),n.stopPropagation(),n.stopImmediatePropagation()),f==null||f(n))};document.addEventListener("pointerdown",i,!0),document.addEventListener("mousedown",i,!0),document.addEventListener("pointerup",i,!0),document.addEventListener("mouseup",i,!0),document.addEventListener("click",n=>{i(n,o)},!0)}function Se(){window.addEventListener("keyup",J,!1),window.addEventListener("keydown",Pe,!1),window.addEventListener("resize",H),window.addEventListener("scroll",H)}function ke(){window.removeEventListener("keyup",J),window.removeEventListener("resize",H),window.removeEventListener("scroll",H)}function _e(){const e=l("popover");e&&(e.wrapper.style.display="none")}function ee(e,o){var x,P;let t=l("popover");t&&document.body.removeChild(t.wrapper),t=Te(),document.body.appendChild(t.wrapper);const{title:i,description:d,showButtons:n,disableButtons:f,showProgress:w,nextBtnText:r=s("nextBtnText")||"Next &rarr;",prevBtnText:v=s("prevBtnText")||"&larr; Previous",progressText:g=s("progressText")||"{current} of {total}"}=o.popover||{};t.nextButton.innerHTML=r,t.previousButton.innerHTML=v,t.progress.innerHTML=g,i?(t.title.innerHTML=i,t.title.style.display="block"):t.title.style.display="none",d?(t.description.innerHTML=d,t.description.style.display="block"):t.description.style.display="none";const y=n||s("showButtons"),a=w||s("showProgress")||!1,p=(y==null?void 0:y.includes("next"))||(y==null?void 0:y.includes("previous"))||a;t.closeButton.style.display=y.includes("close")?"block":"none",p?(t.footer.style.display="flex",t.progress.style.display=a?"block":"none",t.nextButton.style.display=y.includes("next")?"block":"none",t.previousButton.style.display=y.includes("previous")?"block":"none"):t.footer.style.display="none";const c=f||s("disableButtons")||[];c!=null&&c.includes("next")&&(t.nextButton.disabled=!0,t.nextButton.classList.add("driver-popover-btn-disabled")),c!=null&&c.includes("previous")&&(t.previousButton.disabled=!0,t.previousButton.classList.add("driver-popover-btn-disabled")),c!=null&&c.includes("close")&&(t.closeButton.disabled=!0,t.closeButton.classList.add("driver-popover-btn-disabled"));const u=t.wrapper;u.style.display="block",u.style.left="",u.style.top="",u.style.bottom="",u.style.right="",u.id="driver-popover-content",u.setAttribute("role","dialog"),u.setAttribute("aria-labelledby","driver-popover-title"),u.setAttribute("aria-describedby","driver-popover-description");const h=t.arrow;h.className="driver-popover-arrow";const m=((x=o.popover)==null?void 0:x.popoverClass)||s("popoverClass")||"";u.className=`driver-popover ${m}`.trim(),U(t.wrapper,E=>{var W,I,M;const L=E.target,$=((W=o.popover)==null?void 0:W.onNextClick)||s("onNextClick"),B=((I=o.popover)==null?void 0:I.onPrevClick)||s("onPrevClick"),R=((M=o.popover)==null?void 0:M.onCloseClick)||s("onCloseClick");if(L.closest(".driver-popover-next-btn"))return $?$(e,o,{config:s(),state:l(),driver:k()}):T("nextClick");if(L.closest(".driver-popover-prev-btn"))return B?B(e,o,{config:s(),state:l(),driver:k()}):T("prevClick");if(L.closest(".driver-popover-close-btn"))return R?R(e,o,{config:s(),state:l(),driver:k()}):T("closeClick")},E=>!(t!=null&&t.description.contains(E))&&!(t!=null&&t.title.contains(E))&&typeof E.className=="string"&&E.className.includes("driver-popover")),S("popover",t);const b=((P=o.popover)==null?void 0:P.onPopoverRender)||s("onPopoverRender");b&&b(t,{config:s(),state:l(),driver:k()}),ne(e,o),Y(u);const C=e.classList.contains("driver-dummy-element"),_=K([u,...C?[]:[e]]);_.length>0&&_[0].focus()}function te(){const e=l("popover");if(!(e!=null&&e.wrapper))return;const o=e.wrapper.getBoundingClientRect(),t=s("stagePadding")||0,i=s("popoverOffset")||0;return{width:o.width+t+i,height:o.height+t+i,realWidth:o.width,realHeight:o.height}}function oe(e,o){const{elementDimensions:t,popoverDimensions:i,popoverPadding:d,popoverArrowDimensions:n}=o;return e==="start"?Math.max(Math.min(t.top-d,window.innerHeight-i.realHeight-n.width),n.width):e==="end"?Math.max(Math.min(t.top-(i==null?void 0:i.realHeight)+t.height+d,window.innerHeight-(i==null?void 0:i.realHeight)-n.width),n.width):e==="center"?Math.max(Math.min(t.top+t.height/2-(i==null?void 0:i.realHeight)/2,window.innerHeight-(i==null?void 0:i.realHeight)-n.width),n.width):0}function ie(e,o){const{elementDimensions:t,popoverDimensions:i,popoverPadding:d,popoverArrowDimensions:n}=o;return e==="start"?Math.max(Math.min(t.left-d,window.innerWidth-i.realWidth-n.width),n.width):e==="end"?Math.max(Math.min(t.left-(i==null?void 0:i.realWidth)+t.width+d,window.innerWidth-(i==null?void 0:i.realWidth)-n.width),n.width):e==="center"?Math.max(Math.min(t.left+t.width/2-(i==null?void 0:i.realWidth)/2,window.innerWidth-(i==null?void 0:i.realWidth)-n.width),n.width):0}function ne(e,o){const t=l("popover");if(!t)return;const{align:i="start",side:d="left"}=(o==null?void 0:o.popover)||{},n=i,f=e.id==="driver-dummy-element"?"over":d,w=s("stagePadding")||0,r=te(),v=t.arrow.getBoundingClientRect(),g=e.getBoundingClientRect(),y=g.top-r.height;let a=y>=0;const p=window.innerHeight-(g.bottom+r.height);let c=p>=0;const u=g.left-r.width;let h=u>=0;const m=window.innerWidth-(g.right+r.width);let b=m>=0;const C=!a&&!c&&!h&&!b;let _=f;if(f==="top"&&a?b=h=c=!1:f==="bottom"&&c?b=h=a=!1:f==="left"&&h?b=a=c=!1:f==="right"&&b&&(h=a=c=!1),f==="over"){const x=window.innerWidth/2-r.realWidth/2,P=window.innerHeight/2-r.realHeight/2;t.wrapper.style.left=`${x}px`,t.wrapper.style.right="auto",t.wrapper.style.top=`${P}px`,t.wrapper.style.bottom="auto"}else if(C){const x=window.innerWidth/2-(r==null?void 0:r.realWidth)/2,P=10;t.wrapper.style.left=`${x}px`,t.wrapper.style.right="auto",t.wrapper.style.bottom=`${P}px`,t.wrapper.style.top="auto"}else if(h){const x=Math.min(u,window.innerWidth-(r==null?void 0:r.realWidth)-v.width),P=oe(n,{elementDimensions:g,popoverDimensions:r,popoverPadding:w,popoverArrowDimensions:v});t.wrapper.style.left=`${x}px`,t.wrapper.style.top=`${P}px`,t.wrapper.style.bottom="auto",t.wrapper.style.right="auto",_="left"}else if(b){const x=Math.min(m,window.innerWidth-(r==null?void 0:r.realWidth)-v.width),P=oe(n,{elementDimensions:g,popoverDimensions:r,popoverPadding:w,popoverArrowDimensions:v});t.wrapper.style.right=`${x}px`,t.wrapper.style.top=`${P}px`,t.wrapper.style.bottom="auto",t.wrapper.style.left="auto",_="right"}else if(a){const x=Math.min(y,window.innerHeight-r.realHeight-v.width);let P=ie(n,{elementDimensions:g,popoverDimensions:r,popoverPadding:w,popoverArrowDimensions:v});t.wrapper.style.top=`${x}px`,t.wrapper.style.left=`${P}px`,t.wrapper.style.bottom="auto",t.wrapper.style.right="auto",_="top"}else if(c){const x=Math.min(p,window.innerHeight-(r==null?void 0:r.realHeight)-v.width);let P=ie(n,{elementDimensions:g,popoverDimensions:r,popoverPadding:w,popoverArrowDimensions:v});t.wrapper.style.left=`${P}px`,t.wrapper.style.bottom=`${x}px`,t.wrapper.style.top="auto",t.wrapper.style.right="auto",_="bottom"}C?t.arrow.classList.add("driver-popover-arrow-none"):Ee(n,_,e)}function Ee(e,o,t){const i=l("popover");if(!i)return;const d=t.getBoundingClientRect(),n=te(),f=i.arrow,w=n.width,r=window.innerWidth,v=d.width,g=d.left,y=n.height,a=window.innerHeight,p=d.top,c=d.height;f.className="driver-popover-arrow";let u=o,h=e;if(o==="top"?(g+v<=0?(u="right",h="end"):g+v-w<=0&&(u="top",h="start"),g>=r?(u="left",h="end"):g+w>=r&&(u="top",h="end")):o==="bottom"?(g+v<=0?(u="right",h="start"):g+v-w<=0&&(u="bottom",h="start"),g>=r?(u="left",h="start"):g+w>=r&&(u="bottom",h="end")):o==="left"?(p+c<=0?(u="bottom",h="end"):p+c-y<=0&&(u="left",h="start"),p>=a?(u="top",h="end"):p+y>=a&&(u="left",h="end")):o==="right"&&(p+c<=0?(u="bottom",h="start"):p+c-y<=0&&(u="right",h="start"),p>=a?(u="top",h="start"):p+y>=a&&(u="right",h="end")),!u)f.classList.add("driver-popover-arrow-none");else{f.classList.add(`driver-popover-arrow-side-${u}`),f.classList.add(`driver-popover-arrow-align-${h}`);const m=t.getBoundingClientRect(),b=f.getBoundingClientRect(),C=s("stagePadding")||0,_=m.left-C<window.innerWidth&&m.right+C>0&&m.top-C<window.innerHeight&&m.bottom+C>0;o==="bottom"&&_&&(b.x>m.x&&b.x+b.width<m.x+m.width?i.wrapper.style.transform="translateY(0)":(f.classList.remove(`driver-popover-arrow-align-${h}`),f.classList.add("driver-popover-arrow-none"),i.wrapper.style.transform=`translateY(-${C/2}px)`))}}function Te(){const e=document.createElement("div");e.classList.add("driver-popover");const o=document.createElement("div");o.classList.add("driver-popover-arrow");const t=document.createElement("header");t.id="driver-popover-title",t.classList.add("driver-popover-title"),t.style.display="none",t.innerText="Popover Title";const i=document.createElement("div");i.id="driver-popover-description",i.classList.add("driver-popover-description"),i.style.display="none",i.innerText="Popover description is here";const d=document.createElement("button");d.type="button",d.classList.add("driver-popover-close-btn"),d.setAttribute("aria-label","Close"),d.innerHTML="&times;";const n=document.createElement("footer");n.classList.add("driver-popover-footer");const f=document.createElement("span");f.classList.add("driver-popover-progress-text"),f.innerText="";const w=document.createElement("span");w.classList.add("driver-popover-navigation-btns");const r=document.createElement("button");r.type="button",r.classList.add("driver-popover-prev-btn"),r.innerHTML="&larr; Previous";const v=document.createElement("button");return v.type="button",v.classList.add("driver-popover-next-btn"),v.innerHTML="Next &rarr;",w.appendChild(r),w.appendChild(v),n.appendChild(f),n.appendChild(w),e.appendChild(d),e.appendChild(o),e.appendChild(t),e.appendChild(i),e.appendChild(n),{wrapper:e,arrow:o,title:t,description:i,footer:n,previousButton:r,nextButton:v,closeButton:d,footerButtons:w,progress:f}}function Le(){var o;const e=l("popover");e&&((o=e.wrapper.parentElement)==null||o.removeChild(e.wrapper))}const $e="";function Ae(e={}){V(e);function o(){s("allowClose")&&g()}function t(){const a=s("overlayClickBehavior");if(s("allowClose")&&a==="close"){g();return}if(typeof a=="function"){const p=l("__activeStep"),c=l("__activeElement");a(c,p,{config:s(),state:l(),driver:k()});return}a==="nextStep"&&i()}function i(){const a=l("activeIndex"),p=s("steps")||[];if(typeof a=="undefined")return;const c=a+1;p[c]?v(c):g()}function d(){const a=l("activeIndex"),p=s("steps")||[];if(typeof a=="undefined")return;const c=a-1;p[c]?v(c):g()}function n(a){(s("steps")||[])[a]?v(a):g()}function f(){var b;if(l("__transitionCallback"))return;const p=l("activeIndex"),c=l("__activeStep"),u=l("__activeElement");if(typeof p=="undefined"||typeof c=="undefined"||typeof l("activeIndex")=="undefined")return;const m=((b=c.popover)==null?void 0:b.onPrevClick)||s("onPrevClick");if(m)return m(u,c,{config:s(),state:l(),driver:k()});d()}function w(){var m;if(l("__transitionCallback"))return;const p=l("activeIndex"),c=l("__activeStep"),u=l("__activeElement");if(typeof p=="undefined"||typeof c=="undefined")return;const h=((m=c.popover)==null?void 0:m.onNextClick)||s("onNextClick");if(h)return h(u,c,{config:s(),state:l(),driver:k()});i()}function r(){l("isInitialized")||(S("isInitialized",!0),document.body.classList.add("driver-active",s("animate")?"driver-fade":"driver-simple"),Se(),N("overlayClick",t),N("escapePress",o),N("arrowLeftPress",f),N("arrowRightPress",w))}function v(a=0){var R,W,I,M,re,se,ae,ce;const p=s("steps");if(!p){console.error("No steps to drive through"),g();return}if(!p[a]){g();return}S("__activeOnDestroyed",document.activeElement),S("activeIndex",a);const c=p[a],u=p[a+1],h=p[a-1],m=((R=c.popover)==null?void 0:R.doneBtnText)||s("doneBtnText")||"Done",b=s("allowClose"),C=typeof((W=c.popover)==null?void 0:W.showProgress)!="undefined"?(I=c.popover)==null?void 0:I.showProgress:s("showProgress"),x=(((M=c.popover)==null?void 0:M.progressText)||s("progressText")||"{{current}} of {{total}}").replace("{{current}}",`${a+1}`).replace("{{total}}",`${p.length}`),P=((re=c.popover)==null?void 0:re.showButtons)||s("showButtons"),E=["next","previous",...b?["close"]:[]].filter(He=>!(P!=null&&P.length)||P.includes(He)),L=((se=c.popover)==null?void 0:se.onNextClick)||s("onNextClick"),$=((ae=c.popover)==null?void 0:ae.onPrevClick)||s("onPrevClick"),B=((ce=c.popover)==null?void 0:ce.onCloseClick)||s("onCloseClick");G({...c,popover:{showButtons:E,nextBtnText:u?void 0:m,disableButtons:[...h?[]:["previous"]],showProgress:C,progressText:x,onNextClick:L||(()=>{u?v(a+1):g()}),onPrevClick:$||(()=>{v(a-1)}),onCloseClick:B||(()=>{g()}),...(c==null?void 0:c.popover)||{}}})}function g(a=!0){const p=l("__activeElement"),c=l("__activeStep"),u=l("__activeOnDestroyed"),h=s("onDestroyStarted");if(a&&h){const C=!p||(p==null?void 0:p.id)==="driver-dummy-element";h(C?void 0:p,c,{config:s(),state:l(),driver:k()});return}const m=(c==null?void 0:c.onDeselected)||s("onDeselected"),b=s("onDestroyed");if(document.body.classList.remove("driver-active","driver-fade","driver-simple"),ke(),Le(),Ce(),me(),de(),X(),p&&c){const C=p.id==="driver-dummy-element";m&&m(C?void 0:p,c,{config:s(),state:l(),driver:k()}),b&&b(C?void 0:p,c,{config:s(),state:l(),driver:k()})}u&&u.focus()}const y={isActive:()=>l("isInitialized")||!1,refresh:H,drive:(a=0)=>{r(),v(a)},setConfig:V,setSteps:a=>{X(),V({...s(),steps:a})},getConfig:s,getState:l,getActiveIndex:()=>l("activeIndex"),isFirstStep:()=>l("activeIndex")===0,isLastStep:()=>{const a=s("steps")||[],p=l("activeIndex");return p!==void 0&&p===a.length-1},getActiveStep:()=>l("activeStep"),getActiveElement:()=>l("activeElement"),getPreviousElement:()=>l("previousElement"),getPreviousStep:()=>l("previousStep"),moveNext:i,movePrevious:d,moveTo:n,hasNextStep:()=>{const a=s("steps")||[],p=l("activeIndex");return p!==void 0&&!!a[p+1]},hasPreviousStep:()=>{const a=s("steps")||[],p=l("activeIndex");return p!==void 0&&!!a[p-1]},highlight:a=>{r(),G({...a,popover:a.popover?{showButtons:[],showProgress:!1,progressText:"",...a.popover}:void 0})},destroy:()=>{g(!1)}};return le(y),y}return F.driver=Ae,Object.defineProperty(F,Symbol.toStringTag,{value:"Module"}),F}({});
}


export default apiInitializer((api) => {
  // 目标帖子 ID：首页引导完成后跳转
  const TOPIC_TARGET_ID = 19;
  // sessionStorage 标记 key：用于跨页面触发帖子页引导
  const TOUR_PENDING_KEY = "riverside_guide_pending_tour";
  // sessionStorage 标记 value：仅当值匹配时才启动帖子页引导
  const TOUR_PENDING_VALUE = "topic";
  // 防重复启动：避免同一页面多次触发帖子页引导
  let pendingTopicTourStarted = false;

  // === 校友认证引导配置 ===
  // 认证教程帖子的目标主题 ID（数字）
  const CERT_TUTORIAL_TOPIC_ID = 5;
  // 已认证用户组名；若为空字符串则始终显示提示
  const VERIFIED_GROUP_NAME = "";

  // 获取当前用户组的字符串数组（name 列表）
  function getCurrentUserGroupNames() {
    try {
      const app = window.require && window.require("discourse/app").default;
      const currentUser = app?.__container__?.lookup("service:current-user");
      if (currentUser) {
        return (currentUser.groups || currentUser.group_users?.map((g) => g.group) || []).map(
          (g) => g.name
        );
      }
    } catch {}

    try {
      const User = window.require && window.require("discourse/models/user").default;
      const user = User?.current?.();
      if (user) {
        return (user.groups || user.group_users?.map((g) => g.group) || []).map(
          (g) => g.name
        );
      }
    } catch {}

    try {
      const user = window.Discourse?.User?.current?.();
      if (user) {
        return (user.groups || user.group_users?.map((g) => g.group) || []).map(
          (g) => g.name
        );
      }
    } catch {}

    return [];
  }

  function getCertificationTutorialPath() {
    if (!Number.isFinite(CERT_TUTORIAL_TOPIC_ID) || CERT_TUTORIAL_TOPIC_ID <= 0) {
      return "";
    }
    return `/t/${CERT_TUTORIAL_TOPIC_ID}`;
  }

  function shouldShowCertificationStep(groupNames) {
    if (!VERIFIED_GROUP_NAME) return true;
    return !groupNames.includes(VERIFIED_GROUP_NAME);
  }

  // =================================================================
  // 1. 教程配置 (TOUR CONFIGURATION)
  // =================================================================
  const HOME_TOUR_CONFIG = {
    steps: [
      // --- 引导步骤 不配置device为通用device: 0) ---
      // 不配置 device：通用
      // device = 0：仅电脑端
      // device = 1：仅手机端
      {
        popover: {
          title: "欢迎来到 riverside",
          description: "本论坛的风格与你熟悉的“清水河畔”有着完全不同的界面风格与使用逻辑。本教程将带你快速熟悉<b>首页</b>的核心功能。",
        },
      },
      {
        device: 0,
        element: "#create-topic",
        popover: {
          title: "发帖",
          description: "点击这里发布新话题。",
        },
      },
      {
        device: 1,
        element: "#toggle-hamburger-menu",
        popover: {
          title: "导航侧栏",
          description: "点击这里展开社区导航栏。",
        },
        onHighlighted: (element) => {
          const target = element || document.querySelector("#toggle-hamburger-menu");
          if (target) {
            target.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
              })
            );
          }
        },
      },
      {
        element: '[data-section-name="community"]',
        popover: {
          title: "社区导航",
          description: "这里包含了<b>所有话题</b>、<b>我的消息</b>、<b>我的帖子</b>等常用入口。",
        },
      },
      {
        element: '[data-section-name="categories"]',
        popover: {
          title: "版块列表",
          description:
            "这里列出了论坛的所有版块。点击展开或折叠，快速跳转到你感兴趣的分区。<br><br><span style='color:#E45735; font-weight:bold;'>你可以点击右上角的按钮来自定义显示的版块。</span>",
        },
      },
      {
        element: '[data-section-name="chat-channels"]',
        popover: {
          title: "公共聊天室",
          description:
            "<div style='margin-bottom:6px;'><b>校友广场</b>：可以与论坛中的同学与校友实时互动。</div>" +
            "<div><b>二手交流</b>：二手交流信息、优惠券红包码，均在这里分享。</div>",
        },
      },
      {
        device: 1,
        element: "#search-button",
        popover: {
          title: "搜索",
          description: "点击进入搜索界面，可搜索全站内容",
        },
        onHighlighted: () => {
          const toggle = document.querySelector("#toggle-hamburger-menu");
          if (toggle) {
            toggle.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
              })
            );
          }
        },
      },
      {
        device: 0,
        element: "#welcome-banner-search-input",
        popover: {
          title: "快速搜索",
          description: "直接在这里输入关键词，即可检索全站内容。",
        },
        onHighlighted: () => {
          const toggle = document.querySelector("#toggle-hamburger-menu");
          if (toggle) {
            toggle.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
              })
            );
          }
        },
      },
      {
        device: 0,
        element: ".show-advanced-search",
        popover: {
          title: "高级搜索",
          description:
            "点击此图标进入<b>高级搜索</b>，可以根据 <b style='color:#0088CC'>分类</b>、<b style='color:#0088CC'>话题</b>、<b style='color:#0088CC'>标签</b>、<b style='color:#0088CC'>发帖人</b> 等条件进行精确搜索。",
        },
      },
      {
        device: 0,
        element: "#navigation-bar",
        popover: {
          title: "话题列表排序",
          description:
            "<div style='margin-bottom:8px;'><b style='color:#25AAE2; font-size:15px;'>最新发表</b><br>按发布时间排序，展示全站<b>最新创建的主题</b>。适合希望第一时间获取新鲜资讯的用户。</div>" +
            "<div style='margin-bottom:8px;'><b style='color:#25AAE2; font-size:15px;'>最新回复</b><br>按最后回复时间排序，显示<b>最近被活跃讨论的主题</b>。</div>" +
            "<div style='margin-bottom:8px;'><b style='color:#25AAE2; font-size:15px;'>未读 / 未读话题</b><br>• <b>未读话题</b>：您尚未浏览过的主题。<br>• <b>未读</b>：您已看过但<b>有新回复</b>的主题。</div>" +
            "<div><b style='color:#25AAE2; font-size:15px;'>热门 / 排行榜</b><br>基于浏览量、回复数筛选的高热度内容。</div>",
        },
      },
      {
        device: 0,
        element: ".category-drop",
        popover: {
          title: "按类别筛选",
          description: "点击这里按版块筛选话题。",
        },
      },
      {
        device: 0,
        element: ".tag-drop",
        popover: {
          title: "按标签筛选",
          description:
            "通过标签快速过滤出你感兴趣的特定内容。<br><span style='color:#E45735; font-weight:bold;'>选择“精华”标签，即可筛选出所有“精华”内容！</span>",
        },
      },
      {
        element: ".topic-list-item .title",
        popover: {
          title: "话题标题",
          description:
            "这是话题标题。点击<b>标题</b>以及周边空白区域即可进入详情页浏览帖子内容。",
        },
      },
      {
        element: ".topic-replies",
        popover: {
          title: "回复数",
          description: "这是该话题收到的<b>回帖数</b>。",
        },
      },
      {
        element: ".topic-list-item .topic-activity-data",
        popover: {
          title: "最新回复用户",
          description: "这是最新回复该话题的用户名以及回复时间。",
        },
      },
      {
        element: ".chat-header-icon",
        popover: {
          title: "聊天消息",
          description:
            "这里会显示你的聊天通知。点击可以快速打开聊天弹窗或全屏聊天窗口。",
        },
      },
      {
        element: "#current-user",
        popover: {
          title: "个人中心",
          description:
            "点击这里可以查看通知、私信和书签。<br><br><b style='color:#E45735;'>点击“下一步”，我们将自动为您打开菜单并介绍详细功能。</b>",
        },
        onHighlighted: (element) => {
          const target =
            element &&
            (element.querySelector("button, a, .header-dropdown-toggle") ||
              element);
          if (target) {
            target.dispatchEvent(
              new MouseEvent("click", {
                bubbles: true,
                cancelable: true,
                view: window,
              })
            );
          }
        },
      },
      {
        element: "#user-menu-button-all-notifications",
        popover: {
          title: "所有通知",
          description:
            "这是您的<b style='color:#e67e22;'>消息总览</b>。<br>收到的点赞、被引用、系统通知都会汇总在这里。",
        },
      },
      {
        element: "#user-menu-button-replies",
        popover: {
          title: "回复通知",
          description:
            "专门显示<b style='color:#00a65a;'>别人对您的回复</b>。<br>想知道谁在和您对话？看这里就对了。",
        },
      },
      {
        element: "#user-menu-button-messages",
        popover: {
          title: "私信",
          description:
            "这是您的<b style='color:#0088cc;'>私人信箱</b>。<br>用于查看用户间的私聊消息以及机器人发送的通知。",
        },
      },
      {
        element: "#user-menu-button-bookmarks",
        popover: {
          title: "书签收藏",
          description:
            "您收藏的帖子都在这儿。<br>遇到好内容来不及看？点击帖子下方的<b>书签图标</b>，稍后在这里阅读。",
        },
      },
      {
        element: "#user-menu-button-chat-notifications",
        popover: {
          title: "聊天通知",
          description:
            "显示来自<b style='color:#9b59b6;'>公共频道</b>或<b style='color:#9b59b6;'>私聊频道</b>的即时消息提醒。",
        },
      },
      {
        element: "#user-menu-button-other-notifications",
        popover: {
          title: "其他通知",
          description:
            "<div>获得勋章、被邀请加入话题等低频通知会归类到这里。</div>",
        },
      },
      {
        element: "#user-menu-button-profile",
        popover: {
          title: "个人资料",
          description:
            "点击进入您的<b style='color:#2c3e50;'>个人主页</b>。<br>您可以在这里修改头像、更改密码、调整<b style='color:#2980b9;'>偏好设置</b>或查看您的发帖记录。",
        },
      },
      {
        element: "#tour-trigger-btn",
        popover: {
          title: "恭喜你完成首页引导！",
          description: "你可以进入任意帖子或者个人主页，再次点击本按钮进入引导。",
        },
        onHighlighted: () => {
          const container = document.querySelector("#current-user");
          if (!container) return;
          const target =
            container.querySelector("button, a, .header-dropdown-toggle") ||
            container;
          target.dispatchEvent(
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
              view: window,
            })
          );
        },
      },
    ],
  };

  const baseTopicTourSteps = [
      {
        popover: {
          title: "欢迎来到帖子页",
          description: "本引导将帮助你了解帖子页的核心功能。",
        },
      },
      {
        element: "#topic-title",
        popover: {
          title: "帖子标题",
          description: "这里显示当前帖子的标题与相关信息。",
        },
      },
      {
        device: 0,
        element: ".timeline-scrollarea-wrapper",
        popover: {
          title: "时间轴导航",
          description:
              "<p>这是 Discourse 特有的时间轴。</p>" +
              "<p>拖动滑块可以快速跳转楼层，或者<span style='font-size: large'>点击顶部/底部的日期直接跳转到第一楼或最新一楼</span></p>",
        },
      },
      {
        element: "#topic-footer-buttons",
        popover: {
          title: "回复与操作",
          description: "在这里进行回复、分享或其他帖子相关操作。",
        },
      },
      {
        element: ".topic-link",
        popover: {
          title: "跳转至最上方",
          description: "点击上方标题，即可跳转至帖子开头",
        },
      },
    ];

  function buildTopicTourSteps() {
    const steps = [...baseTopicTourSteps];
    const groupNames = getCurrentUserGroupNames();
    window.riversideGuideUserGroups = groupNames;

    if (shouldShowCertificationStep(groupNames)) {
      steps.push({
        popover: {
          title: "你还没有完成校友认证",
          description:
            "认证成为校友之后才能体验完整论坛内容，点击下方按钮跳转至“校友认证教程”。",
          showButtons: ["next"],
          nextBtnText: "跳转认证教程",
          onNextClick: (_el, _step, { driver }) => {
            const path = getCertificationTutorialPath();
            if (!path) {
              console.warn("[Tour] 认证教程主题 ID 未配置。");
              return;
            }
            driver?.destroy?.();
            DiscourseURL.routeTo(path);
          },
        },
      });
    }

    return steps;
  }

  const TOPIC_TOUR_CONFIG = {
    getSteps: buildTopicTourSteps,
  };

  // --- 手动启动函数 ---
  function startTour() {
    if (!window.driver || !window.driver.js || !window.driver.js.driver) {
      console.warn("[Tour] Driver.js 未加载");
      return;
    }

    console.log("[Tour] Starting manual tour...");

    const driver = window.driver.js.driver;

    const { pathname } = window.location;
    const isHomePage = pathname === "/";
    const isTopicPage = /^\/t\/(?:[^/]+\/)?\d+/.test(pathname);

    if (!isHomePage && !isTopicPage) {
      console.warn("[Tour] 当前页面不是首页或帖子页，已跳过引导。");
      return;
    }

    const activeConfig = isTopicPage ? TOPIC_TOUR_CONFIG : HOME_TOUR_CONFIG;
    const activeSteps =
      typeof activeConfig.getSteps === "function"
        ? activeConfig.getSteps()
        : activeConfig.steps || [];
    const pageLabel = isTopicPage ? "Topic" : "Home";

    if (isHomePage && !document.querySelector("#create-topic")) {
      console.warn("[Tour] Warning: '#create-topic' not found.");
    }

    // 3. 设备检测与配置加载
    const isMobile = window.innerWidth <= 600;
    const currentSteps = activeSteps.filter((step) => {
      if (step.device === 0) return !isMobile;
      if (step.device === 1) return isMobile;
      return true;
    });

    console.log(
      `[Tour] Page: ${pageLabel}, Mode: ${isMobile ? "Mobile" : "Desktop"}, Steps: ${currentSteps.length}`
    );

    let driverObj;
    if (isHomePage && currentSteps.length > 0) {
      const lastIndex = currentSteps.length - 1;
      const lastStep = currentSteps[lastIndex];
      if (lastStep && lastStep.popover) {
        currentSteps[lastIndex] = {
          ...lastStep,
          popover: {
            ...lastStep.popover,
            onNextClick: () => {
              if (!driverObj) return;
              if (driverObj.isLastStep()) {
                console.log(
                  `[Tour] Home last step -> set pending '${TOUR_PENDING_KEY}=${TOUR_PENDING_VALUE}', routeTo /t/${TOPIC_TARGET_ID}`
                );
                sessionStorage.setItem(TOUR_PENDING_KEY, TOUR_PENDING_VALUE);
                driverObj.destroy();
                DiscourseURL.routeTo(`/t/${TOPIC_TARGET_ID}`);
                return;
              }
              driverObj.moveNext();
            },
          },
        };
      }
    }

    // 5. 启动引导
    driverObj = driver({
      showProgress: true,
      progressText: "第 {{current}} / {{total}} 步",
      allowClose: true,
      popoverClass: "tour-popover",
      animate: true,
      showButtons: ["next", "previous", "close"],
      nextBtnText: "下一步",
      prevBtnText: "上一步",
      doneBtnText: "完成",
      steps: currentSteps,
      onDestroyStarted: () => {
        if (!driverObj.hasNextStep() || confirm("仍有未查看的引导流程，确定要退出引导吗？")) {
          driverObj.destroy();
        }
      }
    });

    try {
      driverObj.drive();
    } catch (e) {
      console.error("[Tour] Failed to start:", e);
    }
  }

  window.startTour = startTour;

  // =================================================================
  // 3. 按钮初始化与权限检查 (BUTTON & PERMISSION)
  // =================================================================
  function initTourButton() {
    const DISMISS_KEY = "discourse_tour_btn_hidden_permanent";
    const btn = document.getElementById("tour-trigger-btn");
    const closeBtn = document.getElementById("tour-btn-close");

    if (!btn || !closeBtn) return;

    // 绑定事件（覆盖旧处理器即可）
    const startHandler = () => window.startTour && window.startTour();
    btn.onclick = startHandler;

    closeBtn.onclick = (e) => {
      e.stopPropagation();
      btn.remove();
      // localStorage.setItem(DISMISS_KEY, 'true');
      console.log("[Tour] 按钮已隐藏 (调试模式)");
    };

    if (localStorage.getItem(DISMISS_KEY)) {
      return;
    }

    const updateTourButtonVisibility = () => {
      const existingBtn = document.getElementById("tour-trigger-btn");
      if (!existingBtn) return;
      const isHomePage = window.location.pathname === "/";
      existingBtn.style.display = isHomePage ? "flex" : "none";
    };

    // 使用 onPageChange 确保在路由跳转后按钮显示逻辑正确
    api.onPageChange(() => {
      updateTourButtonVisibility();
    });

    updateTourButtonVisibility();
  }

  requestAnimationFrame(initTourButton);

  function waitForElement(selector, timeoutMs = 6000, intervalMs = 150) {
    return new Promise((resolve) => {
      const start = Date.now();
      const timer = setInterval(() => {
        const found = document.querySelector(selector);
        if (found) {
          clearInterval(timer);
          resolve(found);
          return;
        }
        if (Date.now() - start >= timeoutMs) {
          clearInterval(timer);
          resolve(null);
        }
      }, intervalMs);
    });
  }

  async function startTopicTourIfPending() {
    console.log("[Tour] Pending check: startTopicTourIfPending()");
    if (pendingTopicTourStarted) {
      console.log("[Tour] Pending check: already started, skip.");
      return;
    }
    const pending = sessionStorage.getItem(TOUR_PENDING_KEY);
    if (pending !== TOUR_PENDING_VALUE) {
      console.log(
        `[Tour] Pending check: key=${TOUR_PENDING_KEY} value=${pending} (expected ${TOUR_PENDING_VALUE}), skip.`
      );
      return;
    }

    const isTopicPage = /^\/t\/(?:[^/]+\/)?\d+/.test(window.location.pathname);
    console.log(
      `[Tour] Pending check: path=${window.location.pathname}, isTopicPage=${isTopicPage}`
    );
    if (!isTopicPage) {
      console.log("[Tour] Pending check: not on topic page, skip.");
      return;
    }

    pendingTopicTourStarted = true;
    sessionStorage.removeItem(TOUR_PENDING_KEY);
    console.log("[Tour] Pending check: consumed pending flag, wait for #topic-title.");

    const target = await waitForElement("#topic-title");
    if (!target) {
      console.warn("[Tour] Pending check: #topic-title not found, abort.");
      pendingTopicTourStarted = false;
      return;
    }

    console.log("[Tour] Pending check: #topic-title found, startTour().");
    startTour();
    // 允许后续再次触发（只要 pending key 被重新写入）
    pendingTopicTourStarted = false;
  }

  console.log("[Tour] Component loaded.");

  api.onPageChange(() => {
    requestAnimationFrame(() => {
      startTopicTourIfPending();
    });
  });

  requestAnimationFrame(() => {
    startTopicTourIfPending();
  });
});
