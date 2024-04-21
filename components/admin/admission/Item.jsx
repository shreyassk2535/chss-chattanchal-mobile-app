import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useContext } from "react";
import { Context } from "../../../stores/Context";

export default function Item(props) {
  const router = useRouter();
  const { styles } = useContext(Context);
  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
          padding: 10,
          paddingVertical: 15
        }}
        onPress={() => {
          router.push({
            pathname: props.link,
            params: {
              ...props.data,
              user: props.user,
            },
          });
        }}
      >
        <Text
          style={{
            flex: 2,
            color: styles.colors.text._50,
          }}
        >
          {props.data.name}
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            color: styles.colors.text._50,
          }}
        >
          {props.data.admissionNo}
        </Text>
        <Text
          style={{
            flex: 1,
            textAlign: "center",
            color: styles.colors.text._50,
          }}
        >
          {props.data.class}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
