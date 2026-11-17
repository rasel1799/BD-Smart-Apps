// আপনার আসল Firebase Realtime Database লিংক
var FIREBASE_DB_URL = "https://bd-smart-earn-d83e7-default-rtdb" + ".asia-southeast1.firebasedatabase.app";

(function() {
  var myId = "user_" + Math.floor(Math.random() * 90000 + 10000);
  var myName = "BD User";
  try {
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe.user) {
      myId = "tg_" + window.Telegram.WebApp.initDataUnsafe.user.id;
      myName = window.Telegram.WebApp.initDataUnsafe.user.first_name;
    }
  } catch (e) {}

  setTimeout(function() {
    var offersTab = document.getElementById("tab-offers");
    if (!offersTab) return;

    var oldChat = document.getElementById("liveChatBox");
    if (oldChat) oldChat.parentNode.style.display = "none";

    var chatCard = document.createElement("div");
    chatCard.className = "card";
    chatCard.innerHTML = `
      <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
        <span>💬 অ্যাপ কমিউনিটি চ্যাট ও বন্ধু</span>
        <span id="onlineCountBadge" style="background:#10b981; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px;">🟢 অনলাইন: 1</span>
      </div>
      
      <div style="display:flex; gap:6px; margin-bottom:10px;">
        <button type="button" class="btn btn-sm" id="btnSubChat" style="flex:1; background:#0284c7;">💬 লাইভ চ্যাট</button>
        <button type="button" class="btn btn-sm" id="btnSubUsers" style="flex:1; background:#1e293b;">👥 ইউজার ও ফ্রেন্ড</button>
      </div>

      <div id="subViewChat">
        <div id="chatMessages" style="height:210px; overflow-y:auto; background:#0f1420; padding:10px; border-radius:10px; border:1px solid #1e293b; margin-bottom:8px; font-size:12px;">
          <p style="color:#94a3b8; text-align:center;">চ্যাট লোড হচ্ছে...</p>
        </div>
        <div style="display:flex; gap:6px;">
          <input type="text" id="chatMsgInput" placeholder="অ্যাপ ইউজারদের সাথে কথা বলুন..." style="margin:0; flex:1;" />
          <button type="button" class="btn btn-sm btn-green" id="sendChatBtn">পাঠান</button>
        </div>
      </div>

      <div id="subViewUsers" style="display:none;">
        <div id="friendReqBox" style="margin-bottom:8px;"></div>
        <div id="userStatusList" style="max-height:240px; overflow-y:auto;"></div>
      </div>
    `;
    offersTab.insertBefore(chatCard, offersTab.firstChild);

    document.getElementById("btnSubChat").onclick = function() {
      document.getElementById("subViewChat").style.display = "block";
      document.getElementById("subViewUsers").style.display = "none";
      this.style.background = "#0284c7";
      document.getElementById("btnSubUsers").style.background = "#1e293b";
    };
    document.getElementById("btnSubUsers").onclick = function() {
      document.getElementById("subViewChat").style.display = "none";
      document.getElementById("subViewUsers").style.display = "block";
      this.style.background = "#0284c7";
      document.getElementById("btnSubChat").style.background = "#1e293b";
    };

    document.getElementById("sendChatBtn").onclick = function() {
      var inp = document.getElementById("chatMsgInput");
      var txt = inp.value.trim();
      if (!txt) return;
      inp.value = "";
      fetch(FIREBASE_DB_URL + "/messages.json", {
        method: "POST",
        body: JSON.stringify({ uid: myId, name: myName, text: txt, time: Date.now() })
      }).then(loadMessages);
    };

    function updateMyPresence() {
      fetch(FIREBASE_DB_URL + "/users/" + myId + ".json", {
        method: "PATCH",
        body: JSON.stringify({ name: myName, lastSeen: Date.now() })
      });
    }
    updateMyPresence();
    setInterval(updateMyPresence, 10000);

    function timeAgo(ts) {
      var diff = Math.floor((Date.now() - ts) / 1000);
      if (diff < 25) return "online";
      if (diff < 60) return diff + " সেকেন্ড আগে";
      if (diff < 3600) return Math.floor(diff / 60) + " মিনিট আগে";
      if (diff < 86400) return Math.floor(diff / 3600) + " ঘণ্টা আগে";
      return Math.floor(diff / 86400) + " দিন আগে";
    }

    function loadUsers() {
      fetch(FIREBASE_DB_URL + "/users.json")
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (!data) return;
          var onlineCount = 0;
          var listHtml = "";
          Object.keys(data).forEach(function(uid) {
            var u = data[uid];
            var status = timeAgo(u.lastSeen || 0);
            var isOnline = (status === "online");
            if (isOnline) onlineCount++;
            if (uid === myId) return;

            var statusBadge = isOnline
              ? '<span style="color:#10b981; font-weight:700;">🟢 অনলাইনে আছেন</span>'
              : '<span style="color:#94a3b8;">⚫ অফলাইন (' + status + ')</span>';

            listHtml += '<div class="task-item" style="padding:8px 10px; margin-bottom:6px;"><div><h4 style="font-size:13px;">' + u.name + '</h4><span style="font-size:11px;">' + statusBadge + '</span></div><button type="button" class="btn btn-sm btn-purple" onclick="sendFriendReq(\'' + uid + '\', \'' + u.name + '\')">➕ ফ্রেন্ড রিকোয়েস্ট</button></div>';
          });
          document.getElementById("onlineCountBadge").innerText = "🟢 অনলাইন: " + onlineCount;
          document.getElementById("userStatusList").innerHTML = listHtml || '<p style="font-size:12px; color:#94a3b8;">এখনো অন্য কোনো ইউজার যুক্ত হয়নি।</p>';
        });
    }

    function loadMessages() {
      fetch(FIREBASE_DB_URL + "/messages.json?orderBy=\"$key\"&limitToLast=25")
        .then(function(r) { return r.json(); })
        .then(function(data) {
          var box = document.getElementById("chatMessages");
          if (!data) { box.innerHTML = '<p style="color:#94a3b8; text-align:center;">প্রথম মেসেজটি আপনিই পাঠান!</p>'; return; }
          var html = "";
          Object.keys(data).forEach(function(k) {
            var m = data[k];
            var isMe = (m.uid === myId);
            html += '<div style="margin-bottom:6px; text-align:' + (isMe ? 'right' : 'left') + ';"><small style="color:#38bdf8; font-size:10px; display:block;">' + (isMe ? 'আপনি' : m.name) + '</small><span style="display:inline-block; background:' + (isMe ? '#0284c7' : '#1e293b') + '; color:#fff; padding:5px 10px; border-radius:10px;">' + m.text + '</span></div>';
          });
          box.innerHTML = html;
          box.scrollTop = box.scrollHeight;
        });
    }

    window.sendFriendReq = function(targetId, targetName) {
      fetch(FIREBASE_DB_URL + "/requests/" + targetId + "/" + myId + ".json", {
        method: "PUT",
        body: JSON.stringify({ fromName: myName, status: "pending" })
      }).then(function() {
        showToast("✅ " + targetName + "-কে ফ্রেন্ড রিকোয়েস্ট পাঠানো হয়েছে!", false);
      });
    };

    function checkMyRequests() {
      fetch(FIREBASE_DB_URL + "/requests/" + myId + ".json")
        .then(function(r) { return r.json(); })
        .then(function(reqs) {
          var reqBox = document.getElementById("friendReqBox");
          if (!reqs) { reqBox.innerHTML = ""; return; }
          var h = "";
          Object.keys(reqs).forEach(function(senderId) {
            if (reqs[senderId].status === "pending") {
              h += '<div style="background:#1e1b4b; border:1px solid #8b5cf6; padding:8px; border-radius:8px; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center; font-size:12px;"><span>🔔 <strong>' + reqs[senderId].fromName + '</strong> ফ্রেন্ড রিকোয়েস্ট পাঠিয়েছে</span><button type="button" class="btn btn-sm btn-green" onclick="acceptFriend(\'' + senderId + '\')">Accept</button></div>';
            }
          });
          reqBox.innerHTML = h;
        });
    }

    window.acceptFriend = function(senderId) {
      fetch(FIREBASE_DB_URL + "/requests/" + myId + "/" + senderId + ".json", {
        method: "PATCH",
        body: JSON.stringify({ status: "accepted" })
      }).then(function() {
        showToast("🎉 ফ্রেন্ড রিকোয়েস্ট গ্রহণ করা হয়েছে!", false);
        checkMyRequests();
      });
    };

    setInterval(function() {
      loadUsers();
      loadMessages();
      checkMyRequests();
    }, 5000);
    loadUsers(); loadMessages(); checkMyRequests();
  }, 600);
})();

