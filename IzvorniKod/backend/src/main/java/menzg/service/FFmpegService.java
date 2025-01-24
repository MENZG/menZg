package menzg.service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;

@Service
public class FFmpegService {

	private static final Logger logger = LoggerFactory.getLogger(FFmpegService.class);
	private final String inputUrl = "rtsp://menza:FenzaFer9@161.53.65.70:554/Streaming/channels/101";
	private final String outputUrl = "rtmp://global-live.mux.com:5222/app/2ff4bbc6-0336-f1e3-95fd-94f81aa1fb08";
	private final Map<String, Process> processMap = new ConcurrentHashMap<>();
	private final ExecutorService executorService = Executors.newSingleThreadExecutor();

	@PostConstruct
	public void startStreamingOnStartup() {
		try {
			startStreaming(inputUrl, outputUrl);
			logger.info("Streaming started automatically on application startup.");
		} catch (IOException e) {
			logger.error("Error starting stream: {}", e.getMessage());
		}
	}

	@PreDestroy
	public void stopStreamingOnShutdown() {
		stopStreaming(outputUrl);
		stopExecutorService();
		logger.info("Streaming stopped automatically on application shutdown.");
	}

	public String startStreaming(String inputUrl, String outputUrl) throws IOException {
		if (processMap.containsKey(outputUrl) && processMap.get(outputUrl).isAlive()) {
			return "Stream is already running.";
		}

		String os = System.getProperty("os.name").toLowerCase();
		String command = String.format("ffmpeg -i %s -f flv %s", inputUrl, outputUrl);

		ProcessBuilder processBuilder = new ProcessBuilder();
		if (os.contains("win")) {
			processBuilder.command("cmd.exe", "/c", command);
		} else if (os.contains("mac") || os.contains("nix") || os.contains("nux")) {
			processBuilder.command("bash", "-c", command);
		} else {
			throw new UnsupportedOperationException("Unsupported OS: " + os);
		}

		processBuilder.redirectErrorStream(true);
		processBuilder.redirectOutput(ProcessBuilder.Redirect.INHERIT);

		executorService.submit(() -> {
			try {
				Process process = processBuilder.start();
				processMap.put(outputUrl, process);
				process.waitFor();
			} catch (IOException | InterruptedException e) {
				logger.error("Streaming process error: {}", e.getMessage());
				Thread.currentThread().interrupt();
			}
		});

		return "Stream started successfully.";
	}

	public void stopStreaming(String outputUrl) {
		Process process = processMap.get(outputUrl);
		if (process != null) {
			process.destroy();
			try {
				process.waitFor();
			} catch (InterruptedException e) {
				logger.error("Error while waiting for process to terminate: {}", e.getMessage());
				Thread.currentThread().interrupt();
			}
			processMap.remove(outputUrl);
		}
	}

	private void stopExecutorService() {
		executorService.shutdown();
		try {
			if (!executorService.awaitTermination(5, TimeUnit.SECONDS)) {
				executorService.shutdownNow();
			}
		} catch (InterruptedException e) {
			executorService.shutdownNow();
			Thread.currentThread().interrupt();
		}
	}
}
