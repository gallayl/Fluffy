#pragma once

#include <LittleFS.h>

bool isStorageAvailable = false;

FS storage = LittleFS;

void setupStorage(){
    Serial.println(F("Setting up Storage..."));
    if (LittleFS.begin()){
        Serial.println(F("Storage setup completed."));
        isStorageAvailable = true;
    } else {
        Serial.println(F("Failed to setup storage!"));
    }
}
