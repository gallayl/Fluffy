#pragma once

#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include "../servos.h"

ArBodyHandlerFunction handlePwm = ([](AsyncWebServerRequest * request, uint8_t *data, size_t len, size_t index, size_t total)
                                       {
                                           StaticJsonDocument<200> document;
                                           DeserializationError err = deserializeJson(document, data);
                                           if (err)
                                           {
                                               return request->send(400, "application/json", "{\"Error\": \"" + String(err.c_str()) + "\"}");
                                           }
                                           JsonObject root = document.as<JsonObject>();
                                           int channel = root["channel"];
                                           int value = root["value"];

                                            Serial.println("PWM channel" + String(channel) + " set to value " + String(value));

                                           uint16_t pwms[1];
                                           pwms[0] = constrain(value, SERVOMIN, SERVOMAX);
                                           pwm.setChannelPWM(channel, value);

                                           request->send(200);
                                       });
