// 1. Home & Chat Loader
if (!window.BD_CHAT_LOADED) {
  window.BD_CHAT_LOADED = true;
  var cs = document.createElement("script");
  cs.src = "chat.js?v=12";
  document.body.appendChild(cs);
}

// 2. Monetag Direct SDK (Zone: 12280333)
try {
  var ms = document.createElement("script");
  ms.src = "https://libtl" + ".com/sdk.js";
  ms.dataset.zone = "12280333";
  ms.dataset.sdk = "show_12280333";
  (document.head || document.documentElement).appendChild(ms);
} catch (e) {}

function runMonetagAd(cb) {
  if (typeof window["show_12280333"] === "function") {
    showToast("⏳ বিজ্ঞাপন লোড হচ্ছে...", false);
    window["show_12280333"]().then(function() {
      if (cb) cb();
    }).catch(function() {
      showToast("⚠️ বিজ্ঞাপন বন্ধ করা হয়েছে।", true);
    });
  } else {
    showToast("ℹ️ ৫ সেকেন্ড অপেক্ষা করুন।", true);
    if (cb) cb();
  }
}

document.addEventListener("click", function(e) {
  var t = e.target ? e.target.innerText : "";
  if (e.target && e.target.id === "bonusBtn") runMonetagAd();
  if (t === "দেখুন") {
    e.preventDefault();
    runMonetagAd(function() {
      showToast("🎉 বিজ্ঞাপন সম্পন্ন!", false);
    });
  }
});

// 3. Telegram Withdraw & Live Payment History
var ADMIN_BOT_TOKEN = "9063322268:AAFiBMNJxOUKQKcHoudvX3iH6aKemPq8Mx8";
var ADMIN_CHAT_ID = "1920591350";
var LIVE_DB = "https://bd-smart-earn-d83e7-default-rtdb" + ".asia-southeast1.firebasedatabase.app";

setTimeout(function() {
  var wBtn = document.getElementById("withdrawBtn");
  if (!wBtn) return;
  var nw = wBtn.cloneNode(true);
  wBtn.parentNode.replaceChild(nw, wBtn);

  nw.onclick = function() {
    var m = document.getElementById("payMethod").value;
    var n = document.getElementById("payNum").value.trim();
    var a = parseInt(document.getElementById("payAmt").value);
    if (n.length < 11) return showToast("১১ ডিজিটের সঠিক নম্বর দিন!", true);
    if (!a || a < 2000) return showToast("সর্বনিম্ন ২,০০০ কয়েন হতে হবে!", true);
    if (a > coins) return showToast("পর্যাপ্ত কয়েন নেই!", true);

    var uName = "Guest", uId = "Unknown", uUser = "নেই", uCode = "BD User #0000";
    try {
      var tg = window.Telegram.WebApp;
      tg.ready();
      var u = tg.initDataUnsafe.user;
      if (u) {
        uName = u.first_name;
        uId = u.id;
        uCode = "BD User #" + String(u.id).slice(-4);
        if (u.username) uUser = "@" + u.username;
      }
    } catch (e) {}

    var tk = (a / 100).toFixed(0);
    var msg = "💸 নতুন উইথড্র!\n👤 নাম: " + uName + " (" + uUser + ")\n🆔 আইডি: " + uId + "\n💳 মাধ্যম: " + m + "\n📱 নম্বর: " + n + "\n🪙 কয়েন: " + a + " (" + tk + " টাকা)";
    nw.disabled = true;
    nw.innerText = "⏳ পাঠানো হচ্ছে...";

    fetch("https://api.telegram" + ".org/bot" + ADMIN_BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: msg })
    }).then(function(r) { return r.json(); }).then(function(res) {
      nw.disabled = false;
      nw.innerText = "উইথড্র রিকোয়েস্ট পাঠান";
      if (res && res.ok) {
        addCoins(-a);
        document.getElementById("payNum").value = "";
        document.getElementById("payAmt").value = "";
        showToast("✅ উইথড্র সফল! লিডারবোর্ডে যুক্ত হয়েছে।", false);
        fetch(LIVE_DB + "/live_withdrawals.json", {
          method: "POST",
          body: JSON.stringify({ code: uCode, method: m, taka: tk, status: "✅ পেমেন্ট সফল", time: Date.now() })
        });
      } else {
        showToast("⚠️ বটে /start চেপে আসুন!", true);
      }
    }).catch(function() {
      nw.disabled = false;
      nw.innerText = "উইথড্র রিকোয়েস্ট পাঠান";
      showToast("⚠️ নেটওয়ার্ক সমস্যা!", true);
    });
  };
}, 600);

// 4. Referral + Lucky Spin Wheel + Real-time Leaderboard
(function() {
  setTimeout(function() {
    var myUid = "guest_" + (localStorage.getItem("bd_g") || Math.floor(Math.random() * 900000));
    localStorage.setItem("bd_g", myUid.replace("guest_", ""));
    var myCode = "BD User #" + myUid.slice(-4);
    var refParam = "";
    try {
      var tg = window.Telegram.WebApp;
      if (tg.initDataUnsafe.user) {
        myUid = "tg_" + tg.initDataUnsafe.user.id;
        myCode = "BD User #" + String(tg.initDataUnsafe.user.id).slice(-4);
      }
      if (tg.initDataUnsafe.start_param) refParam = tg.initDataUnsafe.start_param;
    } catch (e) {}

    var invLink = "https://t.me" + "/bdsmartearn99_bot/app?startapp=" + myUid;
    var today = new Date().toISOString().slice(0, 10);
    var homeTab = document.getElementById("tab-home");

    if (homeTab && !document.getElementById("myRefCardBox")) {
      var rc = document.createElement("div");
      rc.id = "myRefCardBox";
      rc.className = "card";
      rc.style.borderColor = "#facc15";
      rc.innerHTML = '<div class="card-title" style="color:#facc15;">🤝 বন্ধুকে ইনভাইট (+২০ কয়েন/টাস্ক)</div><p style="font-size:12px; color:#cbd5e1; margin-bottom:8px;">দৈনিক সর্বোচ্চ ১০০ কয়েন/বন্ধু ও ১০ রেফার। আজকের রেফার: <strong id="todayRefCount" style="color:#10b981;">0</strong>/১০</p><div style="display:flex; gap:6px;"><input type="text" id="myRefInput" value="' + invLink + '" readonly style="margin:0; flex:1; font-size:11px; background:#0b0f19; color:#fff;" /><button type="button" class="btn btn-sm btn-green" id="copyRefBtn">কপি</button><button type="button" class="btn btn-sm btn-purple" id="shareRefBtn">শেয়ার</button></div>';
      if (homeTab.children.length > 1) {
        homeTab.insertBefore(rc, homeTab.children[1]);
      } else {
        homeTab.appendChild(rc);
      }
      document.getElementById("copyRefBtn").onclick = function() {
        document.getElementById("myRefInput").select();
        document.execCommand("copy");
        showToast("✅ লিংক কপি হয়েছে!", false);
      };
      document.getElementById("shareRefBtn").onclick = function() {
        window.open("https://t.me" + "/share/url?url=" + encodeURIComponent(invLink) + "&text=" + encodeURIComponent("🎁 ফ্রি কয়েন আয় করুন!"), "_blank");
      };
    }

    if (refParam && refParam !== myUid && myUid.indexOf("tg_") === 0 && !localStorage.getItem("bd_dev_lock")) {
      fetch(LIVE_DB + "/referrals/user_ref/" + myUid + ".json").then(function(r) { return r.json(); }).then(function(ex) {
        if (!ex) {
          fetch(LIVE_DB + "/referrals/daily_limit/" + refParam + "/" + today + ".json").then(function(r) { return r.json(); }).then(function(cnt) {
            if ((cnt || 0) < 10) {
              localStorage.setItem("bd_dev_lock", "1");
              localStorage.setItem("bd_my_ref", refParam);
              fetch(LIVE_DB + "/referrals/user_ref/" + myUid + ".json", { method: "PUT", body: JSON.stringify(refParam) });
              fetch(LIVE_DB + "/referrals/daily_limit/" + refParam + "/" + today + ".json", { method: "PUT", body: JSON.stringify((cnt || 0) + 1) });
            }
          });
        } else {
          localStorage.setItem("bd_my_ref", ex);
        }
      });
    }

    var origAdd = window.addCoins;
    window.addCoins = function(v) {
      origAdd(v);
      if (v > 0 && !window.IS_REF_CLAIM && localStorage.getItem("bd_my_ref")) {
        var gk = "bd_rg_" + today;
        var gv = parseInt(localStorage.getItem(gk) || "0");
        if (gv < 100) {
          localStorage.setItem(gk, gv + 20);
          var rUid = localStorage.getItem("bd_my_ref");
          fetch(LIVE_DB + "/referrals/pending/" + rUid + ".json").then(function(r) { return r.json(); }).then(function(p) {
            fetch(LIVE_DB + "/referrals/pending/" + rUid + ".json", { method: "PUT", body: JSON.stringify((p || 0) + 20) });
          });
        }
      }
    };

    var gameTab = document.getElementById("tab-game");
    if (gameTab && !document.getElementById("luckySpinCardBox")) {
      var spKey = "bd_sp_" + myUid + "_" + today;
      var usedSp = parseInt(localStorage.getItem(spKey) || "0");
      var sc = document.createElement("div");
      sc.id = "luckySpinCardBox";
      sc.className = "card";
      sc.style.textAlign = "center";
      sc.style.borderColor = "#10b981";
      sc.innerHTML = '<div class="card-title" style="color:#10b981;">🎡 লাকি স্পিন হুইল (বাকি: <span id="spLeft">' + Math.max(0, 5 - usedSp) + '</span>/৫)</div><div style="position:relative; width:160px; height:160px; margin:10px auto;"><div style="position:absolute; top:-10px; left:50%; transform:translateX(-50%); font-size:20px; z-index:10; color:#facc15;">▼</div><div id="wCircle" style="width:160px; height:160px; border-radius:50%; border:5px solid #facc15; background:conic-gradient(#0284c7 0deg 60deg, #10b981 60deg 120deg, #8b5cf6 120deg 180deg, #e11d48 180deg 240deg, #d97706 240deg 300deg, #0d9488 300deg 360deg); display:flex; align-items:center; justify-content:center; transition:transform 3.5s ease-out;"><div style="width:50px; height:50px; border-radius:50%; background:#0b0f19; border:2px solid #facc15; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:12px; color:#facc15;">SPIN</div></div></div><button type="button" class="btn btn-green" id="spBtn" ' + (usedSp >= 5 ? 'disabled style="background:#dc2626;"' : '') + '>' + (usedSp >= 5 ? '🔒 আজকের স্পিন শেষ' : '🎯 স্পিন করুন (৫-১৫ কয়েন)') + '</button>';
      gameTab.appendChild(sc);

      var spinning = false;
      var deg = 0;
      var rw =;
      document.getElementById("spBtn").onclick = function() {
        if (spinning || usedSp >= 5) return;
        spinning = true;
        var b = this;
        b.disabled = true;
        b.style.background = "#d97706";
        b.innerText = "⏳ চাকা ঘুরছে...";
        if (typeof runMonetagAd === "function") runMonetagAd();
        var win = rw[Math.floor(Math.random() * rw.length)];
        deg += 1440 + Math.floor(Math.random() * 360);
        document.getElementById("wCircle").style.transform = "rotate(" + deg + "deg)";
        setTimeout(function() {
          usedSp++;
          localStorage.setItem(spKey, usedSp);
Object.keys(cd).forEach(function(id) { arr.push(cd[id]); });
arr.sort(function(a, b) { return (b.coins || 0) - (a.coins || 0); });
var th = "";
for (var i = 0; i < Math.min(arr.length, 12); i++) {
var m = i === 0 ? "🥇" : (i === 1 ? "🥈" : (i === 2 ? "🥉" : "#" + (i + 1)));
th += '' + m + ' ' + arr[i].code + '🪙 ' + arr[i].coins + '';
}
cb.innerHTML = th;
});
}
syncAllLive();
setInterval(syncAllLive, 12000);
}, 700);
})();
