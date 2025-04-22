/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.coffee_shop;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import javax.swing.JOptionPane;

/**
 *
 * @author MJ
 */
public class database_connection {
    public static Connection connectdbase(){
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            String url = "jdbc:mysql://localhost:3306/coffee_shop?zeroDateTimeBehavior=CONVERT_TO_NULL";//database url
            String username = "root";
            String password = "1234";
            Connection con = DriverManager.getConnection(url,username, password);
            return con;          
        }catch(ClassNotFoundException | SQLException e){
            JOptionPane.showMessageDialog(null, e);
        }
        return null;
    }
    
}
