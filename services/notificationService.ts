import notifee, { AndroidColor, AndroidImportance, AndroidStyle, EventType, TimestampTrigger, TriggerType } from '@notifee/react-native';
import { NativeModules } from 'react-native';

export const createChannel = async () => {
  return await notifee.createChannel({
    id: 'alarm',
    name: 'Alarm Channel',
    importance: AndroidImportance.HIGH,
    sound: 'alarm_sound',
  });
};

export const scheduleNotification = async (channelId: string) => {
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: Date.now() + 5000, // 5 seconds from now (for testing)
  };

  await notifee.createTriggerNotification(
    {
      title: 'Alarm',
      body: 'Wake up!',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        sound: 'hollow',
        vibrationPattern: [300, 500],
        lights: [AndroidColor.RED, 300, 600],
        fullScreenAction: {
          id: 'default',
          launchActivity: 'default'
        },
        style: {
          type: AndroidStyle.BIGPICTURE,
          picture: 'https://example.com/alarm-image.png',
        },
      },
      data: {test: "Data of testing"}
    },
    trigger,
  );
};

export const onBackgroundEvent = async ({ type, detail }: { type: EventType; detail: any }) => {
  if (type === EventType.PRESS) {
    const a = await NativeModules.LaunchManager.openApp('NotificationViewPage', JSON.stringify(detail.notification));
  } else if (type === EventType.DISMISSED) {
    console.log('User dismissed notification', detail.notification);
  }
};