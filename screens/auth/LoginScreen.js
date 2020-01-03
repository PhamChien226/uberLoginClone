import React, { Component } from 'react'
import {
    View,
    Text,
    ImageBackground,
    Image,
    TouchableOpacity,
    TextInput,
    Animated,
    Dimensions,
    Keyboard,
    Platform
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import { Icon } from 'native-base'

const SCREEN_HEIGHT = Dimensions.get('window').height;
class LoginScreen extends Component {

    componentWillMount() {

        this.loginHeight = new Animated.Value(150);

        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow',
            this.keyboardWillShow)

        this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide',
            this.keyboardWillHide)

        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow',
            this.keyboardwillShow)

        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide',
            this.keyboardWillHide)

        this.keyboardHeight = new Animated.Value(0);
        this.forwardArrowOpacity = new Animated.Value(0);
        this.borderBottomWidth = new Animated.Value(0);

    }

    keyboardWillShow = (event) => {

        console.log("listener sucess")
        let duration;

        if(Platform.OS == 'android'){
            duration = 100
        }
        else {
            duration = event.duration
        }

        Animated.parallel([

            Animated.timing(this.keyboardHeight, {
                duration:500,//duration cua ban phim + 100
                toValue: 250
            }),

            Animated.timing(this.forwardArrowOpacity, {
                duration:500,
                toValue: 1
            }),

            Animated.timing(this.borderBottomWidth, {
                duration:duration + 100,
                toValue: 1
            })
        ]).start()

    }

    keyboardWillHide = (event) => {
        let duration;

        if(Platform.OS == 'android'){
            duration = 100
        }else {
            duration = event.duration
        }

        Animated.parallel([

            Animated.timing(this.keyboardHeight, {
                duration: duration + 100,//duration cua ban phim + 100
                toValue: 10
            }),

            Animated.timing(this.forwardArrowOpacity, {
                duration: duration + 100,
                toValue: 0
            }),

            Animated.timing(this.borderBottomWidth, {
                duration: duration + 100,
                toValue: 0
            })
        ]).start()

    }

    increaseHeightOfLogin = () => {

        Animated.timing(this.loginHeight, {
            toValue: SCREEN_HEIGHT,
            duration: 500
        }).start(() => {
            this.refs.textInputMobile.focus();
        })
    }

    decreaseHeightOfLogin = () => {

        Keyboard.dismiss()
        Animated.timing(this.loginHeight, {
            toValue: 150,
            duration: 500
        }).start()

    }
    render() {
        console.log(this.keyboardHeight)
        console.log(this.forwardArrowOpacity)
        console.log("I'm here")

        const headerTextOpacity = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [1, 0]
        })

        const marginTop = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [25, 70]
        })

        const opacityBackArrow = this.loginHeight.interpolate({
            inputRange: [150, SCREEN_HEIGHT],
            outputRange: [0, 1]
        })

        // const BottomButtonForWard = this.loginHeight.interpolate({
        //     inputRange:[150,SCREEN_HEIGHT],
        //     outputRange:[10,250]
        // })

        // const OpacityButtonForWard = this.loginHeight.interpolate({
        //     inputRange:[150,SCREEN_HEIGHT],
        //     outputRange:[0,1]
        // })
        return (
            <View style={{ flex: 1, }}>

                <Animated.View
                    style={{
                        position: 'absolute',
                        height: 60, width: 60,
                        top: 60,
                        left: 25,
                        zIndex: 100,
                        opacity: opacityBackArrow
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.decreaseHeightOfLogin()}
                    >
                        <Icon name="md-arrow-back" style={{ color: 'black' }} />
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={{
                        height: 60,
                        width: 60,
                        backgroundColor: '#54475e',
                        position: 'absolute',
                        right: 10,
                        bottom: this.keyboardHeight,
                        opacity: this.forwardArrowOpacity,
                        zIndex: 100,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Icon name="md-arrow-forward" style={{ color: 'white' }} />
                </Animated.View>

                <ImageBackground
                    source={require('../../assets/bgLogin.jpg')}
                    style={{ flex: 1 }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Animatable.View
                            animation="zoomIn" iterationCount={1}
                            style={{
                                justifyContent: 'center', alignItems: 'center',
                                height: 100, width: 100, backgroundColor: 'white'
                            }}>
                            <Text style={{
                                fontSize: 24, fontWeight: "bold",
                            }}>
                                UBER
                            </Text>
                        </Animatable.View>
                    </View>

                    {/** BOTTOM HALF */}
                    <Animatable.View animation="slideInUp" iterationCount={1}>

                        <Animated.View style={{
                            height: this.loginHeight,
                            backgroundColor: 'white'
                        }}>
                            <Animated.View style={{
                                opacity: headerTextOpacity,//animated
                                alignItems: 'flex-start',
                                paddingHorizontal: 25,
                                marginTop: marginTop
                            }}>
                                <Text style={{ fontSize: 24, }}>Get moving with Uber</Text>
                            </Animated.View>

                            <TouchableOpacity
                                onPress={() => this.increaseHeightOfLogin()}
                            >
                                <View
                                    style={{
                                        marginTop: 25,
                                        paddingHorizontal: 25,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <Image
                                        source={require('../../assets/vietnamemes.jpg')}
                                        style={{
                                            height: 24, width: 24, resizeMode: 'contain'
                                        }}
                                    />

                                    <Animated.View
                                        pointerEvents="none"
                                        style={{
                                            flexDirection: 'row', flex: 1,
                                            justifyContent: 'center', alignItems: 'center',
                                            borderBottomWidth: this.borderBottomWidth
                                        }}>
                                        <Text style={{ fontSize: 17, paddingHorizontal: 10 }}>+84</Text>
                                        <TextInput
                                            ref="textInputMobile"
                                            keyboardType='number-pad'
                                            style={{ flex: 1, fontSize: 20 }}
                                            placeholder="Enter your mobile number"
                                            underlineColorAndroid="transparent"
                                        />
                                    </Animated.View>
                                </View>
                            </TouchableOpacity>

                        </Animated.View>

                        <View style={{
                            height: 70,
                            alignItems: 'flex-start', justifyContent: 'center',
                            backgroundColor: 'white',
                            borderTopColor: '#e8e8ec',
                            borderTopWidth: 1,
                            paddingHorizontal: 25
                        }}>
                            <Text style={{ fontSize: 14, color: '#5a7def' }}>
                                Or connect using a social account
                        </Text>
                        </View>

                    </Animatable.View>
                </ImageBackground>
            </View>
        )
    }
}

export default LoginScreen