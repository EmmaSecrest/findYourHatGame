const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const holePercentage = 0.2;
const fieldCharacter = '░';
const pathCharacter = '*';
const randArray = [fieldCharacter,hole];

class Field {
    
    constructor(field) {
        this._field = field;
        this.startPosition();
    }
    static generateField(len, width){
        let ar = [];
        for (let i=0; i<len; i++){
            ar[i] = [];
            for (let j =0; j<width; j++){
                ar[i][j]= fieldCharacter;
            }
            
        }
        for (let i=0; i<(holePercentage*len*width); i++){
            ar[Math.floor(Math.random()*len)][Math.floor(Math.random()*width)] = hole;
            
            // console.log(i)
        }
        let dummyx = 0;
        let dummyy = 0;
        while(dummyx ===0 && dummyy ===0){
            dummyx = Math.floor(Math.random()*width);
        dummyy = Math.floor(Math.random()*len);
        }
        ar[dummyy][dummyx] = '^';
        ar[0][0] = pathCharacter;
        
        return ar;
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
        console.log("You win!")
        return true;
    }
    checkInvalidMove(x, y){
        // console.log(`New Coordinates ${x}, ${y}`)

        if(x<0 || y<0 || this._field[x][y] === hole || x >= this._field.length || y >= this._field[0].length){
            console.log("Invalid Move");
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
// const myField = new Field([
//     ['*', '░', '░'],
//     ['░', 'O', '░'],
//     ['░', '^', '░'],
// ]);

// const direction = prompt('Which Direction to move: ');

console.log(`Valid Moves: Up-'u', Down-'d', left-'l', right-'r'`);

const myField = new Field(Field.generateField(5,5));

myField.print();
let flag = false;

while(flag !== true){ //! Correct while Loop
    let mv = prompt('Move: ');
    let flag = myField.attemptMove(mv);
    if (flag === true){
        break;
    }
}
