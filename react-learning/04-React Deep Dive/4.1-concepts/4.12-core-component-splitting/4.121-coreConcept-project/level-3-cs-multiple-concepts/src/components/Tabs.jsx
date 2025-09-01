/**
 *  Concept 1: Working with multiple JSX Slots (i.e., passing JSX as a separate prop)<br>
 *    - Here "buttons" prop is explicitly for JSX Code other than "children" prop main Content slot: "children" & custom JSX slot: "button"
 *    - We can set more slots if our component would need extra slots for extra JSX content if needed.
 *
 *  Concept 2: Setting Component Type Dynamically <br>
 *    - In the <Tabs> component, we've wrapped our buttons with <menu> but we want to make this <Tabs> component a bit more flexible.
 *    - Since this <Tabs> component might be reused in different parts of our application,
 *      we might use different wrapper element around buttons in different places in our application.
 *
 *  2 ways to implement concept 2: <br>
 *      Way 1: Get rid of <menu> here & let the <Tabs> component use case to define the wrapper element or component.
 *
 *      Way 2: Get the wrapper element dynamically from <Tabs> component use case via additional Props i.e., buttonContainer or buttonWrapper
 *          - using "buttonContainer" prop, we can identify the type of wrapper.
 *
 *  Also, There are 2 ways to set buttonContainer as JSX code<br>
 *      Way 1: Setting up a const/variable & assign the prop to it.
 *
 *      Way 2: Use Capitalize prop name in Custom Component.
 *
 *  Concept 3: Setting Default prop value to Component Type
 *    - To make <Tabs> component highly reusable & configurable. there are high chances that in most cases "menu" element will be used as wrapper
 *              so it would be better if we use "menu" as default ButtonContainer prop
 */

// Concept 3 & (Use Capitalize JSX prop name)
// <Tabs buttonsContainer={} buttons={}>children</Tabs>
export default function Tabs({children, buttons, ButtonsContainer='menu'}) {
    return (
        <>
            <ButtonsContainer>{buttons}</ButtonsContainer>
            {children}
        </>);
}

// Concept 2 -> Way 2 -> Way 2 (Use Capitalize JSX prop name)
// <Tabs buttonsContainer={} buttons={}>children</Tabs>
function Tabs3({children, buttons, ButtonsContainer}) {
    return (
        <>
            <ButtonsContainer>{buttons}</ButtonsContainer>
            {children}
        </>);
}


// Concept 2 Impl -> Way 2 -> Way 1 (Setting up a const/variable & assign the prop to it)
// <Tabs2 buttonsContainer={} buttons={}>children</Tabs2>
function Tabs2({children, buttons, buttonsContainer}) {
    const ButtonsContainer = buttonsContainer;
    return (
        <>
            <ButtonsContainer>{buttons}</ButtonsContainer>
            {children}
        </>);
}

// Concept 1 Impl
// <Tabs1 buttons={}>children</Tabs1>
function Tabs1({children, buttons}) {
    return (
        <>
            <menu>{buttons}</menu>
            {children}
        </>);
}