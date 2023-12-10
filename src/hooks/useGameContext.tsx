import { useState } from "react"
import { UsePlayerPosition } from "./usePlayerPosition"
import { UseGameObjects, gameObject } from "./useGameObjects"
import { UseController } from "./useController"
import { ethers } from "ethers";

import CONTRACT_ABI from "../abis/BlockBattle.json";
const CONTRACT_ADDRESS: string = "0xE15BE6e5eB00daAaF53D6F129dE6F11EDB9Ed4A6";


interface UseGameContextProps {
    playerPosition : UsePlayerPosition, 
    gameObjects    : UseGameObjects,
    controller     : UseController
}

interface Metamask {
    provider: any;
    networkName: string | null;
    signer: any;
    currentAccount: string | null;
  }
  
export interface UseGameContextInterface {
    isGameOver: boolean;
    isGameWon: boolean;
    endGame: Function;
    winGame: Function;
    resetGame: Function;
    mario: gameObject;
    playerPosition: UsePlayerPosition;
    controller: UseController;
    connectWallet: Function;
    metamaskDetails: any;
    setLevel: Function;
    setGameLevel: Function;
    getGameLevel: Promise<any>;
}

export interface UseGameContextInterface {
    isGameOver     : boolean,
    isGameWon      : boolean,
    endGame        : Function,
    winGame        : Function,
    resetGame      : Function,
    mario          : gameObject,
    playerPosition : UsePlayerPosition,
    controller     : UseController
}

export default function useGameContext(
    {playerPosition, gameObjects, controller} : UseGameContextProps
) : UseGameContextInterface  {

    const [isGameOver, setIsGameOver] = useState(false)
    const [isGameWon, setIsGameWon]   = useState(false)

    const mario = gameObjects.mario

    function endGame() : void {
        setIsGameOver(true)
    }

    function winGame(): void {
        setIsGameWon(true)
    }

    function resetGame() : void {
        resetCamera()
        resetMario()
        resetPlayerPosition()
        resetSkyPosition()
        resetGameState()
    }
    
    // Helper functions

    
    
    function resetMario() : void {
        gameObjects.mario.current.classList.add('is-facing-right')
        gameObjects.mario.current.classList.remove('is-facing-left')
        gameObjects.mario.current.style.translate = "0"
    }
    
    function resetCamera() : void {
        gameObjects.camera.current.style.left = '0px'
    }
    
    function resetPlayerPosition() : void {
        playerPosition.setPosition({x: 0, y: 0})
    }
    
    function resetSkyPosition() {
        gameObjects.sky.current.style.left ='0px'
    }

    function resetGameState() {
        setIsGameOver(false)
        setIsGameWon(false)
    }

    // #### For Metamask
    const [metamaskDetails, setMetamaskDetails] = useState<Metamask>({
        provider: Object,
        currentAccount: "",
        signer: Object,
        networkName: "",
      });
      const startingLevel: number = 0;
      const [gameLevel, setGameLevel] = useState<number>(startingLevel);
    
      /**************************** Connect Wallet ************************************/
    
      async function connectWallet() {
        console.log("1. Connecting to wallet...");
        const { ethereum } = window;
        const failMessage = "Please install Metamask & connect your Metamask";
        try {
          if (!ethereum) return; // console.log(failMessage);
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });
    
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });
    
          // const provider = new ethers.providers.Web3Provider(window.ethereum);
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          console.log(typeof provider);
          const network = await provider.getNetwork();
    
          const networkName = network.name;
          console.log(typeof networkName);
          const signer = provider.getSigner();
          console.log(typeof signer);
    
          if (networkName != "sepolia") {
            alert("Please switch your network to Sepolia Testnet");
            return;
          }
    
          if (account.length) {
            let currentAddress = account[0];
            console.log(typeof currentAddress);
            setMetamaskDetails({
              provider: provider,
              networkName: networkName,
              signer: signer,
              currentAccount: currentAddress,
            });
            console.log("Connected to wallet");
            console.log("Getting the player level....");
    
            // await getLevel(provider, currentAddress);
            console.log("Player level is : " + gameLevel);
          } else {
            alert(failMessage);
            return;
          }
        } catch (error) {
          reportError(error);
        }
      }
    
      /**************************** setLevel  ************************************/
      const setLevel = async (level: number) => {
        console.log(
          " ## UserAddresss : " +
            metamaskDetails.currentAccount +
            "| Level : " +
            level
        );
    
        try {
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI.abi,
            metamaskDetails.provider
          );
          const transaction = await contract
            .connect(metamaskDetails.signer)
            .setLevel(level);
          await transaction.wait();
          setGameLevel(level);
          return { status: 200, message: "Transaction Successful..." };
        } catch (error) {
          reportError(error);
        }
      };
    
      /**************************** getLevel ************************************/
    
      const getGameLevel = async (
        provider: any,
        currentAccount: string
      ): Promise<Number> => {
        try {
          const contract = new ethers.Contract(
            CONTRACT_ADDRESS,
            CONTRACT_ABI.abi,
            provider
          );
          const level = Number(await contract.getLevel(currentAccount));
          console.log("Got level : " + level);
          return level;
        } catch (error) {
          reportError(error);
          return 0;
        }
      };
    
    return { 
        isGameOver,
        isGameWon,
        winGame,
        endGame,
        resetGame,
        mario,
        controller,
        connectWallet,
        playerPosition,
        metamaskDetails,
        setLevel,
        setGameLevel,
        getGameLevel,
    }
}