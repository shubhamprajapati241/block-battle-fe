import { ReactElement } from "react";
// import goombaImg from "../assets/bank.jpeg";
 import NetworkCongestion from "../assets/car.jpeg"
import { gameObject } from "../hooks/useGameObjects";


export interface GoombaProps {
  goomba2: gameObject;
  x: number;
  id: string;
}

export default function Goomba({ goomba2, id, x }: GoombaProps): ReactElement {
  return (
    <div
      id={"goomba" + id}
      className="goomba absolute bottom-[35px] z-[9999] w-[60px] h-[70px]"
      style={{ left: x + "px" }}
      ref={goomba2}
    >
      <img src={NetworkCongestion} />
    </div>
  );
}
