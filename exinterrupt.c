//https://www.avrfreaks.net/forum/learning-external-interrupts-atmega328p
//http://ww1.microchip.com/downloads/en/DeviceDoc/ATmega48A-PA-88A-PA-168A-PA-328-P-DS-DS40002061A.pdf
// PAGINA 80
//http://ee-classes.usc.edu/ee459/library/documents/avr_intr_vectors/
// https://www.theengineeringprojects.com/wp-content/uploads/2017/07/ATmega328-Pinout.png
https://www.dropbox.com/sh/7qdeb6n8rsm0li8/AADHvzM6-0GdJuTA1nK9OTBSa/Example%20Code/Interrupts?dl=0&preview=Interrupts.jnt&subfolder_nav_tracking=1
https://www.youtube.com/playlist?list=PLA6BB228B08B03EDD

//AVR INTERRUPT Y FLAG
#define F_CPU 16000000

#include <avr/interrupt.h>
#include <avr/io.h>
#include <util/delay.h>
int cliFlag=0;

int main(void){
	DDRC |= (1 << PORTC4);					// configura P5B como saída
	PORTC=(1<<PORTC4);
	PORTD |= (1 << PD3);					// habilita pull-up interno
	EIMSK=(1<<INT1);
	EICRA |= 1<<ISC11; // interrupt on falling edge
	while(1){
		if(cliFlag==0){
			sei();
		}
		else{
			cli();
			//close interrupts and delay 2 seconds
			_delay_ms(200);//debouncing
			cliFlag=0;
		}
	}
}

ISR(INT1_vect){
	PORTC^=(1<<PORTC4);
	cliFlag=1;
	//in the isr set flag after i toggle portb0;
}
//=====

//=========SIN flag
#define F_CPU 16000000

#include <avr/interrupt.h>
#include <avr/io.h>
#include <util/delay.h>
int cliFlag=0;

int main(void){
	DDRC |= (1 << PORTC4);					// configura P5B como saída
    DDRC |= (1 << PORTC3);					// configura P5B como saída
    PORTC=(1<<PORTC4);
	PORTD |= (1 << PD3);					// habilita pull-up interno
	EIMSK=(1<<INT1);
	EICRA |= 1<<ISC11; // interrupt on falling edge
  	sei();
	while(1){
            PORTC=(1<<PORTC3);
	}
}

ISR(INT1_vect){
	PORTC^=(1<<PORTC4);
}
//==========







//================ENCENDER LED SIN INTERRUPCIONES
#define F_CPU		16000000			// frequencia nativa do Arduino

#include <avr/io.h>

int main(void)
{
  DDRC |= (1 << PC4);					// configura P5B como saída
  
  DDRB &= ~(1 << PD3);					// configura PB0 como entrada
  PORTD |= (1 << PD3);					// habilita pull-up interno
	
    /* loop infinito */
    while (1) 
    {
      if ( !(PIND & (1 << PORTD3)) )	// se PB0 estiver em LOW
      {
        PORTC |= (1 << PC4);			// set PC4
      }
      else								// caso em nivel alto
      {
        PORTC &= ~(1 << PC4);			// zera PC4
      }
    }
}
