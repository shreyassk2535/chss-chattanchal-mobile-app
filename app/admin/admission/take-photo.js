import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSearchParams } from "expo-router";
import { Camera, CameraType } from "expo-camera";
import { useRef, useState, useEffect } from "react";

import * as ImageManipulator from "expo-image-manipulator";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import { useFocusEffect } from "@react-navigation/native";

let data;

// import { Buffer } from "buffer";

// import styles from "../../../styles/styles";

import { Axios } from "../../../stores/Axios";
import axios from "axios";

let Screen = Dimensions.get("window");
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;

// const ws = new WebSocket("ws://192.168.20.13:9000/ws/admission-photo");

export default function TakePhoto() {
  const params = useSearchParams();
  // console.log(params);

  const [type, setType] = useState(CameraType.back);
  const [imageData, setImageData] = useState();
  const [imgBase64, setImageBase64] = useState();
  const [hasPermission, setHasPermission] = Camera.useCameraPermissions();
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const [scanData, setScanData] = useState();
  // const [img, setImg] = useState();
  const [focus, setFocus] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [webSocket, setWebSocket] = useState();

  const cameraRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      // alert('Screen was focused');
      setFocus(true);

      setWebSocket(new WebSocket("ws://192.168.162.147:9000/ws/admission-photo"));

      return () => {
        // alert('Screen was unfocused');
        // Useful for cleanup functions
        setFocus(false);

        if (webSocket) {
          webSocket.close();
        }
      };
    }, [])
  );

  // if (webSocket && !focus) {
  //   webSocket.close();
  // }

  // useEffect(() => {
    
  //   setWebSocket(new WebSocket("ws://192.168.20.13:9000/ws/admission-photo"));
  //   return () => {
  //     if (webSocket) {
  //       webSocket.close();
  //     }
  //   };
  // }, []);

  // useEffect(()=>{

  // }, [webSocket])

  function sendData() {
    const data = {
      targetId: scanData,
      name: "image",
      message: { "image": imgBase64 },
    };
    webSocket.send(JSON.stringify(data));
    console.log("send");
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  function toggleFlashMode() {
    setFlash((current) =>
      current === Camera.Constants.FlashMode.off
        ? Camera.Constants.FlashMode.torch
        : Camera.Constants.FlashMode.off
    );
  }

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        // console.log(data);

        setImageData(data);
        cropAndUploadImage(data);
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (!hasPermission === null) {
    return <Text>Please grant camera permission!</Text>;
  }

  async function cropAndUploadImage(imageData) {
    // try {
    // Crop the image using ImageManipulator
    setProcessing(true);
    const { base64, uri } = await ImageManipulator.manipulateAsync(
      imageData.uri,
      [
        {
          crop: {
            originX: 0,
            originY: 0,
            width: imageData.width,
            height: imageData.width,
          },
        },
        { resize: { width: 320 } },
      ],
      { compress: 0, format: "png", base64: true }
    );

    data = uri;
    setImageBase64(base64)

    // const croppedImage = await ImagePicker.openCropper({
    //   path: imageData.uri,
    //   width: imageData.width,
    //   height: imageData.width,
    //   cropperCircleOverlay: false,
    //   includeBase64: true,
    // });
    // // Do something with the cropped image
    // console.log(croppedImage.data);

    setProcessing(false);

    // console.log("finished")
    // const buffer = Buffer.from(base64, "base64");

    // const blob = new Blob([buffer], { type: '[content-type]' })

    // const fd = new FormData();
    // fd.append("attachments", {
    //   uri: blob,
    //   name: "logo",
    //   filename: "logo",
    //   type: "image/png",
    // });

    // axios
    //   .post(
    //     `http://192.168.162.147:9000/api/admin/upload-student-photo?studentId=6469a9d6db78abed6474dc43`,
    //     fd
    //   )
    //   .then(console.log("finished"))
    //   .catch((err) => {
    //     if (err.response.data != undefined) {
    //       console.log(err);
    //     } else {
    //       console.log("Server connection error");
    //     }
    //     console.log(err)
    //   });
  }

  function handleBarCodeScanned({ type, data }) {
    try {
      setScanData(data);
      // router.push({
      //   pathname: `/admin/admission/photo/take-photo`,
      //   params: { data: encodeURIComponent(data) },
      // });
      console.log(data);
    } catch (e) {
      console.log(e);
      setError("Invalid QR Code,Try again!");
    }
  }

  return (
    <>
      {/* <Text>{params.data}</Text> */}
      {scanData && (
        <View
          style={{
            flex: 1,
            minHeight: 90,
            maxHeight: 90,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            paddingHorizontal: 50,
          }}
        >
          {!imageData ? (
            <>
              <TouchableOpacity onPress={toggleCameraType}>
                <MaterialCommunityIcons
                  name="camera-flip"
                  size={30}
                  color="#555"
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleFlashMode}>
                <Ionicons name="flash" size={30} color="#555" />
              </TouchableOpacity>
            </>
          ) : (
            ""
          )}
        </View>
      )}

      <View
        style={{
          flex: 1,
          //    width: Screen.width,
          //       height: Screen.height - STATUS_BAR_HEIGHT - 63,
          // backgroundColor: "red",
          // paddingTop: 90,
        }}
      >
        <View
          style={{
            flex: 1,
            width: Screen.width,
            maxHeight: Screen.width,
            overflow: scanData ? "hidden" : "visible",
            minHeight: Screen.width,
          }}
        >
          {!imageData ? (
            focus && (
              <Camera
                ratio={scanData ? "4:3" : "16:9"}
                style={{
                  flex: 1,
                  width: scanData ? Screen.width : Screen.width + 50,
                  maxHeight: scanData
                    ? (Screen.width / 3) * 4
                    : (Screen.width / 9) * 16 + 50,
                  minHeight: scanData
                    ? (Screen.width / 3) * 4
                    : (Screen.width / 9) * 16 + 50,
                }}
                type={type}
                ref={cameraRef}
                flashMode={flash}
                onBarCodeScanned={scanData ? undefined : handleBarCodeScanned}
              />
            )
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ActivityIndicator
                style={{
                  position: "absolute",
                  alignSelf: "center",
                  // transform: [{ scaleX: 2.7 }, { scaleY: 2.7 }],
                }}
                size={"large"}
                color="gray"
                animating={processing}
              />
              <Image
                source={{ uri: data ? data : imageData.uri }}
                width={Screen.width}
                height={(Screen.width / 3) * 4}
                style={{
                  flex: 1,
                  width: data ? 320 : Screen.width,
                  maxHeight: data ? 320 : (Screen.width / 3) * 4,
                  minHeight: data ? 320 : (Screen.width / 3) * 4,
                  // zIndex: 999
                }}
              />
            </View>
          )}
        </View>
        {scanData &&
          (!imageData ? (
            // <View style={{paddingTop: "25%",}}>
            <View
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                flex: 1,
                paddingTop: 70,
              }}
            >
              <TouchableOpacity
                onPress={takePicture}
                style={{
                  backgroundColor: "#ddd",
                  borderColor: "#bbb",
                  borderWidth: 5,
                  width: 80,
                  minHeight: 80,
                  // alignSelf: "center",
                  borderRadius: 1000,
                  // flex: 2
                }}
              ></TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (flash == Camera.Constants.FlashMode.torch) {
                    setFlash(Camera.Constants.FlashMode.off);
                  } else {
                    setScanData(undefined);
                  }
                }}
                style={{
                  // alignSelf: "center",
                  backgroundColor: "#bbb",
                  // marginTop: 50,
                  minHeight: 50,
                  // flex: 1,
                  // alignItems: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Text style={{ color: "white", fontWeight: 600, fontSize: 17 }}>
                  Scan Again?
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                marginTop: "25%",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setImageData(null);
                  data = null;
                }}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#ccc",
                  borderRadius: 1000,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name="camera-retake"
                  size={40}
                  color="#555"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={sendData}
                style={{
                  width: 80,
                  height: 80,
                  backgroundColor: "#ccc",
                  borderRadius: 1000,
                  justifyContent: "center",
                  // alignItems: "center",
                  paddingLeft: 26,
                }}
              >
                {/* <Ionicons name="save" size={40} color="#555" /> */}
                <Ionicons name="send" size={35} color="#555" />
              </TouchableOpacity>
            </View>
          ))}

        {!scanData && (
          <>
            <View
              style={{
                width: Screen.width,
                height: Screen.height - STATUS_BAR_HEIGHT - 63,
                position: "absolute",
                flex: 1,
                zIndex: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  borderWidth: 5,
                  borderColor: "#fff",
                  width: 250,
                  height: 250,
                  borderRadius: 30,
                }}
              ></View>
            </View>

            <View
              style={{
                position: "absolute",
                padding: 30,
                backgroundColor: "black",
                opacity: 0.6,
                borderRadius: 20,
                alignSelf: "center",
                margin: 20,
              }}
            >
              <Text style={{ color: "white", fontWeight: 500, fontSize: 15 }}>
                Scan QR Code
              </Text>
            </View>
          </>
        )}
      </View>
    </>
  );
}
