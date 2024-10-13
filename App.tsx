import notifee from '@notifee/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { NativeEventEmitter, StyleSheet, View } from 'react-native';
import NotificationButton from './components/NotificationButton';
import { NotificationDetailsView } from './screens/NotificationDetailsView';
import { createChannel, onBackgroundEvent, scheduleNotification } from './services/notificationService';

const Stack = createNativeStackNavigator();

const App = () => {
    useEffect(() => {
        return notifee.onBackgroundEvent(onBackgroundEvent);
    }, []);
    
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="NotificationViewPage" component={NotificationDetailsView} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const HomeScreen = ({ navigation }: any) => {
    useEffect(() => {
        const eventEmitter = new NativeEventEmitter();
        const subscription = eventEmitter.addListener('AppLaunched', (data) => {
            if (data.page === 'NotificationViewPage') {
                console.log(data.data)
                navigation.navigate('NotificationViewPage', { additionalData: data.data });
            }
        });

        return () => subscription.remove();
    }, []);

    const handleScheduleNotification = async () => {
        await notifee.requestPermission();
        const channelId = await createChannel();
        await scheduleNotification(channelId);
    };

    return (
        <View style={styles.container}>
            <NotificationButton onPress={handleScheduleNotification} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;