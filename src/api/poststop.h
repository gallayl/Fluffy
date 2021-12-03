#pragma once

#include <Arduino.h>
#include <ESP8266WebServer.h>

bool postStop(ESP8266WebServer &server){
    Serial.println("Stopping movement");
    server.send(200);
    return true;
}