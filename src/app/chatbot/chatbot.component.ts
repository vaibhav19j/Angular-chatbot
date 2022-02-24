import { Component, OnInit } from '@angular/core';
import {webSocket} from 'rxjs/webSocket';

const dialogflowURL = 'https://us-central1-fireship-lessons.cloudfunctions.net/dialogflowGateway';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  messages = [];
  loading = false;

  // Random ID to maintain session with server http://ztyco01dxw00.globant.com/
  private subject = webSocket('ws://ztyco01dxw00.globant.com:8080/push');

  ngOnInit(): void {
    this.subject.next('initial'); // <- ping first message
    this.subject.subscribe(message => {       // <- listen messages from server
      this.addBotMessage(message);
    
    });  
}

  

  handleUserMessage(event) {
    console.log(event);
    const text = event.message;
    this.addUserMessage(text);

    // this.loading = true;

    // Make an HTTP Request
   this.subject.next(text);
  }


  // Helpers

  addUserMessage(text) {
    this.messages.push({
      text,
      sender: 'You',
      reply: true,
      date: new Date()
    });
  }

  addBotMessage(text) {
    this.messages.push({
      text,
      sender: 'Bot',
      avatar: 'assets/bot.jpeg',
      date: new Date()
    });
  }

}
