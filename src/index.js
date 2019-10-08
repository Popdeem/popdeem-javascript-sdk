import * as pd from "./popdeem";
if (typeof window === "undefined") {
  global.window = {};
}
window.pd = pd;
export default pd;
