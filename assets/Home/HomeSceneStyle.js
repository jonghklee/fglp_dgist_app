import { Dimensions, StyleSheet } from "react-native";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const topbarheight = 70;
const defaultmargin = 20;
const defaultinterval = 18;
const roundradius = 30;
const progressbarheight = 22;
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
        flex: 1,
        backgroundColor: 'white',
    },
    scrollform: {
        alignItems: 'center',
    },
    topbar: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: topbarheight,
        flexDirection: 'row',
        paddingTop: 10,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: defaultmargin,
        paddingRight: defaultmargin,
        zIndex: 5,
    },
    profileform: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileicon: {
        marginLeft: 7,
        width: 38,
        height: 38,
        backgroundColor: 'black',
        borderRadius: 50,
    },
    dateform: {
        borderRadius: roundradius,
        paddingLeft: 15,
        paddingRight: 25,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        flexDirection: 'row',
        overflow: 'hidden',
    },
    flightform: {
        width: '75%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    progressbar: {
        position: 'absolute',
        bottom: 0,
        height: progressbarheight,
        borderRadius: 100,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: 10,
        zIndex: 1,
        left: 0,
    },
    ddayform: {
        height: 90,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    currencyform: {
        paddingTop: defaultinterval,
        paddingLeft: defaultmargin,
        paddingBottom: defaultinterval,
        borderRadius: roundradius,
        flex: 1,
        backgroundColor: 'white',
    },
    brcardform: {
        marginLeft: defaultmargin,
        paddingTop: defaultinterval,
        paddingBottom: defaultinterval,
        paddingLeft: defaultmargin,
        borderRadius: roundradius,
        flex: 1,
        backgroundColor: 'white',
    },
    mealform: {
        marginTop: 5,
        paddingLeft: defaultmargin,
        paddingRight: defaultmargin,
        paddingTop: 15,
        paddingBottom: 13,
        width: '100%',
        height: 82,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    menuiconform: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 55,
        alignItems: 'baseline',
    },
    menuform: {
        backgroundColor: '#DFECFF',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20+bottomtabbarheight,
    },
    menu: {
        width: windowWidth-60,
        marginTop: 6,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});