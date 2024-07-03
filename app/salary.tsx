import { useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ValueWithPrefix = ({ value }: { value: number | string }) => {
  return (
    <View style={styles.valueContainer}>
      <Text>GHS</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};
export default function Salary({ route }: any) {
  const params = route.params;
  const nav = useNavigation();

  useLayoutEffect(() => {
    nav.setOptions({
      title: "Salary",
    });
  }, [nav]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.resultContainer}>
        <Text style={styles.resultHeader}>Salary Detail</Text>
        <View style={styles.row}>
          <Text style={styles.resultLabel}>Gross Salary:</Text>
          <ValueWithPrefix value={params.grossSalary}></ValueWithPrefix>
        </View>
        <View style={styles.row}>
          <Text style={styles.resultLabel}>PAYE Tax:</Text>
          <ValueWithPrefix value={params.payeTax}></ValueWithPrefix>
        </View>
        <View style={styles.row}>
          <Text style={styles.resultLabel}>Basic Salary:</Text>
          <ValueWithPrefix value={params.basicSalary}></ValueWithPrefix>
        </View>
        <View style={styles.row}>
          <Text style={styles.resultLabel}>Employee Pensions:</Text>
          <ValueWithPrefix value={params.employeePensions}></ValueWithPrefix>
        </View>
        <View style={styles.row}>
          <Text style={styles.resultLabel}>Employer Pensions:</Text>
          <ValueWithPrefix value={params.employerPensions}></ValueWithPrefix>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    justifyContent: "center",
    alignItems: "center",
  },
  resultContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  resultHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  resultLabel: {
    fontSize: 16,
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  valueContainer: {
    width: "33%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
