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
  decimalNumFirst = 0;
  decimalNumSec = 0;
  typedOp = false;
  firstOp = 0; //operand
  secOp = 0;
  first = true;
  equal = false; //if it passed the equals
  valueToPrint = '0';
  special = ['AC','+/-','%'];
  signs = ['/','x','-','+','='];
  numberGroups = [['7','8','9'],['4','5','6'],['1','2','3'],['0', '.']];
  externalCommands = ['History', 'Backspace'];
  buttonActive = [false,false,false,false,false]

  onButtonPress(num) {
    var i;
    for(i = 0; i < 5; i++) {
      this.buttonActive[i] = false;
    }
    var char;
    // check all other characters
    if(num == 'AC') {
      this.value = 0;
      this.operation = '';
      this.decimal = false;
      this.firstOp = 0;
      this.secOp = 0;
      this.decimalNum = 0;
      this.decimalNumFirst = 0;
      this.decimalNumSec = 0;
      this.first = true;
    } else if(num == '+/-' && this.valueToPrint != '0') {
      this.value = this.value * -1;
    } else if (num == '%') {
      this.value = this.value/100;
    } else if (num == '.' && !this.decimal) {
      this.valueToPrint = this.valueToPrint + '.';
      this.decimal = true;
      return;
    } else if (num == '/' || num == 'x' || num == '-' || num == '+') {
      //operations
      if(this.equal) {
        this.first = !this.first;
      }
      this.handleOp(num);
    } else if(num == '=') {
      this.solve(num);
      return;
    } else {
      // else it is a number
      if(this.typedOp || this.equal) {
        this.value = 0;
      }
      char = +num;
      var deci = this.first ? this.decimalNumFirst : this.decimalNumSec;
      if(this.decimal) {
        deci++;
        this.value = parseFloat(this.value) + (char/(10**deci));
        this.value = parseFloat(this.value).toFixed(deci);
      } else {
        this.value = (this.value*10) + char;
      }
      if(this.equal) {
        this.secOp = 0;
        this.first = true;
      }
      if(this.first) {
        this.decimalNumFirst = deci;
        this.firstOp = this.value;
      } else {
        this.decimalNumSec = deci;
        this.secOp = this.value;
      }
      this.typedOp = false;
    }
    // console.log("value: " + this.value);
    // console.log("operation: " + this.operation);
    // console.log("typeOp: " + this.typedOp);
    // console.log("firstOp: " + this.firstOp);
    // console.log("secOp: " + this.secOp);
    // console.log("buttonActive: " + this.buttonActive);
    // console.log("-------------");
    this.equal = false;
    this.valueToPrint =  '' + this.value;
    // if(this.decimal) {
    //   this.valueToPrint = this.valueToPrint + '.';
    // } else {
    //   this.valueToPrint = '' + this.value;
    // }
  }

  handleOp(op) {
    if(!this.typedOp && this.operation != '' && !this.equal) {
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
    var ind = (op == '/') ? 0 : (op == 'x')? 1 : (op == '-')? 2 : (op == '+')? 3 : -1 ;
    if(ind != -1) {
      this.buttonActive[ind] = true;
    }
    this.decimal = false;
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
    var deci = this.decimalNumFirst>this.decimalNumSec ? this.decimalNumFirst : this.decimalNumSec;
    this.value = parseFloat(this.value).toFixed(deci);
    this.valueToPrint = '' + this.value;
    this.firstOp = this.value;
    // this.first = !this.first;
    // this.operation = '';
    this.equal = true;
  }
}
