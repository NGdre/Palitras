interface NotificationsSelector {
  notifications: {
    ofType: {
      all: [];
      read: [];
      unread: [];
    };
    amount: number;
    readAmount: number;
    unreadAmount: number;
    message: string;
    isLoading: boolean;
  };
}

export const selectAllNotifications = (state: NotificationsSelector) =>
  state.notifications.ofType.all;

export const selectReadNotifications = (state: NotificationsSelector) =>
  state.notifications.ofType.read;

export const selectUnreadNotifications = (state: NotificationsSelector) =>
  state.notifications.ofType.unread;

export const selectNotificationsAmount = (state: NotificationsSelector) =>
  state.notifications.amount;

export const selectUnreadNotificationsAmount = (state: NotificationsSelector) =>
  state.notifications.unreadAmount;

export const selectReadNotificationsAmount = (state: NotificationsSelector) =>
  state.notifications.readAmount;

export const selectNotificationsLoading = (state: NotificationsSelector) =>
  state.notifications.isLoading;

export const selectNotificationsResponseMessage = (
  state: NotificationsSelector
) => state.notifications.message;
