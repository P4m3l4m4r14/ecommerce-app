import { theme } from "../../theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContent: { padding: 24, paddingBottom: 40 },
  title: { fontSize: 24, fontWeight: 'bold', color: theme.colors.text, marginBottom: 24 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text, marginBottom: 16 },
  input: {
    backgroundColor: theme.colors.surface, borderWidth: 1, borderColor: theme.colors.border,
    borderRadius: 8, padding: 14, fontSize: 16, color: theme.colors.text, marginBottom: 12
  },
  row: { flexDirection: 'row' },
  paymentOption: {
    flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: theme.colors.surface,
    borderWidth: 1, borderColor: theme.colors.border, borderRadius: 8, marginBottom: 12
  },
  paymentOptionActive: { borderColor: theme.colors.primary, backgroundColor: '#F0F5FF' },
  paymentText: { marginLeft: 12, fontSize: 16, color: theme.colors.text },
  summarySection: { backgroundColor: theme.colors.surface, padding: 16, borderRadius: 8, marginBottom: 24, borderWidth: 1, borderColor: theme.colors.border },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  summaryLabel: { fontSize: 14, color: theme.colors.textSecondary },
  summaryValue: { fontSize: 14, color: theme.colors.text, fontWeight: '500' },
  summaryTotalRow: { borderTopWidth: 1, borderTopColor: theme.colors.border, paddingTop: 12, marginTop: 4, marginBottom: 0 },
  summaryTotalLabel: { fontSize: 16, fontWeight: 'bold', color: theme.colors.text },
  summaryTotalValue: { fontSize: 20, fontWeight: 'bold', color: theme.colors.primary },
  submitButton: { backgroundColor: theme.colors.primary, padding: 16, borderRadius: 8, alignItems: 'center' },
  submitButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});