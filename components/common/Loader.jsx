import React from "react";
import { StyleSheet, View, Dimensions, ViewStyle } from "react-native";
import SkeletonLoader from "expo-skeleton-loader";

import { useContext } from "react";
import { Context } from "../../stores/Context";

const { width, height } = Dimensions.get("window");


function TileSkeleton() {
  const { styles } = useContext(Context);
  
  return(
      <SkeletonLoader boneColor={styles.colors.background._800} highlightColor={styles.colors.background._700}>
        <SkeletonLoader.Container style={{
          width: "100%",
          height: 120, 
          borderRadius: 20,
          justifyContent:"center",
          alignItems: "center",
          padding: 8,
          gap: 10,
          flexDirection: "row",
          backgroundColor: styles.colors.background._900
        }}>
          <SkeletonLoader.Item style={{
            flex:1,
            maxWidth: 90,
            height: 90,
            borderRadius: 12
          }}></SkeletonLoader.Item>
          <SkeletonLoader.Item style={{
            flex:2,
            width: 90,
            maxHeight: 40,
            borderRadius: 10
          }}
          ></SkeletonLoader.Item>
          <SkeletonLoader.Item style={{
            flex:2,
            maxWidth: 40,
            maxHeight: 40,
            borderRadius: 10
          }}
          ></SkeletonLoader.Item>
        </SkeletonLoader.Container>
      </SkeletonLoader>
  );
}

const numberOfPosts = new Array(2).fill(null);

export default function App() {
  const { styles } = useContext(Context);
  return (
    <View style={{
    flex: 1,
    backgroundColor: styles.colors.background._950,
    padding: 20,
    paddingTop: 50,
    gap: 20
    }}>
      <TileSkeleton/>
      <TileSkeleton/>
    </View>
  );
}
