import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useTransferNFT } from '@thirdweb-dev/react';

export default function ShowNftsModal({ nftSelected }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Show
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Nft presentation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='flex flex-col items-start gap-2'>
                        <img src={nftSelected.metadata.image} alt="nft selected picture" />
                        <div className='p-2 text-sm'><span className='font-bold'> Owner: </span> {nftSelected.owner}</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className='bg-red-600 rounded p-2 px-6 text-white' onClick={handleClose}>
                        Close
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}