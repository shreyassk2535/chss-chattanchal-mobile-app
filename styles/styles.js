import { StyleSheet } from "react-native";
import dark from "./dark.json";
import light from "./light.json";

const styles = (scheme) => {
  let theme;

  if (scheme == "dark") {
    theme = dark;
  } else if (scheme == "light") {
    theme = light;
  } else {
    return null;
  }

  return StyleSheet.create({
    version: theme.version,
    colors: theme.colors,

    components: {
      textInput: {
        placeHolder: {
          color: theme.colors.text._200 + "77",
        },
      },
      dropDown: {
        basicStyle: {
          backgroundColor: theme.colors.background._900,
          borderColor: theme.colors.background._800,
          borderRadius: 30,
          paddingLeft: 5
        },
        selectedItemContainerStyle: {
          backgroundColor: theme.colors.background._800,
        },
        dropDownContainerStyle: {
          borderColor: theme.colors.background._800,
          backgroundColor: theme.colors.background._900,
          color: theme.colors.text._50,
          borderRadius: 30,
        
        },
        textStyle: {
          color: theme.colors.text._50,
          paddingLeft: 20
        },
        
      },
    }, // Custom Components

    loginHeaderMain: {
      fontSize: 30,
      fontWeight: 700,
      alignSelf: "center",
      marginBottom: 30,
      paddingTop: 100,
      color: theme.colors.text._50,
    },
    input: {
      backgroundColor: theme.colors.background._900,
      height: 50,
      borderRadius: 50,
      paddingLeft: 25,
      borderWidth: 1,
      borderColor: theme.colors.background._800,
      color: theme.colors.text._50
    },
    btn: {
      backgroundColor: theme.colors.primary._300,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 50,
    },
    btnText: {
      color: theme.colors.text._950,
      fontSize: 18,
      fontWeight: 400,
    },
    error: {
      color: "#f77",
      alignSelf: "center",
      paddingTop: 10,
    },
    link: {
      fontSize: 12,
      paddingLeft: 5,
      color: theme.colors.primary._400,
    },
    tile: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      height: 120,
      width: "100%",
      overflow: "hidden",
      backgroundColor: theme.colors.background._900,
      borderRadius: 20,

      paddingRight: 20,
    },
    tileBackground: {
      position: "absolute",
      width: 150,
      height: 150,
    },
    tileImg: {
      width: 70,
      height: 70,
    },
    tileText: {
      fontWeight: 600,
      fontSize: 18,
      color: theme.colors.text._50,
    },
    divider: {
      borderBottomWidth: 0,
      marginTop: 40,
      marginBottom: 20,
    },
    newAdmissionImg: {
      width: 40,
      height: 40,
      margin: 10
    },
    newAdmissionHeading: {
      fontSize: 17,
      fontWeight: 600,
      marginBottom: 30,
      marginTop: 15,
      color: theme.colors.text._50,
      textAlign: "center",
      width: "100%"
    },
    newAdmissionText: {
      marginBottom: 7,
      marginTop: 15,
      paddingLeft: 15,
      color: theme.colors.text._50,
    },
    mandatory: {
      color: "#f77",
    },

    tableBox: {
    },
    table: {
      borderRadius: 20,
      overflow: "hidden",
      borderColor: theme.colors.background._800,
      borderWidth: 1,
      backgroundColor: theme.colors.background._900
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: theme.colors.background._800,

      padding: 7,
      minHeight: 45,

      alignItems: "center",
    },
    tableRow: {
      flexDirection: "row",
      padding: 5,
    },

    verificationImg: {
      width: 30,
      height: 30,
      margin: 15,
    },
  });
};

export default styles;
