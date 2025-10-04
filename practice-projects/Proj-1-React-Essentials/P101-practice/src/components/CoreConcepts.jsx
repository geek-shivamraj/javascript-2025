import CoreConcept from "./CoreConcept.jsx";
import {CORE_CONCEPTS} from "../data/data.js";
import Section from "./Section.jsx";

// Task 10: Extract the Core Concepts as separate component.
export default function CoreConcepts() {
    return (
        // Task 4: Read the CORE_CONCEPTS from data.js via map
        // Task 11: Adding <Section> component
        <Section id="core-concepts" title="Core Concepts">
            <ul>
                {CORE_CONCEPTS.map((conceptItem) => (
                    <CoreConcept key={conceptItem.title} {...conceptItem} />
                ))}
            </ul>
        </Section>
    );
}