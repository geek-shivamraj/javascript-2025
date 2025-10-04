
// Task 11: Extract a new Component `<Section>` from `<CoreConcepts>` & `<Examples>` component to enforce the common structure (title & content)
export default function Section({title, children, ...props}) {
    return (
        // Forwarded props use case
        <section {...props}>
            <h2>Examples</h2>
            {children}
        </section>
    );
}