import React from "react";
import List from "../../../imgs/adminImages/List.png";
import TileSkeleton from "../../../components/common/TileSkeleton.jsx";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions
} from "react-native";
import DropDownPickerComponent from "../../../components/common/DropDown";
import Axois from "../../../stores/Axios";
import Item from "../../../components/admin/admission/Item";
import { useRouter } from "expo-router";

import { useContext } from "react";
import { Context } from "../../../stores/Context";

const { width, height } = Dimensions.get("window");

export default function StudentDetials() {
  const router = useRouter();
  const { styles, isAdminLoggedIn } = useContext(Context);

  if (!isAdminLoggedIn) {
    router.replace("/login");
  }

  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState("name");
  const [search, setSearch] = React.useState("");

  const [data, setData] = React.useState([]);

  function body() {
    let searchValue;

    if (isNaN(parseInt(search))) {
      searchValue = search;
    } else {
      searchValue = parseInt(search);
    }

    if (value === "name") {
      return {};
    } else {
      return {
        [value]: searchValue,
      };
    }
  }

  async function handleClick() {
    setIsLoading(true)
    await Axois.post(
      `admin/get-students?name=${value === "name" ? search : ""}`,
      body()
    )
      .then((res) => {
        setData(res.data);
        setError("");
      })

      .catch((err) => {
        if (err?.response?.status == 401) {
          setError("Not Logged In");
        } else if (err?.response?.status === undefined) {
          setError("Server connection error");
        } else if (err?.response?.status == 500) {
          setError(err.response.data);
        } else if (err?.response?.status == 404) {
          setError("404 Error");
        } else {
          setError(err.response.data);
        }
      });
    setIsLoading(false)
  }

  return (
    <View
        style={{
          backgroundColor: styles.colors.background._950,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 100,
          flex: 1
        }}
      >
        

        <View style={{ gap: 20 }}>
          <View style={{ zIndex: 999 }}>
            <DropDownPickerComponent
              open={open}
              value={value}
              items={[
                { label: "Admission No.", value: "admissionNo" },
                { label: "Application No.", value: "applicationNo" },
                { label: "Name", value: "name", selected: true },
              ]}
              setOpen={setOpen}
              placeholder="Search By"
              setValue={setValue}
            />
          </View>
          <TextInput
            style={styles.input}
            name="search"
            onChangeText={(text) => {
              setSearch(text);
            }}
            placeholder="Search here"
            value={search}
            placeholderTextColor={styles.components.textInput.placeHolder.color}
          />
          <View style={{ alignItems: "flex-end" }}>
            <TouchableOpacity
              style={{ ...styles.btn, minWidth: 100 }}
              onPress={handleClick}
            >
              { isLoading ?   (<ActivityIndicator size="small" animating={isLoading} color={styles.colors.text._950} />) : (<Text style={styles.btnText}>Search</Text>) }
            </TouchableOpacity>
          </View>
          <View style={{ gap: 5 }}>
            <Text
              style={{
                color: "red",
                alignSelf: "center",
              }}
            >
              {error}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderColor: styles.colors.background._800,
            borderWidth: 1,
            marginTop: 10,
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: styles.colors.background._900,
            //marginBottom: 150,
          }}
        >
          <View
                style={{
                  flexDirection: "row",
                  backgroundColor: styles.colors.background._800,
                  
                }}
              >
                <Text
                  style={{
                    padding: 10,
                    paddingTop: 15,
                    paddingLeft: 20,
                    flex: 2,
                    borderTopLeftRadius: 8,
                    color: styles.colors.text._50,
                  }}
                >
                  Name
                </Text>
                <Text
                  style={{
                    padding: 10,
                    paddingTop: 15,
                    flex: 1,
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Adm No
                </Text>
                <Text
                  style={{
                    padding: 10,
                    paddingTop: 15,
                    flex: 1,
                    textAlign: "center",
                    borderTopRightRadius: 8,
                    color: "white",
                  }}
                >
                  Class
                </Text>
            </View>
              
            <FlatList
              scrollEnabled={true}
              style={{
                maxHeight: height/2.35
              }}
              data={data}
              renderItem={({ item }) => (
                <Item data={item} link={"/profile"} user="admin" />
              )}
              keyExtractor={(item) => item._id}
              ItemSeparatorComponent={
                <View
                  style={{
                    backgroundColor: styles.colors.background._800,
                    height: 1,
                  }}
                />
              }
              ListEmptyComponent={
              
                isLoading ? <><TileSkeleton/><TileSkeleton/></> :
                (<Text style={{ alignSelf: "center", color: styles.colors.text._200, padding: 30, opacity: .5 }}>
                  Empty
                </Text>)
              }
  
              //getItemLayout={(data, index) => (isLoading ? {index, length: 20, offset: 20 * index } : getItemLayout(data, index))}
 
            />
        </View>
    </View>
  );
}