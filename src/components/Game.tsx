import { ReactElement } from "react";

interface GameProps {
  children: ReactElement[] | ReactElement;
}

export default function Game({ children }: GameProps) {
  return (
    <>
      <div id="game" className="grid items-center justify-center h-[100vh]">
        <div className="relative border border-slate-400 w-screen h-full  overflow-hidden">
          {children}
        </div>
      </div>
    </>
  );
}
