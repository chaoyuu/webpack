import count from './js/count';
import sum from './js/sum';
// import "core-js";
import "core-js/es/promise";
// import css from "file.css";
import "./css/style.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./stylus/index.styl";
import "./css/iconfont.css";

// console.log(mul(2,3));
const result = count(2, 2);
console.log(result);
console.log(sum(1, 2, 3, 4));
document.getElementById('btn').onclick = function () {
    //eslint不能识别import这一行
    import(/* webpackChunkName: "math" */'./js/math').then(({ mul }) => {
        console.log(mul(2, 3));
    });

}

if (module.hot) {
    module.hot.accept("./js/count");
    module.hot.accept("./js/sum");

}

new Promise((resolve) =>{
    setTimeout(() =>{
    

        resolve();


    },1000)
});


const arr = [1,2,3,4];

console.log(arr.includes(4));


if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }