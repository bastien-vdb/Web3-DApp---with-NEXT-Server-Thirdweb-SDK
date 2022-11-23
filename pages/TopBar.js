import React from 'react';
import Link from 'next/link';
import { ConnectWallet } from "@thirdweb-dev/react";

function TopBar(props) {
    return (
        <div id="topBar" className="flex justify-between">
            <div id="menu" className="text-2xl text-white flex w-64 justify-around p-2">
                <Link href='/'>
                    <a className='hover:bg-black rounded p-2 px-6'>Home</a>
                </Link>

                <Link href='/Wallet'>
                    <a className='hover:bg-black rounded p-2 px-6'>Wallet</a>
                </Link>
            </div>

            <div className='m-2'>
                <ConnectWallet />
            </div>
        </div>
    );
}

export default TopBar;