import "@walletconnect/react-native-compat";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";

import { StyleSheet, Text, View } from "react-native";
import { base, mainnet } from "viem/chains";
import { WagmiProvider } from "wagmi";
import Home from "./home";
import { useEffect } from "react";
import * as Linking from "expo-linking";
import { handleResponse } from "@coinbase/wallet-mobile-sdk";
import { coinbaseConnector } from "@web3modal/coinbase-wagmi-react-native";

const queryClient = new QueryClient();

const projectId = "a92406c046fc759a9caf3773ea5a9d9d";

const metadata = {
  name: "WC-Mobile-Test",
  description: "WalletConnect Mobile Test App",
  url: "",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "wc-mobile-test://",
  },
};

const chains = [mainnet, base] as const;

const mwpConnector = coinbaseConnector({
  redirect: "wc-mobile-test://",
});

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  extraConnectors: [mwpConnector],
});

createWeb3Modal({
  projectId,
  wagmiConfig,
  defaultChain: mainnet,
});

function Web3ModalProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
        <Web3Modal />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default function App() {
  // handle MWP deeplinks
  useEffect(() => {
    const subscription = Linking.addEventListener("url", ({ url }) => {
      const handled = handleResponse(new URL(url));
      console.log("incoming deeplink:", { url, handled });
    });

    return () => subscription.remove();
  }, []);

  return (
    <Web3ModalProvider>
      <Home />
    </Web3ModalProvider>
  );
}
