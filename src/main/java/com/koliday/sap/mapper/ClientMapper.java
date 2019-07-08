package com.koliday.sap.mapper;

import com.koliday.sap.entity.ClientEntity;
import com.koliday.sap.entity.ContactPersonEntity;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClientMapper {
    Integer addClient(@Param("client")ClientEntity client);

    Integer addContactPerson(@Param("cp")ContactPersonEntity contactPerson);

    Integer selectClientCount();

    List<ClientEntity> getAllClientsByUid(@Param("uid") Integer uid);

    Integer updateClientByClid(@Param("client") ClientEntity client);

    ClientEntity getClientByClid(@Param("clid") Integer clid);

    List<ContactPersonEntity> getContactPersonListByClid(@Param("clid") Integer clid);

    Integer updateContactPerson(@Param("cp") ContactPersonEntity contactPerson);
}
