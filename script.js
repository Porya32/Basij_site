function login() {
  const name = document.getElementById("name").value.trim();
  const pass = document.getElementById("password").value.trim();

  let role = "";
  if (pass === "admin123") {
    role = "مدیر";
  } else if (pass === "user123") {
    role = "عادی";
  } else {
    document.getElementById("message").innerText = "رمز اشتباه است!";
    return;
  }

  const members = JSON.parse(localStorage.getItem("members") || "[]");
  members.push({ name, role });
  localStorage.setItem("members", JSON.stringify(members));
  localStorage.setItem("currentUser", JSON.stringify({ name, role }));

  window.location.href = "home.html";
}

function loadHome() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) window.location.href = "index.html";

  document.getElementById("username").innerText = user.name;
  document.getElementById("userrole").innerText = user.role;

  const msg = localStorage.getItem("latestMessage");
  document.getElementById("latestMessage").innerText = msg || "پیامی وجود ندارد";

  if (user.role === "مدیر") {
    document.getElementById("sendMsgBtn").style.display = "inline-block";
  }
}

function loadMembers() {
  const members = JSON.parse(localStorage.getItem("members") || "[]");
  const list = document.getElementById("membersList");
  members.forEach(m => {
    const item = document.createElement("li");
    item.innerText = `${m.name} - ${m.role}`;
    list.appendChild(item);
  });
}

function checkAdmin() {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user || user.role !== "مدیر") {
    alert("دسترسی غیرمجاز!");
    window.location.href = "home.html";
  }
}

function sendMessage() {
  const text = document.getElementById("msgText").value.trim();
  if (text) {
    localStorage.setItem("latestMessage", text);
    alert("پیام ارسال شد!");
    window.location.href = "home.html";
  }
}

function logout() {
  localStorage.removeItem("currentUser");
}