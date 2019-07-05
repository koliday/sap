package com.koliday.sap.service.intf;

import com.koliday.sap.dto.UserDTO;
import com.koliday.sap.entity.UserEntity;

import java.util.Map;

public interface UserService {
    Map<String,Object> login(String username, String password);
    Integer register(UserDTO user);
}
