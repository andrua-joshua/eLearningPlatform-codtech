togglebtn = document.querySelector(".hamburger");
togglebtn.onclick = function(){
    navbar = document.querySelector(".nav-links");
    navbar.classList.toggle("active");
}

const swiper = new Swiper('.swiper',{
    loop:true,

    pagination: {
        el: '.swiper-pagination',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});


const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry) =>{
        console.log(entry)
        if(entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});
const  hiddenElements= document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => ResizeObserver(el));