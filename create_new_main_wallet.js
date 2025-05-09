const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');

// Buat folder untuk menyimpan wallet
const folderPath = './main_solana_wallets';
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

for (let i = 0; i < 1; i++) {
  const keypair = solanaWeb3.Keypair.generate();

  const publicKey = keypair.publicKey.toBase58();
  const secretKey = Buffer.from(keypair.secretKey).toString('base64');

  const walletData = {
    publicKey,
    secretKey
  };

  fs.writeFileSync(`${folderPath}/wallet_${i + 1}.json`, JSON.stringify(walletData, null, 2));

  console.log(`Wallet ${i + 1}: ${publicKey}`);
}
