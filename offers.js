var APP_RATES = [
  { flag: "🇺🇸 USD", rate: "৳ 119.50" },
  { flag: "🇸🇦 SAR", rate: "৳ 31.85" },
  { flag: "🇲🇾 MYR", rate: "৳ 26.90" }
];

var APP_OFFERS = [
  { title: "GP 10 GB + 100 Min (৩০ দিন)", price: "রেগুলার ৳৩৯৮ | আমাদের দাম ৳৩৪০", link: "https://blogspot.com" },
  { title: "Robi 15 GB + 200 Min (৩০ দিন)", price: "রেগুলার ৳৪৪৯ | আমাদের দাম ৳৩৮৫", link: "https://blogspot.com" },
  { title: "Banglalink 8 GB (৩০ দিন)", price: "রেগুলার ৳২৪৯ | আমাদের দাম ৳২১০", link: "https://blogspot.com" },
  { title: "Airtel 12 GB + 150 Min (৩০ দিন)", price: "রেগুলার ৳৩৬৯ | আমাদের দাম ৳৩১৫", link: "https://blogspot.com" }
];

var APP_QUIZ = [
  { q: "বাংলাদেশের বর্তমান মুদ্রার নাম কী?", o: ["রুপি", "টাকা", "দিনার", "রিয়াল"], a: 1 },
  { q: "কম্পিউটারের মস্তিষ্ক কাকে বলা হয়?", o: ["RAM", "Monitor", "CPU", "Mouse"], a: 2 },
  { q: "পৃথিবীর বৃহত্তম মহাসাগর কোনটি?", o: ["আটলান্টিক", "ভারত", "প্রশান্ত মহাসাগর", "আর্কটিক"], a: 2 },
  { q: "বাংলাদেশের জাতীয় ফুল কোনটি?", o: ["গোলাপ", "শাপলা", "জবা", "বেলি"], a: 1 },
  { q: "সূর্যের নিকটতম গ্রহ কোনটি?", o: ["মঙ্গল", "শুক্র", "বুধ", "পৃথিবী"], a: 2 },
  { q: "মানবদেহে হাড়ের সংখ্যা কয়টি?", o: ["২০৬টি", "২১০টি", "১৯৮টি", "২২০টি"], a: 0 },
  { q: "বাংলাদেশের দীর্ঘতম নদী কোনটি?", o: ["পদ্মা", "যমুনা", "মেঘনা", "সুরমা"], a: 2 },
  { q: "ইন্টারনেটের জনক কাকে বলা হয়?", o: ["বিল গেটস", "ভিন্টন সার্ফ", "মার্ক জাকারবার্গ", "ইলন মাস্ক"], a: 1 }
];

// নতুন ইউটিলিটি টুলস (ভিডিও ডাউনলোডার, মুভি স্ট্রিমিং ও লাইভ চ্যাট) স্বয়ংক্রিয়ভাবে যুক্ত করা
setTimeout(function() {
  var offersTab = document.getElementById("tab-offers");
  if (offersTab) {
    var toolsCard = document.createElement("div");
    toolsCard.className = "card";
    toolsCard.innerHTML = `
      <div class="card-title">🎬 ভিডিও ডাউনলোডার, মুভি ও লাইভ চ্যাট</div>
      <p style="font-size:12px; color:#94a3b8; margin-bottom:10px;">TikTok, Facebook ও YouTube ভিডিও ওয়াটারমার্ক ছাড়া ডাউনলোড করুন:</p>
      <input type="text" id="vidUrlInput" placeholder="ভিডিও লিংক এখানে পেস্ট করুন..." />
      <button type="button" class="btn btn-green" style="margin-bottom:12px;" onclick="downloadNoWatermark()">⬇️ ওয়াটারমার্ক ছাড়া ডাউনলোড করুন</button>
      
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:5px;">
        <button type="button" class="btn btn-purple" onclick="openMovies()">🍿 ফ্রি মুভি ও ভিডিও দেখুন</button>
        <button type="button" class="btn" onclick="toggleLiveChat()">💬 লাইভ ইউজার চ্যাট</button>
      </div>
      <div id="liveChatBox" style="display:none; margin-top:12px; border-top:1px solid #1e293b; padding-top:10px;">
        <p style="font-size:12px; color:#38bdf8; margin-bottom:6px;">🟢 অনলাইন ইউজারদের সাথে কথা বলুন:</p>
        <iframe src="https://cbox.ws" width="100%" height="260" allowtransparency="yes" frameborder="0" style="border-radius:8px;"></iframe>
      </div>
    `;
    offersTab.appendChild(toolsCard);
  }
}, 400);

window.downloadNoWatermark = function() {
  var link = document.getElementById("vidUrlInput").value.trim();
  if (!link) return showToast("আগে একটি ভিডিও লিংক পেস্ট করুন!", true);
  if (typeof runMonetagAd === "function") runMonetagAd();
  showToast("⏳ ডাউনলোড সার্ভার চালু হচ্ছে...", false);
  setTimeout(function() {
    window.open("https://ssstik.io", "_blank");
  }, 1500);
};

window.openMovies = function() {
  if (typeof runMonetagAd === "function") runMonetagAd();
  window.open("https://blogspot.com", "_blank");
};

window.toggleLiveChat = function() {
  var box = document.getElementById("liveChatBox");
  box.style.display = (box.style.display === "none") ? "block" : "none";
};

