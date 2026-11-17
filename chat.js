var FIREBASE_DB_URL = "https://bd-smart-earn-d83e7-default-rtdb" + ".asia-southeast1.firebasedatabase.app";

(function() {
  var myId = "user_" + Math.floor(Math.random() * 90000 + 10000);
  var myCodeName = "BD User #" + String(myId).slice(-4);

  function syncUserIdentity() {
    try {
      var tg = window.Telegram && window.Telegram.WebApp;
      if (tg && tg.initDataUnsafe && tg.initDataUnsafe.user) {
        var u = tg.initDataUnsafe.user;
        myId = "tg_" + u.id;
        myCodeName = "BD User #" + String(u.id).slice(-4);
      }
    } catch (e) {}
  }
  syncUserIdentity();

  setTimeout(function() {
    syncUserIdentity();
    var offersTab = document.getElementById("tab-offers");
    if (!offersTab) return;

    var oldChat = document.getElementById("liveChatBox");
    if (oldChat) oldChat.parentNode.style.display = "none";

    var chatCard = document.createElement("div");
    chatCard.className = "card";
    chatCard.innerHTML = `
      <div class="card-title" style="display:flex; justify-content:space-between; align-items:center;">
        <span>💬 কমিউনিটি ও প্রাইভেট চ্যাট</span>
        <span id="onlineCountBadge" style="background:#10b981; color:#fff; padding:3px 10px; border-radius:12px; font-size:11px;">🟢 অনলাইন: 1</span>
      </div>
      
      <div style="display:flex; gap:6px; margin-bottom:10px;">
        <button type="button" class="btn btn-sm" id="btnSubChat" style="flex:1; background:#0284c7;">🌐 সবার চ্যাট</button>
        <button type="button" class="btn btn-sm" id="btnSubUsers" style="flex:1; background:#1e293b;">👥 ইউজার ও ইনবক্স</button>
      </div>

      <!-- ১. সবার উন্মুক্ত কমিউনিটি চ্যাট -->
      <div id="subViewChat">
        <div id="chatMessages" style="height:200px; overflow-y:auto; background:#0f1420; padding:10px; border-radius:10px; border:1px solid #1e293b; margin-bottom:8px; font-size:12px;">
          <p style="color:#94a3b8; text-align:center;">চ্যাট লোড হচ্ছে...</p>
        </div>
        <div style="display:flex; gap:6px;">
          <input type="text" id="chatMsgInput" placeholder="সবার সাথে কথা বলুন..." style="margin:0; flex:1;" />
          <button type="button" class="btn btn-sm btn-green" id="sendChatBtn">পাঠান</button>
        </div>
      </div>

      <!-- ২. ইউজার লিস্ট ও ফ্রেন্ড রিকোয়েস্ট -->
      <div id="subViewUsers" style="display:none;">
        <div id="friendReqBox" style="margin-bottom:8px;"></div>
        <div id="userStatusList" style="max-height:240px; overflow-y:auto;"></div>
      </div>

      <!-- ৩. বন্ধুদের ব্যক্তিগত চ্যাট রুম (1-on-1 Private Chat) -->
      <div id="subViewPrivate" style="display:none;">
        <div style="display:flex; justify-content:space-between; align-items:center; background:#1e1b4b; padding:8px 10px; border-radius:8px; margin-bottom:8px;">
          <span id="privatePartnerTitle" style="font-size:12px; font-weight:700; color:#a78bfa;">🔒 প্রাইভেট চ্যাট</span>
          <button type="button" class="btn btn-sm" style="background:#334155; padding:4px 10px;" onclick="closePrivateChat()">⬅️ ফিরে যান</button>
        </div>
        <div id="privateMessages" style="height:190px; overflow-y:auto; background:#0f1420; padding:10px; border-radius:10px; border:1px solid #1e293b; margin-bottom:8px; font-size:12px;"></div>
        <div style="display:flex; gap:6px;">
          <input type="text" id="privateMsgInput" placeholder="ব্যক্তিগত মেসেজ লিখুন..." style="margin:0; flex:1;" />
          <button type="button" class="btn btn-sm btn-purple" id="sendPrivateBtn">পাঠান</button>
        </div>
      </div>
    `;
    offersTab.insertBefore(chatCard, offersTab.firstChild);

    var activePrivateFriend = null;
    var myFriends = {};

    document.getElementById("btnSubChat").onclick = function() {
      activePrivateFriend = null;
      document.getElementById("subViewChat").style.display = "block";
      document.getElementById("subViewUsers").style.display = "none";
      document.getElementById("subViewPrivate").style.display = "none";
      this.style.background = "#0284c7";
      document.getElementById("btnSubUsers").style.background = "#1e293b";
    };

    document.getElementById("btnSubUsers").onclick = function() {
      activePrivateFriend = null;
      document.getElementById("subViewChat").style.display = "none";
      document.getElementById("subViewUsers").style.display = "block";
      document.getElementById("subViewPrivate").style.display = "none";
      this.style.background = "#0284c7";
      document.getElementById("btnSubChat").style.background = "#1e293b";
    };

    window.closePrivateChat = function() {
      document.getElementById("btnSubUsers").click();
    };

    // দুজনের জন্য ইউনিক প্রাইভেট রুম আইডি তৈরি
    function getRoomId(uid1, uid2) {
      return (uid1 < uid2) ? (uid1 + "_" + uid2) : (uid2 + "_" + uid1);
    }

    window.openPrivateChat = function(friendId, friendCodeName) {
      activePrivateFriend = friendId;
      document.getElementById("subViewChat").style.display = "none";
      document.getElementById("subViewUsers").style.display = "none";
      document.getElementById("subViewPrivate").style.display = "block";
      document.getElementById("privatePartnerTitle").innerText = "🔒 " + friendCodeName + "-এর সাথে ব্যক্তিগত চ্যাট";
      loadPrivateMessages();
    };

    document.getElementById("sendPrivateBtn").onclick = function() {
      if (!activePrivateFriend) return;
      var inp = document.getElementById("privateMsgInput");
      var txt = inp.value.trim();
      if (!txt) return;
      inp.value = "";
      var roomId = getRoomId(myId, activePrivateFriend);
      fetch(FIREBASE_DB_URL + "/private_chats/" + roomId + ".json", {
        method: "POST",
        body: JSON.stringify({ uid: myId, text: txt, time: Date.now() })
      }).then(loadPrivateMessages);
    };

    function loadPrivateMessages() {
      if (!activePrivateFriend) return;
      var roomId = getRoomId(myId, activePrivateFriend);
      fetch(FIREBASE_DB_URL + "/private_chats/" + roomId + ".json?orderBy=\"$key\"&limitToLast=30")
        .then(function(r) { return r.json(); })
        .then(function(data) {
          var box = document.getElementById("privateMessages");
          if (!data) {
            box.innerHTML = '<p style="color:#94a3b8; text-align:center;">আপনাদের ব্যক্তিগত কথোপকথন শুরু করুন!</p>';
            return;
          }
          var html = "";
          Object.keys(data).forEach(function(k) {
            var m = data[k];
            var isMe = (m.uid === myId);
            html += '<div style="margin-bottom:6px; text-align:' + (isMe ? 'right' : 'left') + ';"><span style="display:inline-block; background:' + (isMe ? '#8b5cf6' : '#1e293b') + '; color:#fff; padding:6px 11px; border-radius:10px;">' + m.text + '</span></div>';
          });
          box.innerHTML = html;
          box.scrollTop = box.scrollHeight;
        });
    }

    document.getElementById("sendChatBtn").onclick = function() {
      syncUserIdentity();
      var inp = document.getElementById("chatMsgInput");
      var txt = inp.value.trim();
      if (!txt) return;
      inp.value = "";
      fetch(FIREBASE_DB_URL + "/messages.json", {
        method: "POST",
        body: JSON.stringify({ uid: myId, codeName: myCodeName, text: txt, time: Date.now() })
      }).then(loadAll);
    };

    function updateMyPresence() {
      syncUserIdentity();
      fetch(FIREBASE_DB_URL + "/users/" + myId + ".json", {
        method: "PATCH",
        body: JSON.stringify({ codeName: myCodeName, lastSeen: Date.now() })
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

    function loadAll() {
      fetch(FIREBASE_DB_URL + "/requests/" + myId + ".json")
        .then(function(r) { return r.json(); })
        .then(function(reqs) {
          myFriends = {};
          var reqBox = document.getElementById("friendReqBox");
          var h = "";
          if (reqs) {
            Object.keys(reqs).forEach(function(senderId) {
              if (reqs[senderId].status === "accepted") {
                myFriends[senderId] = true;
              } else if (reqs[senderId].status === "pending") {
                var senderCode = "BD User #" + String(senderId).slice(-4);
                h += '<div style="background:#1e1b4b; border:1px solid #8b5cf6; padding:8px; border-radius:8px; margin-bottom:6px; display:flex; justify-content:space-between; align-items:center; font-size:12px;"><span>🔔 <strong>' + senderCode + '</strong> ফ্রেন্ড রিকোয়েস্ট পাঠিয়েছে</span><button type="button" class="btn btn-sm btn-green" onclick="acceptFriend(\'' + senderId + '\')">Accept</button></div>';
              }
            });
          }
          reqBox.innerHTML = h;
          return fetch(FIREBASE_DB_URL + "/users.json");
        })
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

            var codeName = u.codeName || ("BD User #" + String(uid).slice(-4));
            var isFriend = myFriends[uid] === true;
            var statusBadge = isOnline
              ? '<span style="color:#10b981; font-weight:700;">🟢 অনলাইনে আছেন</span>'
              : '<span style="color:#94a3b8;">⚫ অফলাইন (' + status + ')</span>';

            var actionBtn = isFriend
