import count from './js/count';
import  sum from './js/sum';
// import css from "file.css";
import "./css/style.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./stylus/index.styl";
import "./css/iconfont.css";

const result = count(2,2);
console.log(result);
console.log(sum(1,2,3,4));

if( module.hot) {
    module.hot.accept("./js/count.js");
}