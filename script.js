'use strict'

document.addEventListener('DOMContentLoaded', () => {
    const piano = document.querySelector('.piano');
    const pianoKeys = document.querySelectorAll('.piano-key');
    const btnNotes = document.querySelector('.btn-notes');
    const btnLetters = document.querySelector('.btn-letters');
    const btnFullScreen = document.querySelector('.openfullscreen');

    pianoKeys.forEach(key => key.addEventListener('transitionend', removeTransition));

    function removeTransition(e) {
        if (e.propertyName !== 'transform') return;
        this.classList.remove('piano-key-active');
    }

    function playAudio(audio) {
        audio.currentTime = 0;
        audio.play();
    }

    function removeActiveClass() {
        pianoKeys.forEach(item => {
            item.classList.remove('piano-key-active');
        });
    }

    let isMouseDown = false;
    function playByMouse(e) {
        if (e.target.classList.contains('piano-key')) {
            if (e.type === 'mousedown') isMouseDown = true;
            if (!isMouseDown) return;

            removeActiveClass();
            e.target.classList.add('piano-key-active');
            const note = e.target.dataset.note;
            const audio = document.querySelector(`audio[data-note="${note}"]`);
            playAudio(audio);
        }
    }

    function playByKey(e) {
        const letter = e.code.slice(-1);
        const audio = document.querySelector(`audio[data-letter="${letter}"]`);
        const key = document.querySelector(`div[data-letter="${letter}"]`)
        if (!audio) return;
        removeActiveClass();
        key.classList.add('piano-key-active');
        playAudio(audio);
    }

    function showLetters(e) {
        e.target.classList.add('btn-active');
        btnNotes.classList.remove('btn-active');
        pianoKeys.forEach(item  =>  {
            item.classList.add('letter')
        });
    }

    function showNotes(e) {
        e.target.classList.add('btn-active');
        btnLetters.classList.remove('btn-active');
        pianoKeys.forEach(item => {
            item.classList.remove('letter')
        });
    }

    function toggleFullScreen() {
        !document.fullscreenElement ? document.documentElement.requestFullscreen() :  document.exitFullscreen();
    }

    document.addEventListener('mouseup', () => isMouseDown = false);
    btnFullScreen.addEventListener('click', toggleFullScreen);
    btnLetters.addEventListener('click', showLetters);
    btnNotes.addEventListener('click', showNotes);
    piano.addEventListener('mousedown', playByMouse);
    piano.addEventListener('mouseover', playByMouse);
    window.addEventListener('keydown', playByKey);
});



