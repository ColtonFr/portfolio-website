// LiquidGlassBox.jsx
import { Box } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

export default function LiquidGlassBox(props) {
  const ref = useRef(null);

  // ---- Dynamic tint ---------------------------------
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateTint = () => {
      const bodyBg = getComputedStyle(document.body).backgroundColor; // e.g. rgb(15,23,42)
      const rgb = bodyBg.match(/\d+/g)?.slice(0, 3).join(",") || "255,255,255";
      el.style.setProperty("--glass-tint", rgb);
    };

    updateTint();
    window.addEventListener("scroll", updateTint, { passive: true });
    window.addEventListener("resize", updateTint);
    return () => {
      window.removeEventListener("scroll", updateTint);
      window.removeEventListener("resize", updateTint);
    };
  }, []);

  // ---- Parallax -------------------------------------
  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    e.currentTarget.style.transform =
      `perspective(600px) rotateX(${-y}deg) rotateY(${x}deg)`;
  };

  const handleLeave = (e) => (e.currentTarget.style.transform = "");

  return (
    <Box
      ref={ref}
      className="liquid-glass"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    />
  );
}
