import React from 'react';
import { ScrollView, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';

export function ModalTerm({ handleCloseModal }) {
    return (
        <ScrollView contentContainerStyle={styles.modal}>
            <Text style={styles.modalTitle}># Termos de Uso e condições</Text>
            <Text style={styles.modalText}>**Lei Geral de Proteção de Dados Pessoais (LGPD):** <Text style={{ color: 'blue' }} onPress={() => Linking.openURL("https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.html")}>
        https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.html
    </Text></Text>
            
            <Text style={styles.modalText}>### **O que é LGPD?**</Text>
            <Text style={styles.modalText}>A lei brasileira 13 709/2018, se consiste como a legislação brasileira que controla a privacidade e o uso/tratamento de dados pessoais.</Text>

            <Text style={styles.modalText}>### **Como a LGPD se aplica no Fomy?**</Text>
            <Text style={styles.modalText}>Como produtores e distribuidores de uma aplicação que será lançada para mobile via lojas de aplicativo (como Play Store e App Store), entregamos ao nosso usuário final um local seguro para realizar o download do Fomy, assegurando seu bem-estar e privacidade.</Text>
            <Text style={styles.modalText}>Como empresa, consideramos:</Text>
            <Text style={styles.modalText}>- Minimizar a coleta de dados, se atendo a dados necessários;</Text>
            <Text style={styles.modalText}>- Mapear os dados necessários, para um melhor gerenciamento das necessidades;</Text>
            <Text style={styles.modalText}>- Mostrar clareza e obter consentimento do usuário;</Text>
            <Text style={styles.modalText}>- Informar os usuários sobre práticas de segurança e privacidades utilizadas;</Text>
            <Text style={styles.modalText}>- Permitir que o usuário, podendo visualizá-los, modificá-los e deleta-los quando necessário.</Text>

            <Text style={styles.modalText}>### **Quais dados coletamos?**</Text>
            <Text style={styles.modalText}>Nós do Fomy, no momento, coletamos o e-mail do usuário durante o login e dados de interação com o app, caso disponibilizarmos o upgrade para Premium no app, precisaremos também coletar dados relacionados a pagamento, através do Google Play/App Store, caso o usuário compre o serviço.</Text>
            <Text style={styles.modalText}>- **Por que coletamos o email?**</Text>
            <Text style={styles.modalText}>Coletamos o e-mail com o intuito de realizar o cadastro do usuário, criando um perfil e uma senha, salvando o progresso e informações do perfil, e permitindo outras funcionalidades, como “recuperar a senha”;</Text>
            <Text style={styles.modalText}>- **Dados coletados por terceiros**</Text>
            <Text style={styles.modalText}>Como utilizamos o Firebase, serviço administrado pelo Google, é notável a possibilidade de uma extração de dados feita pelo próprio Google, com o objetivo de mapear dados para criação de algoritmos, por exemplo;</Text>
            <Text style={styles.modalText}>- **Google Analytics**</Text>
            <Text style={styles.modalText}>Coletamos e analisamos certos comportamentos do usuário no aplicativo para podermos entender como melhorar a experiência do cliente;</Text>
            <Text style={styles.modalText}>- **Google Ads**</Text>
            <Text style={styles.modalText}>O Google Ads exibirá anúncios customizados aos nossos usuários, através das métricas do próprio Google;</Text>
            <Text style={styles.modalText}>O Google Ads exibirá anúncios customizados aos nossos usuários, através das métricas do próprio Google;</Text>
            <Text style={styles.modalText}>- **Google Analytics**</Text>
            <Text style={styles.modalText}>Coletamos e analisamos certos comportamentos do usuário no aplicativo para podermos entender como melhorar a experiência do cliente;</Text>
            <Text style={styles.modalText}>- **Google Ads**</Text>
            <Text style={styles.modalText}>- O Google Ads exibirá anúncios customizados aos nossos usuários, através das métricas do próprio Google;</Text>
            <Text style={styles.modalText}>### **Consentimento**:</Text>
            <Text style={styles.modalText}>
            Necessário usuário final consentir a utilização de seus dados coletados dentro do app (termo aparece ao realizar o cadastro no app).
            </Text>
            <Text style={styles.modalText}>
            ### **Direitos do usuário:**
            </Text>
            <Text style={styles.modalText}>
            Caso o usuário deseje ter acesso ou deletar seus dados do Fomy ele poderá realizar esta ação na tela de configurações em “Deletar conta”, assim todos os seus dados relacionados ao aplicativo serão deletados do banco de dados, incluindo sua conta. Para acessar os dados coletados é necessário visualiza-los no documento de termos e condições.
            </Text>
            <Text style={styles.modalText}>
            ### **Transparência**:
            </Text>
            <Text style={styles.modalText}>
            Mapeamento de todas as informações requisitadas, e sobre como dados são coletados, armazenados e utilizados pelo aplicativo.
            </Text>
            <Text style={styles.modalText}>
            ### **Utilização de APIs de terceiros:**
            </Text>
            <Text style={styles.modalText}>
            Diversas funcionalidades dependem de APIs externas, o que nos limita no quesito controle de segurança.
            </Text>
            <Text style={styles.modalText}>
            ### **Aprimoramento da segurança do app:**
            </Text>
            <Text style={styles.modalText}>
            Com o intuito de manter a segurança máxima do nosso aplicativo, temos como pontos de constante melhoria testar e mapear possíveis falhas de segurança, as quais podem evidenciar dados que não deveriam ser expostos.
            </Text>
            <Text style={styles.modalText}>
            ### **Utilização de lojas online seguras:**
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
            

            <TouchableOpacity style={styles.buttonRegistro} onPress={handleCloseModal}>
                <Text style={styles.botaoTexto}>Fechar</Text>
            </TouchableOpacity>
        </ScrollView>
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
        
        color: '#333',
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
        marginTop: 20,
        marginBottom: 5,
        borderRadius: 15,
        width: 250,
    },
    botaoTexto: {
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center',
        color: "#000"
    },
    subtitulo:{

    },
    modalTitle:{
        marginBottom: 20,
        fontSize: 30,
       
        marginTop:20
    }
});


