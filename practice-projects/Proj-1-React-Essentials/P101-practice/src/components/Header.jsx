// Task 3: Importing the image & adding it to src via {}
import reactImg from '../assets/react-core-concepts.png';

// Task 2: Dynamically loading the content.
const reactDescription = ['Fundamental', 'Crucial', 'Core'];

function generateRandomInt() {
    const max = reactDescription.length;
    return Math.floor(Math.random() * (max + 1));
}

// Task 1: Create Header component
export default function Header() {

    // Task 2: Dynamically loading the content.
    const description = reactDescription[generateRandomInt()];
    return (
        <header>
            <img src={reactImg} alt="Stylized atom" />
            {/*<img src="../src/assets/react-core-concepts.png" alt="Stylized atom" />*/}
            <h1>React Essentials</h1>
            <p>
                {description} React concepts you will need for almost any app you are
                going to build!
            </p>
        </header>
    );
}