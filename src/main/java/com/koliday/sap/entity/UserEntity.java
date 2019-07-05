package com.koliday.sap.entity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserEntity {
    private Integer uid;
    private String username;
    private String password;
    private Integer eid;
    private Integer status;
}
