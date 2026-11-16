// Monetag Telegram Mini App SDK (Zone: 12280333)
(function() {
  var s = document.createElement("script");
   s.src = "https://libtl" + ".com/sdk.js";
  s.setAttribute("data-zone", "12280333");
  s.setAttribute("data-sdk", "show_12280333");
  s.async = true;
  document.head.appendChild(s);
})();

// বিজ্ঞাপন দেখানোর ফাংশন (লাইভ স্ট্যাটাসসহ)
function runMonetagAd(onReward) {
  if (typeof window.show_12280333 === "function") {
    showToast("⏳ বিজ্ঞাপন লোড হচ্ছে...", false);
    window.show_12280333().then(function() {
      if (onReward) onReward();
    }).catch(function(err) {
      showToast("⚠️ বিজ্ঞাপন স্কিপ করা হয়েছে বা লোড হয়নি।", true);
    });
  } else {
    showToast("⚠️ অ্যাড সার্ভার এখনো রেডি হচ্ছে (২-৫ মিনিট পর আবার চেষ্টা করুন)", true);
    if (onReward) onReward();
  }
}

// ডেইলি বোনাস ও কুইজ বাটনে অ্যাড যুক্ত করা
document.addEventListener("click", function(e) {
  var txt = e.target ? e.target.innerText : "";
  
  // ডেইলি বোনাস বাটনে ক্লিক করলে
  if (e.target && e.target.id === "bonusBtn") {
    runMonetagAd();
  }
  
  // টাস্কের 'দেখুন' বাটনে ক্লিক করলে
  if (txt === "দেখুন") {
    e.preventDefault();
    runMonetagAd(function() {
      showToast("🎉 বিজ্ঞাপন দেখা সম্পন্ন হয়েছে!", false);
    });
  }
});
