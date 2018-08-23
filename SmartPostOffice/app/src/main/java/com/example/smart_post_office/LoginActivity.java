package com.example.smart_post_office;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.example.smart_post_office.Network.NetWorkUtil;
import com.example.smart_post_office.util.Config;

import org.json.JSONException;
import org.json.JSONObject;


/**
 * Created by Min Chang Gyeong on 2018-08-23.
 */

public class LoginActivity extends AppCompatActivity{

    private EditText txtId;
    private EditText txtPassword;
    private Button btnLogin;
    private NetWorkUtil netWorkUtil;
    private SharedPreferences settings;
    SharedPreferences.Editor editor;
    private boolean serverAuth;
    private String userId;
    private int userPoint;
    private String userAddress;
    private String userPhone;
    private String userName;
    private String test;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        //UI 불러오기
        txtId = findViewById(R.id.etId);
        txtPassword = findViewById(R.id.etPassword);
        btnLogin = findViewById(R.id.btnSignin);

        //세션 추가
        settings = getSharedPreferences("user",MODE_PRIVATE);
        editor = settings.edit();

        //서버통신
        netWorkUtil = new NetWorkUtil(getApplicationContext());

        //버튼 누르면 서버로 정보 전송
        btnLogin.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                requestPostLogin();
            }
        });
    }

    private void requestPostLogin() {

        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("id",txtId.getText().toString());
            jsonObject.put("password",txtPassword.getText().toString());
            netWorkUtil.requestServer(Request.Method.POST, Config.MAIN_URL+Config.POST_SIGNIN,jsonObject
                    ,networkSuccessListener(), networkErrorListener());
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    private Response.Listener<JSONObject> networkSuccessListener() {
        return new Response.Listener<JSONObject>() {
            public void onResponse(JSONObject response) {

                try {
                    Log.e("asdf",response.toString());
                    serverAuth = response.getBoolean("success");
                    userName = response.getString("name");
                    userId = response.getString("id");
                    userPoint = response.getInt("point");
                    userAddress = response.getString("address");
                    userPhone = response.getString("phone");

                } catch (JSONException e) {
                    Toast.makeText(getApplicationContext(), e.toString(), Toast.LENGTH_LONG).show();
                } finally {
                    Toast.makeText(getApplicationContext(), "로그인 되었습니다.", Toast.LENGTH_LONG).show();
                }

                if(serverAuth){

                    editor.putString("userId", userId);
                    editor.putString("userName", userName);
                    editor.putInt("userPoint",userPoint);
                    editor.putString("userAddress",userAddress);
                    editor.putString("userPhone",userPhone);
                    editor.commit();

                    setResult(RESULT_OK);//////////////////////////////////////////////////////
                    Intent intent = new Intent(LoginActivity.this, MainActivity.class);
                    intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
                    startActivity(intent);
                    finish(); //LOGIN VIEW 종료
                }

            }
        };
    }

    private Response.ErrorListener networkErrorListener() {
        return new Response.ErrorListener() {

            public void onErrorResponse(VolleyError error) {
                Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
            }
        };
    }



}
