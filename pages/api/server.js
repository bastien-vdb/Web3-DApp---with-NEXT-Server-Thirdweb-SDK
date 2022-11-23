import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const MoebiusContractAddress = '0xC2817C822957e322B9296621E0d7d7a57C10f7d2';

async function handler(req, res) {
    const connectedWallet = req.body;

    const nftMetadata = {
        name: "Cool NFT #5",
        description: "This is a 5th cool NFT",
        image: "ipfs://QmX8X1Pb9DG1KCfJiEhepPnh5nCMMNtc3mJ1NYWvZQaFQN/5.png",
        properties: {
          background:"gold",
          eyes:"Eyes10",
          face:"face colored",
          head:"medium",
          shine:"not that much"
        },
      };

    const SDK = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, "goerli");
    const signatureContract = await SDK.getContract(MoebiusContractAddress);

    const mintSignature = await signatureContract.erc721.signature.generate({
        to: connectedWallet, // Can only be minted by the address we checked earlier
        price: "0", // Free!
        mintStartTime: new Date(0), // now
        metadata: nftMetadata,
    });

    console.log(mintSignature);

    res.status(200).json(mintSignature);
}

export default handler;