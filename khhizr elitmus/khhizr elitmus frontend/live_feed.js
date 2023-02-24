// Get the user's information from localStorage
const name = localStorage.getItem('name');
const email = localStorage.getItem('email');
const id = localStorage.getItem('id');

const nameElement = document.getElementById('name');
nameElement.textContent = name;
const videoContainer = document.getElementById('video-container');


const videoElement = document.createElement('video');
videoElement.autoplay = true;
videoElement.muted = true;

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Request permission to use the camera and microphone
    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        })
        .then(function (stream) {
            
            console.log('Camera and microphone are available.');

            stream.getTracks().forEach(function (track) {
                track.stop();

                // Get the user's webcam and display the live feed on the page
                navigator.mediaDevices.getUserMedia({
                        video: true,
                        audio: true
                    })
                    .then(stream => {
                        videoElement.srcObject = stream;
                        videoContainer.appendChild(videoElement);

                        // Send user's photo and details to backend server every 3 minutes
                        setInterval(function () {
                            // Capture a screenshot from the video stream
                            const canvas = document.createElement('canvas');
                            canvas.width = videoElement.videoWidth;
                            canvas.height = videoElement.videoHeight;
                            canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                            const screenshot = canvas.toDataURL();

                            // Send the data to the backend server
                            const data = {
                                name,
                                email,
                                id,
                                screenshot
                            };
                            console.log(data);
                            fetch('http://localhost:3000/user/add', {
                                    method: 'POST',
                                    body: JSON.stringify(data),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                })
                                .then(response => {
                                    console.log(response);
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                        }, 180000); 
                    })
                    .catch(error => {
                        console.log(error);
                    });
            });
        })
        .catch(function (error) {
            console.error('Camera and microphone are not available:', error);
        });
} else {
    console.error('getUserMedia is not supported by this browser.');
}