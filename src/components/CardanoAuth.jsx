// import React, { useState, useEffect } from 'react';
// import { Buffer } from 'buffer';
// import { AlertCircle, CheckCircle2, Wallet } from 'lucide-react';
// import { Alert, AlertDescription } from '@/components/ui/alert';

// const CardanoAuth = () => {
//   const [walletAPI, setWalletAPI] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [walletData, setWalletData] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Check for Cardano wallet on component mount
//     const checkWallet = () => {
//       if (window.cardano) {
//         setWalletAPI(window.cardano);
//       } else {
//         setError('No Cardano wallet detected. Please install a wallet extension.');
//       }
//     };

//     checkWallet();
//   }, []);

//   const generateAuthMessage = () => {
//     const timestamp = Date.now();
//     return `Authenticate with your Cardano wallet\nTimestamp: ${timestamp}`;
//   };

//   const connectWallet = async () => {
//     setLoading(true);
//     setError(null);

//     try {
//       if (!walletAPI) {
//         throw new Error('No Cardano wallet found');
//       }

//       // Enable the wallet
//       const wallet = await walletAPI.enable();
      
//       // Get network ID and address
//       const networkId = await wallet.getNetworkId();
//       const usedAddresses = await wallet.getUsedAddresses();
//       const address = usedAddresses[0];

//       // Generate and sign message
//       const message = generateAuthMessage();
//       const signature = await wallet.signData(
//         address,
//         Buffer.from(message).toString('hex')
//       );

//       const publicKey = await wallet.getPublicKey();

//       // Store wallet data
//       const authData = {
//         address,
//         networkId,
//         signature,
//         message,
//         publicKey,
//         timestamp: Date.now()
//       };

//       setWalletData(authData);
//       setIsConnected(true);
//       sessionStorage.setItem('wallet_auth', JSON.stringify(authData));

//     } catch (error) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const disconnectWallet = () => {
//     setWalletData(null);
//     setIsConnected(false);
//     sessionStorage.removeItem('wallet_auth');
//   };

//   // Format address for display
//   const formatAddress = (address) => {
//     if (!address) return '';
//     return `${address.slice(0, 8)}...${address.slice(-8)}`;
//   };

//   return (
//     <div className="w-full max-w-md mx-auto p-6 space-y-4">
//       {error && (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {!isConnected ? (
//         <button
//           onClick={connectWallet}
//           disabled={loading || !walletAPI}
//           className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg 
//             ${loading || !walletAPI 
//               ? 'bg-gray-300 cursor-not-allowed' 
//               : 'bg-blue-600 hover:bg-blue-700'} 
//             text-white font-medium transition-colors`}
//         >
//           <Wallet className="h-5 w-5" />
//           {loading ? 'Connecting...' : 'Connect Wallet'}
//         </button>
//       ) : (
//         <div className="space-y-4">
//           <Alert>
//             <CheckCircle2 className="h-4 w-4 text-green-500" />
//             <AlertDescription className="text-green-600">
//               Wallet connected successfully
//             </AlertDescription>
//           </Alert>

//           <div className="bg-gray-50 p-4 rounded-lg space-y-2">
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600">Address:</span>
//               <span className="text-sm font-mono">
//                 {formatAddress(walletData?.address)}
//               </span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-sm text-gray-600">Network:</span>
//               <span className="text-sm">
//                 {walletData?.networkId === 0 ? 'Testnet' : 'Mainnet'}
//               </span>
//             </div>
//           </div>

//           <button
//             onClick={disconnectWallet}
//             className="w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 
//               text-white font-medium transition-colors"
//           >
//             Disconnect Wallet
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CardanoAuth;