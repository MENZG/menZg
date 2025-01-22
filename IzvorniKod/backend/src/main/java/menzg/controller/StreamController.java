package menzg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import menzg.service.FFmpegService;

@RestController
@RequestMapping("/stream")
public class StreamController {

	@Autowired
	private FFmpegService ffmpegService;

	@PostMapping("/start")
	public ResponseEntity<String> startStream() {

		System.out.println("\n\n\n\n");

		String inputUrl = "rtsp://menza:FenzaFer9@161.53.65.70:554/Streaming/channels/101";

		String outputUrl = "rtmp://global-live.mux.com:5222/app/2ff4bbc6-0336-f1e3-95fd-94f81aa1fb08";

		System.out.println("input url je " + inputUrl);

		System.out.println("output url je " + outputUrl);

		System.out.println("zahtijevano je pocinjanje streama ------------- ");
		try {
			String message = ffmpegService.startStreaming(inputUrl, outputUrl);
			return ResponseEntity.ok(message);

		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Failed to start streaming: " + e.getMessage());
		}
	}
}