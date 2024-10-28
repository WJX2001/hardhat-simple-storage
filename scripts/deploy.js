
const { ethers } = require("hardhat")
async function main () {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
  console.log("Deploying contract...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.waitForDeployment()
  console.log(
    'contract has been deployed successfully, contract address is' +
    simpleStorage.target,
  )

  // what happens whne we deploy to our hardhat network
  if(hre.network.config.network === 11155111 && process.env.ETHERSCAN_API_KEY) {
    // etherscan 可能还不知道这个交易 ，需要一段时间才能跟上区块链的变化
    // 需要等待几个区块
    console.log('waiting for 5 confirmations...')
    await fundMe.deploymentTransaction().wait(5)
    await verify(simpleStorage.target)
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(`current value is ${currentValue}`)

  // Update the current value
  const transactionResponse = await simpleStorage.store(7)
  await transactionResponse.wait(1)
  const updatedValue = await simpleStorage.retrieve()
  console.log(`updated value is ${updatedValue}`)
  

}

async function verify (contractAddress, args) {
  console.log("Verifying contract...")
  try {
    await hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified")
    } else {
      console.log(e)
    }
  }

}



main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })