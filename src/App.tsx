import { createContext, useEffect, useRef } from "react";
import useController from "./hooks/useController";
import useResolveKeyPress from "./hooks/useResolveKeyPress";
import usePlayerPosition from "./hooks/usePlayerPosition";
import useGameObjects from "./hooks/useGameObjects";
import Game from "./components/Game";
import Sky from "./components/Sky";
import Mario from "./components/Mario";
import useControls from "./hooks/useControls";
import useGameContext, {
  UseGameContextInterface,
} from "./hooks/useGameContext";
import GameOver from "./components/GameOver";
import GameWon from "./components/GameWon";
import useGravity from "./hooks/useGravity";
import Level1 from "./levels/Level1";
import useLevels from "./hooks/useLevels";
import Ground from "./components/Ground";
import WinFlag from "./components/WinFlag";
import Level2 from "./levels/Level2";
// import BulletBill from "./components/BulletBill";
import WatchOut from "./components/WatchOut";
import GameResetBtn from "./components/GameResetBtn";
import checkForCollision from "./utils/checkForCollision";
import Level3 from "./levels/Level3";
import Camera from "./components/Camera";
import ConnectButton from "./components/ConnectButton";

// General Game Context
export const GameContext = createContext<any>(null);

function App() {
  // Config
  const speed: number = 10;

  const gameLength: number = 8000;

  const maxJumpHeight = useRef(300);

  const totalLevels = 3;

  // Doc Title
  useEffect(() => {
    document.title = "Block Battle";
  }, []);

  // KeyPress controller -  Controls which keys are pressed
  const controller = useController();

  // Player position - Updates player position in game
  const playerPosition = usePlayerPosition();

  // Game objects - stores DOM element useRefs
  const gameObjects = useGameObjects();

  // Gravity
  const gravity = useGravity();

  // General Game Context
  const game = useGameContext({ playerPosition, gameObjects, controller });

  // Levels
  const level = useLevels({ totalLevels });

  // Control actions - maps actions to keypress events
  const controls = useControls({
    playerPosition,
    gameObjects,
    speed,
    gameLength,
    maxJumpHeight,
    gravity,
  });

  // Resolve keypress - DOM keyup and keydown event listeners
  useResolveKeyPress(controller);

  // Game loop
  const loopRef = useRef<number>(0);
  const gameRef = useRef<UseGameContextInterface | null>(null);

  useEffect(() => {
    gameRef.current = game;
  }, [game.playerPosition, game.isGameOver, level.current, game.metamaskDetails,]);

  function loop() {
    const currentLevel: number = level.ref.current;

    checkForCollision({
      gameObjects,
      game,
      gravity,
      maxJumpHeight,
      level: currentLevel,
    });

    // Controls
    if (!gameRef.current?.isGameOver && !gameRef.current?.isGameWon) {
      if (controller.controllerRef.current.right) {
        controls.move("right");
      }

      if (controller.controllerRef.current.left) {
        controls.move("left");
      }

      if (controller.controllerRef.current.up) {
        controls.move("up");
      }
    }

    loopRef.current = requestAnimationFrame(loop);
  }

    // Set metamask details
    const account = game.metamaskDetails;

  useEffect(() => {
    loopRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(loopRef.current);
    };
  }, []);

  return (
    <GameContext.Provider value={game}>
      {account.currentAccount ? (
        <Game>
          <Mario mario={gameObjects.mario} gravity={gravity.ref.current} />
          <Sky sky={gameObjects.sky} />
          <Camera camera={gameObjects.camera} style={{}}>
            <WinFlag winFlag={gameObjects.winFlag} />
            <Ground ground={gameObjects.ground} />

            <WatchOut />
            <Level1 level={level} gameObjects={gameObjects} />
            <Level2 level={level} gameObjects={gameObjects} />
            <Level3 level={level} gameObjects={gameObjects} />
          </Camera>

          <GameResetBtn />
          <GameOver />
          <GameWon level={level} totalLevels={totalLevels} />
          <div className="absolute z-50 p-8">
            {level.current == 1 && "Decentralize "}
            {level.current == 2 && "Secure "}
            {level.current == 3 && "Scale "}
            {level.current}/{totalLevels}
          </div>
        </Game>
      ) : (
        <ConnectButton />
      )}
    </GameContext.Provider>
  );
}

export default App;
