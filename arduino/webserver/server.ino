#include <Arduino.h>
#include <WiFi.h>
#include <esp_now.h>
#include <Arduino_JSON.h>
#include "ESPAsyncWebServer.h"
#include "Secrets.h" 

// const char* ssid = "utexas-iot";
// const char* password = "your-password"; 

AsyncWebServer server(80);

// Pin connected to the analog output of the MQ-3 sensor
const int sensorPin = A0;

void setup() {
    Serial.begin(115200);

    // Connect to Wi-Fi network
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Connecting to WiFi...");
    }
    Serial.println("Connected to WiFi");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());

    // Initialize web server
    server.on("/data", HTTP_GET, [](AsyncWebServerRequest *request){
        int sensorValue = analogRead(sensorPin);
        long timestamp = millis();

        JSONVar data;
        data["time"] = timestamp;
        data["value"] = sensorValue;
        String jsonData = JSON.stringify(data);
        request->send(200, "application/json", jsonData);
    });

    server.begin();
    Serial.println("Web server started");
}

void loop() {
    delay(1000);
}
