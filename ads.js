// Monetag Direct SDK Loader (Zone: 12280333)
var mScript = document.createElement("script");
mScript.src = "https://libtl" + ".com/sdk.js";
mScript.dataset.zone = "12280333";
mScript.dataset.sdk = "show_12280333";
document.getElementsByTagName("head")[0].appendChild(mScript);

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
