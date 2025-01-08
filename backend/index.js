const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const developerRoutes = require('./routes/developerRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const jobBoardRoutes = require('./routes/jobBoardRoutes');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const jobBoard = require('./models/JobBoard');
const userModel = require('./models/userModel');


dotenv.config();

// Middlewares
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', developerRoutes);
app.use('/api', resourceRoutes);
app.use("/api/jobboards", jobBoardRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Seed the database with dummy data
const generatePassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

const seedDatabase = async () => {
  try {
    // Clear existing users
    await User.deleteMany();
    await project.deleteMany();
    await jobBoard.deleteMany();
    console.log('Existing users, projects and job boards are cleared.');;

    // Realistic user data related to MERN stack development
    const dummyUsers = [
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@dev.com',
        password: await generatePassword('Password123'),
        phone: '9876543210',
        skillsets: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js'],
        experience: 5,
        previousWorks: [
          { title: 'E-commerce Website', description: 'Built a scalable e-commerce platform.', technologiesUsed: ['React', 'Node.js', 'MongoDB', 'Express.js'] },
          { title: 'Blog Platform', description: 'Developed a full-stack blog site.', technologiesUsed: ['React', 'Express.js', 'MongoDB'] }
        ],
        github: 'https://github.com/alicejohnson',
        portfolio: 'https://alicejohnson.dev',
        linkedin: 'https://linkedin.com/in/alicejohnson',
        leetcode: 'https://leetcode.com/alicejohnson',
        hackerrank: 'https://hackerrank.com/alicejohnson',
        phoneVisibility: true,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Bob Smith',
        email: 'bob.smith@dev.com',
        password: await generatePassword('Password456'),
        phone: '9876543211',
        skillsets: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        experience: 4,
        previousWorks: [
          { title: 'Social Media App', description: 'Built a full-stack social media platform.', technologiesUsed: ['React', 'Node.js', 'MongoDB', 'Express.js'] },
        ],
        github: 'https://github.com/bobsmith',
        portfolio: 'https://bobsmith.dev',
        linkedin: 'https://linkedin.com/in/bobsmith',
        leetcode: 'https://leetcode.com/bobsmith',
        hackerrank: 'https://hackerrank.com/bobsmith',
        phoneVisibility: true,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Charlie Lee',
        email: 'charlie.lee@dev.com',
        password: await generatePassword('Password789'),
        phone: '9876543212',
        skillsets: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        experience: 3,
        previousWorks: [
          { title: 'Task Manager', description: 'Developed a task management app with full authentication.', technologiesUsed: ['React', 'Node.js', 'MongoDB'] },
        ],
        github: 'https://github.com/charlielee',
        portfolio: 'https://charlielee.dev',
        linkedin: 'https://linkedin.com/in/charlielee',
        leetcode: 'https://leetcode.com/charlielee',
        hackerrank: 'https://hackerrank.com/charlielee',
        phoneVisibility: true,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'David Brown',
        email: 'david.brown@dev.com',
        password: await generatePassword('Password101'),
        phone: '9876543213',
        skillsets: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js'],
        experience: 6,
        previousWorks: [
          { title: 'Portfolio Website', description: 'Built a personal portfolio website.', technologiesUsed: ['React', 'Node.js', 'MongoDB'] },
          { title: 'Movie Database', description: 'Created a movie database app with filtering features.', technologiesUsed: ['React', 'Node.js', 'MongoDB', 'Express.js'] }
        ],
        github: 'https://github.com/davidbrown',
        portfolio: 'https://davidbrown.dev',
        linkedin: 'https://linkedin.com/in/davidbrown',
        leetcode: 'https://leetcode.com/davidbrown',
        hackerrank: 'https://hackerrank.com/davidbrown',
        phoneVisibility: true,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Eva Green',
        email: 'eva.green@dev.com',
        password: await generatePassword('Password102'),
        phone: '9876543214',
        skillsets: ['JavaScript', 'React', 'Node.js', 'Express.js'],
        experience: 2,
        previousWorks: [
          { title: 'Weather App', description: 'Developed a weather app using OpenWeather API.', technologiesUsed: ['React', 'Node.js', 'Express.js'] },
        ],
        github: 'https://github.com/evagreen',
        portfolio: 'https://evagreen.dev',
        linkedin: 'https://linkedin.com/in/evagreen',
        leetcode: 'https://leetcode.com/evagreen',
        hackerrank: 'https://hackerrank.com/evagreen',
        phoneVisibility: false,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Frank White',
        email: 'frank.white@dev.com',
        password: await generatePassword('Password103'),
        phone: '9876543215',
        skillsets: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        experience: 5,
        previousWorks: [
          { title: 'Online Store', description: 'Created an online store with payment integration.', technologiesUsed: ['React', 'Node.js', 'MongoDB'] },
        ],
        github: 'https://github.com/frankwhite',
        portfolio: 'https://frankwhite.dev',
        linkedin: 'https://linkedin.com/in/frankwhite',
        leetcode: 'https://leetcode.com/frankwhite',
        hackerrank: 'https://hackerrank.com/frankwhite',
        phoneVisibility: true,
        emailVisibility: false,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Grace Adams',
        email: 'grace.adams@dev.com',
        password: await generatePassword('Password104'),
        phone: '9876543216',
        skillsets: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express.js'],
        experience: 4,
        previousWorks: [
          { title: 'Blogging Platform', description: 'Built a blogging platform with user authentication.', technologiesUsed: ['React', 'Node.js', 'MongoDB', 'Express.js'] },
        ],
        github: 'https://github.com/graceadams',
        portfolio: 'https://graceadams.dev',
        linkedin: 'https://linkedin.com/in/graceadams',
        leetcode: 'https://leetcode.com/graceadams',
        hackerrank: 'https://hackerrank.com/graceadams',
        phoneVisibility: false,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Henry Clark',
        email: 'henry.clark@dev.com',
        password: await generatePassword('Password105'),
        phone: '9876543217',
        skillsets: ['JavaScript', 'React', 'Node.js', 'Express.js'],
        experience: 3,
        previousWorks: [
          { title: 'Task Tracker', description: 'Developed a task tracker app with real-time updates.', technologiesUsed: ['React', 'Node.js', 'Express.js'] },
        ],
        github: 'https://github.com/henryclark',
        portfolio: 'https://henryclark.dev',
        linkedin: 'https://linkedin.com/in/henryclark',
        leetcode: 'https://leetcode.com/henryclark',
        hackerrank: 'https://hackerrank.com/henryclark',
        phoneVisibility: true,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Ivy Scott',
        email: 'ivy.scott@dev.com',
        password: await generatePassword('Password106'),
        phone: '9876543218',
        skillsets: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
        experience: 4,
        previousWorks: [
          { title: 'Real-time Chat App', description: 'Built a real-time chat app using WebSockets.', technologiesUsed: ['React', 'Node.js', 'MongoDB'] },
        ],
        github: 'https://github.com/ivyscott',
        portfolio: 'https://ivyscott.dev',
        linkedin: 'https://linkedin.com/in/ivyscott',
        leetcode: 'https://leetcode.com/ivyscott',
        hackerrank: 'https://hackerrank.com/ivyscott',
        phoneVisibility: false,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: await generatePassword('John123'),
        phone: '9876543210',
        skillsets: ['JavaScript', 'React', 'Node.js'],
        experience: 5,
        previousWorks: [
          { title: 'E-Commerce Website', description: 'A fully functional e-commerce platform built using MERN stack.', technologiesUsed: ['React', 'Node.js', 'MongoDB'] },
          { title: 'Portfolio Website', description: 'A personal portfolio website to showcase projects.', technologiesUsed: ['HTML', 'CSS', 'JavaScript'] }
        ],
        github: 'https://github.com/johndoe',
        portfolio: 'https://johndoe.dev',
        linkedin: 'https://linkedin.com/in/johndoe',
        leetcode: 'https://leetcode.com/johndoe',
        hackerrank: 'https://hackerrank.com/johndoe',
        phoneVisibility: true,
        emailVisibility: false,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Alice Smith',
        email: 'alice.smith@example.com',
        password: await generatePassword('Alice123'),
        phone: '9876543211',
        skillsets: ['Python', 'Django', 'Machine Learning'],
        experience: 4,
        previousWorks: [
          { title: 'AI-Based Chatbot', description: 'A chatbot for customer service built using Python and AI.', technologiesUsed: ['Python', 'TensorFlow', 'Django'] },
          { title: 'Image Classifier', description: 'A deep learning model to classify images.', technologiesUsed: ['Python', 'Keras', 'TensorFlow'] }
        ],
        github: 'https://github.com/alicesmith',
        portfolio: 'https://alicesmith.dev',
        linkedin: 'https://linkedin.com/in/alicesmith',
        leetcode: 'https://leetcode.com/alicesmith',
        hackerrank: 'https://hackerrank.com/alicesmith',
        phoneVisibility: false,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Charlie Brown',
        email: 'charlie.brown@example.com',
        password: await generatePassword('Charlie123'),
        phone: '9876543212',
        skillsets: ['Java', 'Spring Boot', 'MySQL'],
        experience: 6,
        previousWorks: [
          { title: 'Banking System', description: 'A banking management system with Spring Boot backend.', technologiesUsed: ['Java', 'Spring Boot', 'MySQL'] },
          { title: 'Inventory Management', description: 'A system to manage inventory using Java and MySQL.', technologiesUsed: ['Java', 'Spring Boot', 'MySQL'] }
        ],
        github: 'https://github.com/charliebrown',
        portfolio: 'https://charliebrown.dev',
        linkedin: 'https://linkedin.com/in/charliebrown',
        leetcode: 'https://leetcode.com/charliebrown',
        hackerrank: 'https://hackerrank.com/charliebrown',
        phoneVisibility: true,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Emma Davis',
        email: 'emma.davis@example.com',
        password: await generatePassword('Emma123'),
        phone: '9876543213',
        skillsets: ['Ruby', 'Rails', 'PostgreSQL'],
        experience: 3,
        previousWorks: [
          { title: 'Blog Platform', description: 'A blogging platform built with Ruby on Rails.', technologiesUsed: ['Ruby', 'Rails', 'PostgreSQL'] },
          { title: 'Task Manager', description: 'A task management app using Ruby on Rails.', technologiesUsed: ['Ruby', 'Rails', 'PostgreSQL'] }
        ],
        github: 'https://github.com/emmadavis',
        portfolio: 'https://emmadavis.dev',
        linkedin: 'https://linkedin.com/in/emmadavis',
        leetcode: 'https://leetcode.com/emmadavis',
        hackerrank: 'https://hackerrank.com/emmadavis',
        phoneVisibility: false,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'David Johnson',
        email: 'david.johnson@example.com',
        password: await generatePassword('David123'),
        phone: '9876543214',
        skillsets: ['PHP', 'Laravel', 'MySQL'],
        experience: 7,
        previousWorks: [
          { title: 'Content Management System', description: 'A CMS built with Laravel.', technologiesUsed: ['PHP', 'Laravel', 'MySQL'] },
          { title: 'Real Estate Website', description: 'A real estate website with property listings.', technologiesUsed: ['PHP', 'Laravel', 'MySQL'] }
        ],
        github: 'https://github.com/davidjohnson',
        portfolio: 'https://davidjohnson.dev',
        linkedin: 'https://linkedin.com/in/davidjohnson',
        leetcode: 'https://leetcode.com/davidjohnson',
        hackerrank: 'https://hackerrank.com/davidjohnson',
        phoneVisibility: true,
        emailVisibility: false,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Olivia Lee',
        email: 'olivia.lee@example.com',
        password: await generatePassword('Olivia123'),
        phone: '9876543215',
        skillsets: ['Vue.js', 'Nuxt.js', 'GraphQL'],
        experience: 4,
        previousWorks: [
          { title: 'E-Commerce Platform', description: 'A Vue.js-based e-commerce platform.', technologiesUsed: ['Vue.js', 'GraphQL', 'Nuxt.js'] },
          { title: 'Blog Website', description: 'A personal blog built using Vue.js and GraphQL.', technologiesUsed: ['Vue.js', 'GraphQL'] }
        ],
        github: 'https://github.com/olivialee',
        portfolio: 'https://olivialee.dev',
        linkedin: 'https://linkedin.com/in/olivialee',
        leetcode: 'https://leetcode.com/olivialee',
        hackerrank: 'https://hackerrank.com/olivialee',
        phoneVisibility: false,
        emailVisibility: true,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Michael Harris',
        email: 'michael.harris@example.com',
        password: await generatePassword('Michael123'),
        phone: '9876543216',
        skillsets: ['Swift', 'iOS Development'],
        experience: 6,
        previousWorks: [
          { title: 'Weather App', description: 'A weather app built with Swift for iOS.', technologiesUsed: ['Swift', 'iOS'] },
          { title: 'Task Organizer', description: 'An iOS app for organizing tasks.', technologiesUsed: ['Swift', 'iOS'] }
        ],
        github: 'https://github.com/michaelharris',
        portfolio: 'https://michaelharris.dev',
        linkedin: 'https://linkedin.com/in/michaelharris',
        leetcode: 'https://leetcode.com/michaelharris',
        hackerrank: 'https://hackerrank.com/michaelharris',
        phoneVisibility: true,
        emailVisibility: false,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'Sophia Wilson',
        email: 'sophia.wilson@example.com',
        password: await generatePassword('Sophia123'),
        phone: '9876543217',
        skillsets: ['Go', 'Gin Framework', 'Docker'],
        experience: 8,
        previousWorks: [
          { title: 'API for Social Media', description: 'A backend API for a social media platform built with Go.', technologiesUsed: ['Go', 'Gin Framework'] },
          { title: 'Microservices', description: 'A series of microservices deployed with Docker containers.', technologiesUsed: ['Go', 'Docker'] }
        ],
        github: 'https://github.com/sophiawilson',
        portfolio: 'https://sophiawilson.dev',
        linkedin: 'https://linkedin.com/in/sophiawilson',
        leetcode: 'https://leetcode.com/sophiawilson',
        hackerrank: 'https://hackerrank.com/sophiawilson',
        phoneVisibility: false,
        emailVisibility: false,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      {
        name: 'James Taylor',
        email: 'james.taylor@example.com',
        password: await generatePassword('James123'),
        phone: '9876543218',
        skillsets: ['C#', 'ASP.NET Core', 'SQL Server'],
        experience: 5,
        previousWorks: [
          { title: 'Business Management System', description: 'A system for managing business operations.', technologiesUsed: ['C#', 'ASP.NET Core', 'SQL Server'] },
          { title: 'E-Commerce Backend', description: 'Backend of an e-commerce platform built with ASP.NET Core.', technologiesUsed: ['C#', 'ASP.NET Core', 'SQL Server'] }
        ],
        github: 'https://github.com/jamestaylor',
        portfolio: 'https://jamestaylor.dev',
        linkedin: 'https://linkedin.com/in/jamestaylor',
        leetcode: 'https://leetcode.com/jamestaylor',
        hackerrank: 'https://hackerrank.com/jamestaylor',
        phoneVisibility: true,
        emailVisibility: false,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      }
    ];

    // Insert dummy users into the database
    await User.insertMany(dummyUsers);
    console.log('Dummy users added to the database.');

    const userModel = await User.find();

    const jobBoards = [
      {
        name: "LinkedIn",
        logoUrl: "./images/image17.webp",
        description: "LinkedIn is a social network for professionals to connect, share, and find job opportunities.",
        link: "https://www.linkedin.com/jobs",
        reasonToTry: "Access to a large pool of job listings and the ability to network with professionals."
      },
      {
        name: "Indeed",
        logoUrl: "./images/image18.webp",
        description: "Indeed is one of the largest job search engines where users can apply to jobs, read reviews, and learn about companies.",
        link: "https://www.indeed.com",
        reasonToTry: "Thousands of job listings across all industries and job types."
      },
      {
        name: "Glassdoor",
        logoUrl: "./images/image19.webp",
        description: "Glassdoor is a platform for researching companies, reading reviews, and finding job opportunities.",
        link: "https://www.glassdoor.com/Job/index.htm",
        reasonToTry: "Find company reviews, salary information, and job opportunities from trusted sources."
      },
      {
        name: "Monster",
        logoUrl: "./images/image20.webp",
        description: "Monster is a job search engine where users can find job postings, upload resumes, and apply to jobs.",
        link: "https://www.monster.com",
        reasonToTry: "A comprehensive job portal with resume building and career resources."
      },
      {
        name: "SimplyHired",
        logoUrl: "./images/image21.jpg",
        description: "SimplyHired is a job search engine that aggregates job listings from across the web.",
        link: "https://www.simplyhired.com",
        reasonToTry: "Aggregates job listings from multiple sources and industries for a wide variety of positions."
      },
      {
        name: "AngelList",
        logoUrl: "./images/image22.webp",
        description: "AngelList is a platform for startup jobs, allowing professionals to apply to early-stage companies and explore investment opportunities.",
        link: "https://angel.co/jobs",
        reasonToTry: "Explore job opportunities at high-growth startups and innovative companies."
      },
      {
        name: "CareerBuilder",
        logoUrl: "./images/image23.webp",
        description: "CareerBuilder provides job listings, resume posting, and career resources, helping job seekers connect with potential employers.",
        link: "https://www.careerbuilder.com",
        reasonToTry: "Large job listings and useful resources to help you find your next career opportunity."
      },
      {
        name: "ZipRecruiter",
        logoUrl: "./images/image24.webp",
        description: "ZipRecruiter is a job search site that helps companies find candidates and job seekers find their dream roles.",
        link: "https://www.ziprecruiter.com",
        reasonToTry: "It helps connect job seekers with job opportunities in various industries using AI-powered job matching."
      },
      {
        name: "We Work Remotely",
        logoUrl: "./images/image25.webp",
        description: "We Work Remotely is a job board that specializes in remote job opportunities across multiple fields.",
        link: "https://weworkremotely.com",
        reasonToTry: "Find fully remote jobs in areas like software development, marketing, and design."
      },
      {
        name: "FlexJobs",
        logoUrl: "./images/image26.webp",
        description: "FlexJobs is a platform offering remote, part-time, freelance, and flexible job listings.",
        link: "https://www.flexjobs.com",
        reasonToTry: "Access to curated job listings focused on flexible and remote work opportunities."
      },
      {
        name: "Hired",
        logoUrl: "./images/image27.png",
        description: "Hired is a marketplace for tech talent where job seekers can find job opportunities by setting their preferences and being contacted by employers.",
        link: "https://hired.com",
        reasonToTry: "Tech job seekers can be contacted directly by employers through a personalized job marketplace."
      },
      {
        name: "Jobvite",
        logoUrl: "./images/image28.webp",
        description: "Jobvite is an online recruitment platform that streamlines hiring with tools for applicants, job seekers, and employers.",
        link: "https://www.jobvite.com",
        reasonToTry: "A comprehensive recruitment platform that enhances hiring with its innovative software tools."
      },
      {
        name: "Jobs2Careers",
        logoUrl: "./images/image29.webp",
        description: "Jobs2Careers is a job search engine that connects job seekers with jobs posted by employers and staffing agencies.",
        link: "https://www.jobs2careers.com",
        reasonToTry: "Find job opportunities directly from employers and staffing agencies."
      },
      {
        name: "Scouted",
        logoUrl: "./images/image30.webp",
        description: "Scouted is a recruiting platform that helps match job seekers with companies based on their skills and potential.",
        link: "https://www.scouted.io",
        reasonToTry: "Leverages personality and skills matching to help job seekers find opportunities in various fields."
      },
      {
        name: "Snagajob",
        logoUrl: "./images/image31.webp",
        description: "Snagajob is a job board that specializes in hourly and part-time job opportunities.",
        link: "https://www.snagajob.com",
        reasonToTry: "Aimed at hourly and part-time jobs across industries like retail, hospitality, and more."
      },
      {
        name: "The Muse",
        logoUrl: "./images/image32.webp",
        description: "The Muse offers job listings, career advice, and a glimpse into company cultures.",
        link: "https://www.themuse.com",
        reasonToTry: "Get insight into company cultures, job listings, and career advice to help you thrive."
      },
      {
        name: "Upwork",
        logoUrl: "./images/image34.webp",
        description: "Upwork is a freelancing platform that connects professionals with clients for freelance work in various fields.",
        link: "https://www.upwork.com",
        reasonToTry: "Find freelance projects across a wide range of industries and fields, from tech to creative."
      }
    ];
    

    await jobBoard.insertMany(jobBoards);
    console.log('Dummy job boards created.');
    } catch (error) {
    console.error('Error seeding database:', error);
    }
};

seedDatabase();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
