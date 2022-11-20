/* const { ethers } = require("hardhat")
const { expect, assert } = require("chai")
 */

import { ethers } from "hardhat"
import { assert } from "chai"
import { TransactionResponse } from "@ethersproject/providers"
import { BigNumber } from "ethers"
import { SimpleStorage__factory } from "../typechain-types/factories/SimpleStorage__factory"
import { SimpleStorage } from "../typechain-types/SimpleStorage"

describe("SimpleStorage", () => {
  let simpleStorage: SimpleStorage
  let simpleStorageFactory: SimpleStorage__factory
  beforeEach(async () => {
    simpleStorageFactory = (await ethers.getContractFactory(
      "SimpleStorage"
    )) as SimpleStorage__factory

    simpleStorage = (await simpleStorageFactory.deploy()) as SimpleStorage
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
