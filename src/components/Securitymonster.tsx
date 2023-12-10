import { ReactElement } from "react";
import  Datasteal from "../assets/Datasteal1.png"



import { gameObject } from "../hooks/useGameObjects";


export interface GoombaProps {
  goomba1: gameObject;
  x: number;
  id: string;
}

export default function Goomba({ goomba1, id, x }: GoombaProps): ReactElement {
  return (
    <div
      id={"goomba" + id}
      className="goomba absolute bottom-[35px] z-[9999] w-[60px] h-[70px]"
      style={{ left: x + "px" }}
      ref={goomba1}
    >
      <img src={Datasteal} />
    </div>
  );
}
