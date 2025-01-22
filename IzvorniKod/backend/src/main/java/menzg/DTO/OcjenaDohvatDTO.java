package menzg.DTO;

import lombok.Data;

@Data
public class OcjenaDohvatDTO {
    private int hranaRating;
    private int ljubaznostRating;
    private int ambijentRating;
    private int lokacijaRating;
    private Long idKorisnik;
    private Long idMenza;


    public OcjenaDohvatDTO(int hranaRating, int ljubaznostRating, int ambijentRating, int lokacijaRating, Long idKorisnik, Long idMenza){
        this.hranaRating = hranaRating;
        this.ljubaznostRating = ljubaznostRating;
        this.ambijentRating = ambijentRating;
        this.lokacijaRating = lokacijaRating;
        this.idKorisnik = idKorisnik;
        this.idMenza = idMenza;
    }
    public OcjenaDohvatDTO(){

    }
}
