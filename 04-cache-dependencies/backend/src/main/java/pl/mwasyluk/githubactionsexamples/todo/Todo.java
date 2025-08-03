package pl.mwasyluk.githubactionsexamples.todo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Data
@ToString
@NoArgsConstructor
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long id;

    private String title;
    private String description;
    private int priority;
    @Setter(AccessLevel.NONE)
    @Getter(AccessLevel.NONE)
    private boolean isDone;

    public Todo(String title, String description, int priority) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.isDone = false;
    }

    public Todo(String title, String description, int priority, boolean isDone) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.isDone = isDone;
    }

    public void setIsDone(boolean isDone) {
        this.isDone = isDone;
    }

    public boolean getIsDone() {
        return isDone;
    }
}
