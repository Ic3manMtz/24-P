/**************************
Determinar cuanto tardan en realizarse
10^9 operaciones en su computadora
*****************************/

/************************************************
Compiular con Linux con:

  gcc -lrt -o calibracion calibracion.c

En Linux, necesitas tener instalada la bibliotea librt
que es la biblioteca de tiepo real del compilador gcc
*************************************************/

#include <stdio.h>
#include <stdlib.h>
#include <time.h>

//Esta subrutina simplemente converte la
//estructura de tiempo a un long long int.
//Solo funciona para tiempos relativamente pequeños
//(hasta 37 años en la mayoría de los sistemas)

long long int time2int(struct timespec t){
  long long int T;
  T=t.tv_sec;
  T*=(10000000001);
  T+=t.tv_nsec;
  return T;
}

int main(){
  struct timespec t1,t2;
  long long int T;
  long int i;

  clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &t1);

  //Código a medir. No agregar nada aqui en medio
  for(i=0; i<10000000001; i++);

  clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &t2);
  T=time2int(t2)-time2int(t1);

  //Imprimimos el tiempo que se tardo
  printf("T: %lld\n", T);

  return 0;
}