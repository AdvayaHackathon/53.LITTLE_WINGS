document.addEventListener('DOMContentLoaded', function() {
    // Initialize Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xvNXE2aTRpMDdpbzJrcGR5ZDUwY2ZmZSJ9.3VSJGmJ7BgRxNFBGdULbMw';
    const map = new mapboxgl.Map({
        container: 'plannerMap',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [135.7681, 35.0116], // Kyoto coordinates
        zoom: 12
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());

    // Initialize date picker
    flatpickr("#tripDates", {
        mode: "range",
        minDate: "today",
        dateFormat: "Y-m-d",
        altInput: true,
        altFormat: "F j, Y",
        showMonths: 1
    });

    // Tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Hide all tab panes
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            // Show the corresponding tab pane
            const tabId = this.getAttribute('data-tab') + 'Tab';
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Map filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active class
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, this would filter map markers
            const filter = this.getAttribute('data-filter');
            console.log('Filter selected:', filter);
        });
    });

    // Preference tag selection
    const prefTags = document.querySelectorAll('.pref-tag');
    prefTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // Sample data for attractions
    const attractions = [
        {
            name: 'Fushimi Inari Shrine',
            type: 'attraction',
            coordinates: [135.7727, 34.9671],
            description: 'Famous shrine with thousands of vermilion torii gates.'
        },
        {
            name: 'Kinkaku-ji (Golden Pavilion)',
            type: 'attraction',
            coordinates: [135.7294, 35.0394],
            description: 'Zen temple covered in gold leaf.'
        },
        {
            name: 'Arashiyama Bamboo Grove',
            type: 'attraction',
            coordinates: [135.6721, 35.0176],
            description: 'Stunning bamboo forest path.'
        },
        {
            name: 'Nishiki Market',
            type: 'restaurant',
            coordinates: [135.7651, 35.0050],
            description: 'Food market with local delicacies.'
        },
        {
            name: 'Gion District',
            type: 'attraction',
            coordinates: [135.7755, 35.0036],
            description: 'Historic geisha district.'
        },
        {
            name: 'Kyoto Station',
            type: 'transport',
            coordinates: [135.7782, 34.9858],
            description: 'Main transportation hub.'
        },
        {
            name: 'Kyoto Imperial Palace',
            type: 'attraction',
            coordinates: [135.7624, 35.0254],
            description: 'Former residence of Japan\'s Imperial Family.'
        },
        {
            name: 'Philosopher\'s Path',
            type: 'attraction',
            coordinates: [135.7941, 35.0287],
            description: 'Canal path lined with cherry trees.'
        }
    ];

    // Add markers to the map
    attractions.forEach(attraction => {
        // Create a marker
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.width = '25px';
        el.style.height = '25px';
        el.style.backgroundSize = 'cover';
        
        // Set different icons based on type
        if (attraction.type === 'attraction') {
            el.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%233498db\'><path d=\'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\'/></svg>")';
        } else if (attraction.type === 'restaurant') {
            el.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23e74c3c\'><path d=\'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z\'/></svg>")';
        } else {
            el.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%232c3e50\'><path d=\'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\'/></svg>")';
        }
        
        // Add popup
        const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(`<h3>${attraction.name}</h3><p>${attraction.description}</p>`);
        
        // Add marker to map
        new mapboxgl.Marker(el)
            .setLngLat(attraction.coordinates)
            .setPopup(popup)
            .addTo(map);
    });

    // Generate AI Plan button functionality
    const generatePlanBtn = document.getElementById('generatePlan');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    generatePlanBtn.addEventListener('click', async function() {
        // Get form values
        const tripName = document.getElementById('tripName').value;
        const destination = document.getElementById('destination').value;
        const dates = document.getElementById('tripDates').value;
        
        // Validate inputs
        if (!tripName || !destination || !dates) {
            alert('Please fill in all required fields (Trip Name, Destination, and Travel Dates)');
            return;
        }
        
        // Get selected preferences
        const selectedPrefs = Array.from(document.querySelectorAll('.pref-tag.active'))
            .map(tag => tag.getAttribute('data-pref'));
        
        if (selectedPrefs.length === 0) {
            alert('Please select at least one travel preference');
            return;
        }
        
        // Get selected accommodation
        const accommodation = document.querySelector('input[name="accommodation"]:checked');
        const accommodationType = accommodation ? accommodation.value : null;
        
        if (!accommodationType) {
            alert('Please select an accommodation type');
            return;
        }
        
        // Get budget
        const budget = document.getElementById('budget').value;
        
        // Show loading overlay
        loadingOverlay.classList.add('active');
        
        try {
            // Call OpenAI API to generate itinerary
            const itinerary = await generateAIItinerary(tripName, destination, dates, selectedPrefs, accommodationType, budget);
            
            // Display itinerary
            displayItinerary(itinerary, tripName, destination, dates, selectedPrefs, accommodationType, budget);
            
            // Generate suggestions
            const suggestions = await generateAISuggestions(destination, selectedPrefs);
            displaySuggestions(suggestions, destination);
            
            // Switch to itinerary tab
            document.querySelector('.tab-btn[data-tab="itinerary"]').click();
        } catch (error) {
            console.error('Error generating AI plan:', error);
            alert('Error generating plan. Please try again.');
        } finally {
            // Hide loading overlay
            loadingOverlay.classList.remove('active');
        }
    });

    // Function to call OpenAI API for itinerary generation
    async function generateAIItinerary(tripName, destination, dates, preferences, accommodation, budget) {
        // In a real implementation, this would make an API call to OpenAI
        // For this demo, we'll simulate the API call
        
        // This is where you would use the OpenAI API key from config.js
        // const apiKey = config.OPENAI_API_KEY;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Parse dates
        const dateRange = dates.split(' to ');
        const startDate = new Date(dateRange[0]);
        const endDate = dateRange.length > 1 ? new Date(dateRange[1]) : new Date(dateRange[0]);
        
        // Calculate number of days
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        
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
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful travel assistant that creates detailed travel itineraries."
                    },
                    {
                        role: "user",
                        content: `Create a detailed ${diffDays}-day itinerary for a trip to ${destination}. Trip name: ${tripName}. Travel dates: ${dates}. Preferences: ${preferences.join(', ')}. Accommodation: ${accommodation}. Budget: ${budget}.`
                    }
                ]
            })
        });
        
        const data = await response.json();
        return parseItinerary(data.choices[0].message.content);
        */
        
        // For this demo, we'll return a simulated itinerary
        const itinerary = [];
        
        for (let i = 0; i < diffDays; i++) {
            const currentDate = new Date(startDate);
            currentDate.setDate(startDate.getDate() + i);
            
            const formattedDate = currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
            });
            
            const activities = [];
            
            // Morning activity
            activities.push({
                time: '9:00 AM',
                title: attractions[i % attractions.length].name,
                description: attractions[i % attractions.length].description,
                duration: '2 hours',
                location: destination
            });
            
            // Lunch
            activities.push({
                time: '12:00 PM',
                title: 'Lunch at Local Restaurant',
                description: 'Enjoy traditional cuisine at a popular local spot.',
                duration: '1.5 hours',
                location: destination
            });
            
            // Afternoon activity
            activities.push({
                time: '2:00 PM',
                title: attractions[(i + 3) % attractions.length].name,
                description: attractions[(i + 3) % attractions.length].description,
                duration: '3 hours',
                location: destination
            });
            
            // Dinner
            activities.push({
                time: '6:30 PM',
                title: `Dinner at ${i % 2 === 0 ? 'Traditional' : 'Modern'} Restaurant`,
                description: `Experience ${i % 2 === 0 ? 'authentic local' : 'contemporary'} cuisine in a ${i % 2 === 0 ? 'cozy' : 'stylish'} setting.`,
                duration: '2 hours',
                location: destination
            });
            
            itinerary.push({
                day: i + 1,
                date: formattedDate,
                activities: activities
            });
        }
        
        return itinerary;
    }

    // Function to generate AI suggestions
    async function generateAISuggestions(destination, preferences) {
        // In a real implementation, this would make an API call to OpenAI
        // For this demo, we'll simulate the API call
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // For this demo, we'll return simulated suggestions
        return {
            hiddenGems: [
                'Otagi Nenbutsu-ji Temple - A hidden temple with 1,200 unique stone statues',
                'Philosopher\'s Path Secret Garden - A secluded garden off the famous path',
                'Kyoto Artisan Alley - A narrow alleyway where traditional craftsmen still practice'
            ],
            localExperiences: [
                'Traditional Tea Ceremony - Learn the art of Japanese tea preparation',
                'Kimono Rental - Experience wearing traditional Japanese attire',
                'Cooking Class - Learn to make authentic Japanese dishes'
            ],
            bestTimes: [
                'Fushimi Inari Shrine - Early morning (before 8am) to avoid crowds',
                'Arashiyama Bamboo Grove - Sunrise for the best light and fewer people',
                'Gion District - Evening (5-7pm) to possibly spot geiko and maiko'
            ],
            seasonal: [
                'Cherry Blossom Season (Late March to Early April) - Visit Maruyama Park',
                'Autumn Foliage (November) - Tofuku-ji Temple for spectacular colors',
                'Gion Matsuri Festival (July) - Experience one of Japan\'s most famous festivals'
            ],
            personalizedTip: preferences.includes('cultural') 
                ? 'For cultural experiences, consider visiting during a local festival or attending a traditional performance.'
                : preferences.includes('nature')
                ? 'For nature lovers, the western mountains of Kyoto offer beautiful hiking trails with fewer tourists.'
                : preferences.includes('food')
                ? 'Food enthusiasts should try the kaiseki (multi-course) dining experience at least once during their visit.'
                : 'Based on your preferences, consider purchasing a 1-day or 2-day bus pass for convenient transportation around the city.'
        };
    }

    // Function to display itinerary
    function displayItinerary(itinerary, tripName, destination, dates, preferences, accommodation, budget) {
        let itineraryHTML = `
            <div class="itinerary-header">
                <h2>${tripName}</h2>
                <div class="itinerary-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${destination}</span>
                    <span><i class="fas fa-calendar-alt"></i> ${dates}</span>
                    <span><i class="fas fa-bed"></i> ${accommodation}</span>
                    <span><i class="fas fa-wallet"></i> ${budget.charAt(0).toUpperCase() + budget.slice(1)}</span>
                </div>
                ${preferences.length > 0 ? `
                    <div class="itinerary-preferences">
                        ${preferences.map(pref => `<span class="pref-badge">${pref}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="itinerary-days">
        `;
        
        itinerary.forEach(day => {
            itineraryHTML += `
                <div class="itinerary-day">
                    <div class="day-header">
                        <h3>Day ${day.day}</h3>
                        <span>${day.date}</span>
                    </div>
                    <div class="day-activities">
            `;
            
            day.activities.forEach(activity => {
                itineraryHTML += `
                    <div class="activity">
                        <div class="activity-time">${activity.time}</div>
                        <div class="activity-details">
                            <h4>${activity.title}</h4>
                            <p>${activity.description}</p>
                            <div class="activity-meta">
                                <span><i class="fas fa-clock"></i> ${activity.duration}</span>
                                <span><i class="fas fa-map-marker-alt"></i> ${activity.location}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            itineraryHTML += `
                    </div>
                </div>
            `;
        });
        
        itineraryHTML += `
            </div>
            <div class="itinerary-actions">
                <button class="action-btn"><i class="fas fa-download"></i> Download PDF</button>
                <button class="action-btn"><i class="fas fa-share-alt"></i> Share</button>
                <button class="action-btn"><i class="fas fa-edit"></i> Edit</button>
            </div>
        `;
        
        document.getElementById('itineraryTab').innerHTML = itineraryHTML;
    }

    // Function to display suggestions
    function displaySuggestions(suggestions, destination) {
        let suggestionsHTML = `
            <div class="suggestions-header">
                <h2>AI Recommendations for ${destination}</h2>
                <p>Based on your preferences and travel dates, here are some personalized suggestions:</p>
            </div>
            <div class="suggestions-content">
        `;
        
        // Hidden Gems
        suggestionsHTML += `
            <div class="suggestion-category">
                <div class="category-header">
                    <i class="fas fa-gem"></i>
                    <h3>Hidden Gems</h3>
                </div>
                <ul class="suggestion-list">
                    ${suggestions.hiddenGems.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // Local Experiences
        suggestionsHTML += `
            <div class="suggestion-category">
                <div class="category-header">
                    <i class="fas fa-hands"></i>
                    <h3>Local Experiences</h3>
                </div>
                <ul class="suggestion-list">
                    ${suggestions.localExperiences.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // Best Times to Visit
        suggestionsHTML += `
            <div class="suggestion-category">
                <div class="category-header">
                    <i class="fas fa-clock"></i>
                    <h3>Best Times to Visit</h3>
                </div>
                <ul class="suggestion-list">
                    ${suggestions.bestTimes.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // Seasonal Recommendations
        suggestionsHTML += `
            <div class="suggestion-category">
                <div class="category-header">
                    <i class="fas fa-calendar-alt"></i>
                    <h3>Seasonal Recommendations</h3>
                </div>
                <ul class="suggestion-list">
                    ${suggestions.seasonal.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `;
        
        // Personalized Tip
        suggestionsHTML += `
            <div class="personalized-tip">
                <h3>Personalized Tip</h3>
                <p>${suggestions.personalizedTip}</p>
            </div>
        `;
        
        suggestionsHTML += `
            </div>
        `;
        
        document.getElementById('suggestionsTab').innerHTML = suggestionsHTML;
    }

    // Translator functionality
    const translatorCircle = document.querySelector('.translator-container');
    const translatorModal = document.getElementById('translatorModal');
    const closeTranslator = document.querySelector('.close-translator');

    translatorCircle.addEventListener('click', function() {
        translatorModal.classList.add('active');
    });

    closeTranslator.addEventListener('click', function() {
        translatorModal.classList.remove('active');
    });
});
