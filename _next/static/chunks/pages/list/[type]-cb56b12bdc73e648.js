(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[306],{5445:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/list/[type]",function(){return n(5479)}])},5479:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return S},default:function(){return M}});var r=n(8961),s=n(1527),a=n(2519),i=n.n(a),o=n(8470),l=n.n(o),c=n(959);function d(e){var t,n=e.tags.website;return n?(0,s.jsx)("a",{href:n,target:"_blank",rel:"noopener noreferrer",children:(t=n,new URL(t).hostname)}):null}function u(e){return(0,s.jsxs)(c.Fragment,{children:[(0,s.jsx)("a",{href:"https://www.openstreetmap.org/".concat(e.type,"/").concat(e.osm_id),target:"_blank",rel:"noreferrer",children:"\ud83d\uddfa"}),(0,s.jsx)("a",{href:"https://www.openstreetmap.org/edit?".concat(e.type,"=").concat(e.osm_id),target:"_blank",rel:"noreferrer",children:"\u270d\ufe0f"})]})}function h(e){return"".concat(e.tags["addr:street"]||""," ").concat(e.tags["addr:housenumber"]||"")}function p(e){return e.tags["addr:postcode"]}function m(e){if(!e.tags.opening_hours)return null;try{var t=new(l())(e.tags.opening_hours,{lat:parseInt(e.lat,10),lon:parseInt(e.lon,10),address:{country_code:"be",state:""}}).getStateString();if("open"===t)return(0,s.jsx)("span",{className:"opening open",children:"Ouvert"});if(["closed","close"].includes(t))return(0,s.jsx)("span",{className:"opening closed",children:"Ferm\xe9"})}catch(n){return console.warn(n),null}}var x=function(e){var t=e.items,n=e.withOpening,r=void 0!==n&&n;return(0,s.jsxs)("table",{className:"table-fill",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{}),(0,s.jsx)("th",{children:"Nom"}),(0,s.jsx)("th",{children:"Adresse"}),(0,s.jsx)("th",{children:"CP"}),(0,s.jsx)("th",{children:"Web"}),r?(0,s.jsx)("th",{children:"Ouvert ?"}):null]})}),(0,s.jsx)("tbody",{children:t.map((function(e){var t;return(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:u(e)}),(0,s.jsx)("td",{children:null===(t=e.tags)||void 0===t?void 0:t.name}),(0,s.jsx)("td",{children:h(e)}),(0,s.jsx)("td",{children:p(e)}),(0,s.jsx)("td",{children:d(e)}),r?(0,s.jsx)("td",{children:m(e)}):null]},e.osm_id)}))})]})},j={elementary:"Maternelle",primary:"Primaire",secondary:"Secondaire",0:"Maternelle",1:"Primaire",2:"Secondaire",3:"Secondaire Sup\xe9rieur"};function f(e){var t,n=e.tags.school||e.tags["isced:level"];if(n)return n.split(";").map((function(e){return(0,s.jsx)("span",{className:"tag",children:null!==(t=j[e])&&void 0!==t?t:e},"level")}))}var g=function(e){var t=e.items;return(0,s.jsxs)("table",{className:"table-fill",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{children:[(0,s.jsx)("th",{}),(0,s.jsx)("th",{children:"Nom"}),(0,s.jsx)("th",{children:"Adresse"}),(0,s.jsx)("th",{children:"CP"}),(0,s.jsx)("th",{children:"Niveau"}),(0,s.jsx)("th",{children:"Web"})]})}),(0,s.jsx)("tbody",{children:t.map((function(e){return(0,s.jsxs)("tr",{children:[(0,s.jsx)("td",{children:u(e)}),(0,s.jsx)("td",{children:e.tags.name}),(0,s.jsx)("td",{children:h(e)}),(0,s.jsx)("td",{children:p(e)}),(0,s.jsx)("td",{children:f(e)}),(0,s.jsx)("td",{children:d(e)})]},e.osm_id)}))})]})},b=n(246),v=n.n(b),y=(n(4105),function(e){var t=e.items,n=e.initialLat,r=e.initialLon,a=e.outerBox,i=(0,c.useRef)(null),o=(0,c.useRef)(),l=(0,c.useState)(r)[0],d=(0,c.useState)(n)[0],u=(0,c.useState)(13)[0];return(0,c.useEffect)((function(){if(!o.current&&i.current){var e=new(v().Map)({container:i.current,style:"https://api.maptiler.com/maps/bright/style.json?key=UVAKtN0Z84SNZiFO1wFP",center:[l,d],zoom:u});o.current=e,e.addControl(new(v().NavigationControl)({}),"top-right"),e.setMaxBounds(a),t.map((function(t){new(v().Marker)({color:"#FF0000"}).setLngLat([parseFloat(t.lon),parseFloat(t.lat)]).addTo(e)}))}})),(0,s.jsx)("div",{className:"map-wrap",children:(0,s.jsx)("div",{ref:i,className:"map"})})}),w=n(8749),_=n.n(w),C=n(2729),N=n(168);n(1728);N.kL.register(N.ST,N.jn,N.od,N.f$,N.Dx,N.u,N.FB,N.RM);var F=function(e){var t=e.data,n=e.title,r=e.dataType,a={responsive:!0,scales:{y:{beginAtZero:!0,position:"left",ticks:{color:"white"},grid:{borderColor:"white",tickColor:"white",color:"#3a6ace"}},x:{type:"time",time:{unit:"day",format:"dd/MM/YY",tooltipFormat:"dd/MM/yyyy"},ticks:{color:"white"},grid:{borderColor:"white",tickColor:"white",color:"#3a6ace"}}},plugins:{legend:{display:!1},title:{display:!0,color:"white",text:n},tooltip:{enabled:!0}}},i={datasets:[{label:"Nombre de ".concat(r),data:t.map((function(e){return{x:new Date(e.date),y:e.count}})),borderColor:"rgb(255, 99, 132)",backgroundColor:"rgba(255, 99, 132, 0.5)"}]};return(0,s.jsx)("div",{children:(0,s.jsx)(C.kL,{type:"line",data:i,options:a})})};N.kL.register(N.uw,N.jI,N.f$,N.qi,N.Dx,N.u,N.De);var k=function(e){var t=e.data,n=e.title,r=(e.dataType,{responsive:!0,plugins:{legend:{position:"bottom",labels:{color:"white"}},title:{display:!0,text:n,color:"white"}}}),a={labels:t.map((function(e){return e.username})),datasets:[{label:"Contributions",data:t.map((function(e){return e.count})),backgroundColor:["#0074D9","#FF4136","#2ECC40","#FF851B","#7FDBFF","#B10DC9","#FFDC00","#001f3f","#39CCCC","#01FF70","#85144b","#F012BE","#3D9970","#111111","#AAAAAA"]}]};return(0,s.jsx)("div",{children:(0,s.jsx)(C.kL,{type:"doughnut",data:a,options:r})})},S=!0,M=function(e){var t,n=e.city,a=e.items,o=e.history,l=e.listDefinition,c=e.contributors;return t="School"==l.component?(0,s.jsx)(g,{items:a}):(0,s.jsx)(x,(0,r.Z)({items:a},l.props)),(0,s.jsxs)("div",{className:"page-container",children:[(0,s.jsxs)(_(),{children:[(0,s.jsxs)("title",{children:[l.name," \xe0 ",n.name]}),(0,s.jsx)("meta",{name:"description",content:"Tout sur ".concat(n.name)})]}),(0,s.jsxs)("h1",{className:"category",children:[(0,s.jsx)(i(),{href:"/",children:"\xab"})," ",l.name," \xe0 ",n.name]}),(0,s.jsxs)("div",{className:"category-head",children:["Liste des ",a.length," elements de la ville de ",n.name," d'apr\xe8s les donn\xe9es de la carte collaborative OpenStreetMap. En cas d'erreur ou d'omission, il suffit de cliquer sur l'ic\xf4ne en d\xe9but de ligne pour modifier ce qui doit l'\xeatre... Les \xe9lements selection\xe9s ici portent l'attribut ",(0,s.jsx)("code",{children:l.tags})]}),t,(0,s.jsx)(y,{items:a,initialLat:n.center.lat,initialLon:n.center.lon,outerBox:n.bbox}),(0,s.jsxs)("div",{className:"charts-container",children:[(0,s.jsx)(k,{data:c,title:"Contributeurs sur OpenStreetMap",dataType:l.name}),(0,s.jsx)(F,{data:o,title:"".concat(l.name," \xe0 ").concat(n.name," encod\xe9s sur Openstreetmap"),dataType:l.name})]}),(0,s.jsxs)("footer",{children:["Les tableaux et les cartes ci-dessus sont g\xe9n\xe9r\xe9s a partir de la base de donn\xe9es collaborative OpenStreetMap. Compl\xe9ter les donn\xe9es d'Openstreetmap c'est aussi am\xe9liorer ces listes.",(0,s.jsx)("br",{}),(0,s.jsx)("a",{href:"https://github.com/eMerzh/labas",children:"https://github.com/eMerzh/labas"})]})]})}}},function(e){e.O(0,[642,805,553,412,739,774,888,179],(function(){return t=5445,e(e.s=t);var t}));var t=e.O();_N_E=t}]);