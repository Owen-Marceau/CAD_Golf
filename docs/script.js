let menuOpen = false;
let playerDropActive = false;

let url = ""; // https://cad-golf-474x.onrender.com
let todayBox;
let currentEvent;
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const days = [
  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"
];
const now = new Date();
const todayDate = now.getDate();
const startPosition = now.getMonth();
let currentMonth = now.getMonth();
const startYear = now.getFullYear().toString();
let currentYear = now.getFullYear().toString();

function createHtml(){
    let menu = document.createElement("div");
    menu.classList.add("menu-container");
    menu.innerHTML = `
        <a href="index.html"><div class="menu-section menu-dark">Home</div></a>
        <a href="about.html"><div class="menu-section menu-dark">About Me</div></a>
        <a href="lessons-and-fittings.html"><div class="menu-section">Golf Lessons</div></a>
        <a href="index.html#events"><div class="menu-section menu-dark">View Events</div></a>
        <a href="gallery.html"><div class="menu-section">Gallery</div></a>
    `

    let header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = `
        <div class="header-flex">
            <a href="index.html">
                <img src="images/logo.png" class="header-logo" />
            </a>

            <div class="header-nav">
                <a href="index.html" class="header-link">Home</a>
                <a href="about.html" class="header-link">About Me</a>
                <a href="lessons-and-fittings.html" class="header-link">Golf Lessons</a>
                <a href="index.html#events" class="header-link">View events</a>
                <a href="gallery.html" class="header-link">Gallery</a>
            </div>

            <a href="https://cadgolfperformance.setmore.com?utm_source=qr-code&utm_medium=more-share-bp" class="btn-header">Book Lesson</a>
            <div class="header-burger" onclick="toggleMenu()">
                <div class="burger-line line1"></div>
                <div class="burger-line line2"></div>
                <div class="burger-line line3"></div>
            </div>
        </div>
    `

    let footer = document.createElement("div");
    footer.classList.add("foot-container");
    footer.innerHTML = `
        <div class="foot-wrapper">
            <div class="foot-flex">
                <div class="foot-content">
                    <div class="foot-logo-container">
                        <img src="images/logo.png" class="foot-logo" />
                        <div class="foot-name">CAD Golf</div>
                    </div>
                    <div class="foot-para">CAD Golf helps you book tailored golf events with ease. Trusted pros, stunning courses, and stress-free planning. Start today.</div>
                    <div class="foot-social">
                        <a href="https://www.instagram.com/cadgolf90" target="_blank">
                        <i class="fa-brands fa-instagram foot-social-icon"></i>
                        </a>
                        <a href="https://www.facebook.com/coltonio/" target="_blank">
                            <i class="fa-brands fa-facebook-f foot-social-icon"></i>
                        </a>
                        <a href="mailto:colton@cadgolfperformance.com" target="_blank">
                            <i class="fa-solid fa-envelope foot-social-icon"></i>
                        </a>
                        <a href="tel:+4401323410981" target="_blank">
                            <i class="fa-solid fa-phone foot-social-icon"></i>
                        </a>
                    </div>
                </div>
                <div class="foot-nav">
                    <div class="foot-ul">
                        <div class="foot-label">Navigation</div>
                        <a href="about-us.html" class="foot-link">About Me</a>
                        <a href="about.html" class="foot-link">Gallery</a>
                        <a href="index.html#events" class="foot-link">Book event</a>
                        <a href="index.html#contact" class="foot-link">Contact Me</a>
                    </div>
                    <div class="foot-ul">
                        <div class="foot-label">Get in Touch</div>
                        <a href="https://www.instagram.com/cadgolf90" target="_blank" class="foot-link">Instagram</a>
                        <a href="https://www.facebook.com/coltonio/" target="_blank" class="foot-link">Facebook</a>
                        <a href="mailto:colton@cadgolfperformance.com" target="_blank" class="foot-link">Email me</a>
                        <a href="tel:+4401323410981" target="_blank" class="foot-link">Call me</a>
                    </div>
                    <div class="foot-ul">
                        <div class="foot-label">Our Location</div>
                        <div class="foot-link">Tilgate Forest Golf Centre</div>
                        <div class="foot-link">Titmus Drive</div>
                        <div class="foot-link">Crawley</div>
                        <div class="foot-link">RH10 5EU</div>
                    </div>
                </div>
            </div>
            <div class="foot-bottom">
                <div class="foot-copy">© 2025 CAD Golf — Website by <a href="https://nextdesignwebsite.com" target="_blank" class="foot-copy" style="text-decoration: underline;">Next Design</a>.</div>
            </div>
        </div>
    `

    document.body.prepend(header);
    document.body.prepend(menu);
    document.body.appendChild(footer);
    
    if(document.querySelector(".home")){
        document.querySelectorAll(".header-link")[0].classList.add("header-link-active");
    } else if(document.querySelector(".about")){
        document.querySelectorAll(".header-link")[1].classList.add("header-link-active");
    } else if(document.querySelector(".gallery")){
        document.querySelectorAll(".header-link")[4].classList.add("header-link-active");
    } else if(document.querySelector(".lessons")){
        document.querySelectorAll(".header-link")[2].classList.add("header-link-active");
    }
}
createHtml();

function toggleMenu(){
    if(!menuOpen){
        document.querySelector(".line1").style.top = "11px";
        document.querySelector(".line1").style.transform = "rotate(45deg)";
        document.querySelector(".line2").style.opacity = "0";
        document.querySelector(".line3").style.top = "-11px";
        document.querySelector(".line3").style.transform = "rotate(-45deg)";

        document.querySelector(".menu-container").style.top = "92px";
        menuOpen = true;
    } else {
        document.querySelector(".line1").style.top = "0px";
        document.querySelector(".line1").style.transform = "rotate(0deg)";
        document.querySelector(".line2").style.opacity = "1";
        document.querySelector(".line3").style.top = "0px";
        document.querySelector(".line3").style.transform = "rotate(0deg)";

        document.querySelector(".menu-container").style.top = "-270px";
        menuOpen = false;
    }
}

document.querySelectorAll(".contact-input, .contact-area").forEach((el, idx) => {
    el.addEventListener("focus", () => {
        document.querySelectorAll(".contact-input-container, .contact-area-container")[idx].classList.add("contact-active");
    });
    el.addEventListener("blur", () => {
        document.querySelectorAll(".contact-input-container, .contact-area-container")[idx].classList.remove("contact-active");
    });
});

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
          entry.target.style.position = "relative";
          entry.target.style.top = "0px";
          entry.target.style.opacity = "1";

          if(entry.target.classList.contains("serv-wrapper")){
            entry.target.querySelector(".serv-wrapper-bg").style.width = "15%";
          }

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
});
document.querySelectorAll(".scroll-target").forEach(target => {
    observer.observe(target);
});

function openInfoModal(){
    document.querySelector(".info-modal").style.opacity = "1";
    document.querySelector(".info-modal").style.pointerEvents = "auto";
}
function closeInfoModal(){
    document.querySelector(".info-modal").style.opacity = "0";
    document.querySelector(".info-modal").style.pointerEvents = "none";
}
function openRegModal(){
    document.querySelector(".reg-modal").style.opacity = "1";
    document.querySelector(".reg-modal").style.pointerEvents = "auto";
}
function closeRegModal(){
    document.querySelector(".reg-modal").style.opacity = "0";
    document.querySelector(".reg-modal").style.pointerEvents = "none";
}

function playerDropdown(){
    if(!playerDropActive){
        document.querySelector(".reg-chev").style.transform = "rotate(-180deg)";
        document.querySelector(".reg-dropdown").style.opacity = "1";
        document.querySelector(".reg-dropdown").style.pointerEvents = "auto";
        playerDropActive = true;
    } else {
        document.querySelector(".reg-chev").style.transform = "rotate(0deg)";
        document.querySelector(".reg-dropdown").style.opacity = "0";
        document.querySelector(".reg-dropdown").style.pointerEvents = "none";
        playerDropActive = false;
    }

    document.querySelector(".reg-dropdown").addEventListener("click", (e) => {
        e.stopPropagation();
    });

    document.addEventListener("click", (e) => {
        if(!document.querySelector(".reg-selector").contains(e.target) && document.querySelector(".reg-chev").style.transform == "rotate(-180deg)"){
            document.querySelector(".reg-chev").style.transform = "rotate(0deg)";
            document.querySelector(".reg-dropdown").style.opacity = "0";
            document.querySelector(".reg-dropdown").style.pointerEvents = "none";
            playerDropActive = false;
        }
    });
}
document.querySelectorAll(".reg-option").forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".reg-selector-txt").textContent = option.textContent;
        document.getElementById("players").value = option.dataset.set;
    });
});

if(document.querySelector("form")){
    document.querySelectorAll("form").forEach(form => {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();
    
            const form = e.target;
            const formData = new FormData(form);
    
            const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
            });
    
            const result = await response.json();
    
            if (result.success) {
                document.querySelector(".book-modal").style.opacity = "1";
                document.querySelector(".book-modal").style.pointerEvents = "auto";
            }
    
            form.reset(); // Optional: reset form fields
        });
    });
}

if(document.querySelector(".info-form")){
    document.querySelector(".info-form").addEventListener("submit", async (e) => {
        e.preventDefault(); // stop page reload
    
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
    
        try {
            const res = await fetch(url + "/api/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
    
            const result = await res.json();
            if(result.message == "Success"){
                closeRegModal();
                setTimeout(() => {
                    document.querySelector(".book-modal-form").style.opacity = "1";
                    document.querySelector(".book-modal-form").style.pointerEvents = "auto";
                }, 200);
            } else if(result.message == "Limit Exceeded"){
                document.querySelector(".reg-error").style.display = "block";
                setTimeout(() => {
                    document.querySelector(".reg-error").style.display = "none";
                }, 2000);
            }
    
        } catch (err) {
            console.error("Error submitting form:", err);
        }
    });
}

document.querySelectorAll(".plan-pill").forEach((pill, idx) => {
    pill.addEventListener("click", () => {
        document.querySelectorAll(".plan-pill").forEach(other => {
            other.classList.remove("plan-pill-active");
        });
        pill.classList.add("plan-pill-active");

        document.querySelectorAll(".plan-flex").forEach(other => {
            other.classList.remove("plan-flex-active");
            setTimeout(() => {
                other.style.display = "none";
            }, 400);
        });
        setTimeout(() => {
            document.querySelectorAll(".plan-flex")[idx].style.display = "flex";
            setTimeout(() => {
                document.querySelectorAll(".plan-flex")[idx].classList.add("plan-flex-active");
            }, 100);
        }, 400);
    });
});

document.querySelectorAll(".smodal-getter").forEach((getter, idx) => {
    getter.addEventListener("click", (e) => {
        document.querySelectorAll(".smodal-modal")[idx].style.opacity = "1";
        document.querySelectorAll(".smodal-modal")[idx].style.pointerEvents = "auto";
    });
});
document.querySelectorAll(".smodal-modal").forEach(modal => {
    modal.addEventListener("click", (e) => {
        if(!document.querySelector(".smodal-wrapper").contains(e.target) || document.querySelector("i.smodal-x").contains(e.target)){
            modal.style.opacity = "0";
            modal.style.pointerEvents = "none";
        }
    });
});

document.querySelectorAll(".para-long-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        if(document.querySelector(".para-long").style.maxHeight == "600px"){
            document.querySelectorAll(".para-long-btn").forEach(all => {
                all.textContent = "Read More";
            });
            document.querySelectorAll(".para-long").forEach(para => {
                para.style.maxHeight = "100px"; 
            });
        } else {
            document.querySelectorAll(".para-long-btn").forEach(all => {
                all.textContent = "Read Less";
            });
            document.querySelectorAll(".para-long").forEach(para => {
                para.style.maxHeight = "600px"; 
            });
        }
    });
});



function setCalendar(monthIdx, yearStr, firstCall){
    document.querySelector(".cal-nav-title").textContent = months[monthIdx] + " " + yearStr;
    document.querySelector(".lac-nav-title").textContent = months[monthIdx] + " " + yearStr;

    let startIdx = firstDay(monthIdx, yearStr);
    let endIdx = totalDays(monthIdx, yearStr);

    let bookings = [];
    async function getBookings(){
        const dataToSend = { month: monthIdx + 1, year: yearStr };
        try {
            const response = await fetch(url + '/api/get-events', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(dataToSend), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData.message);
                return;
            }

            const responseData = await response.json();
            bookings = responseData.bookings;

            resetBoxes();
            document.querySelectorAll(".cal-box").forEach((box, idx) => {
                if(idx >= startIdx && idx < (endIdx + startIdx)){
                    box.querySelector(".cal-box-day").textContent = String(idx - (startIdx - 1));
                    let boxDay = Number(String(idx - (startIdx - 1)));

                    if(monthIdx == startPosition && boxDay == todayDate && startYear == currentYear){
                        console.log(currentYear)
                        makeBoxToday(box);
                        if(firstCall){
                            todayBox = box;
                        }
                    }

                    bookings.forEach(booking => {
                        if(Number(booking.event_date.slice(8, 10)) == boxDay){
                            box.classList.add("cal-box-event");
                            let taken = "";
                            if(booking.max_slots == booking.current_slots){
                                taken = " (no spots left)";
                            }
                            if(taken == ""){
                                box.innerHTML += `
                                <div class="cal-event-head">${booking.title}</div>
                                <div class="cal-event-cta">BOOK NOW</div>
                                `;
                                box.querySelector(".cal-event-cta").addEventListener("click", () => {
                                    if(booking.team_size == "2"){
                                        document.querySelector(".reg-player3").style.display = "none";
                                        document.querySelector(".reg-player3").removeAttribute('required');
                                    } else {
                                        document.querySelector(".reg-player3").style.display = "flex";
                                        document.querySelector(".reg-player3").setAttribute('required', '');
                                    }
                                    openInfoModal();
                                    document.querySelectorAll(".info-txt")[0].textContent = booking.title;
                                    document.querySelectorAll(".info-txt")[1].textContent = booking.event_date.replace(/-/g, "/");
                                    document.querySelectorAll(".info-txt")[2].textContent = booking.latest_entry.replace(/-/g, "/");
                                    document.querySelectorAll(".info-txt")[3].textContent = booking.location;
                                    document.querySelectorAll(".info-txt")[4].textContent = booking.cost;
                                    document.querySelectorAll(".info-txt")[5].textContent = booking.team_size;
                                    document.querySelectorAll(".info-txt")[6].textContent = booking.event_description;
                                    document.getElementById("event").value = JSON.stringify(booking);
                                    if(taken == ""){
                                        document.querySelector("div.btn-info-cta").classList.remove("btn-inactive");
                                    } else {
                                        document.querySelector("div.btn-info-cta").classList.add("btn-inactive");
                                    }
                                });
                            } else {
                                box.innerHTML += `
                                <div class="cal-event-head">${booking.title}</div>
                                <div class="cal-event-time">(No spots left)</div>
                                `;
                            }
                        }
                    });
                } else {
                    box.classList.add("cal-day-disabled");
                }
            });

            document.querySelectorAll(".lac-top-mon").forEach(mon => mon.style.display = "none");
            document.querySelectorAll(".lac-box").forEach((box, idx) => {
                if(idx >= startIdx && idx < (endIdx + startIdx)){
                    box.querySelector(".lac-box-day").textContent = String(idx - (startIdx - 1));
                    let boxDay = Number(String(idx - (startIdx - 1)));
                    console.log(document.querySelectorAll(".lac-top-mon"));
                    document.querySelectorAll(".lac-top-mon")[idx].style.display = "flex";
                    let subtractNum = Math.floor(idx / 7) * 7;
                    document.querySelectorAll(".lac-top-mon")[idx].textContent = days[idx - subtractNum];

                    if(monthIdx == startPosition && boxDay == todayDate && startYear == currentYear){
                        makeBoxToday(box);
                        document.querySelector(".lac-flex").scrollLeft = box.offsetLeft;
                        //box.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
                        if(firstCall){
                            todayBox = box;
                        }
                    }

                    bookings.forEach(booking => {
                        if(Number(booking.event_date.slice(8, 10)) == boxDay){
                            box.classList.add("lac-box-event");
                            let taken = "";
                            if(booking.max_slots == booking.current_slots){
                                taken = " (no spots left)";
                            }
                            if(taken == ""){
                                box.innerHTML += `
                                <div class="lac-event-head">${booking.title}</div>
                                <div class="lac-event-cta">BOOK NOW</div>
                                `;
                                box.querySelector(".lac-event-cta").addEventListener("click", () => {
                                    if(booking.team_size == "2"){
                                        document.querySelector(".reg-player3").style.display = "none";
                                        document.querySelector(".reg-player3").removeAttribute('required');
                                    } else {
                                        document.querySelector(".reg-player3").style.display = "flex";
                                        document.querySelector(".reg-player3").setAttribute('required', '');
                                    }
                                    openInfoModal();
                                    document.querySelectorAll(".info-txt")[0].textContent = booking.title;
                                    document.querySelectorAll(".info-txt")[1].textContent = booking.event_date.replace(/-/g, "/");
                                    document.querySelectorAll(".info-txt")[2].textContent = booking.latest_entry.replace(/-/g, "/");
                                    document.querySelectorAll(".info-txt")[3].textContent = booking.location;
                                    document.querySelectorAll(".info-txt")[4].textContent = booking.cost;
                                    document.querySelectorAll(".info-txt")[5].textContent = booking.team_size;
                                    document.querySelectorAll(".info-txt")[6].textContent = booking.event_description;
                                    document.getElementById("event").value = JSON.stringify(booking);
                                    if(taken == ""){
                                        document.querySelector("div.btn-info-cta").classList.remove("btn-inactive");
                                    } else {
                                        document.querySelector("div.btn-info-cta").classList.add("btn-inactive");
                                    }
                                });    
                            } else {
                                box.innerHTML += `
                                <div class="lac-event-head">${booking.title}</div>
                                <div class="lac-event-time">(No spots left)</div>
                                `;
                            }
                        }
                    });
                } else {
                    box.classList.add("lac-day-disabled");
                }
            });

            if(document.querySelector(".last-flex").querySelectorAll(".cal-day-disabled").length < 7){
                document.querySelector(".last-flex").style.display = "flex";
            } else {
                document.querySelector(".last-flex").style.display = "none";
            }
        } catch (error) {
            console.error('Error posting data:', error);
        }
    }
    getBookings();
}
if(document.querySelector(".cal-container")){
    setCalendar(currentMonth, currentYear, true);
}
function changeMonth(direction){
    if(direction == "right"){
        currentMonth++;
    } else if(currentMonth > startPosition || Number(currentYear) > Number(startYear)){
        currentMonth--;
    }

    if(currentMonth == 12){
        currentMonth = 0;
        currentYear = Number(currentYear) + 1;
    } else if(currentMonth < 0) {
        currentMonth = 11;
        currentYear = Number(currentYear) - 1;
    }
    setCalendar(currentMonth, currentYear, false);
}
function firstDay(monthIdx, yearStr) {
    const date = new Date(parseInt(yearStr), monthIdx, 1);
    let day = date.getDay() - 1;
    if(day == -1){
        return 6;
    } else {
        return day;
    }
}
function totalDays(monthIdx, yearStr) {
    const year = parseInt(yearStr);
    return new Date(year, monthIdx + 1, 0).getDate();
}

function resetBoxes(){
    document.querySelectorAll(".cal-box").forEach(box => {
        box.classList.remove("cal-box-event");
        box.classList.remove("cal-day-disabled");
        box.classList.remove("cal-box-today");
        box.innerHTML = `
            <div class="cal-box-day"></div>
        `
    });
    document.querySelectorAll(".lac-box").forEach(box => {
        box.classList.remove("lac-box-event");
        box.classList.remove("lac-day-disabled");
        box.classList.remove("lac-box-today");
        box.innerHTML = `
            <div class="lac-box-day"></div>
        `
    });
}
function makeBoxToday(box){
    if(box.classList.contains("cal-box")){
        box.classList.add("cal-box-today");
        box.innerHTML += `
        <div class="cal-today-txt">Today</div>
        `;
    } else {
        box.classList.add("lac-box-today");
        box.innerHTML += `
        <div class="lac-today-txt">Today</div>
        `;    
    }
}
function resetCal(){
    setCalendar(startPosition, startYear, false);
}

let benIdx = 0;
setInterval(() => {
    benIdx++;
    if(benIdx == 3) benIdx = 0;
    document.querySelectorAll(".ben-img-change").forEach((img, idx) => {
        img.style.opacity = "0";
        setTimeout(() => {
            img.style.display = "none";
            if(idx == benIdx){
                img.style.display = "block";
                setTimeout(() => {
                    img.style.opacity = "1";
                }, 30);
            }
        }, 300);
    });
}, 4000);