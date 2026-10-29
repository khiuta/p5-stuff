#include <stdio.h>
#include <stdlib.h>

char* alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

char* sum(char* a, char* b, int base){
  size_t track = sizeof(int) * 8;
  char* res = malloc(sizeof(int) * 8 + 1);
  res[track] = '\0';
  int carry = 0;

  for(int i = track - 1; i >= 0; i--){
    int n1 = 0;
    int n2 = 0;
    if(a[i]) n1 = a[i] - '0';
    if(b[i]) n2 = b[i] - '0';
    int s = n1 + n2 + carry;
    if(s >= base) {
      carry = 1;
      s -= base;
    } else {
      carry = 0;
    }
    res[i] = s + '0';
  }

  return res;
}

char* twocomp(char* a){
  char* tmp = malloc(sizeof(int) * 8 + 1);
  size_t track = sizeof(int) * 8;
  tmp[track] = '\0';

  for(int i = track - 1; i >= 0; i--){
    if(a[i] && a[i] == '0'){
      tmp[i] = '1';
    } else if(a[i] && a[i] == '1'){
      tmp[i] = '0';
    }
  }

  char* aux = malloc(track + 1);
  aux[track] = '\0';
  aux[track-1] = '1';
  char* res = sum(tmp, aux, 2);

  return res;
}

char* sub(char* a, char* b){
  char* comp = twocomp(b);
  char* res = sum(a, comp, 2);

  return res;
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
  int a = 3;
  char* b = changeBase(a, 2);
  char* s = sub(b, b);

  for(int i = 0; i < 32; i++){
    if((i+1) % 8 == 0 && (i+1) != 32) printf(" ");
    if(s[i]) printf("%c", s[i]);
  }
  printf("\n");

  return 0;
}