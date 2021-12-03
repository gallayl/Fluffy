#include "wifi.h"
#include "storage.h"
#include "ftp.h"
#include "web.h"

void setup() {
    Serial.begin(9600);
    setupStorage();
    setupWifi();
    setupFtp();
    setupWebServer();
}

void loop() {
    ftp.handleFTP();
    webServer.handleClient();
}