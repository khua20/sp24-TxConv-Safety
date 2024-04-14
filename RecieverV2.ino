/*********
  Ashwin Prakash
  
*********/

#include <esp_now.h>
#include <WiFi.h>

#include <Arduino_JSON.h>
#include "ESPAsyncWebServer.h"

const char* ssid = "utexas-iot";
const char* password = "";

const int LED = 23;
const int buttonPin = 2;
const int buttonState = 0;  // variable for reading the pushbutton status
float alc;

JSONVar board;
AsyncWebServer server(80);
AsyncEventSource events("/events");

//Structure example to receive data
//Must match the sender structure
typedef struct test {
  int data;
} test;

//Create a struct_message called myData
test myData;

esp_now_peer_info_t peerInfo;

uint8_t broadcastAddress[] = {0x08, 0xD1, 0xF9, 0xE8, 0xF4, 0xA0 } ; 

//callback function that will be executed when data is received
void OnDataRecv(const uint8_t * mac, const uint8_t *incomingData, int len) {
  memcpy(&myData, incomingData, sizeof(myData));
  float voltage = myData.data * (5.0/1023.0);
  alc = map(voltage, 0.1, 4.0, 0, 100);
  Serial.print("Bytes received: ");
  Serial.println(len);
  Serial.print("x: ");
  Serial.println(alc);
  Serial.println(*mac);
}


void setup() {
  //Initialize Serial Monitor

  Serial.begin(9600);
  

  pinMode(LED, OUTPUT);
  
  //Set device as a Wi-Fi Station
  WiFi.mode(WIFI_STA);

  //Init ESP-NOW
  if (esp_now_init() != ESP_OK) {
    Serial.println("Error initializing ESP-NOW");
    return;

  }


  memcpy(peerInfo.peer_addr, broadcastAddress, 6);
  peerInfo.channel = 0;  
  peerInfo.encrypt = false;       
  if (esp_now_add_peer(&peerInfo) != ESP_OK){
    Serial.println("Failed to add peer"); // handle errors
    return;
  }
  
  // Once ESPNow is successfully Init, we will register for recv CB to
  // get recv packer info
  esp_now_register_recv_cb(OnDataRecv);

  Serial.print(WiFi.macAddress());

  /*Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  // Print local IP address and start web server
  Serial.println("");
  Serial.println("WiFi connected.");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  Serial.print("Wi-Fi Channel: ");
  Serial.println(WiFi.channel());

  */
}
 
void loop() {
  float voltage = myData.data * (5.0/1023.0);
  float alc = map(voltage, 0.1, 4.0, 0, 100);
  if(alc > 100){
    digitalWrite(LED, HIGH);
  } else {
    digitalWrite(LED, LOW);
  }
}
