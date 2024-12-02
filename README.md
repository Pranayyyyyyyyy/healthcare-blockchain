# Healthcare Blockchain Medical Record Management System

A decentralized application (DApp) for secure management of patient medical records using blockchain technology. Built with React, Vite, and Solidity, deployed on the Avalanche Fuji Testnet.

## Features

- **Secure Medical Record Management**: Store and manage patient medical records on the blockchain
- **Hospital Registration**: Only registered hospitals can add and view medical records
- **Patient Privacy**: Records are accessible only through unique Aadhar numbers
- **Real-time Updates**: Instant record addition and retrieval
- **User-friendly Interface**: Clean and intuitive UI for healthcare providers

## Tech Stack

- Frontend: React + Vite
- Smart Contract: Solidity
- Blockchain: Avalanche Fuji Testnet
- Web3 Integration: ethers.js
- Styling: Tailwind CSS
- Development: Hardhat

## Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd healthcare-blockchain
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_CONTRACT_ADDRESS=your_contract_address
PRIVATE_KEY=your_private_key
VITE_AVALANCHE_NETWORK=fuji
VITE_AVALANCHE_RPC=https://api.avax-test.network/ext/bc/C/rpc
VITE_CHAIN_ID=43113
```

4. Run the development server:
```bash
npm run dev
```

## Smart Contract Deployment

1. Configure Hardhat:
```bash
npx hardhat compile
npx hardhat run scripts/deploy.js --network fuji
```

2. Update the contract address in your `.env` file

## Usage

1. Connect your MetaMask wallet
2. Register as a hospital (if not already registered)
3. Add patient records using the Add Record form
4. View patient records using their Aadhar number

## Security Features

- Hospital verification
- Input validation
- Secure record storage
- Access control mechanisms

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
