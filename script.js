const music =
    document.getElementById("music");

const btn =
    document.getElementById("musicBtn");

const giftScreen =
    document.getElementById("giftScreen");

const giftBox =
    document.getElementById("giftBox");

let playing = false;


/* =========================
   NÚT NHẠC
========================= */

function updateMusicButton() {

    btn.textContent =
        playing ? "🔊" : "♫";

    btn.classList.toggle(
        "playing",
        playing
    );

}


/* =========================
   PHÁT NHẠC
========================= */

async function playMusic() {

    try {

        await music.play();

        playing = true;

        updateMusicButton();

    }

    catch (error) {

        console.log(
            "Autoplay bị trình duyệt chặn."
        );

    }

}

/* =========================
   TẠM DỪNG NHẠC
========================= */
function pauseMusic() {
    music.pause();
    playing = false;
    updateMusicButton();
}
/* =========================
   MỞ HỘP QUÀ
========================= */

giftBox.addEventListener(
    "click",
    async () => {

        giftBox.classList.add("open");

        await playMusic();

        setTimeout(() => {

            giftScreen.classList.add("hidden");

        }, 900);

    }
);


/* =========================
   NÚT NHẠC
========================= */

btn.addEventListener(
    "click",
    (event) => {

        event.stopPropagation();


        if (playing) {

            pauseMusic();

        }

        else {

            playMusic();

        }

    }
);








/* =========================
   HIỆU ỨNG MESSAGE
========================= */

const reveals =
    document.querySelectorAll(
        ".reveal"
    );


if (reveals.length) {

    const observer =
        new IntersectionObserver(

            entries => {

                if (
                    entries[0]
                        .isIntersecting
                ) {

                    reveals.forEach(
                        (element, index) => {

                            setTimeout(

                                () => {

                                    element.classList.add(
                                        "show"
                                    );

                                },

                                index * 650

                            );

                        }
                    );

                    observer.disconnect();

                }

            },

            {
                threshold: 0.2
            }

        );


    observer.observe(
        reveals[0]
    );

}


/* =========================
   CLICK ẢNH → PHÓNG TO
========================= */

document
    .querySelectorAll(
        ".photo img, .hero-photo img, .split img"
    )
    .forEach(
        img => {

            img.addEventListener(
                "click",
                () => {

                    const viewer =
                        document.createElement(
                            "div"
                        );


                    viewer.style = `

                        position:fixed;
                        inset:0;
                        background:#08060eee;
                        z-index:100;
                        display:flex;
                        align-items:center;
                        justify-content:center;
                        padding:25px;
                        cursor:zoom-out;

                    `;


                    const bigImage =
                        document.createElement(
                            "img"
                        );


                    bigImage.src =
                        img.src;


                    bigImage.style = `

                        max-width:92vw;
                        max-height:90vh;
                        object-fit:contain;

                    `;


                    viewer.appendChild(
                        bigImage
                    );


                    viewer.onclick =
                        () => viewer.remove();


                    document.body.appendChild(
                        viewer
                    );

                }
            );

        }
    );


/* =========================
   ĐỔI NAV ACTIVE KHI CUỘN
========================= */

const homeSection =
    document.getElementById("home");

const memoriesSection =
    document.getElementById("memories");

const navLinks =
    document.querySelectorAll("nav a");


window.addEventListener(
    "scroll",
    () => {

        const memoriesTop =
            memoriesSection.offsetTop;

        if (
            window.scrollY + 200 >=
            memoriesTop
        ) {

            navLinks.forEach(
                link => {

                    link.classList.remove(
                        "active"
                    );

                }
            );


            navLinks[1].classList.add(
                "active"
            );

        }

        else {

            navLinks.forEach(
                link => {

                    link.classList.remove(
                        "active"
                    );

                }
            );


            navLinks[0].classList.add(
                "active"
            );

        }

    }
);

/* =========================
   TỰ ĐỘNG THAY 6 ẢNH & NHẠC TỪ LINK KHÁCH HÀNG
========================= */
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    
    // Mảng chứa tên các khung ảnh trên web gốc (từ 1 đến 6)
    const photoClasses = ['.p1 img', '.p2 img', '.p3 img', '.p4 img', '.p5 img', '.p6 img'];
    
    // Quét tìm 6 bức ảnh khách up (từ img0 đến img5)
    photoClasses.forEach((selector, index) => {
        let customImg = urlParams.get(`img${index}`);
        
        if (customImg) {
            // Thay ảnh trong Gallery
            const imgElement = document.querySelector(selector);
            if (imgElement) imgElement.src = customImg;
            
            // Nếu là ảnh đầu tiên (img0), dùng nó thay luôn cho cái ảnh Hero to đùng trên cùng
            if (index === 0) {
                const heroPhoto = document.querySelector('.hero-photo img');
                if (heroPhoto) heroPhoto.src = customImg;
                
                const splitPhoto = document.querySelector('.split img');
                if (splitPhoto) splitPhoto.src = customImg;
            }
        }
    });

    // Thay nhạc nền
    const customMusic = urlParams.get('music');
    if (customMusic) {
        const musicSource = document.querySelector('#music source');
        const musicAudio = document.getElementById('music');
        
        if (musicSource && musicAudio) {
            musicSource.src = customMusic;
            musicAudio.load(); // Bắt buộc phải load lại thẻ audio thì nhạc mới đổi
        }
    }
});