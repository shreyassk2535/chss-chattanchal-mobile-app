import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StatusBar } from "react-native";
import { TileCard } from "../../components";
import { useRouter } from "expo-router";

import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

import { useContext } from "react";
import { Context } from "../../stores/Context";

import TakePhoto from "./take-photo";

export default function Admin() {
  const router = useRouter();
  const { styles, isAdminLoggedIn } = useContext(Context);

  const [showCamera, setShowCamera] = useState(false);

  useEffect(() => {
    if (!(isAdminLoggedIn == undefined)) {
      if (!isAdminLoggedIn) {
        router.replace("/login");
      }
    }
  }, [isAdminLoggedIn]);


  return (
    <SafeAreaView
      style={{
        backgroundColor: styles.colors.background._950,
        flex: 1,
        padding: 20,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          gap: 20,
          paddingTop: 30,
          flexWrap: "wrap",
        }}
      >
        <TileCard
          source={<Feather name="user-plus" size={60} color={styles.colors.text._50} style={{ marginLeft: 13 }} />}
          text="Admission"
          onPress={() => {
            router.push("/admin/admission");
          }}
        />
        <TileCard
          source={<Ionicons name="camera-outline" size={60} color={styles.colors.text._50} />}
          text="Camera"
          onPress={() => {
            setShowCamera(true);
          }}
        />
      </View>

      <TakePhoto
        animationType="slide"
        visible={showCamera}
        setVisible={setShowCamera}
        onRequestClose={() => {
          setShowCamera(false);
        }}
      />
    </SafeAreaView>
  );
}
