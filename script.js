/* =========================================
   CONFIGURACIÓN
========================================= */

const CONFIG = {

    maxPetals: 16,

    maxWords: 5,

    wordInterval: 1800,

    petalInterval: 500

};


/* =========================================
   ELEMENTOS
========================================= */

const welcomeScreen =
    document.getElementById(
        "welcomeScreen"
    );


const startButton =
    document.getElementById(
        "startButton"
    );


const musicButton =
    document.getElementById(
        "musicButton"
    );


const music =
    document.getElementById(
        "backgroundMusic"
    );


const sunflower =
    document.getElementById(
        "sunflower"
    );


const touchHint =
    document.getElementById(
        "touchHint"
    );


const letterModal =
    document.getElementById(
        "letterModal"
    );


const closeModal =
    document.getElementById(
        "closeModal"
    );


const petalsContainer =
    document.getElementById(
        "petalsContainer"
    );


const wordsContainer =
    document.getElementById(
        "wordsContainer"
    );


const sparksContainer =
    document.getElementById(
        "sparksContainer"
    );


const canvas =
    document.getElementById(
        "sparksCanvas"
    );


const ctx =
    canvas.getContext("2d");


/* =========================================
   FRASES
========================================= */

const words = [

    "Te amo 💛",

    "Mi sol ☀️",

    "Mi rey 👑",

    "Eres magia ✨",

    "Te adoro",

    "Siempre juntos",

    "Vida mía",

    "Mi amor 💛",

    "Felicidad",

    "Te amo infinito",

    "Mi chico favorito",

    "Mi universo",

    "Contigo todo"

];


/* =========================================
   CANVAS
========================================= */

let dpr =
    Math.min(
        window.devicePixelRatio || 1,
        2
    );


function resizeCanvas() {

    dpr =
        Math.min(
            window.devicePixelRatio || 1,
            2
        );


    canvas.width =
        window.innerWidth * dpr;


    canvas.height =
        window.innerHeight * dpr;


    canvas.style.width =
        window.innerWidth + "px";


    canvas.style.height =
        window.innerHeight + "px";


    ctx.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );

}


resizeCanvas();


window.addEventListener(
    "resize",
    resizeCanvas
);


/* =========================================
   ESTRELLAS
========================================= */

const stars =
    Array.from(
        { length: 50 },
        () => ({

            x:
                Math.random() *
                window.innerWidth,

            y:
                Math.random() *
                window.innerHeight,

            r:
                Math.random() *
                1.4 + .3,

            alpha:
                Math.random() *
                .6 + .2,

            speed:
                Math.random() *
                .008 + .002

        })
    );


function drawStars() {

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );


    stars.forEach(
        star => {

            star.alpha +=
                star.speed;


            if (
                star.alpha > .95 ||
                star.alpha < .12
            ) {

                star.speed *= -1;

            }


            ctx.beginPath();


            ctx.arc(
                star.x,
                star.y,
                star.r,
                0,
                Math.PI * 2
            );


            ctx.fillStyle =
                `rgba(
                    255,
                    216,
                    77,
                    ${star.alpha}
                )`;


            ctx.fill();

        }
    );


    requestAnimationFrame(
        drawStars
    );

}


drawStars();


/* =========================================
   ABRIR SORPRESA
========================================= */

startButton.addEventListener(
    "click",
    async () => {

        welcomeScreen.classList.add(
            "hide"
        );


        createExplosion(
            window.innerWidth / 2,
            window.innerHeight / 2
        );


        try {

            await music.play();

            musicButton.textContent =
                "🔊";

        }

        catch {

            musicButton.textContent =
                "🎵";

        }

    }
);


/* =========================================
   MÚSICA
========================================= */

musicButton.addEventListener(
    "click",
    toggleMusic
);


async function toggleMusic() {

    if (music.paused) {

        try {

            await music.play();

            musicButton.textContent =
                "🔊";

        }

        catch {

            musicButton.textContent =
                "🎵";

        }

    }

    else {

        music.pause();

        musicButton.textContent =
            "🔇";

    }

}


/* =========================================
   GIRASOL
========================================= */

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


/* =========================================
   BOTÓN TOCAR GIRASOL
========================================= */

touchHint.addEventListener(
    "click",
    () => {

        const rect =
            sunflower.getBoundingClientRect();


        createExplosion(

            rect.left +
            rect.width / 2,

            rect.top +
            rect.height / 2

        );


        openLetter();

    }
);


/* =========================================
   ABRIR CARTA
========================================= */

function openLetter() {

    letterModal.classList.add(
        "active"
    );

}


/* =========================================
   CERRAR CARTA
========================================= */

function closeLetter() {

    letterModal.classList.remove(
        "active"
    );

}


closeModal.addEventListener(
    "click",
    closeLetter
);


letterModal.addEventListener(
    "click",
    event => {

        if (
            event.target ===
            letterModal
        ) {

            closeLetter();

        }

    }
);


/* =========================================
   TECLA ESC
========================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key ===
            "Escape"
        ) {

            closeLetter();

        }


        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            toggleMusic();

        }

    }
);


/* =========================================
   PALABRAS FLOTANTES
========================================= */

function createFloatingWord() {

    const current =
        document.querySelectorAll(
            ".floating-word"
        );


    if (
        current.length >=
        CONFIG.maxWords
    ) {

        return;

    }


    const word =
        document.createElement(
            "div"
        );


    word.className =
        "floating-word";


    word.textContent =
        words[
            Math.floor(
                Math.random() *
                words.length
            )
        ];


    word.style.left =
        `${5 + Math.random() * 85}%`;


    word.style.setProperty(
        "--move",
        `${Math.random() * 120 - 60}px`
    );


    word.style.animationDuration =
        `${4.5 + Math.random() * 2.5}s`;


    wordsContainer.appendChild(
        word
    );


    setTimeout(
        () => word.remove(),
        8000
    );

}


setInterval(
    createFloatingWord,
    CONFIG.wordInterval
);


/* =========================================
   PÉTALOS QUE CAEN
========================================= */

function createFallingPetal() {

    const current =
        document.querySelectorAll(
            ".falling-petal"
        );


    if (
        current.length >=
        CONFIG.maxPetals
    ) {

        return;

    }


    const petal =
        document.createElement(
            "div"
        );


    petal.className =
        "falling-petal";


    petal.textContent =
        Math.random() > .45
            ? "🌻"
            : "✦";


    petal.style.left =
        `${Math.random() * 100}vw`;


    petal.style.fontSize =
        `${12 + Math.random() * 16}px`;


    petal.style.animationDuration =
        `${5 + Math.random() * 5}s`;


    petalsContainer.appendChild(
        petal
    );


    setTimeout(
        () => petal.remove(),
        11000
    );

}


setInterval(
    createFallingPetal,
    CONFIG.petalInterval
);


/* =========================================
   EXPLOSIÓN DE CHISPAS
========================================= */

function createExplosion(
    x,
    y
) {

    const emojis = [

        "✨",
        "💛",
        "🌻",
        "⭐",
        "💫"

    ];


    for (
        let i = 0;
        i < 12;
        i++
    ) {

        const spark =
            document.createElement(
                "div"
            );


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
            `${x}px`;


        spark.style.top =
            `${y}px`;


        const angle =
            Math.random() *
            Math.PI *
            2;


        const distance =
            50 +
            Math.random() *
            120;


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


        setTimeout(
            () => spark.remove(),
            1000
        );

    }

}


/* =========================================
   EFECTOS AL CARGAR
========================================= */

for (
    let i = 0;
    i < 3;
    i++
) {

    setTimeout(
        createFloatingWord,
        700 + i * 650
    );

}


for (
    let i = 0;
    i < 5;
    i++
) {

    setTimeout(
        createFallingPetal,
        i * 350
    );

}