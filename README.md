Step 1

Start the MySQL server
 

For this web app I am using a MySQL server hosted locally on my machine. This is to enable me to create a database using the data provided in the brief. 

Step 2

Start the node server by entering the command node index.js into the command line when in the root folder “first-holiday-chat-agent” of the application. This will allow the API to parse the data from the database to the local host URL http://localhost:3000/first-holiday-chat-agent in JSON format. 

You should see this confirmation message in the command line interface – “Example app listening at http://localhost:3000”

Step 3

If you haven’t done so already then download the Local development server extension below in VSCode:

Name: Live Server Id: ritwickdey.LiveServer
Description: Launch a development local Server with live reload feature for static & dynamic pages Version: 5.7.9
Publisher: Ritwick Dey
VS Marketplace Link: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

Once this extension has been downloaded to VSCode you can then click on “Go live” in the bottom right-hand corner of the VSCode window 
 


This will launch the web app in your default browser. 

Step 4

From here you can use the chatbot in your browser as you please. There will be a “write something…” prompt for you to start the interaction. The premise is built on the user saying “Hi” or “Hello” in which case the bot will respond with a question. This then prompts the user to click the “yes” button to view the filter form enabling the user to choose their destination more accurately. 
Chat agent
 

Once this button is clicked then the user can see the table below based on the results of the filter form submission. If left empty the filter form will produce the entire table of holiday packages. You can edit and re-submit the filter form as many times as you like to retrieve different results.  
Filter form
 

Step 5

View the data produced in table format. 


