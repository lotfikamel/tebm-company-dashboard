import{r as f,R as a,P as s}from"./index-8aeefa04.js";function l(){return l=Object.assign||function(e){for(var o=1;o<arguments.length;o++){var r=arguments[o];for(var t in r)Object.prototype.hasOwnProperty.call(r,t)&&(e[t]=r[t])}return e},l.apply(this,arguments)}function y(e,o){if(e==null)return{};var r=u(e,o),t,n;if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)t=i[n],!(o.indexOf(t)>=0)&&Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}function u(e,o){if(e==null)return{};var r={},t=Object.keys(e),n,i;for(i=0;i<t.length;i++)n=t[i],!(o.indexOf(n)>=0)&&(r[n]=e[n]);return r}var p=f.forwardRef(function(e,o){var r=e.color,t=r===void 0?"currentColor":r,n=e.size,i=n===void 0?24:n,c=y(e,["color","size"]);return a.createElement("svg",l({ref:o,xmlns:"http://www.w3.org/2000/svg",width:i,height:i,viewBox:"0 0 24 24",fill:"none",stroke:t,strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},c),a.createElement("line",{x1:"4",y1:"9",x2:"20",y2:"9"}),a.createElement("line",{x1:"4",y1:"15",x2:"20",y2:"15"}),a.createElement("line",{x1:"10",y1:"3",x2:"8",y2:"21"}),a.createElement("line",{x1:"16",y1:"3",x2:"14",y2:"21"}))});p.propTypes={color:s.string,size:s.oneOfType([s.string,s.number])};p.displayName="Hash";const v=p;export{v as H};
