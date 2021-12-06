#include "wifi.h"
#include "storage.h"
#include "ftp.h"
#include "web.h"
#include "servos.h"
#include <Wire.h>

void setup() {
    Serial.begin(9600);
    Wire.begin();
    delay(100);
    Serial.println("Wake up, Fluffy...");
    setupWifi();
    setupStorage();
    setupFtp();
    setupWebServer();
    setupServos();
}

void loop() {
    ftp.handleFTP();
}