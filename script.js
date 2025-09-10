const drawer=document.getElementById("drawer");const overlay=document.getElementById("overlay");const menuBtn=document.getElementById("menuBtn");const themeToggle=document.getElementById("themeToggle");const container=document.getElementById("predictions");const socialBtn=document.getElementById("socialBtn");menuBtn.addEventListener("click",()=>{drawer.classList.add("open");overlay.classList.add("show")});overlay.addEventListener("click",()=>{drawer.classList.remove("open");overlay.classList.remove("show")});themeToggle.addEventListener("click",()=>{const body=document.body;const theme=body.getAttribute("data-theme")==="light"?"dark":"light";body.setAttribute("data-theme",theme);themeToggle.innerHTML=theme==="light"?'<i class="fas fa-moon"></i>':'<i class="fas fa-sun"></i>'});async function loadPredictions(api="Over_Under"){container.innerHTML="Loading...";try{const res=await fetch(``);let data=await res.json();data.sort((a,b)=>b.id-a.id);container.innerHTML="";data.forEach(p=>{let statusClass="pending";let statusText="⏳ Pending";if(p.status==="won"){statusClass="won";statusText="✅ Won"}
if(p.status==="lost"){statusClass="lost";statusText="❌ Lost"}
const card=document.createElement("div");card.className="card";card.innerHTML=`
        <div class="datetime">${p.date  ""} ${p.time  ""}</div>
        <div class="league-info">
          <img src="${p.league_logo}" alt="${p.league}">
          <span>${p.league}</span>
        </div>
        <div class="match">
          <div class="team">
            <img src="${p.home_logo}" alt="${p.home}">
            <div>${p.home}</div>
          </div>
          <div class="vs">vs</div>
          <div class="team">
            <img src="${p.away_logo}" alt="${p.away}">
            <div>${p.away}</div>
          </div>
        </div>
        <div class="prediction-footer">
          <div class="pick">${p.prediction}</div>
          <div class="meta">Odds ${p.odd || "-"}</div>
          <div class="status ${statusClass}">${statusText}</div>
        </div>
      `;container.appendChild(card)})}catch(err){container.innerHTML="Failed to load predictions."}}
document.querySelectorAll(".drawer a").forEach(a=>{a.addEventListener("click",e=>{e.preventDefault();const api=a.getAttribute("data-api");loadPredictions(api);drawer.classList.remove("open");overlay.classList.remove("show")})});const socials=[{icon:"fa-whatsapp",color:"#25D366",url:"https://whatsapp.com/channel/0029Vb6XFIyK5cDJAbOGgE1W"},{icon:"fa-facebook",color:"#1877F2",url:"https://www.facebook.com/andy.ac.146069"},{icon:"fa-telegram",color:"#0088cc",url:"https://t.me/mysterybet11"}];let index=0;function updateSocial(){const s=socials[index];socialBtn.innerHTML=<i class="fab ${s.icon}"></i>;socialBtn.style.background=s.color;socialBtn.onclick=()=>window.open(s.url,"_blank");index=(index+1)%socials.length}
setInterval(updateSocial,4000);updateSocial();loadPredictions()
