package com.koliday.sap.service.intf;

public interface ClientService {
    Integer addClientAndContactPerson();
    Integer addContactPersonToClient(Integer clid);
}
