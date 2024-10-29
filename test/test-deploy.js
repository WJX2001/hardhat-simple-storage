const { assert, expect } = require('chai')
const { ethers } = require("hardhat")
describe("SimpleStorage", function () {
  let SimpleStorageFactory
  let simpleStorage
  beforeEach(async function () {
    SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await SimpleStorageFactory.deploy()
  })

  it("Should start with a favorite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"

    assert.equal(currentValue.toString(), expectedValue)
    expect(currentValue).to.equal(expectedValue)
  })

  it("Should update when we call store", async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)

    const updatedValue = await simpleStorage.retrieve()
    assert.equal(updatedValue.toString(), expectedValue)
  })

})