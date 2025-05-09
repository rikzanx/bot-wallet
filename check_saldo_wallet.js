const { Connection, PublicKey } = require('@solana/web3.js');
const fs = require('fs');

const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  for (let i = 1; i <= 100; i++) {
    try {
      const walletData = JSON.parse(fs.readFileSync(`solana_wallets/wallet_${i}.json`));
      const publicKey = new PublicKey(walletData.publicKey);
      const balance = await connection.getBalance(publicKey);
      console.log(`Saldo SOL (${publicKey}): ${balance / 1e9} SOL`);
    } catch (err) {
      console.error(`Wallet ${i} error: ${err.message}`);
    }
    await sleep(300);
  }
})();
