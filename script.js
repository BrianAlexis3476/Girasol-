document.addEventListener("DOMContentLoaded", function () {

    /* =====================================
       ELEMENTOS
    ===================================== */

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

    const sparksContainer =
        document.getElementById("sparksContainer");

    const petalsContainer =
        document.getElementById("petalsContainer");

    const wordsContainer =
        document.getElementById("wordsContainer");

    const stars =
        document.getElementById("stars");


    /* =====================================
       VARIABLES
    ===================================== */

    let musicPlaying = false;

    let lastExplosion = 0;


    /* =====================================
       ESTRELLAS
    ===================================== */

    function createStars() {

        if (!stars) return;

        const amount =
            window.innerWidth < 500 ? 35 : 60;

        for (let i = 0; i < amount; i++) {

            const star =
                document.createElement("span");

            star.className = "star";

            star.style.left =
                Math.random() * 100 + "%";

            star.style.top =
                Math.random() * 100 + "%";

            star.style.animationDelay =
                Math.random() * 3 + "s";

            stars.appendChild(star);
        }
    }


    /* =====================================
       MÚSICA
    ===================================== */

    async function playMusic() {

        if (!music) return;

        try {

            await music.play();

            musicPlaying = true;

            if (musicButton) {
                musicButton.textContent = "🔊";
                musicButton.classList.add("playing");
            }

        } catch (error) {

            console.log(
                "La música necesita interacción del usuario."
            );

        }
    }


    function stopMusic() {

        if (!music) return;

        music.pause();

        musicPlaying = false;

        if (musicButton) {

            musicButton.textContent = "🎵";

            musicButton.classList.remove("playing");
        }
    }


    function toggleMusic() {

        if (musicPlaying) {
            stopMusic();
        } else {
            playMusic();
        }
    }


    /* =====================================
       BOTÓN DE INICIO
    ===================================== */

    if (startButton) {

        startButton.addEventListener(
            "click",
            function () {

                if (welcomeScreen) {
                    welcomeScreen.classList.add("hidden");
                }

                playMusic();

                createWord();

                createPetal();
            }
        );
    }


    /* =====================================
       BOTÓN DE MÚSICA
    ===================================== */

    if (musicButton) {

        musicButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                toggleMusic();
            }
        );
    }


    /* =====================================
       EXPLOSIÓN DE PARTÍCULAS
    ===================================== */

    function createExplosion(x, y) {

        if (!sparksContainer) return;


        /*
           Evita demasiadas explosiones
           al mismo tiempo.
        */

        const now = Date.now();

        if (now - lastExplosion < 100) {
            return;
        }

        lastExplosion = now;


        const emojis = [
            "✨",
            "💛",
            "🌻",
            "⭐",
            "✦"
        ];


        /*
           Solo 14 partículas.
           Esto evita cargar demasiado
           el teléfono.
        */

        for (let i = 0; i < 14; i++) {

            const particle =
                document.createElement("div");

            particle.textContent =
                emojis[
                    Math.floor(
                        Math.random() *
                        emojis.length
                    )
                ];


            particle.style.position = "fixed";

            particle.style.left =
                x + "px";

            particle.style.top =
                y + "px";

            particle.style.fontSize =
                (12 + Math.random() * 12) + "px";

            particle.style.pointerEvents =
                "none";

            particle.style.zIndex =
                "9999";

            particle.style.transition =
                "transform 700ms ease-out, opacity 700ms ease-out";

            particle.style.opacity = "1";


            sparksContainer.appendChild(
                particle
            );


            const angle =
                Math.random() *
                Math.PI *
                2;

            const distance =
                50 +
                Math.random() * 90;

            const dx =
                Math.cos(angle) *
                distance;

            const dy =
                Math.sin(angle) *
                distance;


            /*
               Esperamos un instante para
               que el navegador registre
               la posición inicial.
            */

            requestAnimationFrame(function () {

                particle.style.transform =
                    "translate(" +
                    dx +
                    "px, " +
                    dy +
                    "px) scale(0.3)";

                particle.style.opacity = "0";
            });


            setTimeout(function () {

                particle.remove();

            }, 750);
        }
    }


    /* =====================================
       TOQUE EN PANTALLA
    ===================================== */

    function handleTouch(event) {

        /*
           No crear partículas si se está
           tocando el botón de música.
        */

        if (
            event.target === musicButton ||
            musicButton?.contains(event.target)
        ) {
            return;
        }


        let x;
        let y;


        if (
            event.touches &&
            event.touches.length > 0
        ) {

            x = event.touches[0].clientX;
            y = event.touches[0].clientY;

        } else {

            x = event.clientX;
            y = event.clientY;
        }


        createExplosion(x, y);
    }


    /*
       pointerdown funciona en:
       - celular
       - tablet
       - computadora
    */

    document.addEventListener(
        "pointerdown",
        handleTouch,
        {
            passive: true
        }
    );


    /* =====================================
       GIRASOL
    ===================================== */

    function touchSunflower(event) {

        if (!sunflower) return;


        const rect =
            sunflower.getBoundingClientRect();


        const x =
            rect.left +
            rect.width / 2;


        const y =
            rect.top +
            rect.height / 2;


        /*
           Crear una explosión adicional
           en el centro del girasol.
        */

        createExplosion(x, y);

        createExplosion(
            x + 20,
            y - 15
        );


        /*
           Abrir carta
           después del toque.
        */

        setTimeout(
            openLetter,
            250
        );


        /*
           Intentar iniciar música.
        */

        if (!musicPlaying) {
            playMusic();
        }
    }


    if (sunflower) {

        sunflower.addEventListener(
            "click",
            touchSunflower
        );
    }


    if (touchHint) {

        touchHint.addEventListener(
            "click",
            function () {

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


    /* =====================================
       CARTA
    ===================================== */

    function openLetter() {

        if (!letterModal) return;

        letterModal.classList.add("show");
    }


    function closeLetter() {

        if (!letterModal) return;

        letterModal.classList.remove("show");
    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                closeLetter();
            }
        );
    }


    /*
       Si toca fuera de la carta,
       también se cierra.
    */

    if (letterModal) {

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
    }


    /* =====================================
       PÉTALOS
    ===================================== */

    function createPetal() {

        if (!petalsContainer) return;


        const petal =
            document.createElement("div");

        petal.className =
            "falling-petal";

        petal.textContent = "🌻";


        petal.style.left =
            Math.random() * 100 + "%";


        petal.style.fontSize =
            (10 + Math.random() * 12) + "px";


        petal.style.setProperty(
            "--drift",
            (
                -80 +
                Math.random() * 160
            ) + "px"
        );


        const duration =
            6 +
            Math.random() * 6;


        petal.style.animationDuration =
            duration + "s";


        petalsContainer.appendChild(
            petal
        );


        setTimeout(
            function () {

                petal.remove();

            },
            (duration + 1) * 1000
        );
    }


    /*
       Solo unos pocos pétalos
       para mantener el teléfono
       fluido.
    */

    setInterval(
        function () {

            createPetal();

        },
        1300
    );


    /* =====================================
       PALABRAS FLOTANTES
    ===================================== */

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
        "Mi universo",
        "Contigo todo"
    ];


    function createWord() {

        if (!wordsContainer) return;


        const word =
            document.createElement("div");

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
            (5 +
            Math.random() * 80) +
            "%";


        word.style.top =
            (20 +
            Math.random() * 60) +
            "%";


        word.style.animationDuration =
            (5 +
            Math.random() * 4) +
            "s";


        wordsContainer.appendChild(
            word
        );


        setTimeout(
            function () {

                word.remove();

            },
            9000
        );
    }


    /*
       Una palabra cada 3 segundos.
    */

    setInterval(
        createWord,
        3000
    );


    /* =====================================
       CREAR ESTRELLAS
    ===================================== */

    createStars();


    /* =====================================
       PÉTALOS INICIALES
    ===================================== */

    for (let i = 0; i < 4; i++) {

        setTimeout(
            createPetal,
            i * 700
        );
    }


    /* =====================================
       PALABRAS INICIALES
    ===================================== */

    setTimeout(
        createWord,
        1500
    );


    /* =====================================
       EVITAR ZOOM ACCIDENTAL EN IOS
    ===================================== */

    document.addEventListener(
        "gesturestart",
        function (event) {
            event.preventDefault();
        }
    );


    /* =====================================
       MENSAJE EN CONSOLA
    ===================================== */

    console.log(
        "🌻 Página cargada correctamente."
    );

});
