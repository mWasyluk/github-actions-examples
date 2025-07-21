# 🧪 MODULE 02: Multi Job Artifacts

## 📝 NOTES
- runner `ubuntu-latest` zawiera 4 wersje JVM i wszystkie mają w systemie ustawione zmienne środowiskowe wskazujące lokalizację JDK: `JAVA_HOME_[8|11|17|21]_X64` ( wersja `11` jest domyślną i przypisaną również do zmiennej `JAVA_HOME`). Wszystkie wersje są dostępne w katalogu `/usr/lib/jvm/`.
- Maven is not intalled by default so it is convinient to provide Maven Wrapper to the project before pushing it to a repository. It can be easily done with the `mvn -N wrapper:wrapper` command.
- `jobs.<>.steps.<>.with` nie pozwala na użycie environment variables
- W `actions/checkout@v4` możliwe jest pobranie konkretnych plików lub katalogów wewnątrz katalogu root repozytorium docelowego (domyślnie `${{github.repository}}` lub określonego w `...with.repository` property). W tym celu należy określić ścieżki plików / katalogów in the `...with.sparse-checkout` property (każda w nowej linii) oraz ustawić `...with.sparse-checkout-cone-mode` property na `false` (nie pobiera sąsiednich blobów). Na przykład: 
```yaml
- name: Fetch data
  uses: actions/checkout@v4
  with: 
    sparse-checkout: |
      01-docker-build-and-push/Dockerfile
      02-multi-job-artifacts
    sparse-checkout-cone-mode: false

- name: Display content
  run: |
    ls 
    echo "====================="
    ls 01-docker-build-and-push
    echo "====================="
    ls 02-multi-job-artifacts
```
wyświetli: 
```shell
01-docker-build-and-push
02-multi-job-artifacts
=====================
Dockerfile
=====================
README.md
mvn
pom.xml
src
```
a pominięcie `sparse-checkout-cone-mode: false` wyświetli:
```shell
01-docker-build-and-push
02-multi-job-artifacts
README.md
=====================
Dockerfile
README.md
index.html
=====================
README.md
mvn
pom.xml
src
```

