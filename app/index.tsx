import { Allowance } from "@/interfaces/Allowance";
import {
  getBasicSalary,
  getEmployeeContribution,
  getEmployerContribution,
  getGrossSalary,
  getTaxableAmount,
  sumAllowances,
} from "@/utils/helper";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MINIMUM_WAGE_GHANA = 18.15;
export default function Index({ navigation }: any) {
  const [netSalary, setNetSalary] = useState("");
  const [allowances, setAllowances] = useState<Allowance[]>([
    {
      name: "",
      amount: 0,
      id: 1,
    },
    {
      name: "",
      amount: 0,
      id: 2,
    },
    {
      name: "",
      amount: 0,
      id: 3,
    },
    {
      name: "",
      amount: 0,
      id: 4,
    },
  ]);

  const nav = useNavigation();

  function handleButtonPress() {
    if (!validateNetSalary(netSalary)) return;
    if (!validateAllowances(allowances)) return;

    const [taxableAmount, taxPaid] = getTaxableAmount(parseFloat(netSalary));
    const grossSalary = getGrossSalary(taxableAmount);
    const totalAllowances = sumAllowances(allowances);
    const basicSalary = getBasicSalary(grossSalary, totalAllowances);
    const employerContribution = getEmployerContribution(basicSalary);
    const employeeContribution = getEmployeeContribution(basicSalary);

    navigation.navigate("salary", {
      grossSalary: grossSalary.toFixed(2),
      payeTax: taxPaid.toFixed(2),
      basicSalary: basicSalary.toFixed(2),
      employeePensions: employeeContribution.toFixed(2),
      employerPensions: employerContribution.toFixed(2),
    });
  }

  function validateAllowances(value: Allowance[]) {
    let errorField = "";
    allowances.forEach(function (allowance) {
      if (allowance.name.length > 0 && allowance.amount == 0)
        errorField =
          "Please fill corresponding amount field for the allowance name entered";
      if (allowance.amount > 0 && allowance.name.length == 0)
        errorField =
          "Please fill corresponding allowance name field for the amount entered";
    });
    if (errorField.length > 0) {
      alert(errorField);
      return false;
    }
    return true;
  }

  function validateNetSalary(value: string): boolean {
    const salary = parseFloat(value);
    if (isNaN(salary) || salary < MINIMUM_WAGE_GHANA) {
      alert(
        `Net salary must be an amount greater than or equal to GHS ${MINIMUM_WAGE_GHANA}`
      );
      return false;
    }
    return true;
  }

  useLayoutEffect(() => {
    nav.setOptions({
      title: "Welcome",
    });
  }, [nav]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Enter desired net salary</Text>
          <View style={styles.customInput}>
            <Text style={styles.currency}>GHS</Text>
            <TextInput
              style={styles.input}
              testID="netSalary"
              onChangeText={(value) => {
                setNetSalary(value);
              }}
            />
          </View>
          <Text style={styles.header}>Desired Allowances</Text>
          {allowances.map((allowance, index) => (
            <View key={index} style={styles.allowanceRow}>
              <TextInput
                testID={"allowance " + allowance.id}
                style={styles.allowanceInput}
                placeholder="Allowance Name"
                value={allowance.name}
                onChangeText={(value) => {
                  setAllowances((allowances) =>
                    allowances.map((allowance) =>
                      allowance.id === index + 1
                        ? {
                            id: allowance.id,
                            name: value,
                            amount: allowance.amount,
                          }
                        : allowance
                    )
                  );
                }}
              />
              <TextInput
                style={styles.allowanceAmountInput}
                testID={"amount " + allowance.id}
                placeholder="Amount"
                value={allowance.amount?.toString()}
                onChangeText={(value) => {
                  const amount = parseFloat(value) || 0;
                  setAllowances((allowances) =>
                    allowances.map((allowance) =>
                      allowance.id === index + 1
                        ? {
                            id: allowance.id,
                            name: allowance.name,
                            amount,
                          }
                        : allowance
                    )
                  );
                }}
              />
            </View>
          ))}
          <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
            <Text style={styles.buttonText}>Calculate</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    color: "#333",
    textAlign: "center",
  },
  customInput: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
    backgroundColor: "#f1f1f1",
  },
  currency: {
    fontSize: 18,
    marginRight: 10,
    color: "#555",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
    borderColor: "#ccc",
    borderWidth: 1,
    color: "#333",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#333",
  },
  allowanceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  allowanceInput: {
    flex: 2,
    height: 40,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  allowanceAmountInput: {
    flex: 1,
    height: 40,
    padding: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
