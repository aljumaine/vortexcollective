// need to set up the web3 library first //
const web3 = new Web3(Web3.givenProvider)

// need to select the form in the page where folks can donate funds //
const form = document.querySelector("form")

// need to make an async function that needs an amount in ETH to be passed for donations.//
const send = async function (amount) {
 
  // get a list of accounts from metamask
  const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

  // now need to turn the amount into the base unit of currency,
  const wei = web3.utils.toWei(amount, "ether")
  
  // if at least one account is connected to a wallet then allow them to donate
  if (accounts.length > 0) {
    // set up a transaction from logged in account to transfer funds from the signed in wallet
    // to a set amount, with the value in hex format.
    window.ethereum.request({ 
      method: "eth_sendTransaction",
      params: [{
        from: accounts[0],
        to: "enter in the wallet address here where the funds can be sent. Have removed as this is a prototype.",
        value: web3.utils.toHex(wei)
      }]
    })
  }
}

// only show the form if theres a wallet
if (window.ethereum) {
  form.classList.add("has-eth")
}

// Now need to set up a listener for the form submission
form.addEventListener("submit", function (event) {

  event.preventDefault()

  // if a wallet installed via a browser add on
  if (window.ethereum) {
    // get the input and pass to send function
    const input = form.querySelector("input")
    send(input.value)
  } else {
    // pop up an install alert
    alert("Please install a wallet")
  }
})