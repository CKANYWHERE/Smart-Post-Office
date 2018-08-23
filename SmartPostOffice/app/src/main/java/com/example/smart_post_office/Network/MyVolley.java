package com.example.smart_post_office.Network;

/**
 * Created by Min Chang Gyeong on 2018-08-23.
 */

import android.content.Context;

import com.android.volley.RequestQueue;
import com.android.volley.toolbox.Volley;

public class MyVolley {
    private static MyVolley volley;
    private RequestQueue requestQueue;


    private MyVolley(Context context) {
        requestQueue = Volley.newRequestQueue(context);

    }

    public static MyVolley getInstance(Context context) {
        if (volley == null) {
            volley = new MyVolley(context);
        }

        return volley;
    }

    public RequestQueue getRequestQueue() {
        return requestQueue;
    }
}