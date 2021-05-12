import React from 'react'
import {Text,View,TouchableOpacity,StyleSheet} from 'react-native'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as Permissions from 'expo-permissions'
export default class TransactionScreen extends React.Component{

    constructor(){
        super()
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal',
        }
    }


handleBarCodeScanned=async({type,data})=>{
    this.state({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
    })}

    getCameraPermissions=async()=>{
      const {status}=await Permissions.askAsync(Permissions.CAMERA)
      this.setState({
          hasCameraPermissions:status==='granted',
          buttonState:'clicked',
          scanned:false
      })  
    }

render(){
    const hasCameraPermissions=this.state.hasCameraPermissions
    const scanned=this.state.scanned
    const buttonState=this.state.buttonState
    if (buttonState==='clicked' && hasCameraPermissions) {
        return(
            <BarCodeScanner style={StyleSheet.absoluteFillObject}
            onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}
            />
        )
    }
    else if (buttonState==='normal'){
        return(
            <View style={{justifyContent:'center', alignItems:'center', flex: 1, }}>
                <Text style={styles.displayText}>
                    {hasCameraPermissions===true ? this.state.scannedData:'Request Camera Permission'}
                </Text>
                <TouchableOpacity
                style={styles.scanButton} 
                onPress={this.getCameraPermissions}
                >
                    <Text style={styles.buttonText}>Allow access to Camera</Text></TouchableOpacity>
            </View>
            )
    }
    
}
}

const styles=StyleSheet.create({
    displayText:{fontSize:15, textDecorationLine:'underline'},
    scanButton:{backgroundColor:'aqua', padding:10, margin:10},
    buttonText:{fontSize:20, color:'white'}

})

