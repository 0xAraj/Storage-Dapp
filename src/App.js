import React, { useState } from "react";
import Web3 from "web3";
import loadContract from "./contracts/loadContract";

function App() {
  const [input, setInput] = useState("");
  const [number, setNumber] = useState("");
  const [accounts, setAccounts] = useState("");
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const connectWalletHandler = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const web3 = new Web3(window.ethereum);
        setAccounts(accounts[0]);
        setWeb3(web3);
        const contract = loadContract(web3);
        setContract(contract);
      } catch (error) {
        setError(error.message);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  const getNumberHandler = async () => {
    const getNumber = await contract.methods.getter().call();
    console.log(getNumber);
    setNumber(getNumber);
  };

  const setNumberHandler = async (e) => {
    e.preventDefault();
    try {
      await contract.methods.setter(input).send({ from: accounts });
      setInput("");
      setSuccessMsg("Transaction Successful");
    } catch (error) {
      setError("User denied transaction signature");
    }
  };
  return (
    <section className="container">
      <div className="d-flex justify-content-between align-align-items-center py-4">
        <h1 className="">Simple Storage Dapps</h1>
        <button
          type="button"
          class="btn btn-primary my-1"
          onClick={connectWalletHandler}
        >
          {accounts
            ? `Connected : ${accounts.substring(0, 6)}...${accounts.substring(
                38
              )}`
            : "Connect Wallet"}
        </button>
      </div>
      <div class="mb-3 w-50">
        <label for="exampleInputEmail1" class="form-label">
          Enter Value
        </label>
        <input
          type="number"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button type="submit" class="btn btn-primary" onClick={setNumberHandler}>
        Set Number
      </button>
      <br />
      <button
        type="submit"
        class="btn btn-primary my-3"
        onClick={getNumberHandler}
      >
        Get Number
      </button>
      <p>{`Number is : ${number}`} </p>
      <p className="text-danger bold">{error}</p>
      <p className="text-success bold">{successMsg}</p>
    </section>
  );
}

export default App;
