package menzg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import menzg.service.FFmpegService;

@RestController
@RequestMapping("/stream")
public class StreamController {

	@Autowired
	private FFmpegService ffmpegService;

	@PostMapping("/start")
	public String startStream(@RequestParam String inputUrl, @RequestParam String outputUrl) {

		System.out.println("input url je " + inputUrl);

		System.out.println("output url je " + outputUrl);

		System.out.println("zahtijevano je pocinjanje streama ------------- ");
		try {
			ffmpegService.startStreaming(inputUrl, outputUrl);
			return "Streaming started successfully!";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error starting streaming: " + e.getMessage();
		}
	}
}