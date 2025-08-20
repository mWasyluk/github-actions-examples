package pl.mwasyluk.githubactionsexamples.todo;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/todos")
public class TodoController {
    private final TodoRepository todoRepository;
    @Value("${security.admin.secret}")
    private String secret;

    @GetMapping
    public ResponseEntity<List<Todo>> getAll() {
        return ResponseEntity.ok(todoRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<Todo> add(@RequestBody Todo todo, @RequestHeader("Authorization") String secret) {
        if (!this.secret.equals(secret)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(todoRepository.save(todo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> setState(
            @PathVariable String id,
            @RequestBody Todo requestTodo,
            @RequestHeader("Authorization") String secret) {
        if (!this.secret.equals(secret)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        long parsedId;
        try {
            parsedId = Integer.parseInt(id);
        } catch (Exception ex) {
            return ResponseEntity.badRequest().build();
        }

        Optional<Todo> optionalTodo = todoRepository.findById(parsedId);
        if (optionalTodo.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        requestTodo.setId(parsedId);
        return ResponseEntity.ok(todoRepository.save(requestTodo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable long id, @RequestHeader("Authorization") String secret) {
        if (!this.secret.equals(secret)) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        if (!todoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        todoRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
