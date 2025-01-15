package menzg.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
	public String startStream() {

		System.out.println("\n\n\n\n");

		String inputUrl = "rtsp://menza:FenzaFer9@161.53.65.70:554/Streaming/channels/101";

		String outputUrl = "rtmp://global-live.mux.com:5222/app/2ff4bbc6-0336-f1e3-95fd-94f81aa1fb08";

		System.out.println("input url je " + inputUrl);

		System.out.println("output url je " + outputUrl);

		System.out.println("zahtijevano je pocinjanje streama ------------- ");
		try {
			ffmpegService.startStreaming(inputUrl, outputUrl);
			return "Streaming started successfully!!!!!!! \n\n";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error starting streaming!!!!!: " + e.getMessage();
		}
	}
}