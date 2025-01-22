package menzg.service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

@Service
public class FFmpegService {

	private final String inputUrl = "rtsp://menza:FenzaFer9@161.53.65.70:554/Streaming/channels/101";
	private final String outputUrl = "rtmp://global-live.mux.com:5222/app/2ff4bbc6-0336-f1e3-95fd-94f81aa1fb08";

	// private static final String WINDOWS_FFMPEG = "ffmpeg_windows.exe";
	// private static final String MACOS_FFMPEG = "ffmpeg_mac";

	private final Map<String, Process> processMap = new ConcurrentHashMap<>();

	public String startStreaming() throws IOException {

		if (processMap.containsKey(outputUrl) && processMap.get(outputUrl).isAlive()) {

			return "stream je vec u tijeku ------";
		}

		String os = System.getProperty("os.name").toLowerCase();

		System.out.println("ovo pokreces na operacijskom sustavu " + os);

		String command;

		command = String.format("ffmpeg -i %s -f flv %s", inputUrl, outputUrl);

		System.out.println("koristis os ----------->   " + os);

		System.out.println("puna naredba je ");

		System.out.println(command);

		ProcessBuilder processBuilder = new ProcessBuilder();

		if (os.contains("win")) {

			// windows racunala naredba
			command = String.format("ffmpeg -i %s -f flv %s", inputUrl, outputUrl);
			processBuilder.command("cmd.exe", "/c", command);

		} else {

			// neka druga racunala naredba

			command = String.format("ffmpeg -i %s -f flv %s", inputUrl, outputUrl);
			processBuilder.command("sh", "-c", command);
		}

		System.out.println("Koristite OS: " + os);
		System.out.println("Puna naredba: " + command);

		Process process = processBuilder.start();
		processBuilder.redirectErrorStream(true);
		processBuilder.redirectOutput(ProcessBuilder.Redirect.INHERIT);
		processMap.put(outputUrl, process);

		System.out.println("Je li proces aktivan nakon pokretanja? ----->  " + process.isAlive());

		System.out.println();

		System.out.println("cijela proces mapa je \n" + processMap);

		return "stream je zapoceo valjda -----";
	}

	public void stopStreaming(String outputUrl) {
		Process process = processMap.get(outputUrl);
		if (process != null) {
			process.destroy();
			processMap.remove(outputUrl);
		}
	}
}