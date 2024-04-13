import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Button from "./components/Button";
import { useState } from "react";
import ImageViewer from "./components/ImageViewer";
import * as ImagePicker from "expo-image-picker";
import CircleButton from "./components/CircleButton";
import IconButton from "./components/IconButton";
import EmojiPicker from "./components/EmojiPicker";
import EmojiSticker from "./components/EmojiSticker";
import EmojiList from "./components/EmojiList";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const PlaceholderImage = require("./assets/images/background-image.png");

export default function App() {
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onSaveImageAsync = async () => {
    // we will implement this later
  };

  const [image, setImage] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      console.log(result);
      setShowAppOptions(true);
    } else {
      alert("You cancelled the image picker.");
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
    <View style={styles.container}>
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImageSource={PlaceholderImage}
          selectedImage={image}
        />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose a photo"
            onPress={pickImageAsync}
          />
          <Button
            theme="primary"
            label="Use this photo"
            onPress={() => showAppOptions(true)}
          />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 2,
    justifyContent: "center",
  },
  footerContainer: {
    flex: 1,
    padding: 40,
    alignItems: "center",
  },
});
