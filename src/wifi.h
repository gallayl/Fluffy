#pragma once

#include <ESPAsyncWebServer.h>
#include <ESPAsyncWiFiManager.h>
#include "web.h"

DNSServer dns;


void setupWifi()
{
    WiFi.mode(WIFI_STA);
    AsyncWiFiManager wm(server,&dns);

    Serial.println(F("Setting up WiFi connection..."));

    //wm.resetSettings();

    bool res;
    // res = wm.autoConnect(); // auto generated AP name from chipid
    // res = wm.autoConnect("AutoConnectAP"); // anonymous ap
    res = wm.autoConnect("fluffy","password"); // password protected ap

    if(!res) {
        Serial.println("Failed to connect!");
        // ESP.restart();
    } 
    else {
        //if you get here you have connected to the WiFi    
        Serial.println("Connected to WiFi.");
    }
}