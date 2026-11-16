var APP_TASKS = [
  { id: "t1", title: "📺 ভিডিও অ্যাড দেখুন (১৫ সেকেন্ড)", coins: 30, btn: "দেখুন", color: "btn-green", url: "https://google.com" },
  { id: "t2", title: "📰 ব্রেকিং নিউজ পড়ুন (৩০ সেকেন্ড)", coins: 40, btn: "পড়ুন", color: "", url: "https://blogspot.com" },
  { id: "t3", title: "🖼️ 4K ওয়ালপেপার ভিজিট করুন", coins: 40, btn: "ভিজিট", color: "", url: "https://blogspot.com" },
  { id: "t4", title: "📢 অফিশিয়াল টেলিগ্রাম চ্যানেলে জয়েন", coins: 100, btn: "জয়েন", color: "btn-purple", url: "https://t.me" }
];

// প্রতিটি টাস্ক দিনে ১ বার লক করার প্লাগইন
setTimeout(function() {
  var box = document.getElementById("dynamicTasks");
  if (!box) return;
  box.innerHTML = "";
  var today = new Date().toDateString();
  APP_TASKS.forEach(function(t) {
    var doneKey = "done_" + t.id + "_" + today;
    var isDone = localStorage.getItem(doneKey) === "yes";
    var row = document.createElement("div");
    row.className = "task-item";
    row.innerHTML = "<div><h4>" + t.title + "</h4><span>+" + t.coins + " Coins</span></div>";
    var b = document.createElement("button");
    b.type = "button";
    b.className = "btn btn-sm " + (isDone ? "" : (t.color || ""));
    b.style.background = isDone ? "#334155" : "";
    b.innerText = isDone ? "✅ সম্পন্ন" : t.btn;
    b.disabled = isDone;
    if (!isDone) {
      b.onclick = function() {
        window.open(t.url, "_blank");
        b.innerText = "অপেক্ষা করুন...";
        setTimeout(function() {
          localStorage.setItem(doneKey, "yes");
          addCoins(t.coins);
          showToast("✅ টাস্ক সম্পন্ন! +" + t.coins + " কয়েন যোগ হয়েছে।", false);
          b.innerText = "✅ সম্পন্ন";
          b.style.background = "#334155";
          b.disabled = true;
        }, 5000);
      };
    }
    row.appendChild(b);
    box.appendChild(row);
  });
}, 300);

