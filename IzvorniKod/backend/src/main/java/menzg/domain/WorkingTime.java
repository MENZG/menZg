package menzg.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "workingtime")
public class WorkingTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idWT")
    private long idWT;

    @Column(name = "day", nullable = false)
    private String day;

    @Column(name = "start", nullable = false)
    private int start;

    @Column(name = "end", nullable = false)
    private int end;
}
