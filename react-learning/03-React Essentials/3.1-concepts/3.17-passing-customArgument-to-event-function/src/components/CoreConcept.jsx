
// Way 1: Reading each attribute via props
export default function CoreConcept(props) {
    return (
        <li>
            <img src={props.image} alt={props.title} />
            <h3>{props.title}</h3>
            <p>{props.description}</p>
        </li>
    );
}

// Way 2: Reading each attribute via concept object (REST Op) - Any no. of attributes we can read
function CoreConcept2({...concept}) {
    return (
        <li>
            <img src={concept.image} alt={concept.title} />
            <h3>{concept.title}</h3>
            <p>{concept.description}</p>
        </li>
    );
}

// Way 3: Destructuring the props into each attribute (Same name as passed in prop from Custom Component)
// Useful in case of default Props
function CoreConcept3({image, title, description}) {
    return (
        <li>
            <img src={image} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
        </li>
    );
}


// Way 4: Reading each attribute via Concept object (passed as Object in Custom Component)
//         e.g., <CoreConcept concept={CORE_CONCEPT[0]} />
function CoreConcept4({concept}) {
    return (
        <li>
            <img src={concept.image} alt={concept.title} />
            <h3>{concept.title}</h3>
            <p>{concept.description}</p>
        </li>
    );
}