import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  value = 0;
  operation = '';
  decimalFirst = false;
  decimalSec = false;
  // decimalNum = 0;
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
  buttonActive = [false,false,false,false,false];
  history = [];

  onButtonPress(num) {
    // console.log("INPUT: " + num)
    // console.log("value: " + this.value);
    // console.log("operation: " + this.operation);
    // console.log("first: " + this.first);
    // console.log("typeOp: " + this.typedOp);
    // console.log("firstOp: " + this.firstOp);
    // console.log("secOp: " + this.secOp);
    // console.log("decimalFirst: " + this.decimalFirst);
    // console.log("decimalSec: " + this.decimalSec);
    // console.log("decimalNumFirst: " + this.decimalNumFirst);
    // console.log("decimalNumSec: " + this.decimalNumSec);
    // console.log("-~~~~~~~~~~--");

    if(this.equal && num != '=' && (num == '.' || Number(num))){// || num is number) {
      var temp;
      if(num == '%' || num == '+/-') {
        temp = this.value
        this.reset();
        this.value = temp;
      } else {
        this.reset();
      }
      this.first = true;

    }
    // console.log("after first: " + this.first);
    var i;
    for(i = 0; i < 5; i++) {
      this.buttonActive[i] = false;
    }
    var char;
    // check all other characters
    if(num == 'AC') {
      this.reset();
    } else if(num == '+/-' && this.valueToPrint != '0') {
      this.value = this.value * -1;
      if(this.first) {
        this.firstOp = this.value;
      } else {
        this.secOp = this.value;
      }
    } else if (num == '%') {
      this.value = this.value/100;
      if(this.first) {
        this.firstOp = this.value;
        this.decimalFirst = true;
        this.decimalNumFirst = this.decimalNumFirst + 2;
      } else {
        this.secOp = this.value;
        this.decimalSec = true;
        this.decimalNumSec = this.decimalNumSec + 2;
      }
    } else if (num == '.' && ((this.decimalFirst && this.first) || !(this.decimalSec && this.first))) {
      if(this.typedOp || this.equal) {
        // this.value = 0;
        this.valueToPrint = '0';
        // console.log("changed");
        // this.first = !this.first;
        // this.reset();
      }
      this.valueToPrint = this.valueToPrint + '.';
      if(this.first) {
        this.decimalFirst = true;
        this.decimalNumFirst = 0;
      } else {
        this.decimalSec = true;
        this.decimalNumSec = 0;
      }
      // console.log("decimal first: " + this.decimalFirst);
      // console.log("decimal sec: " + this.decimalSec);
      return;
    } else if (num == '/' || num == 'x' || num == '-' || num == '+') {
      //operations
      if(this.equal) {
        this.first = !this.first;
        var boolDeci = this.decimalFirst;
        this.decimalFirst = this.decimalSec;
        this.decimalSec = boolDeci;
      }
      this.handleOp(num);
    } else if(num == '=') {
      this.solve(num);
      this.history.push(this.valueToPrint);
      // console.log("history: " + this.history);
      return;
    } else {
      // else it is a number
      if(this.typedOp || this.equal) {
        this.value = 0;
      }
      char = +num;
      var deci;
      var boolDeci = false;
      if(this.first) {
        deci = this.decimalNumFirst;
        boolDeci = this.decimalFirst;
      } else {
        deci = this.decimalNumSec
        boolDeci = this.decimalSec;
      }
      if(boolDeci) {
        deci++;
        this.value = parseFloat(''+this.value) + (char/(10**deci));
        this.value = parseFloat(parseFloat(''+this.value).toFixed(deci));
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

      if(this.firstOp % 1 != 0) {
        this.decimalFirst = true;
      }
      if(this.secOp % 1 != 0) {
        this.decimalSec = true;
      }
      this.typedOp = false;
    }
    // console.log("value: " + this.value);
    // console.log("operation: " + this.operation);
    // console.log("first: " + this.first);
    // console.log("typeOp: " + this.typedOp);
    // console.log("firstOp: " + this.firstOp);
    // console.log("secOp: " + this.secOp);
    // console.log("-------------");
    this.equal = false;
    this.valueToPrint =  '' + this.value;
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
    if(!this.typedOp) {
      if(this.first) {
        this.decimalNumFirst = 0;
        this.decimalFirst = false;
      } else {
        this.decimalNumSec = 0;
        this.decimalSec = false;
      }
    }
  }

  solve(op) {
    // console.log("before firstOp: " + this.firstOp);
    // console.log("before secOp: " + this.secOp);
    this.secOp = parseFloat(''+this.secOp);
    this.firstOp = parseFloat(''+this.firstOp);
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
    // console.log("after value: " + this.value);
    // 5.23-6.33
    if(this.decimalFirst || this.decimalSec) {
      var deci = this.decimalNumFirst>this.decimalNumSec ? this.decimalNumFirst : this.decimalNumSec;
      this.value = parseFloat(parseFloat(''+this.value).toFixed(deci));
    }
    this.valueToPrint = '' + this.value;
    this.firstOp = this.value;
    if(this.firstOp % 1 != 0) {
      this.decimalFirst = true;
    }
    if(this.secOp % 1 != 0) {
      this.decimalSec = true;
    }
    // this.first = !this.first;
    // this.operation = '';
    this.equal = true;
  }

  reset() {
    this.value = 0;
    this.operation = '';
    this.firstOp = 0;
    this.secOp = 0;
    this.decimalNumFirst = 0;
    this.decimalNumSec = 0;
    this.decimalFirst = false;
    this.decimalSec = false;
    this.first = true;
    this.valueToPrint = '0';
    this.buttonActive = [false,false,false,false,false];
  }
}
