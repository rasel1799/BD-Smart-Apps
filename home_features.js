var APP_HOME_SERVICES = [
  { icon: "💬", name: "অনলাইন ইউজার লাইভ চ্যাট", color: "#0284c7", action: "OPEN_CHAT" },
  { icon: "⬇️", name: "ভিডিও ডাউনলোডার", color: "#10b981", action: "OPEN_DL" },
  { icon: "🍿", name: "ফ্রি মুভি ও ভিডিও", color: "#8b5cf6", action: "https://blogspot.com", ad: true },
  { icon: "📶", name: "সস্তায় সিম অফার", color: "#d97706", action: "TAB_OFFERS" },
  { icon: "🎮", name: "কুইজ খেলে আয়", color: "#e11d48", action: "TAB_GAME" },
  { icon: "📋", name: "প্রতিদিনের টাস্ক", color: "#0d9488", action: "TAB_TASKS" }
];

setTimeout(function() {
  var homeTab = document.getElementById("tab-home");
  if (!homeTab) return;
  
  // আগের ছোট 'জনপ্রিয় সেবাসমূহ' কার্ডটি লুকিয়ে রাখা
  var cards = homeTab.getElementsByClassName("card");
  if (cards.length >= 3) cards[2].style.display = "none";

  var box = document.createElement("div");
  box.className = "card";
  box.innerHTML = '<div class="card-title">🚀 সকল সেবা ও সুবিধাসমূহ</div><div id="hGrid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;"></div><div id="hDlBox" style="display:none; margin-top:12px; background:#0f1420; padding:12px; border-radius:10px; border:1px solid #10b981;"><input type="text" id="hVidInp" placeholder="TikTok ভিডিও লিংক পেস্ট করুন..." /><button type="button" class="btn btn-green" id="hVidBtn">⬇️ ডাউনলোড লিংক তৈরি করুন</button><div id="hVidRes" style="margin-top:8px;"></div></div>';
  homeTab.appendChild(box);

  var grid = document.getElementById("hGrid");
  APP_HOME_SERVICES.forEach(function(s) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "btn"; b.style.background = s.color;
    b.style.padding = "12px 6px"; b.style.display = "flex"; b.style.flexDirection = "column"; b.style.alignItems = "center"; b.style.gap = "4px";
    b.innerHTML = '<span style="font-size:20px;">' + s.icon + '</span><span style="font-size:12px;">' + s.name + '</span>';
    b.onclick = function() {
      if (s.action === "OPEN_CHAT" || s.action === "TAB_OFFERS") document.querySelector('.nav-item[data-tab="offers"]').click();
      else if (s.action === "OPEN_DL") { var d = document.getElementById("hDlBox"); d.style.display = d.style.display === "none" ? "block" : "none"; }
      else if (s.action === "TAB_GAME") document.querySelector('.nav-item[data-tab="game"]').click();
      else if (s.action === "TAB_TASKS") document.querySelector('.nav-item[data-tab="tasks"]').click();
      else { if (s.ad && typeof runMonetagAd === "function") runMonetagAd(); window.open(s.action, "_blank"); }
    };
    grid.appendChild(b);
  });

  document.getElementById("hVidBtn").onclick = function() {
    var url = document.getElementById("hVidInp").value.trim();
    if (!url) return showToast("ভিডিও লিংক দিন!", true);
    if (typeof runMonetagAd === "function") runMonetagAd();
    var res = document.getElementById("hVidRes");
    res.innerHTML = '<p style="font-size:12px; color:#facc15;">⏳ প্রসেস হচ্ছে...</p>';
    fetch("https://tikwm.com" + encodeURIComponent(url)).then(r => r.json()).then(d => {
      if (d && d.data && d.data.play) res.innerHTML = '<a href="' + d.data.play + '" target="_blank" download class="btn btn-purple" style="display:block; text-align:center; text-decoration:none;">✅ ভিডিও সেভ করুন</a>';
      else res.innerHTML = '<p style="font-size:12px; color:#f43f5e;">⚠️ সঠিক পাবলিক লিংক দিন।</p>';
    });
  };
}, 500);

