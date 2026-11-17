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

// বিশাল কুইজ ব্যাংক (প্রতিদিন এখান থেকে ১০টি করে নতুন প্রশ্ন আসবে)
var ALL_QUIZ_BANK = [
  { id: "q1", q: "বাংলাদেশের বর্তমান মুদ্রার নাম কী?", o: ["রুপি", "টাকা", "দিনার", "রিয়াল"], a: 1 },
  { id: "q2", q: "কম্পিউটারের মস্তিষ্ক কাকে বলা হয়?", o: ["RAM", "Monitor", "CPU", "Mouse"], a: 2 },
  { id: "q3", q: "পৃথিবীর বৃহত্তম মহাসাগর কোনটি?", o: ["আটলান্টিক", "ভারত", "প্রশান্ত মহাসাগর", "আর্কটিক"], a: 2 },
  { id: "q4", q: "বাংলাদেশের জাতীয় ফুল কোনটি?", o: ["গোলাপ", "শাপলা", "জবা", "বেলি"], a: 1 },
  { id: "q5", q: "সূর্যের নিকটতম গ্রহ কোনটি?", o: ["মঙ্গল", "শুক্র", "বুধ", "পৃথিবী"], a: 2 },
  { id: "q6", q: "মানবদেহে হাড়ের সংখ্যা কয়টি?", o: ["২০৬টি", "২১০টি", "১৯৮টি", "২২০টি"], a: 0 },
  { id: "q7", q: "বাংলাদেশের দীর্ঘতম নদী কোনটি?", o: ["পদ্মা", "যমুনা", "মেঘনা", "সুরমা"], a: 2 },
  { id: "q8", q: "ইন্টারনেটের জনক কাকে বলা হয়?", o: ["বিল গেটস", "ভিন্টন সার্ফ", "মার্ক জাকারবার্গ", "ইলন মাস্ক"], a: 1 },
  { id: "q9", q: "বাংলাদেশের বিজয় দিবস কবে?", o: ["২৬ মার্চ", "২১ ফেব্রুয়ারি", "১৬ ডিসেম্বর", "১৪ এপ্রিল"], a: 2 },
  { id: "q10", q: "পৃথিবীর একমাত্র উপগ্রহ কোনটি?", o: ["চাঁদ", "মঙ্গল", "টাইটান", "ফোবোস"], a: 0 },
  { id: "q11", q: "বাংলাদেশের জাতীয় ফল কোনটি?", o: ["আম", "কাঁঠাল", "লিচু", "কলা"], a: 1 },
  { id: "q12", q: "পানির রাসায়নিক সংকেত কী?", o: ["CO2", "O2", "H2O", "NaCl"], a: 2 },
  { id: "q13", q: "সৌরজগতের বৃহত্তম গ্রহ কোনটি?", o: ["শনি", "বৃহস্পতি", "পৃথিবী", "ইউরেনাস"], a: 1 },
  { id: "q14", q: "বাংলাদেশের জাতীয় পাখি কোনটি?", o: ["দোয়েল", "ময়না", "টিয়া", "কোকিল"], a: 0 },
  { id: "q15", q: "১ মেগাবাইট (1 MB) সমান কত কিলোবাইট?", o: ["১০০০ KB", "১০২৪ KB", "৫১২ KB", "২০৪৮ KB"], a: 1 },
  { id: "q16", q: "বিশ্ব পরিবেশ দিবস কবে পালিত হয়?", o: ["৫ জুন", "৮ মার্চ", "১ মে", "১০ ডিসেম্বর"], a: 0 },
  { id: "q17", q: "বাংলাদেশের সর্বোচ্চ পর্বতশৃঙ্গ কোনটি?", o: ["কেওক্রাডং", "তাজিংডং", "সাকা হাফং", "চিম্বুক"], a: 2 },
  { id: "q18", q: "রক্ত জমাট বাঁধতে সাহায্য করে কোন ভিটামিন?", o: ["ভিটামিন এ", "ভিটামিন সি", "ভিটামিন কে", "ভিটামিন ডি"], a: 2 },
  { id: "q19", q: "সবচেয়ে হালকা গ্যাস কোনটি?", o: ["অক্সিজেন", "হাইড্রোজেন", "নাইট্রোজেন", "হিলিয়াম"], a: 1 },
  { id: "q20", q: "বাংলাদেশের জাতীয় সংগীতের রচয়িতা কে?", o: ["কাজী নজরুল ইসলাম", "রবীন্দ্রনাথ ঠাকুর", "জসীমউদ্দীন", "জীবনানন্দ দাশ"], a: 1 }
];

// স্মার্ট ডেইলি ১০ কুইজ ইঞ্জিন (+১০ সঠিক, -৫ ভুল, একবার উত্তর দিলে আর আসবে না)
setTimeout(function() {
  var uid = "guest";
  try {
    var u = window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe.user;
    if (u) uid = u.id;
  } catch (e) {}

  // কুইজ কার্ডের টাইটেল আপডেট করা
  var gameCardTitle = document.querySelector("#tab-game .card-title");
  if (gameCardTitle) {
    gameCardTitle.innerText = "🧠 ডেইলি ১০ কুইজ (সঠিক +১০ | ভুল -৫ কয়েন)";
  }

  // আগে উত্তর দেওয়া প্রশ্নগুলোর তালিকা লোড করা
  var historyKey = "bd_quiz_done_" + uid;
  var answeredIds = JSON.parse(localStorage.getItem(historyKey) || "[]");

  // আজকের তারিখের ওপর ভিত্তি করে ১০টি নতুন প্রশ্ন বাছাই করা
  var dayNum = Math.floor(Date.now() / 86400000);
  var startIdx = (dayNum * 10) % ALL_QUIZ_BANK.length;
  var todaysTen = [];
  for (var i = 0; i < 10; i++) {
    var qItem = ALL_QUIZ_BANK[(startIdx + i) % ALL_QUIZ_BANK.length];
    if (answeredIds.indexOf(qItem.id) === -1) {
      todaysTen.push(qItem);
    }
  }

  var locked = false;

  function loadSmartQuiz() {
    var qEl = document.getElementById("quizQ");
    var optEl = document.getElementById("quizOpts");
    var msgEl = document.getElementById("quizMsg");
    if (!qEl || !optEl) return;

    if (todaysTen.length === 0) {
      qEl.innerText = "🎉 আজকের ১০টি কুইজ সম্পন্ন হয়েছে! আগামীকাল আবার নতুন ১০টি কুইজ আসবে।";
      optEl.innerHTML = "";
      msgEl.innerText = "";
      return;
    }

    locked = false;
    var current = todaysTen[0];
    qEl.innerHTML = '<span style="color:#38bdf8; font-size:12px;">বাকি আছে: ' + todaysTen.length + 'টি প্রশ্ন</span><br/>' + current.q;
    msgEl.innerText = "";
    optEl.innerHTML = "";

    current.o.forEach(function(optText, idx) {
      var btn = document.createElement("div");
      btn.className = "quiz-opt";
      btn.innerText = optText;
      btn.onclick = function() {
        if (locked) return;
        locked = true;

        // প্রশ্নটি স্থায়ীভাবে ইউজারের হিস্ট্রিতে সেভ করা যাতে আর কখনো না আসে
        answeredIds.push(current.id);
        localStorage.setItem(historyKey, JSON.stringify(answeredIds));
        todaysTen.shift();

        if (idx === current.a) {
          btn.style.background = "#059669";
          btn.style.borderColor = "#10b981";
          msgEl.style.color = "#10b981";
          msgEl.innerText = "✅ সঠিক উত্তর! +১০ কয়েন যোগ হয়েছে।";
          addCoins(10);
        } else {
          btn.style.background = "#be123c";
          btn.style.borderColor = "#f43f5e";
          msgEl.style.color = "#f43f5e";
          if (coins >= 5) {
            addCoins(-5);
            msgEl.innerText = "❌ ভুল উত্তর! ব্যালেন্স থেকে -৫ কয়েন কাটা হয়েছে।";
          } else {
            msgEl.innerText = "❌ ভুল উত্তর! (ব্যালেন্স কম থাকায় কয়েন কাটা হয়নি)";
          }
        }
        setTimeout(loadSmartQuiz, 1400);
      };
      optEl.appendChild(btn);
    });
  }

  // গেম ট্যাবে ক্লিক করলে নতুন কুইজ ইঞ্জিন চালু হবে
  document.querySelectorAll('[data-tab="game"]').forEach(function(el) {
    el.addEventListener("click", function() {
      setTimeout(loadSmartQuiz, 50);
    });
  });
  loadSmartQuiz();
}, 400);

// অটোমেটিক লাইভ ডলার, রিয়াল ও রিঙ্গিত রেট আপডেট প্লাগইন (১০০% ফ্রি)
(function() {
  function updateLiveRates() {
    var rateBoxes = document.querySelectorAll("#tab-home .rate-box strong");
    if (rateBoxes.length < 3) return;

    fetch("https://open.er-api" + ".com/v6/latest/USD")
      .then(function(r) { return r.json(); })
      .then(function(data) {
        if (data && data.rates && data.rates.BDT) {
          var usdToBdt = data.rates.BDT;
          var sarToBdt = usdToBdt / data.rates.SAR;
          var myrToBdt = usdToBdt / data.rates.MYR;

          rateBoxes.innerText = "৳ " + usdToBdt.toFixed(2);
          rateBoxes.innerText = "৳ " + sarToBdt.toFixed(2);
          rateBoxes.innerText = "৳ " + myrToBdt.toFixed(2);
        }
      })
      .catch(function(e) {
        console.log("Rate auto-update fallback active");
      });
  }
  setTimeout(updateLiveRates, 500);
})();
