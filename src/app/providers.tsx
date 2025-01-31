"use client";

import {
  setupWalletSelector,
  WalletSelector,
} from "@near-wallet-selector/core";
import { setupBitteWallet } from "@near-wallet-selector/bitte-wallet";
import { ReactNode, useEffect } from "react";

interface ExtendedWindow extends Window {
  selector?: WalletSelector;
}

declare const window: ExtendedWindow;

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    const init = async () => {
      try {
        console.log("Initializing Bitte wallet...");
        const bitteWallet = setupBitteWallet({
          walletUrl: "https://wallet.bitte.ai",
        });
        console.log("Bitte wallet setup complete");

        console.log("Setting up wallet selector...");
        const selector = await setupWalletSelector({
          network: "mainnet",
          modules: [bitteWallet],
          storage: {
            getItem: async (key: string) => {
              try {
                const value = window.localStorage.getItem(key);
                console.log("Getting storage item:", key, value);
                return value;
              } catch (error) {
                console.error("Error getting storage item:", error);
                return null;
              }
            },
            setItem: async (key: string, value: string) => {
              try {
                console.log("Setting storage item:", key, value);
                window.localStorage.setItem(key, value);
              } catch (error) {
                console.error("Error setting storage item:", error);
                console.warn("Failed to set item in localStorage");
              }
            },
            removeItem: async (key: string) => {
              try {
                console.log("Removing storage item:", key);
                window.localStorage.removeItem(key);
              } catch (error) {
                console.error("Error removing storage item:", error);
                console.warn("Failed to remove item from localStorage");
              }
            },
          },
        });
        console.log("Wallet selector setup complete");

        // Store the selector instance
        window.selector = selector;
      } catch (err) {
        console.error("Failed to initialize wallet selector:", err);
      }
    };

    init();
  }, []);

  return <>{children}</>;
}
