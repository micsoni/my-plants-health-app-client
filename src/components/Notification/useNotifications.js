import { useState, useEffect } from "react";
import request from "superagent";

import {
  isPushNotificationSupported,
  askUserPermission,
  registerServiceWorker,
  createNotificationSubscription,
  getUserSubscription
} from "./push-notifications";

const baseUrl = "http://localhost:4000";

const pushNotificationSupported = isPushNotificationSupported();

export default function usePushNotifications() {
  const [userConsent, setUserConsent] = useState(Notification.permission);
  const [userSubscription, setUserSubscription] = useState(null);
  const [pushServerSubscriptionId, setPushServerSubscriptionId] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    if (pushNotificationSupported) {
      setError(false);
      registerServiceWorker();
    }
  }, []);

  useEffect(() => {
    setError(false);
    const getExixtingSubscription = async () => {
      const existingSubscription = await getUserSubscription();
      setUserSubscription(existingSubscription);
    };
    getExixtingSubscription();
  }, []);

  const onClickAskUserPermissionAndSubscribe = user => {
    setError(false);

    askUserPermission().then(consent => {
      setUserConsent(consent);
      if (consent !== "granted") {
        setError({
          message: "You need to give consent to receive notifications"
        });
        return;
      }

      if (consent === "granted" && !userSubscription) {
        createNotificationSubscription()
          .then(function(subscription) {
            setUserSubscription(subscription);
            return subscription;
          })
          .catch(err => {
            console.error("Couldn't create the notification subscription", err);
            setError(err);
          })
          .then(function SendSubscriptionToPushServer(subscription) {
            console.log(JSON.parse(JSON.stringify(subscription)));
            request
              .post(`${baseUrl}/subscription`)
              .set("Authorization", `Bearer ${user.jwt}`)
              .send(JSON.parse(JSON.stringify(subscription)))
              .then(function(response) {
                setPushServerSubscriptionId(response.body.id);
              })
              .catch(err => {
                setError(err);
              });
          });
      }
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
