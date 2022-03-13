const { NotificationService } = require("./util/NotificationAPI");

const NOTIF_TYPE_KEY = "LeaveRequest";
const NOTIF_TYPE_VERSION = "0.3";

function createNotificationType() {
  return {
    NotificationTypeKey: NOTIF_TYPE_KEY,
    NotificationTypeVersion: NOTIF_TYPE_VERSION,
    Templates: [
      {
        Language: "en",
        TemplateSensitive: "Leave Request {{reqId}} requires your approval",
        TemplatePublic: "Leave request is pending...",
        TemplateGrouped: "Leave Request {{count}}",
        TemplateLanguage: "Mustache",
        Subtitle: "Ranjith requested leave from 04-04-2022 to 08-04-2022",
      },
    ],
    Actions: [
      {
        ActionId: "AcceptLRActionKey",
        Language: "en",
        ActionText: "Accept",
        GroupActionText: "Accept All",
        Nature: "POSITIVE",
      },
      {
        ActionId: "RejectLRActionKey",
        Language: "en",
        ActionText: "Reject",
        GroupActionText: "Reject All",
        Nature: "NEGATIVE",
      },
    ],
  };
}

function createNotification(reqId, count, recipients) {
  return {
    OriginId: "leave-req-dest",
    NotificationTypeKey: NOTIF_TYPE_KEY,
    NotificationTypeVersion: NOTIF_TYPE_VERSION,
    NavigationTargetAction: "DisplayMyInbox",
    NavigationTargetObject: "WorkflowTask",
    Priority: "High",
    ProviderId: "",
    ActorId: "NAIRA",
    ActorType: "",
    ActorDisplayText: "",
    ActorImageURL: "",
    Properties: [
      {
        Key: "requester_email",
        Language: "en",
        Value: "me@sap.com",
        Type: "String",
        IsSensitive: false,
      },
      {
        Key: "from",
        Language: "en",
        Value: "04-04-2022",
        Type: "String",
        IsSensitive: true,
      },
      {
        Key: "to",
        Language: "en",
        Value: "08-04-2022",
        Type: "String",
        IsSensitive: true,
      },
      {
        Key: "count_total",
        Language: "en",
        Value: "1",
        Type: "Integer",
        IsSensitive: true,
      },
    ],
    Recipients: [{ RecipientId: "ranjith13119@gmail.com" }],
  };
}

async function publishSupplyWarningNotification(notification) {
  const notifTypes = await NotificationService.getNotificationTypes();

  const notifType = notifTypes.find(
    (nType) =>
      nType.NotificationTypeKey === NOTIF_TYPE_KEY &&
      nType.NotificationTypeVersion === NOTIF_TYPE_VERSION
  );
  if (!notifType) {
    console.log(
      `Notification Type of key ${NOTIF_TYPE_KEY} and version ${NOTIF_TYPE_VERSION} was not found. Creating it...`
    );
    await NotificationService.postNotificationType(createNotificationType());
  }

  return await NotificationService.postNotification(
    createNotification(notification)
  );
}

module.exports = { publishSupplyWarningNotification };
