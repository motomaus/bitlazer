// contracts/ERC20Mock.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract sZBTC is ERC20, Ownable {
    constructor(
        address _owner,
        string memory name,
        string memory symbol
    ) ERC20(name, symbol) {
        // Transfer ownership to the provided _owner address
        _transferOwnership(_owner);
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}
