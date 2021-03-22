import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        maxHeight: 1500
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    item: {
        marginVertical: 4
    },
    button: {
        width: "90%",
        height: "100%",
    },
    layout: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    lContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
