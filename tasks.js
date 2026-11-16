var APP_TASKS = [
  { id: "v_ad1", title: "📺 স্পন্সর ভিডিও বিজ্ঞাপন দেখুন", coins: 30, btn: "দেখুন", url: "AD_ONLY" },
  { id: "news1", title: "📰 ব্রেকিং নিউজ পড়ুন (১৫ সেকেন্ড)", coins: 40, btn: "পড়ুন", url: "https://blogspot.com" },
  { id: "wall1", title: "🖼️ 4K ওয়ালপেপার সাইট ভিজিট করুন", coins: 40, btn: "ভিজিট", url: "https://blogspot.com" },
  { id: "tg_join", title: "📢 অফিশিয়াল টেলিগ্রাম চ্যানেলে জয়েন", coins: 100, btn: "জয়েন", url: "https://t.me", verify: true }
];

setTimeout(function() {
  var uid = "guest";
  try {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe.user) {
      uid = window.Telegram.WebApp.initDataUnsafe.user.id;
    }
  } catch(e) {}

  var today = new Date().toDateString();

  // ১. ডেইলি বোনাস বাটনকে সবুজ -> ১৫ সেকেন্ড টাইমার -> লাল লক করা
  var bonusBtn = document.getElementById("bonusBtn");
  if (bonusBtn) {
    var bonusKey = "bd_bonus_" + uid + "_" + today;
    // আগের ইভেন্ট রিসেট করতে বাটন ক্লোন করা
    var newBonusBtn = bonusBtn.cloneNode(true);
    bonusBtn.parentNode.replaceChild(newBonusBtn, bonusBtn);

    if (localStorage.getItem(bonusKey) === "done") {
      newBonusBtn.style.background = "#dc2626";
      newBonusBtn.innerText = "🔒 আজকের বোনাস নেওয়া হয়েছে";
      newBonusBtn.disabled = true;
    } else {
      newBonusBtn.style.background = "#10b981";
      newBonusBtn.onclick = function() {
        newBonusBtn.disabled = true;
        if (typeof runMonetagAd === "function") runMonetagAd();
        var sec = 15;
        var timer = setInterval(function() {
          newBonusBtn.style.background = "#d97706";
          newBonusBtn.innerText = "⏳ অপেক্ষা করুন (" + sec + " সেকেন্ড)...";
          sec--;
          if (sec < 0) {
            clearInterval(timer);
            localStorage.setItem(bonusKey, "done");
            addCoins(50);
            newBonusBtn.style.background = "#dc2626";
            newBonusBtn.innerText = "🔒 আজকের বোনাস নেওয়া হয়েছে";
            showToast("🎉 অভিনন্দন! ১৫ সেকেন্ড পর ৫০ কয়েন যোগ হয়েছে।", false);
          }
        }, 1000);
      };
    }
  }

  // ২. টাস্ক লিস্টকে সবুজ -> ১৫ সেকেন্ড টাইমার -> লাল লক করা
  var box = document.getElementById("dynamicTasks");
  if (box) {
    box.innerHTML = "";
    APP_TASKS.forEach(function(t) {
      var taskKey = "bd_task_" + uid + "_" + t.id + "_" + today;
      var isDone = localStorage.getItem(taskKey) === "done";

      var row = document.createElement("div");
      row.className = "task-item";
      row.innerHTML = "<div><h4>" + t.title + "</h4><span>+" + t.coins + " Coins</span></div>";

      var b = document.createElement("button");
      b.type = "button";
      b.className = "btn btn-sm";
      b.style.background = isDone ? "#dc2626" : "#10b981";
      b.innerText = isDone ? "🔒 সম্পন্ন" : t.btn;
      b.disabled = isDone;

      if (!isDone) {
        b.onclick = function() {
          b.disabled = true;
          if (t.url === "AD_ONLY") {
            if (typeof runMonetagAd === "function") runMonetagAd();
          } else {
            window.open(t.url, "_blank");
          }
          var sec = 15;
          var tmr = setInterval(function() {
            b.style.background = "#d97706";
            b.innerText = sec + "s...";
            sec--;
            if (sec < 0) {
              clearInterval(tmr);
              if (t.verify) {
                var ok = confirm("আপনি কি আসলেই চ্যানেলে জয়েন করেছেন? না করে থাকলে কয়েন বাতিল হবে।");
                if (!ok) {
                  b.disabled = false;
                  b.style.background = "#10b981";
                  b.innerText = t.btn;
                  return;
                }
              }
              localStorage.setItem(taskKey, "done");
              addCoins(t.coins);
              b.style.background = "#dc2626";
              b.innerText = "🔒 সম্পন্ন";
              showToast("✅ টাস্ক সম্পন্ন! +" + t.coins + " কয়েন যোগ হয়েছে।", false);
            }
          }, 1000);
        };
      }
      row.appendChild(b);
      box.appendChild(row);
    });
  }
}, 400);

