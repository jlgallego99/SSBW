(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{47:function(e,t,n){e.exports=n(64)},56:function(e,t,n){},64:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),l=n(40),c=n.n(l),o=(n(56),n(41)),m=n(1),i=n(15),u=n(8),s=n(92),h=n(94),E=n(93),g=n(95),f=n(90),p=n(98),d=n(102),b=n(101),j=n(96),O=n(99),x=n(100),y=n(97);function v(e){var t=Object(a.useState)(!0),n=Object(u.a)(t,2),r=n[0],l=n[1],c=Object(a.useState)(null),o=Object(u.a)(c,2),m=o[0],i=o[1];return Object(a.useEffect)(function(){l(!0),fetch("http://localhost:8000/api/person/").then(function(e){return e.json()}).then(function(e){i(e),l(!1)})},[]),r?a.createElement(a.Fragment,null,a.createElement("h1",null,"Cargando...")):a.createElement(j.a,{component:y.a},a.createElement(p.a,{sx:{minWidth:650},"aria-label":"simple table"},a.createElement(O.a,null,a.createElement(x.a,null,a.createElement(b.a,{align:"right"},"First Name"),a.createElement(b.a,{align:"right"},"Last Name"))),a.createElement(d.a,null,m.map(function(e,t){return a.createElement(x.a,{key:t,sx:{"&:last-child td, &:last-child th":{border:0}}},a.createElement(b.a,{component:"th",scope:"person"},e.firstName),a.createElement(b.a,{align:"right"},e.lastName))}))))}function C(e,t,n,a,r){return{name:e,calories:t,fat:n,carbs:a,protein:r,status:"No"}}function F(){return a.createElement(E.a,{variant:"body2",color:"text.secondary"},"Copyright \xa9 ",a.createElement(f.a,{color:"inherit",href:"https://github.com/jlgallego99"},"Jose Luis Gallego Pe\xf1a")," ",(new Date).getFullYear(),".")}function w(){var e=a.useState([C("Frozen yoghurt",159,6,24,4),C("Ice cream sandwich",237,9,37,4.3),C("Eclair",262,16,24,6),C("Cupcake",305,3.7,67,4.3),C("Gingerbread",356,16,49,3.9)]),t=Object(u.a)(e,2),n=t[0],r=t[1];return a.createElement(h.a,{sx:{display:"flex",flexDirection:"column",minHeight:"100vh"}},a.createElement(s.a,null),a.createElement(g.a,{component:"main",sx:{mt:8,mb:2},maxWidth:"false"},a.createElement(E.a,{variant:"h2",component:"h1",gutterBottom:!0},"Ejemplo React y MUI"),a.createElement(v,{rows:n,handleChange:function(e,t){var a=Object(i.a)(n),l="No";e.target.checked&&(l="Si"),a[t].status=l,r(a)}})),a.createElement(h.a,{component:"footer",sx:{py:3,px:2,mt:"auto",backgroundColor:function(e){return"light"===e.palette.mode?e.palette.grey[200]:e.palette.grey[800]}}},a.createElement(g.a,{maxWidth:"sm"},a.createElement(E.a,{variant:"body1"},"M\xe1ster en Ingenier\xeda Inform\xe1tica (UGR)"),a.createElement(F,null))))}function S(e){var t=Object(a.useState)(!0),n=Object(u.a)(t,2),l=n[0],c=n[1],o=Object(a.useState)(null),m=Object(u.a)(o,2),i=m[0],s=m[1],h=function(){c(!0),fetch("https://dog.ceo/api/breeds/image/random").then(function(e){return e.json()}).then(function(e){s(e.message),c(!1)})};return Object(a.useEffect)(h,[]),l?r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Cargando...")):r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",null,"Perro"),r.a.createElement("img",{src:i,alt:"Perro"}),r.a.createElement("button",{onClick:h},"M\xc1S PERRO"))}var k=function(e){e&&e instanceof Function&&n.e(1).then(n.bind(null,89)).then(function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,l=t.getLCP,c=t.getTTFB;n(e),a(e),r(e),l(e),c(e)})};c.a.createRoot(document.getElementById("root")).render(r.a.createElement(o.a,null,r.a.createElement(m.c,null,r.a.createElement(m.a,{path:"/",element:r.a.createElement(w,null)}),r.a.createElement(m.a,{path:"perro",element:r.a.createElement(S,null)})))),k()}},[[47,3,2]]]);
//# sourceMappingURL=main.6fb3b571.chunk.js.map