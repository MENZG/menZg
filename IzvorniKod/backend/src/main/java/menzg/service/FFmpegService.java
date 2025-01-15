package menzg.service;

import java.io.File;
import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class FFmpegService {

	private static final String WINDOWS_FFMPEG = "ffmpeg_windows.exe";
	private static final String MACOS_FFMPEG = "ffmpeg_mac";

	private final Map<String, Process> processMap = new ConcurrentHashMap<>();

	public void startStreaming(String inputUrl, String outputUrl) throws IOException {

		String ffmpegExecutable;

		String os = System.getProperty("os.name").toLowerCase();

		if (os.contains("win")) {
			ffmpegExecutable = "src/main/resources/ffmpeg/" + WINDOWS_FFMPEG;
		} else if (os.contains("mac")) {
			ffmpegExecutable = "src/main/resources/ffmpeg/" + MACOS_FFMPEG;
		} else {
			throw new UnsupportedOperationException("Unsupported OS: " + os);
		}

		File ffmpegFile = new File(ffmpegExecutable);
		if (os.contains("mac") && !ffmpegFile.canExecute()) {
			ffmpegFile.setExecutable(true);
		}

		System.out.println("koristis os ----------->   " + os);

		System.out.println("puna naredba je ");

		String command = String.format("%s -i %s -f flv %s", ffmpegFile.getAbsolutePath(), inputUrl, outputUrl);

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