import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTransferNFT } from '@thirdweb-dev/react';

export default function NftSelectModal({ nftSelected, contract }) {
    const [show, setShow] = useState(false);
    const [addressTo, setAddressTo] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const {
        mutate: transferNFT,
        isLoading,
        error,
    } = useTransferNFT(contract);

    if (error) {
        console.error("failed to transfer nft", error);
    }

    const handleTransfer = () => {
        transferNFT({ to: addressTo, tokenId: nftSelected.metadata.id });
    }

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Transfer
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Transfer the NFT</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='flex flex-col items-start gap-2'>
                        <img src={nftSelected.metadata.image} alt="nft selected picture" />
                        <div className='p-2 text-sm'>
                            <p> <span className='font-bold'> Owner: </span> {nftSelected.owner} </p>
                            <p> <span className='font-bold'> Id: </span> {nftSelected.metadata.id} </p>
                        </div>
                        <input onChange={(e) => setAddressTo(() => e.target.value)} placeholder='Transfer to: ..Address..' className='p-2 border rounded' />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='bg-red-600 rounded p-2 px-6 text-white' onClick={handleClose}>
                        Close
                    </button>
                    <button className='bg-green-600 rounded p-2 px-6 text-white'
                        onClick={handleTransfer}
                        disabled={isLoading}
                    >
                        Transfer
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}