const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    
    constructor(field) {
        this._field = field;
        this.startPosition();
    }
    print() {
        for (let i = 0; i < this._field.length; i++) {
            console.log(this._field[i].join(''));
        }
    }
    checkWin(){
        for (let x =0; x<this._field.length; x++){
            for(let y=0; y<this._field[0].length; y++){
                // console.log(this._field[x][y]);
                if(this._field[x][y] === '^'){
                    return false;
                }
            }
        }
        console.log("You win babe.")
        return true;
    }
    checkInvalidMove(x, y){
        if(this._field[x][y] === hole){
            console.log('invalid Move');
            return false;
        }
        return true;

    }

     startPosition(){
        for (let x =0; x<this._field.length; x++){
            for(let y=0; y<this._field[0].length; y++){
                // console.log(this._field[x][y]);
                if(this._field[x][y] === '*'){
                    this._curr = [x, y];
                    break;
                }
                
            }
        }
    }
    attemptMove(move){
        let x = this._curr[0];
        let y = this._curr[1];
        let check;
        switch(move){
            case 'r':
                y +=1;
                
                check = this.makeMove(x,y);
                return check;
            case 'l':
                y-=1
                check = this.makeMove(x,y);
                return check;
            case 'u':
                x-=1;
                check = this.makeMove(x,y);
                return check;
            case 'd':
                x+=1;
                check = this.makeMove(x,y);
                return check;
        }

    }
    makeMove(u, v){
        if(this.checkInvalidMove(u, v)){
            this._field[u][v] = pathCharacter;
            this._curr = [u, v];
            this.print();
            return this.checkWin();
        }
        return false;
        
    }
}
const myField = new Field([
    ['*', '░', '░'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

// const direction = prompt('Which Direction to move: ');

myField.print();
let flag = false;

while(flag !== true){ //! Correct while Loop
    let mv = prompt('Move: ');
    let flag = myField.attemptMove(mv);
    if (flag === true){
        break;
    }
}