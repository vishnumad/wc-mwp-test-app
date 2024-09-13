import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@walletconnect/react-native-compat";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { base, mainnet } from "viem/chains";
import { WagmiProvider } from "wagmi";
import Home from "./home";

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

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
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
  return (
    <Web3ModalProvider>
      <Home />
    </Web3ModalProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
