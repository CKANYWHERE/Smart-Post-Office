package com.example.smart_post_office;

import android.app.DownloadManager;
import android.content.Intent;
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

public class SignupActivity extends AppCompatActivity{
    private Button btnSignUp;
    private NetWorkUtil netWorkUtil;
    private EditText etId;
    private EditText etPassword;
    private EditText etName;
    private EditText etAddress;
    private EditText etPhone;
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);
        netWorkUtil = new NetWorkUtil(getApplicationContext());
        btnSignUp = findViewById(R.id.btnSignUp);
        etId = findViewById(R.id.etId);
        etPassword = findViewById(R.id.etPassword);
        etName = findViewById(R.id.etName);
        etAddress = findViewById(R.id.etAddress);
        etPhone = findViewById(R.id.etPhone);

        btnSignUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                requestPostSignUp();

            }
        });
    }

    private void requestPostSignUp() {
        JSONObject jsonObject = new JSONObject();
        try {
            jsonObject.put("phone",etPhone.getText());
            jsonObject.put("id",etId.getText());
            jsonObject.put("password",etPassword.getText());
            jsonObject.put("name",etName.getText());
            jsonObject.put("address",etAddress.getText());
            Log.e("json",jsonObject.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }
        netWorkUtil.requestServer(Request.Method.POST,Config.MAIN_URL+Config.POST_SIGNUP,jsonObject,networkSuccessListener(),networkErrorListener());
        Log.e("sadf",Config.MAIN_URL+Config.POST_SIGNUP);
    }
    private Response.Listener<JSONObject> networkSuccessListener() {
        return new Response.Listener<JSONObject>() {
            public void onResponse(JSONObject response) {
                Intent intent = new Intent(getApplicationContext(),
                        MainActivity.class);
                startActivity(intent);
            }
        };
    }
    private Response.ErrorListener networkErrorListener() {
        return new Response.ErrorListener() {

            public void onErrorResponse(VolleyError error) {
                Log.e("networkerror",error.getMessage());
                Toast.makeText(getApplicationContext(), error.getMessage(), Toast.LENGTH_SHORT).show();
            }
        };
    }

}
