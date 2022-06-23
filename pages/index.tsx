import { Button, Container, Image, Skeleton } from '@chakra-ui/react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import {
  useAccount,
  useContract,
  useContractRead,
  useContractWrite,
} from 'wagmi';
import abiFile from '../abiFile.json';

export default function Home() {
  const contractConfig = {
    addressOrName: '0xcbac287a142eca78293a3659e901d25bd17deff8',
    contractInterface: abiFile.abi,
  };
  const contract = useContract(contractConfig);
  const { data: tokenURI } = useContractRead(
    contractConfig,
    'COMMON_TOKEN_URI'
  );
  const { writeAsync: mint } = useContractWrite(contractConfig, 'mint');
  const { data: accountData } = useAccount();

  const onMintClick = async () => {
    const tx = await mint({
      args: [accountData?.address, { value: ethers.utils.parseEther('0.001') }],
    });
  };

  return (
    <Container paddingY='10'>
      <ConnectButton />
      <Image
        src={tokenURI as unknown as string}
        dropShadow='xl'
        width='200px'
      />

      <Button onClick={onMintClick}>Mint</Button>
    </Container>
  );
}
