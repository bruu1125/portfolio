document.addEventListener('DOMContentLoaded', function () {
    const indexBgbox = document.querySelector('.index-bgbox');
    const indexTitle = document.querySelector('.index-title');
    const portfolioBox = document.querySelector('.p-hidden-box');
    const portfolioSection = document.querySelector('.portfolio');
    const contactSection = document.querySelector('.contact');

    const parentWidth = indexBgbox.parentElement.offsetWidth;
    const windowHeight = window.innerHeight;

    let animated = false; // 애니메이션이 이미 실행 중인지 여부를 나타내는 변수

    // Top 버튼
    document.querySelector('.fixed-top').addEventListener('click', function(){
        window.scrollTo({top:0, left:0, behavior:'smooth'});
    })

    // 네비 이동버튼
    const intro = document.querySelector('#pageIntro').offsetTop;
    const resume = document.querySelector('#pageResume').offsetTop;
    const skills = document.querySelector('#pageSkills').offsetTop;
    const portfolio = document.querySelector('#pagePortfolio').offsetTop;

    document.querySelector('#profileBtn').addEventListener('click', function(){
        window.scrollTo({top:intro, behavior:'smooth'});
    });
    document.querySelector('#resumeBtn').addEventListener('click', function(){
        window.scrollTo({top:resume, behavior:'smooth'});
    });
    document.querySelector('#skillsBtn').addEventListener('click', function(){
        window.scrollTo({top:skills, behavior:'smooth'});
    });
    document.querySelector('#portfolioBtn').addEventListener('click', function(){
        window.scrollTo({top:portfolio, behavior:'smooth'});
    });


    function animateContactSection() {
        const scrollPosition = window.scrollY;

        // 인덱스 효과 적용
        const bgboxTransform = Math.min(scrollPosition * -0.45, parentWidth - indexBgbox.offsetWidth);
        const titleTransform = Math.min(scrollPosition * 0.7, parentWidth - indexTitle.offsetWidth);
        const titleOpacity = Math.max(0, 1 - (scrollPosition * 0.0014));
        indexBgbox.style.transform = `translateX(${bgboxTransform}px)`;
        indexTitle.style.transform = `translateX(${titleTransform}px)`;
        indexTitle.style.opacity = titleOpacity;

        // 포트폴리오 보기 버튼 제어
        // if (scrollPosition > portfolioSection.offsetTop + portfolioSection.offsetHeight ||
        //     scrollPosition + windowHeight < portfolioSection.offsetTop) {
        //     portfolioBox.classList.remove('viewbox');
        // }

        // 컨택트 섹션 애니메이션 제어
        if (scrollPosition > contactSection.offsetTop - windowHeight / 2.5 && !animated) {
            document.querySelector('.contact-title').classList.add('animate-c-title');
            document.querySelector('.decoline').classList.add('animate-decoline');
            document.querySelectorAll('.contact-inner > input[type=radio] + label').forEach(function (label, index) {
                setTimeout(function () {
                    label.classList.add('animate-contactbox');
                }, index * 200);
            });
            animated = true;
        } else if (scrollPosition <= contactSection.offsetTop - windowHeight / 1.2 && animated) {
            // 컨택트 섹션을 벗어나면 애니메이션 클래스 제거
            document.querySelector('.contact-title').classList.remove('animate-c-title');
            document.querySelector('.decoline').classList.remove('animate-decoline');
            document.querySelectorAll('.contact-inner > input[type=radio] + label').forEach(function (label) {
                label.classList.remove('animate-contactbox');
            });
            animated = false;
        }
    }

    function scrollHandler() {
        animateContactSection();
        requestAnimationFrame(scrollHandler);
    }

    scrollHandler();

    // 포트폴리오 보기 및 닫기 기능
    // document.querySelector('#p-view').addEventListener('click', function () {
    //     portfolioBox.classList.add('viewbox');
    // });
    // document.querySelector('#p-close').addEventListener('click', function () {
    //     portfolioBox.classList.remove('viewbox');
    // });
    
});
