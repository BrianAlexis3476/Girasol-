/* =====================================================
   GIRASOL INTERACTIVO - JAVASCRIPT COMPLETO
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTOS
    ================================================= */

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


    /* =================================================
       FRASES
    ================================================= */

    const words = [
        "Te amo 💛",
        "Mi sol ☀️",
        "Mi rey 👑",
        "Eres magia ✨",
        "Te adoro 💛",
        "Siempre juntos",
        "Vida mía",
        "Mi amor 💛",
        "Felicidad ✨",
        "Te amo infinito",
        "Mi chico favorito",
        "Mi universo 🌻",
        "Contigo todo",
        "Mi persona favorita 💛"
    ];


    /* =================================================
       CREAR CONTENEDOR DE PARTÍCULAS
       POR SI NO EXISTE
    ================================================= */

    let particleLayer =
        document.getElementById("touchParticles");

    if (!particleLayer) {

        particleLayer =
            document.createElement("div");

        particleLayer.id =
            "touchParticles";

        particleLayer.style.position =
            "fixed";

        particleLayer.style.inset =
            "0";

        particleLayer.style.width =
            "100%";

        particleLayer.style.height =
            "100%";

        particleLayer.style.pointerEvents =
            "none";

        particleLayer.style.zIndex =
            "99999";

        document.body.appendChild(
            particleLayer
        );
    }


    /* =================================================
       EXPLOSIÓN DE PARTÍCULAS
    ================================================= */

    function createExplosion(x, y) {

        const emojis = [
            "✨",
            "💛",
            "🌻",
            "⭐",
            "💫",
            "✦"
        ];


        /* Número de partículas */

        const amount = 18;


        for (
            let i = 0;
            i < amount;
            i++
        ) {

            const particle =
                document.createElement("div");


            /* Emoji */

            particle.innerHTML =
                emojis[
                    Math.floor(
                        Math.random() *
                        emojis.length
                    )
                ];


            /* =====================================
               ESTILOS DIRECTAMENTE DESDE JS
            ===================================== */

            particle.style.position =
                "fixed";

            particle.style.left =
                x + "px";

            particle.style.top =
                y + "px";

            particle.style.transform =
                "translate(-50%, -50%)";

            particle.style.fontSize =
                (16 + Math.random() * 16) +
                "px";

            particle.style.lineHeight =
                "1";

            particle.style.pointerEvents =
                "none";

            particle.style.zIndex =
                "999999";

            particle.style.opacity =
                "1";

            particle.style.filter =
                "drop-shadow(0 0 8px rgba(255,210,50,.9))";

            particle.style.transition =
                "transform 900ms cubic-bezier(.15,.8,.25,1), opacity 900ms ease";


            /* =====================================
               DIRECCIÓN ALEATORIA
            ===================================== */

            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                70 +
                Math.random() *
                160;


            const moveX =
                Math.cos(angle) *
                distance;


            const moveY =
                Math.sin(angle) *
                distance;


            /* Añadir al DOM */

            particleLayer.appendChild(
                particle
            );


            /* =====================================
               ANIMACIÓN
            ===================================== */

            requestAnimationFrame(() => {

                particle.style.transform =
                    `translate(
                        calc(-50% + ${moveX}px),
                        calc(-50% + ${moveY}px)
                    )
                    scale(1.3)
                    rotate(${Math.random() * 360}deg)`;

                particle.style.opacity =
                    "0";

            });


            /* Eliminar */

            setTimeout(() => {

                particle.remove();

            }, 1000);

        }
    }


    /* =================================================
       PARTÍCULAS PEQUEÑAS EXTRA
       ALREDEDOR DEL TOQUE
    ================================================= */

    function createSmallSparks(x, y) {

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            const spark =
                document.createElement("div");


            spark.innerHTML =
                "✦";


            spark.style.position =
                "fixed";

            spark.style.left =
                x + "px";

            spark.style.top =
                y + "px";

            spark.style.zIndex =
                "999999";

            spark.style.pointerEvents =
                "none";

            spark.style.color =
                "#ffd83d";

            spark.style.fontSize =
                (8 + Math.random() * 10) +
                "px";

            spark.style.textShadow =
                "0 0 10px #ffd83d";

            spark.style.transform =
                "translate(-50%, -50%)";

            spark.style.transition =
                "all .7s ease-out";


            particleLayer.appendChild(
                spark
            );


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                30 +
                Math.random() *
                90;


            const moveX =
                Math.cos(angle) *
                distance;


            const moveY =
                Math.sin(angle) *
                distance;


            requestAnimationFrame(() => {

                spark.style.transform =
                    `translate(
                        ${moveX}px,
                        ${moveY}px
                    )
                    scale(0)`;

                spark.style.opacity =
                    "0";

            });


            setTimeout(() => {

                spark.remove();

            }, 800);

        }
    }


    /* =================================================
       TOQUE EN CUALQUIER PARTE
    ================================================= */

    let lastTouch = 0;


    function handleTouch(x, y) {

        const now =
            Date.now();


        /*
           Evitar doble evento
        */

        if (
            now - lastTouch < 50
        ) {

            return;

        }


        lastTouch = now;


        /* EXPLOSIÓN */

        createExplosion(
            x,
            y
        );


        /* CHISPAS */

        createSmallSparks(
            x,
            y
        );

    }


    /* =================================================
       POINTERDOWN
    ================================================= */

    document.addEventListener(
        "pointerdown",
        (event) => {

            /*
                Ignorar solamente los controles
                internos de la carta.
            */

            if (
                event.target.closest(
                    ".letter-card"
                )
            ) {

                return;

            }


            handleTouch(
                event.clientX,
                event.clientY
            );

        },
        {
            passive: true
        }
    );


    /* =================================================
       TOUCHSTART - COMPATIBILIDAD CELULAR
    ================================================= */

    document.addEventListener(
        "touchstart",
        (event) => {

            if (!event.touches.length) {
                return;
            }


            const touch =
                event.touches[0];


            handleTouch(
                touch.clientX,
                touch.clientY
            );

        },
        {
            passive: true
        }
    );


    /* =================================================
       CLICK - COMPATIBILIDAD PC
    ================================================= */

    document.addEventListener(
        "click",
        (event) => {

            /*
                Solo usamos click si no fue
                producido inmediatamente por touch.
            */

            const now =
                Date.now();


            if (
                now - lastTouch < 500
            ) {

                return;

            }


            /*
                No crear partículas encima
                de la carta.
            */

            if (
                event.target.closest(
                    ".letter-card"
                )
            ) {

                return;

            }


            handleTouch(
                event.clientX,
                event.clientY
            );

        }
    );


    /* =================================================
       BOTÓN INICIAL
    ================================================= */

    if (startButton) {

        startButton.addEventListener(
            "click",
            async (event) => {

                event.stopPropagation();


                if (welcomeScreen) {

                    welcomeScreen.classList.add(
                        "hide"
                    );

                }


                /*
                    Explosión central
                */

                createExplosion(
                    window.innerWidth / 2,
                    window.innerHeight / 2
                );


                /*
                    Intentar reproducir música
                */

                if (music) {

                    try {

                        await music.play();

                        if (musicButton) {

                            musicButton.textContent =
                                "🔊";

                        }

                    } catch (error) {

                        console.log(
                            "La música necesita interacción:",
                            error
                        );

                    }

                }

            }
        );

    }


    /* =================================================
       MÚSICA
    ================================================= */

    if (musicButton) {

        musicButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                toggleMusic();

            }
        );

    }


    async function toggleMusic() {

        if (!music) {
            return;
        }


        if (music.paused) {

            try {

                await music.play();

                if (musicButton) {

                    musicButton.textContent =
                        "🔊";

                }

            } catch (error) {

                console.log(
                    "No se pudo reproducir:",
                    error
                );

            }

        } else {

            music.pause();

            if (musicButton) {

                musicButton.textContent =
                    "🔇";

            }

        }

    }


    /* =================================================
       GIRASOL
    ================================================= */

    if (sunflower) {

        sunflower.addEventListener(
            "click",
            (event) => {

                /*
                    Crear una explosión extra
                    en el centro del girasol.
                */

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

    }


    /* =================================================
       BOTÓN TOCAR GIRASOL
    ================================================= */

    if (touchHint) {

        touchHint.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                if (sunflower) {

                    const rect =
                        sunflower.getBoundingClientRect();


                    createExplosion(
                        rect.left +
                        rect.width / 2,

                        rect.top +
                        rect.height / 2
                    );

                }


                openLetter();

            }
        );

    }


    /* =================================================
       CARTA
    ================================================= */

    function openLetter() {

        if (!letterModal) {
            return;
        }


        letterModal.classList.add(
            "active"
        );

    }


    function closeLetter() {

        if (!letterModal) {
            return;
        }


        letterModal.classList.remove(
            "active"
        );

    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                closeLetter();

            }
        );

    }


    if (letterModal) {

        letterModal.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    letterModal
                ) {

                    closeLetter();

                }

            }
        );

    }


    /* =================================================
       ESC
    ================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

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


    /* =================================================
       PALABRAS FLOTANTES
    ================================================= */

    function createFloatingWord() {

        if (!wordsContainer) {
            return;
        }


        const existing =
            document.querySelectorAll(
                ".floating-word"
            );


        if (
            existing.length >= 5
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
            (5 + Math.random() * 85) +
            "%";


        word.style.setProperty(
            "--move",
            (
                Math.random() *
                120 -
                60
            ) +
            "px"
        );


        word.style.animationDuration =
            (
                4.5 +
                Math.random() * 2
            ) +
            "s";


        wordsContainer.appendChild(
            word
        );


        setTimeout(() => {

            word.remove();

        }, 8000);

    }


    setInterval(
        createFloatingWord,
        1800
    );


    /* =================================================
       PÉTALOS QUE CAEN
    ================================================= */

    function createFallingPetal() {

        if (!petalsContainer) {
            return;
        }


        const existing =
            document.querySelectorAll(
                ".falling-petal"
            );


        if (
            existing.length >= 16
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


        petal.style.position =
            "fixed";

        petal.style.top =
            "-40px";

        petal.style.left =
            Math.random() * 100 +
            "vw";

        petal.style.zIndex =
            "2";

        petal.style.pointerEvents =
            "none";

        petal.style.fontSize =
            (
                12 +
                Math.random() * 16
            ) +
            "px";

        petal.style.animation =
            "falling " +
            (
                5 +
                Math.random() * 5
            ) +
            "s linear forwards";


        petalsContainer.appendChild(
            petal
        );


        setTimeout(() => {

            petal.remove();

        }, 11000);

    }


    setInterval(
        createFallingPetal,
        600
    );


    /* =================================================
       EFECTO INICIAL
    ================================================= */

    setTimeout(
        createFloatingWord,
        1000
    );


    setTimeout(
        createFloatingWord,
        1800
    );


    setTimeout(
        createFallingPetal,
        500
    );


    setTimeout(
        createFallingPetal,
        1000
    );


    setTimeout(
        createFallingPetal,
        1500
    );


    console.log(
        "🌻 Girasol cargado correctamente."
    );

});

}
