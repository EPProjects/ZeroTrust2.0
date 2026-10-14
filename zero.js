function showScreen(screenId) {
        const allScreens = document.querySelectorAll(".screen")
        allScreens.forEach(screen => screen.classList.remove("active"));
        const targetScreen = document.getElementById(screenId)
        if (targetScreen) {
            targetScreen.classList.add("active");
        }
    }