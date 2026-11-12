const products = [
  {id:1,name:"Aqua Dream Wallpapers",category:"digital",tag:"DIGITAL PACK",description:"6 vízparti, buborékos háttérkép telefonra és PC-re.",price:990,word:"AQUA DREAM"},
  {id:2,name:"Glass Icon Set",category:"design",tag:"DESIGN PACK",description:"Üveges hatású ikonok a saját desktopodhoz.",price:1290,word:"GLASS ICONS"},
  {id:3,name:"Blue World Poster",category:"print",tag:"PRINTABLE",description:"Nyomtatható poszter a 2000-es évek hangulatával.",price:790,word:"BLUE WORLD"},
  {id:4,name:"Bubble Sticker Pack",category:"design",tag:"DESIGN PACK",description:"Digitális buborék- és aqua matricák.",price:690,word:"BUBBLE POP"},
  {id:5,name:"Aero Desktop Kit",category:"digital",tag:"DIGITAL PACK",description:"Háttér, mappaborítók és apró desktop extrák.",price:1590,word:"DESKTOP KIT"},
  {id:6,name:"Ocean Mood Prints",category:"print",tag:"PRINTABLE",description:"3 letisztult, óceán ihlette nyomtatható grafika.",price:890,word:"OCEAN MOOD"}
];
const grid=document.getElementById("product-grid");
const cart=[];
const money=n=>n.toLocaleString("hu-HU")+" Ft";
function renderProducts(filter="all"){
  grid.innerHTML=products.filter(p=>filter==="all"||p.category===filter).map(p=>`
    <article class="product-card">
      <div class="product-art"><span class="art-word">${p.word}</span></div>
      <div class="product-info"><span class="tag">${p.tag}</span><h3>${p.name}</h3><p>${p.description}</p>
      <div class="product-buy"><span class="price">${money(p.price)}</span><button class="add" data-add="${p.id}">+ Kosárba</button></div></div>
    </article>`).join("");
}
function renderCart(){
  document.getElementById("cart-count").textContent=cart.reduce((s,p)=>s+p.qty,0);
  document.getElementById("cart-total").textContent=money(cart.reduce((s,p)=>s+p.price*p.qty,0));
  document.getElementById("cart-items").innerHTML=cart.length?cart.map(p=>`
    <div class="cart-line"><span><strong>${p.name}</strong><br>${p.qty} × ${money(p.price)}</span><button data-remove="${p.id}">Eltávolítás</button></div>`).join(""):'<p class="empty-cart">A kosarad még üres. 🌊</p>';
}
function toast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");setTimeout(()=>el.classList.remove("show"),1900)}
document.getElementById("filters").addEventListener("click",e=>{const b=e.target.closest("[data-filter]");if(!b)return;document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter)});
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const p=products.find(x=>x.id===Number(b.dataset.add));const existing=cart.find(x=>x.id===p.id);existing?existing.qty++:cart.push({...p,qty:1});renderCart();toast("Hozzáadva a kosárhoz ✦")});
document.getElementById("cart-items").addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;const i=cart.findIndex(x=>x.id===Number(b.dataset.remove));if(i>-1)cart.splice(i,1);renderCart()});
function toggleCart(open){document.body.classList.toggle("cart-open",open)}
document.getElementById("cart-toggle").onclick=()=>toggleCart(true);
document.getElementById("cart-close").onclick=()=>toggleCart(false);
document.getElementById("cart-backdrop").onclick=()=>toggleCart(false);
document.getElementById("checkout").onclick=()=>{if(!cart.length){toast("A kosarad még üres!");return}const lines=cart.map(p=>`${p.name} – ${p.qty} db – ${money(p.price)}`).join("%0A");location.href=`mailto:hello@example.com?subject=AERO.SHOP%20%C3%A9rdekl%C5%91d%C3%A9s&body=Szia!%0A%C3%89rdekl%C5%91dn%C3%A9k%20a%20k%C3%B6vetkez%C5%91kr%C5%91l:%0A${lines}%0A%0AK%C3%A9rlek%20jelezz%20vissza!`};
renderProducts();renderCart();