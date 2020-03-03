const TypeWriter = function(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);  // base 10 = 0-9 (1:1 in milliseconds)
    this.type(); // repeated infinitely
    this.isDeleting = false;
}

// Type Method

TypeWriter.prototype.type = function() {
    // Current index of word (list) -- 3%3 resets back to 0
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fulltxt = this.words[current];
    // Check is in deleting state

    if(this.isDeleting) {
        //Remove Char
        this.txt = fulltxt.substring(0, this.txt.length -1)
    }
    else {
        // Add Char (H, He, Hel, Help)
        this.txt = fulltxt.substring(0, this.txt.length +1)
    }

    // Insert txt into Element
    this.txtElement.innerHTML =  `<span class ="txt">${this.txt}</span>`; // backtick format

    // Type Speed - higher # is slower 300ms or 3 seconds
    let typeSpeed = 300;
    if(this.isDeleting) {
        typeSpeed /= 2
    }

    // If word is complete
    if(!this.isDeleting && this.txt === fulltxt) {
        //pause at end and switch to delete
        typeSpeed = this.wait;
        this.isDeleting = true;
    }
    else if(this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        // Move to next word
        this.wordIndex++;
        // Pause before typing new
        typeSpeed = 500;
    }

    // keeps calling type() to loop with delay
    setTimeout(() => this.type(), typeSpeed);
}

// Initializing on DOM Load

document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');
    // Init Type Writer
    new TypeWriter(txtElement, words, wait);


}
