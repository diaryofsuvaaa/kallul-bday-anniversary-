/* =========================================
   KALLUL'S BIRTHDAY WEBSITE
   JAVASCRIPT — PART 1
========================================= */


/* =========================================
   1. SCREEN NAVIGATION
========================================= */

const allScreens = document.querySelectorAll(".screen");

function showScreen(screenId) {
    const targetScreen = document.getElementById(screenId);

    if (!targetScreen) {
        console.error("Screen not found:", screenId);
        return;
    }

    allScreens.forEach(screen => {
        screen.classList.remove("active");
        screen.setAttribute("aria-hidden", "true");
    });

    targetScreen.classList.add("active");
    targetScreen.setAttribute("aria-hidden", "false");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

document.querySelectorAll(".next-screen").forEach(button => {
    button.addEventListener("click", () => {
        const nextScreen = button.dataset.next;

        if (nextScreen) {
            showScreen(nextScreen);
        }
    });
});


/* =========================================
   2. BACKGROUND MUSIC CONTROL
========================================= */

const backgroundMusic = document.getElementById("background-music");
const musicToggle = document.getElementById("music-toggle");

let musicPlaying = false;

if (musicToggle && backgroundMusic) {

    musicToggle.addEventListener("click", async () => {

        if (!musicPlaying) {
            try {
                await backgroundMusic.play();

                musicPlaying = true;
                musicToggle.textContent = "♫ Music On";
                musicToggle.setAttribute("aria-label", "Pause background music");

            } catch (error) {
                musicToggle.textContent = "Music unavailable";
                console.warn("Music could not be played:", error);
            }

        } else {
            backgroundMusic.pause();

            musicPlaying = false;
            musicToggle.textContent = "♫ Music Off";
            musicToggle.setAttribute("aria-label", "Play background music");
        }

    });

    backgroundMusic.addEventListener("ended", () => {
        musicPlaying = false;
        musicToggle.textContent = "♫ Music Off";
    });
}


/* =========================================
   3. GROW OUR LITTLE TREE GAME
========================================= */

const growTreeButton = document.getElementById("grow-tree");
const treeStage = document.getElementById("tree-stage");
const treeMessage = document.getElementById("tree-message");

let treeGrowth = 0;

const treeStages = [
    {
        symbol: "🌱",
        message: "A little beginning..."
    },
    {
        symbol: "🌿",
        message: "Something beautiful is growing."
    },
    {
        symbol: "🌳",
        message: "Look how far our little tree has grown!"
    },
    {
        symbol: "🌳✨",
        message: "Growing stronger, one moment at a time."
    },
    {
        symbol: "🌳🌸",
        message: "Our little enchanted tree is complete!"
    }
];

if (growTreeButton && treeStage && treeMessage) {

    growTreeButton.addEventListener("click", () => {

        if (treeGrowth >= treeStages.length) {
            return;
        }

        const currentStage = treeStages[treeGrowth];

        treeGrowth++;

        treeStage.textContent = currentStage.symbol;
        treeMessage.textContent = currentStage.message;

        treeStage.classList.remove("tree-pop");

        void treeStage.offsetWidth;

        treeStage.classList.add("tree-pop");

        if (treeGrowth === treeStages.length) {
            growTreeButton.textContent = "Tree Completed ✨";
            growTreeButton.disabled = true;
        }

    });

}


/* =========================================
   END OF JAVASCRIPT PART 1
========================================= */
/* =========================================
   4. CATCH THE FIREFLIES GAME
========================================= */

const fireflyArea = document.getElementById("firefly-area");
const fireflyScore = document.getElementById("firefly-score");
const fireflyMessage = document.getElementById("firefly-message");
const fireflyRestart = document.getElementById("firefly-restart");

const fireflies = document.querySelectorAll(".game-firefly");

let caughtFireflies = 0;
let fireflyGameComplete = false;


/* UPDATE THE SCORE */

function updateFireflyScore() {
    if (fireflyScore) {
        fireflyScore.textContent = `${caughtFireflies}/5`;
    }
}


/* CREATE FALLING FLOWER PETALS */

function createFlowerPetals(container, amount = 22) {
    if (!container) return;

    for (let i = 0; i < amount; i++) {
        const petal = document.createElement("span");

        petal.className = "firefly-petal";

        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDelay = `${Math.random() * 3}s`;
        petal.style.animationDuration = `${3 + Math.random() * 3}s`;

        container.appendChild(petal);

        setTimeout(() => {
            petal.remove();
        }, 7000);
    }
}


/* WHEN ALL FIVE FIREFLIES ARE CAUGHT */

function completeFireflyGame() {
    fireflyGameComplete = true;

    if (fireflyMessage) {
        fireflyMessage.textContent =
            "You caught all five little lights! ✨";
    }

    if (fireflyArea) {
        fireflyArea.classList.add("firefly-complete");
        createFlowerPetals(fireflyArea, 35);
    }

    const gameContent = document.querySelector(".game-content");

    if (gameContent) {
        gameContent.classList.add("firefly-glow");
    }

    fireflies.forEach(firefly => {
        firefly.disabled = true;
    });

    if (fireflyRestart) {
        fireflyRestart.textContent = "Play Again";
    }
}


/* CATCH INDIVIDUAL FIREFLIES */

fireflies.forEach(firefly => {

    firefly.addEventListener("click", () => {

        if (
            firefly.classList.contains("caught") ||
            fireflyGameComplete
        ) {
            return;
        }

        firefly.classList.add("caught");
        firefly.disabled = true;

        caughtFireflies++;

        updateFireflyScore();

        if (fireflyMessage) {
            fireflyMessage.textContent =
                "One little light caught! Keep going ✨";
        }

        if (caughtFireflies === 5) {
            completeFireflyGame();
        }

    });

});


/* RESTART THE GAME */

if (fireflyRestart) {

    fireflyRestart.addEventListener("click", () => {

        caughtFireflies = 0;
        fireflyGameComplete = false;

        updateFireflyScore();

        fireflies.forEach(firefly => {
            firefly.classList.remove("caught");
            firefly.disabled = false;
        });

        if (fireflyArea) {
            fireflyArea.classList.remove("firefly-complete");

            fireflyArea
                .querySelectorAll(".firefly-petal")
                .forEach(petal => petal.remove());
        }

        const gameContent = document.querySelector(".game-content");

        if (gameContent) {
            gameContent.classList.remove("firefly-glow");
        }

        if (fireflyMessage) {
            fireflyMessage.textContent =
                "Find all five little lights!";
        }

        fireflyRestart.textContent = "Restart Game";

    });

}


/* INITIAL SCORE */

updateFireflyScore();


/* =========================================
   END OF JAVASCRIPT PART 2
========================================= */
/* =========================================
   5. BIRTHDAY CAKE STUDIO
========================================= */

const cakeIllustration = document.getElementById("cake-illustration");
const decorateCakeButton = document.getElementById("decorate-cake");
const candleToggleButton = document.getElementById("cake-candle-toggle");
const cakeMessage = document.getElementById("cake-message");

const cakeCandle = document.querySelector(".cake-candle");
const cakeTop = document.querySelector(".cake-top");
const cakeMiddle = document.querySelector(".cake-middle");
const cakeBottom = document.querySelector(".cake-bottom");

const cakeContinueButton = document.querySelector(
    ".cake-screen .next-screen"
);

let cakeDecorationStage = 0;
let candleBlownOut = false;

const cakeDecorations = [
    {
        top: "#d9a9c5",
        middle: "#a9cce5",
        bottom: "#c58b91",
        message: "A little colour for your birthday cake! 🎂"
    },
    {
        top: "#f0c5d5",
        middle: "#b7d7e9",
        bottom: "#a77b70",
        message: "A little more sweetness! 🌸"
    },
    {
        top: "#e9b5c9",
        middle: "#c6dfed",
        bottom: "#bd8c7e",
        message: "Your birthday cake is beautifully decorated! ✨"
    }
];


/* KEEP THE CONTINUE BUTTON LOCKED UNTIL THE CAKE IS READY */

if (cakeContinueButton) {
    cakeContinueButton.disabled = true;
    cakeContinueButton.setAttribute("aria-disabled", "true");
}


/* CHECK WHETHER THE CAKE IS COMPLETE */

function checkCakeCompletion() {

    if (
        cakeDecorationStage >= cakeDecorations.length &&
        candleBlownOut
    ) {
        if (cakeMessage) {
            cakeMessage.textContent =
                "Your birthday cake is ready! Make a wish. ✨";
        }

        if (cakeContinueButton) {
            cakeContinueButton.disabled = false;
            cakeContinueButton.setAttribute("aria-disabled", "false");
        }
    }
}


/* ADD DECORATIONS TO THE CAKE */

if (decorateCakeButton) {

    decorateCakeButton.addEventListener("click", () => {

        if (cakeDecorationStage >= cakeDecorations.length) {
            return;
        }

        const decoration = cakeDecorations[cakeDecorationStage];

        if (cakeTop) {
            cakeTop.style.backgroundColor = decoration.top;
        }

        if (cakeMiddle) {
            cakeMiddle.style.backgroundColor = decoration.middle;
        }

        if (cakeBottom) {
            cakeBottom.style.backgroundColor = decoration.bottom;
        }

        cakeDecorationStage++;

        if (cakeIllustration) {
            cakeIllustration.classList.remove("cake-pop");

            void cakeIllustration.offsetWidth;

            cakeIllustration.classList.add("cake-pop");
        }

        if (cakeMessage) {
            cakeMessage.textContent = decoration.message;
        }

        if (cakeDecorationStage === cakeDecorations.length) {
            decorateCakeButton.textContent = "Cake Decorated ✓";
            decorateCakeButton.disabled = true;
        }

        checkCakeCompletion();

    });

}


/* BLOW OUT THE CANDLE */

if (candleToggleButton && cakeCandle) {

    candleToggleButton.addEventListener("click", () => {

        if (!candleBlownOut) {

            candleBlownOut = true;

            cakeCandle.classList.add("blown");

            candleToggleButton.textContent = "Candle Blown Out ✓";

            if (cakeMessage) {
                cakeMessage.textContent =
                    "Wish made! ✨";
            }
/* =========================================
   6. BIRTHDAY LETTER
========================================= */

const letterText = document.querySelector(".letter-text");

if (letterText) {
    letterText.textContent = "";
}


/* =========================================
   7. FINALE — FALLING FLOWER PETALS
========================================= */

const finalePetals = document.getElementById("finale-petals");

function createFinalePetals(amount = 45) {
    if (!finalePetals) return;

    finalePetals.innerHTML = "";

    for (let i = 0; i < amount; i++) {
        const petal = document.createElement("span");

        petal.className = "finale-petal";
        petal.style.left = `${Math.random() * 100}%`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petal.style.animationDuration = `${4 + Math.random() * 4}s`;

        finalePetals.appendChild(petal);
    }
}


/* CREATE PETALS WHEN THE FINALE OPENS */

const finaleScreen = document.getElementById("finale");

if (finaleScreen) {
    const finaleObserver = new MutationObserver(() => {
        if (finaleScreen.classList.contains("active")) {
            createFinalePetals();
        }
    });

    finaleObserver.observe(finaleScreen, {
        attributes: true,
        attributeFilter: ["class"]
    });
}


/* =========================================
   8. REPLAY THE WEBSITE
========================================= */

const replayButton = document.getElementById("replay-website");

if (replayButton) {

    replayButton.addEventListener("click", () => {

        /* Stop music */
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }

        musicPlaying = false;

        if (musicToggle) {
            musicToggle.textContent = "♫ Music Off";
        }

        /* Reset tree game */
        treeGrowth = 0;

        if (treeStage) {
            treeStage.textContent = "🌱";
        }

        if (treeMessage) {
            treeMessage.textContent = "Let's grow our little tree!";
        }

        if (growTreeButton) {
            growTreeButton.disabled = false;
            growTreeButton.textContent = "Grow Our Tree";
        }

        /* Reset firefly game */
        caughtFireflies = 0;
        fireflyGameComplete = false;
        updateFireflyScore();

        fireflies.forEach(firefly => {
            firefly.classList.remove("caught");
            firefly.disabled = false;
        });

        if (fireflyArea) {
            fireflyArea.classList.remove("firefly-complete");
            fireflyArea
                .querySelectorAll(".firefly-petal")
                .forEach(petal => petal.remove());
        }

        const gameContent = document.querySelector(".game-content");

        if (gameContent) {
            gameContent.classList.remove("firefly-glow");
        }

        if (fireflyMessage) {
            fireflyMessage.textContent = "Find all five little lights!";
        }

        if (fireflyRestart) {
            fireflyRestart.textContent = "Restart Game";
        }

        /* Reset cake */
        cakeDecorationStage = 0;
        candleBlownOut = false;

        if (cakeTop) {
            cakeTop.style.backgroundColor = "#d9a9c5";
        }

        if (cakeMiddle) {
            cakeMiddle.style.backgroundColor = "#a9cce5";
        }

        if (cakeBottom) {
            cakeBottom.style.backgroundColor = "#c58b91";
        }

        if (cakeCandle) {
            cakeCandle.classList.remove("blown");
        }

        if (decorateCakeButton) {
            decorateCakeButton.disabled = false;
            decorateCakeButton.textContent = "Decorate Cake";
        }

        if (candleToggleButton) {
            candleToggleButton.disabled = false;
            candleToggleButton.textContent = "Blow Out Candle";
        }

        if (cakeMessage) {
            cakeMessage.textContent = "Let's decorate your birthday cake!";
        }

        if (cakeContinueButton) {
            cakeContinueButton.disabled = true;
            cakeContinueButton.setAttribute("aria-disabled", "true");
        }

        /* Reset finale petals */
        if (finalePetals) {
            finalePetals.innerHTML = "";
        }

        /* Return to welcome screen */
        showScreen("welcome");

    });

}


/* =========================================
   END OF JAVASCRIPT PART 4
========================================= */

        }

        checkCakeCompletion();

    });

}


/* =========================================
   END OF JAVASCRIPT PART 3
========================================= */
