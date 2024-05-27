import { FlatList, Image, Text, TouchableOpacity, View, StyleSheet } from "react-native"

export default function LazyList({ data, update }) {
    return (
        <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEnabled={true}
            renderItem={({ item }) => (
                <View>
                    <TouchableOpacity onPress={() => update(item.Imagem, item.Posição)}>
                        <Image style={{ height: 100, width: 100, resizeMode: 'contain' }} source={{ uri: item.Icone != undefined ? item.Icone : item.Imagem }}></Image>
                    </TouchableOpacity>
                </View>
            )}
            ItemSeparatorComponent={<View style={{ width: 20, height: 20 }} />}
        />
    )
}

const styles = StyleSheet.create({
})