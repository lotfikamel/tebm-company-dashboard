import{R as u,_ as i,j as s,D as x,F as h,$ as j}from"./index-8aeefa04.js";import{e as f}from"./RevenuesQueries-e1c6d87d.js";import{D as v}from"./Debt-e80ebf49.js";import{G as y}from"./GridList-b4bd86fb.js";import"./useInfiniteQuery-bc6f39db.js";import"./arrow-right-d913e155.js";import"./chevron-right-ec77f771.js";const b=()=>{const[t,o]=u.useState({groupBy:i.DAYS}),{data:l,isLoading:a,isError:r,refetch:n,hasNextPage:c,fetchNextPage:d,isFetchingNextPage:m}=f({filters:t}),p=e=>{o(g=>({...g,[e.target.name]:e.target.value.trim()}))};return s.jsxs("div",{id:"debts-details-page",children:[a&&s.jsx(x,{}),!a&&r&&s.jsx(h,{tryAgain:n}),!a&&!r&&s.jsxs("div",{className:"space-y-4",children:[s.jsx("div",{children:s.jsx("select",{name:"groupBy",className:"select select-bordered w-full",value:t.groupBy,onChange:p,children:Object.values(i).map(e=>s.jsx("option",{value:e,children:j(e)},e))})}),s.jsx(y,{data:l,renderElements:e=>s.jsx(v,{debt:e,groupBy:t.groupBy},e._id),fetchNextPage:d,isFetchingNextPage:m,hasNextPage:c,className:"grid-cols-1 gap-4"})]})]})};export{b as default};
