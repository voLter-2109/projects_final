import gsap from "gsap";

export const gsapLoader = () => {
    return gsap.to(".content", { opacity: 0, x: 300, duration: 0.5 });
};