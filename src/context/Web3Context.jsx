import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import MedicalRecordABI from '../contracts/MedicalRecord.json';

const Web3Context = createContext();

export const useWeb3 = () => useContext(Web3Context);

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const AVALANCHE_TESTNET_PARAMS = {
    chainId: '0xA869', // 43113 in hex
    chainName: 'Avalanche Fuji Testnet',
    nativeCurrency: {
      name: 'AVAX',
      symbol: 'AVAX',
      decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/']
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask');
      }

      // Request account access
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
      setAccount(account);

      // Add Avalanche network if not already added
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [AVALANCHE_TESTNET_PARAMS],
        });
      } catch (addError) {
        console.log('Network already added or user rejected');
      }

      // Switch to Avalanche network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: AVALANCHE_TESTNET_PARAMS.chainId }],
        });
      } catch (switchError) {
        console.error('Error switching network:', switchError);
        throw new Error('Please switch to Avalanche Fuji Testnet');
      }

      // Create Web3Provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Get signer
      const signer = provider.getSigner();
      setSigner(signer);

      // Initialize contract
      const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
      const contract = new ethers.Contract(contractAddress, MedicalRecordABI.abi, signer);
      setContract({ contract, address: contractAddress });

      return { provider, signer, contract };
    } catch (err) {
      console.error('Error connecting wallet:', err);
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    const initializeWeb3 = async () => {
      try {
        if (window.ethereum) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const account = await signer.getAddress();
          console.log('Connected account:', account);

          // Initialize contract
          const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;
          console.log('Contract address:', contractAddress);
          
          const contract = new ethers.Contract(
            contractAddress,
            MedicalRecordABI.abi,
            signer
          );
          console.log('Contract initialized:', contract.address);

          setProvider(provider);
          setSigner(signer);
          setAccount(account);
          setContract({ contract });
          setError(null);
        } else {
          setError('Please install MetaMask');
        }
      } catch (err) {
        console.error('Web3 initialization error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeWeb3();

    // Setup event listeners
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  const value = {
    provider,
    signer,
    account,
    contract,
    loading,
    error,
    connectWallet
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};
