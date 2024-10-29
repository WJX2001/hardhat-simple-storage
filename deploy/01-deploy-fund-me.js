
const { networkConfig } = require("../helper-hardhat-config")
const { network } = require("hardhat")
module.exports = async ({ getNameAccounts, deployments }) => {
  const { deploy, log } = deployments
  const { deoloyer } = await getNameAccounts()
  const chainId = hre.network.config.chainId

  const ethUsdPriceFeedAddress = networkConfig[network.config.chainId].ethUsdDataFeed




  // well what happens when we want to change chains?
  // when going for localhost or hardhat network we want to use a mock
  const fundMe = await deploy("FundMe", {
    from: deoloyer,
    args: [
      // put price fedd address
    ],
    log: true,
  })
}