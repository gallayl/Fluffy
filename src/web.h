#pragma once

#include <ESP8266WebServer.h>
#include <LittleFS.h>
#include "api/apihandler.h"
#include <uri/UriGlob.h>

ESP8266WebServer webServer(80);

void setupWebServer(){
    Serial.println("Setting up Web Server...");

    webServer.on(UriGlob("/api/*"), [](){
        handleApiRoute(webServer);
    });

    webServer.serveStatic("/", LittleFS, "/", "max-age=43200");
    webServer.onNotFound([](){
        Serial.println("Page not found" + webServer.uri());
        webServer.send(404);
    });
    webServer.enableCORS(true);
    webServer.begin();
    Serial.println("Web Server started.");
}