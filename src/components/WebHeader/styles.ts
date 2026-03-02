import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
    headerWrapper: {
    width: '100%',
    backgroundColor: theme.colors.primary, 
    alignItems: 'center',
    borderBottomWidth: 0,
    borderBottomColor: theme.colors.border,
  },
  container: {
    height: 90,
    width: '100%',
    maxWidth: 1200,
    //backgroundColor: theme.colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight:6,
  },
  logo: {
    height: 60,
    width: 150,
  },
  searchBox: {
    flex: 1, 
    maxWidth: 600,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginHorizontal: 0,
    height: 48,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    marginRight: 8,
    //outlineStyle: 'none',
    fontSize: 16,
    color: theme.colors.text,
},
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  textWrapper: {
    marginLeft: 12,
  },
  navTextSmall: {
    fontSize: 12,
    color: theme.colors.surface,
  },
    navTextBold: {
      fontSize: 14,
      fontWeight: 'bold',
      color: theme.colors.surface,
    },
    iconButton: {
        padding: 8,
    },
  badge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#e4b725',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    zIndex: 1, 
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: "bold",
  },
});