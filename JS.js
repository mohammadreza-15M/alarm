const selectMenu = document.querySelectorAll("select");
let option;
const timeBox = document.querySelector("#time");
const setAlarmBtn = document.querySelector(".btn");
let alarmTime;
const content = document.querySelector(".content");
const ringtone = new Audio("./asset/ringtone.mp3");
let alarmState = "noset";

for (i = 23; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}
for (i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

setInterval(() => {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  timeBox.innerHTML = `${h}:${m}:${s}`;
  if (alarmTime == `${h}:${m}`) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

setAlarmBtn.addEventListener("click", () => {
  alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}`;
  if (alarmTime.includes("Hour") || alarmTime.includes("Minute")) {
    return alert("زمان هشدار را به درستی مشخص کنید");
  }
  checkState(alarmState);
});

function checkState(state) {
  if (state == "noset") {
    content.classList.add("disable");
    setAlarmBtn.innerText = "clear Alarm";
    alarmState = "set";
  } else {
    content.classList.remove("disable");
    alarmTime = "";
    ringtone.pause();
    setAlarmBtn.innerText = "set Alarm";
    alarmState = "noset";
  }
}
