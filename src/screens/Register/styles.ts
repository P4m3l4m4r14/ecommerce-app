import { StyleSheet, Platform } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  scrollContent: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    padding: 24 ,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: { 
    fontSize: 16, 
    color: theme.colors.textSecondary, 
    marginBottom: 32 ,
  },
  inputGroup: { marginBottom: 20 },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    color: theme.colors.text, 
    marginBottom: 8,
   },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: theme.colors.surface,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: theme.colors.surface,

    overflow: 'hidden', 
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? 150 : 50, 
  },
  picker: {
    height: 50,
    width: '100%',
    borderWidth: 0,
  },
 submitButton: {
    backgroundColor: theme.colors.primary, 
    padding: 16, 
    borderRadius: 8,
    alignItems: 'center', 
    marginTop: 12,
  },
  submitButtonText: { 
    color: '#FFF', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },
  loginButton: { 
    marginTop: 24, 
    alignItems: 'center' 
  },
  loginButtonText: { 
    color: theme.colors.primary, 
    fontSize: 14, 
    fontWeight: '600' 
  }
});