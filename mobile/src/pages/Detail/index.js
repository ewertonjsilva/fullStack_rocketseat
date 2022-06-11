import React from 'react';
import { Feather } from '@expo/vector-icons'; 
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native'; 
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logoMbl.png';

import styles from './styles';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;
    const message = 'Olá ' + incident.ong_nome + 
                    ', estou entrando em contato pois gostaria de ajudar no caso ' + 
                    incident.inc_titulo + ' com o valor de ' + 
                    Intl.NumberFormat('pt-BR', {
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(incident.inc_valor);

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: 'Herói do caso: ' + incident.inc_titulo, 
            recipients: [incident.ong_email], 
            body: message
        })
    }

    function sendWhatsapp() {
        Linking.openURL('whatsapp://send?phone='+ incident.ong_whatsapp + '&text='+ message);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={30} color="#E02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
                <Text style={styles.incidentValue}>
                    {incident.ong_nome} de {incident.ong_cidade}/{incident.ong_uf}
                </Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.inc_titulo}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>
                    {Intl.NumberFormat('pt-BR', {
                        style: 'currency', 
                        currency: 'BRL' 
                    }).format(incident.inc_valor)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

