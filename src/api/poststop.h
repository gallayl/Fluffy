#pragma once

#include <Arduino.h>
#include <ESPAsyncWebServer.h>

#include "../servos.h"

ArRequestHandlerFunction handleStop = ([](AsyncWebServerRequest *request) {
    pwm.setAllChannelsPWM(0);
    Serial.println("Stopped movement");
    request->send(200);
});