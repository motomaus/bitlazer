const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('lelonBTC Contract', function () {
  let lelonBTC
  let t3BTC
  let owner, addr1, addr2
  let ownerSigner, addr1Signer, addr2Signer

  beforeEach(async function () {
    // Get signers
    ;[ownerSigner, addr1Signer, addr2Signer] = await ethers.getSigners()
    owner = ownerSigner.address
    addr1 = addr1Signer.address
    addr2 = addr2Signer.address

    // Deploy the contract t3BTC - base token for mint/burn into lelonBTC
    const t3BTCContract = await ethers.getContractFactory('t3BTC')
    t3BTC = await t3BTCContract.deploy(owner, 't3BTC', 't3BTC')

    // Deploy the contract
    const lelonBTCContract = await ethers.getContractFactory('lelonBTC')
    lelonBTC = await lelonBTCContract.deploy(owner, 'lelonBTC', 'lelonBTC')

    // Mint 1 t3BTC for the owner
    const mintAmount = ethers.utils.parseUnits('1', 18)
    await t3BTC.mint(addr1, mintAmount)

    // Set t3BTC as the minting base to lelonBTC
    await lelonBTC.setWBTCAddress(t3BTC.address)

    expect(await t3BTC.balanceOf(addr1)).to.equal('1000000000000000000')
    expect(await lelonBTC.getWBTCAddress()).to.equal(t3BTC.address)
  })

  it('Should allow the holder to mint & burn lelonBTC', async function () {
    const mintAmount = ethers.utils.parseUnits('0.5', 18)
    expect(await lelonBTC.balanceOf(addr1)).to.equal('0')
    expect(await t3BTC.balanceOf(addr1)).to.equal('1000000000000000000')

    // Set the allowance for the contract to spend the t3BTC
    await t3BTC.connect(addr1Signer).approve(lelonBTC.address, mintAmount)

    expect(await lelonBTC.connect(addr1Signer).mint(mintAmount))
      .to.emit(lelonBTC, 'Transfer')
      .withArgs(ethers.constants.AddressZero, owner, mintAmount)

    expect(await lelonBTC.balanceOf(addr1)).to.equal('500000000000000000')
    expect(await t3BTC.balanceOf(addr1)).to.equal('500000000000000000')

    // Try to burn the lelonBTC and expect the same amount of t3BTC back in the wallet
    const burnAmount = ethers.utils.parseUnits('0.25', 18)
    await lelonBTC.connect(addr1Signer).approve(lelonBTC.address, burnAmount)
    expect(await lelonBTC.connect(addr1Signer).burn(burnAmount))
      .to.emit(lelonBTC, 'Transfer')
      .withArgs(owner, ethers.constants.AddressZero, burnAmount)

    expect(await lelonBTC.balanceOf(addr1)).to.equal('250000000000000000')
    expect(await t3BTC.balanceOf(addr1)).to.equal('750000000000000000')
  })
})
