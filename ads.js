// ১. সবার আগে হোমপেজ ও লাইভ চ্যাট প্লাগইন (chat.js) নিরাপদে লোড করা
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

// উইথড্র রিকোয়েস্ট সরাসরি আপনার টেলিগ্রামে পাঠানোর প্লাগইন
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
    try {
      var u = window.Telegram.WebApp.initDataUnsafe.user;
      if (u) {
        uName = u.first_name + (u.last_name ? " " + u.last_name : "");
        uId = u.id;
      }
    } catch (e) {}

    var taka = (amt / 100).toFixed(0);
    var msg = "💸 নতুন উইথড্র রিকোয়েস্ট!\n\n"
            + "👤 নাম: " + uName + "\n"
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

