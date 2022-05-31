(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const menuBurger = document.querySelector(".burger__icon");
    const menuBody = document.querySelector(".burger__body");
    const burger = document.querySelector(".burger");
    if (menuBurger) menuBurger.addEventListener("click", (function(e) {
        menuBurger.classList.toggle("_active-burger-icon");
        if (menuBody) menuBody.classList.toggle("_active-burger-body");
        if (burger) burger.classList.toggle("_active-burger");
    }));
    window.onload = function() {
        const parallax = document.querySelector(".parallax");
        if (parallax) {
            const content = document.querySelector(".parallax__objects");
            const clouds = document.querySelector(".parallax__object-one");
            const mountains = document.querySelector(".parallax__blot-two");
            const human = document.querySelector(".parallax__blot-one");
            const forClouds = 40;
            const forMountains = 20;
            const forHuman = 10;
            const speed = .05;
            let positionX = 0, positionY = 0;
            let coordXprocent = 0, coordYprocent = 0;
            function setMouseParallaxStyle() {
                const distX = coordXprocent - positionX;
                const distY = coordYprocent - positionY;
                positionX += distX * speed;
                positionY += distY * speed;
                clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`;
                mountains.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`;
                human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`;
                requestAnimationFrame(setMouseParallaxStyle);
            }
            setMouseParallaxStyle();
            parallax.addEventListener("mousemove", (function(e) {
                const parallaxWidth = parallax.offsetWidth;
                const parallaxHeight = parallax.offsetHeight;
                const coordX = e.pageX - parallaxWidth / 2;
                const coordY = e.pageY - parallaxHeight / 2;
                coordXprocent = coordX / parallaxWidth * 100;
                coordYprocent = coordY / parallaxHeight * 100;
            }));
            let thresholdSets = [];
            for (let i = 0; i <= 1; i += .005) thresholdSets.push(i);
            const callback = function(entries, observer) {
                const scrollTopProcent = window.pageYOffset / parallax.offsetHeight * 100;
                setParallaxItemsStyle(scrollTopProcent);
            };
            const observer = new IntersectionObserver(callback, {
                threshold: thresholdSets
            });
            observer.observe(document.querySelector(".content"));
            function setParallaxItemsStyle(scrollTopProcent) {
                content.style.cssText = `transform: translate(0%,-${scrollTopProcent / 9}%);`;
                mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`;
                human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`;
            }
        }
    };
    window["FLS"] = true;
    isWebp();
})();