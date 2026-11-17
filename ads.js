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

