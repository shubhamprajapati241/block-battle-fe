
import Securitymonster from "../components/Securitymonster"
import Platform from "../components/Platform";
import { LevelProps } from "./Level";

export default function Level2({
  gameObjects,
  level,
}: LevelProps): JSX.Element {
  const { platforms, goombas1} = gameObjects;

  return level.current === 2 ? (
    <>
      <Platform platform={platforms.level2[0].ref} x={500} y={250} width={50} />
      <Platform platform={platforms.level2[1].ref} x={900} y={500} width={50} />
      <Platform
        platform={platforms.level2[2].ref}
        x={1500}
        y={400}
        width={100}
      />
      <Platform
        platform={platforms.level2[3].ref}
        x={3000}
        y={49}
        type="pipe"
        width={200}
      />
      <Platform
        platform={platforms.level2[4].ref}
        x={3700}
        y={250}
        width={100}
      />
      <Platform platform={platforms.level2[5].ref} x={6000} y={250} />

     

      <Securitymonster goomba1={goombas1.level2[4]} id="1" x={700} />
      <Securitymonster goomba1={goombas1.level2[5]} id="2" x={1000} />


      
    </>
  ) : (
    <></>
  );
}
