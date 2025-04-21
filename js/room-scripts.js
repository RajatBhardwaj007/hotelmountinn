// A simplified version of room-scripts.js focused on making the modal work
$(document).ready(function() {
    console.log("Simplified room scripts loaded");
    
    // Hard-coded image paths for each room - fallback approach
    const roomImages = {
      room1: ['main.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
      room2: ['main.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
      room3: ['main.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'],
      room4: ['main.jpg', '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']
    };
    
    // Prepopulate all carousels on page load
    for (let i = 1; i <= 4; i++) {
      const roomFolder = 'room' + i;
      const carouselId = '#roomCarousel' + i;
      prepopulateCarousel(carouselId, roomFolder, roomImages[roomFolder]);
    }
    
    // Function to prepopulate carousel with images
    function prepopulateCarousel(carouselId, roomFolder, images) {
      console.log("Pre-populating carousel:", carouselId);
      const $carousel = $(carouselId);
      const $indicators = $carousel.find('.carousel-indicators');
      const $inner = $carousel.find('.carousel-inner');
      
      // Clear existing content
      $indicators.empty();
      $inner.empty();
      
      // Add indicators and slides
      images.forEach((image, index) => {
        // Add indicator
        $indicators.append(`
          <li data-target="${carouselId}" data-slide-to="${index}" ${index === 0 ? 'class="active"' : ''}></li>
        `);
        
        // Add slide
        $inner.append(`
          <div class="carousel-item item ${index === 0 ? 'active' : ''}">
            <img src="images/${roomFolder}/${image}" class="d-block w-100 img-responsive" alt="Room Image ${index + 1}">
          </div>
        `);
      });
    }
    
    // Direct click handlers - simplified
    $('.room-image img, .image-overlay').on('click', function(e) {
      const modalId = $(this).closest('.room-image').find('img').data('target');
      console.log("Opening modal:", modalId);
      $(modalId).modal('show');
    });
    
    // Add visible test buttons for each modal
    $('.room-item').each(function(index) {
      const roomNum = index + 1;
      $(this).append(`
        <div style="text-align:center; margin-top:10px;">
          <button class="btn btn-danger open-modal-btn" data-modal="#roomModal${roomNum}">
            Open Gallery Modal ${roomNum}
          </button>
        </div>
      `);
    });
    
    // Test button click handler
    $(document).on('click', '.open-modal-btn', function() {
      const modalId = $(this).data('modal');
      console.log("Test button clicked for modal:", modalId);
      $(modalId).modal('show');
    });
    
    // Reset carousel to first slide when modal is closed
    $('.modal').on('hidden.bs.modal', function() {
      const carouselId = $(this).find('.carousel').attr('id');
      $('#' + carouselId).carousel(0);
    });
  });