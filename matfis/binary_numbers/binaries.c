#include <stdio.h>
#include <stdlib.h>
#include <math.h>

char* alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

char* sum(char* a, char* b, int base){
  size_t track = sizeof(int) * 8;
  char* res = malloc(sizeof(int) * 8);
  int carry = 0;

  for(int i = track - 1; i >= 0; i--){
    int n1 = a[i] - '0';
    int n2 = b[i] - '0';
    int s = n1 + n2;
    if(s >= base) {
      carry = s - base;
      s -= base;
    } 
    res[track] = s + '0';
  }
}

char* changeBase(int n, int base){
  char* res = malloc(sizeof(int) * 8 + 1);
  size_t track = sizeof(int) * 8;
  res[track] = '\0';
  track--;

  while(n >= base){
    int r = n % base;
    if(r >= 10){
      res[track] = alphabet[r - base];
    } else {
      res[track] = r + '0';
    }
    track--;

    n /= base;
    if(n < base){
      if(n >= 10){
        res[track] = alphabet[n - base];
      } else {
        res[track] = n + '0';
      }
    }
  }

  return res;
}

int main(){
  int a = 20;
  char* b = changeBase(a, 2);

  for(int i = 0; i < 32; i++){
    if(b[i]) printf("%c", b[i]);
  }
  printf("\n");

  return 0;
}