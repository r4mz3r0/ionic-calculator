import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  value = 0;
  operation = '';
  decimal = false;
  decimalNum = 0;
  typedOp = false;
  firstOp = 0; //operand
  secOp = 0;
  first = true;
  valueToPrint = '0';
  special = ['AC','+/-','%']
  signs = ['/','x','-','+','='];
  numberGroups = [['7','8','9'],['4','5','6'],['1','2','3'],['0', '.']];
  externalCommands = ['History', 'Backspace'];
  buttonActive = [false,false,false,false,false]

  onButtonPress(num) {
    var char;
    // check all other characters
    if(num == 'AC') {
      this.value = 0;
      this.operation = '';
      this.valueToPrint = this.value;
      this.decimal = false;
    } else if(num == '+/-' && this.valueToPrint != '0') {
      this.value = this.value * -1;
      this.valueToPrint = this.value;
    } else if (num == '%') {
      this.value = this.value/100;
      this.valueToPrint = this.value;
    } else if (num == '.' && !this.decimal) {
      this.valueToPrint = this.valueToPrint + '.';
      this.decimal = true;
    } else if (num == '/' || num == 'x' || num == '-' || num == '+') {
      //operations
      this.handleOp(num);
    } else if(num == '=') {
      this.solve(num);
    } else {
      // else it is a number
      if(this.typedOp) {
        this.value = 0;
      }
      char = +num;
      if(this.decimal) {
        this.decimalNum++;
        this.value = this.value + (char/(10*decimalNum));
      } else {
        this.value = (this.value*10) + char;
      }
      if(this.first) {
        this.firstOp = this.value;
      } else {
        this.secOp = this.value;
      }
      this.typedOp = false;
      this.valueToPrint = this.value;
    }
    // console.log("value: " + this.value);
    // console.log("operation: " + this.operation);
    // console.log("typeOp: " + this.typedOp);
    // console.log("firstOp: " + this.firstOp);
    // console.log("secOp: " + this.secOp);
  }

  handleOp(op) {
    // if(this.first != 0 && this.second != 0) {
      if(!this.typedOp && this.operation != '') {
        this.solve(op);
      } else if(!this.typedOp) {
        if(this.first) {
          this.firstOp = this.value;
        } else {
          this.secOp = this.value;
        }
        this.first = !this.first;
      }
      this.typedOp = true;
      this.operation = op;
      var i;
      for(i = 0; i < 5; i++) {
        if(this.buttonActive[i] == op) {
          this.buttonActive[i] = true;
        }
      }
      this.decimal = false;
    // }

  }

  solve(op) {
    switch(this.operation) {
      case '+':
      this.value = this.firstOp + this.secOp;
      break;
      case '-':
      this.value = this.firstOp - this.secOp;
      break;
      case '/':
      this.value = this.firstOp / this.secOp;
      break;
      case 'x':
      this.value = this.firstOp * this.secOp;
      break;
    }
    this.valueToPrint = this.value;
    this.firstOp = this.value;
    this.operation = '';
  }
}
