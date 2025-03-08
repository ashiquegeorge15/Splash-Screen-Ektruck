window.onload = function () {
    Particles.init({
        selector: ".background",
        color: ["#ff0000", "#ffffff", "#00ff99", "#33ccff"],
        connectParticles: true,
        maxParticles: 200,
        sizeVariations: 6,
        speed: 2,
        minDistance: 80,
        size: {
            value: 4,
            random: true,
            anim: {
                enable: true,
                speed: 5,
                size_min: 1,
                sync: false
            }
        },
        opacity: {
            value: 0.9,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                opacity_min: 0.4,
                sync: false
            }
        },
        move: {
            enable: true,
            speed: 2.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: true,
            attract: {
                enable: true,
                rotateX: 1000,
                rotateY: 1800
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.6,
            width: 2
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    maxParticles: 120,
                    color: ["#ff0000", "#ffffff", "#00ff99", "#33ccff"],
                    connectParticles: true,
                    size: {
                        value: 3,
                        random: true
                    }
                }
            }
        ]
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const splash = document.querySelector('.splash');
    const splashLogo = document.querySelector('.splash-logo');
    const changingText = document.querySelector('.changing-text');
    const logo = document.querySelector('.logo');
    
    // Array of text to display
    const texts = ['ek', 'one', 'ஒன்று', 'ಒಂದು', 'एक', 'ek'];
    let currentIndex = 0;

    // Create truck text with registered symbol after 'k'
    const truckText = document.createElement('div');
    truckText.className = 'truck-text';
    truckText.innerHTML = '<sub style="font-size: 170px">truck</sub><sup style="font-size: 30px">®</sup>';
    
    // Add to logo
    logo.appendChild(truckText);

    // Add tire elements
    const frontTire = document.createElement('div');
    frontTire.className = 'tire front-tire';
    
    const rearTire1 = document.createElement('div');
    rearTire1.className = 'tire rear-tire-1';
    
    const rearTire2 = document.createElement('div');
    rearTire2.className = 'tire rear-tire-2';
    
    logo.appendChild(frontTire);
    logo.appendChild(rearTire1);
    logo.appendChild(rearTire2);

    // Initially hide the logo
    logo.style.display = 'none';

    function fitText(element, text) {
        const logoWidth = logo.offsetWidth - 20;
        const logoHeight = logo.offsetHeight - 20;
        let fontSize = 100;
        
        // Create temporary span to measure text
        const temp = document.createElement('span');
        temp.style.visibility = 'hidden';
        temp.style.position = 'absolute';
        temp.style.whiteSpace = 'nowrap';
        temp.style.fontFamily = "Inter";
        temp.style.letterSpacing = '2px';
        temp.innerHTML = text;
        document.body.appendChild(temp);

        // Binary search for the best fitting font size
        let min = 1;
        let max = 200;
        
        while (min <= max) {
            fontSize = Math.floor((min + max) / 2);
            temp.style.fontSize = fontSize + 'px';
            
            if (temp.offsetWidth <= logoWidth && temp.offsetHeight <= logoHeight) {
                min = fontSize + 1;
            } else {
                max = fontSize - 1;
            }
        }

        // Set the calculated font size
        const finalSize = fontSize - 5;
        element.style.fontSize = finalSize + 'px';
        // Update truck text size to match
        truckText.style.fontSize = finalSize + 'px';
        document.body.removeChild(temp);
    }

    function changeText() {
        if (currentIndex < texts.length) {
            changingText.textContent = texts[currentIndex];
            fitText(changingText, texts[currentIndex]);
            currentIndex++;
            
            if (currentIndex < texts.length) {
                setTimeout(changeText, 800); // 800ms delay between changes
            }
        }
    }

    function showFinalContent() {
        const stackingTexts = document.querySelectorAll('.stacking-text');
        const finalContent = document.querySelector('.final-content');
        const finalLogo = document.querySelector('.final-logo');
        const futureText = document.querySelector('.future-text');

        stackingTexts.forEach((text, index) => {
            const characters = text.textContent.split('');
            text.textContent = '';
            characters.forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char;
                const direction = charIndex % 2 === 0 ? '100vw' : '-100vw';
                span.style.setProperty('--split-direction', direction);
                text.appendChild(span);
            });

            setTimeout(() => {
                text.classList.add('exit');
                // Remove the element after animation completes
                text.addEventListener('animationend', () => {
                    text.style.display = 'none'; // Hide the element after animation
                }, { once: true }); // Ensure event listener runs only once
            }, index * 200);
        });

        // After stacking text disperses, show and animate the logo
        setTimeout(() => {
            logo.style.display = 'flex'; // Show the logo
            logo.style.animation = 'boxGrowFromTop 1s ease-out forwards';
            
            // Start text changes after box grows
            setTimeout(changeText, 1000);
            setTimeout(addTruck, 5000);
        }, 2000);
    }

    function showStackingText() {
        const container = document.querySelector('.stacking-container');
        const texts = container.querySelectorAll('.stacking-text');
        
        container.style.display = 'block';
        
        // Animate each text line with delay
        texts.forEach((text, index) => {
            setTimeout(() => {
                text.classList.add('animate');
            }, index * 1000);
        });

        // Start final content animation after last text appears
        setTimeout(showFinalContent, texts.length * 1000 + 1500);
    }

    function addTruck() {
        // Create container for truck and registered symbol
        const truckContainer = document.createElement('div');
        truckContainer.className = 'truck-container';
        truckContainer.style.position = 'absolute';
        truckContainer.style.left = '100vw';
        truckContainer.style.bottom = '10px';
        
        // Add truck text
        truckText.style.display = 'block';
        truckText.style.position = 'relative';
        truckText.style.left = '0';
        
        // Create registered symbol and add it to truck text
        const regSymbol = document.createElement('span');
        regSymbol.innerHTML = '®';
        regSymbol.className = 'registered-symbol';
        regSymbol.style.position = 'absolute';
        regSymbol.style.right = '-15px';
        regSymbol.style.top = '0';
        regSymbol.style.fontSize = '12px';
        truckText.appendChild(regSymbol);
        
        // Add elements to container
        truckContainer.appendChild(truckText);
        
        // Add container to logo
        logo.appendChild(truckContainer);
        
        // Add slide-in animation to container
        truckContainer.classList.add('slide-in');

        // Add sliding animation to registered symbol after truck joins
        setTimeout(() => {
            regSymbol.classList.add('slide-in');
        }, 2200);

        // Rest of the animations remain the same
        setTimeout(() => {
            // Show front tire
            frontTire.style.display = 'block';
            frontTire.classList.add('slide-up');
            
            // Show rear tire 1
            setTimeout(() => {
                rearTire1.style.display = 'block';
                rearTire1.classList.add('slide-up');
            }, 200);
            
            // Show rear tire 2
            setTimeout(() => {
                rearTire2.style.display = 'block';
                rearTire2.classList.add('slide-up');
                
                // After the last wheel appears, show the tagline
                setTimeout(() => {
                    const tagline = document.querySelector('.ektruck-tagline');
                    tagline.classList.add('show');
                    
                    // Wait longer before starting exit animations
                    setTimeout(() => {
                        // Add exit animation to tagline
                        tagline.classList.add('exit');
                        
                        // Start ektruck exit after tagline animation starts
                        setTimeout(() => {
                            document.querySelector('.ektruck-container').classList.add('exit');
                            setTimeout(showStackingText, 2000);
                        }, 500);
                    }, 2000); // Wait 2 seconds before exit animations
                }, 1000);
            }, 400);
        }, 1800);
    }

    // Add typewriter function with cursor animation
    function typeWriter(element, text, index, speed) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(() => typeWriter(element, text, index, speed), speed);
        } else {
            // Add blinking cursor after typing is complete
            element.style.borderRight = '2px solid #ffffff';
            setInterval(() => {
                element.style.borderRight = element.style.borderRight === '2px solid #ffffff' ? 
                    '2px solid transparent' : '2px solid #ffffff';
            }, 700);
        }
    }

    // Start with stacking text only
    setTimeout(showStackingText, 1000);
});
