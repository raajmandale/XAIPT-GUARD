
const navs = document.querySelectorAll("[data-target]");
navs.forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.target;
    document.getElementById(id)?.scrollIntoView({behavior:"smooth", block:"start"});
    document.querySelectorAll(".nav,.mobile-tabs button").forEach(n => n.classList.toggle("active", n.dataset.target === id));
  });
});

const $ = id => document.getElementById(id);
const consoleBox = $("console");
const auditTable = $("auditTable");

function log(event, state="Demo", authority="Runtime"){
  const time = new Date().toLocaleTimeString();
  const p = document.createElement("p");
  p.innerHTML = `<span>${time}</span> ${event}`;
  consoleBox.prepend(p);

  const row = document.createElement("div");
  row.className = "row flash";
  row.innerHTML = `<span>${time}</span><span>${event}</span><span>${state}</span><span>${authority}</span>`;
  auditTable.appendChild(row);
  setTimeout(() => row.classList.remove("flash"), 1000);
}

function setSegment(active){
  ["segHold","segReview","segApprove"].forEach(id => $(id).classList.remove("active"));
  $(active).classList.add("active");
}

function runDemo(){
  const sequence = [
    () => { log("High-risk UPI-like action created.", "Pending", "Primary"); },
    () => { log("Risk score increased to 84%.", "Risk", "Risk Engine"); $("riskText").textContent="84%"; $("riskNumber").textContent="84"; $("riskArc").textContent="84"; $("riskReason").textContent="pressure + device drift"; },
    () => { log("HOLD state reinforced before execution finality.", "Hold", "System"); $("phoneState").textContent="HOLD REINFORCED"; },
    () => { log("QR authority token generated.", "Review", "Trusted Device"); $("qrTitle").textContent="QR authority review active"; $("authState").textContent="Reviewing"; $("authorityText").textContent="REVIEW"; setSegment("segReview"); $("stepReview").classList.add("active"); $("lineReview").classList.add("active"); },
    () => { log("Cooling window remains active.", "Delayed", "Timer"); $("delayText").textContent="14m"; $("delayMinutes").textContent="14:32"; },
  ];
  sequence.forEach((fn, i) => setTimeout(fn, i * 650));
  document.body.animate([{filter:"brightness(1)"},{filter:"brightness(1.13)"},{filter:"brightness(1)"}],{duration:800});
}

function approve(){
  $("phoneState").textContent = "APPROVED";
  $("phoneMsg").textContent = "Public demo branch approved. No real payment or banking action executed.";
  $("upiState").textContent = "Released";
  $("authState").textContent = "Approved";
  $("auditState").textContent = "Sealed";
  $("authorityText").textContent = "APPROVED";
  $("topState").textContent = "APPROVED";
  setSegment("segApprove");
  $("stepReview").classList.add("active");
  $("stepExecute").classList.add("approved");
  $("lineReview").classList.add("ready");
  $("lineExecute").classList.add("ready");
  $("coreNode").textContent = "OK";
  $("coreNode").classList.add("approved");
  $("decisionNote").textContent = "Approved branch recorded in demo audit. Internal XAIPT logic is not exposed.";
  log("Authority approved simulated execution branch.", "Approved", "Human Authority");
}

function deny(){
  $("phoneState").textContent = "DENIED";
  $("phoneMsg").textContent = "Execution remains blocked after human authority decision.";
  $("upiState").textContent = "Blocked";
  $("authState").textContent = "Denied";
  $("authorityText").textContent = "DENIED";
  $("topState").textContent = "DENIED";
  $("decisionNote").textContent = "Denied branch recorded. Execution remains bounded.";
  log("Authority denied simulated execution branch.", "Denied", "Human Authority");
}

$("runDemo").addEventListener("click", runDemo);
$("approveBtn").addEventListener("click", approve);
$("denyBtn").addEventListener("click", deny);
$("resetDemo").addEventListener("click", () => window.location.reload());
