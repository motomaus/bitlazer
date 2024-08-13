let account;

async function connectMetaMask() {
    if (window.ethereum) {
        try {
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
            document.getElementById('accountDisplay').innerText = `Connected: ${account}`;
        } catch (error) {
            console.error('User rejected the request.');
        }
    } else {
        alert('MetaMask is not installed.');
    }
}

async function callContractFunction(functionName, amount) {
    const contractAddress = 'YOUR_CONTRACT_ADDRESS';
    const abi = [ /* YOUR_CONTRACT_ABI */ ];

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, contractAddress);

    try {
        await contract.methods[functionName](amount).send({ from: account });
        alert(`${functionName} successful`);
    } catch (error) {
        console.error(error);
        alert('Transaction failed');
    }
}

document.getElementById('connectButton').onclick = connectMetaMask;

document.getElementById('mintButton').onclick = () => {
    const amount = document.getElementById('amount').value;
    callContractFunction('mint', amount);
};

document.getElementById('burnButton').onclick = () => {
    const amount = document.getElementById('amount').value;
    callContractFunction('burn', amount);
};

document.getElementById('bridgeButton').onclick = () => {
    const amount = document.getElementById('amount').value;
    callContractFunction('bridge', amount);
};
