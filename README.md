# 18-Social-Network-API

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
        
## Description
            
This project is an API for a social network web application where users can share their thoughts, react to friends’ thoughts, and create a friend list. It uses Express.js for routing, a MongoDB database, and the Mongoose ODM (object data modeling).

I built this application as a simple way for users to interact by sharing thoughts, adding reactions to thoughts and adding or removing friends in a simulated 'social media' environment. 

By completing this project, I've expanded my capabilities in using the MongoDB document-oriented database framework and better understand the use cases for a 'NoSQL' product.

### Video walkthrough showing application functionality:

To view a video walkthrough of how to seed some user data, run the server and access the data via its API routes using Insomnia, watch [a video demonstration here](https://drive.google.com/file/d/1OnQCVO41VEYPSUiV6ilflCNClgGyriBd/view?usp=sharing). 

Full link: https://drive.google.com/file/d/1OnQCVO41VEYPSUiV6ilflCNClgGyriBd/view?usp=sharing


### Screenshots of using the application's API routes to manage data:

The screenshots below show the application's API routes being called in Insomnia to return specific data.  

- GET route to display all users:
![Screenshot of application's API routes tested in Insomnia - GET route to display all users](./Assets/18-Challenge_GET-route-all-users.png)

- POST route to add a friend for a user:
![Screenshot of application's API routes tested in Insomnia - POST route to add a friend for a user](./Assets/18-Challenge_POST-route-adding-friend.png)

- POST route to add a reaction to a thought:
![Screenshot of application's API routes tested in Insomnia - POST route to add a reaction to a thought](./Assets/18-Challenge_POST-route-reaction-to-thought.png)

To understand how all routes work, watch the full video walkthrough linked above or [here](https://drive.google.com/file/d/1OnQCVO41VEYPSUiV6ilflCNClgGyriBd/view?usp=sharing). 
            
## Table of Contents
            
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)
            
## Installation

To install this application, you'll need to clone the repository to your local machine. [Refer to this guide from GitHub if you need help.](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository/)

Once cloned, you will need to navigate to the project's folder in your terminal and run the following command to install the necessary dependencies: `npm install`.

Next, you will need MongoDB installed on your computer to initialise the database. [Visit MongoDB's website for links to download and installation instructions.](https://www.mongodb.com/)

Lastly, you'll also need to install the API client Insomnia, which you can do by [visiting their website here](https://insomnia.rest/). 

            
## Usage

Once all of the steps in [Installation](#installation) have been completed, you can optionally seed the database by entering: `node utils/seed.js`. Then to start the server, enter: `node index.js`

If everything was installed and run correctly, you should be able to test the API routes using Insomnia now. Check the [walkthrough video here to see how you can view, add, update or delete data using these routes.](https://drive.google.com/file/d/1OnQCVO41VEYPSUiV6ilflCNClgGyriBd/view?usp=sharing)
            
## License
            
MIT License

Copyright (c) 2024 isaacfallon
            
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
            
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
            
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
            
## Contributing

To correctly format the date for thoughts and reactions, I referenced the following Stack Overflow answers.

- [How to format a Date in MM/dd/yyyy HH:mm:ss format in JavaScript?](https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript) The answer referenced in this project was provided by user [Kooilnc](https://stackoverflow.com/users/58186/kooiinc).

- [How do you display JavaScript datetime in 12 hour AM/PM format?](https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format) The answer referenced in this project was provided by user [Abhay Kumar](https://stackoverflow.com/users/3837522/abhay-kumar).

Combining these two answers results in the date formatting found in this project's 'Reaction' and 'Thought' models as a getter function:

![Getter function codeblock showing how the date is formatted in the 'Reaction' and 'Thought' models](./Assets/18-Challenge_Getter-function-to-format-date.png)
            
## Tests

N/A
     
## Questions
            
If you have any questions, please reach out at either of the following:
            
### GitHub profile:
- https://github.com/isaacfallon

### Email:
- isaac.fallon@gmail.com
