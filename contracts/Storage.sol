// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Storage {
    uint256 number;

    function setter(uint256 _number) external {
        number = _number;
    }

    function getter() external view returns (uint256) {
        return number;
    }
}
// contract address 0x747D5612a862DCdCd08f7170f69b2b11763d5E9A
