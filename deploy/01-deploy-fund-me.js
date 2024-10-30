
const { network } = require("hardhat")
const { devlopmentChains, networkConfig, LOCK_TIME, CONFIRMATIONS } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

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
  const args = [dataFeedAddr]
  const fundMe = await deploy("FundMe", {
    from: firstAccount,
    args,
    log: true,
  })

  if (!devlopmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    // 进行验证
    await verify(fundMe.address, args)
  }


}
module.exports.tags = ["all", "fundme"]