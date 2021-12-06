#pragma once

#include <Wire.h>
#include "PCA9685.h"

#define SERVOMIN 350  // This is the 'minimum' pulse length count (out of 4096)
#define SERVOMAX 540  // This is the 'maximum' pulse length count (out of 4096)
#define USMIN 600     // This is the rounded 'minimum' microsecond length based on the minimum pulse of 150
#define USMAX 2400    // This is the rounded 'maximum' microsecond length based on the maximum pulse of 600
#define SERVO_FREQ 50 // Analog servos run at ~50 Hz updates

PCA9685 pwm;

void setupServos()
{
    pwm.init(B000000);
    pwm.setPWMFrequency(SERVO_FREQ); // Analog servos run at ~50 Hz updates
}

long getServoPulse(long degrees)
{
    return constrain(map(degrees, 0, 180, SERVOMIN, SERVOMAX), SERVOMIN, SERVOMAX);
}

void setServoDegree(int channel, long degrees)
{
    return pwm.setChannelPWM(channel, getServoPulse(degrees));
}