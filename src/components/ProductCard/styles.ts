import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#EBEBEB',
    padding: 16,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    position: 'relative',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor: 'transparent',
    marginBottom: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 18,
  },
  quickAddButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: theme.colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoContainer: {
    flex: 1, 
    justifyContent: 'flex-start',
  },
  name: {
    fontSize: 14,
    fontWeight: '400',
    color: '#333333',
    marginBottom: 16, 
    lineHeight: 20,
    minHeight: 40, 
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1A1A1A',
  }
});