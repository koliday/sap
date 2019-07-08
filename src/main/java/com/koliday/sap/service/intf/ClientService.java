package com.koliday.sap.service.intf;

import com.koliday.sap.entity.ClientEntity;
import com.koliday.sap.entity.ContactPersonEntity;

import java.util.List;

public interface ClientService {
    Integer addClientAndContactPerson(ClientEntity client, ContactPersonEntity contactPerson);
    Integer addClient(ClientEntity client);
    Integer addContactPersonToClient(ContactPersonEntity contactPerson);

    List<ClientEntity> getAllClientsByUid(Integer uid);

    Integer updateClient(ClientEntity client);

    ClientEntity getClientByClid(Integer clid);

    List<ContactPersonEntity> getContactPersonListByClid(Integer clid);

    Integer updateContactPerson(ContactPersonEntity contactPerson);
}
