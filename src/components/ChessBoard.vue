<template>
  <div class="board-container">
    <div v-for="(row, rowIndex) in boardsg" :key="rowIndex" :class="`y y${rowIndex}`">
      <p
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        :class="['cell', getColColor(rowIndex, colIndex), `x${colIndex}`]"
        @click="handleCellClick(rowIndex, colIndex)"
      >
      <img
          v-if="cell !== N"
          :class="'piece'"
          :src="`/pieces/${cell[0]}${cell[1]}.png`"
          :alt="`${cell[0]} ${cell[1]}`"
        />
        <span v-if="isMoveHighlighted(rowIndex, colIndex)" class="dot"></span>
      </p>
    </div>
    <div class="notif-contain" v-if="notification">
      <div class="notif">
        <p>{{ notification }}</p>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { 
  arrayEquals, 
  movePiece, 
  checkAvailMoves, 
  isCheckMate, 
  oppColor, 
  PAWN,
  BISHOP,
  KNIGHT,
  ROOK,
  QUEEN,
  KING,
  N,
  WHITE,
  BLACK
} from '../utils/gameUtils';
const boarde = ref(null);
const boardsg = ref([]);
const toPlay = ref(WHITE);
const PIC = ref([]);
const picAvMoves = ref([]);
const notification = ref('');
const posMoves = ref([]); 
const startingBoard = [[
    [ROOK,BLACK],[KNIGHT,BLACK],[BISHOP,BLACK],[QUEEN,BLACK],[KING,BLACK],[BISHOP,BLACK],[KNIGHT,BLACK],[ROOK,BLACK]
],[
    [PAWN,BLACK],[PAWN,BLACK],[PAWN,BLACK],[PAWN,BLACK],[PAWN,BLACK],[PAWN,BLACK],[PAWN,BLACK],[PAWN,BLACK]
],[
    N,N,N,N,N,N,N,N,
],
[
    N,N,N,N,N,N,N,N
],
[
    N,N,N,N,N,N,N,N
],
[
    N,N,N,N,N,N,N,N
],
[
    [PAWN,WHITE],[PAWN,WHITE],[PAWN,WHITE],[PAWN,WHITE],[PAWN,WHITE],[PAWN,WHITE],[PAWN,WHITE],[PAWN,WHITE]
],
[
    [ROOK,WHITE],[KNIGHT,WHITE],[BISHOP,WHITE],[QUEEN,WHITE],[KING,WHITE],[BISHOP,WHITE],[KNIGHT,WHITE],[ROOK,WHITE]
]];
const getColColor = (rowIndex, colIndex) => {
  return (rowIndex + colIndex) % 2 === 0 ? 'w' : 'b';
};
const startGame = () => {
  toPlay.value = WHITE;
  PIC.value = [];
  picAvMoves.value = [];
};
const isMoveHighlighted = (row, col) => {
  return posMoves.value.some(move => move[0] === row && move[1] === col);
};
const showPosMoves = (moves) => {
  posMoves.value = moves;
};

const clearPosMoves = () => {
  posMoves.value = [];
};

const handleCellClick = async (y, x) => {
  console.log("enterd");
  if (PIC.value.length !== 0 && picAvMoves.value.length !== 0 && !arrayEquals(PIC.value, [y, x])) {
    console.log("tt1");
    const moved = await movePiece(
      PIC.value,
      [y, x],
      picAvMoves.value,
      boardsg.value[PIC.value[0]][PIC.value[1]][0],
      boardsg.value[PIC.value[0]][PIC.value[1]][1],
      boardsg.value
    );
    console.log("tt2");
    if (moved) {
      toPlay.value = oppColor(toPlay.value);
      const status = await isCheckMate(boardsg.value, toPlay.value);
      if (status === 'mate') {
        notification.value = 'CHECKMATE!';
      } else if (status === 'null') {
        notification.value = 'NULL!';
      }
    }
  }
  clearPosMoves();
  PIC.value = [];
  picAvMoves.value = [];
  console.log("got here");
  if (boardsg.value[y][x][1] === toPlay.value) {
    PIC.value = [y, x];
    picAvMoves.value = await checkAvailMoves(
      boardsg.value[y][x][0],
      x,
      y,
      boardsg.value[y][x][1],
      boardsg.value
    );
    showPosMoves(picAvMoves.value);
  }
};


onMounted(() => {
  boarde.value = startingBoard;
  boardsg.value = startingBoard;
  startGame();
});
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
}
.y{
    display: flex;
    height: 75px;
    width: 100%;
}
.board-container{
    display: flex;
    flex-direction: column;
    width: 600px;
    height: 600px;
    border: 2px solid black;
    margin: auto;
}
.w{
    background-color: #eae9d2;
    height: 100%;
    width: 75px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.b{
    background-color: #4b7399;
    height: 100%;
    width: 75px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.board-container div p img{
    height: 60px;
    width: 65px;
}
span.dot{
    position: absolute;
    color: rgb(0, 216, 0);
    background-color: rgb(0, 216, 0);
    height: 20px;
    width: 20px;
    border-radius: 50px;
}
.notif-contain{
    z-index: 5;
    position: fixed;
    top:150px;
    left:0;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
}
.notif{
    border-radius: 10px;
    width: 500px;
    height: 100px;
    background-color: rgb(37, 37, 37);
    display: flex;
    align-items: center;
    justify-content: center;
}
.notif p{
    color: white;
    font-weight: 900;
    font-size: 50px;
}
</style>
