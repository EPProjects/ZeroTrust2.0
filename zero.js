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
        const previousScreenId = screenHistory[screenHistory.length -1];
        const allScreens = document.querySelectorAll(".screen");
        allScreens.forEach(screen => screen.classList.remove("active"));
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

    quizContainers.forEach(container => {
        const correctOpt = container.getAttribute("data-correct");
        const buttons = container.querySelectorAll(".quiz-btn");
        const feedback= container.querySelector(".quiz-feedback");

  buttons.forEach(button => {
     button.addEventListener("click", () => {
      const selectedOpt = button.getAttribute("data-answer");


buttons.forEach(btn => btn.disabled = true);
feedback.style.display = "block";

  if (selectedOpt === correctOpt) {
    button.classList.add("correct");
    feedback.textContent = "Correct! Great Job";
    feedback.style.color ="#4ade80";
  }
  else {
    button.classList.add("incorrect");
    feedback.textContent = "Not quite. Review the section and try again!";
    feedback.style.color = "#f87171";

    buttons.forEach(btn => {
        if(btn.getAttribute("data-answer") === correctOpt) {
            btn.classList.add("correct");
                           }
                        });
                      }
                 });
            });
        });
     }
    








    const rounds = [
{img: "1.png", region: {x: 20, y: 68, w: 35, h: 12},
 why: "lorem ipsum"
 },
{
    img: "2.png", region: {x: 55, y: 70, w: 30, h: 10}, why: "lorem ipsum" 
},
{
    img: "Quishing.png", region: {x: 60, y: 70, w: 30, h: 10}, why: "lorem ipsum" 
},

{
    img: "Malware.png", region: {x: 55, y: 70, w: 30, h: 10}, why: "lorem ipsum" 
},

{
    img: "WeakPassword.png", region: {x: 55, y: 70, w: 30, h: 10}, why: "lorem ipsum" 
},

{
    img: "PasswordExposed.png", region: {x: 55, y: 70, w: 30, h: 10}, why: "lorem ipsum" 
},
{
    img: "PackageScam.png", region: {x: 55, y: 70, w: 30, h: 10}, why: "lorem ipsum" 
},
{
    img: "GiveAwayScam.png", region: {x: 55, y: 70, w: 30, h: 10}, why: "lorem ipsum" 
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
