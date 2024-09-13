import { W3mButton } from "@web3modal/wagmi-react-native";
import { View } from "react-native";

export default function Home() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <W3mButton />
    </View>
  );
}
