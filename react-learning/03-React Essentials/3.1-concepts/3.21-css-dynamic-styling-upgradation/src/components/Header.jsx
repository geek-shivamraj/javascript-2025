import reactImg from '../assets/react-core-concepts.png';

const reactDescription = ['Fundamental', 'Crucial', 'Core'];

function generateRandomInt() {
    const max = reactDescription.length;
    return Math.floor(Math.random() * (max + 1));
}

export default function Header() {
    // It's better practice to pull the dynamic content expression out of JSX code & store it in a variable/const & use that reference.
    const description = reactDescription[generateRandomInt()];
    return (
        <header>
            <img src={reactImg} alt="Stylized atom" />
            <h1>React Essentials</h1>
            <p>
                {/*{reactDescription[generateRandomInt()]}*/}
                {description} React concepts you will need for almost any app you are going to build!
            </p>
        </header>
    );
}