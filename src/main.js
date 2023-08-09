import count from './js/count';
import  sum from './js/sum';
import { mul} from './js/math';

// import css from "file.css";
import "./css/style.css";
import "./less/index.less";
import "./sass/index.sass";
import "./sass/index.scss";
import "./stylus/index.styl";
import "./css/iconfont.css";

console.log(mul(2,3));
const result = count(2,2);
console.log(result);
console.log(sum(1,2,3,4));


if( module.hot) {
    module.hot.accept("./js/count");
    module.hot.accept("./js/sum");

}