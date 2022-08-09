import { StyleSheet, Text, View,TouchableOpacity, Image,ScrollView } from 'react-native'
import React from 'react'
import { colors, parameters } from '../globals/styles'
import { Icon } from 'react-native-elements'



function LandingPage({ navigation }) {
    const [show, setShow] = React.useState(false);
    return (
        <View style={styles.container}>
                <View style={styles.header}>
                <Image source={require('../../assets/images/logo.jpg')} style={styles.logo}/>
                    <TouchableOpacity style={styles.icon1} onPress={() => setShow((s) => !s)}> 
                        <Icon type="material-community"
                            name="menu"
                            color={colors.orange}
                            size={40} />
                    </TouchableOpacity>
                </View>
                {show ? <View style={styles.menuBox}>
                    <TouchableOpacity><Text style={styles.navigationMenuText}>Home</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.navigationMenuText}>What are we doing?</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={styles.navigationMenuText}>FAQ</Text></TouchableOpacity>
                </View> : <View style={styles.menuBoxHide}></View>}
                <ScrollView style={styles.scrollview} >
                <View style={styles.mainBox}>
                    <View style={styles.title}>
                    <Text style={styles.Welcometxt}>Welcome to</Text>
                    <Text style={styles.Welcometxtsub}>Suraki maga!</Text>
                    </View>
                    
                    <Image source={require('../../assets/images/Picture1.png')} style={styles.midImage}/>
                    <TouchableOpacity style={styles.button1}
                        onPress={() => navigation.navigate('Registration')}>
                        <Text style={styles.button1Text}>Get Started!</Text>
                    </TouchableOpacity> 
                </View>
                <Text style={styles.smallText}>Already a registered driver?</Text>
                <TouchableOpacity style={styles.button2} 
                    onPress={() => navigation.navigate('Login')
                }>
                    <Text style={styles.button2Text}>Log in</Text>
                </TouchableOpacity>
            </ScrollView>
            <View style={styles.footer}>
                <TouchableOpacity><Text style={styles.footerText}>Terms & conditions</Text></TouchableOpacity>
                <TouchableOpacity><Text style={styles.footerText}>Contact us</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default LandingPage

const styles = StyleSheet.create({
    container:{
        // flex:1,
        display:"flex",
        backgroundColor:colors.white,
        // paddingBottom:30,
        // justifyContent:'center',
        height:parameters.SCREEN_HEIGHT,
        paddingTop:parameters.statusBarHeight,
        alignItems:'center'
    },
    scrollview:{
        marginBottom:parameters.SCREEN_HEIGHT/50,
        // backgroundColor:"yellow",
        
    },
    mainBox:{
        display:"flex",
        alignItems:'center',
        justifyContent:'space-around',
        width:parameters.SCREEN_WIDTH*6/7,
        height:parameters.SCREEN_HEIGHT*2/3,
        backgroundColor:colors.midBoxWhite,
        borderRadius:10,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2
    },
    header:{
        display:"flex",
        flexDirection:"row",
        backgroundColor:colors.white,
        height:parameters.headerHeight,
        alignItems:"center",
        width:parameters.SCREEN_WIDTH*7/8,
        // height:parameters.SCREEN_HEIGHT/7,
        justifyContent:'space-between'
    },
    logo:{
        
        width:parameters.SCREEN_WIDTH*1/8,
        height:parameters.SCREEN_HEIGHT*0.5/8
    },
    icon1:  {
        display:"flex",
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        width:80,
        height:100,
    },
    menuBoxHide:{
        display:'none'
    },
    menuBox:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.midBoxWhite,
        borderRadius:10,
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
        width:parameters.SCREEN_WIDTH*7/8,
        height:parameters.SCREEN_HEIGHT*1.5/8,
        marginBottom:20
    },
    navigationMenuText:{
        fontSize:30,
        fontWeight:'bold',
        color:colors.orange,
        marginBottom:10,
        marginTop:10
    },
    title:{
        display:'flex',
        
        // justifyContent:'center',
        alignItems:'center'
    },
    Welcometxt:{
        fontFamily:'sans-serif-medium',
        paddingTop:20,

        color:colors.font,
        fontSize:30
    },
    Welcometxtsub:{
        fontFamily:'sans-serif-medium',
        color:colors.font,
        fontWeight:'bold',
        fontSize:40
    },
    midImage:{
        width:parameters.SCREEN_WIDTH*6/8,
        height:parameters.SCREEN_HEIGHT*2.5/8
    },
    button1:{
        height:50,
        width:200,
        backgroundColor:colors.orange,
        borderRadius:20,
        alignItems:"center",
        justifyContent:"center",
        // marginTop:50
    },
    button1Text:{
        color:colors.white,
        fontSize:25,
        fontFamily:'sans-serif-medium',
        marginTop:-2
    },
    button2:{
        height:35,
        width:120,
        backgroundColor:colors.white,
        borderRadius:20,
        borderWidth:2,
        alignSelf:'center',
        borderColor:colors.grey,
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        marginBottom:parameters.SCREEN_WIDTH/50
    },
    button2Text:{
        color:colors.font,
        fontSize:20,
        fontFamily:'sans-serif-medium',
        marginTop:-2
    },
    smallText:{
        marginTop:20,
        fontSize:16,
        alignSelf:'center'
    },
    footer:{
        display:"flex",
        flexDirection:'row',
        width:parameters.SCREEN_WIDTH,
        height:parameters.SCREEN_HEIGHT/20,
        backgroundColor:colors.grey,
        // alignItems:'center',
        paddingLeft:20,
        paddingRight:20,
        justifyContent:'space-between'
    },
    footerText:{
        marginTop:10,
        fontSize:16,
        color:'white'
    }
})