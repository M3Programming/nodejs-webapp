/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package project1.student;

import java.sql.Connection;
import java.sql.DriverManager;
import javax.swing.JOptionPane;

/**
 *
 * @author Marlon
 */
public class Student {
    //Create a Connection method
    public static Connection connecrb(){
      try{
          Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
          Connection conn = DriverManager.getConnection("jdbc:sqlserver://localhost\\SQLEXPRESS:1433;databaseName=mydatabase;encrypt=true;trustServerCertificate=true","admin","12345");//admin and 12345 is username and password in sql server
          return conn;
          
          
          
      }catch(Exception e){
          JOptionPane.showMessageDialog(null,e);
      }
        return null; 
    }

    public static void main(String[] args) {
       
    }
}
