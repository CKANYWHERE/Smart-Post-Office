package com.example.janu723.smart_post_admin;


import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.ListView;
import com.example.janu723.smart_post_admin.Adapter.MyAdapter;


public class GetuserActivity extends AppCompatActivity {
    private ListView mListView;
    private String [] name = {"박근영","이강복","황동현"};
    private String [] phone = {"010-3120-4134","010-4814-5563", "010-8540-3204"};
    private String [] address = {"인천광역시 남구 용현동 77-15 밀레니엄캐슬 401호"
            , "인천광역시 남구 용현동 77-15 밀레니엄캐슬 302호"
            , "인천광역시 남구 용현동 77-15 밀레니엄캐슬 203호"};
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_getuser);

        /* 위젯과 멤버변수 참조 획득 */
        mListView = (ListView)findViewById(R.id.listView);

        /* 아이템 추가 및 어댑터 등록 */
        dataSetting();
    }

    private void dataSetting() {
        MyAdapter myAdapter = new MyAdapter();
        for(int i=0; i<3; i++){
            Log.e("aaa",name[i]);
            Log.e("aaa",phone[i]);
            Log.e("aaa",address[i]);
            myAdapter.addItem(name[i],phone[i],address[i]);
        }
        mListView.setAdapter(myAdapter);
    }
}
