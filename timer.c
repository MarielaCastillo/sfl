https://learn.adafruit.com/multi-tasking-the-arduino-part-2/timers
http://ww1.microchip.com/downloads/en/DeviceDoc/ATmega48A-PA-88A-PA-168A-PA-328-P-DS-DS40002061A.pdf
http://ww1.microchip.com/downloads/en/DeviceDoc/ATmega48A-PA-88A-PA-168A-PA-328-P-DS-DS40002061A.pdf
https://www.google.com/search?ei=AlOiXJGhDKPB0PEPx762-A4&q=pwm+arduino+pins&oq=pwm+arduino+pins&gs_l=psy-ab.3..0j0i22i30l9.1255.2163..2362...0.0..0.128.545.2j3......0....1..gws-wiz.......0i71j0i67j0i203j0i20i263.HKSMeOL--fc
http://www.avr-tutorials.com/interrupts/about-avr-8-bit-microcontrollers-interrupts
https://www.avrfreaks.net/forum/lcd-rw-pin-gnd
https://www.arduino.cc/en/Reference/LiquidCrystalConstructor
https://www.youtube.com/channel/UCL1w3L33s0phNYGuvMLS-Eg
https://docs.google.com/presentation/d/1eAxFRbTjtT65x3TU9B1v87I9-sMp2sm6rQlCKkX_7Hs/edit#slide=id.g55d8112221_0_198
https://www.tinkercad.com/things/g4dsNTbvRjs-lcd-timer/editel
https://www.easycalculation.com/engineering/electrical/avr-timer-calculator.php
http://ww1.microchip.com/downloads/en/DeviceDoc/ATmega48A-PA-88A-PA-168A-PA-328-P-DS-DS40002061A.pdf
http://ee-classes.usc.edu/ee459/library/documents/avr_intr_vectors/
https://www.microchip.com/wwwproducts/en/ATmega328P#datasheet-toggle
https://www.tinkercad.com/things/g4dsNTbvRjs-lcd-timer/editel

#include<avr/io.h>
#define F_CPU 16000000UL
#include <util/delay.h>

//Libreria LCD e inicializacion de acuerdo a conexiones
#include <LiquidCrystal.h>
const int RS = 12, EN = 11, D4 = 5, D5 = 4, D6 = 3, D7 = 2;
LiquidCrystal lcd(RS, EN, D4, D5, D6, D7);
//RW control is in "write mode" when its tied to ground.
const int numRows = 2;
const int numCols = 16;



int main(void){
  uint8_t cnt=0;
  lcd.begin(numCols, numRows);
  lcd.home();
  lcd.setCursor(0, 0);					
  lcd.print("Ejemplo Timer ");
  lcd.setCursor(0, 1);	
  lcd.print("Conteo: ");
  lcd.setCursor(8, 1);
  lcd.print(cnt);
  //TCCR0B=0X05;
  TCCR0A = (1 << WGM01); //Set CTC Bit
  //TIMSK0 = (1 << OCIE0A);
  TCCR0B = (1 << CS02) | (1 << CS00); //start at 1024 prescalar
    while(1){
        /* CONTEO MANUAL
        cnt++;
      	lcd.setCursor(8, 1);
  		lcd.print(cnt);
      	_delay_ms(1000);
          */
        while((TIFR0&0X01)==0);
        TIFR0=0X01;
        cnt++;
      	lcd.setCursor(8, 1);
  		lcd.print(cnt);
    }
}

//====con interrupciones===/
#include <avr/io.h>
#include <avr/interrupt.h>
 

//Libreria LCD e inicializacion de acuerdo a conexiones
#include <LiquidCrystal.h>
const int RS = 12, EN = 11, D4 = 5, D5 = 4, D6 = 3, D7 = 2;
LiquidCrystal lcd(RS, EN, D4, D5, D6, D7);
const int numRows = 2;
const int numCols = 16;
uint8_t cnt=0;

int main(void)
{
  lcd.begin(numCols, numRows);
  lcd.home();
  lcd.setCursor(0, 0);					
  lcd.print("Ejemplo Timer ");
  lcd.setCursor(0, 1);	
  lcd.print("Conteo: ");
  lcd.setCursor(8, 1);
  lcd.print(cnt);

    // DDRB = 0x01;
     
    TCCR0A = (1 << WGM01); //Set CTC Bit==>  Clear Timer on Compare (CTC) mode of operation
    OCR0A = 195;
    TIMSK0 = (1 << OCIE0A);
     
    sei();
     
    TCCR0B = (1 << CS02) | (1 << CS00); //start at 1024 prescaler
     
    while(1)
    {
        //TODO:: Please write your application code 
    }
}
 
ISR(TIMER0_COMPA_vect)
{
    cnt++;
    lcd.setCursor(8, 1);
  lcd.print(cnt);
     
    if(cnt > 100)
    {
        cnt = 0;
        //PORTB ^= (1 << PORTB0);
    }
}



//==========================pwm=====//
#include <avr/io.h>

#define F_CPU 16000000UL
#include <util/delay.h>

//Libreria LCD e inicializacion de acuerdo a conexiones
#include <LiquidCrystal.h>
const int RS = 12, EN = 11, D4 = 5, D5 = 4, D6 = 3, D7 = 2;
LiquidCrystal lcd(RS, EN, D4, D5, D6, D7);
const int numRows = 2;
const int numCols = 16;

double dutycycle=0;
int main(void)
{
    lcd.begin(numCols, numRows);
    lcd.home();
    lcd.setCursor(0, 0);					
    lcd.print("Ejemplo PWM ");
    lcd.setCursor(0, 1);	
    lcd.print("Salida: ");
    lcd.setCursor(8, 1);
    lcd.print(dutycycle);

	DDRD=(1<<PORTD6);
	//wgm00 y wgm01 es para fast pwm
	//com0a1 es para non inverting en compare output mode
	TCCR0A=(1<<COM0A1) | (1<<WGM00) | (1<<WGM01);
	
	OCR0A=(dutycycle/100)*255.0;//only can be from 0to a 100, a fraction of 255 representing the amount of time we want it to be 1
    /* habilita interrupcion de overflow 
    TIMSK0=(1<<TOIE0);
	sei();//set external interrupts
    */
	
	//THIS STARTS THE TIMER
	TCCR0B=(1<<CS00)|(1<<CS02);
    /* Replace with your application code */
    while (1) 
    {
		_delay_ms(100);
		dutycycle+=10;
		if(dutycycle>100){
			dutycycle=0;
		}
        lcd.setCursor(8, 1);
        lcd.print(dutycycle);
    }
}


//=========================ELOTRO====/
#include <LiquidCrystal.h>

// initialize the library by associating any needed LCD interface pin
// with the arduino pin number it is connected to
const int RS = 12, EN = 11, D4 = 5, D5 = 4, D6 = 3, D7 = 2;
LiquidCrystal lcd(RS, EN, D4, D5, D6, D7);


const int numRows = 2;
const int numCols = 16;

const int analogInPin = A0;				// Analog input pin that the potentiometer is attached to
const int analogOutPin = 9;				// Analog output pin that the LED is attached to

//int sensorValue = 0;					// value read from the pot
//int outputValue = 0;					// value output to the PWM (analog out)

void setup() {
  // set up the LCD's number of columns and rows:
  lcd.begin(numCols, numRows);
  lcd.home();
  lcd.setCursor(5, 0);					// place static text
  lcd.print("ADC = ");
  lcd.setCursor(15, 0);
  lcd.print("V");
  lcd.setCursor(0, 1);
  lcd.print("LED : ");
  lcd.setCursor(12, 1);
  lcd.print("%");
  Serial.begin(9600);					// optional serial monitor
}

void loop() {
  int sensorValue = analogRead(analogInPin);          // read analog A0 en store in sensorValue
  int outputValue = map(sensorValue, 0, 1023, 0, 255);    // map analog input to analog output and store in outputValue
  float voltValue = 5.0 / 1024.0 * sensorValue;       // calculate volt at analog A0 and store in voltValue
  float percentValue = sensorValue / 1024.0 * 100.0;  // calculate percentage analog A0 and store in percentValue
  analogWrite(analogOutPin, outputValue);             // write outputValue to analogOutPin

  lcd.setCursor(0, 0);                                // set cursor at deserid position
  //leadingZeros(sensorValue, 4);                       // print sensorvalue with number of leading-characters (0 or space as specified in function leadingZeros)
  lcd.setCursor(10, 0);                               // set cursor at deserid position
  lcd.print(voltValue);                               // print voltValue
  lcd.setCursor(6, 1);                                // set cursor at deserid position
  lcd.print(percentValue);                            // print percentValue

  Serial.print("A0 = " );                         // print the results to the serial monitor:
  Serial.print(sensorValue);
  Serial.print(" ADC");
  Serial.print("\t Spanning = ");
  Serial.print(voltValue);
  Serial.print(" V");
  Serial.print("\t Output = ");
  Serial.print(outputValue);
  Serial.print(" PWM");
  Serial.print("\t LED = ");
  Serial.print(percentValue);
  Serial.println(" %");

  

  delay(1000);                                        // set delay

}
