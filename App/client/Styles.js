import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    socialContainer: {
        flex: 1,
        backgroundColor: "#61dafb",
    },
    casinoContainer: {
        flex: 1,
        backgroundColor: "#61dafb",
    },
    logInContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        backgroundColor: "#20232a"
    },
    title: {
        marginTop: 55,
        paddingVertical: 8,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        color: "#20232a",
    },
    titleText: {
        textAlign: "center",
        fontSize: 30,
        fontWeight: "bold"
    },
    

    logInButton: {
        marginLeft: 150,
        marginRight: 150,
        marginTop: 10,
        paddingVertical: 4,
        borderWidth: 4,
        borderColor: "#20232a",
        borderRadius: 6,
        backgroundColor: "#61dafb",
        
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    appleButton: {
        width: '100%',
        height: 45,
        shadowColor: '#555',
        shadowOpacity: 0.5,
        shadowOffset: {
            width: 0,
            height: 3
        },
        marginVertical: 15,
      }
})

export default styles;
