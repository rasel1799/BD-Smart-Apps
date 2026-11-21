var APP_HOME_SERVICES = [
  { icon: "💬", name: "অনলাইন ইউজার লাইভ চ্যাট", color: "#0284c7", action: "OPEN_CHAT" },
  { icon: "⬇️", name: "ভিডিও ডাউনলোডার", color: "#10b981", action: "OPEN_DL" },
  { icon: "🍿", name: "ফ্রি মুভি ও ভিডিও", color: "#8b5cf6", action: "https://moviemohol420" + ".blogspot.com", ad: true },
  { icon: "📶", name: "সস্তায় সিম অফার", color: "#d97706", action: "TAB_OFFERS" },
  { icon: "🎮", name: "কুইজ খেলে আয়", color: "#e11d48", action: "TAB_GAME" },
  { icon: "📋", name: "প্রতিদিনের টাস্ক", color: "#0d9488", action: "TAB_TASKS" }
];

var FIREBASE_DB_URL = "https://bd-smart-earn-d83e7-default-rtdb" + ".asia-southeast1.firebasedatabase.app";

(function() {
  var myId = "user_" + Math.floor(Math.random() * 90000 + 10000);
  var myCode = "BD User #" + String(myId).slice(-4);
  try {
    var u = window.Telegram.WebApp.initDataUnsafe.user;
    if (u) { myId = "tg_" + u.id; myCode = "BD User #" + String(u.id).slice(-4); }
  } catch (e) {}

  setTimeout(function() {
    var homeTab = document.getElementById("tab-home");
    if (homeTab) {
      var cards = homeTab.getElementsByClassName("card");
      if (cards.length >= 3) cards[2].style.display = "none";

      var hBox = document.createElement("div");
      hBox.className = "card";
      hBox.innerHTML = '<div class="card-title">🚀 সকল সেবা ও সুবিধাসমূহ</div><div id="hGrid" style="display:grid; grid-template-columns:1fr 1fr; gap:10px;"></div><div id="hDlBox" style="display:none; margin-top:12px; background:#0f1420; padding:12px; border-radius:10px; border:1px solid #10b981;"><input type="text" id="hVidInp" placeholder="TikTok ভিডিও লিংক পেস্ট করুন..." /><button type="button" class="btn btn-green" id="hVidBtn">⬇️ ডাউনলোড লিংক তৈরি করুন</button><div id="hVidRes" style="margin-top:8px;"></div></div>';
      homeTab.appendChild(hBox);

      var grid = document.getElementById("hGrid");
      APP_HOME_SERVICES.forEach(function(s) {
        var b = document.createElement("button");
        b.type = "button"; b.className = "btn"; b.style.background = s.color;
        b.style.padding = "12px 6px"; b.style.display = "flex"; b.style.flexDirection = "column"; b.style.alignItems = "center"; b.style.gap = "4px";
        b.innerHTML = '<span style="font-size:20px;">' + s.icon + '</span><span style="font-size:12px;">' + s.name + '</span>';
        b.onclick = function() {
          if (s.action === "OPEN_CHAT" || s.action === "TAB_OFFERS") { document.querySelector('.nav-item[data-tab="offers"]').click(); window.scrollTo(0, 0); }
          else if (s.action === "OPEN_DL") { var d = document.getElementById("hDlBox"); d.style.display = d.style.display === "none" ? "block" : "none"; }
          else if (s.action === "TAB_GAME") document.querySelector('.nav-item[data-tab="game"]').click();
          else if (s.action === "TAB_TASKS") document.querySelector('.nav-item[data-tab="tasks"]').click();
          else { if (s.ad && typeof runMonetagAd === "function") runMonetagAd(); window.open(s.action, "_blank"); }
        };
        grid.appendChild(b);
      });

            document.getElementById("hVidBtn").onclick = function() {
        var url = document.getElementById("hVidInp").value.trim();
        if (!url) return showToast("আগে একটি ভিডিও লিংক পেস্ট করুন!", true);
                    var targetBlogUrl = "https://downloader90" + ".blogspot" + ".com/p/video-downloader.html?v=" + encodeURIComponent(url);
       showToast("⏳ বিজ্ঞাপন শেষে আপনার ডাউনলোড পেজ খুলবে...", false);
        if (typeof runMonetagAd === "function") {
          runMonetagAd(function() {
            window.open(targetBlogUrl, "_blank");
          });
        } else {
          window.open(targetBlogUrl, "_blank");
        }
      };
    }

    var offersTab = document.getElementById("tab-offers");
    if (!offersTab) return;
    var oldChat = document.getElementById("liveChatBox");
    if (oldChat) oldChat.parentNode.style.display = "none";

    var card = document.createElement("div");
    card.className = "card";
    card.innerHTML = '<div class="card-title" style="display:flex; justify-content:space-between;"><span>💬 কমিউনিটি ও প্রাইভেট চ্যাট</span><span id="onBadge" style="background:#10b981; color:#fff; padding:2px 8px; border-radius:10px; font-size:11px;">🟢 অনলাইন: 1</span></div><div style="display:flex; gap:6px; margin-bottom:10px;"><button type="button" class="btn btn-sm" id="bChat" style="flex:1; background:#0284c7;">🌐 সবার চ্যাট</button><button type="button" class="btn btn-sm" id="bUser" style="flex:1; background:#1e293b;">👥 ইউজার ও ইনবক্স</button></div><div id="vChat"><div id="cMsgs" style="height:190px; overflow-y:auto; background:#0f1420; padding:10px; border-radius:10px; margin-bottom:8px; font-size:12px;"></div><div style="display:flex; gap:6px;"><input type="text" id="cInp" placeholder="সবার সাথে কথা বলুন..." style="margin:0; flex:1;" /><button type="button" class="btn btn-sm btn-green" id="cSend">পাঠান</button></div></div><div id="vUser" style="display:none;"><div id="fReqBox"></div><div id="uList" style="max-height:220px; overflow-y:auto;"></div></div><div id="vPriv" style="display:none;"><div style="display:flex; justify-content:space-between; background:#1e1b4b; padding:7px 10px; border-radius:8px; margin-bottom:8px;"><span id="pTitle" style="font-size:12px; color:#a78bfa; font-weight:700;">🔒 প্রাইভেট চ্যাট</span><button type="button" class="btn btn-sm" style="background:#334155; padding:3px 8px;" id="pBack">⬅️ ফিরে যান</button></div><div id="pMsgs" style="height:180px; overflow-y:auto; background:#0f1420; padding:10px; border-radius:10px; margin-bottom:8px; font-size:12px;"></div><div style="display:flex; gap:6px;"><input type="text" id="pInp" placeholder="ব্যক্তিগত মেসেজ লিখুন..." style="margin:0; flex:1;" /><button type="button" class="btn btn-sm btn-purple" id="pSend">পাঠান</button></div></div>';
    offersTab.insertBefore(card, offersTab.firstChild);

    var pFriend = null, friends = {};
    document.getElementById("bChat").onclick = function() {
      pFriend = null; document.getElementById("vChat").style.display = "block"; document.getElementById("vUser").style.display = "none"; document.getElementById("vPriv").style.display = "none";
      this.style.background = "#0284c7"; document.getElementById("bUser").style.background = "#1e293b";
    };
    document.getElementById("bUser").onclick = document.getElementById("pBack").onclick = function() {
      pFriend = null; document.getElementById("vChat").style.display = "none"; document.getElementById("vUser").style.display = "block"; document.getElementById("vPriv").style.display = "none";
      document.getElementById("bUser").style.background = "#0284c7"; document.getElementById("bChat").style.background = "#1e293b";
    };

    window.openP = function(fid, fcode) {
      pFriend = fid; document.getElementById("vUser").style.display = "none"; document.getElementById("vPriv").style.display = "block";
      document.getElementById("pTitle").innerText = "🔒 " + fcode; loadP();
    };
    function rId(a, b) { return a < b ? a + "_" + b : b + "_" + a; }

    document.getElementById("pSend").onclick = function() {
      var t = document.getElementById("pInp").value.trim(); if (!t || !pFriend) return;
      document.getElementById("pInp").value = "";
      fetch(FIREBASE_DB_URL + "/private_chats/" + rId(myId, pFriend) + ".json", { method: "POST", body: JSON.stringify({ uid: myId, text: t }) }).then(loadP);
    };
    function loadP() {
      if (!pFriend) return;
      fetch(FIREBASE_DB_URL + "/private_chats/" + rId(myId, pFriend) + ".json?orderBy=\"$key\"&limitToLast=25").then(r => r.json()).then(d => {
        var h = ""; if (d) Object.keys(d).forEach(k => { var m = d[k], me = m.uid === myId; h += '<div style="margin-bottom:5px; text-align:' + (me ? 'right' : 'left') + ';"><span style="display:inline-block; background:' + (me ? '#8b5cf6' : '#1e293b') + '; padding:5px 9px; border-radius:8px;">' + m.text + '</span></div>'; });
        document.getElementById("pMsgs").innerHTML = h || '<p style="color:#94a3b8; text-align:center;">কথা বলা শুরু করুন!</p>';
      });
    }

    document.getElementById("cSend").onclick = function() {
      var t = document.getElementById("cInp").value.trim(); if (!t) return;
      document.getElementById("cInp").value = "";
      fetch(FIREBASE_DB_URL + "/messages.json", { method: "POST", body: JSON.stringify({ uid: myId, code: myCode, text: t }) }).then(syncAll);
    };

    function ping() { fetch(FIREBASE_DB_URL + "/users/" + myId + ".json", { method: "PATCH", body: JSON.stringify({ code: myCode, last: Date.now() }) }); }
    ping(); setInterval(ping, 10000);

    function ago(ts) {
      var s = Math.floor((Date.now() - ts) / 1000);
      if (s < 25) return "on"; if (s < 60) return s + "সে. আগে";
      if (s < 3600) return Math.floor(s / 60) + "মি. আগে"; return Math.floor(s / 3600) + "ঘ. আগে";
    }

    window.addF = function(tid) {
      fetch(FIREBASE_DB_URL + "/requests/" + tid + "/" + myId + ".json", { method: "PUT", body: JSON.stringify({ status: "pending" }) }).then(() => showToast("✅ ফ্রেন্ড রিকোয়েস্ট পাঠানো হয়েছে!", false));
    };
    window.accF = function(sid) {
      fetch(FIREBASE_DB_URL + "/requests/" + myId + "/" + sid + ".json", { method: "PUT", body: JSON.stringify({ status: "accepted" }) });
      fetch(FIREBASE_DB_URL + "/requests/" + sid + "/" + myId + ".json", { method: "PUT", body: JSON.stringify({ status: "accepted" }) }).then(() => { showToast("🎉 বন্ধু হয়েছেন! ইনবক্স আনলক হয়েছে।", false); syncAll(); });
    };

    function syncAll() {
      fetch(FIREBASE_DB_URL + "/requests/" + myId + ".json").then(r => r.json()).then(reqs => {
        friends = {}; var rh = "";
        if (reqs) Object.keys(reqs).forEach(s => {

 if (reqs[s].status === "accepted") friends[s] = true;
          else if (reqs[s].status === "pending") rh += '<div style="background:#1e1b4b; padding:7px; border-radius:8px; margin-bottom:5px; display:flex; justify-content:space-between; font-size:12px;"><span>🔔 BD User #' + s.slice(-4) + ' রিকোয়েস্ট পাঠিয়েছে</span><button class="btn btn-sm btn-green" onclick="accF(\'' + s + '\')">Accept</button></div>';
        });
        document.getElementById("fReqBox").innerHTML = rh;
        return fetch(FIREBASE_DB_URL + "/users.json");
      }).then(r => r.json()).then(us => {
        if (!us) return; var on = 0, uh = "";
        Object.keys(us).forEach(id => {
          var st = ago(us[id].last || 0); if (st === "on") on++; if (id === myId) return;
          var cn = us[id].code || ("BD User #" + id.slice(-4)), isF = friends[id];
          var sb = st === "on" ? '<span style="color:#10b981;">🟢 অনলাইন</span>' : '<span style="color:#94a3b8;">⚫ অফলাইন (' + st + ')</span>';
          var bt = isF ? '<button class="btn btn-sm btn-green" onclick="openP(\'' + id + '\',\'' + cn + '\')">🔒 ইনবক্স</button>' : '<button class="btn btn-sm btn-purple" onclick="addF(\'' + id + '\')">➕ ফ্রেন্ড</button>';
          uh += '<div class="task-item" style="padding:7px 10px;"><div><h4>' + (isF ? "✅ " : "") + cn + '</h4><span>' + sb + '</span></div>' + bt + '</div>';
        });
        document.getElementById("onBadge").innerText = "🟢 অনলাইন: " + on;
        document.getElementById("uList").innerHTML = uh || '<p style="font-size:12px; color:#94a3b8;">অন্য কোনো ইউজার নেই।</p>';
        return fetch(FIREBASE_DB_URL + "/messages.json?orderBy=\"$key\"&limitToLast=25");
      }).then(r => r.json()).then(ms => {
        var mh = ""; if (ms) Object.keys(ms).forEach(k => { var m = ms[k], me = m.uid === myId; mh += '<div style="margin-bottom:5px; text-align:' + (me ? 'right' : 'left') + ';"><small style="color:#38bdf8; font-size:10px; display:block;">' + (me ? 'আপনি' : m.code) + '</small><span style="display:inline-block; background:' + (me ? '#0284c7' : '#1e293b') + '; padding:5px 9px; border-radius:8px;">' + m.text + '</span></div>'; });
        document.getElementById("cMsgs").innerHTML = mh || '<p style="color:#94a3b8; text-align:center;">প্রথম মেসেজটি পাঠান!</p>';
      });
      if (pFriend) loadP();
    }
    setInterval(syncAll, 4000); syncAll();
  }, 500);
})();
