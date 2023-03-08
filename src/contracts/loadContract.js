import Storage from "./Storage.json";

const loadContract = (web3) => {
  const abi = Storage.abi;
  const contract = new web3.eth.Contract(
    abi,
    "0x747D5612a862DCdCd08f7170f69b2b11763d5E9A"
  );
  return contract;
};

export default loadContract;
