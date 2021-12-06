#pragma once

#include <Arduino.h>
#include <ESPAsyncWebServer.h>
#include <ArduinoJson.h>
#include "../servos.h"

#define STEER_CHANNEL 0
#define STEER_CENTER 375
#define STEER_MAX_LEFT 450
#define STEER_MAX_RIGHT 260

#define BACK_LEFT_CHANNEL 2
#define BACK_LEFT_CENTER 330
#define BACK_LEFT_MAX_FORWARD 100
#define BACK_LEFT_MAX_BACKWARD 560

#define BACK_RIGHT_CHANNEL 1
#define BACK_RIGHT_CENTER 350
#define BACK_RIGHT_MAX_FORWARD 100
#define BACK_RIGHT_MAX_BACKWARD 560

#define YAW_CHANNEL 14
#define YAR_CENTER = 450
#define YAW_LEFT = 680

ArBodyHandlerFunction handleMove = ([](AsyncWebServerRequest * request, uint8_t *data, size_t len, size_t index, size_t total)
                                       {
                                           StaticJsonDocument<200> document;
                                           DeserializationError err = deserializeJson(document, data);
                                           if (err)
                                           {
                                               return request->send(400, "application/json", "{\"Error\": \"" + String(err.c_str()) + "\"}");
                                           }
                                           JsonObject root = document.as<JsonObject>();
                                           int speed = root["speed"];
                                           int steer = root["steer"];

                                            Serial.println("Moving with speed" + String(speed) + " and with steer " + String(steer));

                                           uint16_t pwms[3];
                                           pwms[BACK_LEFT_CHANNEL] = constrain((BACK_LEFT_CENTER + speed), BACK_LEFT_MAX_FORWARD, BACK_LEFT_MAX_BACKWARD);
                                           pwms[BACK_RIGHT_CHANNEL] = constrain((BACK_RIGHT_CENTER - speed), BACK_RIGHT_MAX_FORWARD, BACK_RIGHT_MAX_BACKWARD);
                                           pwms[STEER_CHANNEL] = constrain((STEER_CENTER - steer), STEER_MAX_RIGHT, STEER_MAX_LEFT);
                                           pwm.setChannelsPWM(0, 3, pwms);

                                           request->send(200);
                                       });
