document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('snap-section');
    const snapContainer = document.querySelector('snap-container');
    const snapDotsContainer = document.querySelector('snap-dots');

    // Create dots
    if (snapDotsContainer) {
        sections.forEach((section, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.dataset.index = index;
            if (index === 0) {
                dot.classList.add('active'); // First section is active by default
            }
            dot.addEventListener('click', () => {
                section.scrollIntoView({ behavior: 'smooth' });
            });
            snapDotsContainer.appendChild(dot);
        });
    }
    const dots = snapDotsContainer ? snapDotsContainer.querySelectorAll('.dot') : [];

    const observerOptions = {
        root: snapContainer, 
        rootMargin: '0px',
        threshold: 0.6 
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            const targetIndex = Array.from(sections).indexOf(entry.target);
            if (entry.isIntersecting) {
                sections.forEach(s => s.classList.remove('active-section'));
                entry.target.classList.add('active-section');

                if (dots.length > 0) {
                    dots.forEach(d => d.classList.remove('active'));
                    if (dots[targetIndex]) {
                        dots[targetIndex].classList.add('active');
                    }
                }
            } else {
                // Optional: remove active class if section is not intersecting
                // entry.target.classList.remove('active-section');
                // if (dots.length > 0 && dots[targetIndex]) {
                //     dots[targetIndex].classList.remove('active');
                // }
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    if (sections.length > 0) {
        sections[0].classList.add('active-section'); // Ensure first section is active on load
        if (dots.length > 0 && dots[0]){
             dots[0].classList.add('active'); // And its dot
        }
    }
});
