    import { StyleSheet } from 'react-native';
    import { theme } from '../../theme';
    
    export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: theme.colors.surface,
  },
  content: {
    padding: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  stock: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
    lineHeight: 30,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: 24,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    padding: 16,
    backgroundColor: theme.colors.surface,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.background,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 56, 
  },
  stepperButton: {
    paddingHorizontal: 24,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperButtonDisabled: {
    opacity: 0.5,
  },
  stepperInput: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.text,
  },
});