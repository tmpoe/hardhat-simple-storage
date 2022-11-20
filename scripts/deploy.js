// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { hashMessage } = require("ethers/lib/utils")
const { network } = require("hardhat")
const hre = require("hardhat")

async function main() {
  const SimpleStorageFactory = await hre.ethers.getContractFactory(
    "SimpleStorage"
  )

  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()
  console.log(simpleStorage.address)

  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  const currentValue = await simpleStorage.retrieve()
  console.log(currentValue)

  const transactionResponse = await simpleStorage.store("7")
  await transactionResponse.wait(1)

  const newValue = await simpleStorage.retrieve()
  console.log(newValue)
}

async function verify(contractAddress, constructorArgs) {
  console.log("Verifying contract...")
  try {
    hre.run("verify:verify", {
      address: contractAddress,
      constructorArguments: constructorArgs,
    })
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Contract already verified")
    } else {
      console.log(e)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
