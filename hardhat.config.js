require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    artifacts: "./src/artifacts",
    sources: "./contracts",
    cache: "./cache",
    tests: "./test"
  },
  networks: {
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      chainId: 43113,
      accounts: [process.env.PRIVATE_KEY]
    },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      chainId: 43114,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
