document.addEventListener('DOMContentLoaded', function() {
    // Initialize Mapbox
    mapboxgl.accessToken = 'pk.eyJ1IjoiZXhhbXBsZXVzZXIiLCJhIjoiY2xvNXE2aTRpMDdpbzJrcGR5ZDUwY2ZmZSJ9.3VSJGmJ7BgRxNFBGdULbMw';
    const map = new mapboxgl.Map({
        container: 'hiddenGemsMap',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [135.7681, 35.0116], // Kyoto coordinates
        zoom: 12
    });

    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl());

    // Sample data for hidden gems
    const hiddenGems = [
        {
            id: 1,
            name: 'Otagi Nenbutsu-ji Temple',
            description: 'A hidden temple with 1,200 unique stone statues, each with its own expression. Located in the western outskirts of Kyoto, this temple is often overlooked by tourists.',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
            category: 'cultural',
            location: 'Arashiyama, Kyoto',
            coordinates: [135.6934, 35.0299],
            rating: 4.8,
            tags: ['temple', 'statues', 'peaceful', 'historical'],
            tips: [
                'Visit in the morning to avoid crowds',
                'Take bus #72 from Kyoto Station',
                'Allow at least 1 hour to explore',
                'Combine with a visit to nearby Arashiyama Bamboo Grove'
            ],
            contributor: 'Takashi Y.',
            fullDescription: 'Otagi Nenbutsu-ji is a Buddhist temple in the Arashiyama district of Kyoto, Japan. The temple features over 1,200 unique "rakan" statues, representing the disciples of Buddha, each with its own distinct facial expression and personality. These statues were carved by amateur sculptors under the guidance of master sculptor Kocho Nishimura between 1981 and 1991. The temple itself dates back to the middle of the 8th century but was relocated to its current site in 1922 after suffering damage from floods and neglect. Walking among these whimsical statues, some laughing, some serious, some bizarre, creates a uniquely intimate and lighthearted temple experience unlike any other in Kyoto.'
        },
        {
            id: 2,
            name: 'Philosopher\'s Path Secret Garden',
            description: 'A secluded garden off the famous Philosopher\'s Path, known only to locals. This tranquil spot offers beautiful seasonal flowers and a small tea house.',
            image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
            category: 'nature',
            location: 'Higashiyama, Kyoto',
            coordinates: [135.7941, 35.0287],
            rating: 4.7,
            tags: ['garden', 'peaceful', 'tea', 'nature'],
            tips: [
                'Easy to miss - look for the small wooden gate',
                'Best during cherry blossom or autumn foliage seasons',
                'The tea house is only open from 10am to 4pm',
                'No photography allowed in some areas'
            ],
            contributor: 'Yuki T.',
            fullDescription: 'Hidden just off the famous Philosopher\'s Path (Tetsugaku-no-michi) is a secret garden that most tourists walk right past. Through an unassuming wooden gate, visitors enter a meticulously maintained Japanese garden with seasonal flowers, a small koi pond, and a traditional tea house. The garden changes dramatically with the seasons - cherry blossoms in spring, lush greenery in summer, vibrant red maples in autumn, and snow-covered stone lanterns in winter. The small tea house serves traditional matcha and seasonal wagashi (Japanese sweets). Unlike the increasingly crowded Philosopher\'s Path, this hidden gem remains peaceful even during peak tourist seasons, offering a genuine moment of tranquility and reflection.'
        },
        {
            id: 3,
            name: 'Kyoto Artisan Alley',
            description: 'A narrow alleyway where traditional craftsmen still practice ancient techniques. Watch artisans create pottery, textiles, and woodwork in their small workshops.',
            image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
            category: 'cultural',
            location: 'Central Kyoto',
            coordinates: [135.7651, 35.0050],
            rating: 4.9,
            tags: ['crafts', 'shopping', 'cultural', 'authentic'],
            tips: [
                'Most workshops are open from 10am to 5pm',
                'Some artisans offer hands-on experiences (reservation required)',
                'Bring cash as many small shops don\'t accept cards',
                'Ask permission before taking photos'
            ],
            contributor: 'Kenji N.',
            fullDescription: 'Tucked away in central Kyoto is a narrow alleyway that preserves the living traditions of Japanese craftsmanship. This hidden street houses workshops of various traditional artisans - from pottery makers and textile dyers to woodworkers and paper craftsmen. Unlike the commercial souvenir shops in tourist areas, these are actual working studios where you can watch masters practice techniques passed down through generations. Many of the artisans are recognized as "living national treasures" for preserving cultural heritage. Some offer workshops where visitors can try their hand at traditional crafts (advance reservation recommended). The authentic handmade items available for purchase here make for meaningful souvenirs with genuine cultural significance and support the continuation of traditional Japanese crafts.'
        },
        {
            id: 4,
            name: 'Tatsumi Bridge at Sunset',
            description: 'A small bridge in Gion that offers the most magical sunset views over the river. Popular with photographers but often overlooked by regular tourists.',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
            category: 'viewpoint',
            location: 'Gion, Kyoto',
            coordinates: [135.7755, 35.0036],
            rating: 4.6,
            tags: ['sunset', 'photography', 'scenic', 'river'],
            tips: [
                'Arrive 30 minutes before sunset to get a good spot',
                'Best views are from the northeast corner of the bridge',
                'Combine with an evening walk through Gion',
                'Nearby cafes offer great vantage points if the bridge is crowded'
            ],
            contributor: 'Aiko S.',
            fullDescription: 'Tatsumi Bridge (Tatsumibashi) is a small, unassuming bridge crossing the Shirakawa Canal in Kyoto\'s historic Gion district. While tourists flock to more famous spots for sunset views, locals know that this humble bridge offers one of the most magical evening scenes in the city. As the sun sets, the warm light illuminates the traditional wooden tea houses along the canal, their reflections shimmering in the water below. The scene perfectly captures the essence of old Kyoto, especially during cherry blossom season when pink petals float on the canal, or in autumn when maple leaves add splashes of red and orange to the view. After enjoying the sunset, you\'re perfectly positioned to explore Gion\'s evening atmosphere and possibly spot geiko (Kyoto\'s geishas) heading to their appointments.'
        },
        {
            id: 5,
            name: 'Fushimi Inari Hidden Shrine',
            description: 'A small, peaceful shrine hidden away from the main Fushimi Inari tourist path. Located halfway up the mountain, few tourists venture here.',
            image: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36',
            category: 'cultural',
            location: 'Fushimi, Kyoto',
            coordinates: [135.7727, 34.9671],
            rating: 4.9,
            tags: ['shrine', 'peaceful', 'hiking', 'nature'],
            tips: [
                'Take the right fork about halfway up the mountain trail',
                'Look for the small stone fox statues marking the path',
                'Visit early morning or evening to avoid all crowds',
                'Bring water as there are no vending machines nearby'
            ],
            contributor: 'Hiroshi M.',
            fullDescription: 'While thousands of tourists visit the famous torii gate paths of Fushimi Inari Taisha every day, few discover the hidden shrine that sits off the main path halfway up the mountain. To find it, take the right fork about halfway up the mountain trail and look for small stone fox statues that mark a narrow path through the forest. This secluded shrine features ancient moss-covered stone structures, small vermilion torii gates, and a peaceful atmosphere that contrasts sharply with the crowded main paths. Local worshippers come here to make offerings away from the tourist crowds. The shrine is surrounded by towering cedar trees and offers beautiful views of the surrounding forest. It\'s a perfect spot for meditation or simply enjoying a moment of tranquility before rejoining the main path to continue your hike.'
        },
        {
            id: 6,
            name: 'Pontocho Back Alley Izakaya',
            description: 'A tiny traditional izakaya (Japanese pub) hidden in the back alleys of Pontocho. Known for authentic local dishes and friendly atmosphere.',
            image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
            category: 'food',
            location: 'Pontocho, Kyoto',
            coordinates: [135.7701, 35.0056],
            rating: 4.8,
            tags: ['food', 'drinks', 'authentic', 'local'],
            tips: [
                'No English menu - point and order works well',
                'Only 8 seats available, so arrive early',
                'Cash only',
                'Try the owner\'s special sake recommendation'
            ],
            contributor: 'Mei L.',
            fullDescription: 'Hidden down a narrow alley off the already narrow Pontocho street is a tiny izakaya (Japanese pub) that seats only eight people at a counter. With no sign in English and barely a sign in Japanese, this hidden gem is frequented almost exclusively by locals and in-the-know visitors. The elderly couple who runs the place serves traditional Kyoto-style small plates that pair perfectly with their curated selection of local sake. The menu changes daily based on seasonal ingredients from Kyoto\'s markets. There\'s no English menu, but the owners are friendly and will happily recommend dishes through gestures and basic English words. The intimate setting often leads to conversations with local patrons, creating a warm, authentic dining experience that feels worlds away from the tourist-oriented restaurants nearby.'
        }
    ];

    // Sample data for community contributions
    const communityGems = [
        {
            id: 101,
            name: 'Kamo River Sunset Spot',
            description: 'A perfect spot along the Kamo River to watch the sunset while enjoying street food from nearby vendors.',
            image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e',
            category: 'viewpoint',
            location: 'Central Kyoto',
            rating: 4.5,
            tags: ['sunset', 'river', 'food', 'relaxing'],
            contributor: 'Emma S.'
        },
        {
            id: 102,
            name: 'Traditional Kimono Workshop',
            description: 'A small family-run workshop where you can see traditional kimono being made using centuries-old techniques.',
            image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186',
            category: 'cultural',
            location: 'Nishijin, Kyoto',
            rating: 4.7,
            tags: ['kimono', 'crafts', 'traditional', 'workshop'],
            contributor: 'David W.'
        },
        {
            id: 103,
            name: 'Hidden Matcha Cafe',
            description: 'A tiny cafe specializing in creative matcha desserts, tucked away in a residential neighborhood.',
            image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9',
            category: 'food',
            location: 'Higashiyama, Kyoto',
            rating: 4.9,
            tags: ['matcha', 'dessert', 'cafe', 'tea'],
            contributor: 'Sophie T.'
        }
    ];

    // Populate hidden gems grid
    const gemsGrid = document.getElementById('gemsGrid');
    
    function populateGemsGrid(gems) {
        gemsGrid.innerHTML = '';
        
        if (gems.length === 0) {
            gemsGrid.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-gem"></i>
                    <p>No hidden gems found matching your filters. Try adjusting your search criteria.</p>
                </div>
            `;
            return;
        }
        
        gems.forEach(gem => {
            const gemCard = document.createElement('div');
            gemCard.className = 'gem-card';
            gemCard.setAttribute('data-id', gem.id);
            gemCard.innerHTML = `
                <div class="gem-image">
                    <img src="${gem.image}" alt="${gem.name}">
                    <span class="gem-category">${gem.category}</span>
                </div>
                <div class="gem-content">
                    <h3>${gem.name}</h3>
                    <p>${gem.description.substring(0, 120)}${gem.description.length > 120 ? '...' : ''}</p>
                    <div class="gem-meta">
                        <div class="gem-rating">
                            <i class="fas fa-star"></i>
                            <span>${gem.rating}</span>
                        </div>
                        <div class="gem-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${gem.location}</span>
                        </div>
                    </div>
                    <div class="gem-tags">
                        ${gem.tags.slice(0, 3).map(tag => `<span class="gem-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="gem-actions">
                        <button class="gem-btn view-details-btn" data-id="${gem.id}">
                            <i class="fas fa-info-circle"></i> View Details
                        </button>
                        <button class="gem-btn save-gem-btn">
                            <i class="far fa-bookmark"></i> Save
                        </button>
                    </div>
                </div>
            `;
            gemsGrid.appendChild(gemCard);
            
            // Add marker to map
            if (gem.coordinates) {
                const el = document.createElement('div');
                el.className = 'gem-marker';
                el.style.width = '25px';
                el.style.height = '25px';
                el.style.backgroundSize = 'cover';
                el.style.backgroundImage = 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%233498db\'><path d=\'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z\'/></svg>")';
                
                // Add popup
                const popup = new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<h3>${gem.name}</h3><p>${gem.category}</p>`);
                
                // Add marker to map
                new mapboxgl.Marker(el)
                    .setLngLat(gem.coordinates)
                    .setPopup(popup)
                    .addTo(map);
            }
        });
        
        // Add event listeners to view details buttons
        document.querySelectorAll('.view-details-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const gemId = parseInt(this.getAttribute('data-id'));
                showGemDetails(gemId);
            });
        });
        
        // Add event listeners to save buttons
        document.querySelectorAll('.save-gem-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
                this.style.backgroundColor = '#e3f2fd';
                this.disabled = true;
            });
        });
    }
    
    // Populate community gems
    const communityGemsContainer = document.getElementById('communityGems');
    
    function populateCommunityGems() {
        communityGemsContainer.innerHTML = '';
        
        communityGems.forEach(gem => {
            const gemCard = document.createElement('div');
            gemCard.className = 'gem-card';
            gemCard.innerHTML = `
                <div class="gem-image">
                    <img src="${gem.image}" alt="${gem.name}">
                    <span class="gem-category">${gem.category}</span>
                </div>
                <div class="gem-content">
                    <h3>${gem.name}</h3>
                    <p>${gem.description}</p>
                    <div class="gem-meta">
                        <div class="gem-rating">
                            <i class="fas fa-star"></i>
                            <span>${gem.rating}</span>
                        </div>
                        <div class="gem-location">
                            <i class="fas fa-map-marker-alt"></i>
                            <span>${gem.location}</span>
                        </div>
                    </div>
                    <div class="gem-tags">
                        ${gem.tags.slice(0, 3).map(tag => `<span class="gem-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="contributor">
                        <small>Contributed by: ${gem.contributor}</small>
                    </div>
                </div>
            `;
            communityGemsContainer.appendChild(gemCard);
        });
    }
    
    // Show gem details
    const gemDetailModal = document.getElementById('gemDetailModal');
    const gemDetailBody = document.getElementById('gemDetailBody');
    
    function showGemDetails(gemId) {
        const gem = hiddenGems.find(g => g.id === gemId);
        
        if (!gem) return;
        
        gemDetailBody.innerHTML = `
            <div class="gem-detail-image">
                <img src="${gem.image}" alt="${gem.name}">
            </div>
            <div class="gem-detail-info">
                <h2>${gem.name}</h2>
                <div class="gem-detail-meta">
                    <span><i class="fas fa-map-marker-alt"></i> ${gem.location}</span>
                    <span><i class="fas fa-star"></i> ${gem.rating} rating</span>
                    <span><i class="fas fa-tag"></i> ${gem.category}</span>
                    <span><i class="fas fa-user"></i> Shared by ${gem.contributor}</span>
                </div>
                <div class="gem-detail-description">
                    <p>${gem.fullDescription || gem.description}</p>
                </div>
                <div class="gem-detail-tags">
                    ${gem.tags.map(tag => `<span class="gem-detail-tag">${tag}</span>`).join('')}
                </div>
                <div class="gem-detail-map" id="detailMap"></div>
                <div class="gem-detail-tips">
                    <h3><i class="fas fa-lightbulb"></i> Insider Tips</h3>
                    <ul>
                        ${gem.tips.map(tip => `<li>${tip}</li>`).join('')}
                    </ul>
                </div>
                <div class="gem-detail-actions">
                    <button class="gem-detail-btn save-detail-btn">
                        <i class="far fa-bookmark"></i> Save to My Places
                    </button>
                    <button class="gem-detail-btn directions-btn">
                        <i class="fas fa-directions"></i> Get Directions
                    </button>
                </div>
            </div>
        `;
        
        gemDetailModal.classList.add('active');
        
        // Initialize detail map
        setTimeout(() => {
            if (gem.coordinates) {
                const detailMap = new mapboxgl.Map({
                    container: 'detailMap',
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: gem.coordinates,
                    zoom: 14
                });
                
                // Add marker
                new mapboxgl.Marker()
                    .setLngLat(gem.coordinates)
                    .addTo(detailMap);
            }
        }, 100);
        
        // Add event listener to save button
        const saveDetailBtn = gemDetailModal.querySelector('.save-detail-btn');
        saveDetailBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-bookmark"></i> Saved to My Places';
            this.style.backgroundColor = '#e3f2fd';
            this.disabled = true;
        });
        
        // Add event listener to directions button
        const directionsBtn = gemDetailModal.querySelector('.directions-btn');
        directionsBtn.addEventListener('click', function() {
            alert('Directions feature would open in maps app');
        });
    }
    
    // Close gem detail modal
    const closeDetailBtn = document.querySelector('.close-detail');
    closeDetailBtn.addEventListener('click', function() {
        gemDetailModal.classList.remove('active');
    });
    
    // Filter functionality
    const destinationFilter = document.getElementById('destinationFilter');
    const filterTags = document.querySelectorAll('.filter-tag');
    const sortFilter = document.getElementById('sortFilter');
    
    function applyFilters() {
        const destination = destinationFilter.value;
        const category = document.querySelector('.filter-tag.active').getAttribute('data-filter');
        const sortBy = sortFilter.value;
        
        let filteredGems = [...hiddenGems];
        
        // Apply destination filter
        if (destination !== 'all') {
            filteredGems = filteredGems.filter(gem => gem.location.toLowerCase().includes(destination.toLowerCase()));
        }
        
        // Apply category filter
        if (category !== 'all') {
            filteredGems = filteredGems.filter(gem => gem.category === category || gem.tags.includes(category));
        }
        
        // Apply sorting
        if (sortBy === 'rating') {
            filteredGems.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'popularity') {
            // For demo purposes, we'll just use a random sort
            filteredGems.sort(() => Math.random() - 0.5);
        }
        
        // Update the grid
        populateGemsGrid(filteredGems);
    }
    
    // Event listeners for filters
    destinationFilter.addEventListener('change', applyFilters);
    sortFilter.addEventListener('change', applyFilters);
    
    filterTags.forEach(tag => {
        tag.addEventListener('click', function() {
            filterTags.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            applyFilters();
        });
    });
    
    // AI Recommendations
    const getGemRecommendationsBtn = document.getElementById('getGemRecommendations');
    const gemAiResults = document.getElementById('gemAiResults');
    const loadingOverlay = document.getElementById('loadingOverlay');
    
    getGemRecommendationsBtn.addEventListener('click', async function() {
        const preferences = document.getElementById('gemPreferences').value;
        const timeAvailable = document.getElementById('gemTimeAvailable').value;
        
        if (!preferences) {
            alert('Please enter your preferences');
            return;
        }
        
        // Show loading overlay
        loadingOverlay.classList.add('active');
        
        try {
            // In a real implementation, this would call the OpenAI API
            // For this demo, we'll simulate the API call
            
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Generate recommendations based on preferences
            const recommendations = generateAIRecommendations(preferences, timeAvailable);
            
            // Display recommendations
            gemAiResults.innerHTML = '';
            recommendations.forEach(rec => {
                const recCard = document.createElement('div');
                recCard.className = 'ai-gem-card';
                recCard.innerHTML = `
                    <h3>${rec.name}</h3>
                    <p>${rec.description}</p>
                    <div class="ai-gem-tags">
                        ${rec.tags.map(tag => `<span class="ai-gem-tag">${tag}</span>`).join('')}
                    </div>
                `;
                gemAiResults.appendChild(recCard);
            });
            
            gemAiResults.classList.add('active');
        } catch (error) {
            console.error('Error getting AI recommendations:', error);
            alert('Error getting recommendations. Please try again.');
        } finally {
            // Hide loading overlay
            loadingOverlay.classList.remove('active');
        }
    });
    
    // Function to generate AI recommendations (simulated)
    function generateAIRecommendations(preferences, timeAvailable) {
        const lowerPreferences = preferences.toLowerCase();
        
        // Generate recommendations based on preferences
        if (lowerPreferences.includes('temple') || lowerPreferences.includes('spiritual')) {
            return [
                {
                    name: 'Otagi Nenbutsu-ji Temple',
                    description: 'A hidden temple with 1,200 unique stone statues, each with its own expression. Located in the western outskirts of Kyoto, this temple is often overlooked by tourists.',
                    tags: ['temple', 'spiritual', 'peaceful', 'art']
                },
                {
                    name: 'Fushimi Inari Hidden Shrine',
                    description: 'A small, peaceful shrine hidden away from the main Fushimi Inari tourist path. Located halfway up the mountain, few tourists venture here.',
                    tags: ['shrine', 'spiritual', 'hiking', 'nature']
                }
            ];
        } else if (lowerPreferences.includes('food') || lowerPreferences.includes('cafe')) {
            return [
                {
                    name: 'Pontocho Back Alley Izakaya',
                    description: 'A tiny traditional izakaya (Japanese pub) hidden in the back alleys of Pontocho. Known for authentic local dishes and friendly atmosphere.',
                    tags: ['food', 'authentic', 'local', 'drinks']
                },
                {
                    name: 'Riverside Matcha Cafe',
                    description: 'A small cafe overlooking the Kamo River specializing in creative matcha desserts and traditional tea ceremony experiences.',
                    tags: ['cafe', 'matcha', 'dessert', 'river view']
                }
            ];
        } else if (lowerPreferences.includes('view') || lowerPreferences.includes('sunset')) {
            return [
                {
                    name: 'Tatsumi Bridge at Sunset',
                    description: 'A small bridge in Gion that offers the most magical sunset views over the river. Popular with photographers but often overlooked by regular tourists.',
                    tags: ['sunset', 'photography', 'scenic', 'river']
                },
                {
                    name: 'Shogunzuka Viewpoint',
                    description: 'A lesser-known hilltop viewpoint offering panoramic views of Kyoto city. Especially beautiful at sunset or during cherry blossom season.',
                    tags: ['viewpoint', 'panorama', 'sunset', 'photography']
                }
            ];
        } else {
            // Default recommendations
            return [
                {
                    name: 'Kyoto Artisan Alley',
                    description: 'A narrow alleyway where traditional craftsmen still practice ancient techniques. Watch artisans create pottery, textiles, and woodwork in their small workshops.',
                    tags: ['crafts', 'shopping', 'cultural', 'authentic']
                },
                {
                    name: 'Philosopher\'s Path Secret Garden',
                    description: 'A secluded garden off the famous Philosopher\'s Path, known only to locals. This tranquil spot offers beautiful seasonal flowers and a small tea house.',
                    tags: ['garden', 'peaceful', 'tea', 'nature']
                }
            ];
        }
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
    
    // Initialize the page
    populateGemsGrid(hiddenGems);
    populateCommunityGems();
});
