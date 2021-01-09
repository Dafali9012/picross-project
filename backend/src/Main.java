import express.Express;
import io.javalin.core.JavalinConfig;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public void start() {
        Express app = new Express(JavalinConfig::enableCorsForAllOrigins);
        setPaths(app);
        app.listen(3000);
    }

    public void setPaths(Express app) {
        app.get("/api/puzzle", (req,res)->{
            Connection conn = connectDB();
            if(conn!=null) {
                try(Statement statement = conn.createStatement()) {
                    ResultSet rs = statement.executeQuery("select * from puzzle");
                    List<Puzzle> puzzles = new ArrayList<>();
                    while(rs.next()) {
                        puzzles.add(new Puzzle(rs.getInt("id"), rs.getString("title"), rs.getString("json")));
                    }
                    res.send(puzzles.toArray());
                } catch (SQLException e) { e.printStackTrace(); }
                try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
        });

        app.post("/api/puzzle", (req,res)->{
            Connection conn = connectDB();
            if(conn!=null) {
                // res
                try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
        });
    }

    public Connection connectDB() {
        try {
            return DriverManager.getConnection("jdbc:sqlite:database/puzzle.db");
        } catch (SQLException e) { e.printStackTrace(); }
        return null;
    }

    public static void main(String[] args) {
        new Main().start();
    }
}
