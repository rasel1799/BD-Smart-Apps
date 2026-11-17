// ১. হোমপেজ ও লাইভ চ্যাট প্লাগইন (chat.js) লোড করা
if (!window.BD_CHAT_LOADED) {
  window.BD_CHAT_LOADED = true;
  var chatScript = document.createElement("script");
  chatScript.src = "chat.js?v=4";
  document.body.appendChild(chatScript);
}

// ২. Monetag Direct SDK Loader (Zone: 12280333)
try {
  var mScript = document.createElement("script");
  mScript.src = "https://libtl" + ".com/sdk.js";
  mScript.dataset.zone = "12280333";
  mScript.dataset.sdk = "show_12280333";
  (document.head || document.documentElement).appendChild(mScript);
} catch (e) {}

function runMonetagAd(onReward) {
  if (typeof window["show_12280333"] === "function") {
    showToast("⏳ বিজ্ঞাপন লোড হচ্ছে...", false);
    window["show_12280333"]().then(function() {
      if (onReward) onReward();
    }).catch(function() {
      showToast("⚠️ বিজ্ঞাপন বন্ধ করা হয়েছে বা লোড হয়নি।", true);
    });
  } else {
    showToast("ℹ️ মোবাইল ফোনের টেলিগ্রাম অ্যাপ থেকে ওপেন করুন অথবা ৫ সেকেন্ড অপেক্ষা করুন।", true);
    if (onReward) onReward();
  }
}

document.addEventListener("click", function(e) {
  var txt = e.target ? e.target.innerText : "";
  if (e.target && e.target.id === "bonusBtn") {
    runMonetagAd();
  }
  if (txt === "দেখুন") {
    e.preventDefault();
    runMonetagAd(function() {
      showToast("🎉 বিজ্ঞাপন দেখা সম্পন্ন!", false);
    });
  }
});

// ৩. উইথড্র রিকোয়েস্ট (আসল টেলিগ্রাম নাম ও আইডিসহ) সরাসরি আপনার টেলিগ্রামে পাঠানোর প্লাগইন
var ADMIN_BOT_TOKEN = "9063322268:AAFiBMNJxOUKQKcHoudvX3iH6aKemPq8Mx8";
var ADMIN_CHAT_ID = "1920591350";

setTimeout(function() {
  var wBtn = document.getElementById("withdrawBtn");
  if (!wBtn) return;

  var newWBtn = wBtn.cloneNode(true);
  wBtn.parentNode.replaceChild(newWBtn, wBtn);

  newWBtn.onclick = function() {
    var method = document.getElementById("payMethod").value;
    var num = document.getElementById("payNum").value.trim();
    var amt = parseInt(document.getElementById("payAmt").value);

    if (num.length < 11) return showToast("১১ ডিজিটের সঠিক নম্বর দিন!", true);
    if (!amt || amt < 2000) return showToast("সর্বনিম্ন ২,০০০ কয়েন হতে হবে!", true);
    if (amt > coins) return showToast("আপনার ব্যালেন্সে পর্যাপ্ত কয়েন নেই!", true);

    var uName = "Guest User";
    var uId = "Unknown";
    var uUser = "নেই";

    try {
      var tg = window.Telegram && window.Telegram.WebApp;
      if (tg) {
        tg.ready();
        var u = tg.initDataUnsafe && tg.initDataUnsafe.user;
        if (!u && tg.initData) {
          var params = new URLSearchParams(tg.initData);
          if (params.get("user")) u = JSON.parse(params.get("user"));
        }
        if (u) {
          uName = u.first_name + (u.last_name ? " " + u.last_name : "");
          uId = u.id;
          if (u.username) uUser = "@" + u.username;
        }
      }
    } catch (e) {}

    var taka = (amt / 100).toFixed(0);
    var msg = "💸 নতুন উইথড্র রিকোয়েস্ট!\n\n"
            + "👤 নাম: " + uName + "\n"
            + "🔗 ইউজারনেম: " + uUser + "\n"
            + "🆔 আইডি: " + uId + "\n"
            + "💳 মাধ্যম: " + method + "\n"
            + "📱 নম্বর: " + num + "\n"
            + "🪙 কয়েন: " + amt + " (" + taka + " টাকা)";

    newWBtn.disabled = true;
    newWBtn.innerText = "⏳ পাঠানো হচ্ছে...";

    fetch("https://api.telegram" + ".org/bot" + ADMIN_BOT_TOKEN + "/sendMessage", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: ADMIN_CHAT_ID, text: msg })
    })
    .then(function(r) { return r.json(); })
    .then(function(res) {
      newWBtn.disabled = false;
      newWBtn.innerText = "উইথড্র রিকোয়েস্ট পাঠান";
      if (res && res.ok) {
        addCoins(-amt);
        document.getElementById("payNum").value = "";
        document.getElementById("payAmt").value = "";
        showToast("✅ উইথড্র রিকোয়েস্ট সফলভাবে অ্যাডমিনের কাছে পাঠানো হয়েছে!", false);
      } else {
        showToast("⚠️ বটে একবার /start চেপে আসুন!", true);
      }
    })
    .catch(function() {
      newWBtn.disabled = false;
      newWBtn.innerText = "উইথড্র রিকোয়েস্ট পাঠান";
      showToast("⚠️ ইন্টারনেট সংযোগ চেক করুন!", true);
    });
  };
}, 600);

// ৪. প্রগ্রেসিভ রেফারেল প্লাগইন (প্রতিদিন সর্বোচ্চ ১০ রেফার | বন্ধুর প্রতি টাস্কে +২০ কয়েন | দৈনিক সর্বোচ্চ ১০০ কয়েন/বন্ধু)
(function() {
  var DB_URL = "https://bd-smart-earn-d83e7-default-rtdb" + ".asia-southeast1.firebasedatabase.app";
  var BOT_APP_LINK = "https://t.me" + "/bdsmartearn99_bot/app";

  setTimeout(function() {
    var myUid = "";
    var refParam = "";
    try {
      var tg = window.Telegram && window.Telegram.WebApp;
      if (tg && tg.initDataUnsafe) {
        if (tg.initDataUnsafe.user) myUid = "tg_" + tg.initDataUnsafe.user.id;
        if (tg.initDataUnsafe.start_param) refParam = tg.initDataUnsafe.start_param;
      }
    } catch (e) {}

    if (!myUid) return;
    var myInviteLink = BOT_APP_LINK + "?startapp=" + myUid;
    var todayKey = new Date().toISOString().slice(0, 10);

    // ১. হোমপেজে ইনভাইট কার্ড বসানো
    var homeTab = document.getElementById("tab-home");
    if (homeTab) {
      var refCard = document.createElement("div");
      refCard.className = "card";
      refCard.style.borderColor = "#facc15";
      refCard.innerHTML = `
        <div class="card-title" style="color:#facc15;">🤝 বন্ধুকে ইনভাইট করে আয় (প্রতি টাস্কে +২০ কয়েন)</div>
        <p style="font-size:12px; color:#cbd5e1; margin-bottom:10px;">বন্ধুর প্রতিটি টাস্ক/অ্যাড কমপ্লিটে পাবেন <strong>+২০ কয়েন</strong> (প্রতিদিন প্রতি বন্ধু থেকে সর্বোচ্চ ১০০ কয়েন ও দিনে সর্বোচ্চ ১০ জন রেফার)। আজকের রেফার: <strong id="todayRefCount" style="color:#10b981;">0</strong>/১০</p>
        <div style="display:flex; gap:6px;">
          <input type="text" id="myRefInput" value="${myInviteLink}" readonly style="margin:0; flex:1; font-size:11px; color:#94a3b8;" />
          <button type="button" class="btn btn-sm btn-green" id="copyRefBtn">কপি</button>
          <button type="button" class="btn btn-sm btn-purple" id="shareRefBtn">শেয়ার</button>
        </div>
      `;
      homeTab.insertBefore(refCard, homeTab.children);

      document.getElementById("copyRefBtn").onclick = function() {
        var inp = document.getElementById("myRefInput");
        inp.select();
        document.execCommand("copy");
        showToast("✅ ইনভাইট লিংক কপি হয়েছে!", false);
      };

      document.getElementById("shareRefBtn").onclick = function() {
        var shareText = encodeURIComponent("🎁 ফ্রি কয়েন আয় করুন ও সস্তায় এমবি অফার নিন! নিচের লিংক থেকে অ্যাপটি খুলুন:");
        window.open("https://t.me" + "/share/url?url=" + encodeURIComponent(myInviteLink) + "&text=" + shareText, "_blank");
      };
    }

    // ২. নতুন ইউজার রেফার লিংকে আসলে স্থায়ীভাবে রেফারকারীকে সংযুক্ত করা (ডিভাইস লকসহ)
    if (refParam && refParam !== myUid && refParam.indexOf("tg_") === 0) {
      if (!localStorage.getItem("bd_device_ref_locked") && !localStorage.getItem("bd_my_referrer")) {
        fetch(DB_URL + "/referrals/user_ref/" + myUid + ".json")
          .then(function(r) { return r.json(); })
          .then(function(existingRef) {
            if (!existingRef) {
              // রেফারকারীর আজকের রেফার সংখ্যা চেক (দৈনিক সর্বোচ্চ ১০ জন)
              fetch(DB_URL + "/referrals/daily_limit/" + refParam + "/" + todayKey + ".json")
                .then(function(r) { return r.json(); })
                .then(function(dayCnt) {
                  var currentCnt = dayCnt || 0;
                  if (currentCnt < 10) {
                    localStorage.setItem("bd_device_ref_locked", "yes");
                    localStorage.setItem("bd_my_referrer", refParam);
                    fetch(DB_URL + "/referrals/user_ref/" + myUid + ".json", {
                      method: "PUT",
                      body: JSON.stringify(refParam)
                    });
                    fetch(DB_URL + "/referrals/daily_limit/" + refParam + "/" + todayKey + ".json", {
                      method: "PUT",
                      body: JSON.stringify(currentCnt + 1)
                    });
                  }
                });
            } else {
              localStorage.setItem("bd_my_referrer", existingRef);
            }
          });
      }
    }

    // ৩. ইউজার যখনই কোনো টাস্ক/অ্যাড/বোনাস কমপ্লিট করে কয়েন পাবে, রেফারকারীকে +২০ কয়েন দেওয়া (দৈনিক সর্বোচ্চ ১০০ কয়েন/বন্ধু)
    var origAddCoins = window.addCoins;
    window.addCoins = function(val) {
      origAddCoins(val);
      if (val > 0 && !window.IS_CLAIMING_REF_BONUS) {
        var myReferrer = localStorage.getItem("bd_my_referrer");
        if (myReferrer) {
          var earnedTodayKey = "bd_ref_given_" + todayKey;
          var givenToday = parseInt(localStorage.getItem(earnedTodayKey) || "0");
          if (givenToday < 100) {
            localStorage.setItem(earnedTodayKey, givenToday + 20);
            fetch(DB_URL + "/referrals/pending/" + myReferrer + ".json")
              .then(function(r) { return r.json(); })
              .then(function(pend) {
                var newPend = (pend || 0) + 20;
                fetch(DB_URL + "/referrals/pending/" + myReferrer + ".json", {
                  method: "PUT",
                  body: JSON.stringify(newPend)
                });
              });
          }
        }
      }
    };

    // ৪. নিজের আজকের রেফার সংখ্যা ও পেন্ডিং বোনাস কয়েন ব্যালেন্সে যোগ করা
    function checkMyReferrals() {
      fetch(DB_URL + "/referrals/daily_limit/" + myUid + "/" + todayKey + ".json")
        .then(function(r) { return r.json(); })
        .then(function(cnt) {
          var el = document.getElementById("todayRefCount");
          if (el) el.innerText = cnt || 0;
        });

      fetch(DB_URL + "/referrals/pending/" + myUid + ".json")
        .then(function(r) { return r.json(); })
        .then(function(pend) {
          if (pend && pend > 0) {
            fetch(DB_URL + "/referrals/pending/" + myUid + ".json", {
              method: "PUT",
              body: JSON.stringify(0)
            }).then(function() {
              window.IS_CLAIMING_REF_BONUS = true;
              origAddCoins(pend);
              window.IS_CLAIMING_REF_BONUS = false;
              showToast("🎉 আপনার রেফার করা বন্ধু টাস্ক করেছে! +" + pend + " কয়েন পেলেন!", false);
            });
          }
        });
    }

    checkMyReferrals();
    setInterval(checkMyReferrals, 10000);
  }, 800);
})();
