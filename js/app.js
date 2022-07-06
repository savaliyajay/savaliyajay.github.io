const header = document.querySelector("header");

const first_Skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");
const progress_bars = document.querySelectorAll(".skills svg circle")

const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");

const links = document.querySelectorAll(".nav-link");

const toggle_btn = document.querySelector(".toggle-btn");

window.addEventListener("scroll", () => {
    activelink();
    if (!skillsPlayed) skillsCounter();
    if (!mlPlayed) mlcounters();
});

function updateCount(num, maxNum) {
    let currentNum = +num.innerText;

    if (currentNum < maxNum) {
        num.innerText = currentNum + 1;
        setTimeout(() => {
            updateCount(num, maxNum);
        }, 12);
    }
}

/* --------------- Grab elements from DOM --------------- */

/* --------------- Sticky Navbar --------------- */

function stickyNavbar() {
    // console.log(window.pageYOffset > 0);
    header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar()


window.addEventListener("scroll", stickyNavbar);

/* --------------- Reveal Animation --------------- */

let sr = ScrollReveal({
    duration: 2500,
    distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });

/* --------------- Skills Progress Bar Animation --------------- */

function hasReached(el) {

    // console.log(el);


    let topPosition = el.getBoundingClientRect().top;
    // console.log(topPosition);
    if (window.innerHeight >= topPosition + el.offsetHeight) return true;
    return false;
}

let skillsPlayed = false;

function skillsCounter() {
    if (!hasReached(first_Skill)) return;
    // console.log("You've reched the skills section");

    skillsPlayed = true;

    sk_counters.forEach((counter, i) => {
        let target = +counter.dataset.target;
        let strokeValue = 427 - 427 * (target / 100);

        progress_bars[i].style.setProperty("--target", strokeValue);

        setTimeout(() => {
            updateCount(counter, target);
        }, 400);
    });

    progress_bars.forEach(
        (p) => (p.style.animation = "progress 2s ease-in-out forwards")
    );
}

/* --------------- Services Counter Animation --------------- */

let mlPlayed = false;

function mlcounters() {
    if (!hasReached(ml_section)) return;
    mlPlayed = true;
    // console.log(ml_section);

    ml_counters.forEach((ctr) => {
        let target = +ctr.dataset.target;
        // console.log(target);
        setTimeout(() => {
            updateCount(ctr, target);
        }, 400);
    });
}


/* --------------- Portfolio Filter Animation --------------- */

let mixer = mixitup(".portfolio-gallery", {
    selectors: {
        target: '.prt-card',
    },
    animation: {
        duration: 500,
    },
});


/* --------------- Modal Pop Up Animation Animation --------------- */

let currentIndex = 0;

zoom_icons.forEach((icn, i) =>
    icn.addEventListener("click", () => {
        // console.log(icn);
        prt_section.classList.add("open");
        document.body.classList.add("stopScrolling");
        currentIndex = i;
        chageImage(currentIndex);
    })
);

modal_overlay.addEventListener("click", () => {
    prt_section.classList.remove("open");
    document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
    if (currentIndex === 0) {
        currentIndex = 5;
    } else {
        currentIndex--;
    }
    chageImage(currentIndex);
});

next_btn.addEventListener("click", () => {
    if (currentIndex === 5) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
    chageImage(currentIndex);
});

function chageImage(index) {
    images.forEach(img => img.classList.remove("showImage"));
    images[index].classList.add("showImage");
}

/* --------------- Modal Pop Up Animation Animation --------------- */

const swiper = new Swiper('.swiper', {
    loop: true,
    speed: 500,
    autoplay: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});


/* --------------- Change Active Link On Scroll --------------- */

function activelink() {
    // console.log("link");
    let sections = document.querySelectorAll("section[id]");
    // console.log(Array.from(sections));
    let passedSections = Array.from(sections)
        .map((sct, i) => {
            return {
                y: sct.getBoundingClientRect().top - header.offsetHeight,
                id: i
            };
        })
        .filter((sct) => sct.y <= 0);
    // console.log(currSectionID);
    let currSectionID = passedSections.at(-1).id;
    // console.log(currSectionID);
    links.forEach(l => l.classList.remove("active"));
    links[currSectionID].classList.add("active");
}

activelink();

/* --------------- Change Page Theme --------------- */

let firstTheme = localStorage.getItem("dark");

chageTheme(+firstTheme);

function chageTheme(isDark) {
    if (isDark) {
        document.body.classList.add("dark");
        toggle_btn.classList.replace("uil-moon", "uil-sun");
        localStorage.setItem("dark", 1);
    } else {
        document.body.classList.remove("dark");
        toggle_btn.classList.replace("uil-sun", "uil-moon");
        localStorage.setItem("dark", 0);
    }
};

toggle_btn.addEventListener("click", () => {
    chageTheme(!document.body.classList.contains("dark"));
});

/* --------------- Open & Close Navbar Menu --------------- */

