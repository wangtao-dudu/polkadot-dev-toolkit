import { ApiPromise, WsProvider, Keyring } from '@polkadot/api';

// WebSocket provider (Polkadot mainnet RPC)
const WS_PROVIDER = 'wss://rpc.polkadot.io';

async function main() {
    // Connect to the Polkadot blockchain
    const provider = new WsProvider(WS_PROVIDER);
    const api = await ApiPromise.create({ provider });
    
    console.log('Connected to Polkadot network');

    // Example: Query the latest block number
    const lastHeader = await api.rpc.chain.getHeader();
    console.log(`Latest Block Number: ${lastHeader.number}`);

    // Example: Query an account balance
    const address = '14G7fjrD3zNtPy6LbB4yK83JxPi6pE2Jfpy7esvVWWYe4Fik'; // Replace with a valid Polkadot address
    const { data: balance } = await api.query.system.account(address);
    console.log(`Balance of ${address}: ${balance.free.toHuman()}`);

    // Example: Sending a transaction (requires a funded account)
    const keyring = new Keyring({ type: 'sr25519' });
    const sender = keyring.addFromUri('//Alice'); // Replace with actual private key

    const transfer = api.tx.balances.transfer('15ZtKxHVs4mFUzTDFK5BVHw6PbjRMWi4x8tkmUyGpxP3D6A8', 1000000000000);
    
    // Sign and send transaction
    const hash = await transfer.signAndSend(sender);
    console.log(`Transaction sent with hash: ${hash}`);
}

main().catch(console.error);
