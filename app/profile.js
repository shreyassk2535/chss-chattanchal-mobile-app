import { View, Text, ScrollView, Image } from "react-native";
import { useSearchParams } from "expo-router";
import { useEffect, useState, useContext } from "react";
import { Context } from "../stores/Context";
import Axios from "../stores/Axios";
import profileImg from "../imgs/profile.png";

import { useRouter } from "expo-router";

export default function Profile() {
  const [img, setImg] = useState(profileImg);

  const { styles, setAppBarTitle } = useContext(Context);

  const data = useSearchParams();
  const router = useRouter();

  function getImg() {
    
    Axios.get(`${data.user}/get-student-photo?studentId=${data._id}`)
      .then((res) => {
        setImg("data:img/jpeg;base64," + res.data);
      })
      .catch((err) => {
        if (err.response == undefined) {
          setImg(profileImg);
        } else {
          setImg(profileImg);
        }
      });
      
  }

  useEffect(getImg, [data]);
  useEffect(()=>{
    
      setAppBarTitle(data.name)
  }, [data])

  return (
    <>
      <ScrollView
        style={{
          backgroundColor: styles.colors.background._950,
          flex: 1,
        }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: styles.colors.inputBackground,
            flex: 1,
            width: 350,
            gap: 15,
            marginTop: 50,
            marginBottom: 50,

            borderColor: styles.colors.borderColor,
            borderWidth: 1,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={typeof img == "number" ? img : { uri: img, scale: 1 }}
              style={{ height: 160, width: 160, borderRadius: 10 }}
            />
          </View>
          <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
            <Text
              style={{ flex: 1, fontWeight: 800, color: styles.colors.text._50 }}
            >
              Name:
            </Text>
            <Text
              style={{ flex: 1, fontWeight: 800, color: styles.colors.text._50 }}
            >
              {" "}
              {data.name}
            </Text>
          </View>
          {data.class == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Class:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.class}
              </Text>
            </View>
          )}
          {data.aadhaarNo == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Aadhaar No:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.aadhaarNo}
              </Text>
            </View>
          )}
          {data.admissionDate == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Admission Date:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.admissionDate}
              </Text>
            </View>
          )}
          {data.admissionNo == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Admission No:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.admissionNo}
              </Text>
            </View>
          )}
          {data.applicationNo == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50}}>
                Application No:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.applicationNo}
              </Text>
            </View>
          )}
          {data.caste == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Caste:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.caste}
              </Text>
            </View>
          )}
          {data.category == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Category:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.category}
              </Text>
            </View>
          )}
          {data.course == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Course:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.course}
              </Text>
            </View>
          )}
          {data.dob == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>Dob:</Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.dob}
              </Text>
            </View>
          )}
          {data.gender == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Gender:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.gender}
              </Text>
            </View>
          )}
          {data.nameOfParent == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Name of Parent:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.nameOfParent}
              </Text>
            </View>
          )}
          {data.occupationOfParent == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Occupation of parent:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.occupationOfParent}
              </Text>
            </View>
          )}
          {data.phone == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Phone:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.phone}
              </Text>
            </View>
          )}
          {data.linguisticMinority == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Linguistic Minority:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.linguisticMinority}
              </Text>
            </View>
          )}
          {data.obc == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>OBC:</Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.obc}
              </Text>
            </View>
          )}
          {data.relationshipWithGuardian == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Relationship with guardian:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.relationshipWithGuardian}
              </Text>
            </View>
          )}
          {data.religion == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Religion:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.religion}
              </Text>
            </View>
          )}
          {data.secondLanguage == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Second language:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.secondLanguage}
              </Text>
            </View>
          )}
          {data.status == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Status:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.status}
              </Text>
            </View>
          )}

          {data.rank == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>Rank:</Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.rank}
              </Text>
            </View>
          )}
          {data.wgpa == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>WGPA:</Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.wgpa}
              </Text>
            </View>
          )}
          {data.admissionCategory == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Admission category:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.admissionCategory}
              </Text>
            </View>
          )}

          {data.tcNumber == undefined &&
          data.tcDate == undefined &&
          data.tcSchool == undefined ? (
            ""
          ) : (
            <Text
              style={{ ...styles.newAdmissionHeading, alignSelf: "center" }}
            >
              Details of Transfer certificate produced on Admission
            </Text>
          )}

          {data.tcNumber == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Number:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.tcNumber}
              </Text>
            </View>
          )}
          {data.tcDate == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>Date:</Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.tcDate}
              </Text>
            </View>
          )}
          {data.tcSchool == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                School:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.tcSchool}
              </Text>
            </View>
          )}
          {data.sslcNameOfBoard == undefined &&
          data.sslcPassingTime == undefined &&
          data.sslcRegisterNo == undefined ? (
            ""
          ) : (
            <Text
              style={{ ...styles.newAdmissionHeading, alignSelf: "center" }}
            >
              Details of Qualifiying Examination
            </Text>
          )}
          {data.sslcNameOfBoard == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Name of board:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.sslcNameOfBoard}
              </Text>
            </View>
          )}
          {data.sslcPassingTime == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Passing time:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.sslcPassingTime}
              </Text>
            </View>
          )}
          {data.sslcRegisterNo == undefined ? (
            ""
          ) : (
            <View style={{ flexDirection: "row", gap: 30, paddingLeft: 20 }}>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                Register No:
              </Text>
              <Text style={{ flex: 1, color: styles.colors.text._50 }}>
                {" "}
                {data.sslcRegisterNo}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
}
