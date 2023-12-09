import cloudImg from "../assets/clouds.png";
import hillImg from "../assets/hill.png";
import hillsEyesImg from "../assets/hills-eyes.png";
import EthIndia from "../assets/background.png";
import { gameObject } from "../hooks/useGameObjects";

interface SkyProps {
  sky: gameObject;
}

export default function Sky({ sky }: SkyProps) {
  return (
    <div id="sky" className="absolute inset-0 z-0 bg-[#ffe7ba] t" ref={sky}>
      <img
        src={EthIndia}
        className="absolute h-[100vh] w-full opacity-50"
        alt="EthIndia"
      />
    </div>
  );
}
