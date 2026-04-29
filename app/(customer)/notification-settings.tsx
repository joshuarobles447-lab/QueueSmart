import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Switch,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useApp, useT } from '@/context/AppContext';

export default function NotificationSettingsScreen() {
  const router = useRouter();
  const t = useT();
  const {
    noShowAlertsEnabled,
    setNoShowAlertsEnabled,
    queueFullAlertsEnabled,
    setQueueFullAlertsEnabled,
    calledToCounterEnabled,
    setCalledToCounterEnabled,
    secondLineEnabled,
    setSecondLineEnabled,
  } = useApp();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
          <ArrowLeft color={Colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('notificationSettings')}</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notification Preferences</Text>
          <Text style={styles.cardSubtitle}>
            Choose which queue updates you want to receive.
          </Text>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Called to counter</Text>
              <Text style={styles.settingDescription}>
                Receive an alert when your number is called.
              </Text>
            </View>
            <Switch
              value={calledToCounterEnabled}
              onValueChange={setCalledToCounterEnabled}
              thumbColor={Colors.card}
              trackColor={{ false: Colors.border, true: Colors.teal }}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Second line alerts</Text>
              <Text style={styles.settingDescription}>
                Keep updated when you are next in line.
              </Text>
            </View>
            <Switch
              value={secondLineEnabled}
              onValueChange={setSecondLineEnabled}
              thumbColor={Colors.card}
              trackColor={{ false: Colors.border, true: Colors.teal }}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>Queue full alerts</Text>
              <Text style={styles.settingDescription}>
                Be notified when queue capacity is reached.
              </Text>
            </View>
            <Switch
              value={queueFullAlertsEnabled}
              onValueChange={setQueueFullAlertsEnabled}
              thumbColor={Colors.card}
              trackColor={{ false: Colors.border, true: Colors.teal }}
            />
          </View>

          <View style={styles.settingRow}>
            <View>
              <Text style={styles.settingLabel}>No-show alerts</Text>
              <Text style={styles.settingDescription}>
                Get updates when a customer does not show up.
              </Text>
            </View>
            <Switch
              value={noShowAlertsEnabled}
              onValueChange={setNoShowAlertsEnabled}
              thumbColor={Colors.card}
              trackColor={{ false: Colors.border, true: Colors.teal }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  scroll: { padding: 16, paddingBottom: 40 },
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardTitle: {
    color: Colors.white,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
  },
  cardSubtitle: {
    color: Colors.gray,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
  },
  settingLabel: {
    color: Colors.white,
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  settingDescription: {
    color: Colors.gray,
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    lineHeight: 18,
    maxWidth: 240,
  },
});
