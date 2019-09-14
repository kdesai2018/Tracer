boolean inLoop = true;
int number = 0;
int numberTwo = 0;
while(inLoop) {
    if(number * numberTwo > 7) {
        inLoop = false;
    }
    if(number < 2) {
        inLoop = true;
    }
    number = number + 1;
    numberTwo = numberTwo + 2;
}

