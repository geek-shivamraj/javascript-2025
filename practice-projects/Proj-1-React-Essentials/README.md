# React Essential Project

![Image 1](./00-target-project/image1.png)

### Step 1: Add Component
- #### In React, the Component is just a Javascript function with 2 rules
  - Name must start with uppercase character & multi-word should be written in PascalCase (e.g., MyHeader)
  - Returns a renderable content (In most cases: Return JSX, but also returns: string, number, boolean, null, array of allowed values.)
- #### **Task 1:** Create a component with name "Header" having `<img>, <h1>, <p>` & Style all the 3 builtin components.

### Step 2: Dynamically loading the Content
- #### Instead of just outputting static content, we can actually output Dynamic content in a Component (JSX) by using curly braces {}.
- #### **Task 2:** We want the static content "Fundamental" in `<header>` to keep randomly changing with values as ['Core', 'Crucial']

### Step 3: Dynamically loading the Image
- #### **Task 3:** Import the image via 'import' & adding it to src via {}

### Step 4: Props Concept
- #### "Props" concept is all about passing the data/attributes (called as Props) into Custom Components & then use that data/attributes to built-in components.
- #### Component function can accept only one "prop" parameter & "prop" will be set by React becoz only React will execute this function.
- #### **Task 4:** Read data.js & pass the prop to created CoreConcept component, each having different title, description & image. Also style the CoreConcepts & all tags

---

![Image 2](./00-target-project/image2.png)
### Step 5: Component Composition
- #### Component Composition is a way of building Components where our components can wrap other Components/Contents.
- #### The "children" prop contains whatever content b/w our Component tag & this content can be text or some complex JSX structure if needed.
- #### Task 5: Add new section "examples" with `<h2>, <p> & <menu>` tag. Create a TabButton component with "children" prop & create 4 instances of TabButton having values/content as Component, JSX, Props, State. Style them too.

---

![Image 3](./00-target-project/image3.png)

![Image 4](./00-target-project/image4.png)

![Image 5](./00-target-project/image5.png)

![Image 6](./00-target-project/image6.png)

