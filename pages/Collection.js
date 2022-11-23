import React, { useContext } from 'react';
import { ThirdwebNftMedia, Web3Button } from "@thirdweb-dev/react";
import { contractContext, nftsContext } from './index';
import ShowNftsModal from './ShowNftsModal';
import TopBar from './TopBar';

function Collection(props) {

    const { MoebiusContractAddress, mintArts } = useContext(contractContext);
    const nfts = useContext(nftsContext);

    return (
        <>
            <TopBar />
            <div className="flex justify-center">
                <Web3Button
                    contractAddress={MoebiusContractAddress}
                    action={mintArts}>
                    Mint NFT
                </Web3Button>
            </div>

            <div className="flex justify-center items-center h-screen">

                <div className="flex w-2/3 flex-wrap items-center justify-center h-2/3 gap-10">
                    {nfts ?
                        nfts.map(e => (
                            e.metadata.uri !== '' &&
                            <div key={e.metadata.id} className="flex flex-col items-center gap-2">
                                <ThirdwebNftMedia className="h-48 w-48 rounded" key={e.metadata.id} metadata={e.metadata} />
                                <ShowNftsModal nftSelected={e} />
                                <div className='text-white font-lg text-center'>
                                    <p className='font-bold'>{e.metadata.name}</p>
                                    <p>{e.metadata.description}</p>
                                </div>
                            </div>
                        ))
                        :
                        <div className="text-white text-2xl">...Loading...</div>
                    }
                </div>
            </div>
        </>
    );
}

export default Collection;