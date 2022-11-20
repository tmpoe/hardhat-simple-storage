const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", () => {
  let simpleStorage
  let simpleStorageFactory
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favourite number of zeros", async () => {
    const currentValue = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), "0")
  })
})
