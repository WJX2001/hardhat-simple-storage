
const { network } = require("hardhat")
const { devlopmentChains, networkConfig, LOCK_TIME, CONFIRMATIONS } = require("../helper-hardhat-config")
module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments
  const { firstAccount } = await getNamedAccounts()
  let dataFeedAddr
  if (devlopmentChains.includes(network.name)) {
    // 走mock流程
    const mockV3Aggregator = await deployments.get("MockV3Aggregator")
    dataFeedAddr = mockV3Aggregator.address
  } else {
    // 走正常流程 从help中获取测试网对应的喂价
    dataFeedAddr = networkConfig[network.config.chainId].ethUsdDataFeed
  }



  // well what happens when we want to change chains?
  // when going for localhost or hardhat network we want to use a mock
  const fundMe = await deploy("FundMe", {
    from: firstAccount,
    args: [
      // put price fedd address
      dataFeedAddr
    ],
    log: true,
  })
}
module.exports.tags = ["all", "fundme"]