package com.example.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@JsonSerialize
public class UserContext {

    private String balance = "";
    private String userName = "";
    private String amountDue = "";


    public UserContext() {
    }


    public String getBalance() {
        return balance;
    }

    public void setBalance(String balance) {
        this.balance = balance;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAmountDue() {
        return amountDue;
    }

    public void setAmountDue(String amountDue) {
        this.amountDue = amountDue;
    }
}
