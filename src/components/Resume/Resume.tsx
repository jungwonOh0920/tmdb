import './resume.scss';

function Resume() {
    return (
        <div className='resume-container'>
            <div className='column1'>
                <h1>Jay Oh</h1>
                <h2 className='position'>Software Engineer</h2>
                <h4>Greater Seattle Area, WA</h4>
                <h4>U.S. Army Veteran</h4>
            </div>
            <div className='column2'>
                <p>(208) 206 - 1457</p>
                <p>jungwon.oh0920@gmail.com</p>
                <a href='https://portfolio-jungwonoh0920.vercel.app/' target='_blank'>portfolio-jungwonoh0920.vercel.app/</a>
                <br />
                <a href='https://www.linkedin.com/in/jayoh1/' target='_blank' rel="noopenner noreferrer">www.linkedin.com/in/jayoh1</a>
                <br />
                <a href='https://github.com/jungwonOh0920' target='_blank' rel="noopenner noreferrer">www.github.com/jungwonOh0920</a>
            </div>
            <div className='column1'>
                <h2>Work experiences</h2>
            </div>
            <div className='column2'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <h3>Front-end/UI Developer</h3>
                        <h4>Rainfocus</h4>
                    </div>
                    <div className='flex flex-row justify-between text-xs'>
                        <p>03/2022 - 01/2023</p>
                        <p>Lehi, UT (Remote)</p>
                    </div>
                    <ul className='description-list'>
                        <li>Coordinated with a team of UX and UI developers to build quality web applications with cross-browser compatibility.</li>
                        <li>Analyze existing web applications and identify opportunities to enhance functionality and improve the user experience.</li>
                        <li>Contributed the development of front-end systems using HTML, Typescript, and React, and Sass.</li>
                        <li>Created and maintained components stylings for the Rainfocus platform that users can apply their customized brandings.</li>
                        <li>Collaborated closely with UX/UI designers and product owners to develop user friendly products with consistency.</li>
                        <li>Worked on the Agile methodology and used Scrum in implementing projects.</li>
                        <li>Source code management and project tracking with the agile team in Git and JIRA.</li>
                    </ul>
                    <br />
                    <div className='flex flex-row justify-between'>
                        <h3>Front-end Engineer</h3>
                        <h4>Kanopy</h4>
                    </div>
                    <div className='flex flex-row justify-between text-xs'>
                        <p>06/2020 - 03/2022</p>
                        <p>Irvine, CA</p>
                    </div>
                    <ul className='description-list'>
                        <li>Frontend code reviews for browser compliance, troubleshooting and bug fixes.</li>
                        <li>Maintained high quality of components/pages with testing framework - jest.</li>
                        <li>Managed states through a single source of truth.</li>
                        <li>Developed in Vue.js ecosystem including Vue CLI, Vuex, Vue Router, and Nuxt.js.</li>
                        <li>Collaborated with project managers, UX/UI designers, and back-end engineers to build cross-browser compatible and accessibility compliant applications.</li>
                        <li>Produced multiple visual elements of web applications by translating UI/UX design.</li>
                    </ul>
                    <br />
                    <div className='flex flex-row justify-between'>
                        <h3>Software Engineer Intern</h3>
                        <h4>Overstock.com</h4>
                    </div>
                    <div className='flex flex-row justify-between text-xs'>
                        <p>04/2019 - 08/2019</p>
                        <p>Midvale, UT</p>
                    </div>
                    <ul className='description-list'>
                        <li>Created unit tests and implemented dependency injection for Android development.</li>
                        <li>Maintained version control using Git and sourcetree.</li>
                    </ul>
                </div>
            </div>
            <div className='column1'>
                <h2>Project</h2>
            </div>
            <div className='column2'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <h3>Video Streaming Site Clone Project</h3>
                    </div>
                    <div className='flex flex-row justify-between text-xs'>
                        <p>09/2022 - Present</p>
                        <a href='https://github.com/jungwonOh0920/tmdb' target='_blank' rel="noopenner noreferrer">Source code: github.com/jungwonOh0920/tmdb</a>
                    </div>
                    <ul className='description-list'>
                        <li>Utilizing and fetching The Movie Database API for contents.</li>
                        <li>Customized components with React.js, Sass, and TailwindCSS.</li>
                        <li>Using Firebase and Firestore for Authentication and database.</li>
                        <li>Maintaining with a  version control(Git).</li>
                    </ul>
                </div>
            </div>
            <div className='column1'>
                <h2>Education</h2>
            </div>
            <div className='column2'>
                <div className='flex flex-col'>
                    <div className='flex flex-row justify-between'>
                        <h3>B.S. in Software Engineering</h3>
                        <h4>Brigham Young University - Idaho</h4>
                    </div>
                    <div className='flex flex-row justify-between text-xs'>
                        <p>2014 - 2019</p>
                        <p>Resburg, ID</p>
                    </div>
                    <ul className='description-list'>
                        <li>GPA: 3.7</li>
                        <li>Served in Student Association Leadership.</li>
                        <li>Taught and guided students as a tutor in Math and OOP in Java and C++. </li>
                        <li>Data Structures, Algorithms and SQL.</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Resume