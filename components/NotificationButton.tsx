import React from 'react';
import { Button } from 'react-native';

interface Props {
  onPress: () => void;
}

const NotificationButton: React.FC<Props> = ({ onPress }) => (
  <Button title="Schedule Notification" onPress={onPress} />
);

export default NotificationButton;