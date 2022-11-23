import { useContract, useNFTs, ThirdwebNftMedia, useAddress, Web3Button, useContractWrite } from "@thirdweb-dev/react";
import { createContext, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Collection from "./Collection";
import TopBar from "./TopBar";

export const MoebiusContractAddress = '0xC2817C822957e322B9296621E0d7d7a57C10f7d2';

export const contractContext = createContext({});
export const nftsContext = createContext({});

export default function Home() {

  const { contract: MoebiusContract } = useContract(MoebiusContractAddress);
  const { data: nfts, isLoading: isNftLoading, error } = useNFTs(MoebiusContract, { start: 0, count: 100 });
  const adressConnected = useAddress();
  const { mutateAsync: minArtsFnAsync } = useContractWrite(MoebiusContract, "mintArts");

  const mintArts = async () => {
    const tx = await minArtsFnAsync([adressConnected]); // Call the function
  }

  return (
    <contractContext.Provider value={{ MoebiusContractAddress, mintArts }}>
      <nftsContext.Provider value={nfts} >
        <Collection />
      </nftsContext.Provider>
    </contractContext.Provider >
  );
}
