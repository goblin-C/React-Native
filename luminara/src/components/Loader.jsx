import Lottie from 'lottie-react-native';
import loading from '../assets/lottie/loading.json';
import { StyleSheet } from 'react-native';


const Loader = ({ width = '100%', height = '100%', style }) => {
    return (
        <Lottie
            source={loading}
            style={[
                styles.loaderBase,
                { width, height },
                style
            ]}
            autoPlay
            loop
        />
    )
}

export default Loader

const styles = StyleSheet.create({
    loaderBase: {
        overflow: 'hidden',
    },
})


