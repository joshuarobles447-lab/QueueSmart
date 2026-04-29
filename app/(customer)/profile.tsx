import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Colors } from '@/constants/colors';
import { useApp, useT } from '@/context/AppContext';
import Logo from '@/components/Logo';
import { supabase } from '@/lib/supabase';

interface ProfileData {
  full_name: string | null;
  phone: string | null;
  email: string | null;
  role: string | null;
}

export default function ProfileScreen() {
  const router = useRouter();
  const t = useT();
  const { ticketNumber, queuePosition } = useApp();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      setLoading(true);
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      if (sessionError || !userId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, phone, role')
        .eq('id', userId)
        .single();

      if (error) {
        console.log('Failed to load profile:', error.message);
      }

      setProfile(data ?? null);
      setLoading(false);
    }

    loadProfile();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.logoRow}>
        <Logo size="small" />
      </View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
          <ArrowLeft color={Colors.white} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.profileCard}>
          <Text style={styles.profileName}>
            {loading ? 'Loading...' : profile?.full_name ?? 'Guest User'}
          </Text>
          <Text style={styles.profileSubtitle}>
            {profile?.role === 'staff' ? 'Staff Account' : 'Customer Account'}
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.cardTitle}>Account Details</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Full Name</Text>
            <Text style={styles.infoValue}>{profile?.full_name ?? 'Unknown'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Phone Number</Text>
            <Text style={styles.infoValue}>{profile?.phone ?? 'Not set'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{profile?.email ?? 'Not set'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Current Ticket</Text>
            <Text style={styles.infoValue}>{ticketNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Queue Position</Text>
            <Text style={styles.infoValue}>{queuePosition}</Text>
          </View>
        </View>

        <View style={styles.actionsCard}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push('/(customer)/notification-settings')}
            activeOpacity={0.8}
          >
            <Text style={styles.actionButtonText}>{t('notificationSettings')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
            <Text style={styles.actionButtonText}>Edit Profile</Text>
          </TouchableOpacity>
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
  logoRow: {
    paddingHorizontal: 16,
    marginTop: 12,
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  scroll: { padding: 16, paddingBottom: 40 },
  profileCard: {
    backgroundColor: Colors.teal,
    borderRadius: 18,
    padding: 24,
    marginBottom: 20,
    alignItems: 'center',
  },
  profileName: {
    color: Colors.white,
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    marginBottom: 6,
  },
  profileSubtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  detailsCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  cardTitle: {
    color: Colors.white,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  infoLabel: {
    color: Colors.grayLight,
    fontSize: 13,
    fontFamily: 'Poppins-Regular',
  },
  infoValue: {
    color: Colors.white,
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
  },
  actionsCard: {
    gap: 12,
  },
  actionButton: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  actionButtonText: {
    color: Colors.teal,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
});
