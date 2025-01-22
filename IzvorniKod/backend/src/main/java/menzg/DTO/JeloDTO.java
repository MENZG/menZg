package menzg.DTO;

import lombok.Data;

@Data
public class JeloDTO {
    private String kategorija;
    private Float cijena;
    private String nazivJela;

    public JeloDTO(){

    }
    public JeloDTO(String kategorija, Float cijena, String nazivJela){
        this.kategorija = kategorija;
        this.cijena = cijena;
        this.nazivJela = nazivJela;

    }
}
