let screenHistory = ['screen-welcome']; 

function showScreen(screenId) {
    const allScreens = document.querySelectorAll(".screen");
    allScreens.forEach(screen => screen.classList.remove("active"))
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add("active");
        if (screenHistory[screenHistory.length - 1] !== screenId) {
            screenHistory.push(screenId);
        }
        if (screenId === "screen-lessons") {
            console.log("Lessons screenloaded");
            initQuizzez();
        }
    }

}
function goBack() {
    if (screenHistory.length > 1) {
        screenHistory.pop();
        const previousScreenId = screenHistory[screenHistory.length - 1];
        const allScreens = document.querySelectorAll(".screen");
        allScreens.forEach(screen => screen.classList.remove("active"));
        // reset lesson view so nothing leaks into the previous screen
        document.querySelectorAll('.lesson-content-section').forEach(section => {
            if (section.id === 'lesson-welcome') {
                section.classList.remove('hidden');   // welcome stays as the default view
            } else {
                section.classList.add('hidden');
            }
        });
        closeNav();
        const targetScreen = document.getElementById(previousScreenId);
        if (targetScreen) {
            targetScreen.classList.add("active");
        }
    }
}

   function showLessonContent(lessonId) {
        const allSections = document.querySelectorAll('.lesson-content-section');
        allSections.forEach(section => {
            section.classList.add('hidden');
        });
        const targetLesson = document.getElementById(lessonId);
        if (targetLesson) {
            targetLesson.classList.remove('hidden');
            initQuizzez();
        }
    }
    
    function openNav() {
        document.getElementById("mySidebar").style.width = "300px";
        document.getElementById("main").style.marginLeft = "280px";
         document.getElementById("openbtn").classList.add("hidden");
    }
   
    function closeNav() {
        document.getElementById("mySidebar").style.width = "0";
        document.getElementById("main").style.marginLeft = "0";
        document.getElementById("openbtn").classList.remove("hidden");
    }


function initQuizzez() {
    const quizContainers = document.querySelectorAll(".quiz");
    console.log("Found quiz", quizContainers.length);

    quizContainers.forEach(container => {
        const correctOpt = container.getAttribute("data-correct");
        const buttons = container.querySelectorAll(".quiz-btn");
        const feedback= container.querySelector(".quiz-feedback");

  buttons.forEach(button => {
    const newButton = button.cloneNode(true);
    button.parentNode.replaceChild(newButton, button);
  });
  const freshButtons = container.querySelectorAll(".quiz-btn");
  freshButtons.forEach(button => {
     button.addEventListener("click", () => {
      const selectedOpt = button.getAttribute("data-answer");
feedback.style.display = "block";

  if (selectedOpt === correctOpt) {
     freshButtons.forEach(btn => btn.disabled = true);
    button.classList.add("correct");
    feedback.textContent = "Correct! Great Job";
    feedback.style.color ="#4ade80";
  }
  else {
    button.classList.add("incorrect");
    button.disabled = true;
    feedback.textContent = "Not quite. Review the section and try again!";
    feedback.style.color = "#f87171";
                           }
                        });
                      });
                    }); 
                }
    








    const rounds = [
{img: "1.png", region: {x: 30, y: 3, w: 45, h: 15},
 why: "The display name read Bank of America but the sender is trust.ameribank7.com. A real bank mails from its own domain; an unrelated or mispelled domain is the giveaway."
 },
{
    img: "2.png", region: {x: 9, y: 58, w: 42, h: 13}, why: " A billing-hold notice with a single high-pressure button. Update now pushes you to act before you check whether the site is really Netflix; hovering the link would reveal a non-Netflix domain. " 
},
{
    img: "Quishing.png", region: {x: 5, y: 45, w: 22, h: 32}, why: "A QR code in an email you didn't expect. The code hides the real destination, so you can't inspect it before scanning — the URL is only visible after the phone has already opened it." 
},

{
    img: "Malware.png", region: {x: 40, y: 84, w: 22, h: 10}, why: " A fake antivirus alert. Real scanners don't show a browser-style window with alarming 27 critical security weaknesses copy and a single button — that button is what installs the thing it claims to remove." 
},

{
    img: "WeakPassword.png", region: {x: 25, y: 35, w: 40, h: 16}, why: "A password on a sticky note in view of the screen. Anyone who walks past, or any camera pointed at the desk, has the credential." 
},

{
    img: "PasswordExposed.png", region: {x: 38, y: 40, w: 28, h: 16}, why: "A saved password visible in a login form. Shoulder-surfing or a shared screen is enough, and it's the kind of value that gets reused after a breach." 
},
{
    img: "PackageScam.png", region: {x: 16, y: 85, w: 40, h: 14}, why: "A short link in a missed delivery SMS. The bit.ly wrapper hides where it actually goes, and the reschedule here phrasing is the pressure tactic." 
},
{
    img: "GiveAwayScam.png", region: {x: 2, y: 42, w: 64, h: 11}, why: "The countdown and the number of gifts is limited line. Manufactured scarcity plus a timer is the core of a giveaway scam." 
}




    ];

const max_Points = 100;
let current = 0;
let score = 0;
let answered = false;


const pic = document.getElementById("pic");
const stage = document.getElementById("stage");
const flag = document.getElementById("flag");
const msg= document.getElementById("msg");
const nextBtn = document.getElementById("nextBtn");
document.getElementById("total").textContent = rounds.length;

function loadRound() {
    answered = false;
    msg.textContent = "";
    nextBtn.style.display = "none";
    pic.src = rounds[current].img;
    document.getElementById("round").textContent = current + 1;
    stage.querySelectorAll(".reveal").forEach(el => el.remove());
}
stage.addEventListener("mousemove", e => {
    flag.style.left = e.clientX + "px";
    flag.style.top = e.clientY + "px";

});

pic.addEventListener("click", e => {
    console.log("hndler fired");
    if (answered) return;
    answered = true;
const reg = rounds[current].region;
const rect = pic.getBoundingClientRect();

const clickX = (e.clientX - rect.left) / rect.width * 100;
const clickY = (e.clientY - rect.top) / rect.height * 100;

const hit = 
  clickX >= reg.x && clickX <= reg.x + reg.w &&
  clickY >= reg.y && clickY <= reg.y + reg.h;
        let pts = 0;
        if(hit) {
            const cx = reg.x + reg.w / 2;
            const cy = reg.y + reg.h / 2;
            const dist = Math.hypot(
                (clickX -cx) / (reg.w / 2),
                (clickY - cy) / (reg.h / 2)
            );
      pts = Math.max(0, Math.round(max_Points * (1- Math.min(dist, 1))));
        }
    score += pts;
    document.getElementById("score").textContent = score;
    msg.textContent = (hit ? `+${pts}! ` : "Missed. ") + rounds[current].why;

    const box= document.createElement("div");
    box.className = "reveal";
     box.style.left = reg.x + "%";
    box.style.top = reg.y + "%";
    box.style.width = reg.w + "%";
    box.style.height = reg.h + "%";
    stage.appendChild(box);
    

    nextBtn.textContent = current + 1 < rounds.length ? "Next" : "Finish";
    nextBtn.style.display = "inline-block";
    });

    nextBtn.addEventListener("click", () => {
        if(current >= rounds.length) {
            msg.textContent = `Game Over! Final Score: ${score}`;
            nextBtn.style.display = "none";
            current = 0;
            score = 0;
            documentElementById("score").textContent = score;
            return;
        }
        current++;

        if(current >= rounds.length) {
            msg.textContent = `Game Over! Final Score: ${score}`;
            nextBtn.style.display = "none";
            return;
        }
        loadRound();
    });
loadRound();
