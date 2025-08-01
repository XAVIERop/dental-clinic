const chatbot = document.getElementById('chatbot');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotHeader = document.getElementById('chatbot-header');
const chatbotBody = document.getElementById('chatbot-body');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');

const quickRepliesContainer = document.createElement('div');
quickRepliesContainer.classList.add('px-4', 'py-2', 'bg-gray-100', 'border-t');
const quickRepliesButtons = [
    { text: 'Clinic Timings', response: 'Our clinic timings are: Monday-Saturday: 10 AM - 9 PM, Sunday: 10 AM - 2 PM, Emergency services available 24/7.' },
    { text: 'Services', response: 'We offer Dental Implants, Root Canal Treatment, Cosmetic Dentistry, Teeth Whitening, Orthodontics, and General Dentistry.' },
    { text: 'Pricing', response: 'Pricing varies by service. For example, dental implants range from ₹25,000 to ₹40,000. Please book a free consultation for exact estimates.' },
    { text: 'Book Appointment', response: 'Please fill the mini appointment form below to book an appointment.' },
    { text: 'Talk to Staff', response: 'For immediate assistance, please call our front desk at +91 99999 99999 or visit our contact page.' }
];

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('mb-4');
    
    if (isUser) {
        messageDiv.classList.add('flex', 'justify-end');
        messageDiv.innerHTML = `
            <div class="bg-blue-600 text-white rounded-lg p-3 max-w-xs">
                <p>${message}</p>
            </div>
        `;
    } else {
        messageDiv.innerHTML = `
            <div class="bg-blue-100 text-blue-800 rounded-lg p-3 max-w-xs">
                <p>${message}</p>
            </div>
        `;
    }
    
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function createQuickReplies() {
    quickRepliesButtons.forEach(buttonInfo => {
        const btn = document.createElement('button');
        btn.classList.add('quick-reply', 'bg-white', 'text-blue-800', 'px-3', 'py-1', 'rounded-full', 'text-sm', 'border', 'border-blue-200', 'hover:bg-blue-50', 'mr-2', 'mb-2');
        btn.textContent = buttonInfo.text;
        btn.addEventListener('click', () => {
            addMessage(buttonInfo.text, true);
            if (buttonInfo.text === 'Book Appointment') {
                showMiniAppointmentForm();
            } else {
                addMessage(buttonInfo.response);
            }
        });
        quickRepliesContainer.appendChild(btn);
    });
    chatbotBody.appendChild(quickRepliesContainer);
}

function showMiniAppointmentForm() {
    // Remove quick replies container
    quickRepliesContainer.remove();

    // Create mini form container
    const formContainer = document.createElement('div');
    formContainer.classList.add('p-4', 'bg-white', 'border-t');

    formContainer.innerHTML = `
        <form id="mini-appointment-form" class="space-y-4">
            <div>
                <label for="mini-name" class="block text-gray-700 font-medium mb-1">Name</label>
                <input type="text" id="mini-name" name="name" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
            </div>
            <div>
                <label for="mini-phone" class="block text-gray-700 font-medium mb-1">Phone</label>
                <input type="tel" id="mini-phone" name="phone" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
            </div>
            <div>
                <label for="mini-service" class="block text-gray-700 font-medium mb-1">Service</label>
                <select id="mini-service" name="service" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
                    <option value="">Select a service</option>
                    <option value="Dental Implants">Dental Implants</option>
                    <option value="Root Canal Treatment">Root Canal Treatment</option>
                    <option value="Cosmetic Dentistry">Cosmetic Dentistry</option>
                    <option value="Teeth Whitening">Teeth Whitening</option>
                    <option value="Orthodontics">Orthodontics</option>
                    <option value="General Dentistry">General Dentistry</option>
                    <option value="Consultation">Consultation</option>
                </select>
            </div>
            <div>
                <label for="mini-date" class="block text-gray-700 font-medium mb-1">Date</label>
                <input type="date" id="mini-date" name="date" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
            </div>
            <div>
                <label for="mini-time" class="block text-gray-700 font-medium mb-1">Time</label>
                <input type="time" id="mini-time" name="time" required class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500">
            </div>
            <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium">Submit</button>
        </form>
        <div id="mini-form-message" class="mt-2 text-center text-sm"></div>
    `;

    chatbotBody.appendChild(formContainer);

    const miniForm = document.getElementById('mini-appointment-form');
    const miniFormMessage = document.getElementById('mini-form-message');

    miniForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        miniFormMessage.textContent = '';

        const formData = {
            name: miniForm['name'].value,
            phone: miniForm['phone'].value,
            service: miniForm['service'].value,
            date: miniForm['date'].value,
            time: miniForm['time'].value
        };

        try {
            const response = await fetch('/api/appointment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (result.success) {
                miniFormMessage.textContent = 'Appointment booked successfully!';
                miniForm.reset();
            } else {
                miniFormMessage.textContent = 'Failed to book appointment. Please try again.';
            }
        } catch (error) {
            miniFormMessage.textContent = 'Error submitting form. Please try again later.';
        }
    });
}

// Toggle chatbot expansion
chatbotHeader.addEventListener('click', () => {
    chatbotBody.classList.toggle('hidden');
    chatbot.classList.toggle('chatbot-expanded');

    // Change icon
    if (chatbotBody.classList.contains('hidden')) {
        chatbotToggle.classList.remove('fa-chevron-down');
        chatbotToggle.classList.add('fa-chevron-up');
    } else {
        chatbotToggle.classList.remove('fa-chevron-up');
        chatbotToggle.classList.add('fa-chevron-down');
    }
});

// Initialize chatbot with welcome message and quick replies
addMessage("Hi 👋 I'm your dental assistant. How can I help you today?");
createQuickReplies();

// Handle send button
chatbotSend.addEventListener('click', () => {
    const message = chatbotInput.value.trim();
    if (message) {
        addMessage(message, true);
        chatbotInput.value = '';

        // Simple bot response
        setTimeout(() => {
            addMessage('Thank you for your message. For immediate assistance, please call our front desk at +91 99999 99999 or visit our contact page.');
        }, 1000);
    }
});

// Handle enter key in input
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        chatbotSend.click();
    }
});
