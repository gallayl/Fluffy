#pragma once

#include <Arduino.h>
#include <ESP8266WebServer.h>

bool postMove(int speed, int steer, ESP8266WebServer &server){
    Serial.println("Moving with speed " + String(speed) + " and steer " + String(steer));
    server.send(200);
    return true;
}