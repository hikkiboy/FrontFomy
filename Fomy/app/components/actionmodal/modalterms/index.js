import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Linking, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


export function ModalTerm({ handleCloseModal }) {
    return (
        <View>
            <View style={styles.backarea}>
                <TouchableOpacity activeOpacity={0.8} onPress={handleCloseModal} style={{ zIndex: 99 }}>
                    <View style={[styles.backiconarea, { backgroundColor: "#fa787d" }]} >
                        <FontAwesome size={30} color={"#FFF"} name='remove' />

                    </View>

                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.modal}>
                <View style={styles.container}>
                    <Image
                        style={styles.image}
                        source={require('../../../assets/betterAlberto.png')}
                    />
                    <Text style={styles.modalTitle}>Política de Privacidade</Text>
                </View>


                <Text style={styles.modalSub}>O que é LGPD?</Text>
                <Text style={styles.modalText}>A lei brasileira 13 709/2018, se consiste como a legislação brasileira que controla a privacidade e o uso/tratamento de dados pessoais.</Text>

                <Text style={styles.modalSub}>Como a LGPD se aplica no Fomy?</Text>
                <Text style={styles.modalText}>Como produtores e distribuidores de uma aplicação que será lançada para mobile via lojas de aplicativo (como Play Store e App Store), entregamos ao nosso usuário final um local seguro para realizar o download do Fomy, assegurando seu bem-estar e privacidade.</Text>
                <Text style={styles.modalText}>Como empresa, consideramos:</Text>
                <Text style={styles.modalText}>- Minimizar a coleta de dados, se atendo a dados necessários;</Text>
                <Text style={styles.modalText}>- Mapear os dados necessários, para um melhor gerenciamento das necessidades;</Text>
                <Text style={styles.modalText}>- Mostrar clareza e obter consentimento do usuário;</Text>
                <Text style={styles.modalText}>- Informar os usuários sobre práticas de segurança e privacidades utilizadas;</Text>
                <Text style={styles.modalText}>- Permitir que o usuário, podendo visualizá-los, modificá-los e deleta-los quando necessário.</Text>

                <Text style={styles.modalSub}>Quais dados coletamos?</Text>
                <Text style={styles.modalText}>Nós do Fomy, no momento, coletamos o e-mail do usuário durante o login e dados de interação com o app, caso disponibilizarmos o upgrade para Premium no app, precisaremos também coletar dados relacionados a pagamento, através do Google Play/App Store, caso o usuário compre o serviço.</Text>
                <Text style={styles.modalSubTwo}>Por que coletamos o email?</Text>
                <Text style={styles.modalText}>Coletamos o e-mail com o intuito de realizar o cadastro do usuário, criando um perfil e uma senha, salvando o progresso e informações do perfil, e permitindo outras funcionalidades, como “recuperar a senha”;</Text>
                <Text style={styles.modalSubTwo}>Dados coletados por terceiros</Text>
                <Text style={styles.modalText}>Como utilizamos o Firebase, serviço administrado pelo Google, é notável a possibilidade de uma extração de dados feita pelo próprio Google, com o objetivo de mapear dados para criação de algoritmos, por exemplo;</Text>
                <Text style={styles.modalSubTwo}>Google Analytics</Text>
                <Text style={styles.modalText}>Coletamos e analisamos certos comportamentos do usuário no aplicativo para podermos entender como melhorar a experiência do cliente;</Text>
                <Text style={styles.modalSubTwo}>Google Ads</Text>
                <Text style={styles.modalText}>O Google Ads exibirá anúncios customizados aos nossos usuários, através das métricas do próprio Google;</Text>
                <Text style={styles.modalSub}>Consentimento:</Text>
                <Text style={styles.modalText}>
                    Necessário usuário final consentir a utilização de seus dados coletados dentro do app (termo aparece ao realizar o cadastro no app).
                </Text>
                <Text style={styles.modalSub}>
                    Direitos do usuário:
                </Text>
                <Text style={styles.modalText}>
                    Caso o usuário deseje ter acesso ou deletar seus dados do Fomy ele poderá realizar esta ação na tela de configurações em “Deletar conta”, assim todos os seus dados relacionados ao aplicativo serão deletados do banco de dados, incluindo sua conta. Para acessar os dados coletados é necessário visualiza-los no documento de termos e condições.
                </Text>
                <Text style={styles.modalSub}>
                    Transparência:
                </Text>
                <Text style={styles.modalText}>
                    Mapeamento de todas as informações requisitadas, e sobre como dados são coletados, armazenados e utilizados pelo aplicativo.
                </Text>
                <Text style={styles.modalSub}>
                    Utilização de APIs de terceiros:
                </Text>
                <Text style={styles.modalText}>
                    Diversas funcionalidades dependem de APIs externas, o que nos limita no quesito controle de segurança.
                </Text>
                <Text style={styles.modalSub}>
                    Aprimoramento da segurança do app:
                </Text>
                <Text style={styles.modalText}>
                    Com o intuito de manter a segurança máxima do nosso aplicativo, temos como pontos de constante melhoria testar e mapear possíveis falhas de segurança, as quais podem evidenciar dados que não deveriam ser expostos.
                </Text>
                <Text style={styles.modalSub}>
                    Utilização de lojas online seguras:
                </Text>
                <Text style={styles.modalText}>
                    Como dito anteriormente, utilizaremos do Google Play e a App Store para a disponibilização do nosso aplicativo, visto que, tais lojas estão cada vez mais atentas com a conformidade da LGPD. Dentre medidas que essas lojas utilizam, podemos citar:
                </Text>
                <Text style={styles.modalText}>
                    - Revisão das políticas de privacidade dos aplicativos para verificar se estão em conformidade com a LGPD e as outras legislações aplicáveis;
                </Text>
                <Text style={styles.modalText}>
                    - Avaliação das práticas de coleta e tratamento de dados dos aplicativos para garantir que estejam alinhadas com os princípios da LGPD;
                </Text>
                <Text style={styles.modalText}>
                    - Exigência de que os desenvolvedores forneçam informações claras e transparentes sobre o uso dos dados dos usuários;
                </Text>
                <Text style={styles.modalText}>
                    - Implementação de diretrizes e recursos para ajudar os desenvolvedores a criar aplicativos em conformidade com a LGPD e outras leis de proteção de dados.
                </Text>

                {/* <TouchableOpacity style={styles.buttonRegistro} onPress={handleCloseModal}> */}
                <TouchableOpacity style={styles.buttonRegistro} onPress={() => Linking.openURL("https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.html&quot")}>
                    <Text style={styles.botaoTexto}>
                        Ver LGPD
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',

        backgroundColor: 'white',
        padding: 20,
    },
    modalText: {
        marginBottom: 20,
        fontSize: 16,
        lineHeight: 24,
        color: '#505050',
        fontFamily: "PoppinsRegular",

    },
    buttonRegistro: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        padding: 13,
        paddingLeft: 40,
        paddingRight: 40,
        borderWidth: 4,
        borderBottomWidth: 8,
        marginTop: 30,
        marginBottom: 5,
        borderRadius: 15,
        width: "100%",
        backgroundColor: "#70d872",
        borderColor: "#5dc15f",
        marginBottom: 40
    },
    botaoTexto: {
        fontSize: 25,
        textAlign: 'center',
        color: "#505050",
        fontFamily: "FredokaSemibold"
    },
    subtitulo: {

    },
    modalTitle: {
        marginBottom: 60,
        fontSize: 35,
        color: "#5dc15f",
        fontFamily: "FredokaBold",
        alignSelf: "center",
        textAlign: "center",
        marginTop: 30,
        flex: 1
    },
    modalSub: {
        marginBottom: 20,
        fontSize: 25,
        marginTop: 20,
        fontFamily: "FredokaSemibold",
        color: "#303030"
    },
    modalLink: {
        marginTop: 20,
        marginBottom: 5,
        fontSize: 23,
        color: "blue",
        textDecorationLine: "underline"
    },
    modalSubTwo: {
        fontFamily: "PoppinsMedium",
        marginBottom: 20,
        fontSize: 16
    },
    backiconarea: {
        padding: 7,
        paddingHorizontal: 9,
        position: 'absolute',
        zIndex: 99,
        top: 15,
        right: 13,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100
    },
    textbutton: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        color: "#000"
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    image: {
        width: 108,
        height: 139,
        marginRight: 5,
        marginBottom: 50
    },


});