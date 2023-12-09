import Goomba from "../components/Goomba";
import Platform from "../components/Platform";
import { LevelProps } from "./Level";

export default function Level1({
  gameObjects,
  level,
}: LevelProps): JSX.Element {
  const { platforms, goombas } = gameObjects;

  return level.current === 1 ? (
    <>
      <Platform
        platform={platforms.level1[0].ref}
        x={1500}
        y={49}
        type="pipe"
        width={200}
      />
      <Platform platform={platforms.level1[1].ref} x={3500} y={250} />
      <Platform platform={platforms.level1[2].ref} x={3900} y={400} />
      <Platform platform={platforms.level1[3].ref} x={5000} y={400} />
      <Platform platform={platforms.level1[4].ref} x={6100} y={400} />

      <Goomba goomba={goombas.level1[0]} id="1" x={700} />
      <Goomba goomba={goombas.level1[4]} id="2" x={1400} />
    </>
  ) : (
    <></>
  );
}
