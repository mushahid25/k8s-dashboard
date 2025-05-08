document.addEventListener('DOMContentLoaded', function() {
    // Initialize code highlighting
    hljs.highlightAll();
    
    // Navigation functionality
    const navItems = document.querySelectorAll('nav ul li');
    const contentSections = document.querySelectorAll('.content');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Update active nav item
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding content
            const contentId = this.getAttribute('data-content');
            contentSections.forEach(section => section.classList.remove('active'));
            document.getElementById(contentId).classList.add('active');
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 992) {
                document.querySelector('.sidebar').classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        });
    });
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.querySelector('.toggle-sidebar');
    sidebarToggle.addEventListener('click', function() {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('active');
        document.body.classList.toggle('sidebar-open');
    });
    
    // Dark mode toggle
    const modeToggle = document.querySelector('.mode-toggle');
    modeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        // Update icon
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const activeContent = document.querySelector('.content.active');
        
        if (searchTerm.length < 2) {
            // Reset search highlights
            const highlighted = activeContent.querySelectorAll('.search-highlight');
            highlighted.forEach(el => {
                el.outerHTML = el.innerHTML;
            });
            return;
        }
        
        // Get all text nodes within command blocks and headings
        const commandBlocks = activeContent.querySelectorAll('.command-block pre code, h3, h4');
        
        commandBlocks.forEach(block => {
            // Remove previous highlights
            if (block.innerHTML.includes('<span class="search-highlight">')) {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = block.innerHTML;
                const highlights = tempDiv.querySelectorAll('.search-highlight');
                highlights.forEach(el => {
                    el.outerHTML = el.innerHTML;
                });
                block.innerHTML = tempDiv.innerHTML;
            }
            
            // Add new highlights
            if (block.textContent.toLowerCase().includes(searchTerm)) {
                // Scroll this element into view
                block.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                // Highlight the matching text
                const regex = new RegExp(searchTerm, 'gi');
                block.innerHTML = block.innerHTML.replace(regex, match => 
                    `<span class="search-highlight" style="background-color: yellow; color: black;">${match}</span>`
                );
            }
        });
    });
    
    // Handle clicks outside sidebar to close it on mobile
    document.addEventListener('click', function(event) {
        if (window.innerWidth <= 992) {
            const sidebar = document.querySelector('.sidebar');
            const sidebarToggle = document.querySelector('.toggle-sidebar');
            
            if (sidebar.classList.contains('active') && 
                !sidebar.contains(event.target) && 
                !sidebarToggle.contains(event.target)) {
                sidebar.classList.remove('active');
                document.body.classList.remove('sidebar-open');
            }
        }
    });
    
    // Smooth scroll for TOC links
    const tocLinks = document.querySelectorAll('.toc a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
});