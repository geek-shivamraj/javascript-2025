import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import "./index.css";

/**
 *  1. Custom Components
 *      - Name starts with an uppercase character. Defined by us "wraps" built-in or other custom components.
 *      - React "traverses" the Component Tree until it has only built-in Components left.
 *      - The custom Components will not be shown in the actual rendered DOM only "built-in" components will be shown.
 *
 *  2. Built-in Components
 *      - Name starts with a lowercase character. Only valid, officially defined HTML elements are allowed.
 *      - Built-in components are rendered as DOM notes by React (i.e., displayed on the screen)
 *
 *  The createRoot() & render() methods are responsible for rendering a single root component (<App />), which inturn may
 *  contain as many nested components as needed and with this, we end up with a Component Hierarchy often called a Component Tree/Structure
 *  which is then rendered to the screen via React.
 *
 */

const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(<App />);
