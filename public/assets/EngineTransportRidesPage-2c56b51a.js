import{q as g,j as s,D as c,F as p}from"./index-199c3c1b.js";import{u as x}from"./TransportRideStatus-c86ef4d7.js";import{G as l}from"./GridList-d4291e7c.js";import{T as h}from"./TransportRide-b7f2b7cf.js";import"./useInfiniteQuery-28b756f2.js";import"./chevron-right-7a9ede92.js";const R=()=>{const{engineId:i}=g(),{data:t,isLoading:r,isError:e,refetch:o,hasNextPage:n,fetchNextPage:d,isFetchingNextPage:m}=x({filters:{engine:i}});return s.jsxs("div",{id:"engine-transport-rides-page",children:[r&&s.jsx(c,{}),!r&&e&&s.jsx(p,{tryAgain:o}),!r&&!e&&s.jsxs("div",{children:[s.jsx("h3",{className:"mb-4",children:"Courses"}),s.jsx(l,{data:t,renderElements:a=>s.jsx(h,{ride:a},a._id),fetchNextPage:d,isFetchingNextPage:m,hasNextPage:n,className:"grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"})]})]})};export{R as default};