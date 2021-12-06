#pragma once

#include <ESPAsyncWebServer.h>
#include <LittleFS.h>
#include "api/update.h"
#include "api/postmove.h"
#include "api/poststop.h"
#include "api/postPwm.h"
#include "api/postPwmDegree.h"
#include <uri/UriGlob.h>

AsyncWebServer *server;

void setupWebServer()
{
    Serial.println("Setting up Web Server...");

    server = new AsyncWebServer(80);

    server->on("/update", HTTP_GET, getUpdateForm);
    server->on("/update", HTTP_POST, onPostUpdate, onUploadUpdate);

    server->on("/api/heap", HTTP_GET, [](AsyncWebServerRequest *request)
               { request->send(200, "application/json", "{\"heap\": " + String(ESP.getFreeHeap()) + "}"); });

    server->on("/api/stop", HTTP_POST, handleStop);
    server->on("/api/move", HTTP_POST, [](AsyncWebServerRequest * request){}, NULL, handleMove);
    server->on("/api/pwm", HTTP_POST, [](AsyncWebServerRequest * request){}, NULL, handlePwm);
    server->on("/api/pwmdegree", HTTP_POST, [](AsyncWebServerRequest * request){}, NULL, handlePwmDegree);

    server->serveStatic("/", LittleFS, "/", "max-age=43200").setDefaultFile("index.html");
    server->onNotFound([](AsyncWebServerRequest *req) {
        AsyncWebServerResponse *response = req->beginResponse(LittleFS, "/index.html", "text/html; charset=UTF-8");
        req->send(response);
    });
    server->begin();
    Serial.println("Web Server started.");
}