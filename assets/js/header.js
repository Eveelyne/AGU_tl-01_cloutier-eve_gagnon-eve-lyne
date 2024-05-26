//Logique du header

const handleScroll = () => {
    const title = document.querySelector('header');
    const minimized = document.querySelector('minimized');


    if (document.documentElement.scrollTop > 300) {
        title.classList.remove('header');
        title.classList.add('minimized');

    } else {
        title.classList.remove('minimized');
        title.classList.add('header');
}
}

window.onscroll = () => {
    handleScroll();
}
