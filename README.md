# Vincere-Slack Integration

This script facilitates seamless integration between Vincere and Slack, allowing you to receive notifications in a Slack channel for various events occurring in Vincere.

## Configure Slack Webhook

1. Create a new Slack app in your Slack workspace.
2. Navigate to "Incoming Webhooks" and create a new webhook.
3. Select the channel where you want to receive notifications and copy the webhook URL.
4. Replace the `slackWebhookUrl` variable in the Google Apps Script code with your copied webhook URL.

## Setting Up Google Apps Script

1. Create a new project in Google Apps Script.
2. Copy the provided script into your new project.
3. Replace the `slackWebhookUrl` variable in the script with your Slack webhook URL.
4. Deploy the project as a web application.
5. Copy the URL of the deployed web application.

## Create Vincere Webhook

1. Refer to the Vincere API documentation here for creating webhooks.
2. Obtain your API key from Vincere.
3. Configure a new webhook in Vincere's settings with the URL of the deployed Google Apps Script web application.
4. Choose the appropriate events for which you want to receive notifications.

## Managing Webhooks in Vincere

You can use the Vincere API to manage webhooks programmatically. Below are examples of cURL requests for creating, retrieving, and modifying webhooks:

### Creating a Webhook

Example cURL request:
```bash
curl --request POST \
     --url https://api.vincere.io/v3/webhooks \
     --header 'accept: application/json' \
     --header 'api-key: your_api_key' \
     --header 'content-type: application/json' \
     --data '{
       "type": "transactional",
       "url": "your_google_apps_script_web_app_url",
       "events": [
         "event1",
         "event2",
         "event3"
       ]
     }'
```

### Retrieving a Webhook

Example cURL request:
```bash
curl --request GET \
     --url https://api.vincere.io/v3/webhooks/your_webhook_id \
     --header 'accept: application/json' \
     --header 'api-key: your_api_key'
```

### Modifying a Webhook

Example cURL request
```bash
curl --request PUT \
     --url https://api.vincere.io/v3/webhooks/your_webhook_id \
     --header 'accept: application/json' \
     --header 'api-key: your_api_key' \
     --header 'content-type: application/json' \
     --data '{
       "events": [
         "modified_event1",
         "modified_event2"
       ]
     }'
```

## Testing

After setting up the integration, perform tests to ensure that notifications are correctly delivered to your Slack channel for the specified Vincere events.

Congratulations! You have successfully integrated Vincere with Slack. Happy notifying!