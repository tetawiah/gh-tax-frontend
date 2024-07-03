import { createStackNavigator } from "@react-navigation/stack";
import Index from "./index";
import Salary from "./salary";

const Stack = createStackNavigator();

export default function RootLayout() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index" component={Index} />
      <Stack.Screen name="salary" component={Salary} />
    </Stack.Navigator>
  );
}
