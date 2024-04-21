import SkeletonLoader from "expo-skeleton-loader";
import { useContext } from "react";
import { Context } from "../../stores/Context";

export default function TileSkeleton() {
  const { styles } = useContext(Context);
  
  return(
      <SkeletonLoader boneColor={styles.colors.background._800} highlightColor={styles.colors.background._700}>
        <SkeletonLoader.Container style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          padding: 20,
          paddingVertical: 15,
          backgroundColor: styles.colors.background._900,
          borderTopWidth: 1,
          borderColor: styles.colors.background._800
        }}>
          <SkeletonLoader.Item style={{
            flex:2,
            height: 20,
            borderRadius: 5,
          }}></SkeletonLoader.Item>
          <SkeletonLoader.Item style={{
            flex:1,
            height: 20,
            borderRadius: 5,
          }}
          ></SkeletonLoader.Item>
          <SkeletonLoader.Item style={{
            flex:1,
            height: 20,
            borderRadius: 5,
          }}
          ></SkeletonLoader.Item>
        </SkeletonLoader.Container>
      </SkeletonLoader>
  );
}