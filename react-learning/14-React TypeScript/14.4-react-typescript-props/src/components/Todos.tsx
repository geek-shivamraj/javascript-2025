/**
 *
 *  - If we simply use props without any explicit type declaration, we're getting warning
 *      - TS7006: Parameter props implicitly has an any type
 *      - i.e., we didn't assign a type to props object & therefore we don't get any TypeScript support.
 *      - We can configure TS such that it warns if we're implicitly using "any" type so that we explicitly declare type everywhere
 *          e.g., function Todos(props: any) {}
 *      - We can configure the strictness of TypeScript in tsconfig.json file.
 *
 *  - This is a little extra help we get into TypeScript project which we don't necessarily get in a Vanilla JS project.
 *
 *  - React.FC is a type defined in the @types/react package used with a function to declare/make it clear that
 *      this is a Functional Component (FC)
 *
 *  - Initially FC used to support children prop by default, but now we've to explicitly pass PropsWithChildren as Generic type
 *      to support children prop. E.g., FC<PropWithChildren> (There are some other solutions too)
 *
 *  - Here we're using a Generic type, before we defined one. It's generic type becoz different functional component have different props definitions.
 *      For e.g., FC<PropsWithChildren<{items: string[]}>>
 *
 */
import {FC, PropsWithChildren} from "react";

const Todos: FC<PropsWithChildren<{ items: string[] }>> = (props) => {
    return (
        <ul>
            {props.items.map(item => (
                <li key={item}>{item}</li>
            ))}
        </ul>
    );
}

export default Todos;

const Todos_4: FC<PropsWithChildren> = (props) => {
    return <ul>
        <li>{props.children}</li>
        <li>Learn React</li>
        <li>Learn TypeScript</li>
    </ul>
}

// export Todos_4;

export function Todos_3(props: { items: string[] }) {
    return <ul>
        <li>Learn React</li>
        <li>Learn TypeScript</li>
    </ul>
}

export function Todos_2(props: any) {
    return <ul>
        <li>Learn React</li>
        <li>Learn TypeScript</li>
    </ul>
}

// export function Todos_1(props) {
//     return <ul>
//         <li>Learn React</li>
//         <li>Learn TypeScript</li>
//     </ul>
// }