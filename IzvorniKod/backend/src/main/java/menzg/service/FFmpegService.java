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

		String ffmpegExecutable = "AAAAA";

		String os = System.getProperty("os.name").toLowerCase();

		boolean osOk = false;

		if (os.contains("win")) {
			ffmpegExecutable = "src/main/resources/ffmpeg/" + WINDOWS_FFMPEG;

			osOk = true;

		} else if (os.contains("mac")) {
			ffmpegExecutable = "src/main/resources/ffmpeg/" + MACOS_FFMPEG;
			osOk = true;
		} else {

			System.out.println("NIJE MAC NIJE WINDOWS LAPTOP");
			osOk = false;
		}

		String command;

		if (osOk) {
			File ffmpegFile = new File(ffmpegExecutable);
			if (os.contains("mac") && !ffmpegFile.canExecute()) {
				ffmpegFile.setExecutable(true);
			}

			command = String.format("%s -i %s -f flv %s", ffmpegFile.getAbsolutePath(), inputUrl, outputUrl);

		} else {

			System.out.println("mozda pronadjem ffmpeg naredbu u sustavu??? \n\n");

			command = String.format("ffmpeg -i %s -f flv %s", inputUrl, outputUrl);

		}

		System.out.println("koristis os ----------->   " + os);

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