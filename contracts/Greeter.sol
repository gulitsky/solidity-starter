// SPDX-License-Identifier: ISC
pragma solidity 0.8.4;

import "hardhat/console.sol";

/// @dev Thrown when trying to set the greeting with zero length.
error ZeroLengthGreeting();

/// @title Simple greeter smart contract
/// @author Andrey Gulitsky <angulitsky@gmail.com>
contract Greeter {
    string private greeting;

    constructor(string memory _greeting) {
        console.log("Deploying a Greeter with greeting '%s'", _greeting);
        greeting = _greeting;
    }

    function setGreeting(string memory _greeting) external {
        if (bytes(_greeting).length == 0) {
            revert ZeroLengthGreeting();
        }
        console.log("Changing greeting from '%s' to '%s'", greeting, _greeting);
        greeting = _greeting;
    }

    function greet() external view returns (string memory) {
        return greeting;
    }
}
