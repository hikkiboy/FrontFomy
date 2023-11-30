import { ActivityIndicator, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Loading() {
    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <ActivityIndicator size={120} color={"#70d872"} />
            <Text style={{ marginTop: 10, fontSize: 20, textAlign: 'center', width: "90%" }} >Carregando...</Text>
        </SafeAreaView>
    )
}