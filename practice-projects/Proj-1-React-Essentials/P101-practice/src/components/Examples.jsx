import TabButton from "./TabButton.jsx";
import {useState} from "react";
import {EXAMPLES} from "../data/data.js";
import Section from "./Section.jsx";
import Tabs from "./Tabs.jsx";

// Task 10: Extract the Examples as separate component.
export default function Examples() {

    // Task 7: Managing state using useState() hook
    const [selectedTab, setSelectedTab] = useState();

    // Task 7: Event Handler function. Also state update
    const handleSelectedTab = (selectedTab) => {
        setSelectedTab(selectedTab);
    }

    // Task 7: Reading the Examples based on the selected tab value2
    let tabContent = <p>Please select a topic.</p>;
    if(selectedTab) {
        tabContent = (
            <div id="tab-content">
                <h3>{EXAMPLES[selectedTab].title}</h3>
                <p>{EXAMPLES[selectedTab].description}</p>
                <pre>
                    <code>{EXAMPLES[selectedTab].code}</code>
                </pre>
            </div>
        );
    }

    return (
        // Task 5: Add a new section "examples" with title, menu & paragraph
        // Task 11: Adding <Section> component
        <Section id="examples" title="Examples">
            {/* Task 12: Use <Tabs> Component */}
            <Tabs
                // ButtonsContainer = 'menu'
                buttons={
                    // Task 7: On each Tab button clicked, specific Tab data will be displayed
                    // Task 8: Highlight the tab button via isSelected prop
                    <>
                        <TabButton isSelected={selectedTab === 'components'}
                            onSelect={() => handleSelectedTab('components')}>Components
                        </TabButton>
                        <TabButton isSelected={selectedTab === 'jsx'}
                            onSelect={() => handleSelectedTab('jsx')}>JSX
                        </TabButton>
                        <TabButton isSelected={selectedTab === 'props'}
                            onSelect={() => handleSelectedTab('props')}>Props
                        </TabButton>
                        <TabButton isSelected={selectedTab === 'state'}
                            onSelect={() => handleSelectedTab('state')}>State
                        </TabButton>
                    </>}>
                {tabContent}
            </Tabs>
        </Section>
    );
}