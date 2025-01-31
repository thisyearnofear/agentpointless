"use client";

import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { ReactNode, useEffect } from "react";

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const init = async () => {
      const bitteWallet = setupBitteWallet({
        walletUrl: "https://wallet.bitte.ai",
      });

      const selector = await setupWalletSelector({
        network: "mainnet",
        modules: [bitteWallet],
      });

      // Store the selector instance if needed
      (window as any).selector = selector;
    };

    init().catch(console.error);
  }, []);

  return <>{children}</>;
}
