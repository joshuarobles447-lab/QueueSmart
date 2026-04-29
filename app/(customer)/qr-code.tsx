import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import QRCode from 'react-native-qrcode-svg';
import { Colors } from '@/constants/colors';
import Logo from '@/components/Logo';

export default function QRCodeScreen() {
  const router = useRouter();
  const [ticket, setTicket] = useState('A-001');

  useEffect(() => {
    const generated = `A-${Math.floor(100 + Math.random() * 900)}`;
    setTicket(generated);
  }, []);

  const handleRefresh = () => {
    const generated = `A-${Math.floor(100 + Math.random() * 900)}`;
    setTicket(generated);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.logoRow}>
          <Logo size="small" />
        </View>

        <Text style={styles.title}>Your QR Code</Text>

        <View style={styles.qrBox}>
          <QRCode
            value={`SMARTQUEUE:${ticket}`}
            size={220}
            backgroundColor="white"
            color="black"
          />
        </View>

        <Text style={styles.ticketText}>{ticket}</Text>

        <TouchableOpacity style={styles.button} onPress={handleRefresh} activeOpacity={0.85}>
          <Text style={styles.buttonText}>Generate new code</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/(customer)/qr-scan')} activeOpacity={0.85}>
          <Text style={styles.linkButtonText}>Open scan screen</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  logoRow: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  title: {
    color: Colors.white,
    fontSize: 22,
    fontFamily: 'Poppins-Bold',
    marginBottom: 20,
  },
  qrBox: {
    backgroundColor: Colors.white,
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
  },
  ticketText: {
    color: Colors.grayLight,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 24,
  },
  button: {
    backgroundColor: Colors.teal,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  linkButton: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  linkButtonText: {
    color: Colors.grayLight,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});