"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useAgentId } from "./hooks/useAgentId";
import type { WalletSelector, Wallet } from "@near-wallet-selector/core";

// Dynamically import the chat component with no SSR
const BitteAiChat = dynamic(
  () => import("@bitte-ai/chat").then((mod) => mod.BitteAiChat),
  { ssr: false }
);

export default function Home() {
  const agentId = useAgentId();
  const [selector, setSelector] = useState<WalletSelector | null>(null);
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined);

  useEffect(() => {
    // Get the selector instance from window
    const sel = (window as { selector?: WalletSelector }).selector;
    if (sel) {
      console.log("Selector configuration:", {
        config: process.env.BITTE_CONFIG,
        parsed: process.env.BITTE_CONFIG
          ? JSON.parse(process.env.BITTE_CONFIG)
          : null,
      });
      setSelector(sel);
    }
  }, []);

  useEffect(() => {
    const setupWallet = async () => {
      if (selector) {
        const walletInstance = await selector.wallet();
        setWallet(walletInstance);
      }
    };
    setupWallet();
  }, [selector]);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-3xl font-bold">Pointless Agent</h1>
          <p className="text-gray-600 mt-2">
            The first social token on Lens, $pointless ... until it isn&apos;t
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-12">
          {/* Chat Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[600px]">
            <Suspense fallback={<div className="p-4">Loading chat...</div>}>
              {agentId ? (
                <BitteAiChat
                  agentId={agentId}
                  apiUrl="/api/chat"
                  colors={{
                    generalBackground: "#ffffff",
                    messageBackground: "#f3f4f6",
                    textColor: "#111827",
                    buttonColor: "#3b82f6",
                    borderColor: "#e5e7eb",
                  }}
                  wallet={{ near: { wallet } }}
                />
              ) : (
                <div className="p-4">Connecting to agent...</div>
              )}
            </Suspense>
          </div>

          {/* Info Section */}
          <div className="space-y-8">
            {/* Contract Addresses */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Contract Addresses</h2>
              <div className="space-y-2 text-sm">
                <p className="font-mono bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Base:</span>
                  <br />
                  0xaF13924f23Be104b96c6aC424925357463b0d105
                </p>
                <p className="font-mono bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">ZK:</span>
                  <br />
                  0xFD21D5E148dF3B93AE6deC416544Fb3d3E21260C
                </p>
                <p className="font-mono bg-gray-50 p-2 rounded">
                  <span className="text-gray-500">Polygon:</span>
                  <br />
                  0x9B8cc6320F22325759B7D2CA5CD27347bB4eCD86
                </p>
              </div>
            </div>

            {/* Links */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Community</h2>
              <div className="space-y-2">
                <a
                  href="https://www.pointless.wtf/history"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 hover:bg-gray-50 rounded transition-colors"
                >
                  🌐 Website
                </a>
                <a
                  href="https://x.com/pointless_wtf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 hover:bg-gray-50 rounded transition-colors"
                >
                  𝕏 Twitter
                </a>
                <a
                  href="https://discord.com/invite/yPhqdRaCew"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 hover:bg-gray-50 rounded transition-colors"
                >
                  💬 Discord
                </a>
                <a
                  href="https://hey.xyz/u/pointless"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 hover:bg-gray-50 rounded transition-colors"
                >
                  👋 Hey.xyz
                </a>
                <a
                  href="https://orb.club/p/0x020d80-0xc3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 hover:bg-gray-50 rounded transition-colors"
                >
                  🔮 Orb Club
                </a>
                <a
                  href="http://pt-bridge-x9el.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 hover:bg-gray-50 rounded transition-colors"
                >
                  🌉 Bridge
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer with BitteAI Attribution */}
      <footer className="border-t border-gray-100 py-4 mt-auto">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-center space-x-2">
          <span className="text-sm text-gray-600">Built with</span>
          <a
            href="https://docs.bitte.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-gray-800 hover:text-blue-600 transition-colors"
          >
            <Image
              src="/images/bitte.png"
              alt="BitteAI"
              width={20}
              height={20}
              className="inline-block"
            />
            <span className="text-sm font-medium">BitteAI</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
