const works = {
    'beloved-joy': {
        'introTitle': 'Beloved Joy',
        'introSubtitle': "Web Design / Front - End Development - 2021",
        'technologies': ['Next.js', 'React.js', 'Shopify', 'Firebase', 'Mailchimp', 'Contentful', 'GSAP', 'Node.js', 'Cookies', 'Bootstrap', 'Swiper', 'Apollo GraphQL'],
        'credit': {
            'Design / Development': 'Shuto Suganuma'
        },
        'introOverview': [
            'Beloved Joy is a fully functional and interactive e-commerce shop.',
            `I've implemented various functions such as authentication, checkout, subscription and so on with the technologies above. You could test the whole e-commerce experience in this website, add/delete items in a cart, checkout, sign up / sign in and view order histories, subscribe, etc. You are welcome to visit the website and test the functionality. I hope you enjoy it.`
        ],
        'url': 'https://beloved-joy.vercel.app/',
        'execution1': {
            'title': 'Authentication',
            'overview': [
                'I have implemented Authentication process using Firebase Authentication. You can create an account / log in with your e-mail address and password. With cookies to store your access token, your login-in credentials are pretected and the website will remember you next time you visit it so that you are automatically logged in unless you choose to log-out when you leave the site.',
                'In the authenticated page, you can see / change your personal information as well as your password through firebase change-password process.',
                `In the authenticated orders page, you can look at your order history. If you go to the order detail page, you will see the details such as products details, shipping information and checkout details.
                I've created this process by using the information you have provided to log-in in order for me to refer to the order information in Shopify Storefront.`
            ]
        },
        'execution2': {
            'title': 'Parallax / Animation'
        },
        'execution3': {
            'title': 'Checkout / Shopping Cart / Filter',
            'overview': [
                `I have created Shopping Cart with Local Storage and Shopify Storefront API. With these two technolgies working together, I managed to implement a system to track inventory and store / retrieve the items in the cart. After you finish shopping, you can just press the checkout button and the website leads you to Shoppify checkout page.`,
                `In the filter page, I have implemented a full-text-search function with shopify GraphQL and  you can filter items by name. You can also filter items by category (ex, Top, Bottom, Sneakers and so on) in the collection pages.`,
            ]
        },
    },
    'shuto-portfolio': {
        'introTitle': 'Shuto Portfolio',
        'introSubtitle': "Web Design / Front - End Development - 2021",
        'technologies': ['Next.js', 'React.js', 'WebGL', 'Three.js', 'GSAP', 'Node.js', 'React Spring', 'Bootstrap', 'SASS', 'Contentful', 'Framer Motion', 'Swiper'],
        'credit': {
            'Design / Development': 'Shuto Suganuma'
        },
        'introOverview': [
            `I created this portfolio to show you my skill set and who 'Shuto Suganuma' is and the projects that I've worked on, and the goal that I would like to achive through this portfolio is that you get to know me before you reach me out and get motivated to work with me to achive your goals.`,
            `I'm pretty new in this field and still need to learn a lot of things, but I've put everything that I have and passion into this portfolio, I will appreciate if you take your time to take an in-depth look at the details and hope that you will enjoy it.`,
            `Again, thank you very much for visiting my portfolio and your time. Hope you're having a good time.`
        ],
        'url': 'https://shuto46490802.github.io/covid-19-tracker/',
        'execution1': {
            'title': 'Design',
            'overview': [
                `My goal for this portfolio in terms of design was minimal and retro design. I've aimed to achieve this goal by integrating grid and typography into the design and the frames that soround the contents and the grainy background are to make the page have the retro feeling.`,
                `My another goal on this project was to pay attention to the details. These might be too small for you to notice, but they will definitely help guide you through this portfolio. I've created a cursor that could work as navigation when it hovers over the contents that you will view/one-click to jump to contact page. I've also added a hover effect on texts and navigation so that it is easy for you to know that what contents you're hovering over.`,
                `One of my favorite details in this portfolio is the color palette. It's very small and simple, and you might almost not notice that it's there, but it's very fun to see this portfolio in defferent colors and just exciting to use.`
            ]
        },
        'execution2': {
            'title': 'WebGL / Animation'
        },
        'execution3': {
            'title': 'Color Palette',
            'overview': [
                `I have picked white for the background and 6 colors for this portfolio's color scheme. I found it a bit difficult to emphasize the important contents in this portfolio without using more than two colors at a time, but that helps this portfolio have the minimal and retro feeling and I managed to make up for it with other methods such as typography, animation and so on. I've also used the colors for the filter of the images so that an united feeling could be provided to the design.`
            ]
        },
    },
    'covid-19-tracker': {
        'introTitle': 'COVID-19 Tracker',
        'introSubtitle': "Web Design / Front - End Development - 2020",
        'technologies': ['React.js', 'Axios', 'REST API', 'Chart.js', 'Leaflet', 'SASS'],
        'credit': {
            'Design / Development': 'Shuto Suganuma'
        },
        'introOverview': [
            `As the number of cases of COVID-19 spike, I created a map that lets you track the coronavirus to help you understand the global situation concerning the COVID-19.`,
            `In this app, you can see a variety of different the most up-to-date cases of COVID-19 in different forms (charts, map and graph) and it's designed to be compatible with different devices (desktop, tablet and mobile) so that it is accessible anytime and anywhere on any devices.`,
            `The improvements that I'm looking to see is adding information about the global vaccine progress as well as the cases of COVID-19 variants.`
        ],
        'url': 'https://shuto46490802.github.io/covid-19-tracker/',
        'execution1': {
            'title': 'Database',
            'overview': [
                `I've implemented a system to collect the up-to-date information concerning COVID-19 from open source API database(mathdroid and ABOUT-CORONA.NET) using REST API and Axios and when the data is updated, the app will also be automatically updated.`,
                `I've created different charts for not only infected cases, deaths and recovered, but also for daily cases, cases in different regions and so on and you can select a country from 213 countries on the selector and see the status and the total cases in each country.`,
                `I collect data regarding the cumulative cases, active cases and incident rate from each country and visualize them in the three separate maps. The size of the circles on the map refers to the volume of the cases and the bigger the size of the circle is, the bigger the number of the cases are, so it's easy for you to see what region in the world is doing well or bad in terms for dealing with the coronavirus.`
            ]
        },
        'execution2': {
            'title': 'Maps / Charts'
        },
        'execution3': {
            'title': 'Responsive design',
            'overview': [
                `This app is designed to be responsive and compatible with desktop, tablet and mobile phone. On the desktop version, everything is packed in a screen and divided by category and you can expand/shrink the section by using the button on the right corner of the section.`,
                `On the tablet version, I aligned the sections vertically and the page scrollable so that the each section will be big enough for you to see the contents even on the small screen.`,
                `On the mobile version, I've only created one section, but you can change the section using the button on the bottom of the section and by pressing the button, popup nvigations come out and you can access the variety of information(infected cases, deaths, recover, daily/total cases and so on).`
            ]
        },
    }
}

export default works;