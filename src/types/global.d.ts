interface MartianWallet {
  connect: () => Promise<{
    status: number;
    data: {
      address: string;
    };
  }>;
  // Add other methods as needed
}

declare interface Window {
  martian?: MartianWallet;
}

// types/window.d.ts
interface WalletData {
  address: string;
}

interface WalletResponse {
  status: number;
  data: WalletData;
}

interface MartianWallet {
  connect: () => Promise<WalletResponse>;
  // Add other methods as needed
}

declare global {
  interface Window {
    martian?: MartianWallet;
  }
}

export {};