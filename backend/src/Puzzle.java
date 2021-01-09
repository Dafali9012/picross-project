public class Puzzle {
    private Integer id;
    private String title;
    private String json;

    public Puzzle(Integer id, String title, String json) {
        this.id = id;
        this.title = title;
        this.json = json;
    }

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getJson() {
        return json;
    }
}
