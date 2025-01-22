package menzg.config;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import menzg.controller.ChatMessage;

@Component
@RequiredArgsConstructor
@Slf4j
public class WebSocketEventListener {

	private final SimpMessageSendingOperations mt; // messagetemplate

	@EventListener
	public void handlWebSocketDisconetListener(SessionDisconnectEvent event) {

		StompHeaderAccessor ha = StompHeaderAccessor.wrap(event.getMessage());
		String username = (String) ha.getSessionAttributes().get("username");

		if (username != null) {

			log.info("user disconekted  ---> ", username);
			var chatMessage = ChatMessage.builder().type(menzg.controller.MessageType.LEAVE).sender(username).build();

			mt.convertAndSend("/topic/public", chatMessage);
		}
	}

}
