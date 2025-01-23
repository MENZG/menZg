package menzg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import menzg.model.Message;

@Controller
public class ChatController {

	@Autowired
	private SimpMessagingTemplate simpMessagingTemplate;

	// Oznaka @MessageMapping povezuje određenu metodu s endpointom (u ovom slučaju
	// "/message").
	// Kad klijent pošalje poruku na endpoint "/message", ova metoda će je obraditi.
	// Oznaka @SendTo označava gdje će se odgovor iz metode slati. U ovom slučaju
	// "/chatroom/public".
	@MessageMapping("/message")
	@SendTo("/chatroom/public")
	public Message receiveMessage(@Payload Message message) {
		// Metoda prima poruku i ispisuje log za praćenje.
		System.out.println("frontend mi salje JAVNU poruku ----------\n");
		// Metoda vraća primljenu poruku, koja će biti poslana svim klijentima povezanim
		// na "/chatroom/public".
		return message;
	}

	@MessageMapping("/private-message")
	public Message recMessage(@Payload Message message) {
		System.out.println("-- frontend salje privatnu poruku  ---" + message.getReceiverName() + " \n");

		simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
		System.out.println(message.toString());
		return message;
	}
}
