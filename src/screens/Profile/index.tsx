import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../contexts/AuthContext';
import { theme } from '../../theme';
import { styles } from './styles';

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  
  const { user, signOut } = useAuth();

  const userProfile = {
    profession: 'Engenharia de Computação',
    phone: '(00) 90000-0000',
    memberSince: 'Fev 2026'
  };

  const favoriteProductsMock = [
    { id: '101', name: 'Furadeira de Impacto Bosch', price: 299.90 },
    { id: '102', name: 'Kit Chaves de Fenda 12 peças', price: 89.90 },
  ];

  const handleLogout = async () => {
    await signOut();
    navigation.goBack();
  };

  const renderFavoriteItem = ({ item }: { item: any }) => (
    <View style={styles.favoriteCard}>
      <View style={styles.favoriteImagePlaceholder}>
        <Feather name="image" size={24} color={theme.colors.textSecondary} />
      </View>
      <View style={styles.favoriteInfo}>
        <Text style={styles.favoriteName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.favoritePrice}>R$ {item.price.toFixed(2)}</Text>
      </View>
      <TouchableOpacity style={styles.favoriteIcon}>
        <Feather name="heart" size={20} color={theme.colors.primary} />
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Header do Perfil */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.name || 'Usuário Local'}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados Pessoais</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Feather name="briefcase" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.rowText}>{userProfile.profession}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Feather name="phone" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.rowText}>{userProfile.phone}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Feather name="calendar" size={20} color={theme.colors.textSecondary} />
            <Text style={styles.rowText}>Membro desde {userProfile.memberSince}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meus Favoritos</Text>
        <FlatList
          data={favoriteProductsMock}
          keyExtractor={(item) => item.id}
          renderItem={renderFavoriteItem}
          scrollEnabled={false}
        />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Feather name="log-out" size={20} color="#FF3B30" />
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}