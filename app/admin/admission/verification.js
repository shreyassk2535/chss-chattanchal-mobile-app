import React, { useEffect, useState, useContext } from "react";
import Axios from "../../../stores/Axios";
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Dimensions
} from "react-native";
import { useRouter } from "expo-router";
import verificationImg from "../../../imgs/adminImages/Tick.png";
import Hero from "../../../components/common/Hero";

import { Context } from "../../../stores/Context";
import Alert from "../../../components/common/Alert";
import filter from "lodash.filter"

const { width, height } = Dimensions.get("window");

export default function Verification() {
  const { styles, isAdminLoggedIn } = useContext(Context);
  const router = useRouter();


  if (!isAdminLoggedIn) {
    router.replace("/login");
  }

  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(data)

  const [refreshing, setRefreshing] = useState(false);


  const handleRefresh = () => {
    loadData();
  };

  async function loadData() {
    setError("");
    await Axios.get("admin/students-to-verify")
      .then((res) => {setData(res.data); setFilteredData(res.data)})
      .catch((err) => {
        if (err.response == undefined) {
          setError("Server connection error");
        } else {
          setError(err.response.data);
        }
      });
  }

  function verifyStudent(id) {
    setError("");
    Axios.patch(`admin/verify-student?studentId=${id}`)
      .then((res) => {
        Alert.alert("Student verified successfully!", "Verification");
        loadData();
      })
      .catch((err) => {
        if (err.response == undefined) {
          setError("Server connection error");
          Alert.alert("Verification", "Server Connection Error");
        } else {
          setError(err.response.data);
        }
      });
  }

  const handleSearch = (value) => {
    setSearchQuery(value.toLowerCase());
    const finalData = filter(data, (student)=>{
      return contains(student, value.toLowerCase())
    })
    setFilteredData(finalData)
  };
  
  const contains = (student, query) =>{
    
    const name = student.name
    const admissionNo = student.admissionNo
    
    if (name == undefined || admissionNo == undefined){
      return false
    }
    if (
        name.toLowerCase().includes(query) ||
        admissionNo.toString().includes(query)
      ){
        return true
    }
    return false
  }

  useEffect(()=>{loadData()}, []);

  return (
    <SafeAreaView
      style={{
        backgroundColor: styles.colors.background._950,
        flex: 1,
      }}
    >
      <View
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        style={{
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 62
        }}
      >

        <View>
          <View
            style={{ flexDirection: "column", justifyContent: "space-between" }}
          >
            <Text
              style={{
                textAlign: "center",
                color: "red",
                left: 0,
                minWidth: 0,
                marginBottom: 15,
              }}
            >
              {error}
            </Text>
            <TextInput
              style={{ ...styles.input, marginBottom: 20 }}
              placeholder="Search Name/Adm No"
              placeholderTextColor={
                styles.components.textInput.placeHolder.color
              }
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>

          {/*<View style={styles.tableBox}>
          
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <TouchableOpacity
                  onPress={() => handleSort("name")}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>
                    Name {getSortIndicator("name")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSort("class")}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>
                    Class {getSortIndicator("class")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSort("admissionNo")}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>
                    Adm No. {getSortIndicator("admissionNo")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleSort("dob")}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ color: "white" }}>
                    D.O.B {getSortIndicator("dob")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: 60 }}>
                  <Text></Text>
                </TouchableOpacity>
              </View>

              <View style={styles.tableBody}>
                {sortedData.length === 0 ? (
                  <Text
                    style={{
                      padding: 20,
                      color: styles.colors.text._200,
                      backgroundColor: styles.colors.background._900,
                      opacity: .5
                    }}
                  >
                    No data found
                  </Text>
                ) : (
                  sortedData.map((item) => (
                    <View
                      key={item._id}
                      style={{
                        ...styles.tableRow,
                        borderTopWidth: 1,
                        borderColor: styles.colors.background._800,
                        backgroundColor: styles.colors.background._900,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          flex: 1,
                        }}
                        onPress={() => {
                          router.push({
                            pathname: "/profile",
                            params: {
                              ...item,
                              ...item.qualifyingExamDetails,
                              ...item.tcDetailsOnAdmission,
                              user: "admin",
                            },
                          });
                        }}
                      >
                        <View
                          style={{
                            flex: 1,
                            // backgroundColor: styles.common.inputBackground,
                            justifyContent: "center",
                            
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: styles.colors.text._50,
                            }}
                          >
                            {item.name}
                          </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                          <Text
                            style={{
                              textAlign: "center",
                              color: styles.colors.text._50,
                            }}
                          >
                            {item.class}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: styles.colors.text._50,
                            }}
                          >
                            {item.admissionNo}
                          </Text>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            padding: 10,
                          }}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: styles.colors.text._50,
                            }}
                          >
                            {item.dob}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <View
                        style={{
                          minWidth: 50,
                          justifyContent: "center",
                          paddingRight: 5,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            flex: 1,
                            backgroundColor: styles.colors.primary._50,
                            justifyContent: "center",
                            borderRadius: 50,
                            maxWidth: 50,
                            maxHeight: 25,
                          }}
                          onPress={() => verifyStudent(item._id)}
                        >
                          <Text
                            style={{
                              textAlign: "center",
                              color: styles.colors.text._950,
                              fontSize: 13,
                            }}
                          >
                            Verify
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </View>
          </View>*/}
          <View style={styles.tableBox}>
          
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                  <Text style={{ 
                   color: "white",
                    flex: 1,
                    textAlign: "center",
                    }}>
                    Name
                  </Text>
                  <Text style={{
                    color: "white",
                    flex: 1,
                    textAlign: "center",
                  }}>
                    Class
                  </Text>
                  <Text style={{
                    color: "white" ,
                    flex: 1,
                    textAlign: "center",
                  }}>
                    Adm No.
                  </Text>
                  <Text style={{ 
                    color: "white",
                    flex: 1,
                    textAlign: "center",
                    }}>
                    D.O.B
                  </Text>
                <View style={{ width: 60 }}>
                  <Text></Text>
                </View>
              </View>
    
          <FlatList
            style={{
              maxHeight: height/1.65
            }}
            ItemSeparatorComponent={
                <View
                  style={{
                    backgroundColor: styles.colors.background._800,
                    height: 1,
                  }}
                />
              }
            data={filteredData}
            keyExtractor={(item) => item._id}
            ListEmptyComponent={() => (
              <Text
                style={{
                  padding: 20,
                  color: styles.colors.text._200,
                  backgroundColor: styles.colors.background._900,
                  opacity: 0.5,
                }}
              >
                No data found
              </Text>
            )}
            renderItem={({ item }) => (
              <View
                style={{
                  ...styles.tableRow,
                  backgroundColor: styles.colors.background._900,
                }}
              >
                <TouchableOpacity
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flex: 1,
                  }}
                  onPress={() => {
                    router.push({
                      pathname: "/profile",
                      params: {
                        ...item,
                        ...item.qualifyingExamDetails,
                        ...item.tcDetailsOnAdmission,
                        user: "admin",
                      },
                    });
                  }}
                >
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", color: styles.colors.text._50 }}>
                      {item.name}
                    </Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", color: styles.colors.text._50 }}>
                      {item.class}
                    </Text>
                  </View>
                  <View style={{ flex: 1, justifyContent: "center" }}>
                    <Text style={{ textAlign: "center", color: styles.colors.text._50 }}>
                      {item.admissionNo}
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      padding: 10,
                    }}
                  >
                    <Text style={{ textAlign: "center", color: styles.colors.text._50 }}>
                      {item.dob}
                    </Text>
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    minWidth: 50,
                    justifyContent: "center",
                    paddingRight: 5,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      backgroundColor: styles.colors.primary._50,
                      justifyContent: "center",
                      borderRadius: 50,
                      maxWidth: 50,
                      maxHeight: 25,
                    }}
                    onPress={() => verifyStudent(item._id)}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        color: styles.colors.text._950,
                        fontSize: 13,
                      }}
                    >
                      Verify
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />      
          </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
