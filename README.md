# TA Placement Software README (TAPS)

This React JS application was made to automatically assign Teacher Assistants to classes. Due to the security of each Teacher Assistants Data, this project was created with no back end at all to avoid having to contact a server. This means all the code that is a part of this project is done in strictly JavaScript. This detail was discussed greatly in the planning of this project and we were not able to find an effective way around it, so we believe this is best possible way to protect the student data.

All Code is contained in the src folder, below is a breief description of what each file does  
- AllClassesCSV.js: Handles user input file that has information about each class offered during the semester
- InClassNeccCSV.js: Handles user input file that has information about if a class requires a TA to be present in the class
- TAListCSV.js: Handles user input file that has each TA that is being considered for the semester
- AllTAsCSV.js: Handles user input file that has information about the previous and current schedules of all potential TAs
- CreateEligList.js: Takes in list of all classes that is being offered and all TAs eligible for the semester and creates a dictionary that contains each class. Each class then contains a dictionary of each TA that is eligible to teach that specific class
- FileInputs.js: This component handles the design of the landing page of the application
- Predeterminations.js: This component allows the user to assign specific TAs to a specific class if they want to before the algorithm is run.
- StableMarriage.js: This component actually contains the code of the algorithm itself to run.


# Input Files

Input files can be received from the client, we are not allowed to upload those files to this repo because of security concerns. Within the application there are pictures to display which file is needed to be uploaded where.

# Running Application

This application should be run out of the terminal like any other React Js application. Navigate to wherever you have the repo installed to and run "npm start". If this doesn't work for some reason, and you've confirmed that npm is installed on your machine, then go to the repo folder (if not already there), delete the "node_modules" folder, go to your terminal and run "npm install react-scripts", then try "npm start" again. If that doesn't work, then there's probably another issue going on that we don't know about.
  
# Ease of Development (for developers only)

The ".gitignore" file lists a file named "latest_commit.txt". By design, this file does not exist in the repo, but can be created wherever you installed this app, and will not be included in the online repo when pushing with git. Instead of remembering what you changed or added when running "git commit" and typing a message (or pasting your prepared message from another file into your terminal), you can track your development of the app in a human readable way as you're making them, and use the file to supply the "git commit" command with a message.

To be clear, you'll have to write directly in the file for this to work. The first line in the file is the title of the commit, and will appear in a header-like box when viewing the commit on GitHub. All other lines in the file are the commit body. You can format this any way that you'd like; it's up to you.

When you're about to commit, you can run "git commit -F latest_commit.txt" to use the contents of the "latest_commit.txt" file as the git commit message. This process is entirely optional, and has no implications on how the app runs. It's just for you :)