#include<Servo.h>

const int MOTOR1_PIN = 5;
const int MOTOR2_PIN = 6;
const int MOTOR3_PIN = 9;
const int MOTOR4_PIN = 10;

Servo motor1, motor2, motor3, motor4;

unsigned long lastTime;
int timeSinceUpdate;


void setup() {
  pinMode(MOTOR1_PIN, OUTPUT);
  pinMode(MOTOR2_PIN, OUTPUT);
  pinMode(MOTOR3_PIN, OUTPUT);
  pinMode(MOTOR4_PIN, OUTPUT);
  motor1.attach(MOTOR1_PIN);
  motor2.attach(MOTOR2_PIN);
  motor3.attach(MOTOR3_PIN);
  motor4.attach(MOTOR4_PIN);
  Serial.begin(500000);
  lastTime = millis();
  timeSinceUpdate = 0;
  TrayectoriaCurva();
}

void moveCar(int limite,double vM1,double vM2,double vM3,double vM4){
    int qwe = millis();
    while(qwe <= limite){
        qwe = millis();
        Serial.println("dentro del while");
        Serial.print("valor del tiempo= ");
        Serial.println(qwe);
      motor1.writeMicroseconds(vM1);
      motor2.writeMicroseconds(vM2);
      motor3.writeMicroseconds(vM3);
      motor4.writeMicroseconds(vM4);
    }
}

void loop() {
    Serial.flush();
    Serial.write("A");
}

void TrayectoriaCurva(){
      moveCar(1000,1570,1570,1429.3,1429.3);
      moveCar(2000,1600,1600,1398.6,1398.6);
      moveCar(3000,1630,1630,1367.9,1367.9);
      moveCar(4000,1660,1660,1237.2,1237.2);
      moveCar(5000,1700,1700,1296.5,1296.5);
      moveCar(5000,1700,1700,1296.5,1296.5);
      delay(1000);
      moveCar(11000,1296.5,1296.5,1700,1700);
}