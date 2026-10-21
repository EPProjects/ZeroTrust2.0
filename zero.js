function showScreen(screenId) {
        const allScreens = document.querySelectorAll(".screen")
        allScreens.forEach(screen => screen.classList.remove("active"));
        const targetScreen = document.getElementById(screenId)
        if (targetScreen) {
        targetScreen.classList.add("active");
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
    
    