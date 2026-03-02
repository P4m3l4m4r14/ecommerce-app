import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: 24, paddingBottom: 40 },
  header: { alignItems: 'center', marginBottom: 32, marginTop: 16 },
  avatar: {
    width: 80, height: 80, borderRadius: 40, backgroundColor: theme.colors.primary,
    justifyContent: 'center', alignItems: 'center', marginBottom: 16,
  },
  avatarText: { fontSize: 32, fontWeight: 'bold', color: '#FFF' },
  userName: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 4 },
  userEmail: { fontSize: 16, color: theme.colors.textSecondary },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16 },
  card: {
    backgroundColor: theme.colors.surface, borderRadius: 8, padding: 16,
    borderWidth: 1, borderColor: theme.colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8 },
  rowText: { fontSize: 16, color: theme.colors.text, marginLeft: 12 },
  divider: { height: 1, backgroundColor: theme.colors.border, marginVertical: 8 },
  favoriteCard: {
    flexDirection: 'row', backgroundColor: theme.colors.surface, borderRadius: 8,
    padding: 12, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: theme.colors.border,
  },
  favoriteImagePlaceholder: {
    width: 50, height: 50, borderRadius: 4, backgroundColor: theme.colors.background,
    justifyContent: 'center', alignItems: 'center', marginRight: 12,
  },
  favoriteInfo: { flex: 1 },
  favoriteName: { fontSize: 14, fontWeight: '500', color: theme.colors.text, marginBottom: 4 },
  favoritePrice: { fontSize: 14, fontWeight: 'bold', color: theme.colors.primary },
  favoriteIcon: { padding: 8 },
  logoutButton: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    backgroundColor: '#FFE5E5', padding: 16, borderRadius: 8, marginTop: 16,
  },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: 'bold', marginLeft: 8 }
});