import React, { useEffect } from "react";
import anime from "animejs/lib/anime.es.js";

function AnimatedBG(props) {
  const { shouldAnimate, onAnimationEnd } = props;
  useEffect(() => {
    function animate() {
      const t = anime.timeline({
        easing: "easeInExpo",
        duration: 400
      });

      t.add({
        targets: ".animated-bg",
        clipPath: "circle(75%)"
      });

      t.add({
        targets: ".success-message",
        opacity: [0, 1],
        endDelay: 4000
      });

      t.add({
        targets: ".auth-form",
        scale: [1, 0],
        complete: () => onAnimationEnd()
      });
    }

    shouldAnimate && animate();
  }, [shouldAnimate, onAnimationEnd]);

  return (
    <React.Fragment>
      {props.shouldAnimate && (
        <React.Fragment>
          <div className="animated-bg" />
          <p className="success-message">Welcome to Palitras</p>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default AnimatedBG;
