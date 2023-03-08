const Storage = artifacts.require("Storage.sol");

contract("Storage", () => {
  let storage;
  before(async () => {
    storage = await Storage.deployed();
  });

  it("should set the number", async () => {
    await storage.setter(30);
    const number = await storage.getter();
    assert(number.toNumber() == 30);
  });
});
