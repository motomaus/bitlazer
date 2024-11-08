// contracts/ERC20Mock.sol
// SPDX-License-Identifier: MIT
pragma solidity 0.8.24;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";

contract ZBTC is ReentrancyGuardUpgradeable, AccessControlUpgradeable, ERC20Upgradeable {
    using SafeERC20 for IERC20;

    mapping(address => IERC20) public supportedWrappers;
    mapping(address => mapping(address => uint256)) internal holderBalances;

    bool public paused;
    bool public pausedExtraHolderBalance;

    uint256 public totalBridgeIn;
    uint256 public totalBridgeOut;

    IERC20 public sZBTC;

    function initialize(string memory name, string memory symbol, address _owner) public initializer {
        require(_owner != address(0), "Owner cannot be 0 address");
        __ERC20_init(name, symbol);
        __AccessControl_init();
        _grantRole(DEFAULT_ADMIN_ROLE, _owner);

        __ReentrancyGuard_init();

    }

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /// *** Modifiers ***
    modifier onlyOwner() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Only owner can call this function");
        _;
    }

    function setWBTCAddress(address _WBTC) public onlyOwner {
        supportedWrappers[_WBTC] = IERC20(_WBTC);
    }

    function removeWBTCAddress(address _WBTC) public onlyOwner {
        delete supportedWrappers[_WBTC];
    }

    function pause() public onlyOwner {
        paused = true;
    }

    function unpause() public onlyOwner {
        paused = false;
    }

    function pauseExtraHolderBalance() public onlyOwner {
        pausedExtraHolderBalance = true;
    }

    function unpauseExtraHolderBalance() public onlyOwner {
        pausedExtraHolderBalance = false;
    }

    function setSZBTCAddress(address _sZBTC) public onlyOwner {
        sZBTC = IERC20(_sZBTC);
    }

    function getWBTCAddress(address _WBTC) public view returns (address) {
        return address(supportedWrappers[_WBTC]);
    }

    function mint(uint256 amount, address _WBTC) public nonReentrant {
        require(!paused, "Contract paused");
        IERC20 WBTC = supportedWrappers[_WBTC];
        require(WBTC != IERC20(address(0)), "Wrapper not supported");
        holderBalances[msg.sender][_WBTC] += amount;
        _mint(msg.sender, amount);
        WBTC.safeTransferFrom(msg.sender, address(this), amount);
        totalBridgeIn += amount;
    }

    // If sufficient balance of sZBTC is not available, this function will fail
    // Otherwise, add the extra balance to the holder's balance in order to allow the extra stake accumulated to l3 withdrawals
    function addExtraHolderBalance(address _holder, uint256 amount, IERC20 _WBTC) public nonReentrant {
        require(!pausedExtraHolderBalance, "Extra holder balance paused");
        uint256 sZBTCBalance = sZBTC.balanceOf(_holder);
        require(sZBTCBalance >= amount, "Insufficient sZBTC balance");
        // Verify _WBTC is a supported wrapper
        require(supportedWrappers[address(_WBTC)] != IERC20(address(0)), "Wrapper not supported");
        holderBalances[_holder][address(_WBTC)] += amount;
        // Burn the sZBTC
        sZBTC.transferFrom(_holder, address(1), amount);
        // Mint the lBTC to the holder
        _mint(_holder, amount);
    }

    function burn(uint256 amount, address _WBTC) public nonReentrant {
        require(!paused, "Contract paused");
        IERC20 WBTC = supportedWrappers[_WBTC];
        require(WBTC != IERC20(address(0)), "Wrapper not supported");
        require(holderBalances[msg.sender][_WBTC] >= amount, "Insufficient balance in the wrapper holding");
        // Ensured that the user has enough balance in the wrapper holding so shouldn't fail
        holderBalances[msg.sender][_WBTC] -= amount;
        _burn(msg.sender, amount);
        WBTC.transfer(msg.sender, amount);
        totalBridgeOut += amount;
    }

    function getHolderBalance(address _holder, address _WBTC) public view returns (uint256) {
        return holderBalances[_holder][_WBTC];
    }
}
