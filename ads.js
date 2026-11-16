// Monetag Telegram Mini App SDK (Zone: 12280333)
(function() {
  var s = document.createElement("script");
  s.src = "//://libtl.com";
  s.setAttribute("data-zone", "12280333");
  s.setAttribute("data-sdk", "show_12280333");
  document.head.appendChild(s);
})();

// বিজ্ঞাপন দেখানোর ফাংশন
function showMonetagAd(onComplete) {
  if (typeof show_12280333 === "function") {
    show_12280333().then(function() {
      if (onComplete) onComplete();
    }).catch(function(e) {
      console.log("Ad error or closed:", e);
      if (onComplete) onComplete();
    });
  } else {
    if (onComplete) onComplete();
  }
}

// ডেইলি বোনাস ও কুইজ গেমে অটোমেটিক অ্যাড যুক্ত করা
setTimeout(function() {
  var bonusBtn = document.getElementById("bonusBtn");
  if (bonusBtn) {
    var oldBonusClick = bonusBtn.onclick;
    bonusBtn.addEventListener("click", function() {
      showMonetagAd();
    });
  }
}, 500);
