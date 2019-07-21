package com.koliday.sap.dto;

import com.koliday.sap.entity.ClientEntity;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class ClientDTO {

    private Integer clid;
    private String clno;
    private String clname;
    private String clcontact;
    private String claddress;
    private Integer city;
    private String postcode;
    private String creator;
    private Date createtime;
    private Integer status;

    public ClientDTO(ClientEntity clientEntity,String creator) {
        this.clid=clientEntity.getClid();
        this.clno=clientEntity.getClno();
        this.clname=clientEntity.getClname();
        this.clcontact=clientEntity.getClcontact();
        this.claddress=clientEntity.getCladdress();
        this.city=clientEntity.getCity();
        this.postcode=clientEntity.getPostcode();
        this.creator=creator;
        this.createtime=clientEntity.getCreatetime();
        this.status=clientEntity.getStatus();
    }
}
