document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendMessage');
    const querySuggestions = document.querySelectorAll('.query-btn');
    const historyItems = document.querySelectorAll('.history-item');
    const translatorCircle = document.querySelector('.translator-container');
    const translatorModal = document.getElementById('translatorModal');
    const closeTranslator = document.querySelector('.close-translator');
    const loadingOverlay = document.getElementById('loadingOverlay');

    // Chat history for context (in a real app, this would be stored in a database)
    let chatHistory = [
        {
            role: "system",
            content: "You are a helpful AI travel assistant that provides detailed information about destinations, travel tips, and recommendations."
        },
        {
            role: "assistant",
            content: "Hello! I'm your AI travel assistant. How can I help you plan your trip to Kyoto?"
        }
    ];

    // Function to add a user message
    function addUserMessage(text) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message user';
        messageElement.innerHTML = `
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add to chat history
        chatHistory.push({
            role: "user",
            content: text
        });
    }

    // Function to add an AI message
    function addAIMessage(html) {
        const messageElement = document.createElement('div');
        messageElement.className = 'message ai';
        messageElement.innerHTML = `
            <div class="message-avatar">
                <img src="https://i.imgur.com/7QFtG6q.png" alt="AI">
            </div>
            <div class="message-content">
                ${html}
            </div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add to chat history
        chatHistory.push({
            role: "assistant",
            content: html.replace(/<\/?[^>]+(>|$)/g, "") // Strip HTML tags for the chat history
        });
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingElement = document.createElement('div');
        typingElement.className = 'message ai typing';
        typingElement.innerHTML = `
            <div class="message-avatar">
                <img src="https://i.imgur.com/7QFtG6q.png" alt="AI">
            </div>
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        typingElement.id = 'typingIndicator';
        chatMessages.appendChild(typingElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingElement = document.getElementById('typingIndicator');
        if (typingElement) {
            typingElement.remove();
        }
    }

    // Function to get AI response using OpenAI API
    async function getAIResponse(message) {
        // In a real implementation, this would make an API call to OpenAI
        // For this demo, we'll simulate the API call
        
        // This is where you would use the OpenAI API key from config.js
        // const apiKey = config.OPENAI_API_KEY;
        
        // Show loading overlay
        loadingOverlay.classList.add('active');
        
        try {
            // In a real implementation, you would make an API call like this:
            /*
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: chatHistory
                })
            });
            
            const data = await response.json();
            return data.choices[0].message.content;
            */
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // For this demo, we'll return simulated responses based on keywords
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('temple') || lowerMessage.includes('shrine')) {
                return `
                    <p>Kyoto has over 1,600 Buddhist temples and 400 Shinto shrines! Some of the most famous include:</p>
                    <ul>
                        <li><strong>Kinkaku-ji (Golden Pavilion)</strong> - A Zen temple covered in gold leaf</li>
                        <li><strong>Fushimi Inari Shrine</strong> - Famous for its thousands of vermilion torii gates</li>
                        <li><strong>Kiyomizu-dera</strong> - Built on a hillside with a large wooden stage</li>
                    </ul>
                    <p>Would you like more specific information about any particular temple or shrine?</p>
                `;
            } else if (lowerMessage.includes('hotel') || lowerMessage.includes('stay') || lowerMessage.includes('accommodation')) {
                return `
                    <p>Kyoto offers various types of accommodations:</p>
                    <ul>
                        <li><strong>Ryokan</strong> - Traditional Japanese inns with tatami floors and futon bedding</li>
                        <li><strong>Hotels</strong> - Range from luxury international chains to budget-friendly options</li>
                        <li><strong>Machiya</strong> - Renovated traditional wooden townhouses</li>
                        <li><strong>Guesthouses</strong> - Budget options with shared facilities</li>
                    </ul>
                    <p>The best areas to stay are Downtown Kyoto, Gion, or near Kyoto Station for convenience. Would you like specific recommendations?</p>
                `;
            } else if (lowerMessage.includes('food') || lowerMessage.includes('eat') || lowerMessage.includes('restaurant')) {
                return `
                    <p>Kyoto is famous for its refined cuisine. Here are some local specialties to try:</p>
                    <ul>
                        <li><strong>Kaiseki Ryori</strong> - Traditional multi-course dinner that's considered the pinnacle of Japanese cuisine.</li>
                        <li><strong>Yudofu</strong> - Hot tofu dish that's especially popular in winter.</li>
                        <li><strong>Nishin Soba</strong> - Soba noodles topped with sweet simmered herring.</li>
                        <li><strong>Kyoto-style Ramen</strong> - Featuring a rich chicken broth with thin noodles.</li>
                        <li><strong>Wagashi</strong> - Traditional Japanese sweets often served with matcha tea.</li>
                    </ul>
                    <p>For the best experience, try these at traditional restaurants in Gion or Pontocho districts. Would you like specific restaurant recommendations?</p>
                `;
            } else if (lowerMessage.includes('weather') || lowerMessage.includes('season') || lowerMessage.includes('when')) {
                return `
                    <p>Kyoto has four distinct seasons:</p>
                    <ul>
                        <li><strong>Spring (March-May)</strong> - Mild temperatures (10-20°C) and cherry blossoms. Very popular with tourists.</li>
                        <li><strong>Summer (June-August)</strong> - Hot and humid (25-35°C) with occasional rain. The rainy season is typically in June.</li>
                        <li><strong>Fall (September-November)</strong> - Pleasant temperatures (15-25°C) and beautiful autumn foliage, especially in November.</li>
                        <li><strong>Winter (December-February)</strong> - Cold (0-10°C) but rarely snows heavily. Less crowded and occasionally sees temples covered in snow.</li>
                    </ul>
                    <p>The best times to visit are spring for cherry blossoms and fall for autumn colors, though these are also the busiest seasons.</p>
                `;
            } else if (lowerMessage.includes('transport') || lowerMessage.includes('bus') || lowerMessage.includes('train')) {
                return `
                    <p>Kyoto has an excellent public transportation system. Here's how to use it:</p>
                    <ul>
                        <li><strong>Buses</strong> - The main form of public transport in Kyoto. Purchase a one-day bus pass (¥600) for unlimited rides. Board from the rear door and exit from the front, paying as you leave.</li>
                        <li><strong>Subway</strong> - Kyoto has two subway lines: Karasuma Line (north-south) and Tozai Line (east-west). Purchase tickets at vending machines before boarding.</li>
                        <li><strong>JR Trains</strong> - If you have a Japan Rail Pass, you can use JR lines within Kyoto at no additional cost.</li>
                        <li><strong>IC Cards</strong> - ICOCA, Suica, or Pasmo cards can be used for all public transport in Kyoto. Simply tap on and off.</li>
                    </ul>
                    <p>For tourists, the one-day bus pass is highly recommended as most major attractions are accessible by bus.</p>
                `;
            } else if (lowerMessage.includes('day trip') || lowerMessage.includes('nearby')) {
                return `
                    <p>There are several excellent day trips you can take from Kyoto:</p>
                    <ul>
                        <li><strong>Nara</strong> - Just 45 minutes by train, famous for its friendly deer and massive Buddha statue at Todai-ji Temple.</li>
                        <li><strong>Osaka</strong> - 30 minutes by train, known for its vibrant food scene, Osaka Castle, and Dotonbori district.</li>
                        <li><strong>Arashiyama Bamboo Grove</strong> - Technically in Kyoto but feels like a day trip, with beautiful bamboo forests and monkey park.</li>
                        <li><strong>Himeji</strong> - About 1 hour by train, home to Japan's most beautiful feudal castle.</li>
                        <li><strong>Uji</strong> - 20 minutes by train, famous for matcha green tea and the beautiful Byodo-in Temple.</li>
                    </ul>
                    <p>All of these destinations are easily accessible by train from Kyoto Station. Would you like more details about any specific destination?</p>
                `;
            } else if (lowerMessage.includes('etiquette') || lowerMessage.includes('custom') || lowerMessage.includes('culture')) {
                return `
                    <p>Here are some important cultural etiquette tips for visiting Kyoto:</p>
                    <ul>
                        <li><strong>Temples and Shrines</strong> - Remove hats, speak quietly, and follow any posted rules. Some temples require removing shoes before entering.</li>
                        <li><strong>Bowing</strong> - A slight bow when greeting or thanking someone is appreciated.</li>
                        <li><strong>Dining</strong> - Saying "itadakimasu" before eating and "gochisosama deshita" after finishing is customary. Don't stick chopsticks upright in rice.</li>
                        <li><strong>Public Behavior</strong> - Avoid eating while walking, speaking loudly on phones in public transport, or pointing directly at people.</li>
                        <li><strong>Shoes</strong> - Always remove shoes when entering traditional accommodations, some restaurants, and certain areas of temples.</li>
                        <li><strong>Tipping</strong> - Not customary in Japan and can sometimes cause confusion.</li>
                    </ul>
                    <p>Kyoto is particularly traditional, so these customs are more strictly observed than in other Japanese cities.</p>
                `;
            } else {
                return `
                    <p>Thank you for your question about "${message}". Kyoto is a fascinating city with over 1,200 years of history as Japan's former capital.</p>
                    <p>Would you like to know more about specific aspects of Kyoto such as:</p>
                    <ul>
                        <li>Historical sites and temples</li>
                        <li>Local cuisine and dining</li>
                        <li>Transportation options</li>
                        <li>Seasonal events and festivals</li>
                        <li>Day trips from Kyoto</li>
                    </ul>
                    <p>Feel free to ask about any of these topics or something else you're curious about!</p>
                `;
            }
        } catch (error) {
            console.error('Error getting AI response:', error);
            return '<p>I apologize, but I encountered an error processing your request. Please try again.</p>';
        } finally {
            // Hide loading overlay
            loadingOverlay.classList.remove('active');
        }
    }

    // Send message function
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addUserMessage(message);
        
        // Clear input
        messageInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        try {
            // Get AI response
            const response = await getAIResponse(message);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add AI response
            addAIMessage(response);
        } catch (error) {
            console.error('Error in chat flow:', error);
            
            // Remove typing indicator
            removeTypingIndicator();
            
            // Add error message
            addAIMessage('<p>I apologize, but I encountered an error. Please try again.</p>');
        }
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });
    
    // Query suggestion buttons
    querySuggestions.forEach(btn => {
        btn.addEventListener('click', function() {
            const query = this.textContent;
            messageInput.value = query;
            sendMessage();
        });
    });
    
    // Chat history items
    historyItems.forEach(item => {
        item.addEventListener('click', function() {
            historyItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would load the selected chat history
            // For demo purposes, we'll just show a message
            const chatTitle = this.querySelector('h3').textContent;
            
            // Clear chat messages
            chatMessages.innerHTML = '<div class="message-date">Today</div>';
            
            // Reset chat history
            chatHistory = [
                {
                    role: "system",
                    content: "You are a helpful AI travel assistant that provides detailed information about destinations, travel tips, and recommendations."
                }
            ];
            
            // Add welcome message based on chat title
            let welcomeMessage = '';
            if (chatTitle === 'Kyoto Travel Tips') {
                welcomeMessage = "Hello! I'm your AI travel assistant. How can I help you plan your trip to Kyoto?";
            } else if (chatTitle === 'Japanese Cuisine') {
                welcomeMessage = "Welcome back! I'm here to help you explore Japanese cuisine. What would you like to know about Japanese food?";
            } else if (chatTitle === 'Transportation in Japan') {
                welcomeMessage = "Welcome to our conversation about transportation in Japan. How can I assist you with getting around?";
            }
            
            addAIMessage(`<p>${welcomeMessage}</p>`);
        });
    });

    // Translator functionality
    translatorCircle.addEventListener('click', function() {
        translatorModal.classList.add('active');
    });

    closeTranslator.addEventListener('click', function() {
        translatorModal.classList.remove('active');
    });

    // New Chat button functionality
    document.querySelector('.new-chat-btn').addEventListener('click', function() {
        // Clear chat messages
        chatMessages.innerHTML = '<div class="message-date">Today</div>';
        
        // Reset chat history
        chatHistory = [
            {
                role: "system",
                content: "You are a helpful AI travel assistant that provides detailed information about destinations, travel tips, and recommendations."
            }
        ];
        
        // Add welcome message
        addAIMessage("<p>Hello! I'm your AI travel assistant. How can I help you with your travel plans today?</p>");
        
        // Update active history item
        historyItems.forEach(i => i.classList.remove('active'));
    });
});
