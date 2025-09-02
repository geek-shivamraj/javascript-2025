/**
 * Not All Content must go into Components
 *  - While working with React, we easily forget that we can add elements in index.html & we don't have to put everything into the Components.
 *  - Ofc most of our web app's markup, logic will be going to Components but if we've some static markups like headers etc. that doesn't
 *      depend on any data or state, we can put them in index.html file.
 *
 * public folder files
 *   - By default, the files (img etc.) in public folder, will always be available to our website visitors &  can easily reference those files inside
 *      our markup (no matter in component or index.html) by simply specifying the file name we want to use.
 *   - No need to build the path for public folder files.
 *
 * Which folder should we use ?
 *  1. public/ folder files
 *   - We should use the public/ folder for any images that should not be handled by the build process & that should be generally available.
 *   - Good candidates are images used directly in the index.html file or favicons.
 *
 *  2. src/ folder (e.g., src/assets/)
 *   - On other hand, images that are used inside of components should typically be stored in the src/ folder (e.g. in src/assets/)
 *
 *  Example: We've added <header> component with image in index.html
 *
 */


function App() {
    return null;
}

export default App
