# Project: Tic Tac Toe 

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

![image1.png](00-target-project/image1.png)

### Concept 1: Not All Content must go into Components
- #### While working with React, we easily forget that we can add elements in index.html & we don't have to put everything into the Components.
- #### Ofc most of our web app's markup, logic will be going to Components but if we've some static markups like headers etc. that doesn't depend on any data or state, we can put them in index.html file.

### Concept 2: public folder files
- #### By default, the files (img etc.) in public folder, will always be available to our website visitors & can easily reference those files inside our markup (no matter in component or index.html) by simply specifying the file name we want to use.
- #### No need to build the path for public folder files.

### Which folder should we use ?
1. #### public/ folder files
    - #### We should use the `public/ folder` for any images that should not be handled by the build process & that should be generally available.
    - #### Good candidates are the `images used directly in the index.html` file or `favicons`.

2. #### src/folder (e.g., src/assets/ )
    - #### On other hand, images that are used inside of components should typically be stored in the src/ folder (e.g. in `src/assets/`)

#### Task 1: Add `<header>` component with image in index.html & style the header & its content.

#### Task 2: Add the components: `Player`, Style it. 

#### Task 3: Add `input` on `edit` click & style it.

---

### Concept 3: Two-way Binding
- #### Listening to a change on the input & then feeding that updated value back into the input (via "value" prop) is called 2-way-binding.

#### Task 4: Utilizing 2-way binding, update the playerName via input event handler prop `onChange`
- #### `onChange` will be triggered for every keystroke & it will provide us with an event object that contains the value that was entered by the user.
- #### React will call the handleChange() function when the change event occurs & React will give us such an event object as a function.

---

![image2.png](00-target-project/image2.png)

### Concept 4: Rendering multi-dimensional list

#### Task 5: Create a `GameBoard` component with a 2D Gameboard array with all values as null & style the Gameboard to render on UI.

---

### Concept 5: Updating Object/Array State Immutably
- ####  If our state is an object or Array, we should update the state in an immutable way i.e., we create a copy of the old state & then just change the copy instead of the existing object or array.

#### Task 6: On each Gameboard square click, set each square to display either 'X' or 'O', assuming first activePlayer is 'X'.

---

### Concept 6: Lifting State up
- #### Instead of managing which player is currently active in the GameBoard or Player component, we should manage the state in the closest ancestor component that has access to both components.

#### Task 7: Highlight the active Player & since `Player` component is available in `App` component, we need to lift `activePlayer` state to `App` component. Lift it & assume first activePlayer is 'X', 

---

#### Task 8: Use the available `winning-combination.js` & add the game logic for Winner & draw in `GameBoard`. Also create a new component `GameOver` as overlay which will be displayed in case we will have a winner or draw.

---

![image3.png](00-target-project/image3.png)

![image4.png](00-target-project/image4.png)

### Concept 7: Disabling Gameboard square conditionally
- #### Based on whether the button is already selected by a player or not.

#### Task 9: Disable the Gameboard Square if it's already selected by either player.

---

### Concept 8: Avoid intersecting States and Prefer Computed values & Avoid unnecessary state management.
- #### We should avoid using one state into another state in the same component.
- #### For e.g., setActivePlayer & setTurns, as setTurns requires active player too.

#### Task 10: 
- #### Now in order to add `Log` component, we need an ordered list of turns with row & col with player symbol. Use `turns` state to derive `GameBoard` state & remove `GameBoard` state
- #### To reset/remove `Gameover` overlay, we need to set `turns` state back to initial one & then we wll face problem that `Gameover` screen won't be removed becoz there is no state in `GameBoard` that will enforce re-render.
- #### Move the `Gameover` overlay to `App` component. Then move `winning & draw logic & the gameboard` to `App` component & derive each.

---

### Concept 9: Reduce State Management & Identifying unnecessary state

#### Task 11: Remove `activePlayer` state & derive it from `turns` state.

---

#### Task 12: Instead of showing `player symbol`, display `winner player name`

---