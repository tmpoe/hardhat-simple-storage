/* const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
 */

import { ethers } from "hardhat"
import { assert } from "chai"
import { TransactionResponse } from "@ethersproject/providers"
import { BigNumber } from "ethers"

describe("SimpleStorage", () => {
  let simpleStorage
  let simpleStorageFactory
  beforeEach(async () => {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("Should start with a favourite number of zeros", async () => {
    const currentValue: BigNumber = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), "0")
  })

  it("Should update when we call store", async () => {
    const transactionResponse: TransactionResponse = await simpleStorage.store(
      "7"
    )
    await transactionResponse.wait(1)
    const currentValue: BigNumber = await simpleStorage.retrieve()
    assert.equal(currentValue.toString(), "7")
  })
})