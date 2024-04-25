import{j as e,c as v,S as u,V as t,q as N,D as f,F as p,h as g,g as l,e as c,W as b,X as w,x as n,v as y}from"./index-8aeefa04.js";import{c as R,T as D,M as P,a as S}from"./TransportRideStatus-771c94c2.js";import{u as T}from"./usePermissions-f0efe441.js";import{F as m}from"./FiveStarsRating-f6eb5023.js";import{E as x}from"./external-link-51b68c72.js";import{N as A}from"./navigation-ec1c643b.js";import"./useInfiniteQuery-bc6f39db.js";import"./star-82cb155e.js";const o=({status:a,className:r,...s})=>{const i={[t.PAID]:{classNames:"bg-green-100 text-green-500"},[t.UNPAID]:{classNames:"bg-red-100 text-red-500"}};return e.jsx("div",{className:v("rounded-xl px-3 py-1 font-semibold inline-flex first-letter:uppercase",r,i[a].classNames),children:u(a)})},L=()=>{const{rideId:a}=N(),{isCompanyTransportRide:r}=T(),{data:s,isLoading:i,isError:d,refetch:h}=R({rideId:a}),j=()=>y({origin:s.origin.coordinates,destination:s.destination.coordinates});return e.jsx("div",{id:"transport-ride-details",children:e.jsxs("div",{className:"container mx-auto px-4",children:[i&&e.jsx(f,{}),!i&&d&&e.jsx(p,{tryAgain:h}),!i&&!d&&s&&e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{className:"space-y-1",children:[e.jsxs("h1",{className:"font-bold",children:["Course ",e.jsx("span",{className:"text-primary",children:s._id})]}),e.jsx("div",{className:"text-stone-400 text-xl",children:g(s.creationDate).format("DD MMMM YYYY à HH:mm")}),e.jsx(D,{status:s.status})]}),e.jsxs("div",{className:"grid gap-4 grid-cols-12",children:[e.jsxs("div",{className:"col-span-3 space-y-4",children:[e.jsxs("div",{className:"shadow-lg bg-white p-5 rounded-xl",children:[e.jsx("h4",{className:"font-medium mb-4",children:"Utilisateur"}),e.jsxs("div",{className:"flex items-center gap-2",children:[e.jsx("img",{src:s.user.photo.src,className:"w-16 h-16 rounded-full",alt:""}),e.jsx("div",{className:"ml-2 font-medium text-gray-700",children:l(s.user.firstName,s.user.lastName)})]})]}),s.driverId&&e.jsxs("div",{className:"shadow-lg bg-white p-5 rounded-xl",children:[e.jsx("h4",{className:"font-medium mb-4",children:"Chauffeur"}),e.jsx(c,{to:`/drivers/profile/${s.driverId}`,children:e.jsxs("div",{className:"flex items-center mb-2",children:[e.jsxs("div",{className:"flex flex-1 items-center gap-2",children:[e.jsx("img",{src:s.driver.photo.src,className:"w-16 h-16 rounded-full",alt:""}),e.jsx("div",{className:"ml-2 font-medium text-gray-700",children:l(s.driver.firstName,s.driver.lastName)})]}),e.jsx(x,{className:"text-gray-700",size:20})]})})]}),s.engineId&&e.jsxs("div",{className:"shadow-lg bg-white p-5 rounded-xl",children:[e.jsx("h4",{className:"font-medium mb-4",children:"Engin"}),e.jsx(c,{to:`/engines/details/${s.engineId}`,children:e.jsxs("div",{className:"flex items-center mb-2",children:[e.jsxs("div",{className:"flex flex-1 items-center gap-2",children:[e.jsx("img",{src:s.engine.firstPhoto.src,className:"w-20 h-20 rounded-xl",alt:""}),e.jsxs("div",{children:[e.jsx("div",{className:"font-medium text-gray-700",children:s.engine.name}),e.jsx("div",{className:"text-blue",children:s.engine.year}),e.jsx("div",{className:"flex justify-between items-center",children:e.jsx("div",{className:"border-2 border-stone-300 py-1 px-2 rounded-lg inline-flex",children:s.engine.licencePlate})})]})]}),e.jsx(x,{className:"text-gray-700",size:20})]})})]})]}),e.jsx("div",{className:"col-span-6 space-y-4",children:e.jsxs("div",{className:"shadow-lg bg-white p-5 rounded-xl space-y-4",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium mb-2",children:"Détails"}),e.jsxs("div",{className:"flex justify-between mb-2",children:[e.jsxs("div",{className:"space-y-2 flex-1",children:[e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("div",{children:e.jsx(P,{size:20})}),e.jsx("div",{className:"ml-2",children:s.originAddress})]}),e.jsxs("div",{className:"flex items-center gap-1",children:[e.jsx("div",{children:e.jsx(S,{size:20})}),e.jsx("div",{className:"ml-2",children:s.destinationAddress})]})]}),e.jsx("div",{children:e.jsxs("a",{href:j(),target:"_blank",className:"btn btn-sm btn-ghost btn-active",children:[e.jsx(A,{size:20}),e.jsx("span",{className:"ml-2",children:"ouvrir"})]})})]}),e.jsxs("div",{className:"space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{children:"Durée estimée"}),e.jsx("div",{className:"font-medium",children:b(s.duration)})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{children:"Distance"}),e.jsx("div",{className:"font-medium",children:w(s.distance)})]}),e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{children:"Passagers"}),e.jsx("div",{className:"font-medium",children:s.numberOfPassengers})]}),e.jsxs("div",{children:[e.jsx("div",{children:"Cargaison"}),e.jsx("div",{className:"text-stone-500",children:s.description})]})]})]}),s.userReview&&e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium mb-2",children:"Avis et note du client"}),e.jsx(m,{currentRating:s.userReview.rating}),s.userReview.reviewNote&&e.jsx("p",{className:"text-stone-500 mt-1",children:s.userReview.reviewNote})]}),s.driverReview&&e.jsxs("div",{children:[e.jsx("h4",{className:"font-medium mb-2",children:"Avis et note du chauffeur"}),e.jsx(m,{currentRating:s.driverReview.rating}),s.driverReview.reviewNote&&e.jsx("p",{className:"text-stone-500 mt-1",children:s.driverReview.reviewNote})]})]})}),e.jsx("div",{className:"col-span-3 space-y-4",children:e.jsxs("div",{className:"shadow-lg bg-white p-5 rounded-xl",children:[e.jsx("h4",{className:"font-medium mb-4",children:"Prix et revenus"}),e.jsxs("div",{className:"space-y-2",children:[s.price&&e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{children:"Prix"}),e.jsx("div",{className:"font-bold text-green-500",children:n(s.price)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{children:"Revenus de l'application"}),e.jsx("div",{className:"font-bold text-green-500",children:n(s.appRevenues)})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{children:"Revenus du chauffeur"}),e.jsx("div",{className:"font-bold text-green-500",children:n(s.driverRevenues)})]}),r(s)&&e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{children:"Revenus de l'entreprise"}),e.jsx(o,{status:s.companyRevenuesStatus})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("div",{children:"Revenus de l'application"}),e.jsx(o,{status:s.appRevenuesStatus})]})]})]})})]})]})]})})};export{L as default};
