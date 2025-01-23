package menzg.service;

import java.io.IOException;
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
			startStreaming(inputUrl, outputUrl);
			System.out.println("Streaming started automatically on application startup.");
		} catch (IOException e) {
			System.err.println("Error starting stream: " + e.getMessage());
		}
	}

	@PreDestroy
	public void stopStreamingOnShutdown() {
		stopStreaming(outputUrl);
		System.out.println("Streaming stopped automatically on application shutdown.");
	}

	public String startStreaming(String inputUrl, String outputUrl) throws IOException {

		System.out.println("start streaming pozvana --------------------\n");

		if (processMap.containsKey(outputUrl) && processMap.get(outputUrl).isAlive()) {
			return "Stream is already running.";
		}

		String os = System.getProperty("os.name").toLowerCase();
		String command = String.format("ffmpeg -i %s -f flv %s", inputUrl, outputUrl);

		System.out.println("tvoj os je " + os);

		ProcessBuilder processBuilder = new ProcessBuilder();
		if (os.contains("win")) {
			processBuilder.command("cmd.exe", "/c", command);
		} else if (os.contains("mac")) {

			processBuilder.command(command);
		} else {

		}

		processBuilder.redirectErrorStream(true);
		processBuilder.redirectOutput(ProcessBuilder.Redirect.INHERIT);

		Process process = processBuilder.start();
		processMap.put(outputUrl, process);

		return process.isAlive() ? "Stream started successfully." : "Failed to start stream.";
	}

	public void stopStreaming(String outputUrl) {
		Process process = processMap.get(outputUrl);
		if (process != null) {
			process.destroy();
			processMap.remove(outputUrl);
		}
	}
}
