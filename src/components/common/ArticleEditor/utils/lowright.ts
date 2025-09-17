import { createLowlight } from "lowlight";

// подключаем нужные языки из highlight.js
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import css from "highlight.js/lib/languages/css";

// создаём экземпляр lowlight
const lowlight = createLowlight();

// регистрируем языки
lowlight.register("javascript", javascript);
lowlight.register("typescript", typescript);
lowlight.register("css", css);

export { lowlight };
