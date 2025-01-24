package menzg.DTO;

import lombok.Data;

@Data
public class OcjenaDTO {
    private int hranaRating;
    private int ljubaznostRating;
    private int ambijentRating;
    private int lokacijaRating;

    public OcjenaDTO(int hranaRating, int ljubaznostRating, int ambijentRating, int lokacijaRating){
        this.hranaRating = hranaRating;
        this.ljubaznostRating = ljubaznostRating;
        this.ambijentRating = ambijentRating;
        this.lokacijaRating = lokacijaRating;
    }
}
