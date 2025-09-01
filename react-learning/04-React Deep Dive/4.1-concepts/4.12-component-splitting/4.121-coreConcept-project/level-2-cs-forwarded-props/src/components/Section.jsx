/**
 *  Way 1: Destructuring each attribute/prop in Custom Component & getting the forward Props
 *   - Not Recommended as the app grows, the no. of props will grow as well. This is not scalable & convenient
 *
 *  Way 2: Forwarded Props / Proxy Props concept
 *   - By using REST Op to get all the forwarded props & using SPREAD Op to pass the props to built-in component in Custom Component.
 *   - Recommended as we can pass as many props as required.
 *   - Imp. Note: Props are not limited to attributes, we can pass function/events as well like onClick etc.
 */

// Way 1: Not Recommended (Use Smartly)
function Section1 ({title, children, id}) {
    return (
        <section id={id}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}

// Way 2: Recommended One
// Here we didn't include title in props, we can also do that, but it's not really needed.
export default function Section ({title, children, ...props}) {
    return (
        <section {...props}>
            <h2>{title}</h2>
            {children}
        </section>
    );
}