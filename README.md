# MyInterviewApp
MyInterviewApp is a frontend application designed for AI-based interview platforms. It replicates the functionality and flow of an interactive interview process, including features such as video/audio recording, screen sharing, and test completion.  This project was developed as using Next.js and modern UI frameworks.


Table of Contents
Features
Demo
Technologies Used
Setup and Installation
Usage
Functionalities Implemented
Project Structure
Future Enhancements
Contributing
License


Features
Responsive Interface: Mobile and desktop friendly.
Media Integration: Audio and video recording using browser APIs.
Screen Sharing: Implemented via navigator.mediaDevices.getDisplayMedia().
Dynamic Question Flow: Seamless question and answer transitions.
Test Completion Feedback: Provides clear completion status.
Easy-to-use UI for scheduling and managing interviews.
Integration with APIs to fetch candidate and interviewer data.

Demo
Live Demo Link
Replace this with your hosted link after deployment.

Technologies Used
Frontend Framework: Next.js
UI Frameworks: ShadCN UI, TailwindCSS
Programming Language: TypeScript
Media APIs:
navigator.mediaDevices.getUserMedia() for audio/video.
navigator.mediaDevices.getDisplayMedia() for screen sharing.



Setup and Installation
Follow these steps to set up the project locally:

Clone the Repository
git clone https://github.com/sunitachoudhary0280/myinterviewapp.git

Navigate to the Project Directory
cd myinterviewapp


Install Dependencies
npm install
Run the Development Server
npm run dev

Open the application in your browser at http://localhost:3000.


Usage
Visit the application link.

Follow these steps:
Instruction Screen: Familiarize yourself with the test requirements.
Permission Check: Allow access to audio, video, and screen sharing.
Question Screen: Listen to audio questions and record video responses.
Test Completion: Submit your answers and receive feedback.
Use the loader and completion screens to enhance the user experience.
Functionalities Implemented
Instruction Screen: Provides a clear introduction to the interview process.
Check Permissions Screen:
Uses navigator.mediaDevices.getUserMedia() for audio/video access.
Implements navigator.mediaDevices.getDisplayMedia() for screen sharing.
Question Screen: Plays question audio dynamically.
Answer Recording Screen:Records video answers.
Sends audio/video chunks via API.
Loader and Completion Screens: Provides feedback during and after the test.


Project Structure
myinterviewapp/
├── components/        # Reusable UI components
├── pages/             # Application pages 
├── styles/            # Tailwind and global styles
├── utils/             # Helper functions
├── public/            # Static assets
├── package.json       # Dependencies and scripts
├── README.md          # Project documentation


Future Enhancements
Enhanced UI/UX:Better animations for transitions between screens.
Custom themes and styling options.

Performance Optimization:Reduce latency in audio/video processing.Optimize API calls for better response times.
Advanced Features:Integrate real-time feedback during the interview.Provide analytics for submitted answers.

Contributing
We welcome contributions! To contribute:

Fork the repository.
Create a feature branch:
git checkout -b feature-name
Commit your changes and push the branch:git push origin feature-name
Submit a pull request for review.



License
This project is licensed under the MIT License. See the LICENSE file for details.


