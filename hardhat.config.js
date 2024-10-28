require("@nomicfoundation/hardhat-toolbox")
require("@chainlink/env-enc").config()
/** @type import('hardhat/config').HardhatUserConfig */

const SOPELIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const PRIVATE_KEY = process.env.METAMASK_PRIVATE_KEY
module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "hardhat",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + SOPELIA_RPC_URL,
      accounts: [`${PRIVATE_KEY}`],
      chainId: 11155111
    },
  }
}
