import { useContext } from "react";
import { GameContext } from "../App";
import { UseGameContextInterface } from "../hooks/useGameContext";

const ConnectButton = () => {
  const game: UseGameContextInterface = useContext(GameContext);

  const connectWallet = async () => {
    await game.connectWallet();
  };
  return (
    <div className="flex flex-col items-center text-center justify-center h-screen">
      <h1 className="pb-5 font-bold text-[25px]">
        Welcome to the Block Battle
      </h1>

      <p className="text-[12px] pb-5">
        Play, Learn and Triumpth over the Decentralize trilemma
      </p>
      <button
        className="border-spacing-2 bg-slate-700 hover:bg-slate-300 hover:text-black  px-10 py-[15px] rounded-[4px] text-white text-sm font-semibold outline-none"
        onClick={() => connectWallet()}
      >
        Connect wallet
      </button>
    </div>
  );
};

export default ConnectButton;
