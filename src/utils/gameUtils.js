export const PAWN = "pawn";
export const BISHOP = "bishop";
export const KNIGHT = "knight";
export const ROOK = "rook";
export const QUEEN = "queen";
export const KING = "king";
export const N = "empty";
export const WHITE = "w";
export const BLACK = "b";
export async function isCheckMate(boardd,color){
    return new Promise((resolve)=> {
        (async () => {
            let boardddd = makeBoardCopy(boardd);
            for(let i=0;i<8;i++){
                for(let j=0;j<8;j++){
                    if(boardddd[i][j]==N){
                        continue;
                    }
                    else if(boardddd[i][j][1]!==color){
                        continue;
                    }
                    else{
                        let m = await checkAvailMoves(boardddd[i][j][0],j,i,color,boardddd);
                        if(m.length!==0){
                            resolve("");
                        }
                    }
                }
            }
            let kp = await searchForKing(color,boardd);
            let iic = isInCheck(kp[1],kp[0],color,boardd);
            console.log("isincheck for "+color+" :"+iic);
            if(iic){
                resolve("mate");
            }else{
                resolve("null");
            }
        })()
    })
}
export function oppColor(color){
    if(color==WHITE){
        return BLACK;
    }
    return WHITE;
}
export function makeBoardCopy(boardz){
    let b = []
    for(let i=0;i<8;i++){
        b[i] = boardz[i].concat();
    }
    return b;
}
export async function checkAvailMoves(type,x,y,color,boardcam){
    x = parseInt(x);
    y = parseInt(y);
    let aP = [];
    switch(type){
        case PAWN:
            if(color==WHITE){
                if(boardcam[y-1][x]==N){
                    aP.push([y-1,x]);
                    if(y==6){
                        if(boardcam[y-2][x]==N){
                            aP.push([y-2,x]);
                        } 
                    }
                } 
                if(x!==7){
                    if(boardcam[y-1][x+1]!==N && boardcam[y-1][x+1]!==null){
                        if(boardcam[y-1][x+1][1]==oppColor(color)){
                            aP.push([y-1,x+1]);
                        }
                    }
                }
                if(x!==0){
                    if(boardcam[y-1][x-1]!==N && boardcam[y-1][x-1]!==null){
                        if(boardcam[y-1][x-1][1]==oppColor(color)){
                            aP.push([y-1,x-1]);
                        }
                    }
                }
            }
            if(color==BLACK){
                if(boardcam[y+1][x]==N){
                    aP.push([y+1,x]);
                    if(y==1){
                        if(boardcam[y+2][x]==N){
                            aP.push([y+2,x]);
                        }
                    }
                } 
                if(x!==7){
                    if(boardcam[y+1][x+1]!==N && boardcam[y-1][x+1]!==null){
                        if(boardcam[y+1][x+1][1]==oppColor(color)){
                            aP.push([y+1,x+1]);
                        }
                    }
                }
                if(x!==0){
                    if(boardcam[y+1][x-1]!==N && boardcam[y-1][x-1]!==null){
                        if(boardcam[y+1][x-1][1]==oppColor(color)){
                            aP.push([y+1,x-1]);
                        }
                    }
                }
            }
            break;
        case ROOK:
            for(let i=x;i<8;i++){
                if(boardcam[y][i]==N){
                    aP.push([y,i]);
                }
                else if(i==x){
                    continue
                }
                else{
                    if(boardcam[y][i][1] == oppColor(color)){
                        aP.push([y,i]);
                    }
                    break;
                }
            }
            for(let i=x;i>=0;i--){
                if(boardcam[y][i]==N){
                    aP.push([y,i]);
                }
                else if(i==x){
                    continue
                }
                else{
                    if(boardcam[y][i][1] == oppColor(color)){
                        aP.push([y,i]);
                    }
                    break;
                }
            }
            for(let i=y;i<8;i++){
                if(boardcam[i][x]==N){
                    aP.push([i,x]);
                }
                else if(i==y){
                    continue
                }
                else{
                    if(boardcam[i][x][1] == oppColor(color)){
                        aP.push([i,x]);
                    }
                    
                    break;
                }
            }
            for(let i=y;i>=0;i--){
                if(boardcam[i][x]==N){
                    aP.push([i,x]);
                }
                else if(i==y){
                    continue
                }
                else{
                    if(boardcam[i][x][1] == oppColor(color)){
                        aP.push([i,x]);
                    }
                    break;
                }
            }
            break;
        case BISHOP:
            for(let i=x,j=y;i<8 && i>=0,j<8 && j>=0;i++,j++){
                if(boardcam[j][i]==null){
                    break;
                }
                if(boardcam[j][i]==N){
                    aP.push([j,i]);
                }
                else if(i==x && j==y){
                    continue
                }
                else{
                    if(boardcam[j][i][1] == oppColor(color)){
                        aP.push([j,i]);
                    }
                    break;
                }
            }
            for(let i=x,j=y;i<8 && i>=0,j<8 && j>=0;i++,j--){
                if(boardcam[j][i]==null){
                    break;
                }
                if(boardcam[j][i]==N){
                    aP.push([j,i]);
                }
                else if(i==x && j==y){
                    continue
                }
                else{
                    if(boardcam[j][i][1] == oppColor(color)){
                        aP.push([j,i]);
                    }
                    break;
                }
            }
            for(let i=x,j=y;i<8 && i>=0,j<8 && j>=0;i--,j++){
                if(boardcam[j][i]==null){
                    break;
                }
                if(boardcam[j][i]==N){
                    aP.push([j,i]);
                }
                else if(i==x && j==y){
                    continue
                }
                else{
                    if(boardcam[j][i][1] == oppColor(color)){
                        aP.push([j,i]);
                    }
                    break;
                }
            }
            for(let i=x,j=y;i<8 && i>=0,j<8 && j>=0;i--,j--){
                if(boardcam[j][i]==null){
                    break;
                }
                if(boardcam[j][i]==N){
                    aP.push([j,i]);
                }
                else if(i==x && j==y){
                    continue
                }
                else{
                    if(boardcam[j][i][1] == oppColor(color)){
                        aP.push([j,i]);
                    }
                    break;
                }
            }
            break;
        case KNIGHT:
            if(y+2<8 && x+1<8 && y+2>=0 && x+1 >=0){
                if(boardcam[y+2][x+1]==N){
                    aP.push([y+2,x+1]);
                }
                else{
                    if(boardcam[y+2][x+1][1]==oppColor(color)){
                        aP.push([y+2,x+1]);
                    }
                }
            }
            if(y+2<8 && x-1<8 && y+2>=0 && x-1>=0){
                if(boardcam[y+2][x-1]==N){
                    aP.push([y+2,x-1]);
                }
                else{
                    if(boardcam[y+2][x-1][1]==oppColor(color)){
                        aP.push([y+2,x-1]);
                    }
                }
            }
            if(y+1<8 && x+2<8 && y+1>=0 && x+2>=0){
                if(boardcam[y+1][x+2]==N){
                    aP.push([y+1,x+2]);
                }
                else{
                    if(boardcam[y+1][x+2][1]==oppColor(color)){
                        aP.push([y+1,x+2]);
                    }
                }
            }
            if(y-1<8 && x+2<8 && y-1>=0 && x+2>=0){
                if(boardcam[y-1][x+2]==N){
                    aP.push([y-1,x+2]);
                }
                else{
                    if(boardcam[y-1][x+2][1]==oppColor(color)){
                        aP.push([y-1,x+2]);
                    }
                }
            }
            if((y-2<8 && y-2>=0) && (x+1>=0 && x+1<8)){
                if(boardcam[y-2][x+1]==N){
                    aP.push([y-2,x+1]);
                }
                else{
                    if(boardcam[y-2][x+1][1]==oppColor(color)){
                        aP.push([y-2,x+1]);
                    }
                }
            }
            if((y-2<8 && y-2>=0) && (x-1<8 && x-1>=0)){
                if(boardcam[y-2][x-1]==N){
                    aP.push([y-2,x-1]);
                }
                else{
                    if(boardcam[y-2][x-1][1]==oppColor(color)){
                        aP.push([y-2,x-1]);
                    }
                }
            }
            if((y+1<8 && y+1>=0) &&(x-2<8 && x-2>=0)){
                if(boardcam[y+1][x-2]==N){
                    aP.push([y+1,x-2]);
                }
                else{
                    if(boardcam[y+1][x-2][1]==oppColor(color)){
                        aP.push([y+1,x-2]);
                    }
                }
            }
            if((y-1<8 && y-1>=0) && (x-2<8 && x-2>=0)){
                if(boardcam[y-1][x-2]==N){
                    aP.push([y-1,x-2]);
                }
                else{
                    if(boardcam[y-1][x-2][1]==oppColor(color)){
                        aP.push([y-1,x-2]);
                    }
                }
            }
            break;
        case QUEEN: {
            let a1 = await checkAvailMoves(BISHOP,x,y,color,boardcam);
            aP = a1.concat(await checkAvailMoves(ROOK,x,y,color,boardcam));
            break;
        }
        case KING:
            if(x+1<8 && x+1>=0){
                if(y-1<8 && y-1>=0){
                    if(boardcam[y-1][x+1]==N || boardcam[y-1][x+1][1]==oppColor(color)){
                        aP.push([y-1,x+1]);
                    }
                }
                if(y+1<8 && y+1>=0){
                    if(boardcam[y+1][x+1]==N || boardcam[y+1][x+1][1]==oppColor(color)){
                        aP.push([y+1,x+1]);
                    }
                }
                if(boardcam[y][x+1]==N || boardcam[y][x+1][1]==oppColor(color)){
                    aP.push([y,x+1]);
                }
            }
            if(x-1<8 && x-1>=0){
                if(y-1<8 && y-1>=0){
                    if(boardcam[y-1][x-1]==N || boardcam[y-1][x-1][1]==oppColor(color)){
                        aP.push([y-1,x-1]);
                    }
                }
                if(y+1<8 && y+1>=0){
                    if(boardcam[y+1][x-1]==N || boardcam[y+1][x-1][1]==oppColor(color)){
                        aP.push([y+1,x-1]);
                    }
                }
                if(boardcam[y][x-1]==N || boardcam[y][x-1][1]==oppColor(color)){
                    aP.push([y,x-1]);
                }
            }
            if(y+1<8 && y+1>=0){
                if(boardcam[y+1][x]==N || boardcam[y+1][x][1]==oppColor(color)){
                    aP.push([y+1,x]);
                }
            }
            if(y-1<8 && y-1>=0){
                if(boardcam[y-1][x]==N || boardcam[y-1][x][1]==oppColor(color)){
                    aP.push([y-1,x]);
                }
            }
            break;
        default:
            break;
    }
    let testBoard = makeBoardCopy(boardcam);
    let safeSquares = await checkMovesIfSafe(x,y,type,color,testBoard,aP)
    aP = safeSquares;
    return aP;
}
export function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}
export function arrayIsInArray(a,b){
    return new Promise(function (resolve) {
        let f=false;
        for (let i = 0; i < b.length; i++) {
            if(arrayEquals(a,b[i])){
                f=true;
                break;
            }
            
        }
        resolve(f);
    })
}
export function movePiece(from,to,avMoves,type,color,boardParam){
    return new Promise((resolve) => {
        (async () => {
            let xFrom = parseInt(from[1]);
            let yFrom = parseInt(from[0]);
            let xTo = parseInt(to[1]);
            let yTo = parseInt(to[0]);
            let aia = await arrayIsInArray(to,avMoves);
            if(aia){
                boardParam[yFrom][xFrom]=N;
                boardParam[yTo][xTo]=[type,color];
                resolve(aia);
            }else{
                resolve()
            }
        })();

    })
}
export function searchForKing(color,boardsk){
    return new Promise(function (resolve) {
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                if(boardsk[i][j]!==N){
                    if(boardsk[i][j][0]==KING && boardsk[i][j][1]==color){
                        resolve([i,j]);
                    }
                }
            }
        }
    })
}
export function removeAll(arr, target) {
    var i = 0;
    while (i < arr.length) {
      if (arrayEquals(arr[i],target)) {
        arr.splice(i, 1);
      } else {
        ++i;
      }
    }
    return arr;
}
export function checkMovesIfSafe(x,y,type,color,boardcm,moves){
    return new Promise((resolve, reject) => {
        (async () => {
            try {
                let tmpBoard = makeBoardCopy(boardcm);
                // const kingPos = await searchForKing(color, tmpBoard);

                for (let i = 0; i < moves.length; i++) {
                    const e = moves[i];
                    const m = await movePiece([y, x], e, moves, type, color, tmpBoard);

                    if (m) {
                        const kingPos1 = await searchForKing(color, tmpBoard);
                        if (isInCheck(kingPos1[1], kingPos1[0], color, tmpBoard)) {
                            moves = removeAll(moves, e);
                            i--;
                        }
                        tmpBoard = makeBoardCopy(boardcm);
                    }
                }

                resolve(moves);
            } catch (error) {
                reject(error);
            }
        })();
    });
}
export function isInCheck(x,y,color,boardiic){
    x = parseInt(x);
    y = parseInt(y);
    //check by pawn
    if(color==BLACK){
        if(y<6){
            if(x>0){
                if(x<7){
                    if(boardiic[y+1][x-1]!==N){
                        if(boardiic[y+1][x-1][0]==PAWN && boardiic[y+1][x-1][1]==oppColor(color)){
                            return true;
                        }
                    }
                    if(boardiic[y+1][x+1]!==N){
                        if(boardiic[y+1][x+1][0]==PAWN && boardiic[y+1][x+1][1]==oppColor(color)){
                            return true;
                        }
                    }
                }
                else{
                    if(boardiic[y+1][x-1]!==N){
                        if(boardiic[y+1][x-1][0]==PAWN && boardiic[y+1][x-1][1]==oppColor(color)){
                            return true;
                        }
                    }
                }
            }else{
                if(boardiic[y+1][x+1]!==N){
                    if(boardiic[y+1][x+1][0]==PAWN && boardiic[y+1][x+1][1]==oppColor(color)){
                        return true;
                    }
                }
            }
        }
    }
    if(color==WHITE){
        if(y>1){
            if(x>0){
                if(x<7){
                    if(boardiic[y-1][x-1]!==N){
                        if(boardiic[y-1][x-1][0]==PAWN && boardiic[y-1][x-1][1]==oppColor(color)){
                            return true;
                        }
                    }
                    if(boardiic[y-1][x+1]!==N){
                        if(boardiic[y-1][x+1][0]==PAWN && boardiic[y-1][x+1][1]==oppColor(color)){
                            return true;
                        }
                    }
                }
                else{
                    if(boardiic[y-1][x-1]!==N){
                        if(boardiic[y-1][x-1][0]==PAWN && boardiic[y-1][x-1][1]==oppColor(color)){
                            return true;
                        }
                    }
                }
            }else{
                if(boardiic[y-1][x+1]!==N){
                    if(boardiic[y-1][x+1][0]==PAWN && boardiic[y-1][x+1][1]==oppColor(color)){
                        return true;
                    }
                }
            }
        }
    }
    // check by queen or rook
    for(let i=x;i<8;i++){
        if(i==x){
            continue
        }
        if(boardiic[y][i]!==N){
            if((boardiic[y][i][0]==QUEEN|| boardiic[y][i][0]==ROOK) && boardiic[y][i][1]==oppColor(color)){
                return true;
            }
            break;
        }
    }
    for(let i=x;i>=0;i--){
        if(i==x){
            continue
        }
        if(boardiic[y][i]!==N){
            if((boardiic[y][i][0]==QUEEN|| boardiic[y][i][0]==ROOK) && boardiic[y][i][1]==oppColor(color)){
                return true;
            }
            break;
        }
    }
    for(let i=y;i<8;i++){
        if(i==y){
            continue
        }
        if(boardiic[i][x]!==N){
            if((boardiic[i][x][0]==QUEEN|| boardiic[i][x][0]==ROOK) && boardiic[i][x][1]==oppColor(color)){
                return true;
            }
            break;
        }
    }
    for(let i=y;i>=0;i--){
        if(i==y){
            continue
        }
        if(boardiic[i][x]!==N){
            if((boardiic[i][x][0]==QUEEN|| boardiic[i][x][0]==ROOK) && boardiic[i][x][1]==oppColor(color)){
                return true;
            }
            break;
        }
    }
    //check by queen or bishop

    for(let i=x,j=y;i<8 && i>=0,j<8 && j>=0;i++,j++){
        if(boardiic[j][i]==null){
            break;
        }
        if(i==x && j==y){
            continue
        }
        if(boardiic[j][i]!==N){
            if((boardiic[j][i][0]==QUEEN|| boardiic[j][i][0]==BISHOP) && boardiic[j][i][1]==oppColor(color)){
                return true;
            }
        break;
        }
    }
    for(let i=x,j=y;i<8 && i>=0,j<8 && j>=0;i++,j--){
        if(boardiic[j][i]==null){
            break;
        }
        if(i==x && j==y){
            continue
        }
        if(boardiic[j][i]!==N){
            if((boardiic[j][i][0]==QUEEN|| boardiic[j][i][0]==BISHOP) && boardiic[j][i][1]==oppColor(color)){
                return true;
            }
            break;
        }
    }
    for(let i=x,j=y;i<8 && i>=0,j<8 && j>=0;i--,j++){
        if(boardiic[j][i]==null){
            break;
        }
        if(i==x && j==y){
            continue
        }
        if(boardiic[j][i]!==N){
            if((boardiic[j][i][0]==QUEEN|| boardiic[j][i][0]==BISHOP) && boardiic[j][i][1]==oppColor(color)){
                return true;
            }
            break;
        }
    }
    for(let i=x,j=y;i<8 && i>=0,j<8 && j>=0;i--,j--){
        if(boardiic[j][i]==null){
            break;
        }
        if(i==x && j==y){
            continue
        }
        if(boardiic[j][i]!==N){
            if((boardiic[j][i][0]==QUEEN|| boardiic[j][i][0]==BISHOP) && boardiic[j][i][1]==oppColor(color)){
                return true;
            }
            break;
        }
    }
    //check by knight
    if(y+2<8 && x+1<8 && y+2>=0 && x+1 >=0){
        if(boardiic[y+2][x+1]!==N){
            if(boardiic[y+2][x+1][0]==KNIGHT && boardiic[y+2][x+1][1]==oppColor(color)){
                return true;
            }
        }
    }
    if(y+2<8 && x-1<8 && y+2>=0 && x-1>=0){
        if(boardiic[y+2][x-1]!==N){
            if(boardiic[y+2][x-1][0]==KNIGHT && boardiic[y+2][x-1][1]==oppColor(color)){
                return true;
            }
        }
    }
    if(y+1<8 && x+2<8 && y+1>=0 && x+2>=0){
        if(boardiic[y+1][x+2]!==N){
            if(boardiic[y+1][x+2][0]==KNIGHT && boardiic[y+1][x+2][1]==oppColor(color)){
                return true;
            }
        }
    }
    if(y-1<8 && x+2<8 && y-1>=0 && x+2>=0){
        if(boardiic[y-1][x+2]!==N){
            if(boardiic[y-1][x+2][0]==KNIGHT && boardiic[y-1][x+2][1]==oppColor(color)){
                return true;
            }
        }
    }
    if((y-2<8 && y-2>=0) && (x+1>=0 && x+1<8)){
        if(boardiic[y-2][x+1]!==N){
            if(boardiic[y-2][x+1][0]==KNIGHT && boardiic[y-2][x+1][1]==oppColor(color)){
                return true;
            }
        }
    }
    if((y-2<8 && y-2>=0) && (x-1<8 && x-1>=0)){
        if(boardiic[y-2][x-1]!==N){
            if(boardiic[y-2][x-1][0]==KNIGHT && boardiic[y-2][x-1][1]==oppColor(color)){
                return true;
            }
        }
    }
    if((y+1<8 && y+1>=0) &&(x-2<8 && x-2>=0)){
        if(boardiic[y+1][x-2]!==N){
            if(boardiic[y+1][x-2][0]==KNIGHT && boardiic[y+1][x-2][1]==oppColor(color)){
                return true;
            }
        }
    }
    if((y-1<8 && y-1>=0) && (x-2<8 && x-2>=0)){
        if(boardiic[y-1][x-2]!==N){
            if(boardiic[y-1][x-2][0]==KNIGHT && boardiic[y-1][x-2][1]==oppColor(color)){
                return true;
            }
        }
    }
    return false;
}