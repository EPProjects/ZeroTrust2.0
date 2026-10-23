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

    const rounds = [
{img: "phishing-email.png", region: {x: 55, y: 70, w: 30, h: 10}, why: "lorem ipsum" },
{img: "phishing-email.png", region: {x: 55, y: 70, w: 30, h: 10}, why: "lorem ipsum" },

    ]
    
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
stage.addEventListener("mousemove", e=> {
    flag.style.left = e.clientX + "px";
    flag.style.top = e.clientY + "px";
});

pic.addEventListener("click", e => {
    if (answered) return;
    answered = true;


const r = pic.getBoundingClientRect();
const px = ((e.clientX - r.left) / r.width) * 100;
const py= ((e.clientY - r.top) / r.heigth) * 100;
const reg = rounds[current].region;

const hit = px >= reg.x && px <= reg.x + reg.w &&
            py >= reg.y && py <= reg.y + reg.h;

        let pts = 0;
        if(hit) {
            const cx = reg.x + reg.w / 2;
            const cy = reg.y + reg.h / 2;
            const dist = Math.hypot((px-cx) / (reg.w / 2), (py - cy) / (reg.h / 2));
            pts = Math.round(max_Points * (1 - Math.min(dist, 1) * 0.5));
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
        current++;
        if(current >= rounds.length) {
            msg.textContent = `Game Over! Final Score: ${score}`;
            nextBtn.style.display = "none";
            return;
        }
        loadRound();
    });
    loadRound();

