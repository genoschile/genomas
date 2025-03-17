import TeamCarrousel from "@/components/sections/section5/TeamCarrousel";
import Section1 from "@/components/sections/Section1";
import Section2 from "@/components/sections/Section2";
import Section3 from "@/components/sections/Section3";
import Section4 from "@/components/sections/Section4";
import "./page.css";
import HeaderLanding from "@/components/headers/HeaderLanding";
import Footer from "@/components/footer/FooterLanding";

const squares = Array.from({ length: 15 }, (_, i) => i);

const colors = [
  "rgba(255, 0, 0, 0.6)", // Rojo
  "rgba(0, 255, 0, 0.6)", // Verde
  "rgba(0, 0, 255, 0.6)", // Azul
  "rgba(255, 255, 0, 0.6)", // Amarillo
  "rgba(255, 0, 255, 0.6)", // Magenta
  "rgba(0, 255, 255, 0.6)", // Cyan
];

export default function Home() {
  return (
    <>
      <div className="layout">
        <HeaderLanding />
        <div className="box">
          {squares.map((i) => {
            const side = Math.random() < 0.5 ? "left" : "right"; // Lado aleatorio
            const randomY = Math.random() * 100; // Posición aleatoria en Y (vh)
            const offsetX = Math.random() * 10 + 5; // Margen fuera del contenido
            const duration = Math.random() * 5 + 5; // Entre 5s y 10s
            const delay = Math.random() * 5; // Hasta 5s de retraso
            const color = colors[Math.floor(Math.random() * colors.length)]; // Color aleatorio

            return (
              <div
                key={i}
                className="square"
                style={
                  {
                    "--i": i,
                    "--y": `${randomY}vh`,
                    "--x":
                      side === "left"
                        ? `calc(50% - 640px - ${offsetX}px)`
                        : `calc(50% + 640px + ${offsetX}px)`,
                    "--duration": `${duration}s`,
                    "--delay": `${delay}s`,
                    "--color": color,
                  } as React.CSSProperties
                }
              ></div>
            );
          })}
        </div>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <TeamCarrousel />
      </div>
      <Footer />
    </>
  );
}
