package com.example.janu723.smart_post_admin.Adapter;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.TextView;

import com.example.janu723.smart_post_admin.R;

import java.util.ArrayList;

public class MyAdapter extends BaseAdapter {

    private ArrayList<MyItem> myItems = new ArrayList<>();

    @Override
    public int getCount() {
        return myItems.size();
    }

    @Override
    public Object getItem(int i) {
        return myItems.get(i);
    }

    @Override
    public long getItemId(int i) {
        return 0;
    }

    @Override
    public View getView(int i, View view, ViewGroup viewGroup) {
        Context context = viewGroup.getContext();

        if (view == null) {
            LayoutInflater inflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            view = inflater.inflate(R.layout.custom_listview, viewGroup, false);
        }

        TextView txtAddress = (TextView) view.findViewById(R.id.txtAddress);
        TextView txtName = (TextView) view.findViewById(R.id.txtUserName);
        TextView txtPhone = (TextView) view.findViewById(R.id.txtPhone);

        MyItem myItem = (MyItem) getItem(i);

        txtAddress.setText(myItem.getAddress());
        txtName.setText(myItem.getName());
        txtPhone.setText(myItem.getPhone());


        return view;
    }

    public void addItem(String phone, String name, String address) {

        MyItem mItem = new MyItem(phone,name,address);
        myItems.add(mItem);
    }

}
