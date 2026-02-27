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
  categoriesWrapper: {
    backgroundColor: theme.colors.surface,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    elevation: 2, 
  },
  categoriesContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: theme.colors.background,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  chipText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  chipTextActive: {
    color: theme.colors.surface,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  }
});