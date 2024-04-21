import { Stack } from "expo-router";
import { TouchableOpacity, View, Text, StatusBar } from "react-native";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";
import { useRouter, usePathname, useNavigation } from "expo-router";
import UserProfile from "../components/NavBar/UserProfile";
import { useState, useContext, useEffect } from "react";

import { ContextProvider, Context } from "../stores/Context";
import { CommonActions } from "@react-navigation/native";
import Alert from "../components/common/Alert"

export default function App() {
  return (
    <ContextProvider>
      <Layout />
      <Alert/>
    </ContextProvider>
  );
}
export function Layout() {
  const router = useRouter();
  const pathname = usePathname().split("/");
  const navigation = useNavigation();

  const [show, setShow] = useState(false);

  const { styles, appBarTitle, setAppBarTitle } = useContext(Context);


  StatusBar.setBackgroundColor(styles.colors.background._950);
  if (styles.version.mode == "dark") {
    StatusBar.setBarStyle("light-content");
  } else if (styles.version.mode == "light"){
    StatusBar.setBarStyle("dark-content");
  }
  
  async function back() {
  if (pathname[pathname.length - 1] != "admin" && pathname[pathname.length -1] != "teacher"){
    await router.back()
  }
  }
  
  return (
    <View style={{ backgroundColor:styles.colors.background._950, width: "100%", height:"100%"}}>
    
      <MyFunction pathname={pathname}/>
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerStyle: { backgroundColor: styles.colors.background._950 },
        headerTintColor: styles.colors.text._50,
        headerTitle: appBarTitle,
        headerTitleStyle: { fontSize: 20, fontWeight: "500" },
        headerRight: () => (
          <View>
            <UserProfile show={show} setShow={setShow} />
            <TouchableOpacity onPress={() => setShow(true)}>
              <Ionicons name="person-circle-outline" size={30} color="white" />
            </TouchableOpacity>
          </View>
        ),
        
        headerLeft: () => (
          <TouchableOpacity
            onPress={back}
            onLongPress={() => {
              navigation.dispatch(
                CommonActions.reset({
                  index: 1,
                  routes: [{ name: "home" }],
                })
              );
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
            }}
          >
           <Entypo name="chevron-left" size={26} color={styles.colors.text._50} style={{marginEnd: 10}} />
            
          </TouchableOpacity>
        ),
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="teacher/signup" options={{ headerShown: false }} />
      <Stack.Screen
        name="teacher/signup-otp"
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="admin/index" 
        options={{ animation: 'none' }}
      />
    </Stack>
    </View>
  );
}


function MyFunction({ pathname }) {
  
  const { setAppBarTitle , appBarTitle} = useContext(Context);
  
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).replace("-", " ")
  }
  useEffect(()=>{
    if (pathname[pathname.length - 1] == "home"){
      setAppBarTitle("")
    }else if (pathname[pathname.length - 1]!="profile"){
      setAppBarTitle(capitalizeFirstLetter(pathname[pathname.length - 1]));
    }
  }, [pathname])

  return (
    <View></View>
  );
}
