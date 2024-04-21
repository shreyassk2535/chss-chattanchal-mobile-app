import {
  Modal,
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import Axios from "../../stores/Axios";
import { useContext } from "react";
import { Context } from "../../stores/Context";

import { usePathname, useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import * as WebBrowser from "expo-web-browser";

export default function UserProfile({ show, setShow }) {
  const { styles, setIsAdminLoggedIn, setIsTeacherLoggedIn } = useContext(Context);
  const navigation = useNavigation();
  const pathname = usePathname().split("/")[1];

  function Logout() {
    Axios.delete(`${pathname}/logout`)
      .then((res) => {
        if(pathname=="admin"){
          setIsAdminLoggedIn(false)
        }else if (pathname=="teacher"){
          setIsTeacherLoggedIn(false)
        }
        setShow(false);
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: "login" }],
          })
        );
      })
      .catch((err) => {});
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).replace("-", " ")
  }
  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={show}
      onRequestClose={() => {
        setShow(false);
      }}
      style={{
        paddingTop: 100,
      }}
    >
      <SafeAreaView style={stl.modal}>
        <TouchableOpacity
          onPress={() => {
            setShow(false);
          }}
          style={{
            flex: 1,
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
        <View
          style={{
            ...stl.container,
            backgroundColor: styles.colors.background._900,
            width: "100%",
          }}
        >
          <View
            style={{
              paddingTop: 35,
              paddingBottom: 15, 
              gap: 20,
              flexDirection: "row",
              jujustifyContent: "flex-start",
              alignItems: "center",
              width: "90%",
              paddingHorizontal: 15,
              
              borderBottomWidth: 1,
              borderColor: styles.colors.background._800,
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: "grey",
                borderRadius: 1000,
                alignSelf: "center",

                overflow: "hidden",
                borderWidth: 1,
                borderColor: "#ccc",
              }}
            >
              <View
                style={{
                  gap: 5,
                  justifyContent: "flex-end",
                  alignItems: "center",
                  top: 40,
                }}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#ddd",
                    borderRadius: 1000,
                  }}
                />
                <View
                  style={{
                    width: 50,
                    height: 50,
                    backgroundColor: "#ddd",
                    borderRadius: 1000,
                  }}
                />
              </View>
            </View>
            <Text
              style={{
                fontWeight: 500,
                minWidth: 125,
                color: styles.colors.text._50,
              }}
              numberOfLines={1}
            >
              Logged in as {capitalizeFirstLetter(pathname)}
            </Text>
          </View>
          <View
            style={{
              justifyContent: "space-around",
              minWidth: "100%",
              
            }}
          >
            <TouchableOpacity
              
              style={{ ...stl.button}}
              onPress={async () => {
                let result = await WebBrowser.openBrowserAsync(
                  "https://chattanchalhss.com/login"
                );
                setShow(false);
              }}
            >
              <Text style={{ color: styles.colors.text._50}}>
                Change Password
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ ...stl.button}}
              onPress={Logout}
            >
              <Text style={{ color: styles.colors.text._50 }}>
                Logout {capitalizeFirstLetter(pathname)}
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const stl = StyleSheet.create({
  container: {
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30
  },
  modal: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  button: {
    minWidth: "100%",
    paddingHorizontal: 40,
    paddingTop: 25,
    borderTopWidth: 0,
  },
});
