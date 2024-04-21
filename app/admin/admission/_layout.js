import { Tabs } from "expo-router";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useContext } from "react";
import { Context } from "../../../stores/Context";

export default function Layout() {
  const { styles } = useContext(Context);

  return (
    <Tabs
      options={{ animation: 'fade' }}
      shifting={true}
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 50,
          backgroundColor: styles.colors.background._950,
          borderTopWidth: 0,
        },
        tabBarActiveBackgroundColor: styles.colors.secondary._900,
      }}
    >
      <Tabs.Screen
        name="student-details"
        options={{
          tabBarIcon: () => (
            <MaterialCommunityIcons
              name="account-details"
              size={41}
              color="white"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="new-admission"
        options={{
          tabBarIcon: () => (
            <Ionicons name="person-add" size={30} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="verification"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="pending" size={30} color="white" />
          ),
        }}
      />
      <Tabs.Screen
        name="confirmation"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="verified" size={30} color="white" />
          ),
        }}
      />
    </Tabs>
  );
}
