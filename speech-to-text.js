/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class SpeechToText extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          padding: 10px;
        }
        #start-recording-button {
          visibility: var(--start-recording-visibility, hidden);
        }
        #stop-recording-button {
          visibility: var(--stop-recording-visibility, hidden);
        }
        #iterm-results {
          visibility: var(--iterm-results-visibility, hidden);
        }
        #final-results {
          visibility: var(--final-results-visibility, hidden);
        }
      </style>

      <button id='start-recording-button' on-click="startRecording">Start</button>
      <button id='stop-recording-button'on-click="stopRecording">Stop</button>
      <p id='iterm-results'>[[iterm]]</p>
      <p id='final-results'>[[final]]</p>
    `;
  }

  static get properties() {
    return {
      iterm: {
        type: String,
        notify: true,
        readOnly: false,
        reflectToAttribute: true

      },
      final: {
        type: String,
        notify: true,
        readOnly: false,
        reflectToAttribute: true
      },
      recording: {
        type: Boolean,
        notify: true,
        readOnly: false,
        observer: '_toggleRecording'
      }
    };
  }

  constructor() {
    super();
    this.iterm = ''
    this.final = ''
  }



  ready() {
    super.ready();
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
    this.recognizer = new SpeechRecognition();
  }

  stopRecording() {
    let { recognizer } = this
    recognizer.stop()
  }

  startRecording() {
    let { recognizer } = this
    // var speechRecognitionList = new SpeechGrammarList();
    recognizer.lang = 'en-US';
    recognizer.interimResults = true;
    recognizer.maxAlternatives = 1;
    recognizer.continuous = true;
    recognizer.onaudiostart = function(event) {
      console.log(event);
    }
    recognizer.onresult = (event) => {
      for (var i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          this.final = `${this.final} ${event.results[i][0].transcript}`
        } else {
          this.iterm = event.results[i][0].transcript
        }
      }
    }

    recognizer.onerror = function(event) {
      console.log(event);
    }

    recognizer.onnomatch = function(event) {
      console.log(event);
    }
    recognizer.start();
  }

  _toggleRecording(newValue, oldValue) {
    if (this.recording && this.recognizer){
      this.startRecording()
    } else if (!this.recording && this.recognizer) {
      this.stopRecording()
    }
  }
}

window.customElements.define('speech-to-text', SpeechToText);
