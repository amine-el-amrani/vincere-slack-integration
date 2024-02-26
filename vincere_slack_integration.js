// Function to retrieve job details from Vincere API
function getJobDetails(jobId) {
    var tokenResponse = getToken();

    if (!tokenResponse || !tokenResponse.id_token) {
        console.error("Failed to retrieve ID token from Vincere API.");
        return;
    }

    var jobDetails = fetchJobDetails(jobId, tokenResponse.id_token);

    if (jobDetails) {
        console.log("Job details for Job ID " + jobId + ":");
    } else {
        console.error("Failed to retrieve job details from Vincere API.");
    }
}

// Function to retrieve access_token and id_token from Vincere API
function getToken() {
    var url = "https://id.vincere.io/oauth2/token";
    var payload = "client_id= YOUR_CLIENT_ID_HERE";
    
    var options = {
        "method": "post",
        "contentType": "application/x-www-form-urlencoded",
        "payload": payload,
        "muteHttpExceptions": true,
        "headers": {
            "x-api-key": "YOUR_API_KEY_HERE"
        }
    };

    var response = UrlFetchApp.fetch(url, options);

    if (response.getResponseCode() === 200) {
        return JSON.parse(response.getContentText());
    } else {
        console.error("Failed to retrieve access token from Vincere API.");
        return null;
    }
}

// Function to fetch job details using id_token
function fetchJobDetails(jobId, idToken) {
    var url = "https://zenith.vincere.io/api/v2/position/" + jobId;
    
    var headers = {
        "content-type": "application/json",
        "id-token": idToken,
        "x-api-key": "YOUR_API_KEY_HERE"
    };

    var options = {
        "method": "get",
        "headers": headers,
        "muteHttpExceptions": true
    };

    var response = UrlFetchApp.fetch(url, options);

    return JSON.parse(response.getContentText());

}


// Fonction principale pour traiter les données reçues et les envoyer à Slack
function doPost(e) {
var data = JSON.parse(e.postData.contents);

// Récupérer uniquement entityId wish is jobId
var jobId = data.entityId;

var tokenResponse = getToken();

if (!tokenResponse || !tokenResponse.id_token) {
    console.error("Failed to retrieve ID token from Vincere API.");
    return;
}

var jobDetails = fetchJobDetails(jobId, tokenResponse.id_token);

if (!jobDetails) {
    console.error("Failed to retrieve job details from Vincere API.");
    return;
}

var { job_title, job_type, employment_type, live_list_url } = jobDetails;

// Déterminer le message en fonction de l'action
var action_type = data.actionType;
var message;

if (action_type === "UPDATE") {
    message = "### JOB UPDATED IN VINCERE###\n" +
            "Job Title : " + job_title + "\n" +
            "Job Type : " + job_type + "\n" +
            "Employment Type : " + employment_type + "\n" +
            "Url : " + live_list_url;
} else if (action_type === "CREATE") {
    message = "### NEW JOB CREATED IN VINCERE###\n" +
            "Job Title : " + job_title + "\n" +
            "Job Type : " + job_type + "\n" +
            "Employment Type : " + employment_type + "\n" +
            "Url : " + live_list_url;
} else {
    console.error("Unknown action type: " + action_type);
    return;
}

// Envoyer le message à Slack
var payload = {
    "text": message
};

var slackWebhookUrl = "YOUR_SLACK_WEBHOOK_URL_HERE";

var options = {
    "method": "post",
    "contentType": "application/json",
    "payload": JSON.stringify(payload)
};

UrlFetchApp.fetch(slackWebhookUrl, options);
}
