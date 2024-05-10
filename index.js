import chalk from "chalk";
import { Wallet, ethers } from "ethers";
import { appendFileSync } from "fs";
import moment from "moment";
import readlineSync from "readline-sync";

function createAccountETH() {
  const wallet = ethers.Wallet.createRandom();
  const privateKey = wallet.privateKey;
  const publicKey = wallet.publicKey;
  const mnemonicKey = wallet.mnemonic.phrase;

  return { privateKey, publicKey, mnemonicKey };
}

(async () => {
  try {
    const totalWallet = readlineSync.question(chalk.blue("How many wallets do you want to make: "));

    let count = 1;

    if (totalWallet > 1) {
      count = totalWallet;
    }

    while (count > 0) {
      const createWalletResult = createAccountETH();
      const theWallet = new Wallet(createWalletResult.privateKey);

      if (theWallet) {
        appendFileSync("./result.txt", `Address: ${theWallet.address} | Private Key: ${createWalletResult.privateKey} | Mnemonic: ${createWalletResult.mnemonicKey}\n`);
        console.log(chalk.green(`[${moment().format("HH:mm:ss")}] => ` + "Wallet created...! Your address: " + theWallet.address));
      }

      count--;
    }

    setTimeout(() => {
      console.log(chalk.green("All wallets have been created. Check result.txt to check your results (the address, mnemonic, and private key)."));
    }, 3000);
    return;
  } catch (error) {
    console.log(chalk.red("Your program Error! Message: " + error));
  }
})();
