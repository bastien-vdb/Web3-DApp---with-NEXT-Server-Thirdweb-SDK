import { ThirdwebNftMedia, useAddress, useContract, useOwnedNFTs, useContractWrite } from '@thirdweb-dev/react';
import TopBar from './TopBar';
import { MoebiusContractAddress } from './index';
import { useEffect } from 'react';
import NftSelectModal from './NftSelectModal';

function Wallet(props) {

    const connectedWallet = useAddress();
    const { contract } = useContract(MoebiusContractAddress);
    const { data: nftsOwned, isLoading: loadingNFTsOwned, error } = useOwnedNFTs(contract, connectedWallet);

    useEffect(() => {
        console.log(nftsOwned);
    }, [nftsOwned])

    const { mutateAsync: merge } = useContractWrite(contract, "merge");

    const mergeForSpecial = async () => {
        const response = await fetch('http://localhost:3001/api/server', {
            method:'POST',
            body: connectedWallet,
        });
        const responseJson = await response.json();
        
        const _req = {
            to: responseJson.payload.to,
            royaltyRecipient: responseJson.payload.royaltyRecipient,
            royaltyBps: responseJson.payload.royaltyBps,
            primarySaleRecipient: responseJson.payload.primarySaleRecipient,
            uri: responseJson.payload.uri,
            quantity: responseJson.payload.quantity,
            pricePerToken: responseJson.payload.price,
            currency: responseJson.payload.currencyAddress,
            validityStartTimestamp: responseJson.payload.mintStartTime,
            validityEndTimestamp: responseJson.payload.mintEndTime,
            uid: responseJson.payload.uid
        };

        const tx = await merge([_req, responseJson.signature, [9]]); // Call the function
    }

    return (
        <>
            <TopBar />
            <div className="flex justify-center items-center h-screen">
                <div>

                    <button className='bg-black border border-neutral-900 rounded px-12 py-2 font-bold text-white'
                        onClick={mergeForSpecial}
                    >
                        Merge my NFT
                    </button>

                </div>
                <div className="flex w-2/3 flex-wrap items-center justify-center h-2/3 gap-10">
                    {loadingNFTsOwned ? <div className="text-2xl">...Loading...</div> :
                        nftsOwned?.map(e => (
                            <div key={e.metadata.id} className='flex justify-center flex-col text-center gap-2 items-center'>
                                <ThirdwebNftMedia className="h-48 w-48 rounded" key={e.metadata.id} metadata={e.metadata} />
                                <NftSelectModal nftSelected={e} contract={contract} />
                                <div className='text-white font-lg'>
                                    <p className='font-bold'>{e.metadata.name}</p>
                                    <p>{e.metadata.description}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default Wallet;