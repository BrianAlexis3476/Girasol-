/* =====================================================
   CONFIGURACIÓN
===================================================== */

const CONFIG = {
    maxPetals: 16,
    maxWords: 5,
    wordInterval: 1800,
    petalInterval: 500,
    particleCount: 16
};


/* =====================================================
   ELEMENTOS HTML
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

const touchHint =
    document.getElementById("touchHint");

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
   FRASES FLOTANTES
===================================================== */

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
    "Contigo todo",
    "Mi persona favorita 🌻",
    "Siempre tú 💛"
];


/* =====================================================
   CANVAS
===================================================== */

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


/* =====================================================
   ESTRELLAS DE FONDO
===================================================== */

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
                1.4 + 0.3,

            alpha:
                Math.random() *
                0.6 + 0.2,

            speed:
                Math.random() *
                0.008 + 0.002
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
                star.alpha > 0.95 ||
                star.alpha < 0.12
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


/* =====================================================
   PANTALLA DE INICIO
===================================================== */

startButton.addEventListener(
    "click",
    async function () {

        welcomeScreen.classList.add(
            "hide"
        );


        /*
            Explosión inicial
        */

        createExplosion(
            window.innerWidth / 2,
            window.innerHeight / 2
        );


        /*
            Intentar iniciar música
        */

        try {

            await music.play();

            musicButton.textContent =
                "🔊";

        }

        catch (error) {

            musicButton.textContent =
                "🎵";

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


async function toggleMusic() {

    if (music.paused) {

        try {

            await music.play();

            musicButton.textContent =
                "🔊";

        }

        catch (error) {

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


/* =====================================================
   CONTROL DE TOQUES
===================================================== */

/*
    Evita que un mismo toque genere
    demasiadas explosiones.
*/

let lastTouchTime = 0;


function screenTouch(x, y) {

    const now =
        Date.now();


    /*
        Pequeño límite para evitar
        duplicados en algunos celulares.
    */

    if (
        now - lastTouchTime < 80
    ) {

        return;

    }


    lastTouchTime =
        now;


    createExplosion(
        x,
        y
    );
}


/* =====================================================
   TOCAR CUALQUIER PARTE DE LA PANTALLA
===================================================== */

/*
    POINTERDOWN funciona con:

    - Mouse
    - Touch
    - Celular
    - Tablet
    - Stylus

    Por eso usamos este evento
    en lugar de solamente click.
*/

document.addEventListener(
    "pointerdown",
    function (event) {

        /*
            No generamos partículas
            mientras se está tocando
            un elemento del modal.
        */

        if (
            event.target.closest(".letter-card")
        ) {

            return;

        }


        screenTouch(
            event.clientX,
            event.clientY
        );

    },
    {
        passive: true
    }
);


/* =====================================================
   GIRASOL
===================================================== */

sunflower.addEventListener(
    "click",
    function () {

        /*
            La explosión ya se genera
            automáticamente con pointerdown.

            Aquí solo abrimos la carta.
        */

        openLetter();

    }
);


/* =====================================================
   BOTÓN "TOCA EL GIRASOL"
===================================================== */

touchHint.addEventListener(
    "click",
    function () {

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


/* =====================================================
   ABRIR CARTA
===================================================== */

function openLetter() {

    letterModal.classList.add(
        "active"
    );

}


/* =====================================================
   CERRAR CARTA
===================================================== */

function closeLetter() {

    letterModal.classList.remove(
        "active"
    );

}


closeModal.addEventListener(
    "click",
    closeLetter
);


/* =====================================================
   CERRAR TOCANDO FUERA DE LA CARTA
===================================================== */

letterModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            letterModal
        ) {

            closeLetter();

        }

    }
);


/* =====================================================
   TECLADO
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        /*
            ESC = cerrar carta
        */

        if (
            event.key === "Escape"
        ) {

            closeLetter();

        }


        /*
            ESPACIO = música
        */

        if (
            event.code === "Space"
        ) {

            /*
                Evita desplazamiento
                de la página.
            */

            event.preventDefault();

            toggleMusic();

        }

    }
);


/* =====================================================
   PALABRAS FLOTANTES
===================================================== */

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


    /*
        Posición horizontal aleatoria
    */

    word.style.left =
        `${5 + Math.random() * 85}%`;


    /*
        Movimiento lateral
    */

    word.style.setProperty(
        "--move",
        `${Math.random() * 120 - 60}px`
    );


    /*
        Velocidad aleatoria
    */

    word.style.animationDuration =
        `${4.5 + Math.random() * 2.5}s`;


    wordsContainer.appendChild(
        word
    );


    /*
        Eliminar después de terminar
    */

    setTimeout(
        function () {

            word.remove();

        },
        8000
    );

}


/*
    Crear palabras periódicamente
*/

setInterval(
    createFloatingWord,
    CONFIG.wordInterval
);


/* =====================================================
   PÉTALOS QUE CAEN
===================================================== */

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


    /*
        Alternamos entre girasol
        y pequeña estrella.
    */

    petal.textContent =
        Math.random() > 0.45
            ? "🌻"
            : "✦";


    /*
        Posición horizontal
    */

    petal.style.left =
        `${Math.random() * 100}vw`;


    /*
        Tamaño
    */

    petal.style.fontSize =
        `${12 + Math.random() * 16}px`;


    /*
        Velocidad
    */

    petal.style.animationDuration =
        `${5 + Math.random() * 5}s`;


    petalsContainer.appendChild(
        petal
    );


    /*
        Limpiar elemento
    */

    setTimeout(
        function () {

            petal.remove();

        },
        11000
    );

}


/*
    Crear pétalos periódicamente
*/

setInterval(
    createFallingPetal,
    CONFIG.petalInterval
);


/* =====================================================
   EXPLOSIÓN DE PARTÍCULAS
===================================================== */

function createExplosion(x, y) {

    const emojis = [

        "✨",
        "💛",
        "🌻",
        "⭐",
        "💫",
        "✦"

    ];


    /*
        Crear varias partículas
    */

    for (
        let i = 0;
        i < CONFIG.particleCount;
        i++
    ) {

        const spark =
            document.createElement(
                "div"
            );


        spark.className =
            "spark";


        /*
            Emoji aleatorio
        */

        spark.textContent =
            emojis[
                Math.floor(
                    Math.random() *
                    emojis.length
                )
            ];


        /*
            POSICIÓN EXACTA
            DEL TOQUE
        */

        spark.style.left =
            `${x}px`;

        spark.style.top =
            `${y}px`;


        /*
            Ángulo aleatorio
        */

        const angle =
            Math.random() *
            Math.PI *
            2;


        /*
            Distancia aleatoria
        */

        const distance =
            60 +
            Math.random() *
            130;


        /*
            Movimiento horizontal
        */

        const moveX =
            Math.cos(angle) *
            distance;


        /*
            Movimiento vertical
        */

        const moveY =
            Math.sin(angle) *
            distance;


        /*
            Variables CSS
        */

        spark.style.setProperty(
            "--x",
            `${moveX}px`
        );


        spark.style.setProperty(
            "--y",
            `${moveY}px`
        );


        /*
            Tamaño aleatorio
        */

        const size =
            15 +
            Math.random() *
            15;


        spark.style.fontSize =
            `${size}px`;


        /*
            Duración aleatoria
        */

        const duration =
            0.65 +
            Math.random() *
            0.45;


        spark.style.animationDuration =
            `${duration}s`;


        /*
            Añadir a pantalla
        */

        sparksContainer.appendChild(
            spark
        );


        /*
            Eliminar
        */

        setTimeout(
            function () {

                spark.remove();

            },
            1200
        );

    }

}


/* =====================================================
   PARTÍCULAS INICIALES
===================================================== */

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


/* =====================================================
   EFECTO EXTRA:
   TOQUE LARGO EN LA PANTALLA
===================================================== */

let pressTimer = null;


document.addEventListener(
    "pointerdown",
    function (event) {

        if (
            event.target.closest(".letter-card")
        ) {

            return;

        }


        pressTimer =
            setTimeout(
                function () {

                    /*
                        Explosión más grande
                        al mantener presionado.
                    */

                    createBigExplosion(
                        event.clientX,
                        event.clientY
                    );

                },
                450
            );

    },
    {
        passive: true
    }
);


document.addEventListener(
    "pointerup",
    function () {

        clearTimeout(
            pressTimer
        );

    },
    {
        passive: true
    }
);


document.addEventListener(
    "pointercancel",
    function () {

        clearTimeout(
            pressTimer
        );

    },
    {
        passive: true
    }
);


/* =====================================================
   EXPLOSIÓN GRANDE
===================================================== */

function createBigExplosion(x, y) {

    const emojis = [
        "🌻",
        "✨",
        "💛",
        "⭐",
        "💫"
    ];


    for (
        let i = 0;
        i < 28;
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
            80 +
            Math.random() *
            180;


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


        spark.style.fontSize =
            `${15 + Math.random() * 18}px`;


        spark.style.animationDuration =
            `${.8 + Math.random() * .7}s`;


        sparksContainer.appendChild(
            spark
        );


        setTimeout(
            function () {

                spark.remove();

            },
            1600
        );

    }

}
