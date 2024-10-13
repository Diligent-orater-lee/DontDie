/**
 * @format
 */
import notifee from '@notifee/react-native';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { onBackgroundEvent } from './services/notificationService';

function backgroundTask() {
  return notifee.onBackgroundEvent(onBackgroundEvent);
}

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('BackgroundTask', () => backgroundTask);
