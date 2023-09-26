import {View, Text, Button} from 'react-native'
import { app_auth } from '../../../firebaseConfig'

const Home = ({navigation}) => {
    return (
        <View>

            <Text>Email: {app_auth.currentUser.email}</Text>
            <Button onPress={() => app_auth.signOut()} title = "Sair"/>
            <Button onPress={() => navigation.navigate('Fetch')} title = "Trilhas"/>

        </View>
    )
}

export default Home