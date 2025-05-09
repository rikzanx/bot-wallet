const solanaWeb3 = require('@solana/web3.js');
const fs = require('fs');

// Baca wallet utama
const mainWalletData = JSON.parse(fs.readFileSync('main_wallet.json', 'utf-8'));
const publicKey = new solanaWeb3.PublicKey(mainWalletData.publicKey);

// Koneksi ke jaringan
const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('mainnet-beta'), 'confirmed');

(async () => {
  try {
    const balanceLamports = await connection.getBalance(publicKey);
    const balanceSOL = balanceLamports / solanaWeb3.LAMPORTS_PER_SOL;

    console.log(`💰 Saldo wallet utama (${publicKey.toBase58()}): ${balanceSOL} SOL`);
  } catch (error) {
    console.error('❌ Gagal mengambil saldo:', error.message);
  }
})();
