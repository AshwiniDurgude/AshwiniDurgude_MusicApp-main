
      const slider = document.querySelector('.slider');
      const slides = document.querySelectorAll('.slide');

      const prevButton = document.getElementById('prevButton');
      const nextButton = document.getElementById('nextButton');
      const slidePrevSong = document.getElementById('slide-prev-song');
      const slideNextSong = document.getElementById('slide-next-song');
      const transitionSongSlider = document.getElementById('transition-sng');

      

      let currentIndex = 0;
      let currentSlide = 1;
      
      // setInterval(() => {
      //       if (currentSlide < slides.length - 2) {
      //           currentIndex = (currentIndex + 1 + slides.length) % slides.length;
      //           showSlide(++currentSlide);
      //           updateSlider();
      //           if(currentSlide === slides.length - 2) {
      //               currentIndex = -1;
      //               currentSlide = 0;
      //           }
      //       }
      //   }, 1000); 

      prevButton.addEventListener('click', () => {
        if (currentSlide > 1) { 
          showSlide(--currentSlide); 
          currentIndex = (currentIndex - 1 + slides.length) % slides.length;
          updateSlider();
        }
        else {
            currentIndex = slides.length - 3
            currentSlide = slides.length - 2;
            showSlide(currentSlide); 
            updateSlider();
          }
      });

      nextButton.addEventListener('click', () => {
        if (currentSlide < slides.length - 2) {
          showSlide(++currentSlide); 
          currentIndex = (currentIndex + 1 + slides.length) % slides.length;
          updateSlider();
        }
        else {
            currentIndex = 0;
            currentSlide = 1;
            showSlide(currentSlide); 
            updateSlider();
        }
      });

      function updateSlider() {
        console.table({currentIndex, currentSlide});
        const translateX = -currentIndex * 33.33;
        slider.style.transform = `translateX(${translateX}%)`;
      }

      function showSlide(index) {
        slides.forEach((slide, i) => {
          slide.classList.remove('previous');
          slide.classList.remove('active');
          slide.classList.remove('next');

          if (i === index - 1) {
            slide.classList.add('previous');
          } else if (i === index) {
            slide.classList.add('active');
          } else if (i === index + 1) {
            slide.classList.add('next');
          }
          currentSlide = index;
        });
      }
      // Trending Song Slider function
      let transitionSongSliderCurrentIndex=0;
      slideNextSong.addEventListener('click', () => {
        if(transitionSongSliderCurrentIndex < 170*11){
            transitionSongSliderCurrentIndex +=170;
        }else
        {
            transitionSongSliderCurrentIndex = 0; 
        }
        transitionSongSlider.style.transform = `translateX(-${transitionSongSliderCurrentIndex}px)`;
        
      });

      slidePrevSong.addEventListener('click', () => {
        if(transitionSongSliderCurrentIndex > 0)
        {
        transitionSongSliderCurrentIndex -=170;
    }else
    {
        transitionSongSliderCurrentIndex = 0;
    }
    transitionSongSlider.style.transform = `translateX(${transitionSongSliderCurrentIndex}px)`;
      });

// showLyrics function
    function showLyrics(){
       let showLyricsDiv = document.getElementById('show-lyrics'); 
       showLyricsDiv.scrollIntoView();
       showLyricsDiv.classList.toggle('disp-none')
      }

      // Song Play Pause function
      const playSong = document.getElementById('playSong');
      const pauseSong = document.getElementById('pauseSong');
      const audioPlay = document.getElementById('audioPlay');
      const audioProgressBar = document.getElementById('audioProgressBar');
      // let audioElement = new Audio('asset/song/Heeriye-song-mp3.mp3');
      playSong.style.display = "none";

      pauseSong.addEventListener('click',function(){
        audioPlay.play();
        pauseSong.style.display = "none";
        playSong.style.display = "inline";
      }); 

      playSong.addEventListener('click',function(){
        audioPlay.pause();
        playSong.style.display = "none";
        pauseSong.style.display = "inline";
      });

      audioPlay.addEventListener('timeupdate', function(){
        const liveTime = audioPlay.currentTime;
        const songDuration = audioPlay.duration;
        const result = (liveTime / songDuration) * 100;
        audioProgressBar.value = result;
        // console.log("ff", result);
      });

      audioProgressBar.addEventListener('input', function(){
        const result = audioProgressBar.value;
        const songDuration  = audioPlay.duration;
        const liveTime = (result / 100) * songDuration;
       audioPlay.currentTime = liveTime;
        
      });
