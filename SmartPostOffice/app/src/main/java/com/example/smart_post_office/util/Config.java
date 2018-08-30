package com.example.smart_post_office.util;

/**
 * Created by Min Chang Gyeong on 2018-08-23.
 */

public class Config {
    public final static String MAIN_URL = "http://192.168.1.116:3030";
    public final static String POST_CHAIN = "http://192.168.1.116:3000/api/TradeSuccess";
    public final static String GET_CHAIN = "http://192.168.1.116:3000/api/queries/selectReciverByReciverOid?useroid=";
    public final static String POST_SIGNIN = "/api/postoffice/signin";
    public final static String POST_SIGNUP = "/api/postoffice/createuser";
}
