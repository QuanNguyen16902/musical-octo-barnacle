package com.system.admin.model.ViolationRecord;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "violation-person")
public class ViolationPerson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String nguoiViPham;
    private Integer namSinh;
    private String ngheNghiep;
    private String diaChi;
    private String canCuoc;
    private String noiCap;
    private String ngayCap;
    private String quocTich;
    private String email;
    private Integer soLanViPham;

    @OneToMany(mappedBy = "nguoiViPham", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<ViolationRecord> violationRecords = new ArrayList<>();
}
