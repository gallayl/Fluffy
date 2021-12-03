#pragma once

#define DEFAULT_STORAGE_TYPE_ESP8266 STORAGE_LITTLEFS

#include <LittleFS.h>
#include <SimpleFTPServer.h>

FtpServer ftp; 

void setupFtp(){
    Serial.println("Starting FTP...");
    ftp.begin("admin", "admin");
    Serial.println("FTP started.");

}