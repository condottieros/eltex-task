"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/** Получение случайного числа в диапазоне 0-62 */
const getRandom = () => Math.floor(Math.random() * 62);
/** Преобразование случайного кода в код символов латиницы и цифр */
const randomToCode = (code) => {
    if (code > 35)
        return code + 61;
    if (code > 9)
        return code + 55;
    return code + 48;
};
const randomToSymbol = (a) => String.fromCharCode(randomToCode(a));
const getRandomSymbol = () => randomToSymbol(getRandom());
const wait = (ms) => new Promise(res => setTimeout(res, ms));
class RandomString {
    constructor(len) {
        this.numberCount = 0;
        this.symbolCount = 0;
        this.symbols = [];
        this.numberRanges = [];
        for (let x = 0; x < len; x++) {
            const symbol = getRandomSymbol();
            const isNum = !isNaN(parseInt(symbol));
            this.symbols.push({
                symbol,
                isNum
            });
            isNum ? this.numberCount++ : this.symbolCount++;
        }
    }
    replaceSymbols(char) {
        this.symbols.forEach(x => { if (!x.isNum)
            x.symbol = char; });
    }
    replaceNums(char) {
        this.symbols.forEach(x => { if (x.isNum)
            x.symbol = char; });
    }
    getString() {
        return this.symbols.map(x => x.symbol).join('');
    }
    getStrLengt() {
        return { symbols: this.symbolCount, nums: this.numberCount };
    }
}
const sourceBanner = document.querySelector('.source-string');
const repl1Banner = document.querySelector('.repl-1');
const repl2Banner = document.querySelector('.repl-2');
const numBn = document.querySelector('.num-bn');
const reset = () => [sourceBanner, repl1Banner, repl2Banner, numBn].forEach(el => el.innerHTML = '');
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    reset();
    const len = window.prompt('Введите длину строки');
    if (!len || isNaN(parseInt(len))) {
        alert('Неверный ввод !');
        return;
    }
    const rnd = new RandomString(parseInt(len));
    sourceBanner.innerHTML = rnd.getString();
    yield wait(1000);
    const repl1 = window.prompt('Введите первый символ для замены!');
    if (!repl1 || repl1.length > 1) {
        alert('Неверный ввод !');
        return;
    }
    rnd.replaceSymbols(repl1);
    repl1Banner.innerHTML = rnd.getString();
    yield wait(1000);
    const repl2 = window.prompt('Введите второй символ для замены!');
    if (!repl2 || repl2.length > 1) {
        alert('Неверный ввод !');
        return;
    }
    rnd.replaceNums(repl2);
    repl2Banner.innerHTML = rnd.getString();
    yield wait(500);
    const counters = rnd.getStrLengt();
    numBn.innerHTML = `Количество символов: ;${counters.symbols} и ${counters.nums}`;
});
const main = () => {
    document.querySelector('.start-btn').addEventListener('click', start);
};
main();
//# sourceMappingURL=index.js.map