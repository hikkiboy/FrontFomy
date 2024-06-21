import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'

export default function LazyList({ data, update }) {
    return (
        <View >
            <FlatList
                data={data}
                horizontal
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: 'row' }} >
                        {index === 0 &&
                            <TouchableOpacity activeOpacity={0.8} style={{ height: 100, width: 100, alignItems: 'center', justifyContent: 'center' }} onPress={() => update(item.Posição === 0 ? "chef" : "", item.Posição)}>
                                <FontAwesome6 name={"xmark"} color={"#FA787D"} size={75} />
                            </TouchableOpacity>
                        }
                        <TouchableOpacity activeOpacity={0.8} onPress={() => update(item.Imagem, item.Posição)}>
                            <Image style={{ height: 100, width: 100, resizeMode: 'contain' }} source={{ uri: item.Icone != undefined ? item.Icone : item.Imagem }} />
                        </TouchableOpacity>
                    </View>
                )}
                ItemSeparatorComponent={<View style={{ width: 20, height: 20 }} />}
            />
        </View>
    )
}