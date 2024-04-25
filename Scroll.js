 gsap.registerPlugin(ScrollTrigger);

    gsap.to("#nav", {
      backgroundColor: "#000",
      duration: 2,
      scrollTrigger: {
        trigger: "#nav",
        start: "top -10%",
        end: "top -11%",
        scrub: true
      }
    });
