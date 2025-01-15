package menzg.service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class FFmpegService {

	private final Map<String, Process> processMap = new ConcurrentHashMap<>();

	public void startStreaming(String inputUrl, String outputUrl) throws IOException {
		String command = String.format("ffmpeg -i %s -f flv %s", inputUrl, outputUrl);

		System.out.println("puna naredba je ");
		System.out.println(command);

		ProcessBuilder processBuilder = new ProcessBuilder();
		processBuilder.command("sh", "-c", command);

		Process process = processBuilder.start();
		processMap.put(outputUrl, process);

		System.out.println();

		System.out.println("cijela proces mapa je \n" + processMap);
	}

	public void stopStreaming(String outputUrl) {
		Process process = processMap.get(outputUrl);
		if (process != null) {
			process.destroy();
			processMap.remove(outputUrl);
		}
	}
}