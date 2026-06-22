<template>
  <div class="numericKeyboard" :class="{ numericKeyboardActive: keyboardActive }">
    <div
      v-for="(row, rowIndex) in rows"
      :key="'row_' + rowIndex"
      :class="['numericRow', rowIndex === rows.length - 1 ? 'numericRowLast' : '']"
    >
      <div
        v-for="(key, colIndex) in row"
        :key="key.id"
        :class="[
          'numericKey',
          isFocused(rowIndex, colIndex) ? 'numericKeyActive' : '',
        ]"
      >
        <span class="numericKeyLabel">{{ key.label }}</span>
      </div>
    </div>
  </div>
</template>

<script>
const ROWS = [
  [
    { id: '1', label: '1', value: '1' },
    { id: '2', label: '2', value: '2' },
    { id: '3', label: '3', value: '3' },
    { id: '4', label: '4', value: '4' },
  ],
  [
    { id: '5', label: '5', value: '5' },
    { id: '6', label: '6', value: '6' },
    { id: '7', label: '7', value: '7' },
    { id: '8', label: '8', value: '8' },
  ],
  [
    { id: '9', label: '9', value: '9' },
    { id: '0', label: '0', value: '0' },
    { id: 'bksp', label: '⌫', value: 'bksp' },
  ],
]

export default {
  name: 'NumericKeyboard',
  data() {
    return {
      rows: ROWS,
      focusRow: 0,
      focusCol: 0,
      keyboardActive: false,
    }
  },
  methods: {
    isFocused(rowIndex, colIndex) {
      return this.keyboardActive
        && this.focusRow === rowIndex
        && this.focusCol === colIndex
    },

    activate() {
      this.keyboardActive = true
      this.focusRow = 0
      this.focusCol = 0
    },

    ensureActive() {
      this.keyboardActive = true
    },

    deactivate() {
      this.keyboardActive = false
    },

    currentKey() {
      const key = this.rows[this.focusRow][this.focusCol]
      if (!key) return null
      return key
    },

    moveTo(row, col) {
      if (!this.rows[row] || !this.rows[row][col]) return false
      this.focusRow = row
      this.focusCol = col
      return true
    },

    findNextCol(row, col, step) {
      const next = col + step
      if (next >= 0 && next < this.rows[row].length) {
        return next
      }
      return col
    },

    left() {
      if (!this.keyboardActive) return false
      const nextCol = this.findNextCol(this.focusRow, this.focusCol, -1)
      if (nextCol !== this.focusCol) {
        this.focusCol = nextCol
        return true
      }
      return false
    },

    right() {
      if (!this.keyboardActive) return false
      const nextCol = this.findNextCol(this.focusRow, this.focusCol, 1)
      if (nextCol !== this.focusCol) {
        this.focusCol = nextCol
        return true
      }
      return false
    },

    up() {
      if (!this.keyboardActive) return false
      if (this.focusRow <= 0) return false
      const nextRow = this.focusRow - 1
      const col = Math.min(this.focusCol, this.rows[nextRow].length - 1)
      return this.moveTo(nextRow, col)
    },

    down() {
      if (!this.keyboardActive) return false
      if (this.focusRow >= this.rows.length - 1) return false
      const nextRow = this.focusRow + 1
      const col = Math.min(this.focusCol, this.rows[nextRow].length - 1)
      return this.moveTo(nextRow, col)
    },

    enter() {
      if (!this.keyboardActive) return false
      const key = this.currentKey()
      if (!key) return false
      if (key.value === 'bksp') {
        this.$emit('backspace')
      } else {
        this.$emit('digit', key.value)
      }
      return true
    },
  },
}
</script>

<style scoped>
.numericKeyboard {
  width: 100%;
  box-sizing: border-box;
  direction: ltr;
}

.numericRow {
  display: flex;
  display: -webkit-flex !important;
  flex-direction: row;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  margin-bottom: 8px;
}

.numericRowLast {
  justify-content: center;
  -webkit-justify-content: center;
}

.numericRow:last-child {
  margin-bottom: 0;
}

.numericKey {
  width: 21%;
  height: 52px;
  margin-left: 2%;
  margin-right: 2%;
  flex: 0 0 auto;
  -webkit-flex: 0 0 auto;
  border-radius: 8px;
  background: rgba(74, 74, 75, 1);
  border: 2px solid rgba(255, 255, 255, 0.25);
  box-sizing: border-box;
  display: flex;
  display: -webkit-flex !important;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
}

.numericRowLast .numericKey {
  width: 28%;
  margin-left: 3%;
  margin-right: 3%;
}

.numericKeyActive {
  border-color: #116DFF;
  box-shadow: 0 0 0 1px #116DFF;
  background: rgba(17, 109, 255, 0.35);
}

.numericKeyLabel {
  width: 100%;
  height: 100%;
  display: flex;
  display: -webkit-flex !important;
  align-items: center;
  -webkit-align-items: center;
  justify-content: center;
  -webkit-justify-content: center;
  font-size: 24px;
  line-height: 1;
  color: #ffffff;
  text-align: center;
}
</style>
