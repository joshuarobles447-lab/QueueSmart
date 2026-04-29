import React, { useEffect, useState } from 'react';
import {
  Alert,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Camera } from 'expo-camera';
import { Colors } from '@/constants/colors';
import { useT } from '@/context/AppContext';
import Logo from '@/components/Logo';
import { supabase } from '@/lib/supabase';

const CameraView = Camera as any;

export default function QRScanScreen() {
  const t = useT();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    setIsSaving(true);

    const ticket = data.startsWith('SMARTQUEUE:') ? data.split(':')[1] : data;
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    if (sessionError || !userId) {
      setIsSaving(false);
      Alert.alert('Error', 'Unable to record scan. Please log in again.');
      return;
    }

    const { error } = await supabase.from('queue_entries').insert({
      user_id: userId,
      ticket,
      status: 'waiting',
    });

    setIsSaving(false);

    if (error) {
      Alert.alert('Error', 'Unable to save scanned ticket: ' + error.message);
      return;
    }

    setScanResult(ticket);
    Alert.alert('Scan recorded', `Ticket saved: ${ticket}`);
  };

  const handleScanAgain = () => {
    setScanned(false);
    setScanResult(null);
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.message}>Requesting camera permission...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.message}>Camera access is required to scan QR codes.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.logoRow}>
          <Logo size="small" />
        </View>

        <Text style={styles.title}>{t('scanQr')}</Text>

        <CameraView
          style={styles.camera}
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.scanFrame} />
        </CameraView>

        <Text style={styles.scanText}>
          {scanned ? `Scanned: ${scanResult ?? 'unknown'}` : 'Point the camera at a QR code'}
        </Text>

        {scanned && (
          <TouchableOpacity style={styles.scanAgainButton} onPress={handleScanAgain} activeOpacity={0.85}>
            <Text style={styles.scanAgainText}>Scan again</Text>
          </TouchableOpacity>
        )}

        {isSaving && <Text style={styles.savingText}>Saving scan...</Text>}
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
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  camera: {
    width: '100%',
    height: 360,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  scanFrame: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.teal,
    margin: 48,
    borderRadius: 16,
  },
  scanText: {
    color: Colors.grayLight,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    marginBottom: 16,
  },
  scanAgainButton: {
    backgroundColor: Colors.teal,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  scanAgainText: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  savingText: {
    color: Colors.gray,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    marginTop: 10,
  },
  message: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});
