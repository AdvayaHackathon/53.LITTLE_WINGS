document.addEventListener('DOMContentLoaded', function() {
    // Initialize Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xvNXE2aTRpMDdpbzJrcGR5ZDUwY2ZmZSJ9.3VSJGmJ7BgRxNFBGdULbMw';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [135.7681, 35.0116], // Kyoto coordinates
        zoom: 12
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());

    // Sample data for the application
    const destinations = [
        {
            id: 1,
            name: 'Kyoto, Japan',
            description: 'Experience ancient traditions in a modern world',
            coordinates: [135.7681, 35.0116],
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-traditional-japanese-gardens-5332-large.mp4'
        },
        {
            id: 2,
            name: 'Santorini, Greece',
            description: 'Stunning sunsets and iconic white architecture',
            coordinates: [25.3963, 36.4640],
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-santorini-greece-4872-large.mp4'
        },
        {
            id: 3,
            name: 'Machu Picchu, Peru',
            description: 'Ancient Incan citadel set high in the Andes Mountains',
            coordinates: [-72.5450, -13.1631],
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-machu-picchu-peru-4783-large.mp4'
        },
        {
            id: 4,
            name: 'Venice, Italy',
            description: 'Romantic canals and historic architecture',
            coordinates: [12.3155, 45.4408],
            videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-venice-canal-with-gondolas-4822-large.mp4'
        }
    ];

    const events = [
        {
            id: 1,
            title: 'Cherry Blossom Festival',
            date: 'April 5 - 15, 2023',
            location: 'Maruyama Park, Kyoto',
            description: 'Annual celebration of cherry blossoms with traditional performances and food stalls.',
            image: 'https://images.unsplash.com/photo-1522383225653-ed111181a951'
        },
        {
            id: 2,
            title: 'Gion Matsuri Festival',
            date: 'July 1 - 31, 2023',
            location: 'Gion District, Kyoto',
            description: 'One of Japan\'s most famous festivals featuring grand processions and traditional music.',
            image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186'
        },
        {
            id: 3,
            title: 'Kyoto International Film Festival',
            date: 'October 10 - 17, 2023',
            location: 'Various venues, Kyoto',
            description: 'Showcasing international and Japanese films with special focus on cultural heritage.',
            image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728'
        },
        {
            id: 4,
            title: 'Traditional Tea Ceremony Workshop',
            date: 'Every Saturday',
            location: 'Urasenke Foundation, Kyoto',
            description: 'Learn the art of Japanese tea ceremony from master practitioners.',
            image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef'
        }
    ];

    const hiddenGems = [
        {
            id: 1,
            name: 'Otagi Nenbutsu-ji Temple',
            description: 'A hidden temple with 1,200 unique stone statues, each with its own expression.',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e'
        },
        {
            id: 2,
            name: 'Philosopher\'s Path Secret Garden',
            description: 'A secluded garden off the famous Philosopher\'s Path, known only to locals.',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26'
        },
        {
            id: 3,
            name: 'Kyoto Artisan Alley',
            description: 'A narrow alleyway where traditional craftsmen still practice ancient techniques.',
            image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186'
        },
        {
            id: 4,
            name: 'Tatsumi Bridge at Sunset',
            description: 'A small bridge in Gion that offers the most magical sunset views over the river.',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e'
        },
        {
            id: 5,
            name: 'Fushimi Inari Hidden Shrine',
            description: 'A small, peaceful shrine hidden away from the main Fushimi Inari tourist path.',
            image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36'
        }
    ];

    const localGuides = [
        {
            id: 1,
            name: 'Takashi Yamamoto',
            location: 'Kyoto, Japan',
            bio: 'Born and raised in Kyoto with 15+ years of guiding experience.',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
            photo: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
            trips: 124,
            reviews: 98,
            rating: 4.9
        },
        {
            id: 2,
            name: 'Yuki Tanaka',
            location: 'Kyoto, Japan',
            bio: 'Specialist in traditional arts and tea ceremonies.',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
            photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
            trips: 87,
            reviews: 76,
            rating: 4.8
        },
        {
            id: 3,
            name: 'Kenji Nakamura',
            location: 'Kyoto, Japan',
            bio: 'Food expert and culinary tour guide with knowledge of hidden local spots.',
            avatar: 'https://randomuser.me/api/portraits/men/67.jpg',
            photo: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
            trips: 56,
            reviews: 42,
            rating: 4.7
        },
        {
            id: 4,
            name: 'Aiko Suzuki',
            location: 'Kyoto, Japan',
            bio: 'Historian specializing in Kyoto\'s temples and imperial history.',
            avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
            photo: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
            trips: 112,
            reviews: 89,
            rating: 4.9
        }
    ];

    const culturalEvents = [
        {
            id: 1,
            title: 'Aoi Matsuri',
            date: 'May 15, 2023',
            location: 'Shimogamo Shrine, Kyoto',
            description: 'One of Kyoto\'s three major festivals featuring a procession in Heian Period costumes.',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e'
        },
        {
            id: 2,
            title: 'Jidai Matsuri',
            date: 'October 22, 2023',
            location: 'Kyoto Imperial Palace',
            description: 'Historical parade depicting different periods of Japanese history with authentic costumes.',
            image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186'
        },
        {
            id: 3,
            title: 'Arashiyama Hanatouro',
            date: 'December 8-17, 2023',
            location: 'Arashiyama District',
            description: 'Illumination event where the bamboo groves and temples are lit up with lanterns.',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26'
        }
    ];

    // Current destination index
    let currentDestinationIndex = 0;

    // Function to update hero section with destination info
    function updateHeroSection(index) {
        const destination = destinations[index];
        document.getElementById('currentLocation').querySelector('h2').textContent = destination.name;
        document.getElementById('currentLocation').querySelector('p').textContent = destination.description;
        
        const video = document.getElementById('heroVideo');
        video.src = destination.videoUrl;
        video.load();
        video.play();
        
        // Update map center
        map.flyTo({
            center: destination.coordinates,
            zoom: 12,
            essential: true
        });
    }

    // Initialize hero section
    updateHeroSection(currentDestinationIndex);

    // Video navigation controls
    document.querySelector('.video-nav.prev').addEventListener('click', function() {
        currentDestinationIndex = (currentDestinationIndex - 1 + destinations.length) % destinations.length;
        updateHeroSection(currentDestinationIndex);
    });

    document.querySelector('.video-nav.next').addEventListener('click', function() {
        currentDestinationIndex = (currentDestinationIndex + 1) % destinations.length;
        updateHeroSection(currentDestinationIndex);
    });

    // Populate events slider
    const eventsSlider = document.getElementById('eventsSlider');
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <h4>${event.title}</h4>
            <p class="event-date">${event.date}</p>
            <p class="event-location">${event.location}</p>
        `;
        eventCard.addEventListener('click', function() {
            // Show event details modal (to be implemented)
            alert(`Event: ${event.title}\n${event.description}`);
        });
        eventsSlider.appendChild(eventCard);
    });

    // Populate hidden gems
    const gemsContainer = document.getElementById('hiddenGems');
    hiddenGems.forEach(gem => {
        const gemCard = document.createElement('div');
        gemCard.className = 'gem-card';
        gemCard.innerHTML = `
            <img src="${gem.image}" alt="${gem.name}">
            <div class="gem-content">
                <h3>${gem.name}</h3>
                <p>${gem.description}</p>
            </div>
        `;
        gemsContainer.appendChild(gemCard);
    });

    // Populate local guides
    const guidesContainer = document.getElementById('localGuides');
    localGuides.forEach(guide => {
        const guideCard = document.createElement('div');
        guideCard.className = 'guide-card';
        guideCard.innerHTML = `
            <div class="guide-photo">
                <img src="${guide.photo}" alt="${guide.name}'s location">
            </div>
            <div class="guide-info">
                <div class="guide-avatar">
                    <img src="${guide.avatar}" alt="${guide.name}">
                </div>
                <h3>${guide.name}</h3>
                <p>${guide.bio}</p>
                <div class="guide-stats">
                    <div class="stat">
                        <div class="stat-value">${guide.trips}</div>
                        <div class="stat-label">Trips</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${guide.reviews}</div>
                        <div class="stat-label">Reviews</div>
                    </div>
                    <div class="stat">
                        <div class="stat-value">${guide.rating}</div>
                        <div class="stat-label">Rating</div>
                    </div>
                </div>
                <button class="contact-guide">Contact Guide</button>
            </div>
        `;
        guidesContainer.appendChild(guideCard);
    });

    // Populate cultural calendar
    const calendarContainer = document.getElementById('culturalCalendar');
    culturalEvents.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'calendar-event';
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${event.image}" alt="${event.title}">
            </div>
            <div class="event-details">
                <span class="event-date-badge">${event.date}</span>
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="event-location">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${event.location}</span>
                </div>
            </div>
        `;
        calendarContainer.appendChild(eventCard);
    });

    // Preference tag selection
    const prefTags = document.querySelectorAll('.pref-tag');
    prefTags.forEach(tag => {
        tag.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });

    // Map click event
    map.on('click', function(e) {
        // Get clicked coordinates
        const coordinates = e.lngLat.toArray();
        
        // Find nearest destination (in a real app, this would use a proper distance calculation)
        let nearestDestination = destinations[0];
        let minDistance = Infinity;
        
        destinations.forEach(dest => {
            const dx = dest.coordinates[0] - coordinates[0];
            const dy = dest.coordinates[1] - coordinates[1];
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < minDistance) {
                minDistance = distance;
                nearestDestination = dest;
            }
        });
        
        // Update location info
        document.getElementById('locationDescription').textContent = 
            `${nearestDestination.name}: ${nearestDestination.description}`;
        
        // Add marker
        new mapboxgl.Marker()
            .setLngLat(coordinates)
            .addTo(map);
    });

    // Create Trip button functionality
    document.querySelector('.create-trip-btn').addEventListener('click', function() {
        window.location.href = 'trip_planner.html';
    });

    // Translator functionality
    const translatorCircle = document.querySelector('.translator-container');
    const translatorModal = document.getElementById('translatorModal');
    const closeTranslator = document.querySelector('.close-translator');
    const translateBtn = document.querySelector('.translate-btn');
    const dictateBtn = document.querySelector('.dictate-btn');

    translatorCircle.addEventListener('click', function() {
        translatorModal.classList.add('active');
    });

    closeTranslator.addEventListener('click', function() {
        translatorModal.classList.remove('active');
    });

    translateBtn.addEventListener('click', function() {
        const text = document.querySelector('.translator-body textarea').value;
        const targetLang = document.getElementById('targetLanguage').value;
        
        if (text.trim() === '') {
            alert('Please enter text to translate');
            return;
        }
        
        // Simulate translation (in a real app, this would call a translation API)
        document.querySelector('.translation-result p').textContent = `Translated to ${targetLang}: ${text}`;
    });

    dictateBtn.addEventListener('click', function() {
        // Simulate dictation (in a real app, this would use the Web Speech API)
        alert('Dictation feature would be activated here');
    });

    // OpenAI API Integration for AI Recommendations
    const getRecommendationsBtn = document.getElementById('getRecommendations');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const recommendationResults = document.getElementById('recommendationResults');

    getRecommendationsBtn.addEventListener('click', async function() {
        const destination = document.getElementById('destination').value;
        const duration = document.getElementById('travelDuration').value;
        const selectedPrefs = Array.from(document.querySelectorAll('.pref-tag.active'))
            .map(tag => tag.getAttribute('data-pref'));
        
        if (!destination) {
            alert('Please enter a destination');
            return;
        }
        
        if (selectedPrefs.length === 0) {
            alert('Please select at least one travel style preference');
            return;
        }
        
        // Show loading overlay
        loadingOverlay.classList.add('active');
        
        try {
            // Call OpenAI API for recommendations
            const recommendations = await getAIRecommendations(destination, duration, selectedPrefs);
            displayRecommendations(recommendations);
        } catch (error) {
            console.error('Error getting AI recommendations:', error);
            alert('Error getting recommendations. Please try again.');
        } finally {
            // Hide loading overlay
            loadingOverlay.classList.remove('active');
        }
    });

    // Function to call OpenAI API for recommendations
    async function getAIRecommendations(destination, duration, preferences) {
        // In a real implementation, this would make an API call to OpenAI
        // For this demo, we'll simulate the API call
        
        // This is where you would use the OpenAI API key from config.js
        // const apiKey = config.OPENAI_API_KEY;
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate API response
        const preferencesText = preferences.join(', ');
        
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
                        content: "You are a helpful travel assistant that provides personalized travel recommendations."
                    },
                    {
                        role: "user",
                        content: `I'm planning a trip to ${destination} for ${duration} days. I'm interested in ${preferencesText} experiences. Can you recommend some places to visit, things to do, and where to stay?`
                    }
                ]
            })
        });
        
        const data = await response.json();
        return data.choices[0].message.content;
        */
        
        // For this demo, we'll return simulated recommendations
        if (destination.toLowerCase().includes('kyoto')) {
            return [
                {
                    title: "Fushimi Inari Shrine",
                    description: "Visit early morning to avoid crowds and experience the mystical atmosphere of thousands of vermilion torii gates winding up the mountain.",
                    tags: ["cultural", "nature", "photography"]
                },
                {
                    title: "Arashiyama Bamboo Grove",
                    description: "Walk through the stunning bamboo forest and visit nearby Tenryu-ji Temple, a UNESCO World Heritage site with beautiful gardens.",
                    tags: ["nature", "cultural", "photography"]
                },
                {
                    title: "Gion District",
                    description: "Explore the historic geisha district, especially in the evening when you might spot geiko (Kyoto's geishas) and maiko (apprentice geishas).",
                    tags: ["cultural", "food", "evening"]
                },
                {
                    title: "Nishiki Market",
                    description: "Known as 'Kyoto's Kitchen', this covered market stretches for several blocks and offers local specialties and food souvenirs.",
                    tags: ["food", "shopping", "local experience"]
                },
                {
                    title: "Ryokan Stay",
                    description: "For an authentic experience, stay at a traditional Japanese inn with tatami floors, futon bedding, and kaiseki meals.",
                    tags: ["accommodation", "cultural", "luxury"]
                }
            ];
        } else {
            // Generic recommendations for other destinations
            return [
                {
                    title: `${destination} Historical Center`,
                    description: `Explore the rich history and architecture of ${destination}'s old town area, with its charming streets and historical landmarks.`,
                    tags: ["cultural", "history", "walking"]
                },
                {
                    title: `Local Cuisine Experience`,
                    description: `Try the authentic local dishes at traditional restaurants and food markets to get a taste of ${destination}'s culinary heritage.`,
                    tags: ["food", "local experience"]
                },
                {
                    title: `Nature Excursion`,
                    description: `Take a day trip to the natural attractions surrounding ${destination}, perfect for hiking and photography.`,
                    tags: ["nature", "adventure", "photography"]
                },
                {
                    title: `Cultural Workshop`,
                    description: `Participate in a hands-on workshop to learn traditional crafts or cooking techniques from local artisans.`,
                    tags: ["cultural", "hands-on", "local experience"]
                },
                {
                    title: `Hidden Gems Tour`,
                    description: `Discover off-the-beaten-path locations known mainly to locals, away from typical tourist spots.`,
                    tags: ["hidden gems", "local experience", "adventure"]
                }
            ];
        }
    }

    // Function to display AI recommendations
    function displayRecommendations(recommendations) {
        let html = '';
        
        recommendations.forEach(rec => {
            html += `
                <div class="ai-recommendation">
                    <h3>${rec.title}</h3>
                    <p>${rec.description}</p>
                    <div class="recommendation-tags">
                        ${rec.tags.map(tag => `<span class="recommendation-tag">${tag}</span>`).join('')}
                    </div>
                </div>
            `;
        });
        
        recommendationResults.innerHTML = html;
    }
});
