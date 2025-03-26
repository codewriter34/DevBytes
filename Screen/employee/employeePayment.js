import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, ScrollView, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const transactions = [
  { id: "1", amount: "50,000 XAF", method: "MTN MoMo", status: "Paid", date: "March 20, 2025" },
  { id: "2", amount: "75,000 XAF", method: "Orange Money", status: "Pending", date: "March 15, 2025" },
  { id: "3", amount: "100,000 XAF", method: "Bank Transfer", status: "Failed", date: "March 10, 2025" },
];

export default function EmployeePaymentPage() {
  const [balance, setBalance] = useState("200,000 XAF");

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Employee Payments</Text>

      {/* Balance Overview */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceText}>Available Balance</Text>
        <Text style={styles.balanceAmount}>{balance}</Text>
      </View>

      {/* Withdraw Button */}
      <TouchableOpacity style={styles.withdrawButton}>
        <Text style={styles.withdrawText}>Withdraw Funds</Text>
      </TouchableOpacity>

      {/* Payment Methods */}
      <Text style={styles.sectionTitle}>Payment Methods</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.paymentMethodsContainer}>
        <TouchableOpacity style={[styles.methodButton, { backgroundColor: "#FFD700" }]}>
          <Text style={styles.methodText}>MTN MoMo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.methodButton, { backgroundColor: "#FFA500" }]}>
          <Text style={styles.methodText}>Orange Money</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.methodButton, { backgroundColor: "#4682B4" }]}>
          <Text style={styles.methodText}>Bank Transfer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.methodButton, { backgroundColor: "#0070BA" }]}>
          <Text style={styles.methodText}>PayPal</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Transaction History */}
      <Text style={styles.sectionTitle}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionCard}>
            <Text style={styles.transactionText}>{item.amount} - {item.method}</Text>
            <Text style={styles.transactionDate}>{item.date}</Text>
            <Text style={[styles.status, styles[item.status.toLowerCase()]]}>{item.status}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB", padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 20 },
  balanceCard: { backgroundColor: "#fff", padding: 20, borderRadius: 10, marginBottom: 20, alignItems: "center" },
  balanceText: { fontSize: 16, color: "#555" },
  balanceAmount: { fontSize: 22, fontWeight: "bold", color: "#000", marginTop: 5 },
  withdrawButton: { backgroundColor: "#1980e6", padding: 12, borderRadius: 10, alignItems: "center", marginBottom: 20 },
  withdrawText: { color: "#fff", fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", color: "#333", marginBottom: 10 },
  paymentMethodsContainer: { flexDirection: "row", marginBottom: 20, paddingVertical: 10 },
  methodButton: { paddingVertical: 10, paddingHorizontal: 15, borderRadius: 10, marginHorizontal: 8, alignItems: "center" },
  methodText: { fontSize: 14, fontWeight: "bold", color: "#fff" },
  transactionCard: { backgroundColor: "#fff", padding: 16, borderRadius: 8, marginBottom: 10 },
  transactionText: { fontSize: 16, color: "#333" },
  transactionDate: { fontSize: 14, color: "#888", marginVertical: 5 },
  status: { fontSize: 14, fontWeight: "bold" },
  paid: { color: "green" },
  pending: { color: "orange" },
  failed: { color: "red" },
});
