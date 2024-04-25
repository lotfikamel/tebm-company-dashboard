import{R as h,c as f,j as s,N as p,a9 as u,y as v,g as D,h as o,x as N,e as x,D as g,F as y}from"./index-8aeefa04.js";import{f as b}from"./RevenuesQueries-e1c6d87d.js";import{C as M}from"./chevron-right-ec77f771.js";import{A as m}from"./arrow-right-d913e155.js";import"./useInfiniteQuery-bc6f39db.js";const Y=({data:e,headers:r,renderElements:a,isFetchingNextPage:i,hasNextPage:l,fetchNextPage:c,className:n,enablePagination:t=!0})=>{const j=f("table table-zebra w-full",n);return e.length===0?s.jsx(p,{}):s.jsxs("div",{className:"table-list overflow-x-auto",children:[s.jsxs("table",{className:j,children:[s.jsx("thead",{children:s.jsx("tr",{children:r.map(d=>s.jsx("th",{children:d},d))})}),s.jsx("tbody",{children:e.map(a)})]}),t&&l&&s.jsx("div",{className:"flex",children:s.jsx("div",{className:"ml-auto",children:i?s.jsx(u,{}):s.jsxs("div",{onClick:c,className:"flex justify-center items-center text-stone-500 cursor-pointer",children:[s.jsx("span",{className:"mr-2",children:"Charger plus"}),s.jsx(M,{})]})})})]})},L=h.memo(Y),k=({debt:e})=>{const r=v({driverId:e._id,startDate:e.startDate,endDate:e.endDate});return s.jsxs("tr",{children:[s.jsx("td",{children:s.jsxs("div",{className:"flex items-center space-x-2",children:[s.jsx("img",{src:e.driver.photo.src,alt:"",className:"w-12 aspect-ratio-square rounded-full"}),s.jsx("div",{className:"font-medium",children:D(e.driver.firstName,e.driver.lastName)})]})}),s.jsx("td",{children:e.totalRides}),s.jsx("td",{children:o(e.startDate).format("DD MMMM YYYY")}),s.jsx("td",{children:o(e.endDate).format("DD MMMM YYYY")}),s.jsx("td",{className:"text-red-500 font-semibold",children:N(e.totalDebts)}),s.jsxs("td",{className:"space-y-2",children:[s.jsx("div",{children:s.jsxs(x,{to:r,className:"btn btn-sm btn-primary space-x-2",children:[s.jsx("span",{children:"régler"}),s.jsx(m,{size:16})]})}),s.jsx("div",{children:s.jsxs(x,{to:`/drivers/profile/${e._id}/debts`,className:"flex items-center space-x-2 link",children:[s.jsx("span",{children:"détails"}),s.jsx(m,{size:16})]})})]})]})},P=h.memo(k),F=()=>{const{data:e,isLoading:r,isError:a,refetch:i,hasNextPage:l,fetchNextPage:c,isFetchingNextPage:n}=b();return s.jsxs("div",{id:"drivers-debtors-page",children:[r&&s.jsx(g,{}),!r&&a&&s.jsx(y,{tryAgain:i}),!r&&!a&&s.jsx("div",{children:s.jsx("div",{className:"space-y-4",children:s.jsx(L,{data:e,renderElements:t=>s.jsx(P,{debt:t},t._id),headers:["chauffeur","courses","du","au","total","actions"],fetchNextPage:c,isFetchingNextPage:n,hasNextPage:l})})})]})};export{F as default};
