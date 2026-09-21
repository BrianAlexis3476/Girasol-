/* =====================================================
   CONFIGURACIÓN
===================================================== */

const CONFIG = {

    maxPetals: 18,

    maxWords: 6,

    maxSparks: 20,

    wordInterval: 1800,

    petalInterval: 500

};


/* =====================================================
   ELEMENTOS
===================================================== */

const welcomeScreen =
    document.getElementById("welcomeScreen");

const startButton =
    document.getElementById("startButton");

const musicButton =
    document.getElementById("musicButton");

const music =
    document.getElementById("backgroundMusic");

const sunflower =
    document.getElementById("sunflower");

const letterModal =
    document.getElementById("letterModal");

const closeModal =
    document.getElementById("closeModal");

const petalsContainer =
    document.getElementById("petalsContainer");

const wordsContainer =
    document.getElementById("wordsContainer");

const sparksContainer =
    document.getElementById("sparksContainer");

const canvas =
    document.getElementById("sparksCanvas");

const ctx =
    canvas.getContext("2d");


/* =====================================================
   PALABRAS
===================================================== */

const romanticWords = [

    "Te amo 💛",

    "Mi sol ☀️",

    "Mi rey 👑",

    "Eres magia ✨",

    "Te adoro",

    "Siempre juntos",

    "Vida mía",

    "Mi amor 💛",

    "Mi lugar especial",

    "Felicidad",

    "Te amo infinito",

    "Mi niño hermoso",

    "Mi chico favorito",

    "Mi universo",

    "Contigo todo"

];


/* =====================================================
   AJUSTAR CANVAS
===================================================== */

function resizeCanvas() {

    canvas.width =
        window.innerWidth * devicePixelRatio;

    canvas.height =
        window.innerHeight * devicePixelRatio;

    ctx.setTransform(
        devicePixelRatio,
        0,
        0,
        devicePixelRatio,
        0,
        0
    );
}


resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);


/* =====================================================
   ESTRELLAS
===================================================== */

const stars = [];


for (let i = 0; i < 45; i++) {

    stars.push({

        x: Math.random() * window.innerWidth,

        y: Math.random() * window.innerHeight,

        radius:
            Math.random() * 1.5 + 0.3,

        alpha:
            Math.random() * 0.6 + 0.2,

        speed:
            Math.random() * 0.01 + 0.002

    });

}


function drawStars() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    stars.forEach(star => {

        star.alpha += star.speed;

        if (star.alpha > 1 || star.alpha < 0.15) {
            star.speed *= -1;
        }


        ctx.beginPath();

        ctx.arc(
            star.x,
            star.y,
            star.radius,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255,213,74,${star.alpha})`;

        ctx.fill();

    });


    requestAnimationFrame(drawStars);
}


drawStars();


/* =====================================================
   INICIAR EXPERIENCIA
===================================================== */

startButton.addEventListener(
    "click",
    async () => {

        welcomeScreen.classList.add("hide");

        createExplosion(
            window.innerWidth / 2,
            window.innerHeight / 2
        );

        try {

            await music.play();

            musicButton.textContent = "🔊";

        } catch (error) {

            musicButton.textContent = "🎵";

        }

    }
);


/* =====================================================
   MÚSICA
===================================================== */

musicButton.addEventListener(
    "click",
    toggleMusic
);


function toggleMusic() {

    if (music.paused) {

        music.play()
            .then(() => {

                musicButton.textContent = "🔊";

            })
            .catch(() => {

                musicButton.textContent = "🎵";

            });

    } else {

        music.pause();

        musicButton.textContent = "🔇";

    }

}


/* =====================================================
   GIRASOL
===================================================== */

sunflower.addEventListener(
    "click",
    event => {

        createExplosion(
            event.clientX,
            event.clientY
        );

        openLetter();

    }
);


/* =====================================================
   CARTA
===================================================== */

function openLetter() {

    letterModal.classList.add("active");

}


function closeLetter() {

    letterModal.classList.remove("active");

}


closeModal.addEventListener(
    "click",
    closeLetter
);


letterModal.addEventListener(
    "click",
    event => {

        if (event.target === letterModal) {

            closeLetter();

        }

    }
);


/* =====================================================
   TECLA ESC
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeLetter();

        }


        if (event.code === "Space") {

            event.preventDefault();

            toggleMusic();

        }

    }
);


/* =====================================================
   PALABRAS FLOTANTES
===================================================== */

function createFloatingWord() {

    const currentWords =
        document.querySelectorAll(
            ".floating-word"
        );


    if (
        currentWords.length >=
        CONFIG.maxWords
    ) {
        return;
    }


    const word =
        document.createElement("div");

    word.className =
        "floating-word";


    word.textContent =
        romanticWords[
            Math.floor(
                Math.random() *
                romanticWords.length
            )
        ];


    word.style.left =
        Math.random() * 85 + 5 + "%";


    word.style.setProperty(
        "--move",
        (Math.random() * 120 - 60) + "px"
    );


    word.style.animationDuration =
        (4 + Math.random() * 3) + "s";


    wordsContainer.appendChild(word);


    setTimeout(() => {

        word.remove();

    }, 7500);

}


setInterval(
    createFloatingWord,
    CONFIG.wordInterval
);


/* =====================================================
   PÉTALOS
===================================================== */

function createFallingPetal() {

    const petals =
        document.querySelectorAll(
            ".falling-petal"
        );


    if (
        petals.length >=
        CONFIG.maxPetals
    ) {
        return;
    }


    const petal =
        document.createElement("div");

    petal.className =
        "falling-petal";


    petal.textContent =
        Math.random() > 0.5
            ? "🌻"
            : "✦";


    petal.style.left =
        Math.random() * 100 + "vw";


    petal.style.fontSize =
        (12 + Math.random() * 18) + "px";


    petal.style.animationDuration =
        (5 + Math.random() * 5) + "s";


    petalsContainer.appendChild(petal);


    setTimeout(() => {

        petal.remove();

    }, 11000);

}


setInterval(
    createFallingPetal,
    CONFIG.petalInterval
);


/* =====================================================
   EXPLOSIÓN DE CHISPAS
===================================================== */

function createExplosion(x, y) {

    const emojis = [
        "✨",
        "💛",
        "🌻",
        "⭐",
        "💫"
    ];


    for (
        let i = 0;
        i < 10;
        i++
    ) {

        const spark =
            document.createElement("div");

        spark.className =
            "spark";


        spark.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        spark.style.left =
            x + "px";


        spark.style.top =
            y + "px";


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            50 +
            Math.random() * 120;


        const moveX =
            Math.cos(angle) *
            distance;


        const moveY =
            Math.sin(angle) *
            distance;


        spark.style.setProperty(
            "--x",
            `${moveX}px`
        );


        spark.style.setProperty(
            "--y",
            `${moveY}px`
        );


        sparksContainer.appendChild(
            spark
        );


        setTimeout(() => {

            spark.remove();

        }, 1000);

    }

}


/* =====================================================
   TOQUE EN CUALQUIER PARTE
===================================================== */

document.addEventListener(
    "pointerdown",
    event => {

        if (
            event.target === sunflower ||
            sunflower.contains(event.target)
        ) {
            return;
        }


        createExplosion(
            event.clientX,
            event.clientY
        );

    }
);


/* =====================================================
   PRIMERAS ANIMACIONES
===================================================== */

for (let i = 0; i < 3; i++) {

    setTimeout(
        createFloatingWord,
        i * 700
    );

}


for (let i = 0; i < 5; i++) {

    setTimeout(
        createFallingPetal,
        i * 300
    );

}