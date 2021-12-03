#pragma once

#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

#include "postmove.h"
#include "poststop.h"

void handleApiRoute(ESP8266WebServer &server)
{
  if (server.method() == HTTP_POST)
  {

    if (server.uri().startsWith(F("/api/stop")))
    {
      postStop(server);
    }

    StaticJsonDocument<200> doc;
    DeserializationError err = deserializeJson(doc, server.arg("plain"));
    if (err)
    {
      server.send(400, "application/json", "{\"Error\": \"" + String(err.c_str()) + "\"}");
    }

    if (server.uri().startsWith("/api/move"))
    {
      postMove(doc["speed"], doc["steer"], server);
    }
  }
  server.send(404, "", "{\"error\": \"content not found\"}");
}