import { StyleSheet, Text, View,TouchableOpacity, Dimensions,Image,ScrollView } from 'react-native'
import React from 'react'
import { colors, parameters } from '../globals/styles'
import { ScreenHeight, ScreenWidth } from '@rneui/base'
import { Icon } from 'react-native-elements'
import DropShadow from "react-native-drop-shadow";
import { useFonts } from 'expo-font';



function LandingPage() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                <Image source={require('../../assets/images/logo.jpg')} style={styles.logo}/>
                    <TouchableOpacity style={styles.icon1}>
                        <Icon type="material-community"
                            name="menu"
                            color={colors.orange}
                            size={40} />
                    </TouchableOpacity>
                    
                </View>
                <View style={styles.mainBox}>
                    <View style={styles.title}>
                    <Text style={styles.Welcometxt}>Welcome to</Text>
                    <Text style={styles.Welcometxtsub}>Suraki maga!</Text>
                    </View>
                    
                    <Image source={require('../../assets/images/Picture1.png')} style={styles.midImage}/>
                    <TouchableOpacity style={styles.button1}>
                        <Text style={styles.button1Text}>Get Started!</Text>
                    </TouchableOpacity> 
                </View>
                <Text style={styles.smallText}>Already a registered driver?</Text>
                <TouchableOpacity style={styles.button2}>
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
        marginTop:20
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
        marginTop:20,
        fontSize:16,
        color:'white'
    }
})