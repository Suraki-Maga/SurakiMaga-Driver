
import  {getStatusBarHeight}  from 'react-native-status-bar-height';
import { Dimensions } from 'react-native';
export const colors={
    orange:'#FF8C01',
    grey:'#28231F',
    white:'#f2f2f2',
    font:'#090807',
    midBoxWhite:'#ffffff'
}

export const parameters={
    statusBarHeight :getStatusBarHeight(),
    headerHeight:90,
    SCREEN_WIDTH:Dimensions.get('window').width,
    SCREEN_HEIGHT:Dimensions.get('window').height
}
export const errors={
    fontColor:'red'
}