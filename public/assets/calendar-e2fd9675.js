import{r as f,R as a,P as l}from"./index-8aeefa04.js";function s(){return s=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var t=arguments[o];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e},s.apply(this,arguments)}function y(e,o){if(e==null)return{};var t=u(e,o),r,n;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],!(o.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(t[r]=e[r])}return t}function u(e,o){if(e==null)return{};var t={},r=Object.keys(e),n,i;for(i=0;i<r.length;i++)n=r[i],!(o.indexOf(n)>=0)&&(t[n]=e[n]);return t}var c=f.forwardRef(function(e,o){var t=e.color,r=t===void 0?"currentColor":t,n=e.size,i=n===void 0?24:n,p=y(e,["color","size"]);return a.createElement("svg",s({ref:o,xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:r,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},p),a.createElement("rect",{x:"3",y:"4",width:"18",height:"18",rx:"2",ry:"2"}),a.createElement("line",{x1:"16",y1:"2",x2:"16",y2:"6"}),a.createElement("line",{x1:"8",y1:"2",x2:"8",y2:"6"}),a.createElement("line",{x1:"3",y1:"10",x2:"21",y2:"10"}))});c.propTypes={color:l.string,size:l.oneOfType([l.string,l.number])};c.displayName="Calendar";const v=c;export{v as C};
