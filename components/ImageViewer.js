import { StyleSheet, Image, View } from 'react-native';

export default function ImageViewer({ placeholderImageSource }) {
  return (
    <View style={styles.imageContainer}>
    <Image source={placeholderImageSource} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
    image: {
        width: 320,
        paddingTop: 60,
        height: 440,
        borderRadius: 18,
        alignSelf: 'center', // Add this line to center the image horizontally
    },
    imageContainer: {
        paddingTop: 60,
        borderRadius: 18,
        overflow: 'hidden',
        alignItems: 'center', // Add this line to center the image vertically
        justifyContent: 'center', // Add this line to center the image horizontally
    },
});
