import { useState, useEffect } from "react";
import request from "superagent";

import {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription
} from "./push-notifications";

const baseUrl = "https://boiling-hamlet-55290.herokuapp.com";

const pushNotificationSupported = isPushNotificationSupported();

export default function usePushNotifications() {
  const [userConsent, setUserConsent] = useState(Notification.permission);
  const [userSubscription, setUserSubscription] = useState(null);
  const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pushNotificationSupported) {
      registerServiceWorker();
    }
  }, []);

  useEffect(() => {
    const getExixtingSubscription = async () => {
      const existingSubscription = await getUserSubscription();
      setUserSubscription(existingSubscription);
    };
    getExixtingSubscription();
  }, []);

  const onClickAskUserPermissionAndSubscribe = user => {
    return askUserPermission().then(consent => {
      setUserConsent(consent);
      if (consent !== "granted") {
        setError({
          message:
            "You need to give consent to create alarms and receive notifications"
        });
        return Promise.resolve(consent);
      }

      if (userSubscription) {
        return Promise.resolve(consent);
      }
      return createNotificationSubscription()
        .then(function(subscription) {
          setUserSubscription(subscription);
          return subscription;
        })
        .then(function SendSubscriptionToPushServer(subscription) {
          return request
            .post(`${baseUrl}/subscription`)
            .set("Authorization", `Bearer ${user.jwt}`)
            .send(JSON.parse(JSON.stringify(subscription)))
            .then(function(response) {
              setPushServerSubscriptionId(response.body.id);
              return Promise.resolve(consent);
            })
            .catch(err => {
              setError(err);
              return Promise.resolve(consent);
            });
        })
        .catch(err => {
          console.error("Couldn't create the notification subscription", err);
          setError(err);
          return Promise.resolve(consent);
        });
    });
  };

  return {
    onClickAskUserPermissionAndSubscribe,
    pushServerSubscriptionId,
    userConsent,
    pushNotificationSupported,
    userSubscription,
    error
  };
}
