import mysql.connector
from mysql.connector import Error
import os
from dotenv import load_dotenv

load_dotenv()

def create_database():
    try:
        connection = mysql.connector.connect(
            host=os.getenv('MYSQL_HOST'),
            user=os.getenv('MYSQL_USER'),
            password=os.getenv('MYSQL_PASSWORD')
        )
        
        cursor = connection.cursor()
        
        # Create database
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {os.getenv('MYSQL_DATABASE')}")
        print(f"Database {os.getenv('MYSQL_DATABASE')} created successfully")
        
        # Use the database
        cursor.execute(f"USE {os.getenv('MYSQL_DATABASE')}")
        
        # Create users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                full_name VARCHAR(255),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        print("Users table created")
        
        # Create tracker entries table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS tracker_entries (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                date DATE NOT NULL,
                electricity DECIMAL(10, 2),
                gas DECIMAL(10, 2),
                water DECIMAL(10, 2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)
        print("Tracker entries table created")
        
        # Create consultations table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS consultations (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                full_name VARCHAR(255),
                email VARCHAR(255),
                phone VARCHAR(20),
                service_type VARCHAR(50),
                date DATE,
                time TIME,
                address TEXT,
                notes TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        """)
        print("Consultations table created")
        
        connection.commit()
        cursor.close()
        connection.close()
        print("Database setup completed successfully!")
        
    except Error as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    create_database()
