import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const defaultmargin = 20;
const intervalmergin = 18;
const roundradius = 20;
const roundradius2 = 10;
const bottomtabbarheight = 60;

export default styles = StyleSheet.create({
    borderProp: {
        borderWidth: 1.2,
        borderColor: '#EBEBEB',
    },
    shadowProp: {
        shadowOffset: {
            width: 0,
            height: 0.5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3,
        shadowColor: "#000",
        elevation: 3,
    },
    body: {
        backgroundColor: 'white',
        flex: 1,
    },
    maintext: {
        color: 'black',
        fontWeight: '700',
        fontSize: 28,
        fontHeight: 30,
        marginLeft: 30,
        marginTop: 70,
        marginBottom: 20,
        letterSpacing: -0.5,
    },
    createdeleteform: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: defaultmargin,
        paddingLeft: defaultmargin,
        paddingRight: defaultmargin,
        width: '100%',
        height: 45,
    },
    bottomtaskbar: {
        height: 60,
        bottom: 0,
        width: "100%",
        padding: 20,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
    },
    createbutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#0068FE',
        borderRadius: roundradius2,
    },
    deletebutton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: roundradius2,
        marginLeft: intervalmergin,
        borderWidth: 1,
        borderColor: '#EBEBEB',
    },
    createcategoryinput: {
        height: 55,
        marginTop: 4,
        marginBottom: 24,
        marginLeft: defaultmargin,
        marginRight: defaultmargin,
        paddingLeft: defaultmargin,
        paddingRight: defaultmargin,
        borderRadius: roundradius,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    categoryform: {
        marginLeft: defaultmargin,
        marginRight: defaultmargin,
        paddingTop: 9,
        paddingBottom: 12,
        paddingRight: defaultmargin,
        paddingLeft: defaultmargin,
        width: windowWidth-40,
        borderRadius: roundradius,
    },
    categorytext: {
        fontWeight: '700',
        fontSize: 20,
        color: 'black',
        marginBottom: 15,
    },
    todoform: {
        flexDirection: 'row',
        width: windowWidth-4*defaultmargin,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    checkbox: {
        borderRadius: 6,
        borderWidth: 1,
        borderColor: 'black',
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    todotext: {
        marginLeft: 5,
        width: 250,
        height: 30,
        justifyContent: 'center',
    },
    todoinput: {
        height: 25,
        fontWeight: '400',
        fontSize: 14,
        color: 'black',
        backgroundColor: 'transparent',
    },
    tutorialplusbutton: {
        marginTop: 15,
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tutorialplusicon: {
        borderRadius: 10,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0068FE',
    },
});