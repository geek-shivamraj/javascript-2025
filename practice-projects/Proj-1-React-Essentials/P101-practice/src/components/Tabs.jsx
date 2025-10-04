
// Task 12: Create a new Component with TabButton & Content
// buttons: Extra JSX Slot
// ButtonContainer: For Setting Component type dynamically with default value.
export default function Tabs({children, buttons, ButtonsContainer = 'menu'}) {
    return (
        <>
            <ButtonsContainer>{buttons}</ButtonsContainer>
            {children}
        </>
    );
}