package menzg.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Service
public class FFmpegService {

	private final String inputUrl = "rtsp://menza:FenzaFer9@161.53.65.70:554/Streaming/channels/101";

	private final String outputUrl = "rtmp://global-live.mux.com:5222/app/2ff4bbc6-0336-f1e3-95fd-94f81aa1fb08";

	private final Map<String, Process> processMap = new ConcurrentHashMap<>();

	@PostConstruct
	public void startStreamingOnStartup() {
		try {
			String result = startStreaming(inputUrl, outputUrl);
			System.out.println("Streaming started automatically on application startup. Result: " + result);
		} catch (IOException e) {
			System.err.println("Error starting stream on startup: " + e.getMessage());
		}
	}

	@PreDestroy
	public void stopStreamingOnShutdown() {
		stopStreaming(outputUrl);
		System.out.println("Streaming stopped automatically on application shutdown.");
	}

	public String startStreaming(String inputUrl, String outputUrl) throws IOException {
		if (processMap.containsKey(outputUrl) && processMap.get(outputUrl).isAlive()) {
			return "Stream is already running.";
		}

		String command = String.format("ffmpeg -i %s -f flv %s", inputUrl, outputUrl);

		ProcessBuilder processBuilder = new ProcessBuilder();
		String os = System.getProperty("os.name").toLowerCase();

		if (os.contains("win")) {
			processBuilder.command("cmd.exe", "/c", command);
		} else {
			// Pretpostavlja se da se koristi Linux ili sličan Unix sustav
			processBuilder.command("bash", "-c", command);
		}

		processBuilder.redirectErrorStream(true); // Kombinira stdout i stderr
		processBuilder.redirectOutput(ProcessBuilder.Redirect.PIPE); // Omogućuje čitanje izlaza

		System.out.println("Pokretanje FFmpeg komande: " + command);

		Process process = processBuilder.start();
		processMap.put(outputUrl, process);

		// Čitanje izlaznih podataka iz procesa
		new Thread(() -> {
			try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
				String line;
				while ((line = reader.readLine()) != null) {
					System.out.println("FFmpeg log: " + line);
				}
			} catch (IOException e) {
				System.err.println("Error reading FFmpeg output: " + e.getMessage());
			}
		}).start();

		return process.isAlive() ? "Stream started successfully." : "Failed to start stream.";
	}

	public void stopStreaming(String outputUrl) {
		Process process = processMap.get(outputUrl);
		if (process != null) {
			process.destroy();
			processMap.remove(outputUrl);
			System.out.println("Streaming stopped for output: " + outputUrl);
		} else {
			System.out.println("No active stream found for output: " + outputUrl);
		}
	}
}
